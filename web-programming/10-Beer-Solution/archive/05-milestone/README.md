# Milestone 05

Im fünften Meilenstein wird die Beer API um eine Datenbank Anbindung erweitert. Für die Vorlesung nutzen wir sqlite3, da es keine zusätzliche Installation benötigt und einfach zu bedienen ist. Für den Einsatz in NodeJS nutzen wir `better-sqlite3` (https://github.com/WiseLibs/better-sqlite3/tree/master)

## Installation & Run

```bash
npm install
npm run start
```

## Infos zur Datenbank

Die Datenbank wird im Ordner `/database` in der Datei `beer.db` gespeichert. Sie können entweder ein Datenbank Programm nutzen zum Anschauen der Daten oder eine VSCode Extension installieren:

- Database Client https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2
- SQLite Viewer https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer
