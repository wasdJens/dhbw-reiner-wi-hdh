# Brauerei-ERP · Handbuch für Entwicklerinnen und Entwickler

Dieses Handbuch richtet sich an Partner, die ihre Software an das ERP der regionalen Brauereien anbinden. Es beschreibt Zugang, Ressourcen, Listen, Fehler und Versionen der API. Die vollständige Beschreibung aller Endpunkte steht in Swagger UI.

## 1. Überblick

Das ERP liefert zwei Arten von Daten über HTTP und JSON:

| Bereich | Inhalt | Endpunkte |
|---|---|---|
| Bestand | Flaschen je Artikel und Lagerort, Zeitpunkt der letzten Inventur | `GET /v2/artikel/{artikel_nr}/bestand` (aktuell), `GET /v1/artikel/{artikel_nr}/bestand` (abgekündigt) |
| Stammdaten | Brauereien und ihre Artikel mit Sorte, Alkoholgehalt und Preis | `GET /v2/brauereien`, `GET /v2/brauereien/{brauerei_nr}`, `GET /v2/artikel` |

Die Beer API liest hier den Bestand ihrer Biere. Typische Verwendung: Ein Partner übernimmt Brauereien und Artikel in sein eigenes System und fragt den Bestand eines Artikels ab, bevor er eine Bestellung annimmt. Das ERP liest nur; es nimmt keine Bestellungen an und bucht keinen Bestand ab.

