# Beer Catalog

Katalog der regionalen Brauereien aus der Vorlesung Web-Programmierung, Einheit 19. Der Katalog übernimmt Brauereien und Biere aus dem Brauerei-ERP und nimmt Bestellungen nur an, wenn das ERP genug Bestand meldet. Das Handbuch des ERP ist das README im Ordner `brauerei-erp/`.

Technik: [NestJS](https://docs.nestjs.com) 11, TypeScript, [Zod](https://zod.dev) über [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod), Swagger UI über [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction). Es gibt keine Datenbank und keine Anmeldung. Die Daten liegen im Arbeitsspeicher; nach jedem Start ist der Katalog leer.

## Voraussetzung

[Node.js](https://nodejs.org) 24

## Starten

**Starte zuerst das ERP** nach dem Schnellstart in seinem Handbuch. Es antwortet unter <http://localhost:3100>.

Danach im Ordner des Katalogs:

1. Kopiere `.env.example` nach `.env`. Die Werte passen zum ERP aus dem Schnellstart. `.env` steht nicht im Repository.
2. Führe die Befehle aus:

```bash
npm install
npm run start:dev
```

Der Katalog antwortet unter <http://localhost:3000>. Swagger UI zeigt die Endpunkte unter <http://localhost:3000/api>.

## Variablen in `.env`

| Variable | Bedeutung | Wert für das ERP aus dem Schnellstart |
|---|---|---|
| `ERP_URL` | Adresse des Brauerei-ERP | `http://localhost:3100` |
| `ERP_API_KEY` | API-Key, den der Katalog im Header `X-API-Key` an das ERP sendet; derselbe Wert wie `ERP_API_KEY` in der `.env` des ERP | `erp-demo-key` |

Fehlt eine der beiden Variablen, startet der Katalog nicht.

## Endpunkte

| Endpunkt | Wirkung |
|---|---|
| `GET /breweries`, `GET /breweries/:id` | Brauereien im Katalog |
| `PATCH /breweries/:id` | `name` oder `city` einer Brauerei lokal ändern |
| `POST /breweries/import` | Brauereien aus dem ERP übernehmen; Antwort ist ein Bericht `{ created, updated, unchanged, skipped }` |
| `GET /beers`, `GET /beers/:id` | Biere im Katalog |
| `PATCH /beers/:id` | `name`, `style`, `abv` oder `price` eines Biers lokal ändern |
| `POST /beers/import` | Biere aus dem ERP übernehmen; Bericht wie bei den Brauereien |
| `GET /orders` | Bestellungen |
| `POST /orders` | Bestellung `{ "beerId": 1, "bottles": 24 }` anlegen, wenn das ERP genug Bestand meldet |

Im Basisprojekt antworten `POST /beers/import` und `POST /orders` mit `501 Not Implemented`. Die Kommentare mit `TODO` im Code nennen die Schritte und Dateien.

Ist das ERP nicht erreichbar oder antwortet es nicht innerhalb von 2 Sekunden, antwortet der Katalog mit `503`. Passt die Antwort des ERP nicht zum erwarteten Schema, antwortet er mit `502`.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run start:dev` | Katalog starten; startet nach jeder Änderung im Code neu, der Katalog ist danach leer |
| `npm run build` | Projekt nach `dist/` übersetzen |
| `npm run start:prod` | übersetztes Projekt aus `dist/` starten |
| `npm run lint` | Code mit ESLint prüfen und Formatierung korrigieren |
