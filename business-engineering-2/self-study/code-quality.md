# Code-Qualität in der Praxis
## ESLint, Prettier, Code Reviews und Conventions
### Selbststudium-Material zu Einheit 8

---

> **Hinweis:** Dieses Dokument ist Begleitmaterial zur Vorlesung. Es behandelt Werkzeuge und Praktiken die in professionellen Software-Teams Standard sind. Nehmt euch 60-90 Minuten Zeit, richtet die Tools ein und probiert sie aus. Lesen allein reicht nicht – die Werkzeuge müssen in eurem Projekt laufen.

---

## 1. ESLint – Der automatische Code-Prüfer

### Was ist ESLint?

ESLint ist ein statisches Analyse-Tool für JavaScript und TypeScript. Es analysiert euren Code **ohne ihn auszuführen** und findet Fehler, problematische Muster und Stilprobleme.

Statische Analyse bedeutet: ESLint liest euren Code wie ein erfahrener Entwickler der über eure Schulter schaut – nur schneller, konsistenter und ohne müde zu werden.

### Warum ESLint?

TypeScript fängt Typ-Fehler. ESLint fängt alles andere:
- Variablen die deklariert aber nie benutzt werden
- `console.log`-Statements die in Produktion nicht gehören
- `==` statt `===` (Typvergleich ohne Typprüfung)
- Fehlende `key`-Props in React-Listen
- Potenzielle Sicherheitsprobleme
- Code-Stil-Inkonsistenzen

### Einrichtung

```bash
# In eurem Projektverzeichnis:
npm install eslint --save-dev

# Konfiguration generieren:
npx eslint --init

# Die Fragen beantworten:
# - How would you like to use ESLint? → To check syntax and find problems
# - What type of modules? → JavaScript modules (import/export)
# - Which framework? → React / Angular (je nach eurem Case)
# - Does your project use TypeScript? → Yes
# - Where does your code run? → Browser
```

### Konfiguration (.eslintrc.json)

Nach dem Init habt ihr eine `.eslintrc.json` (oder `.eslintrc.cjs`). Eine gute Basis-Konfiguration:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "eqeqeq": "error"
  }
}
```

**Was die Regeln bedeuten:**

| Regel | Was sie tut | Warum wichtig |
|-------|------------|---------------|
| `no-console: warn` | Warnt bei `console.log` | Debug-Output gehört nicht in Produktion |
| `no-unused-vars: error` | Fehler bei ungenutzten Variablen | Toter Code = Verwirrung + Wartungskosten |
| `no-explicit-any: warn` | Warnt bei `any`-Typen | `any` schaltet TypeScript-Vorteile ab |
| `prefer-const: error` | Erzwingt `const` wenn kein Re-Assignment | Macht Intention klar: "Dieser Wert ändert sich nicht" |
| `eqeqeq: error` | Erzwingt `===` statt `==` | `"5" == 5` ist `true` in JS – fast immer ein Bug |

### Nutzung

```bash
# Gesamtes Projekt prüfen:
npx eslint src/

# Automatisch fixbare Probleme beheben:
npx eslint src/ --fix

# In package.json als Script:
"scripts": {
  "lint": "eslint src/",
  "lint:fix": "eslint src/ --fix"
}
```

### VS Code Integration

Installiert die ESLint-Extension in VS Code. Dann seht ihr Fehler und Warnungen **live beim Tippen** – nicht erst wenn ihr den Befehl ausführt. Das ist der größte Produktivitätsgewinn: Fehler finden bevor ihr speichert.

---

## 2. Prettier – Der automatische Code-Formatierer

### Was ist Prettier?

Prettier formatiert euren Code automatisch nach konsistenten Regeln. Es kümmert sich um: Einrückung, Anführungszeichen, Semikolons, Zeilenumbrüche, Klammern-Positionierung und alles andere was mit "wie sieht der Code aus" zu tun hat.

### Warum Prettier?

**Ohne Prettier:**
```typescript
// Entwickler A schreibt:
function getProducts(){
    const data=getAllProducts()
    return data.filter(p=>p.price>10)}

// Entwickler B schreibt:
function getProducts() {
  const data = getAllProducts();
  return data.filter( p => p.price > 10 );
}

