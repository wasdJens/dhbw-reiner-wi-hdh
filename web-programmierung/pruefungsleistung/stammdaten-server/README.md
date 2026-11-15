# Stammdaten-Server · Handbuch für Entwicklerinnen und Entwickler

Die Prismarine Solutions GmbH führt ihre Stammdaten in diesem System: Personen, Abteilungen, Standorte, Räume, Inventar, Artikel und Feiertage. Dieses Handbuch richtet sich an Teams, die ihr Backend an den Stammdaten-Server anbinden. Es beschreibt Zugang, Ressourcen, Listen, Datenstände und Fehler. Die vollständige Beschreibung aller Endpunkte steht in Swagger UI.

Alle Daten sind **fiktiv**. Namen und E-Mail-Adressen sind erfunden, E-Mail-Adressen enden auf `@example.org`. Nur die Feiertage sind real.

## 1. Überblick

Der Server liest nur. Er nimmt keine Änderungen an, mit einer Ausnahme: Er kann zwischen zwei Datenständen wechseln (Abschnitt 6).

| Ressource | Pfad | Einträge (Stand 1) | Schlüssel |
|---|---|---|---|
| Person | `/v1/personen` | 250 | `personal_nr` |
| Abteilung | `/v1/abteilungen` | 8 | `abteilung_nr` |
| Standort | `/v1/standorte` | 6 | `standort_nr` |
| Raum | `/v1/raeume` | 30 | `raum_nr` |
| Inventar | `/v1/inventar` | 200 | `inventar_nr` |
| Artikel | `/v1/artikel` | 120 | `artikel_nr` |
| Feiertag | `/v1/feiertage` | 24 | `datum` |

Jede Ressource hat dieselben zwei Endpunkte:

| Endpunkt | Antwort `200` |
|---|---|
| `GET /v1/<ressource>` | eine Seite der Liste (Abschnitt 5) |
| `GET /v1/<ressource>/{schlüssel}` | ein Eintrag, zum Beispiel `GET /v1/personen/P-00017` |

