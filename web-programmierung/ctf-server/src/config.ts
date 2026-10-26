// Flags und Einstellungen aus Umgebungsvariablen, mit Standardwerten.
// Für jeden Jahrgang neue Flags und ein neues Secret setzen, siehe README.md.

function env(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim() !== '' ? value.trim() : fallback;
}

/** Grundwert je Level; der Server hängt vier Zeichen des Teams an */
export const flags: Record<number, string> = {
  0: env('CTF_FLAG_0', 'FLAG{team-angelegt}'),
  1: env('CTF_FLAG_1', 'FLAG{siegel-entfernt}'),
  2: env('CTF_FLAG_2', 'FLAG{umzug-verfolgt}'),
  3: env('CTF_FLAG_3', 'FLAG{ausweis-geaendert}'),
  4: env('CTF_FLAG_4', 'FLAG{wartezeit-eingehalten}'),
  5: env('CTF_FLAG_5', 'FLAG{format-ausgehandelt}'),
  6: env('CTF_FLAG_6', 'FLAG{kiste-angelegt}'),
  7: env('CTF_FLAG_7', 'FLAG{kiste-gefuellt}'),
  8: env('CTF_FLAG_8', 'FLAG{fassung-geprueft}'),
  9: env('CTF_FLAG_9', 'FLAG{nicht-geaendert}'),
  10: env('CTF_FLAG_10', 'FLAG{tor-geoeffnet}'),
};

export const settings = {
  // Signiert Team-Token, Flags und das Token für Level 10
  secret: env('CTF_SECRET', 'ctf-brauhaus-standard'),
  // Level 4: Sekunden bis der Keller öffnet (Header Retry-After)
  retryAfter: Number(env('CTF_RETRY_AFTER', '10')),
};

/** Ort und Hinweis für das nächste Level, steht in jeder Antwort mit Flag */
export const next: Record<
  number,
  { level: number; path: string; hint: string } | null
> = {
  0: {
    level: 1,
    path: '/ctf/1',
    hint: 'Das Lager deines Teams ist versiegelt.',
  },
  1: {
    level: 2,
    path: '/ctf/2',
    hint: 'Die Brauerei ist umgezogen, mehr als einmal.',
  },
  2: {
    level: 3,
    path: '/ctf/3',
    hint: 'Der Pförtner stellt dir einen Ausweis aus.',
  },
  3: {
    level: 4,
    path: '/ctf/4',
    hint: 'Zusatz: Der Keller hat gerade geschlossen.',
  },
  4: {
    level: 5,
    path: '/ctf/5',
    hint: 'Einheit 4: Der Lieferschein liegt in mehreren Formaten vor.',
  },
  5: { level: 6, path: '/ctf/6', hint: 'Im Lager fehlt eine Kiste.' },
  6: { level: 7, path: '/ctf/7', hint: 'Die Kiste ist noch nicht voll.' },
  7: {
    level: 8,
    path: '/ctf/8',
    hint: 'Der Braumeister arbeitet am selben Rezept wie du.',
  },
  8: {
    level: 9,
    path: '/ctf/9',
    hint: 'Zusatz: Manche Antworten ändern sich nie.',
  },
  9: {
    level: 10,
    path: '/ctf/10',
    hint: 'Einheit 13: Das Tor öffnet nur ein Token.',
  },
  10: null,
};