// Entwickler C schreibt:
function getProducts()
{
    const data = getAllProducts()
    return data.filter(p => p.price > 10)
}
```

Drei Stile im selben Projekt. Jeder Pull Request wird zum Formatierungskrieg. Code Reviews verschwenden Zeit mit "bitte Leerzeichen hier" statt mit echten Problemen.

**Mit Prettier:**
Alle drei schreiben egal wie. `npx prettier --write .` macht daraus:

```typescript
function getProducts() {
  const data = getAllProducts();
  return data.filter((p) => p.price > 10);
}
```

Immer. Überall. Automatisch. Diskussion beendet.

### Einrichtung

```bash
npm install prettier --save-dev
```

Erstellt eine `.prettierrc` im Projektroot:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

**Was die Optionen bedeuten:**

| Option | Wert | Bedeutung |
|--------|------|-----------|
| `semi` | `true` | Semikolons am Zeilenende: Ja |
| `singleQuote` | `true` | Einfache statt doppelte Anführungszeichen |
| `tabWidth` | `2` | 2 Leerzeichen pro Einrückung |
| `trailingComma` | `es5` | Trailing Comma wo ES5-kompatibel |
| `printWidth` | `100` | Maximale Zeilenlänge |
| `arrowParens` | `always` | Klammern um einzelne Arrow-Function-Parameter |

Erstellt auch eine `.prettierignore`:

```
node_modules/
dist/
build/
*.json
```

### Nutzung

```bash
# Gesamtes Projekt formatieren:
npx prettier --write .

# Nur prüfen (ohne zu ändern):
npx prettier --check .

# In package.json als Script:
"scripts": {
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

### ESLint + Prettier zusammen

ESLint prüft Code-Qualität (Logik, Bugs, Patterns). Prettier prüft Code-Formatierung (Leerzeichen, Einrückung, Klammern). Damit sie sich nicht in die Quere kommen:

```bash
npm install eslint-config-prettier --save-dev
```

In `.eslintrc.json` als letztes Element in `extends` einfügen:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ]
}
```

`eslint-config-prettier` deaktiviert alle ESLint-Regeln die mit Prettier kollidieren würden. ESLint kümmert sich um Logik, Prettier um Formatierung. Klare Arbeitsteilung.

### VS Code: Format on Save

In `.vscode/settings.json` (im Projektroot):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Jetzt formatiert VS Code euren Code automatisch beim Speichern. Ihr müsst nie wieder manuell formatieren.

---

## 3. Conventional Commits – Commit-Messages die sprechen

### Das Problem

Typische Commit-History in Studierendenprojekten:

```
fix stuff
update
WIP
asdfasdf
final version
final version 2
FINAL final version
fix bug
changes
```

Niemand – auch nicht ihr selbst in 2 Wochen – kann aus dieser History verstehen was passiert ist.

### Die Lösung: Conventional Commits

Conventional Commits ist eine Konvention für Commit-Messages die strukturiert und maschinenlesbar ist.

**Format:**

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Die wichtigsten Typen

| Typ | Wann verwenden | Beispiel |
|-----|---------------|---------|
| `feat` | Neues Feature hinzugefügt | `feat: add product search functionality` |
| `fix` | Bug behoben | `fix: resolve crash when product list is empty` |
| `docs` | Dokumentation geändert | `docs: update README with setup instructions` |
| `style` | Formatierung (kein Code-Änderung) | `style: apply prettier formatting` |
| `refactor` | Code umstrukturiert (kein neues Feature, kein Bug-Fix) | `refactor: extract product filter into separate function` |
| `test` | Tests hinzugefügt oder geändert | `test: add unit tests for productService` |
| `chore` | Build-Prozess, Tooling, Dependencies | `chore: update react to v18.3` |

### Gute Beispiele

```bash
# Feature mit Scope (Bereich):
feat(search): add real-time product filtering

# Bug-Fix mit Erklärung:
fix(cart): prevent negative quantities

Previously, users could enter negative numbers in the quantity field,
resulting in negative totals. Added validation to enforce minimum of 1.

# Breaking Change (markiert mit !):
feat(api)!: change product data structure

BREAKING CHANGE: Product.category is now an object instead of a string.
Update all components that access product.category.

# Einfache Dokumentation:
docs: add architecture decision record for SPA choice

# Dependency-Update:
chore(deps): upgrade typescript to 5.4
```

### Schlechte Beispiele

```bash
# ❌ Kein Typ:
"fixed the thing"

# ❌ Zu vage:
"feat: updates"

# ❌ Zu lang in der ersten Zeile:
"feat: added a new search functionality that allows users to search products by name and category with real-time filtering and debounce"

# ❌ Past Tense (Convention ist Imperativ):
"feat: added search"  →  ✅ "feat: add search"
```

### Warum das wichtig ist

1. **Maschinenlesbar:** Tools können automatisch Changelogs generieren
2. **Semantic Versioning:** `feat` = Minor-Version, `fix` = Patch-Version, `BREAKING CHANGE` = Major-Version
3. **Durchsuchbar:** `git log --grep="feat"` zeigt alle neuen Features
4. **Nachvollziehbar:** In 6 Monaten weiß man noch was passiert ist
5. **Professionell:** Standard in der Industrie, erwartet bei Open-Source-Beiträgen

### Einrichten (optional aber empfohlen)

```bash
# Commitlint prüft ob eure Commits der Konvention folgen:
npm install @commitlint/cli @commitlint/config-conventional --save-dev