Technik: [NestJS](https://docs.nestjs.com) 11, TypeScript, [Zod](https://zod.dev) über [nestjs-zod](https://github.com/BenLorantfy/nestjs-zod), Swagger UI über [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction). Es gibt keine Datenbank. Die Daten liegen als JSON in `daten/stand-1/` und `daten/stand-2/`; diese Dateien lassen sich auch ohne Server lesen.

## 2. Schnellstart

Voraussetzung ist [Node.js](https://nodejs.org) 24.

1. Kopiere im Ordner des Projekts `.env.example` nach `.env`.
2. Starte den Server:

   ```bash
   npm install
   npm run start:dev
   ```

   Der Server antwortet unter <http://localhost:3300>. Ohne `STAMMDATEN_API_KEY` in `.env` startet er nicht.
3. Öffne Swagger UI unter <http://localhost:3300/api>. Klicke auf **Authorize** und trage den Key `stammdaten-demo-key` ein.
4. Importiere in Postman die Collection `stammdaten-server.postman_collection.json` aus diesem Ordner (**File → Import**). Die Variablen `stammdatenUrl` und `stammdatenApiKey` sind vorbelegt.
5. Sende die Anfrage „Alle Personen in einer Anfrage“. Der Server antwortet mit `200` und allen 250 Personen.

Die Collection enthält je Ressource eine Liste und einen Eintrag sowie einen Ordner „Datenstände“.

Der Server läuft neben deinem Backend: Dein Backend nutzt Port `3000`, der Stammdaten-Server Port `3300`. Starte ihn in einem eigenen Terminal.

## 3. Zugang

Jede Anfrage braucht den Header `X-API-Key`:

```http
GET /v1/personen/P-00017 HTTP/1.1
Host: localhost:3300
X-API-Key: stammdaten-demo-key
```

Der Key steht in `STAMMDATEN_API_KEY` in `.env` (Vorlage: `stammdaten-demo-key`). In deinem Backend gehören Adresse und Key in dessen `.env`, nicht in den Code:

```bash
STAMMDATEN_URL=http://localhost:3300
STAMMDATEN_API_KEY=stammdaten-demo-key
```

Swagger UI (`/api`) und die OpenAPI-Beschreibung (`/api-json`) brauchen keinen Key.

Ohne Key oder mit falschem Key antwortet der Server mit `401`:

```json
{ "fehler": "API-Key fehlt oder ist ungültig", "code": "AUTH_401" }
```

## 4. Ressourcen und Datenmodell

Konventionen für alle Ressourcen:

- Feldnamen sind deutsch und in snake_case.
- Nummern sind Strings mit Präfix, zum Beispiel `P-00017`.
- Geldbeträge stehen in Cent als ganze Zahl.
- Ein Tag steht als `JJJJ-MM-TT`, ein Zeitpunkt in UTC nach ISO 8601 (`2026-11-15T09:00:00Z`).
- `geaendert_am` ist der Zeitpunkt der letzten Änderung eines Eintrags. Feiertage haben kein `geaendert_am`.

Beziehungen bestehen über Nummern:

```text
Abteilung (abteilung_nr) 1 ── n Person (personal_nr) n ── 1 Standort (standort_nr)
Abteilung.leitung_nr ──────────▶ Person
Raum.standort_nr ──────────────▶ Standort
Inventar.standort_nr ──────────▶ Standort
Inventar.verantwortlich_nr ────▶ Person
Artikel, Feiertag: ohne Beziehung
```

Jeder Verweis zeigt auf einen Eintrag, den es gibt. `leitung_nr` und `verantwortlich_nr` zeigen immer auf eine aktive Person, in beiden Datenständen.

### Person

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `personal_nr` | string | Personalnummer, eindeutig | `"P-00017"` |
| `vorname` | string | Vorname | `"Ida"` |
| `nachname` | string | Nachname | `"Köhler"` |
| `email` | string | E-Mail-Adresse, eindeutig | `"ida.koehler@example.org"` |
| `geburtsdatum` | string (Tag) | Geburtsdatum | `"1998-06-27"` |
| `abteilung_nr` | string | Nummer der Abteilung | `"ABT-05"` |
| `standort_nr` | string | Nummer des Standorts | `"STO-03"` |
| `status` | `"aktiv"` \| `"ausgetreten"` | `aktiv`: arbeitet für die Prismarine Solutions GmbH. `ausgetreten`: arbeitet seit `austritt_am` nicht mehr dort. | `"aktiv"` |
| `eintritt_am` | string (Tag) | Tag des Eintritts | `"2020-10-19"` |
| `austritt_am` | string (Tag) \| null | Tag des Austritts; `null`, solange aktiv | `null` |
| `geaendert_am` | string (Zeitpunkt) | letzte Änderung | `"2026-10-11T08:56:00Z"` |

```json
{ "personal_nr": "P-00017", "vorname": "Ida", "nachname": "Köhler", "email": "ida.koehler@example.org", "geburtsdatum": "1998-06-27", "abteilung_nr": "ABT-05", "standort_nr": "STO-03", "status": "aktiv", "eintritt_am": "2020-10-19", "austritt_am": null, "geaendert_am": "2026-10-11T08:56:00Z" }
```

### Abteilung

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `abteilung_nr` | string | Nummer der Abteilung, eindeutig | `"ABT-06"` |
| `name` | string | Name | `"IT"` |
| `kostenstelle` | string | Kostenstelle | `"KST-4100"` |
| `leitung_nr` | string | Personalnummer der Leitung | `"P-00021"` |
| `geaendert_am` | string (Zeitpunkt) | letzte Änderung | `"2025-03-08T23:29:00Z"` |

Die acht Abteilungen: `ABT-01` Geschäftsführung, `ABT-02` Personal, `ABT-03` Finanzen und Controlling, `ABT-04` Vertrieb, `ABT-05` Einkauf, `ABT-06` IT, `ABT-07` Facility Management, `ABT-08` Kundenservice.

### Standort

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `standort_nr` | string | Nummer des Standorts, eindeutig | `"STO-01"` |
| `name` | string | Name | `"Zentrale Heidenheim"` |
| `strasse` | string | Straße und Hausnummer | `"Hafenstraße 12"` |
| `plz` | string | Postleitzahl | `"89518"` |
| `ort` | string | Ort | `"Heidenheim an der Brenz"` |
| `land` | string | Land (ISO 3166-1 alpha-2) | `"DE"` |
| `geaendert_am` | string (Zeitpunkt) | letzte Änderung | `"2025-07-06T20:05:00Z"` |

Die sechs Standorte: `STO-01` Zentrale Heidenheim, `STO-02` Niederlassung Ulm, `STO-03` Niederlassung Stuttgart, `STO-04` Niederlassung Aalen, `STO-05` Lager Giengen, `STO-06` Schulungszentrum Augsburg.

### Raum

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `raum_nr` | string | Nummer des Raums, eindeutig | `"RAU-001"` |
| `bezeichnung` | string | Bezeichnung | `"Besprechungsraum Nordsee"` |
| `art` | `"besprechung"` \| `"schulung"` \| `"werkstatt"` \| `"lager"` | Art des Raums | `"besprechung"` |
| `standort_nr` | string | Nummer des Standorts | `"STO-01"` |
| `etage` | integer | Etage, 0 ist das Erdgeschoss | `0` |
| `plaetze` | integer | Sitzplätze; 0 bei Lagerflächen | `10` |
| `ausstattung` | string[] | Ausstattung, kann leer sein | `["Bildschirm", "Videokonferenz", "Whiteboard"]` |
| `status` | `"verfuegbar"` \| `"gesperrt"` | `verfuegbar`: kann genutzt werden. `gesperrt`: derzeit nicht nutzbar, zum Beispiel wegen Renovierung. | `"verfuegbar"` |
| `geaendert_am` | string (Zeitpunkt) | letzte Änderung | `"2025-01-07T00:13:00Z"` |

### Inventar

Eine Inventar-Position ist ein einzelnes Gerät mit Seriennummer.

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `inventar_nr` | string | Inventarnummer, eindeutig | `"INV-0003"` |
| `bezeichnung` | string | Hersteller und Modell | `"Epson Beamer EB-W51"` |
| `kategorie` | string | Kategorie | `"Präsentationstechnik"` |
| `hersteller` | string | Hersteller | `"Epson"` |
| `seriennummer` | string | Seriennummer des Herstellers | `"EPS997911"` |
| `standort_nr` | string | Standort, an dem das Gerät steht | `"STO-04"` |
| `verantwortlich_nr` | string | Personalnummer der verantwortlichen Person | `"P-00006"` |
| `anschaffung_am` | string (Tag) | Tag der Anschaffung | `"2023-04-05"` |
| `anschaffungswert_cent` | integer | Preis bei Anschaffung in Cent, brutto | `54900` |
| `status` | `"in_betrieb"` \| `"in_reparatur"` \| `"ausgemustert"` | `in_betrieb`: nutzbar. `in_reparatur`: vorübergehend nicht nutzbar. `ausgemustert`: dauerhaft außer Betrieb. | `"in_betrieb"` |
| `geaendert_am` | string (Zeitpunkt) | letzte Änderung | `"2026-04-03T06:00:00Z"` |

Kategorien: Audio, Fahrzeug, Kamera, Messe, Notebook, Präsentationstechnik, Reinigung, Tablet, Werkzeug.

### Artikel

Ein Artikel des Einkaufskatalogs.

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `artikel_nr` | string | Artikelnummer, eindeutig | `"ART-0001"` |
| `bezeichnung` | string | Bezeichnung | `"Kugelschreiber blau"` |
| `kategorie` | string | Kategorie | `"Büromaterial"` |
| `einheit` | string | Einheit, auf die sich der Preis bezieht | `"Stück"` |
| `preis_cent` | integer | Preis je Einheit in Cent, netto | `129` |
| `mwst_satz` | integer | Mehrwertsteuersatz in Prozent (7 oder 19) | `19` |
| `status` | `"lieferbar"` \| `"nicht_lieferbar"` | `lieferbar`: kann bestellt werden. `nicht_lieferbar`: derzeit nicht bestellbar. | `"lieferbar"` |
| `geaendert_am` | string (Zeitpunkt) | letzte Änderung | `"2025-06-29T15:13:00Z"` |

Kategorien: Arbeitsschutz, Büromaterial, Druckerzubehör, Getränke, IT-Zubehör, Lebensmittel, Möbel, Papier, Reinigung, Werbemittel.

### Feiertag

Die gesetzlichen Feiertage in Baden-Württemberg 2026 und 2027. Sie sind in beiden Datenständen gleich.

| Feld | Typ | Bedeutung | Beispiel |
|---|---|---|---|
| `datum` | string (Tag) | Tag des Feiertags, eindeutig | `"2026-12-25"` |
| `name` | string | Name | `"1. Weihnachtstag"` |
| `bundesland` | string | Bundesland, in dem der Feiertag gilt | `"BW"` |

## 5. Listen

Jede Liste steckt in derselben Hülle:

| Feld | Bedeutung |
|---|---|
| `daten` | Einträge der Seite; hinter der letzten Seite leer |
| `seite` | Nummer der gelieferten Seite |
| `pro_seite` | Einträge je Seite |
| `gesamt` | Zahl aller Einträge, die zu den Filtern passen |
| `seiten_gesamt` | Zahl aller Seiten |

Die Einträge sind nach ihrem Schlüssel sortiert.

`GET /v1/abteilungen?pro_seite=2`:

```json
{ "daten": [ { "abteilung_nr": "ABT-01", … }, { "abteilung_nr": "ABT-02", … } ], "seite": 1, "pro_seite": 2, "gesamt": 8, "seiten_gesamt": 4 }
```

**Alles in einer Anfrage.** Eine Seite enthält bis zu 500 Einträge. Jede Ressource passt damit auf eine Seite: `GET /v1/personen?pro_seite=500` liefert alle Personen.

Query-Parameter, alle optional und kombinierbar:

| Parameter | Ressourcen | Bedeutung |
|---|---|---|
| `seite` | alle | Nummer der Seite, ganze Zahl ab 1 (Standard `1`) |
| `pro_seite` | alle | Einträge je Seite, 1 bis 500 (Standard `100`) |
| `geaendert_seit` | alle außer Feiertage | nur Einträge, deren `geaendert_am` **nach** diesem Zeitpunkt liegt, z. B. `2026-11-16T00:00:00Z` |
| `status` | Personen, Räume, Inventar, Artikel | nur Einträge mit diesem Status; erlaubt sind die Werte aus Abschnitt 4 |
| `art` | Räume | nur Räume dieser Art |
| `abteilung_nr` | Personen | nur Personen dieser Abteilung |
| `standort_nr` | Personen, Räume, Inventar | nur Einträge dieses Standorts |
| `verantwortlich_nr` | Inventar | nur Geräte dieser verantwortlichen Person |
| `kategorie` | Inventar, Artikel | nur Einträge dieser Kategorie, genau wie geschrieben (`Getränke`, nicht `getraenke`) |
| `jahr` | Feiertage | nur Feiertage dieses Jahres |

Ein Filter, zu dem kein Eintrag passt, ist kein Fehler: `GET /v1/raeume?standort_nr=STO-99` liefert `daten: []` und `gesamt: 0`.

So liest ein Client alle Personen:

```typescript
const response = await fetch(`${stammdatenUrl}/v1/personen?pro_seite=500`, {
  headers: { 'X-API-Key': stammdatenApiKey },
});
const body = await response.json();
const personen = body.daten;
```

Willst du in Seiten lesen, frage die nächste Seite an, solange `seite` kleiner als `seiten_gesamt` ist.

## 6. Datenstände

Echte Stammdaten ändern sich: Menschen ziehen um oder treten aus, Preise steigen, Geräte werden ausgemustert. Damit du einen zweiten Import und die Sonderfälle deiner Prozesse zeigen kannst, hat der Server zwei Datenstände:

| Stand | Bedeutung |
|---|---|
| `1` | Auslieferungszustand; gilt nach jedem Start |
| `2` | nach den Änderungen vom 01.12.2026: geänderte, neue, inaktive und gelöschte Einträge |

Der aktuelle Stand:

```http
GET /system/stand
```

```json
{ "stand": 1, "beschreibung": "Auslieferungszustand" }
```

Stand wechseln:

```http
PUT /system/stand
Content-Type: application/json

{ "stand": 2 }
```

```json
{ "stand": 2, "beschreibung": "nach den Änderungen vom 01.12.2026" }
```

- Der Wechsel gilt sofort für alle Anfragen, bis zum nächsten Wechsel oder Neustart.
- Mit `STAMMDATEN_STAND=2` in `.env` startet der Server in Stand 2.
- Jeder Eintrag, der sich in Stand 2 ändert oder neu ist, hat `geaendert_am` = `2026-12-01T08:00:00Z`. Alle Einträge von Stand 1 sind älter als `2026-11-16T00:00:00Z`. `geaendert_seit=2026-11-16T00:00:00Z` liefert in Stand 2 deshalb genau die geänderten, inaktiven und neuen Einträge.
- Ein gelöschter Eintrag fehlt in der Liste. `GET /v1/<ressource>/{schlüssel}` antwortet für ihn mit `410 Gone`, damit dein Backend „gelöscht“ von „nie vorhanden“ (`404`) unterscheiden kann.

| Art | Anzahl |
|---|---|
| geändert | 10 Personen, 5 Artikel |
| inaktiv | 8 Personen (`ausgetreten`), 6 Inventar-Positionen (`ausgemustert`) |
| neu | 15 Personen, 10 Inventar-Positionen |
| gelöscht | 3 Personen, 2 Räume |

Abteilungen, Standorte und Feiertage ändern sich nicht. Keine gelöschte oder ausgetretene Person ist Leitung einer Abteilung oder verantwortlich für Inventar.

Alle Änderungen von Stand 1 auf Stand 2:

| Ressource | Nummer | Art | Änderung |
|---|---|---|---|
| Person | `P-00045` | geändert | nachname Hofmann → Sommer, email elias.hofmann@example.org → elias.sommer@example.org |
| Person | `P-00078` | geändert | nachname Krüger → Berger, email ida.krueger@example.org → ida.berger@example.org |
| Person | `P-00112` | geändert | nachname Huber → Winter, email mehmet.huber@example.org → mehmet.winter@example.org |
| Person | `P-00156` | geändert | nachname Krüger → Lorenz, email nele.krueger2@example.org → nele.lorenz@example.org |
| Person | `P-00189` | geändert | nachname Jung → Engel, email emma.jung@example.org → emma.engel@example.org |
| Person | `P-00052` | geändert | standort_nr STO-03 → STO-02 |
| Person | `P-00087` | geändert | standort_nr STO-02 → STO-03 |
| Person | `P-00121` | geändert | standort_nr STO-03 → STO-02 |
| Person | `P-00160` | geändert | standort_nr STO-01 → STO-02 |
| Person | `P-00194` | geändert | standort_nr STO-01 → STO-02 |
| Artikel | `ART-0003` | geändert | preis_cent 59 → 69 |
| Artikel | `ART-0021` | geändert | preis_cent 189 → 209 |
| Artikel | `ART-0049` | geändert | preis_cent 899 → 989 |
| Artikel | `ART-0070` | geändert | preis_cent 899 → 989 |
| Artikel | `ART-0104` | geändert | preis_cent 2490 → 2739 |
| Person | `P-00061` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Person | `P-00093` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Person | `P-00130` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Person | `P-00147` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Person | `P-00171` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Person | `P-00219` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Person | `P-00233` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Person | `P-00247` | inaktiv | status aktiv → ausgetreten, austritt_am 2026-11-30 |
| Inventar | `INV-0005` | inaktiv | status in_betrieb → ausgemustert |
| Inventar | `INV-0034` | inaktiv | status in_betrieb → ausgemustert |
| Inventar | `INV-0088` | inaktiv | status in_betrieb → ausgemustert |
| Inventar | `INV-0117` | inaktiv | status in_betrieb → ausgemustert |
| Inventar | `INV-0150` | inaktiv | status in_betrieb → ausgemustert |
| Inventar | `INV-0176` | inaktiv | status in_betrieb → ausgemustert |
| Person | `P-00251` bis `P-00265` | neu | 15 Personen mit `eintritt_am` 2026-12-01 |
| Inventar | `INV-0201` bis `INV-0210` | neu | 10 Geräte mit `anschaffung_am` 2026-11-27 |
| Person | `P-00068` | gelöscht | `410 Gone` |
| Person | `P-00141` | gelöscht | `410 Gone` |
| Person | `P-00226` | gelöscht | `410 Gone` |
| Raum | `RAU-013` | gelöscht | `410 Gone` |
| Raum | `RAU-027` | gelöscht | `410 Gone` |

## 7. Fehler

Jeder Fehler kommt im selben Format: `fehler` beschreibt den Fehler für Menschen, `code` ist fest und für Programme gedacht.

```json
{ "fehler": "Person P-99999 unbekannt", "code": "PERSON_404" }
```

| Status | `code` | Bedeutung | Was tun? |
|---|---|---|---|
| `400` | `ANFRAGE_400` | Ein Query-Parameter oder der Body ist ungültig, etwa `pro_seite=501`, `status=weg` oder `{ "stand": 3 }`. `fehler` nennt den Parameter und die erlaubten Werte. | Parameter nach Abschnitt 5 korrigieren |
| `401` | `AUTH_401` | Der Header `X-API-Key` fehlt oder der Key ist falsch. | Header und Key nach Abschnitt 3 prüfen |
| `404` | `PERSON_404`, `ABTEILUNG_404`, `STANDORT_404`, `RAUM_404`, `INVENTAR_404`, `ARTIKEL_404`, `FEIERTAG_404` | Den Eintrag gibt es nicht. | Schlüssel prüfen; gültige Schlüssel liefert die Liste |
| `410` | `PERSON_410`, `RAUM_410` | Den Eintrag gab es, er ist im aktuellen Datenstand gelöscht. | Eintrag im eigenen System als gelöscht behandeln (Abschnitt 6) |

Ein unbekannter Pfad ergibt `404` mit `code` `HTTP_404`.

Ist der Server nicht gestartet, bekommt dein Backend keine HTTP-Antwort, sondern einen Verbindungsfehler (`fetch failed`, Ursache `ECONNREFUSED`). Das prüfst du, indem du den Server beendest.

## 8. Verzögerung

`STAMMDATEN_DELAY_MS` in `.env` verzögert jede Antwort um die angegebene Zahl an Millisekunden, auch Fehler. Standard ist `0`. Damit prüfst du, wie dein Backend reagiert, wenn der Server langsam antwortet, oder machst den Fortschritt eines langen Imports sichtbar. Für einen einzelnen Start setzt du den Wert vor dem Befehl:

```bash
STAMMDATEN_DELAY_MS=3000 npm run start:dev
```

Unter Windows (PowerShell) setzt du ihn mit `$env:STAMMDATEN_DELAY_MS=3000` und startest danach mit `npm run start:dev`. Swagger UI und `/api-json` antworten ohne Verzögerung.

## 9. Konfiguration

| Variable | Bedeutung | Vorlage |
|---|---|---|
| `PORT` | Port des Servers | `3300` |
| `STAMMDATEN_API_KEY` | Key für den Header `X-API-Key`; Pflicht | `stammdaten-demo-key` |
| `STAMMDATEN_STAND` | Datenstand beim Start, `1` oder `2` | `1` |
| `STAMMDATEN_DELAY_MS` | Verzögerung jeder Antwort in Millisekunden | `0` |

## 10. Befehle

| Befehl | Wirkung |
|---|---|
| `npm run start:dev` | Server starten; startet nach jeder Änderung im Code neu |
| `npm run build` | Projekt nach `dist/` übersetzen |
| `npm run start:prod` | übersetztes Projekt aus `dist/` starten |
| `npm run lint` | Code mit ESLint prüfen und Formatierung korrigieren |
| `node werkzeuge/daten-erzeugen.mjs` | Daten in `daten/` neu erzeugen (fester Seed, immer dieselben Daten); gibt die Tabelle aus Abschnitt 6 aus |
