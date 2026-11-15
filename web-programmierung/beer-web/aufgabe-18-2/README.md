# Beer Web

Webseite der Beer App aus der Vorlesung Web-Programmierung (Einheit 18). Gäste finden und bewerten Biere, Admins pflegen Biere und Brauereien. Alle Daten kommen von der Beer API.

Technik: [Angular](https://angular.dev) 22, TypeScript, Typen aus der OpenAPI-Beschreibung der Beer API über [openapi-typescript](https://openapi-ts.dev).

## Voraussetzung

- [Node.js](https://nodejs.org) 24
- die Beer API am Lösungsstand der Einheit 18 (mit CORS)

## Starten

Die Webseite braucht die laufende Beer API. Du startest beide Projekte in je einem Terminal.

**Beer API**, im Ordner der Beer API:

1. Kopiere `.env.example` nach `.env`, falls es die Datei noch nicht gibt. Ersetze den Wert von `JWT_SECRET` durch eine lange, zufällige Zeichenkette. `CORS_ORIGIN` bleibt `http://localhost:4200`, die Adresse dieser Webseite.
2. Führe die Befehle aus:

```bash
npm install
npm run db:reset
npm run start:dev
```

**Webseite**, im Ordner `beer-web`:

```bash
npm install
npm start
```

Die Webseite läuft unter <http://localhost:4200>, die Beer API unter <http://localhost:3000>. Die Adresse der API steht in `src/app/api-url.ts`.

## Zugangsdaten

Die Beispiel-User stehen in `users.txt` der Beer API. Mit `admin` siehst du die Aktionen zum Anlegen, Ändern und Löschen, mit `gast` bewertest du Biere. Ein eigener User entsteht über „Registrieren“.

| Name | Passwort | Rolle |
|---|---|---|
| `admin` | `admin123` | `admin` |
| `gast` | `gast123` | `user` |

## Typen aus der OpenAPI-Beschreibung

Die Typen der Server-DTOs stehen in `src/app/api/schema.ts`. Die Datei ist generiert und eingecheckt, damit die Webseite ohne laufende Beer API baut. Erzeuge sie neu, wenn sich Endpunkte oder DTOs der Beer API ändern:

```bash
npm run api:types
```

Der Befehl liest `http://localhost:3000/api-json`; die Beer API muss dafür laufen. Danach zeigt der Compiler jede Stelle in API-Client und Mapper, die nicht mehr zum Server passt.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm start` | Webseite starten; lädt nach jeder Änderung im Code neu |
| `npm run build` | Webseite nach `dist/` übersetzen |
| `npm run api:types` | `src/app/api/schema.ts` aus `/api-json` der laufenden Beer API erzeugen |
| `npm run format` | Code mit Prettier formatieren |

## Aufbau

Je Fachbereich ein Ordner in `src/app/`: `beers/`, `breweries/`, `ratings/`, `auth/`. Darin liegen:

| Datei | Aufgabe |
|---|---|
| `*.page.ts` | Container: holt Daten über den API-Client und hält sie als Signal |
| `beer-list.ts`, `rating-form.ts` … | Darstellung: nur `input()` und `output()` |
| `*.api.ts` | API-Client: Anfragen an die Beer API mit `HttpClient` |
| `*.mapper.ts` | Mapper: Server-DTO in Client-Modell und zurück |
| `beer.ts`, `rating.ts` … | Client-Modell |

`core/` enthält die Interceptors für Token und Fehler, die Meldungen und den `adminGuard`.