# Konfiguration (commitlint.config.js):
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

**Quelle:** [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/)

---

## 4. Code Reviews – Die menschliche Qualitätssicherung

### Warum Code Reviews?

ESLint findet syntaktische Probleme. Tests finden funktionale Bugs. Code Reviews finden alles was Maschinen nicht finden können:

- Ist die Architektur sinnvoll?
- Gibt es einen einfacheren Weg?
- Versteht ein anderer Mensch was dieser Code tut?
- Fehlt ein Edge Case den niemand bedacht hat?
- Passt der Code zur bestehenden Code-Basis?

### Das Problem mit "normalem" Feedback

Feedback in Code Reviews ist oft unklar:

> "This is not worded correctly."

Was bedeutet das? Muss ich es ändern? Ist es ein Vorschlag? Blockiert es den Merge? Ist der Reviewer genervt oder hilfreich?

### Conventional Comments – Klares Feedback

Conventional Comments ist ein System das Code-Review-Kommentare mit Labels versieht. Dadurch wird die Intention sofort klar.

**Format:**

```
<label> [decorations]: <subject>

[discussion]
```

### Die Labels

| Label | Bedeutung | Blockiert? |
|-------|-----------|------------|
| `praise:` | Lob – etwas ist gut gelungen | Nein |
| `nitpick:` | Kleiner Stilpunkt, Geschmackssache | Nein |
| `suggestion:` | Verbesserungsvorschlag | Kommt drauf an |
| `issue:` | Konkretes Problem das behoben werden muss | Ja (default) |
| `question:` | Echte Frage – ihr seid unsicher ob etwas richtig ist | Nein |
| `thought:` | Eine Idee die euch beim Lesen gekommen ist | Nein |
| `todo:` | Kleine notwendige Änderung | Ja |
| `chore:` | Prozessschritt (z.B. "bitte CI-Job laufen lassen") | Ja |
| `note:` | Information für den Leser, keine Änderung nötig | Nein |

### Decorations

Zusätzliche Kontextinformationen in Klammern:

| Decoration | Bedeutung |
|------------|-----------|
| `(non-blocking)` | Muss nicht vor dem Merge behoben werden |
| `(blocking)` | Muss vor dem Merge behoben werden |
| `(if-minor)` | Nur beheben wenn die Änderung trivial ist |
| `(security)` | Sicherheitsrelevant |
| `(ux)` | Nutzererfahrung betroffen |

### Beispiele

**Ohne Conventional Comments:**
```
"This should be different."
```
→ Was? Warum? Muss ich? Ist das eine Meinung oder ein Fehler?

**Mit Conventional Comments:**
```
suggestion: This variable name could be more descriptive.

"data" doesn't tell the reader what kind of data it holds. 
Consider "productList" or "filteredProducts" to make the 
intent clear at a glance.
```
→ Klar, konstruktiv, actionable.

**Weitere Beispiele:**

```
praise: Great error handling here!

The fallback to a default value instead of crashing is exactly 
the defensive approach we discussed in class.
```

```
issue (blocking): This will crash if products is null.

getProductById currently doesn't handle the case where the 
product array hasn't loaded yet. Consider adding a null check 
or returning early.
```

```
nitpick (non-blocking): I'd prefer "getAvailableProducts" 
over "getProducts" since it only returns in-stock items.
```

```
question: Is there a reason we're sorting client-side 
instead of in the service layer?

Not necessarily wrong, just want to understand the decision.
```

```
thought (non-blocking): This filter logic is getting complex. 
Might be worth extracting into a useProductFilter hook later.

Not for this PR, but something to keep in mind as the 
codebase grows.
```

### Warum Labels den Unterschied machen

1. **Klarheit:** Der Autor weiß sofort ob etwas gefixt werden muss oder nur eine Idee ist
2. **Tonalität:** `suggestion:` klingt anders als "Du solltest das ändern"
3. **Priorisierung:** `blocking` vs `non-blocking` macht klare Ansagen
4. **Lob:** `praise:` erinnert den Reviewer daran, auch Positives zu benennen
5. **Durchsuchbar:** Labels können gefiltert und ausgewertet werden

