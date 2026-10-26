# Beer API

Server der Beer App aus der Vorlesung Web-Programmierung. Die Anforderungen stehen im Dokument „Beer App – Anforderungen“.

Technik: [NestJS](https://docs.nestjs.com) 11, TypeScript, [Zod](https://zod.dev) über [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod), Swagger UI über [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction).

## Voraussetzung

[Node.js](https://nodejs.org) 24

## Starten

Im Ordner des Projekts:

```bash
npm install
npm run start:dev
```

Der Server antwortet unter <http://localhost:3000>. Swagger UI zeigt die Endpunkte unter <http://localhost:3000/api>.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run start:dev` | Server starten; startet nach jeder Änderung im Code neu |
| `npm run build` | Projekt nach `dist/` übersetzen |
| `npm run start:prod` | übersetztes Projekt aus `dist/` starten |
| `npm run lint` | Code mit ESLint prüfen und Formatierung korrigieren |
| `npx nest generate controller <name>` | Controller in `src/<name>/` anlegen und in `app.module.ts` eintragen |

## Beispiel-User

Die Zugangsdaten der Beispiel-User stehen in [`users.txt`](users.txt). Sie gelten nur für die lokale Entwicklung.
