---
titel: Glossar Web-Programmierung
typ: referenz
tags: [glossar, web-programmierung]
version: 0.30.2
status: entwurf
stand: 2026-10-26
---

# Glossar Web-Programmierung

Begriffe aus der Web-Programmierung, alphabetisch sortiert. Englische Fachbegriffe bleiben englisch; die deutsche Übersetzung steht in der Definition. Begriffe aus Tooling und HTML & CSS (zum Beispiel Commit, Repository) stehen im [Glossar Webseiten-Projekt](glossar.md).

---

## Fachbegriffe

### Acknowledgement
**Definition:** Antwort auf ein Event. Der Client übergibt beim Senden eine Funktion; der Server ruft sie mit seiner Antwort auf. In NestJS geht der Rückgabewert einer Methode mit `@SubscribeMessage` als Acknowledgement zurück. Ohne Acknowledgement erfährt der Sender nicht, ob ein Event angekommen ist.
**Siehe auch:** [Event](#event), [socket.io](#socketio), [socket-io-docs](quellen.md#socket-io-docs)

### Akzeptanzkriterium
**Definition:** Bedingung, an der Auftraggeber und Entwicklung erkennen, dass eine User Story fertig ist. In der Beer App ist jedes Kriterium eine Anfrage mit erwarteter Antwort, zum Beispiel „`POST /beers/42/ratings` antwortet mit `404`“, und in der Regel ein Test in Postman; Story 15 prüft man im Browser.
**Siehe auch:** [User Story](#user-story), [cohn-user-stories](quellen.md#cohn-user-stories)

### API
**Definition:** Application Programming Interface – legt fest, welche Anfragen ein Programm versteht und welche Antworten es liefert. Bei einer Web-API ist jede Anfrage eine HTTP-Anfrage an einen Endpunkt.
**Siehe auch:** [Endpunkt](#endpunkt), [Backend](#backend)

### API Key
**Definition:** Festes Geheimnis, das ein Programm in einem Header mitsendet, zum Beispiel ein Partner, der Biere abruft. Ein API Key nennt einen Client, keine Person, und gilt, bis der Betreiber ihn zurückzieht.
**Siehe auch:** [Authentifizierung](#authentifizierung), [Bearer-Token](#bearer-token)

### Authentifizierung
**Definition:** Feststellen, wer eine Anfrage stellt, zum Beispiel über Name und Passwort oder ein Token. Scheitert sie, antwortet der Server mit `401`.
**Siehe auch:** [Autorisierung](#autorisierung), [JWT](#jwt), [rfc-9110](quellen.md#rfc-9110)

### Autorisierung
**Definition:** Prüfen, ob ein bereits angemeldeter User eine Aktion ausführen darf. Fehlt das Recht, antwortet der Server mit `403`.
**Siehe auch:** [Authentifizierung](#authentifizierung), [RBAC](#rbac), [Statuscode](#statuscode)

### Backend
**Definition:** Teil einer Anwendung auf dem Server: speichert die Daten, prüft die Regeln und liefert die Daten über eine API, zum Beispiel als JSON.
**Siehe auch:** [Frontend](#frontend), [API](#api)

### Base64URL
**Definition:** Kodierung von Bytes als Text aus Buchstaben, Ziffern, `-` und `_`, ohne Schlüssel. Jeder kann sie zurückwandeln; die Teile eines JWT sind so kodiert und deshalb lesbar.
**Siehe auch:** [JWT](#jwt), [rfc-4648](quellen.md#rfc-4648)

### Bearer-Token
**Definition:** Token, das der Client im Header `Authorization: Bearer <token>` mitsendet; wer es besitzt, gilt als der User, für den es ausgestellt ist. Es gehört deshalb nur über `https` auf die Leitung.
**Siehe auch:** [JWT](#jwt), [Header](#header), [rfc-6750](quellen.md#rfc-6750)

### Berechnetes Feld
**Definition:** Feld einer Antwort, das der Server bei jeder Anfrage aus gespeicherten Daten berechnet, statt es zu speichern. Beispiel: `averageRating` eines Biers entsteht aus seinen Bewertungen und ist `null`, wenn es keine gibt.
**Siehe auch:** [Service](#service), [Response](#response-antwort)

### Body
**Definition:** Inhalt einer HTTP-Nachricht nach der Leerzeile, die ihn von den Headern trennt, zum Beispiel eine Liste als JSON. Das Format nennt der Header `Content-Type`; ein `GET` sendet meist keinen Body.
**Siehe auch:** [Header](#header), [Media Type](#media-type)

### Breaking Change
**Definition:** Änderung an einer API, nach der ein bestehender Client nicht mehr funktioniert, zum Beispiel ein entferntes oder umbenanntes Feld, ein neuer Pflichtparameter oder ein anderer Typ. Ein neues Feld in der Antwort ist kein Breaking Change. Öffentliche APIs bringen Breaking Changes nur in einer neuen Version.
**Siehe auch:** [OpenAPI](#openapi), [github-rest-api](quellen.md#github-rest-api)

### Cache
**Definition:** Zwischenspeicher für Antworten, zum Beispiel im Browser. Der Server legt mit dem Header `Cache-Control` fest, wie lange eine Antwort gültig ist; solange fragt der Client nicht erneut an.
**Siehe auch:** [ETag](#etag), [Header](#header), [mdn](quellen.md#mdn), [rfc-9110](quellen.md#rfc-9110)

### camelCase
**Definition:** Schreibweise für zusammengesetzte Namen ohne Trenner, jedes weitere Wort beginnt groß (`breweryId`, `createdAt`). Die Beer API benennt alle Schlüssel im JSON so; das Gegenstück ist snake_case (`brewery_id`).
**Siehe auch:** [JSON](#json)

### CDN
**Definition:** Content Delivery Network: Server an vielen Orten, die große Dateien wie Bilder und Videos in der Nähe der Nutzer ausliefern. Ein CDN ist ein fremder Dienst im verteilten System; fällt es aus, fehlen Bilder, die Anwendung selbst läuft weiter.
**Siehe auch:** [Verteiltes System](#verteiltes-system)

### Claim
**Definition:** Angabe über den User im Payload eines JWT, zum Beispiel `sub` (die `id` des Users), `iat` (ausgestellt um) und `exp` (Ablauf). Claims sind lesbar; die Signatur schützt sie nur vor Änderung.
**Siehe auch:** [JWT](#jwt), [rfc-7519](quellen.md#rfc-7519)

### Client
**Definition:** Programm, das eine Anfrage an einen Server stellt und auf die Antwort wartet, zum Beispiel ein Browser, Postman oder eine Mobile App. Die Rolle hängt an der Verbindung: Ein Server, der einen anderen Server fragt, ist dort Client.
**Siehe auch:** [Server](#server), [Request](#request-anfrage)

### Content Negotiation
**Definition:** Aushandeln des Formats einer Antwort: Der Client nennt im Header `Accept` die Media Types, die er lesen kann; der Server wählt einen und nennt ihn in `Content-Type`. Kann er keinen liefern, darf er mit `406 Not Acceptable` antworten.
**Siehe auch:** [Media Type](#media-type), [Header](#header)

### Controller
**Definition:** Klasse in NestJS, deren Methoden Anfragen an einen Pfad beantworten. Der Decorator `@Controller('beers')` legt den Pfad fest; ein Module trägt den Controller unter `controllers` ein.
**Siehe auch:** [Decorator](#decorator), [Endpunkt](#endpunkt), [nestjs-docs](quellen.md#nestjs-docs)

### Conway’s Law
**Definition:** Beobachtung von Melvin Conway (1968): Eine Organisation baut Systeme, deren Struktur ihre eigene Kommunikationsstruktur abbildet. Zwei Teams, die wenig miteinander reden, bauen zwei getrennte Teile mit einer Schnittstelle dazwischen.
**Siehe auch:** [Module](#module), [conway-1968](quellen.md#conway-1968)

### Cookie
**Definition:** Kleiner Wert, den ein Server mit dem Header `Set-Cookie` setzt und den der Browser mit dem Header `Cookie` bei jedem weiteren Request an diesen Host zurücksendet. So erkennt ein zustandsloser Server einen Client wieder, etwa nach dem Login.
**Siehe auch:** [Statelessness](#statelessness), [Header](#header), [mdn](quellen.md#mdn)

### CORS
**Definition:** Cross-Origin Resource Sharing – Regeln, nach denen ein Browser einer Seite erlaubt, Antworten eines Servers auf einer anderen Origin zu lesen. Der Server erlaubt es mit Headern wie `Access-Control-Allow-Origin`. Postman und `curl` beachten CORS nicht; es ersetzt keine Autorisierung.
**Siehe auch:** [Header](#header), [Autorisierung](#autorisierung), [nestjs-docs](quellen.md#nestjs-docs)

### Cross-Site Scripting
**Definition:** XSS – fremdes JavaScript läuft in einer Seite, weil der Server Daten aus einer Anfrage ohne Escaping in HTML einsetzt. Beispiel: Eine Brauerei mit dem Namen `<script>alert('Beer')</script>` öffnet in jedem Browser ein Fenster. Die OWASP Top 10:2025 führen XSS unter A05 Injection.
**Siehe auch:** [Escaping](#escaping), [Injection](#injection), [owasp-xss](quellen.md#owasp-xss)

### Datenbankschema
**Definition:** Tabellen und Spalten einer Datenbank mit ihren Typen und Schlüsseln. Migrationen ändern es; nicht zu verwechseln mit dem Zod-Schema, das die Form von Daten in einer Anfrage oder Antwort prüft.
**Siehe auch:** [Migration](#migration), [Schema](#schema), [typeorm-docs](quellen.md#typeorm-docs)

### Decorator
**Definition:** Funktion mit `@` vor dem Namen über einer Klasse, einer Methode oder vor einem Parameter, zum Beispiel `@Get()`. In NestJS verbinden Decorators den eigenen Code mit dem Routing.
**Siehe auch:** [Controller](#controller), [nestjs-docs](quellen.md#nestjs-docs)

### Dependency Injection
**Definition:** Eine Klasse erzeugt die Objekte, die sie braucht, nicht selbst, sondern bekommt sie übergeben. In NestJS nennt ein Controller den Service als Parameter im Constructor; NestJS erzeugt den Service und übergibt ihn.
**Siehe auch:** [Provider](#provider), [Service](#service), [nestjs-docs](quellen.md#nestjs-docs)

### Deployment
**Definition:** Ausliefern einer Anwendung auf einen Server und dauerhafter Betrieb dort: übersetzen, Secrets als Umgebungsvariablen setzen, den Prozess starten und nach einem Absturz neu starten, Migrationen ausführen.
**Siehe auch:** [Umgebungsvariable](#umgebungsvariable), [Migration](#migration), [nestjs-docs](quellen.md#nestjs-docs)

### DNS
**Definition:** Domain Name System – übersetzt einen Namen wie `docs.nestjs.com` in eine IP-Adresse. DNS ist selbst ein verteiltes System aus vielen Servern.
**Siehe auch:** [TLS](#tls), [Verteiltes System](#verteiltes-system)

### DTO
**Definition:** Data Transfer Object – Klasse, die beschreibt, welche Daten ein Endpunkt annimmt, zum Beispiel `CreateBreweryDto` für `POST /breweries`. Ein DTO ist nicht das gespeicherte Objekt: Die `id` fehlt, weil der Server sie vergibt.
**Siehe auch:** [Schema](#schema), [Validierung](#validierung), [nestjs-zod](quellen.md#nestjs-zod)

### End-to-End-Test
**Definition:** Test, der echte HTTP-Anfragen an den laufenden Server sendet und Statuscode und Body der Antwort prüft, kurz e2e-Test. Er prüft das Zusammenspiel aller Schichten bis zur Datenbank, wie die Postman-Collections mit newman.
**Siehe auch:** [Unit-Test](#unit-test), [Akzeptanzkriterium](#akzeptanzkriterium)

### Endpunkt
**Definition:** Kombination aus HTTP-Methode und Pfad, die eine API beantwortet, zum Beispiel `GET /beers`.
**Siehe auch:** [API](#api), [Pfadparameter](#pfadparameter)

### Entity
**Definition:** Klasse mit dem Decorator `@Entity()`, die eine Tabelle der Datenbank beschreibt. Jede Eigenschaft mit `@Column()` ist eine Spalte, jedes Objekt der Klasse eine Zeile.
**Siehe auch:** [ORM](#orm), [Migration](#migration), [typeorm-docs](quellen.md#typeorm-docs)

### Escaping
**Definition:** Maskieren von Zeichen, die in einem Format eine Bedeutung haben, damit sie als Text erscheinen. In HTML wird `<` zu `&lt;` und `>` zu `&gt;`. Handlebars maskiert jeden Wert in `{{ }}`; `{{{ }}}` setzt den Wert unverändert ein.
**Siehe auch:** [Cross-Site Scripting](#cross-site-scripting), [Template-Engine](#template-engine), [handlebars-docs](quellen.md#handlebars-docs)

### ETag
**Definition:** Header mit einer Kennung für den Stand einer Ressource. Sendet der Client die Kennung mit `If-None-Match` zurück und hat sich nichts geändert, antwortet der Server mit `304 Not Modified` ohne Body. Mit `If-Match` lehnt der Server eine Änderung an einem veralteten Stand mit `412` ab.
**Siehe auch:** [Cache](#cache), [Header](#header), [rfc-9110](quellen.md#rfc-9110)

### Event
**Definition:** Nachricht mit einem Namen und Daten, zum Beispiel `breweryCreated` mit der neuen Brauerei. Über eine WebSocket-Verbindung senden Client und Server Events statt Anfragen; ein Event hat keine Methode, keinen Pfad und keinen Statuscode. Im Prozess meldet ein Event wie `rating.created`, dass etwas passiert ist; Klassen mit `@OnEvent` reagieren darauf, ohne dass der Auslöser sie kennt.
**Siehe auch:** [Acknowledgement](#acknowledgement), [Gateway](#gateway), [WebSocket](#websocket), [Queue](#queue)

### Exception
**Definition:** Fehlerobjekt, das der Code mit `throw` wirft; die laufende Methode endet sofort. In NestJS wird eine `HttpException` wie `NotFoundException` zu einer Antwort mit ihrem Statuscode und dem Body `message`, `error`, `statusCode`; jede andere Exception wird zur `500`.
**Siehe auch:** [Statuscode](#statuscode), [Stacktrace](#stacktrace), [nestjs-docs](quellen.md#nestjs-docs)

### Exception Filter
**Definition:** Klasse in NestJS, die eine Exception in eine Antwort übersetzt. Der eingebaute Exception Filter macht aus einer `HttpException` JSON mit `statusCode`, `message` und `error`, aus jedem anderen Fehler `500`. Er antwortet immer mit JSON, auch wenn der Client HTML verlangt.
**Siehe auch:** [Exception](#exception), [nestjs-docs](quellen.md#nestjs-docs)

### Express
**Definition:** HTTP-Server-Framework für Node.js. NestJS nutzt Express intern: Express nimmt die Anfragen auf dem Port an und sendet die Antworten; der Header `X-Powered-By: Express` verrät es.
**Siehe auch:** [Framework](#framework), [Routing](#routing), [express-docs](quellen.md#express-docs)

### Fetch
**Definition:** Schnittstelle in JavaScript, mit der ein Skript Requests sendet, ohne die Seite neu zu laden; Nachfolger von XMLHttpRequest (XHR). Der Network-Tab in Chrome zeigt diese Requests unter dem Filter Fetch/XHR.
**Siehe auch:** [Request](#request-anfrage), [JSON](#json), [mdn](quellen.md#mdn)

### Frame
**Definition:** Einzelne Nachricht über eine WebSocket-Verbindung. Die DevTools zeigen Frames im Network-Tab unter **Messages**; bei socket.io beginnt ein Frame mit einer Zahl für die Art der Nachricht, zum Beispiel `42[…]` für ein Event.
**Siehe auch:** [WebSocket](#websocket), [socket.io](#socketio), [rfc-6455](quellen.md#rfc-6455)

### Framework
**Definition:** Vorgefertigte Grundstruktur für Anwendungen, die wiederkehrende Aufgaben übernimmt, bei einem Backend zum Beispiel Routing, Parsing und Fehlerbehandlung. Der eigene Code füllt die Stellen, die das Framework vorsieht.
**Siehe auch:** [Backend](#backend), [nestjs-docs](quellen.md#nestjs-docs)

### Fremdschlüssel
**Definition:** Spalte einer Tabelle, deren Wert auf den Primärschlüssel einer anderen Tabelle zeigt, zum Beispiel `breweryId` in `beer`. Die Datenbank lehnt jede Änderung ab, nach der ein Fremdschlüssel auf eine fehlende Zeile zeigt.
**Siehe auch:** [Primärschlüssel](#primärschlüssel), [sqlite-docs](quellen.md#sqlite-docs)

### Frontend
**Definition:** Teil einer Anwendung, den Nutzer sehen und bedienen, zum Beispiel eine Webseite oder eine Mobile App. Es holt die Daten über die API des Backends.
**Siehe auch:** [Backend](#backend), [API](#api)

### Gateway
**Definition:** Klasse in NestJS, die Events über WebSocket-Verbindungen annimmt und sendet, markiert mit `@WebSocketGateway()`. Wie ein Controller Anfragen verteilt, verteilt ein Gateway Events an Methoden mit `@SubscribeMessage`. Ein Gateway ist ein Provider und steht unter `providers` im Module.
**Siehe auch:** [Controller](#controller), [Event](#event), [Provider](#provider), [nestjs-docs](quellen.md#nestjs-docs)

### Grenzfall
**Definition:** Eingabe am Rand des erlaubten Bereichs oder ein erster beziehungsweise leerer Fall, zum Beispiel `score` 1 und 5, `breweryId` 0 oder ein Bier ohne Bewertung. An Grenzfällen ist Code am häufigsten falsch; sie gehören in die Liste der Fälle vor dem Code.
**Siehe auch:** [Akzeptanzkriterium](#akzeptanzkriterium), [Validierung](#validierung)

### Guard
**Definition:** Klasse in NestJS mit der Methode `canActivate`, die vor dem Controller entscheidet, ob eine Anfrage weiterläuft. `@UseGuards` setzt sie an einen Endpunkt oder Controller; eine `UnauthorizedException` im Guard ergibt `401`.
**Siehe auch:** [Pipe](#pipe), [Authentifizierung](#authentifizierung), [nestjs-docs](quellen.md#nestjs-docs)

### Hash
**Definition:** Ergebnis einer Einwegfunktion: Aus einem Passwort entsteht eine Zeichenkette, aus der sich das Passwort nicht zurückrechnen lässt. Für Passwörter dienen absichtlich langsame Verfahren wie bcrypt, Argon2id oder scrypt.
**Siehe auch:** [Salt](#salt), [owasp-password-storage](quellen.md#owasp-password-storage), [bcryptjs](quellen.md#bcryptjs)

### HATEOAS
**Definition:** Hypermedia as the Engine of Application State – Teil des Uniform Interface in REST: Die Antwort enthält Links auf die nächsten möglichen Schritte, und der Client folgt ihnen, statt URLs selbst zu bauen. Stufe 3 im Richardson Maturity Model; die Beer API nutzt es nicht.
**Siehe auch:** [REST](#rest), [Richardson Maturity Model](#richardson-maturity-model)

### Header
**Definition:** Zeile einer HTTP-Nachricht aus Name und Wert (`Content-Type: application/json`), die die Nachricht beschreibt. Groß- und Kleinschreibung im Namen zählt nicht.
**Siehe auch:** [Body](#body), [HTTP](#http)

### HTTP
**Definition:** Hypertext Transfer Protocol – legt Aufbau und Bedeutung der Nachrichten zwischen Client und Server fest: Startzeile, Header, Leerzeile, Body. Methoden, Statuscodes und Header haben eine festgelegte Bedeutung.
**Siehe auch:** [Request](#request-anfrage), [Response](#response-antwort), [rfc-9110](quellen.md#rfc-9110)

### Idempotent
**Definition:** Eigenschaft einer Methode: Dieselbe Anfrage zweimal hinterlässt auf dem Server denselben Zustand wie einmal. `GET`, `PUT` und `DELETE` sind idempotent, `POST` und `PATCH` nicht garantiert.
**Siehe auch:** [Methode](#methode), [Sichere Methode](#sichere-methode)

### Identity Provider
**Definition:** Dienst, der die Anmeldung für andere Anwendungen übernimmt und ihnen danach ein Token ausstellt, zum Beispiel Microsoft Entra ID, Auth0 oder Keycloak. Die Anwendung speichert dann keine Passwörter. Das Verfahren dafür regeln OAuth 2.0 und OpenID Connect.
**Siehe auch:** [Authentifizierung](#authentifizierung), [Bearer-Token](#bearer-token)

### In-Memory
**Definition:** Daten liegen nur im Arbeitsspeicher des laufenden Prozesses, zum Beispiel in einem Array. Nach einem Neustart des Servers sind sie weg.
**Siehe auch:** [Service](#service), [Persistenz](#persistenz)

### Injection
**Definition:** Angriff, bei dem eine Eingabe Teil eines Befehls wird, zum Beispiel einer SQL-Abfrage. Schutz: Befehl und Werte getrennt senden (Parameter), wie es ein ORM bei `find` tut.
**Siehe auch:** [ORM](#orm), [OWASP Top 10](#owasp-top-10), [owasp-top-10](quellen.md#owasp-top-10)

### Instanz
**Definition:** Ein laufendes Exemplar eines Programms. Mehrere Instanzen desselben Servers mit gleichem Code stehen hinter einem Load Balancer und beantworten Requests unabhängig voneinander.
**Siehe auch:** [Load Balancer](#load-balancer), [Statelessness](#statelessness)

### Interceptor
**Definition:** Klasse in NestJS, die vor und nach der Methode des Controllers läuft und zum Beispiel die Antwort umwandelt. Der globale `ZodSerializerInterceptor` aus `nestjs-zod` prüft die Antwort gegen das DTO aus `@ZodResponse` und entfernt Felder, die das Schema nicht kennt.
**Siehe auch:** [Pipe](#pipe), [DTO](#dto), [nestjs-docs](quellen.md#nestjs-docs)

### ISO 8601
**Definition:** Internationale Norm für Datum und Uhrzeit als Text, zum Beispiel `2026-10-27T09:15:00.000Z` (`Z` = UTC). Die Beer API schreibt Zeitpunkte im JSON in diesem Format.
**Siehe auch:** [JSON](#json), [rfc-3339](quellen.md#rfc-3339)

### JSON
**Definition:** JavaScript Object Notation – Textformat für Daten mit sechs Datentypen: Objekt, Array, String, Zahl, Boolean und `null`. Media Type `application/json`; unabhängig von JavaScript.
**Siehe auch:** [Media Type](#media-type), [camelCase](#camelcase), [rfc-8259](quellen.md#rfc-8259)

### JSON Merge Patch
**Definition:** Format für `PATCH` mit JSON (Media Type `application/merge-patch+json`): Der Body enthält nur die Felder, die sich ändern. Ein fehlendes Feld bleibt unverändert, ein Feld mit `null` wird entfernt.
**Siehe auch:** [JSON](#json), [Methode](#methode), [rfc-7396](quellen.md#rfc-7396)

### JWT
**Definition:** JSON Web Token: drei Base64URL-Teile mit Punkt, Header, Payload und Signatur. Der Payload ist lesbar, nicht verschlüsselt; die Signatur mit dem Secret des Servers macht jede Änderung erkennbar. `exp` legt den Ablauf fest.
**Siehe auch:** [Bearer-Token](#bearer-token), [rfc-7519](quellen.md#rfc-7519)

### Load Balancer
**Definition:** Verteiler vor mehreren gleichen Servern (Instanzen), der jeden Request an einen freien Server gibt. Das geht nur, wenn die Server zwischen zwei Requests keinen Zustand des Clients speichern.
**Siehe auch:** [Statelessness](#statelessness), [Server](#server)

### Make or Buy
**Definition:** Entscheidung, ob ein Teil eines Systems selbst gebaut oder als Dienst eingekauft wird, zum Beispiel Hosting oder E-Mail-Versand. Ein gekaufter Dienst übernimmt den Betrieb; die Verantwortung gegenüber den Nutzern bleibt beim Betreiber.
**Siehe auch:** [Identity Provider](#identity-provider), [Total Cost of Ownership](#total-cost-of-ownership), [dsgvo](quellen.md#dsgvo)

### Mass Assignment
**Definition:** Ein Client sendet ein Feld, das er nicht setzen darf, zum Beispiel `roles` bei der Registrierung, und der Server übernimmt es. Schutz: Das Schema beschreibt genau die erlaubten Felder; `.strict()` lehnt andere mit `400` ab.
**Siehe auch:** [Schema](#schema), [Validierung](#validierung), [OWASP Top 10](#owasp-top-10)

### Media Type
**Definition:** Bezeichnung eines Datenformats aus Typ und Untertyp, zum Beispiel `application/json` oder `text/html`; steht im Header `Content-Type`.
**Siehe auch:** [Body](#body), [Header](#header)

### Mehrschichtenarchitektur
**Definition:** Architekturmodell, das Präsentation, Logik und Daten auf getrennte Rechner verteilt, zum Beispiel Client, Anwendungsserver und Datenbank (englisch Multi-Tier Architecture). Jede Schicht skaliert einzeln. Die Schichten im Code einer Anwendung beschreibt die Schichtenarchitektur.
**Siehe auch:** [Schichtenarchitektur](#schichtenarchitektur), [Verteiltes System](#verteiltes-system), [van-steen-tanenbaum](quellen.md#van-steen-tanenbaum)

### Methode
**Definition:** Teil der Startzeile eines Requests, der die Absicht nennt: `GET` lesen, `POST` anlegen, `PUT` ersetzen, `PATCH` teilweise ändern, `DELETE` löschen. Dazu kommen `HEAD` (nur die Header einer `GET`-Antwort) und `OPTIONS` (erlaubte Methoden, Antwort im Header `Allow`).
**Siehe auch:** [Endpunkt](#endpunkt), [Idempotent](#idempotent), [Sichere Methode](#sichere-methode)

### Microservice
**Definition:** Kleiner, eigenständig ausgelieferter Server mit eigenen Daten, der mit anderen Microservices über das Netzwerk zusammenarbeitet. Aus Methodenaufrufen werden Netzwerkaufrufe; einzelne Teile können ausfallen, während andere weiterlaufen.
**Siehe auch:** [Modularer Monolith](#modularer-monolith), [Verteiltes System](#verteiltes-system), [Conway’s Law](#conways-law), [fowler-monolith-first](quellen.md#fowler-monolith-first)

### Migration
**Definition:** Datei mit den Schritten, die das Schema einer Datenbank ändern (`up`) und die Änderung zurücknehmen (`down`). Die Datenbank merkt sich, welche Migrationen ausgeführt sind; jede Kopie eines Projekts kommt so auf dasselbe Schema.
**Siehe auch:** [Entity](#entity), [typeorm-docs](quellen.md#typeorm-docs)

### Mock
**Definition:** Ersatz für eine Abhängigkeit im Test, der feste Werte liefert, zum Beispiel ein Repository ohne Datenbank. Über Dependency Injection gibt der Test der geprüften Klasse den Mock statt des echten Providers.
**Siehe auch:** [Unit-Test](#unit-test), [Dependency Injection](#dependency-injection)

### Modularer Monolith
**Definition:** Anwendung, die als ein Prozess läuft und als Ganzes ausgeliefert wird, innen aber in Module mit klaren Grenzen geteilt ist. Ein Module nutzt von einem anderen nur, was dieses freigibt. Die Beer API ist ein modularer Monolith.
**Siehe auch:** [Module](#module), [Microservice](#microservice)

### Module
**Definition:** Klasse in NestJS mit dem Decorator `@Module()`, die Controller und Provider einer Ressource bündelt. Unter `exports` steht, was andere Module nutzen dürfen, unter `imports`, wessen Exporte das Module selbst nutzt; die Wurzel ist `AppModule`.
**Siehe auch:** [Controller](#controller), [Provider](#provider), [Conway’s Law](#conways-law), [nestjs-docs](quellen.md#nestjs-docs)

### Multi-Factor Authentication
**Definition:** Anmeldung mit mehr als einem Nachweis, zum Beispiel Passwort und Code aus einer App (MFA). Ein gestohlenes Passwort allein genügt dann nicht. Identity Provider bringen MFA meist mit.
**Siehe auch:** [Identity Provider](#identity-provider), [Authentifizierung](#authentifizierung)

### Nest CLI
**Definition:** Kommandozeilenwerkzeug von NestJS. `npx nest generate controller beers` legt einen Controller an und trägt ihn im Module ein; `npx nest generate --help` listet alle Generatoren.
**Siehe auch:** [Controller](#controller), [Module](#module), [nestjs-docs](quellen.md#nestjs-docs)

### OAuth 2.0 und OpenID Connect
**Definition:** Standards, mit denen eine Anwendung ein Token von einem Identity Provider bekommt (OAuth 2.0) und erfährt, wer angemeldet ist (OpenID Connect, OIDC). Beispiel: „Mit Google anmelden“. Die Anwendung sieht kein Passwort.
**Siehe auch:** [Identity Provider](#identity-provider), [rfc-6749](quellen.md#rfc-6749), [openid-connect](quellen.md#openid-connect)

### OpenAPI
**Definition:** Spezifikation für eine maschinenlesbare Beschreibung einer HTTP-API als JSON oder YAML: Pfade, Methoden, Parameter, Schemas für Body und Antwort je Statuscode. Die Beer API liefert sie unter `/api-json`; Swagger UI unter `/api` zeigt sie an, Postman importiert sie als Collection.
**Siehe auch:** [Schema](#schema), [Endpunkt](#endpunkt), [openapi-spec](quellen.md#openapi-spec)

### ORM
**Definition:** Object-Relational Mapping: Bibliothek, die zwischen Objekten im Code und Zeilen in Tabellen übersetzt. Die Beer API nutzt TypeORM; das SQL erzeugt das ORM.
**Siehe auch:** [Entity](#entity), [Repository (ORM)](#repository-orm), [typeorm-docs](quellen.md#typeorm-docs)

### OWASP Top 10
**Definition:** Liste der zehn häufigsten Sicherheitsrisiken von Webanwendungen, herausgegeben vom Open Worldwide Application Security Project. Aktuell ist die Ausgabe 2025 mit A01 Broken Access Control auf Platz 1. Die Namen der Einträge bleiben englisch.
**Siehe auch:** [Autorisierung](#autorisierung), [Injection](#injection), [owasp-top-10](quellen.md#owasp-top-10)

### Peer-to-Peer
**Definition:** Architekturmodell, in dem gleichberechtigte Rechner (Peers) direkt miteinander Daten austauschen, ohne zentralen Server. Jeder Peer ist zugleich Client und Server.
**Siehe auch:** [Client](#client), [Server](#server), [Verteiltes System](#verteiltes-system), [van-steen-tanenbaum](quellen.md#van-steen-tanenbaum)

### Personenbezogene Daten
**Definition:** Angaben, die sich auf eine identifizierbare Person beziehen, auch über Umwege (DSGVO Art. 4 Nr. 1). In der Beer API sind das der Name und der Hash eines Users, jede `userId`, der Kommentar einer Bewertung und ihr Zeitpunkt zusammen mit der `userId`.
**Siehe auch:** [Autorisierung](#autorisierung), [dsgvo](quellen.md#dsgvo)

### Persistenz
**Definition:** Daten liegen außerhalb des laufenden Prozesses, zum Beispiel in einer Datenbank, und überstehen einen Neustart des Servers. Gegenteil von In-Memory.
**Siehe auch:** [In-Memory](#in-memory), [ORM](#orm)

### Pfadparameter
**Definition:** Variabler Abschnitt eines Pfads, zum Beispiel `2` in `/beers/2` für das Muster `/beers/:id`. Der Wert kommt immer als String an.
**Siehe auch:** [Query-Parameter](#query-parameter), [Endpunkt](#endpunkt)

### Pipe
**Definition:** Klasse in NestJS, die einen Parameter prüft oder umwandelt, bevor die Methode des Controllers läuft. Die globale Pipe aus `nestjs-zod` (`ZodValidationPipe`, ab Einheit 8 als `ValidationPipe` aus `createZodValidationPipe`) prüft jeden Parameter, dessen Typ ein DTO aus `createZodDto` ist, und antwortet bei ungültigen Daten mit `400`. Built-in Pipes von NestJS stehen an einem einzelnen Parameter, zum Beispiel `ParseIntPipe` in `@Param('id', ParseIntPipe)`: Sie wandelt den Pfadparameter in eine ganze Zahl und antwortet sonst mit `400`.
**Siehe auch:** [DTO](#dto), [Validierung](#validierung), [nestjs-docs](quellen.md#nestjs-docs)

### Polling
**Definition:** Der Client fragt in festen Abständen beim Server nach, ob es etwas Neues gibt, zum Beispiel alle fünf Sekunden mit `GET /beers`. Die Last wächst mit der Zahl der Clients und der Zeit, auch wenn sich nichts ändert.
**Siehe auch:** [Push](#push), [Request](#request-anfrage)

### Port
**Definition:** Nummer, unter der ein Programm auf einem Rechner erreichbar ist. Standard sind 443 für `https` und 80 für `http`; die Beer API läuft auf Port 3000 (`http://localhost:3000`).
**Siehe auch:** [URL](#url), [Server](#server), [mdn](quellen.md#mdn)

### Primärschlüssel
**Definition:** Spalte, deren Wert jede Zeile einer Tabelle eindeutig kennzeichnet, in der Beer API die `id`. Die Datenbank vergibt ihn beim Einfügen, wenn die Anfrage keinen Wert setzt; die Seed-Migrationen setzen feste Werte.
**Siehe auch:** [Fremdschlüssel](#fremdschlüssel), [sqlite-docs](quellen.md#sqlite-docs)

### Provider
**Definition:** Klasse, die NestJS erzeugen und per Dependency Injection übergeben kann. Der Decorator `@Injectable()` markiert sie, ein Module trägt sie unter `providers` ein.
**Siehe auch:** [Dependency Injection](#dependency-injection), [Service](#service), [nestjs-docs](quellen.md#nestjs-docs)

### Push
**Definition:** Der Server sendet Daten von sich aus, sobald sich etwas ändert, über eine Verbindung, die der Client offen hält. Gegenteil von Polling. Im Web meist über WebSocket umgesetzt.
**Siehe auch:** [Polling](#polling), [WebSocket](#websocket)

### Query-Parameter
**Definition:** Paar aus Name und Wert im Teil einer URL nach `?`, zum Beispiel `style=helles` in `/beers?style=helles`. Der Wert kommt als String an; steht derselbe Name mehrfach in der Query, als Array.
**Siehe auch:** [Pfadparameter](#pfadparameter)

### Queue
**Definition:** Warteschlange in einem eigenen Dienst, die Aufträge speichert, bis ein Worker sie abarbeitet. Anders als ein Event im Prozess übersteht ein Auftrag einen Neustart und kann auf einem anderen Rechner laufen.
**Siehe auch:** [Event](#event), [nestjs-docs](quellen.md#nestjs-docs)

### RBAC
**Definition:** Role-Based Access Control – Rechte hängen an Rollen, ein User hat eine oder mehrere Rollen. Die API prüft die Rolle, nicht den einzelnen User. In der Beer API: `admin` und `user`, geprüft vom `RolesGuard`.
**Siehe auch:** [Autorisierung](#autorisierung), [Guard](#guard), [nestjs-docs-11](quellen.md#nestjs-docs-11)

### Redirect
**Definition:** Antwort mit einem Statuscode `3xx` und dem Header `Location`, die den Client an eine andere URL verweist. `301` und `308` gelten dauerhaft, `302` und `307` vorübergehend. Browser und Postman folgen automatisch, curl nur mit `-L`.
**Siehe auch:** [Statuscode](#statuscode), [Header](#header), [rfc-9110](quellen.md#rfc-9110)

### Repository (ORM)
**Definition:** Objekt des ORM, das eine Tabelle liest und schreibt, zum Beispiel mit `find`, `findOneBy`, `save` und `remove`. Jede Methode liefert ein Promise. Nicht zu verwechseln mit einem Git-Repository.
**Siehe auch:** [ORM](#orm), [Service](#service), [typeorm-docs](quellen.md#typeorm-docs)

### Repräsentation
**Definition:** Form, in der eine Ressource übertragen wird, zum Beispiel ein Bier als JSON oder als HTML-Seite. Welche Repräsentation der Client bekommt, regelt Content Negotiation über den Header `Accept`.
**Siehe auch:** [Ressource](#ressource), [Content Negotiation](#content-negotiation)

### Request (Anfrage)
**Definition:** Anfrage eines Clients an einen Server. Auf jeden Request folgt genau eine Response.
**Siehe auch:** [Response](#response-antwort), [Client](#client)

### Response (Antwort)
**Definition:** Antwort eines Servers auf einen Request, mit einem Statuscode und meist einem Inhalt. Ohne Request sendet der Server keine Response.
**Siehe auch:** [Request](#request-anfrage), [Server](#server)

### Ressource
**Definition:** Ding der Fachlichkeit, das eine API über eine URL benennt, zum Beispiel ein Bier unter `/beers/2` oder die Sammlung aller Biere unter `/beers`. Der Client sieht nie die Ressource selbst, nur Repräsentationen davon.
**Siehe auch:** [Repräsentation](#repräsentation), [URL](#url)

### REST
**Definition:** Representational State Transfer – Architekturstil von Roy Fielding (2000) mit sechs Constraints: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System und optional Code on Demand. HTTP ist die übliche Umsetzung; REST ist kein Protokoll.
**Siehe auch:** [Statelessness](#statelessness), [HATEOAS](#hateoas), [fielding-2000](quellen.md#fielding-2000)

### Richardson Maturity Model
**Definition:** Modell von Leonard Richardson mit vier Stufen einer HTTP-API: 0 ein Endpunkt für alles, 1 Ressourcen, 2 HTTP-Methoden und Statuscodes, 3 Hypermedia (HATEOAS). Die Beer API steht auf Stufe 2.
**Siehe auch:** [REST](#rest), [HATEOAS](#hateoas), [fowler-rmm](quellen.md#fowler-rmm)

### Routing
**Definition:** Zuordnung einer Anfrage zu der Methode, die sie beantwortet, anhand von HTTP-Methode und Pfad. In NestJS entsteht das Routing beim Start aus den Decorators der Controller; findet es keine Methode, antwortet es mit `404` und `Cannot GET …`.
**Siehe auch:** [Endpunkt](#endpunkt), [Decorator](#decorator), [nestjs-docs](quellen.md#nestjs-docs)

### Salt
**Definition:** Zufallswert, der vor dem Hashen an ein Passwort gehängt wird und offen beim Hash steht. Gleiche Passwörter ergeben so verschiedene Hashes, und vorberechnete Tabellen helfen beim Raten nicht.
**Siehe auch:** [Hash](#hash), [owasp-password-storage](quellen.md#owasp-password-storage)

### Schema
**Definition:** Beschreibung gültiger Daten: welche Felder, welche Typen, welche Grenzen. Ein Zod-Schema wie `z.object({ name: z.string().min(1) })` prüft Daten zur Laufzeit; `z.infer` leitet daraus den TypeScript-Typ ab. Nicht zu verwechseln mit dem Schema einer Datenbank (Tabellen, Spalten, Schlüssel), das Migrationen anlegen.
**Siehe auch:** [DTO](#dto), [Validierung](#validierung), [zod-docs](quellen.md#zod-docs)

### Schichtenarchitektur
**Definition:** Aufteilung einer Anwendung in Schichten mit je einer Aufgabe, in der Beer API Controller (HTTP), Service (Regeln) und Repository (Daten). Eine Schicht ruft nur ihre eigene oder die Schicht darunter auf (englisch Layered Architecture).
**Siehe auch:** [Controller](#controller), [Service](#service), [Repository (ORM)](#repository-orm), [Modularer Monolith](#modularer-monolith)

### Scope (NestJS)
**Definition:** Legt fest, wie oft NestJS einen Provider erzeugt. Standard ist eine Instanz je Module (Singleton); die Scopes `REQUEST` und `TRANSIENT` erzeugen eine Instanz je Anfrage bzw. je Klasse, die den Provider anfordert.
**Siehe auch:** [Provider](#provider), [Singleton](#singleton), [nestjs-docs](quellen.md#nestjs-docs)

### Server
**Definition:** Programm, das auf Anfragen wartet und sie beantwortet, zum Beispiel die Beer API. Client und Server sind Rollen von Programmen, keine Geräte.
**Siehe auch:** [Client](#client), [Statelessness](#statelessness)

### Server-Side Rendering
**Definition:** Der Server erzeugt die fertige HTML-Seite und sendet sie an den Browser; der Browser muss die Seite nicht erst mit JavaScript aus Daten bauen. Suchmaschinen und E-Mail-Programme lesen solche Seiten ohne JavaScript.
**Siehe auch:** [Template-Engine](#template-engine), [Repräsentation](#repräsentation), [google-javascript-seo](quellen.md#google-javascript-seo)

### Service
**Definition:** Klasse in NestJS, die Daten und Logik einer Ressource hält, zum Beispiel `BeersService`. Der Controller ruft ihn auf; Anfrage und Antwort sieht nur der Controller. Ab Einheit 8 wirft ein Service auch Exceptions wie `NotFoundException`, aus denen NestJS den Statuscode macht.
**Siehe auch:** [Controller](#controller), [Provider](#provider), [nestjs-docs](quellen.md#nestjs-docs)

### Sichere Methode
**Definition:** Methode, die auf dem Server nichts ändert, zum Beispiel `GET` und `HEAD` (englisch: safe). Clients und Caches dürfen sie jederzeit senden.
**Siehe auch:** [Methode](#methode), [Idempotent](#idempotent)

### Single-Page Application
**Definition:** Webanwendung, die der Browser einmal lädt und danach mit JavaScript aus Daten einer API (meist JSON) aufbaut und aktualisiert. Gegenstück zum Server-Side Rendering.
**Siehe auch:** [Server-Side Rendering](#server-side-rendering), [API](#api)

### Singleton
**Definition:** Von einer Klasse gibt es genau eine Instanz. NestJS erzeugt einen Provider standardmäßig einmal je Module, das ihn unter `providers` einträgt; alle Anfragen teilen diese Instanz.
**Siehe auch:** [Provider](#provider), [nestjs-docs](quellen.md#nestjs-docs)

### SLA
**Definition:** Service Level Agreement – Vertrag über die Qualität eines Dienstes, zum Beispiel über die Verfügbarkeit. 99,9 % Verfügbarkeit erlauben 8 Stunden 45 Minuten 36 Sekunden Ausfall im Jahr.
**Siehe auch:** [Verteiltes System](#verteiltes-system)

### socket.io
**Definition:** Bibliothek für Client und Server, die über WebSocket Events mit Namen, Acknowledgements und automatische Wiederverbindung bietet. Sie hat ein eigenes Format in den Frames; Client und Server müssen beide `socket.io` verwenden. NestJS bindet sie über `@nestjs/platform-socket.io` ein.
**Siehe auch:** [Event](#event), [Gateway](#gateway), [WebSocket](#websocket), [socket-io-docs](quellen.md#socket-io-docs)

### SQLite
**Definition:** Relationale Datenbank als Bibliothek, die im Prozess des Servers läuft und die ganze Datenbank in einer Datei speichert. Die Beer API nutzt SQLite ab Einheit 12 mit der Datei `beer.db`.
**Siehe auch:** [Persistenz](#persistenz), [ORM](#orm), [sqlite-docs](quellen.md#sqlite-docs)

### Stacktrace
**Definition:** Liste der Funktionsaufrufe bis zu der Stelle, an der eine Exception entstand, mit Dateien und Zeilennummern. Er gehört ins Terminal oder ins Log, nie in eine Antwort: Er zeigt Angreifern den Aufbau des Servers.
**Siehe auch:** [Exception](#exception), [owasp-top-10](quellen.md#owasp-top-10)

### Statelessness
**Definition:** Zustandslosigkeit: Der Server merkt sich nichts zwischen zwei Anfragen; jede Anfrage enthält alles, was er für die Antwort braucht. Deshalb kann jede gleiche Instanz eines Servers jede Anfrage beantworten.
**Siehe auch:** [Server](#server), [Request](#request-anfrage)

### Statuscode
**Definition:** Dreistellige Zahl in der Statuszeile einer Response, die das Ergebnis nennt, zum Beispiel `200` oder `404`. Die erste Ziffer nennt die Klasse: 2 Erfolg, 3 Umleitung, 4 Fehler des Clients, 5 Fehler des Servers.
**Siehe auch:** [Response](#response-antwort), [mdn](quellen.md#mdn)

### Swagger UI
**Definition:** Werkzeug, das eine OpenAPI-Beschreibung als Webseite anzeigt: je Endpunkt Parameter, Schemas und Antworten, mit Formular zum Ausprobieren. In der Beer API unter `/api`.
**Siehe auch:** [OpenAPI](#openapi), [nestjs-docs](quellen.md#nestjs-docs)

### Transparenz
**Definition:** Eigenschaft eines verteilten Systems, seine Verteilung vor den Nutzern zu verbergen, zum Beispiel den Ort eines Teils, mehrere Kopien oder den Ausfall eines Teils. Vollständige Transparenz ist nicht erreichbar.
**Siehe auch:** [Verteiltes System](#verteiltes-system), [van-steen-tanenbaum](quellen.md#van-steen-tanenbaum)

### Technische Schulden
**Definition:** Mängel in der inneren Qualität von Software, meist aus Abkürzungen beim Bau, die jede spätere Änderung verteuern. Der Mehraufwand je neuem Feature heißt in diesem Bild Zinsen (englisch Technical Debt).
**Siehe auch:** [Total Cost of Ownership](#total-cost-of-ownership), [fowler-technical-debt](quellen.md#fowler-technical-debt)

### Template-Engine
**Definition:** Programm, das ein Template (Text mit Platzhaltern, Schleifen und Bedingungen) mit Daten füllt, zum Beispiel HTML aus `{{#each breweries}}`. Ein Layout ist ein Template, das alle Seiten rahmt. Die Beer API nutzt Handlebars über das Paket `hbs`.
**Siehe auch:** [Escaping](#escaping), [Server-Side Rendering](#server-side-rendering), [handlebars-docs](quellen.md#handlebars-docs)

### TLS
**Definition:** Transport Layer Security – verschlüsselt die Verbindung zwischen Client und Server und weist über ein Zertifikat nach, dass der Server zum Namen gehört. `https` ist HTTP über TLS.
**Siehe auch:** [DNS](#dns), [chrome-devtools](quellen.md#chrome-devtools)

### Total Cost of Ownership
**Definition:** Alle Kosten eines Systems über seine Nutzungsdauer, kurz TCO: Bau oder Kauf, Betrieb, Wartung, Support und Weiterentwicklung. Grundlage für die Entscheidung, ein System selbst zu bauen oder zu kaufen (Make or Buy).
**Siehe auch:** [Technische Schulden](#technische-schulden), [SLA](#sla)

### Umgebungsvariable
**Definition:** Wert, den das Betriebssystem einem Prozess beim Start mitgibt; Node.js liest ihn unter `process.env`. Secrets und Einstellungen je Umgebung stehen dort statt im Code; lokal sammelt die Datei `.env` sie. `NODE_ENV=production` kennzeichnet den Betrieb.
**Siehe auch:** [twelve-factor-config](quellen.md#twelve-factor-config), [nestjs-docs](quellen.md#nestjs-docs)

### Uniform Interface
**Definition:** Constraint von REST: eine einheitliche Schnittstelle für alle Ressourcen aus vier Teilen: Ressourcen haben eine URL, der Client ändert sie über Repräsentationen, Nachrichten beschreiben sich selbst, Hypermedia steuert den Ablauf.
**Siehe auch:** [REST](#rest), [HATEOAS](#hateoas), [fielding-2000](quellen.md#fielding-2000)

### Unit-Test
**Definition:** Test, der eine einzelne Klasse ohne den Rest der Anwendung prüft. Was die Klasse braucht, etwa Repository oder Gateway, ersetzt der Test durch feste Werte; ein roter Test zeigt auf genau eine Regel.
**Siehe auch:** [End-to-End-Test](#end-to-end-test), [Dependency Injection](#dependency-injection), [nestjs-docs](quellen.md#nestjs-docs)

### URL
**Definition:** Uniform Resource Locator – Adresse einer Ressource aus Schema, Host, Port, Pfad, Query und Fragment, zum Beispiel `https://api.openbrewerydb.org/v1/breweries?per_page=3`. Das Fragment nach `#` bleibt beim Client.
**Siehe auch:** [Query-Parameter](#query-parameter), [Pfadparameter](#pfadparameter)

### User Enumeration
**Definition:** Herausfinden, welche Anmeldenamen es gibt, aus unterschiedlichen Antworten des Servers, zum Beispiel `404` für einen unbekannten Namen und `401` für ein falsches Passwort. Eine einheitliche Antwort verhindert das; die Antwortzeit kann den Namen trotzdem verraten, wenn der Server nur für bekannte Namen einen Hash vergleicht.
**Siehe auch:** [Authentifizierung](#authentifizierung), [owasp-authentication](quellen.md#owasp-authentication)

### User Story
**Definition:** Kurze Beschreibung einer Anforderung aus Sicht eines Stakeholders in der Form **Als** Rolle **möchte ich** Funktion, **damit** Nutzen. Die Akzeptanzkriterien legen fest, wann sie erfüllt ist.
**Siehe auch:** [Akzeptanzkriterium](#akzeptanzkriterium), [cohn-user-stories](quellen.md#cohn-user-stories)

### Validierung
**Definition:** Prüfung von Eingaben gegen ein Schema an der Grenze der API, bevor die Logik sie verarbeitet. Ungültige Daten lehnt der Server mit `400` ab und nennt das fehlerhafte Feld.
**Siehe auch:** [Schema](#schema), [Pipe](#pipe), [Statuscode](#statuscode)

### Verfügbarkeit
**Definition:** Anteil der Zeit, in der ein Dienst Anfragen beantwortet, in Prozent. Jede weitere Neun teilt die erlaubte Ausfallzeit durch zehn: 99,9 % erlauben 8 Stunden 45 Minuten 36 Sekunden im Jahr, 99,99 % 52 Minuten 34 Sekunden.
**Siehe auch:** [SLA](#sla), [google-sre-availability](quellen.md#google-sre-availability)

### Verteiltes System
**Definition:** Menge eigenständiger Rechner oder Programme, die nur über Nachrichten zusammenarbeiten und den Nutzern als ein einziges System erscheinen. Ein Teil kann ausfallen, während die anderen weiterlaufen.
**Siehe auch:** [Client](#client), [Server](#server), [van-steen-tanenbaum](quellen.md#van-steen-tanenbaum)

### WebSocket
**Definition:** Protokoll für eine dauerhafte Verbindung zwischen Client und Server, über die beide Seiten jederzeit Nachrichten (Frames) senden. Die Verbindung beginnt als HTTP-Anfrage mit `Upgrade: websocket`; der Server antwortet mit `101 Switching Protocols`.
**Siehe auch:** [HTTP](#http), [Push](#push), [socket.io](#socketio), [rfc-6455](quellen.md#rfc-6455)

### Zod
**Definition:** Bibliothek für TypeScript, die Daten zur Laufzeit gegen ein Schema prüft und aus dem Schema den Typ ableitet (`z.infer`). `parse` wirft bei ungültigen Daten einen `ZodError`, `safeParse` liefert ein Ergebnis mit `success`.
**Siehe auch:** [Schema](#schema), [DTO](#dto), [zod-docs](quellen.md#zod-docs)

### Zirkuläre Abhängigkeit
**Definition:** Zwei Module oder zwei Provider brauchen sich gegenseitig. NestJS kann dann keinen von beiden zuerst erzeugen und bricht den Start ab. Zwischen Modulen wird der Kreis aufgelöst, indem eine Richtung entfällt; zwischen zwei Providern, die sich wirklich gegenseitig brauchen (Service und Gateway), mit `forwardRef()` auf beiden Seiten.
**Siehe auch:** [Module](#module), [Provider](#provider), [nestjs-docs](quellen.md#nestjs-docs)

---

## Begriffe der Unterlagen

### Aufgabennummer
**Definition:** Nummer einer Aufgabe im Format Einheit.Aufgabe, zum Beispiel `5.1`. Dieselbe Nummer steht in der Vorlesung, im Skript und im Ordner der Collection („Aufgabe 5.1 – Biere auflisten“).
**Siehe auch:** [Skript](#skript), [Collection](#collection)

### Basisprojekt
**Definition:** Ausgangsstand der Beer API für Einheit 5: ein NestJS-Projekt mit festen Versionen, eingerichtetem Zod und Swagger und einem Hello-World-Controller. Alle beginnen mit demselben Stand.
**Siehe auch:** [Lösungsstand](#lösungsstand), [Beer App](#beer-app)

### Beer App
**Definition:** Fallbeispiel der Web-Programmierung. Die regionalen Brauereien beauftragen und betreiben die App; in den User Stories heißen sie **Betreiber**. Den Server der App, die Beer API, baust du in den Übungen.
**Siehe auch:** [User Story](#user-story), [Lösungsstand](#lösungsstand)

### Capture the Flag
**Definition:** Übung der Einheiten 3 und 4: Ein gestellter Server stellt Rätsel aus mehreren HTTP-Anfragen. Jedes gelöste Level liefert ein Flag der Form `FLAG{…}`; ein Team-Token aus Level 0 trennt die Teams.
**Siehe auch:** [Statuscode](#statuscode), [Header](#header)

### Collection
**Definition:** Sammlung von Anfragen mit Tests in Postman. Jede Einheit mit Code hat eine Collection mit einem Ordner je Aufgabe; ein roter Test nennt einen Hinweis auf Ort und Ursache. Die Collection ist ein Angebot zur Selbstkontrolle.
**Siehe auch:** [Aufgabennummer](#aufgabennummer), [Akzeptanzkriterium](#akzeptanzkriterium), [postman-docs](quellen.md#postman-docs)

### Live-Frage
**Definition:** Frage in der Vorlesung zu einer Anfrage, deren Antwort du vorhersagst, bevor die Anfrage gesendet wird. Die Auflösung nennt die Antwort und ihre Ursache.
**Siehe auch:** [Statuscode](#statuscode)

### Lösungsstand
**Definition:** Stand der Beer API am Ende einer Einheit. Wer eine Aufgabe auslässt, arbeitet mit dem Lösungsstand weiter; nach der Übung dient er als Vergleich zur eigenen Lösung.
**Siehe auch:** [Basisprojekt](#basisprojekt), [Beer App](#beer-app)

### Skript
**Definition:** PowerPoint je Einheit zum Nachlesen und Üben: Konzept, Beispiel, Aufgaben mit gestuften Hinweisen und typische Fehler. Der Fuß jeder Folie zeigt Einheit.Folie; damit verweist die Vorlesung auf eine Stelle im Skript, zum Beispiel „Skript 3.14“.
**Siehe auch:** [Aufgabennummer](#aufgabennummer)
