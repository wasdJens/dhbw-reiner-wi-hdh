import { randomBytes } from 'node:crypto';
import { All, Controller, Param, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  bearer,
  entityTags,
  fail,
  objectBody,
  resource,
  solved,
} from './reply';
import {
  braumeisterHopfen,
  flag,
  gateToken,
  limit,
  requireTeam,
  sign,
  type Kiste,
  type Team,
} from './team';

const FORMATS = ['text/html', 'application/json', 'text/plain'];
const PATCH_TYPES = ['application/merge-patch+json', 'application/json'];
const ACCEPT_PATCH = { 'Accept-Patch': PATCH_TYPES.join(', ') };
const KISTE_FIELDS = ['sorte', 'flaschen', 'etikett'];
const REZEPT_FIELDS = ['name', 'malz', 'hopfen', 'stammwuerze'];
const ZIEL_STAMMWUERZE = 12.5;

/**
 * Content Negotiation nach RFC 9110: Je Angebot gilt der genaueste passende
 * Bereich aus Accept; bei gleichem q gewinnt die Reihenfolge des Servers.
 */
function negotiate(header: string | undefined): string | undefined {
  const ranges = (header?.trim() ? header : '*/*').split(',').map((part) => {
    const [range, ...params] = part
      .split(';')
      .map((s) => s.trim().toLowerCase());
    const q = params.find((p) => p.startsWith('q='));
    const value = q ? Number(q.slice(2)) : 1;
    return { range, q: Number.isFinite(value) ? value : 0 };
  });
  let best: string | undefined;
  let bestQ = 0;
  for (const offer of FORMATS) {
    const [type, subtype] = offer.split('/');
    let q = 0;
    let precision = -1;
    for (const { range, q: rangeQ } of ranges) {
      const [t, s] = range.split('/');
      const p =
        t === type && s === subtype
          ? 2
          : t === type && s === '*'
            ? 1
            : t === '*' && s === '*'
              ? 0
              : -1;
      if (p > precision) {
        precision = p;
        q = rangeQ;
      }
    }
    if (precision >= 0 && q > bestQ) {
      best = offer;
      bestQ = q;
    }
  }
  return best;
}

/** Fehler in Feldern einer Kiste; leer, wenn alles stimmt */
function kisteErrors(data: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const unknown = Object.keys(data).filter(
    (key) => !KISTE_FIELDS.includes(key),
  );
  if (unknown.length > 0) {
    errors.push(
      `Unbekannte Felder: ${unknown.join(', ')}. Eine Kiste hat die Felder sorte, flaschen und etikett.`,
    );
  }
  const { sorte, flaschen, etikett } = data;
  if (typeof sorte !== 'string' || sorte.trim() === '' || sorte.length > 40) {
    errors.push('sorte ist ein Text mit 1 bis 40 Zeichen.');
  }
  if (
    !Number.isInteger(flaschen) ||
    (flaschen as number) < 1 ||
    (flaschen as number) > 24
  ) {
    errors.push('flaschen ist eine ganze Zahl von 1 bis 24.');
  }
  if (
    etikett !== undefined &&
    (typeof etikett !== 'string' || etikett.length > 40)
  ) {
    errors.push('etikett ist ein Text mit höchstens 40 Zeichen.');
  }
  return errors;
}

/** Fehler in Feldern des Rezepts; leer, wenn alles stimmt */
function rezeptErrors(data: Record<string, unknown>): string[] {
  const errors: string[] = [];
  const unknown = Object.keys(data).filter(
    (key) => !REZEPT_FIELDS.includes(key),
  );
  if (unknown.length > 0) {
    errors.push(
      `Unbekannte Felder: ${unknown.join(', ')}. Ein Rezept hat die Felder ${REZEPT_FIELDS.join(', ')}.`,
    );
  }
  for (const key of ['name', 'malz', 'hopfen']) {
    const value = data[key];
    if (typeof value !== 'string' || value.trim() === '' || value.length > 60) {
      errors.push(`${key} ist ein Text mit 1 bis 60 Zeichen.`);
    }
  }
  const sw = data.stammwuerze;
  if (typeof sw !== 'number' || sw < 5 || sw > 25) {
    errors.push('stammwuerze ist eine Zahl von 5 bis 25.');
  }
  return errors;
}

