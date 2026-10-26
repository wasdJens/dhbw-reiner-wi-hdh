---
titel: Beer App – Anforderungen
typ: referenz
tags: [web-programmierung, beer-app, anforderungen, user-story, backlog]
version: 0.5.4
status: review
stand: 2026-10-25
---

# Beer App – Anforderungen

Dieses Dokument beschreibt die Beer App, die du in der Web-Programmierung baust. Es enthält Auftrag, Stakeholder, Datenmodell, Geschäftsregeln und das Product Backlog. Jede Übung ab dem ersten NestJS-Projekt setzt eine User Story aus dem Backlog um. Die Einheiten verweisen auf dieses Dokument und wiederholen seinen Inhalt nicht.

## 1. Auftrag

Die **regionalen Brauereien**, eine Gemeinschaft von Brauereien aus der Region, beauftragen eine App für ihre Biere. Gäste finden dort Biere, bewerten sie und sehen, welche Biere gut ankommen. Die Brauereien betreiben die App gemeinsam und pflegen die Stammdaten. In den User Stories heißen sie deshalb **Betreiber**.

Die App ist ein verteiltes System aus drei Teilen:

| Teil | Aufgabe | Wer baut |
|---|---|---|
| Server mit API | Speichert die Daten, prüft die Regeln, liefert JSON | du, in dieser Vorlesung |
| Webseite | Zeigt die Daten im Browser | später, als Client der API |
| Mobile App | Zeigt die Daten auf dem Smartphone | später, als Client der API |

Die Vorlesung baut den Server. Er heißt **Beer API**.

## 2. Stakeholder

| Stakeholder | Interesse | Rolle in der API |
|---|---|---|
| Gäste | Biere finden, bewerten und sehen, was gut ankommt | `user` |
| Einzelne Brauerei | Ihre Biere sind korrekt gelistet, Bewertungen sind sichtbar | nur lesen |
| Betreiber (die regionalen Brauereien gemeinsam) | Stammdaten pflegen, Missbrauch verhindern, Auswertungen | `admin` |

Bis zur Anmeldung (Story 13) gibt es keine Rollen: Jede Anfrage darf alles.

## 3. Datenmodell

Die Beer API kennt sechs Ressourcen. Die Spalte „Ab Story“ nennt die Story, mit der eine Ressource oder ein Feld dazukommt. Alle `id` sind ganze Zahlen, die der Server vergibt.

### Beer

| Feld | Typ | Pflicht | Bedeutung | Ab Story |
|---|---|---|---|---|
| `id` | Ganzzahl | ja | Kennung | 5 |
| `name` | String | ja | Name des Biers, nicht leer | 5 |
| `style` | String | ja | Bierstil: `helles`, `pils`, `spezial`, `weizen` oder `dunkel` | 5 |
| `abv` | Zahl | ja | Alkoholgehalt in Volumenprozent (alcohol by volume) | 5 |
| `breweryId` | Ganzzahl | ja | `id` der Brauerei | 5 |
| `description` | String | nein | Kurzbeschreibung | 5 |
| `averageRating` | Zahl oder `null` | – | Durchschnitt aller Bewertungen; wird berechnet, nicht gespeichert; `null` ohne Bewertung | 10 |

### Brewery

| Feld | Typ | Pflicht | Bedeutung | Ab Story |
|---|---|---|---|---|
| `id` | Ganzzahl | ja | Kennung | 5 |
| `name` | String | ja | Name der Brauerei, nicht leer | 5 |
| `city` | String | ja | Ort | 5 |
| `country` | String | ja | Land | 5 |

Die Brauereien entstehen im Live-Coding der Vorlesung: Jede Einheit zeigt ihr Konzept zuerst an den Brauereien. Du übernimmst diesen Code in dein Projekt und setzt danach die Story an den Bieren um. Deshalb hat das Backlog keine eigene Story zum Anlegen von Brauereien.

### Rating