Technik: [NestJS](https://docs.nestjs.com) 11, TypeScript, [Zod](https://zod.dev) über [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod), Swagger UI über [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction). Die Testumgebung hat keine Datenbank; die Daten stehen in `src/articles/article.ts` und `src/breweries/brewery.ts`.

## 2. Schnellstart

Voraussetzung ist [Node.js](https://nodejs.org) 24.

1. Kopiere im Ordner des Projekts `.env.example` nach `.env`. `.env` steht nicht im Repository.
2. Starte das ERP:

   ```bash
   npm install
   npm run start:dev
   ```

   Das ERP antwortet unter <http://localhost:3100>. Ohne `ERP_API_KEY` in `.env` startet es nicht.
3. Öffne Swagger UI unter <http://localhost:3100/api>. Klicke auf **Authorize** und trage den Key `erp-demo-key` ein.
4. Importiere in Postman die Collection `brauerei-erp.postman_collection.json` aus diesem Ordner (**File → Import**). Die Variablen `erpUrl` und `erpApiKey` sind vorbelegt.
5. Sende die Anfrage „Brauereien, Seite 1“. Das ERP antwortet mit `200` und den ersten drei Brauereien.

Die Collection enthält drei Beispielanfragen. Alle weiteren Anfragen baust du nach Swagger UI und diesem Handbuch.

## 3. Zugang

Jede Anfrage an einen Endpunkt braucht den Header `X-API-Key`:

```http
GET /v2/brauereien?seite=1 HTTP/1.1
Host: localhost:3100
X-API-Key: erp-demo-key
```

Der Key der Testumgebung steht in `ERP_API_KEY` in `.env` (Vorlage: `erp-demo-key`). In Produktion bekommt jeder Partner einen eigenen Key; er gehört in die Konfiguration des Partners und nie in ein Repository.

Swagger UI (`/api`) und die OpenAPI-Beschreibung (`/api-json`) brauchen keinen Key.

Ohne Key oder mit falschem Key antwortet das ERP mit `401`:

```json
{ "fehler": "API-Key fehlt oder ist ungültig", "code": "AUTH_401" }
```

Prüfe in diesem Fall, ob der Header genau `X-API-Key` heißt und der Wert mit `ERP_API_KEY` in der `.env` des ERP übereinstimmt.

## 4. Ressourcen und Datenmodell

Preise stehen in Cent als ganze Zahl. Zeitpunkte stehen in UTC nach ISO 8601 (`2026-11-15T13:03:00Z`). Ein Artikel gehört über `brauerei_nr` zu genau einer Brauerei; eine Brauerei hat einen oder mehrere Artikel.

```text
Brauerei (brauerei_nr) 1 ──── n Artikel (artikel_nr, brauerei_nr) 1 ──── 1 Bestand (lagerorte)
```

### Brauerei

`GET /v2/brauereien/{brauerei_nr}` und die Einträge in `GET /v2/brauereien`:

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `brauerei_nr` | string | Nummer der Brauerei, eindeutig | `"BRA-01"` |
| `name` | string | Name der Brauerei | `"Privatbrauerei Schlumberger"` |
| `ort` | string | Ort der Brauerei | `"Nattheim"` |
| `status` | `"aktiv"` \| `"gesperrt"` | `aktiv`: Die Brauerei liefert über das ERP. `gesperrt`: Die Brauerei liefert derzeit nicht über das ERP; ihre Artikel sind nicht bestellbar. | `"aktiv"` |
| `geaendert_am` | string (ISO 8601, UTC) | Zeitpunkt der letzten Änderung | `"2026-11-15T13:03:00Z"` |

```json
{ "brauerei_nr": "BRA-01", "name": "Privatbrauerei Schlumberger", "ort": "Nattheim", "status": "aktiv", "geaendert_am": "2026-11-15T13:03:00Z" }
```

### Artikel

Einträge in `GET /v2/artikel`. Ein Artikel ist ein Bier in einer Flaschengröße.

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `artikel_nr` | string | Artikelnummer, eindeutig | `"BR-1001"` |
| `bezeichnung` | string | Bezeichnung mit Flaschengröße | `"Nattheimer Spezial 0,5 l"` |
| `brauerei_nr` | string | Nummer der Brauerei, die den Artikel braut | `"BRA-01"` |
| `sorte` | string | Biersorte | `"Spezial"` |
| `alkohol_vol` | number | Alkoholgehalt in Volumenprozent | `5.4` |
| `preis_cent` | integer | Abgabepreis je Flasche in Cent | `139` |
| `geaendert_am` | string (ISO 8601, UTC) | Zeitpunkt der letzten Änderung | `"2026-11-15T13:03:00Z"` |

```json
{ "artikel_nr": "BR-1001", "bezeichnung": "Nattheimer Spezial 0,5 l", "brauerei_nr": "BRA-01", "sorte": "Spezial", "alkohol_vol": 5.4, "preis_cent": 139, "geaendert_am": "2026-11-15T13:03:00Z" }
```

### Bestand

`GET /v2/artikel/{artikel_nr}/bestand`. Der Bestand steht je Lagerort; die Summe bildet der Client.

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `artikel_nr` | string | Artikelnummer | `"BR-1001"` |
| `bezeichnung` | string | Bezeichnung des Artikels | `"Nattheimer Spezial 0,5 l"` |
| `lagerorte` | array | Bestand je Lagerort, je Eintrag `name` (string) und `bestand` (integer, Flaschen) | `[{ "name": "Hauptlager", "bestand": 200 }, { "name": "Kühlhaus", "bestand": 40 }]` |
| `aktualisiert_am` | string (ISO 8601, UTC) | Zeitpunkt der letzten Inventur | `"2026-11-15T13:03:00Z"` |

```json
{ "artikel_nr": "BR-1001", "bezeichnung": "Nattheimer Spezial 0,5 l", "lagerorte": [{ "name": "Hauptlager", "bestand": 200 }, { "name": "Kühlhaus", "bestand": 40 }], "aktualisiert_am": "2026-11-15T13:03:00Z" }
```

## 5. Listen und Seiten

`GET /v2/brauereien` und `GET /v2/artikel` liefern ihre Einträge seitenweise. Jede Antwort steckt in derselben Hülle:

| Feld | Bedeutung |
|---|---|
| `daten` | Einträge der Seite, höchstens 3; hinter der letzten Seite leer |
| `seite` | Nummer der gelieferten Seite |
| `seiten_gesamt` | Zahl aller Seiten |

Eine Seite enthält höchstens **3 Einträge**. Die Größe ist fest und lässt sich nicht ändern. Die Einträge sind nach Nummer sortiert (`brauerei_nr` bzw. `artikel_nr`).

| Query-Parameter | Endpunkte | Bedeutung |
|---|---|---|
| `seite` | beide | Nummer der Seite, ganze Zahl ab 1, optional (Standard `1`) |
| `brauerei_nr` | `GET /v2/artikel` | nur Artikel dieser Brauerei, optional |

`GET /v2/brauereien?seite=1`:

```json
{ "daten": [ { "brauerei_nr": "BRA-01", … }, { "brauerei_nr": "BRA-02", … }, { "brauerei_nr": "BRA-03", … } ], "seite": 1, "seiten_gesamt": 3 }
```

So liest ein Client alle Einträge:

1. Frage Seite 1 an.
2. Übernimm die Einträge aus `daten`.
3. Frage die nächste Seite an, solange `seite` kleiner als `seiten_gesamt` ist.

```typescript
const breweries = [];
let page = 1;
let pages = 1;
do {
  const response = await fetch(`${erpUrl}/v2/brauereien?seite=${page}`, {
    headers: { 'X-API-Key': erpApiKey },
  });
  const body = await response.json();
  breweries.push(...body.daten);
  pages = body.seiten_gesamt;
  page++;
} while (page <= pages);
```

Eine Seite hinter der letzten ist kein Fehler: `GET /v2/brauereien?seite=4` liefert `{ "daten": [], "seite": 4, "seiten_gesamt": 3 }`.

## 6. Fehler

Jeder Fehler kommt im selben Format: `fehler` beschreibt den Fehler für Menschen, `code` ist fest und für Programme gedacht.

```json
{ "fehler": "Brauerei BRA-99 unbekannt", "code": "BRAUEREI_404" }
```

| Status | `code` | Bedeutung | Was tun? |
|---|---|---|---|
| `400` | `ANFRAGE_400` | Ein Query-Parameter ist ungültig, etwa `seite=0` oder `seite=abc`. `fehler` nennt den Parameter. | Parameter nach Abschnitt 5 korrigieren; die Anfrage nicht unverändert wiederholen. |
| `401` | `AUTH_401` | Der Header `X-API-Key` fehlt oder der Key ist falsch. | Header und Key nach Abschnitt 3 prüfen. |
| `404` | `BRAUEREI_404` | Die Brauerei aus dem Pfad oder aus dem Filter `brauerei_nr` gibt es nicht. | Nummer prüfen; gültige Nummern liefert `GET /v2/brauereien`. |
| `404` | `ARTIKEL_404` | Den Artikel aus dem Pfad gibt es nicht. | Nummer prüfen; gültige Nummern liefert `GET /v2/artikel`. |

Ein unbekannter Pfad ergibt `404` mit `code` `HTTP_404`.

## 7. Versionen und Abkündigung

Die Version steht am Anfang des Pfads. **v2 ist aktuell**; neue Clients nutzen nur v2.

**v1 ist abgekündigt.** `GET /v1/artikel/{artikel_nr}/bestand` liefert den Bestand als eine Summe (`bestand`) und den Tag der Inventur im Format `TT.MM.JJJJ` (`stand`). Jede Antwort von v1, auch `404`, trägt drei Header:

| Header | Wert | Bedeutung |
|---|---|---|
| `Deprecation` | `@1798761600` | abgekündigt seit 1. Januar 2027 ([RFC 9745](https://www.rfc-editor.org/rfc/rfc9745)) |
| `Sunset` | `Sat, 01 Jan 2028 00:00:00 GMT` | abgeschaltet ab 1. Januar 2028 ([RFC 8594](https://www.rfc-editor.org/rfc/rfc8594)) |
| `Link` | `</api>; rel="deprecation"` | Verweis auf diese Dokumentation |

Wechsel von v1 auf v2 beim Bestand:

| v1 | v2 |
|---|---|
| `bestand`: Summe aller Lagerorte | `lagerorte`: Bestand je Lagerort; die Summe bildet der Client |
| `stand`: `15.11.2026` | `aktualisiert_am`: `2026-11-15T13:03:00Z` |

Die Stammdaten gibt es nur in v2.

## 8. Verzögerung

`ERP_DELAY_MS` in `.env` verzögert jede Antwort des ERP um die angegebene Zahl an Millisekunden, auch Fehler. Standard ist `0`. Damit prüfst du, wie ein Client reagiert, wenn das ERP langsam antwortet. Für einen einzelnen Start setzt du den Wert vor dem Befehl:

```bash
ERP_DELAY_MS=3000 npm run start:dev
```

Der Wert vor dem Befehl gilt vor dem Wert in `.env`. Unter Windows (PowerShell) setzt du ihn mit `$env:ERP_DELAY_MS=3000` und startest danach mit `npm run start:dev`. Swagger UI und `/api-json` antworten ohne Verzögerung.

## 9. Änderungsprotokoll

| Datum | Änderung |
|---|---|
| 2026-11 | Stammdaten in v2: `GET /v2/brauereien`, `GET /v2/brauereien/{brauerei_nr}`, `GET /v2/artikel` mit Filter `brauerei_nr`; Listen mit Seiten zu je 3 Einträgen; neue Fehler `ANFRAGE_400` und `BRAUEREI_404` |
| davor | Bestand in v1 (Summe aller Lagerorte, abgekündigt mit `Deprecation` und `Sunset` am 1. Januar 2028) und in v2 (je Lagerort, Zeitpunkt nach ISO 8601) |

## 10. Befehle

| Befehl | Wirkung |
|---|---|
| `npm run start:dev` | ERP starten; startet nach jeder Änderung im Code neu |
| `npm run build` | Projekt nach `dist/` übersetzen |
| `npm run start:prod` | übersetztes Projekt aus `dist/` starten |
| `npm run lint` | Code mit ESLint prüfen und Formatierung korrigieren |
