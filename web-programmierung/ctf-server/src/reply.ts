import type { Request, Response } from 'express';
import { next } from './config';
import { flag, type Team } from './team';

/** Antwort für ein gelöstes Level: Flag und Hinweis auf das nächste Level */
export function solved(
  res: Response,
  level: number,
  team: Team,
  extra: Record<string, unknown> = {},
  status = 200,
): void {
  team.solved.add(level);
  res.status(status).json({
    level,
    message: `Level ${level} gelöst.`,
    flag: flag(level, team),
    ...extra,
    next: next[level],
  });
}

/** Fehlerantwort im Format von NestJS, mit Hinweis in message */
export function fail(
  res: Response,
  statusCode: number,
  error: string,
  message: string,
  extra: Record<string, unknown> = {},
): void {
  res.status(statusCode).json({ statusCode, error, message, ...extra });
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
const ORDER = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

/**
 * Eine Ressource nach RFC 9110: OPTIONS mit Allow, HEAD wie GET ohne Body,
 * jede andere Methode 405 mit Allow.
 */
export function resource(
  req: Request,
  res: Response,
  handlers: Partial<Record<Method, () => void>>,
  headers: Record<string, string> = {},
): void {
  const methods = new Set<string>(Object.keys(handlers));
  if (methods.has('GET')) methods.add('HEAD');
  methods.add('OPTIONS');
  const allow = ORDER.filter((m) => methods.has(m)).join(', ');
  if (req.method === 'OPTIONS') {
    res.status(204).set('Allow', allow).set(headers).end();
    return;
  }
  const method = (req.method === 'HEAD' ? 'GET' : req.method) as Method;
  const handler = handlers[method];
  if (!handler) {
    res.set('Allow', allow);
    return fail(
      res,
      405,
      'Method Not Allowed',
      `Die Methode ${req.method} ist hier nicht erlaubt.`,
    );
  }
  handler();
}

/** Alle Werte eines Cookies aus dem Header Cookie, in der gesendeten Reihenfolge */
export function cookies(header: string | undefined, name: string): string[] {
  const values: string[] = [];
  for (const part of (header ?? '').split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key !== name) continue;
    try {
      values.push(decodeURIComponent(value.join('=')));
    } catch {
      values.push(value.join('='));
    }
  }
  return values;
}

/** Token aus dem Header Authorization: Bearer <token> */
export function bearer(header: string | undefined): string | undefined {
  const match = /^Bearer\s+(\S+)$/i.exec(header ?? '');
  return match?.[1];
}

/** Liste von Entity-Tags aus If-Match oder If-None-Match */
export function entityTags(header: string | undefined): string[] {
  return (header ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
}

/** Body als JSON-Objekt oder undefined */
export function objectBody(req: Request): Record<string, unknown> | undefined {
  const body: unknown = req.body;
  return body !== null && typeof body === 'object' && !Array.isArray(body)
    ? (body as Record<string, unknown>)
    : undefined;
}
