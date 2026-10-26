# CTF-Server

Server für das Capture the Flag der Web-Programmierung (Einheiten 3, 4 und 13). Das CTF erkundest du über HTTP mit Postman oder curl; der Code gehört nicht zur Aufgabe.

Technik: [NestJS](https://docs.nestjs.com) 11, TypeScript, keine Datenbank. Teams, Siegel, Kisten und Rezepte liegen im Arbeitsspeicher.

## Voraussetzung

[Node.js](https://nodejs.org) 24

## Starten

Im Ordner des Projekts:

```bash
npm install
npm start
```

Der Server antwortet unter <http://localhost:3001>, das CTF beginnt mit `GET /ctf`.

## Port

Standard ist 3001. Der Port weicht von der Beer API (3000) ab, damit beide gleichzeitig laufen können (Level 10 in Einheit 13). Anderer Port:

```bash
PORT=3101 npm start
```

## Zurücksetzen

Beende den Server mit `Strg+C` (macOS: `Ctrl+C`) und starte ihn neu. Der Zustand aller Level beginnt neu; euer Team-Token gilt weiter.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm start` | Server starten |
| `npm run start:dev` | Server starten; startet nach jeder Änderung im Code neu |
| `npm run build` | Projekt nach `dist/` übersetzen |
| `npm run start:prod` | übersetztes Projekt aus `dist/` starten |
| `npm run lint` | Code mit ESLint prüfen und Formatierung korrigieren |
