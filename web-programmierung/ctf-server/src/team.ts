import { createHmac, randomBytes } from 'node:crypto';
import type { Request, Response } from 'express';
import { flags, settings } from './config';
import { fail } from './reply';

export interface Kiste {
  id: string;
  sorte?: string;
  flaschen?: number;
  etikett?: string;
  /** Etikett, das der Server beim Anlegen vergeben hat */
  original: string;
}

export interface Rezept {
  version: number;
  data: Record<string, string | number>;
  /** Der Braumeister hat seine Änderung schon gemacht */
  braumeister: boolean;
}

/** Zustand eines Teams im Arbeitsspeicher; ein Neustart leert ihn */
export interface Team {
  id: string;
  solved: Set<number>;
  siegel: boolean;
  keller: { opensAt?: number; early: number };
  kisten: Map<string, Kiste>;
  rezept: Rezept;
}

const teams = new Map<string, Team>();

/** Grenze für den Speicher einer gehosteten Instanz */
export function limit<T>(store: Map<T, unknown>, max: number): void {
  while (store.size > max) store.delete(store.keys().next().value as T);
}

/** Kurzer HMAC über einen Text, abhängig von CTF_SECRET */
export function sign(text: string, length: number): string {
  return createHmac('sha256', settings.secret)
    .update(text)
    .digest('hex')
    .slice(0, length);
}

export const braumeisterHopfen = 'Hallertauer Tradition, Tettnanger';

function rezept(): Rezept {
  return {
    version: 1,
    data: {
      name: 'Märzen',
      malz: 'Pilsner, Münchner',
      hopfen: 'Hallertauer Tradition',
      stammwuerze: 13.5,
    },
    braumeister: false,
  };
}

function state(id: string): Team {
  let team = teams.get(id);
  if (!team) {
    team = {
      id,
      solved: new Set(),
      siegel: true,
      keller: { early: 0 },
      kisten: new Map(),
      rezept: rezept(),
    };
    teams.set(id, team);
    limit(teams, 10000);
  }
  return team;
}

/** Neues Team: Token aus ID und Signatur, gültig auch nach einem Neustart */
export function createTeam(): { token: string; team: Team } {
  const id = randomBytes(4).toString('hex');
  return { token: `${id}-${sign(`team:${id}`, 12)}`, team: state(id) };
}

/** Team zu einem Token oder undefined, wenn die Signatur nicht passt */
export function findTeam(token: string | undefined): Team | undefined {
  const match = /^([0-9a-f]{8})-([0-9a-f]{12})$/.exec(token?.trim() ?? '');
  if (!match || sign(`team:${match[1]}`, 12) !== match[2]) return undefined;
  return state(match[1]);
}

/** Team aus dem Header X-Team; antwortet sonst mit 400 */
export function requireTeam(req: Request, res: Response): Team | undefined {
  const header = req.headers['x-team'];
  const token = Array.isArray(header) ? header[0] : header;
  if (token === undefined || token.trim() === '') {
    fail(
      res,
      400,
      'Bad Request',
      'Der Header X-Team fehlt. Ein Team-Token gibt Level 0 (GET /ctf).',
    );
    return undefined;
  }
  const team = findTeam(token);
  if (!team) {
    fail(
      res,
      400,
      'Bad Request',
      'Das Team-Token im Header X-Team ist ungültig. Ein neues gibt Level 0.',
    );
  }
  return team;
}

/** Flag eines Levels für ein Team: Grundwert und vier Zeichen des Teams */
export function flag(level: number, team: Team): string {
  const suffix = sign(`flag:${team.id}:${level}`, 4);
  const base = flags[level];
  return base.endsWith('}')
    ? `${base.slice(0, -1)}-${suffix}}`
    : `${base}-${suffix}`;
}

/** Token für Level 10, das Level 8 verrät */
export function gateToken(team: Team): string {
  return `brau-${sign(`token:${team.id}`, 16)}`;
}