**Quelle:** [conventionalcomments.org](https://conventionalcomments.org)

---

## 5. Code Review Checkliste

Wenn ihr den Code eines Kommilitonen reviewt, geht diese Punkte durch:

### Verständlichkeit
- Kann ich den Code ohne Erklärung des Autors verstehen?
- Sind Variablen und Funktionen beschreibend benannt?
- Gibt es Kommentare an Stellen wo die Logik komplex ist?
- Liest sich der Code von oben nach unten wie eine Geschichte?

### Architektur
- Ist die Verantwortung klar aufgeteilt? (Service vs. Komponente)
- Gibt es Code-Duplikation die in eine Funktion extrahiert werden könnte?
- Folgt die Datei der Konvention des restlichen Projekts?
- Sind die Komponenten angemessen klein? (Faustregel: Über 150 Zeilen = Warnsignal)

### Robustheit
- Was passiert bei null, undefined oder leeren Arrays?
- Gibt es Error Handling für Fehlerfälle?
- Sind die TypeScript-Typen korrekt und vollständig?
- Werden Nutzereingaben validiert?

### Wartbarkeit
- Könnte ich diesen Code in 6 Monaten noch verstehen?
- Sind "magische Zahlen" durch benannte Konstanten ersetzt? (`if (items.length > 20)` → `if (items.length > MAX_ITEMS_PER_PAGE)`)
- Gibt es offene TODO-Kommentare die noch bearbeitet werden müssen?
- Ist die Commit-History sauber und nachvollziehbar?

### Code Review Etikette

**Für den Reviewer:**
- Beginnt mit etwas Positivem (`praise:`)
- Seid spezifisch, nicht vage ("Zeile 42 könnte..." statt "Das ist schlecht")
- Fragt statt anzunehmen (`question:` statt Behauptungen)
- Unterscheidet klar zwischen "muss gefixt werden" und "wäre schön"
- Reviewt den Code, nicht die Person

**Für den Autor:**
- Nehmt Feedback nicht persönlich – es geht um den Code, nicht um euch
- Fragt nach wenn ihr Feedback nicht versteht
- Erklärt eure Entscheidungen, aber seid offen sie zu ändern
- Bedankt euch für hilfreiche Reviews

---

## 6. Alles zusammen – Der Workflow

### So sieht ein professioneller Entwicklungs-Workflow aus:

```
1. Code schreiben
   └── ESLint warnt live in VS Code bei Problemen
   └── Prettier formatiert beim Speichern automatisch

2. Code committen
   └── Conventional Commit Message schreiben
       git commit -m "feat(search): add real-time product filtering"
   └── (Optional: Commitlint prüft die Message)

3. Code reviewen lassen
   └── Reviewer nutzt Conventional Comments
       "suggestion: Consider extracting this filter logic..."
   └── Reviewer geht die Checkliste durch

4. Feedback einarbeiten
   └── Fix-Commits: "fix(search): handle empty search term"
   └── Erneutes Review wenn nötig

5. Merge
   └── Alle Issues resolved
   └── Alle Tests grün
   └── ESLint ohne Fehler
   └── Prettier-Check bestanden
```

### In eurem Projekt einrichten – Zusammenfassung

```bash
# 1. ESLint
npm install eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
npx eslint --init

# 2. Prettier
npm install prettier eslint-config-prettier --save-dev
# .prettierrc erstellen (siehe oben)

# 3. Commitlint (optional)
npm install @commitlint/cli @commitlint/config-conventional --save-dev

# 4. Scripts in package.json
"scripts": {
  "lint": "eslint src/",
  "lint:fix": "eslint src/ --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

### Aufgabe für euren Case

1. **ESLint einrichten** und `npx eslint src/` ausführen. Wie viele Warnungen und Fehler habt ihr?
2. **Prettier einrichten** und `npx prettier --write .` ausführen. Wie viele Dateien wurden geändert?
3. **Die letzten 10 Commits** anschauen: Folgen sie der Conventional Commits Konvention? Wenn nicht: Ab jetzt bitte so committen.
4. **Gegenseitiges Code Review** mit einer anderen Person durchführen – mit Conventional Comments.

---

## Weiterführende Ressourcen

| Thema | Link |
|-------|------|
| ESLint Dokumentation | [eslint.org](https://eslint.org/docs/latest/) |
| Prettier Dokumentation | [prettier.io](https://prettier.io/docs/en/) |
| Conventional Commits Spezifikation | [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/) |
| Conventional Comments | [conventionalcomments.org](https://conventionalcomments.org) |
| Google Engineering Practices – Code Review | [github.com/google/eng-practices](https://github.com/google/eng-practices) |
| ESLint + Prettier Integration | [prettier.io/docs/en/integrating-with-linters](https://prettier.io/docs/en/integrating-with-linters.html) |

---

*Geschätzter Aufwand für dieses Selbststudium-Material: 60-90 Minuten (Lesen + Einrichten + Ausprobieren)*
*Tragt die Zeit im Kosten-Tagebuch unter "Dokumentation & Qualitätssicherung" ein.*

---