/** JSON Merge Patch (RFC 7396) auf ein flaches Objekt: null entfernt ein Feld */
function mergePatch(
  target: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...target };
  for (const [key, value] of Object.entries(patch)) {
    if (value === null) delete result[key];
    else result[key] = value;
  }
  return result;
}

function kisteView(kiste: Kiste) {
  const { id, sorte, flaschen, etikett } = kiste;
  return { id, sorte, flaschen, ...(etikett !== undefined && { etikett }) };
}

function rezeptTag(team: Team): string {
  return `"r${team.rezept.version}-${sign(`rezept:${team.id}:${team.rezept.version}`, 8)}"`;
}

/** Der Braumeister ändert den Hopfen, einmal je Team */
function braumeister(team: Team): void {
  if (team.rezept.braumeister) return;
  team.rezept.braumeister = true;
  team.rezept.data = { ...team.rezept.data, hopfen: braumeisterHopfen };
  team.rezept.version++;
}

// Level 5–10: Deck json (Einheit 4), Level 9 als Zusatz, Level 10 in Einheit 13
@Controller('ctf')
export class JsonController {
  // Level 5: Content Negotiation; das Flag steht nur im JSON
  @All('5')
  level5(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        res.set('Vary', 'Accept');
        const nummer = `LS-${team.id.slice(0, 4).toUpperCase()}`;
        const format = negotiate(req.headers.accept);
        if (format === 'application/json') {
          return solved(res, 5, team, {
            lieferschein: { nummer, kisten: 24, sorte: 'Märzen' },
          });
        }
        if (format === 'text/html') {
          res
            .type('html')
            .send(
              '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Lieferschein</title></head>' +
                `<body><h1>Lieferschein ${nummer}</h1><p>24 Kisten Märzen.</p>` +
                `<p>Diese Darstellung enthält kein Flag. Der Lieferschein liegt auch in diesen Formaten vor: ${FORMATS.join(', ')}.</p></body></html>`,
            );
          return;
        }
        if (format === 'text/plain') {
          res
            .type('text/plain')
            .send(
              `Lieferschein ${nummer}\n24 Kisten Märzen\n\nDiese Darstellung enthält kein Flag. Formate: ${FORMATS.join(', ')}\n`,
            );
          return;
        }
        fail(
          res,
          406,
          'Not Acceptable',
          `Keines der Formate aus Accept ist verfügbar. Verfügbar: ${FORMATS.join(', ')}.`,
        );
      },
    });
  }

  // Level 6: Kiste anlegen; das Flag liegt unter der URL aus Location
  @All('6')
  level6(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        if (!requireTeam(req, res)) return;
        res.json({
          level: 6,
          message:
            'Lege im Lager eine Kiste an. Eine Kiste hat die Felder sorte (Text mit 1 bis 40 Zeichen) und flaschen (ganze Zahl von 1 bis 24). Das Etikett vergibt der Server.',
          kisten: '/ctf/6/kisten',
        });
      },
    });
  }

  @All('6/kisten')
  kisten(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        res.json(
          [...team.kisten.values()].map((kiste) => ({
            ...kisteView(kiste),
            href: `/ctf/6/kisten/${kiste.id}`,
          })),
        );
      },
      POST: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        if (!req.is('application/json')) {
          return fail(
            res,
            415,
            'Unsupported Media Type',
            'Der Server versteht hier nur application/json. Der Header Content-Type nennt das Format des Bodys.',
          );
        }
        const body = objectBody(req);
        if (!body) {
          return fail(res, 400, 'Bad Request', 'Erwartet: ein JSON-Objekt.');
        }
        const errors = kisteErrors(body);
        if (body.etikett !== undefined) {
          errors.push('Das Etikett vergibt der Server.');
        }
        if (errors.length > 0) {
          return fail(res, 400, 'Bad Request', errors.join(' '));
        }
        const id = randomBytes(3).toString('hex');
        const etikett = `Charge ${randomBytes(2).toString('hex').toUpperCase()}`;
        const kiste: Kiste = {
          id,
          sorte: body.sorte as string,
          flaschen: body.flaschen as number,
          etikett,
          original: etikett,
        };
        team.kisten.set(id, kiste);
        limit(team.kisten, 20);
        res
          .status(201)
          .set('Location', `/ctf/6/kisten/${id}`)
          .json({
            level: 6,
            message: 'Kiste angelegt. Das Flag liegt bei der Kiste.',
            kiste: kisteView(kiste),
          });
      },
    });
  }

  // Level 6 (GET) und Level 7 (PUT, PATCH): eine Kiste
  @All('6/kisten/:id')
  kiste(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    const load = (): [Team, Kiste] | undefined => {
      const team = requireTeam(req, res);
      if (!team) return undefined;
      const kiste = team.kisten.get(id);
      if (!kiste) {
        fail(res, 404, 'Not Found', 'Eine Kiste mit dieser ID gibt es nicht.');
        return undefined;
      }
      return [team, kiste];
    };
    const unsupported = (types: string) => {
      res.set(ACCEPT_PATCH);
      fail(
        res,
        415,
        'Unsupported Media Type',
        `Der Server versteht hier nur ${types}.`,
      );
    };
    const save = (team: Team, kiste: Kiste, data: Record<string, unknown>) => {
      const errors = kisteErrors(data);
      if (errors.length > 0) {
        return fail(res, 400, 'Bad Request', errors.join(' '));
      }
      kiste.sorte = data.sorte as string;
      kiste.flaschen = data.flaschen as number;
      kiste.etikett = data.etikett as string | undefined;
      if (kiste.flaschen === 24 && kiste.etikett === kiste.original) {
        return solved(res, 7, team, { kiste: kisteView(kiste) });
      }
      res.json({
        level: 7,
        message:
          kiste.etikett !== kiste.original
            ? 'Das Etikett der Kiste fehlt oder ist ein anderes. Ein PUT ersetzt die ganze Kiste. Lege eine neue Kiste an.'
            : 'Die Kiste ist noch nicht voll.',
        kiste: kisteView(kiste),
      });
    };
    resource(
      req,
      res,
      {
        GET: () => {
          const found = load();
          if (!found) return;
          solved(res, 6, found[0], { kiste: kisteView(found[1]) });
        },
        PUT: () => {
          const found = load();
          if (!found) return;
          if (!req.is('application/json'))
            return unsupported('application/json');
          const body = objectBody(req);
          if (!body)
            return fail(res, 400, 'Bad Request', 'Erwartet: ein JSON-Objekt.');
          const { id: bodyId, ...data } = body;
          if (bodyId !== undefined && bodyId !== id) {
            return fail(
              res,
              400,
              'Bad Request',
              'Die id im Body passt nicht zur URL.',
            );
          }
          save(found[0], found[1], data);
        },
        PATCH: () => {
          const found = load();
          if (!found) return;
          if (!req.is(PATCH_TYPES))
            return unsupported(PATCH_TYPES.join(' und '));
          const body = objectBody(req);
          if (!body)
            return fail(res, 400, 'Bad Request', 'Erwartet: ein JSON-Objekt.');
          const { sorte, flaschen, etikett } = found[1];
          const current = {
            sorte,
            flaschen,
            ...(etikett !== undefined && { etikett }),
          };
          save(found[0], found[1], mergePatch(current, body));
        },
      },
      ACCEPT_PATCH,
    );
  }

  @All('7')
  level7(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        if (!requireTeam(req, res)) return;
        res.json({
          level: 7,
          message:
            'Fülle eine deiner Kisten aus Level 6 auf 24 Flaschen. Alles andere an der Kiste bleibt, wie es ist.',
          kisten: '/ctf/6/kisten',
        });
      },
    });
  }

  // Level 8: Rezept mit ETag und If-Match; der Braumeister ändert mit
  @All('8')
  level8(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        if (!requireTeam(req, res)) return;
        res.json({
          level: 8,
          message: `Der Braumeister und du arbeitet am selben Rezept. Setze die stammwuerze auf ${ZIEL_STAMMWUERZE}. Die Änderung des Braumeisters bleibt erhalten.`,
          rezept: '/ctf/8/rezept',
        });
      },
    });
  }

  @All('8/rezept')
  rezept(@Req() req: Request, @Res() res: Response) {
    const write = (team: Team, data: Record<string, unknown>) => {
      const errors = rezeptErrors(data);
      if (errors.length > 0) {
        return fail(res, 400, 'Bad Request', errors.join(' '));
      }
      team.rezept.data = data as Record<string, string | number>;
      team.rezept.version++;
      res.set('ETag', rezeptTag(team));
      if (
        data.stammwuerze === ZIEL_STAMMWUERZE &&
        data.hopfen === braumeisterHopfen
      ) {
        return solved(res, 8, team, {
          rezept: data,
          token: gateToken(team),
          message:
            'Level 8 gelöst. Das Token im Feld token öffnet in Level 10 das Tor.',
        });
      }
      res.json({
        level: 8,
        message:
          data.hopfen !== braumeisterHopfen
            ? `Die Änderung des Braumeisters ist verloren: Er hatte hopfen auf "${braumeisterHopfen}" gesetzt.`
            : `Die stammwuerze ist noch nicht ${ZIEL_STAMMWUERZE}.`,
        rezept: data,
      });
    };
    /** Prüft Content-Type, Body und If-Match; liefert den Body oder antwortet selbst */
    const precondition = (team: Team, types: string[]) => {
      if (!req.is(types)) {
        res.set(ACCEPT_PATCH);
        fail(
          res,
          415,
          'Unsupported Media Type',
          `Der Server versteht hier nur ${types.join(' und ')}.`,
        );
        return undefined;
      }
      const body = objectBody(req);
      if (!body) {
        fail(res, 400, 'Bad Request', 'Erwartet: ein JSON-Objekt.');
        return undefined;
      }
      braumeister(team);
      const tags = entityTags(req.headers['if-match']);
      if (tags.length === 0) {
        fail(
          res,
          428,
          'Precondition Required',
          'Dieses Rezept ändert nur, wer die Fassung nennt, die er gelesen hat (Header If-Match).',
        );
        return undefined;
      }
      if (!tags.includes('*') && !tags.includes(rezeptTag(team))) {
        fail(
          res,
          412,
          'Precondition Failed',
          'Das Rezept hat sich geändert, seit du es gelesen hast. Lies es neu.',
        );
        return undefined;
      }
      return body;
    };
    resource(
      req,
      res,
      {
        GET: () => {
          const team = requireTeam(req, res);
          if (!team) return;
          res
            .set('ETag', rezeptTag(team))
            .json({ level: 8, rezept: team.rezept.data });
          // Der Braumeister ändert das Rezept, kurz nachdem du es gelesen hast
          braumeister(team);
        },
        PUT: () => {
          const team = requireTeam(req, res);
          if (!team) return;
          const body = precondition(team, ['application/json']);
          if (body) write(team, body);
        },
        PATCH: () => {
          const team = requireTeam(req, res);
          if (!team) return;
          const body = precondition(team, PATCH_TYPES);
          if (body) write(team, mergePatch(team.rezept.data, body));
        },
      },
      ACCEPT_PATCH,
    );
  }

  // Level 9 (Zusatz): ETag und If-None-Match; die 304 trägt das Flag im Header
  @All('9')
  level9(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        const etag = `"f-${sign(`frische:${team.id}`, 10)}"`;
        res.set('ETag', etag).set('Cache-Control', 'no-cache');
        const tags = entityTags(req.headers['if-none-match']).map((tag) =>
          tag.replace(/^W\//, ''),
        );
        if (tags.includes(etag) || tags.includes('*')) {
          team.solved.add(9);
          // Eine 304 hat keinen Body; das Flag steht im Header X-Flag
          res.status(304).set('X-Flag', flag(9, team)).end();
          return;
        }
        res.json({
          level: 9,
          message:
            'Diese Antwort ändert sich nie. Zeige dem Server, welche Fassung du schon kennst.',
        });
      },
    });
  }

  // Level 10 (Einheit 13): Bearer-Token aus Level 8
  @All('10')
  level10(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        const header = req.headers.authorization;
        if (bearer(header) === gateToken(team)) {
          return solved(res, 10, team, {
            message:
              'Level 10 gelöst. Das Tor ist offen. Das war das letzte Level.',
          });
        }
        if (header === undefined) {
          res.set('WWW-Authenticate', 'Bearer realm="ctf"');
          return fail(
            res,
            401,
            'Unauthorized',
            'Dieses Tor öffnet nur ein Token. Ein früheres Level hat es dir gegeben.',
          );
        }
        res.set(
          'WWW-Authenticate',
          'Bearer realm="ctf", error="invalid_token"',
        );
        fail(res, 401, 'Unauthorized', 'Das Token fehlt oder ist ungültig.');
      },
    });
  }
}