| Feld | Typ | Pflicht | Bedeutung | Ab Story |
|---|---|---|---|---|
| `id` | Ganzzahl | ja | Kennung | 10 |
| `beerId` | Ganzzahl | ja | `id` des bewerteten Biers; steht im Pfad | 10 |
| `userId` | Ganzzahl | ja | `id` des Gasts; bis Story 13 im Body, danach aus dem Token | 10 |
| `score` | Ganzzahl | ja | Sterne von 1 bis 5 | 10 |
| `comment` | String | nein | Freitext | 10 |
| `createdAt` | String | ja | Zeitpunkt als ISO 8601, vom Server gesetzt | 10 |

### User, Role und UserRole

Die Rechte folgen dem Modell **Role-Based Access Control (RBAC)**: Ein User hat Rollen, und die API prüft die Rolle, nicht den einzelnen User. Rollen stehen in einer eigenen Tabelle. Die Zuordnung steht in einer dritten Tabelle `UserRole`. Der User selbst hat kein Feld für seine Rolle. Deshalb ändert eine Anfrage, die einen User ändert, nie seine Rechte.

| Ressource | Feld | Typ | Bedeutung | Ab Story |
|---|---|---|---|---|
| `User` | `id` | Ganzzahl | Kennung | 13 |
| | `name` | String | Anmeldename, eindeutig | 13 |
| | `passwordHash` | String | Hash des Passworts; erscheint in keiner Antwort | 13 |
| `Role` | `id` | Ganzzahl | Kennung | 13 |
| | `name` | String | `admin` oder `user`, eindeutig | 13 |
| `UserRole` | `userId` | Ganzzahl | `id` des Users | 13 |
| | `roleId` | Ganzzahl | `id` der Rolle | 13 |

Zusammenhänge:

- Ein Bier gehört zu genau einer Brauerei. Eine Brauerei hat beliebig viele Biere.
- Ein Bier hat beliebig viele Bewertungen. Ein User bewertet jedes Bier höchstens einmal (R4).
- Ein User hat eine oder mehrere Rollen. Eine Rolle gehört beliebig vielen Usern.

### Beispieldaten

Der Server startet mit diesen Daten. Die Beispiele im Backlog beziehen sich auf sie.

| `id` | Brauerei | `city` | `country` |
|---|---|---|---|
| 1 | Privatbrauerei Schlumberger | Nattheim | Deutschland |
| 2 | Wildbräu Grafing | Grafing bei München | Deutschland |
| 3 | Augustiner-Bräu | München | Deutschland |
| 4 | Edelweissbrauerei Farny | Kißlegg | Deutschland |

| `id` | Bier | `style` | `abv` | `breweryId` |
|---|---|---|---|---|
| 1 | Nattheimer Spezial | `spezial` | 5.4 | 1 |
| 2 | Wildbräu Grafing Helles | `helles` | 5.0 | 2 |
| 3 | Augustiner Lagerbier Hell | `helles` | 5.2 | 3 |
| 4 | Farny Kristall-Weizen | `weizen` | 5.3 | 4 |

| User | Rollen |
|---|---|
| `admin` | `admin` |
| `gast` | `user` |

Die Passwörter der beiden User stehen in der Datei `users.txt` des Referenzprojekts.

## 4. Geschäftsregeln

| # | Regel | Ab Story |
|---|---|---|
| R1 | `abv` liegt zwischen 0 und 20. | 7 |
| R2 | Ein Bier gehört zu genau einer Brauerei; die Brauerei muss existieren. | 9 |
| R3 | `score` ist eine ganze Zahl von 1 bis 5. | 10 |
| R4 | Ein User bewertet ein Bier höchstens einmal; eine zweite Bewertung ersetzt die erste. | 10 |
| R5 | Die Durchschnittsbewertung eines Biers wird auf eine Nachkommastelle gerundet. | 10 |
| R6 | Nur ein User mit der Rolle `admin` legt Biere und Brauereien an, ändert und löscht sie; jeder angemeldete User bewertet. | 14 |
| R7 | Eine Registrierung vergibt immer die Rolle `user`. Weitere Rollen vergibt nur ein `admin`. | 13, 14 |

