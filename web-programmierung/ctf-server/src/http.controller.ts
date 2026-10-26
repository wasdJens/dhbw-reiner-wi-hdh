import { All, Controller, Param, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { settings } from './config';
import { cookies, fail, resource, solved } from './reply';
import { requireTeam, sign, type Team } from './team';

/** Pfade der Weiterleitungen in Level 2, je Team verschieden */
function hops(team: Team): [string, string] {
  return [sign(`hop1:${team.id}`, 8), sign(`hop2:${team.id}`, 8)];
}

// Level 1–4: Deck http (Einheit 3), Level 4 als Zusatz
@Controller('ctf')
export class HttpController {
  // Level 1: Siegel entfernen (OPTIONS, Allow, 405, DELETE, 204, 404)
  @All('1')
  level1(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        if (!requireTeam(req, res)) return;
        res.json({
          level: 1,
          message:
            'Das Lager deines Teams ist versiegelt. Erst ohne Siegel gibt es das Flag frei.',
          lager: '/ctf/1/lager',
          siegel: '/ctf/1/siegel',
        });
      },
    });
  }

  @All('1/lager')
  lager(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        if (team.siegel) {
          return fail(
            res,
            403,
            'Forbidden',
            'Das Lager ist versiegelt. Das Siegel liegt unter /ctf/1/siegel.',
          );
        }
        solved(res, 1, team, {
          message: 'Level 1 gelöst. Das Lager ist offen.',
        });
      },
    });
  }

  @All('1/siegel')
  siegel(@Req() req: Request, @Res() res: Response) {
    const gone = () =>
      fail(res, 404, 'Not Found', 'Hier ist kein Siegel mehr.');
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        if (!team.siegel) return gone();
        res.json({
          level: 1,
          zustand: 'intakt',
          message:
            'Ein Siegel lässt sich entfernen. Welche Methoden diese Ressource erlaubt, sagt dir der Server.',
        });
      },
      DELETE: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        if (!team.siegel) return gone();
        team.siegel = false;
        res.status(204).end();
      },
    });
  }

  // Level 2: drei Weiterleitungen; das Flag steht in der letzten vor dem Ziel
  @All('2')
  level2(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        res
          .status(301)
          .set('Location', `/ctf/2/${hops(team)[0]}`)
          .json({
            level: 2,
            message: 'Die Brauerei ist dauerhaft umgezogen.',
          });
      },
    });
  }

  @All('2/:hop')
  level2Hop(
    @Param('hop') hop: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        const [first, second] = hops(team);
        if (hop === first) {
          res.status(302).set('Location', `/ctf/2/${second}`).json({
            level: 2,
            message: 'Die Brauerei ist vorübergehend woanders.',
          });
          return;
        }
        if (hop === second) {
          res.set('Location', '/ctf/2/ziel');
          return solved(
            res,
            2,
            team,
            {
              message:
                'Level 2 gelöst. Das Ziel steht in Location, das Flag nur in dieser Antwort.',
            },
            307,
          );
        }
        if (hop === 'ziel') {
          res.json({
            level: 2,
            message:
              'Hier gibt es kein Flag. Dein Client ist Weiterleitungen gefolgt. Das Flag stand in einer Antwort davor.',
          });
          return;
        }
        fail(res, 404, 'Not Found', 'Unter dieser Adresse ist niemand.');
      },
    });
  }

  // Level 3: Ausweis als Cookie; der Server traut dem Wert des Clients
  @All('3')
  level3(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        if (!requireTeam(req, res)) return;
        res.cookie('ausweis', 'gast', { path: '/ctf/3', httpOnly: true }).json({
          level: 3,
          message:
            'Der Pförtner hat dir einen Ausweis ausgestellt. Das Sudhaus liegt unter /ctf/3/sudhaus.',
        });
      },
    });
  }

  @All('3/sudhaus')
  sudhaus(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        // Postman sendet ein geändertes Cookie unter Umständen neben dem alten
        const ausweise = cookies(req.headers.cookie, 'ausweis');
        const ausweis = ausweise[0];
        if (ausweise.includes('brauer')) {
          return solved(res, 3, team, {
            message:
              'Level 3 gelöst. Der Server hat dem Cookie geglaubt. Ein Cookie liegt beim Client, und der Client kann es ändern.',
          });
        }
        if (ausweis === undefined) {
          return fail(
            res,
            403,
            'Forbidden',
            'Ohne Ausweis kommst du nicht ins Sudhaus. Den Ausweis stellt der Pförtner unter /ctf/3 aus.',
          );
        }
        fail(
          res,
          403,
          'Forbidden',
          `Dein Ausweis lautet ${JSON.stringify(ausweis.slice(0, 30))}. Ins Sudhaus dürfen nur Ausweise mit dem Wert "brauer".`,
        );
      },
    });
  }

  // Level 4 (Zusatz): 503 mit Retry-After; wer zu oft fragt, bekommt 429
  @All('4')
  level4(@Req() req: Request, @Res() res: Response) {
    resource(req, res, {
      GET: () => {
        const team = requireTeam(req, res);
        if (!team) return;
        const keller = team.keller;
        const now = Date.now();
        const wait = settings.retryAfter * 1000;
        if (team.solved.has(4) || (keller.opensAt && now >= keller.opensAt)) {
          return solved(res, 4, team, {
            message: 'Level 4 gelöst. Der Keller ist wieder offen.',
          });
        }
        if (keller.opensAt === undefined) {
          keller.opensAt = now + wait;
          res.set('Retry-After', String(settings.retryAfter));
          return fail(
            res,
            503,
            'Service Unavailable',
            'Der Keller hat gerade geschlossen. Frag wieder, wenn er öffnet.',
          );
        }
        keller.early++;
        if (keller.early >= 3) {
          keller.opensAt = now + wait;
          keller.early = 0;
          res.set('Retry-After', String(settings.retryAfter));
          return fail(
            res,
            429,
            'Too Many Requests',
            'Zu viele Anfragen. Die Wartezeit beginnt von vorn.',
          );
        }
        res.set(
          'Retry-After',
          String(Math.ceil((keller.opensAt - now) / 1000)),
        );
        fail(
          res,
          503,
          'Service Unavailable',
          'Der Keller ist noch geschlossen.',
        );
      },
    });
  }
}
