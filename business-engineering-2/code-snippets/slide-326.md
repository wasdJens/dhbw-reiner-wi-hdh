## Friction Log – Projekt "Case XY" aufsetzen
## Person: [Name] | Datum: [Datum] | Vorwissen: Kenne React, kenne das Projekt nicht

### 09:00 – Repository klonen
✅ `git clone` funktioniert problemlos.

### 09:02 – README lesen
⚠️ README sagt "npm install" – aber welche Node-Version?
   Habe Node 20, bekomme Dependency-Fehler.
   → 15 Minuten verloren bis ich herausfand: Braucht Node 18.
   💡 FIX: Node-Version in README und .nvmrc angeben.

### 09:17 – npm install
⚠️ 3 Deprecation Warnings. Harmlos? Kritisch? Keine Ahnung.
   → Ignoriert und gehofft.

### 09:19 – npm run dev
❌ Fehler: "Cannot find module '../data/products.json'"
   Die Datei fehlt im Repository. Steht nirgends dass man sie
   erst erstellen muss.
   → 20 Minuten in der Codebase gesucht bis ich ein Beispiel fand.
   💡 FIX: Beispiel-Datei ins Repo oder in README dokumentieren.

### 09:40 – App startet
✅ Startseite lädt.

### 09:41 – Navigieren
⚠️ Klicke auf "Produkte" → 404-Seite.
   Liegt das am fehlenden Mock-Server? An fehlenden Daten?
   → Unklar. Kein Hinweis in der Konsole.
   💡 FIX: Bessere Fehlermeldung oder README-Hinweis.

### 09:50 – Feature einbauen (neuer Button)
✅ Komponente gefunden, Props verstanden, Button eingebaut.
   Dank TypeScript war klar welche Props nötig sind. 👍

### 09:55 – Zusammenfassung
Gesamtzeit: 55 Minuten. Davon 35 Minuten Reibung.
Effektive Arbeit: 20 Minuten.
Reibungskosten: 35 Min × (100€/60) = 58€ verschwendet.