Eine Regel gilt ab ihrer Story für alle folgenden Stories.

## 5. Product Backlog

Das Backlog enthält eine User Story je Einheit, von Story 5 (erstes NestJS-Projekt) bis Story 16 (HTML-Seiten). Die Nummer der Story ist die Nummer der Einheit im Roten Faden der Vorlesung.

Eine User Story beschreibt eine Anforderung aus Sicht eines Stakeholders: **Als** Rolle **möchte ich** Funktion, **damit** Nutzen. Die Akzeptanzkriterien legen fest, wann die Story erfüllt ist. Jedes Kriterium beschreibt ein beobachtbares Verhalten, meist Statuscode und Antwort einer Anfrage. Bis Story 10 prüft die Postman-Collection der Einheit die Kriterien zur Selbstkontrolle. Ab Story 11 schreibst du die Tests selbst; die Collection der Einheit dient dann zum Vergleich. Kriterien mit „Zusatz“ gehören zur Zusatzaufgabe der Einheit.

Alle Pfade beziehen sich auf `http://localhost:3000`.

### Story 5 – Biere abrufen

> **Als** Gast **möchte ich** alle Biere und ein einzelnes Bier abrufen, **damit** ich sehe, welche Biere es gibt.

- `GET /beers` antwortet mit `200` und den vier Bieren der Beispieldaten.
- `GET /beers/2` antwortet mit `200` und dem Wildbräu Grafing Helles.
- `GET /beers/42` antwortet mit `404`.
- Zusatz: `GET /beers?style=helles` liefert das Wildbräu Grafing Helles und das Augustiner Lagerbier Hell.

### Story 6 – Biere anlegen und löschen

> **Als** Betreiber **möchte ich** ein Bier anlegen und löschen, **damit** die Liste dem Angebot der Brauereien entspricht.

- `POST /beers` mit diesem Body antwortet mit dem angelegten Bier und der neuen `id` 5:
  ```json
  { "name": "Wildbräu Grafing Pils", "style": "pils", "abv": 4.9, "breweryId": 2 }
  ```
- Danach enthält `GET /beers` fünf Biere.
- `DELETE /beers/5` entfernt das Bier; danach antwortet `GET /beers/5` mit `404`.

### Story 7 – Nur gültige Biere annehmen

> **Als** Betreiber **möchte ich**, dass die API nur vollständige und gültige Biere annimmt, **damit** keine fehlerhaften Daten in die App gelangen.

Jede der folgenden Anfragen `POST /beers` antwortet mit `400` und nennt das fehlerhafte Feld:

- `name` fehlt oder ist `""`.
- `style` ist `"lager"`.
- `abv` ist `25` oder `-1` (R1).
- `abv` ist der String `"5.2"` statt der Zahl `5.2`.

Außerdem:

- Das Wildbräu Grafing Pils aus Story 6 wird weiterhin angelegt.
- Zusatz: `PATCH /beers/2` mit `{ "abv": 5.1 }` ändert nur den Alkoholgehalt; `{ "abv": 25 }` ergibt `400`.

### Story 8 – Fehler erkennbar machen

> **Als** Betreiber **möchte ich**, dass jede Anfrage einen passenden Statuscode und eine verständliche Meldung liefert, **damit** Webseite und App Fehler anzeigen können und Gäste weniger beim Support nachfragen.

- `POST /beers` mit gültigem Body antwortet mit `201`.
- `DELETE /beers/5` antwortet mit `204` und ohne Body.
- `DELETE /beers/5` ein zweites Mal antwortet mit `404`.
- `GET /beers/abc` antwortet mit `400`, weil `abc` keine Zahl ist.
- Jede Fehlerantwort hat die Form:
  ```json
  { "statusCode": 404, "message": "Beer 5 not found", "error": "Not Found" }
  ```
- Keine Fehlerantwort enthält einen Stacktrace.

### Story 9 – Biere einer Brauerei zuordnen

> **Als** Betreiber **möchte ich**, dass jedes Bier zu einer existierenden Brauerei gehört, **damit** Gäste sehen, woher ein Bier kommt.

- `POST /beers` mit `"breweryId": 3` legt das Bier an; es gehört zum Augustiner-Bräu.
- `POST /beers` mit `"breweryId": 42` wird abgelehnt (R2). Du wählst `400` oder `404` und begründest die Wahl im Review.
- Ein Bier einer eben mit `POST /breweries` angelegten Brauerei wird angelegt.
- Zusatz: `PATCH /beers/2` mit `{ "breweryId": 42 }` wird ebenso abgelehnt; das Bier gehört danach weiter zur Brauerei 2.
- Zusatz: `GET /breweries/3/beers` liefert das Augustiner Lagerbier Hell und das eben angelegte Bier.

### Story 10 – Biere bewerten

> **Als** Gast **möchte ich** ein Bier mit 1 bis 5 Sternen bewerten, **damit** andere Gäste sehen, was gut ankommt.

- `POST /beers/1/ratings` mit `{ "userId": 1, "score": 4, "comment": "Süffig" }` legt eine Bewertung an (`201`).
- `score` `0`, `6` oder `3.5` wird mit `400` abgelehnt (R3).
- Bewertet User 1 das Bier 1 ein zweites Mal mit `5`, enthält `GET /beers/1/ratings` danach nur diese Bewertung von User 1 (R4).
- Nach den Bewertungen 4, 4 und 5 von drei Usern zeigt `GET /beers/1` den Wert `"averageRating": 4.3` (R5).
- `GET /beers` zeigt `averageRating` bei jedem Bier.
- `GET /beers/2` zeigt ohne Bewertung `"averageRating": null`.
- `POST /beers/42/ratings` antwortet mit `404`.

### Story 11 – Biere filtern, sortieren und die API dokumentieren

> **Als** Brauerei **möchte ich** Biere filtern und sortieren und die API anhand einer Dokumentation anbinden, **damit** ich die Daten auf meiner eigenen Webseite zeige.

- `GET /beers?style=weizen` liefert nur das Farny Kristall-Weizen.
- `GET /beers?breweryId=2` liefert nur das Wildbräu Grafing Helles.
- `GET /beers?style=helles&breweryId=3` liefert nur das Augustiner Lagerbier Hell.
- `GET /beers?sort=averageRating&order=desc` liefert die Biere absteigend nach Durchschnitt; Biere ohne Bewertung stehen am Ende.
- `GET /beers?style=lager` und `GET /beers?sort=price` antworten mit `400`.
- Swagger UI unter `/api` zeigt alle Endpunkte mit ihren Schemas.
- Die OpenAPI-Beschreibung unter `/api-json` lässt sich in Postman importieren; alle importierten Anfragen sind ausführbar.

### Story 12 – Daten dauerhaft speichern

> **Als** Betreiber **möchte ich**, dass Biere, Brauereien und Bewertungen einen Neustart des Servers überstehen, **damit** keine Daten verloren gehen.

- Das Wildbräu Grafing Pils aus Story 6 ist nach einem Neustart unter `GET /beers/:id` erreichbar.
- Eine Bewertung und eine neue Brauerei sind nach einem Neustart erhalten.
- Ein gelöschtes Bier bleibt nach einem Neustart gelöscht.
- Alles, was die Beer API bis Story 11 konnte, funktioniert unverändert: Filter, Sortierung, Durchschnitt und die Prüfung der Regeln. Eine leere `description` oder ein leerer `comment` steht als `null` in der Antwort.
- Ein bewertetes Bier lässt sich löschen; seine Bewertungen fallen mit weg.
- Zusatz: `DELETE /breweries/:id` antwortet mit `409`, solange Biere zu der Brauerei gehören.

### Story 13 – Registrieren und anmelden

> **Als** Gast **möchte ich** mich registrieren und anmelden, **damit** nur ich in meinem Namen bewerte.

- `POST /auth/register` mit `{ "name": "lena", "password": "…" }` legt einen User mit der Rolle `user` an (R7). Die Antwort enthält kein Passwort und keinen `passwordHash`.
- Ein zweites `POST /auth/register` mit dem Namen `lena` antwortet mit `409`.
- `POST /auth/login` mit richtigem Namen und Passwort antwortet mit `200` und einem Token im Feld `accessToken`.
- `POST /auth/login` mit falschem Passwort antwortet mit `401`.
- `POST /beers/1/ratings` ohne Token, mit ungültigem oder mit abgelaufenem Token antwortet mit `401`.
- Mit dem Token von `lena` im Header `Authorization: Bearer <token>` wird die Bewertung angelegt; `userId` stammt aus dem Token, eine `userId` im Body wird abgelehnt.
- Alle `GET`-Anfragen bleiben ohne Anmeldung möglich.

### Story 14 – Stammdaten und Rollen schützen

> **Als** Betreiber **möchte ich**, dass nur der Betreiber Stammdaten und Rollen ändert, **damit** niemand die App manipuliert oder sich selbst Rechte gibt.

- `POST`, `PATCH` und `DELETE` auf `/beers` und `/breweries` sind mit dem Token von `admin` erlaubt.
- Dieselben Anfragen antworten mit dem Token von `gast` mit `403` und ohne Token mit `401` (R6).
- `POST /beers/1/ratings` ist für `gast` und `admin` erlaubt.
- `POST /auth/register` mit `{ "name": "mallory", "password": "…", "roles": ["admin"] }` antwortet mit `400`; ein Feld für Rollen gibt es bei der Registrierung nicht (R7).
- `POST /users/:id/roles` mit `{ "role": "admin" }` vergibt eine Rolle. Mit dem Token von `admin` antwortet der Server mit `201`, mit dem Token von `gast` mit `403` (R7).
- `GET /users/me` zeigt den angemeldeten User mit seinen Rollen.
- Das Secret für die Tokens steht nicht im Code, sondern in einer Umgebungsvariable.

### Story 15 – Top-Biere live

> **Als** Betreiber **möchte ich** die fünf bestbewerteten Biere live sehen, **damit** ich auf Veranstaltungen zeige, was gerade gut ankommt.

- Die Seite `GET /dashboard` zeigt die fünf Biere mit dem höchsten `averageRating`; Biere ohne Bewertung fehlen.
- Nach einer neuen Bewertung zeigt die Seite das neue Ranking ohne Neuladen.
- Zwei geöffnete Browserfenster zeigen nach derselben Bewertung dasselbe Ranking.
- Der Server sendet das Ranking nur nach einer Bewertung, nicht in festen Abständen.

Diese Kriterien prüfst du im Browser, nicht mit Postman.

### Story 16 – Biere als HTML-Seiten

> **Als** Brauerei **möchte ich** die Bierliste und die Detailseite eines Biers als fertige HTML-Seite abrufen, **damit** ich sie ohne eigene Programmierung verlinke.

- `GET /beers` mit `Accept: text/html` antwortet mit einer HTML-Tabelle mit Name, Stil, Brauerei und Durchschnitt.
- `GET /beers` mit `Accept: application/json` antwortet weiterhin mit JSON.
- `GET /beers/1` mit `Accept: text/html` zeigt das Nattheimer Spezial mit allen Bewertungen.
- `GET /beers/42` mit `Accept: text/html` antwortet mit `404`.

## Änderungen

Folien und Postman-Collections verweisen auf dieses Dokument. Jede Änderung bekommt deshalb einen Eintrag im Changelog des Projekts.
