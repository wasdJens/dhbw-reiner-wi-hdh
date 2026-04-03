# JavaScript Grundlagen — Interaktive Lernplattform

Selbststudium-orientierte Lernplattform für den DHBW-Kurs *Web Programmierung*. Alle Konzepte werden am durchgängigen Szenario **TechStore** (ein fiktiver E-Commerce-Shop) vermittelt.

Kein Build-Tool, kein Framework, keine Abhängigkeiten — reines HTML, CSS und JavaScript.

---

## Architektur

```
javascript/learn/
├── index.html              # Startseite — Kapitelübersicht + Fortschritt
├── chapter.html            # Kapitelseite — Hash-Router-Shell
│
├── styles/
│   ├── design-system.css   # Design-Tokens, Basiskomponenten (Buttons, Badges, Cards …)
│   ├── learn.css           # Layout: Landing, Sidebar, Sections, Demos, Tabellen
│   ├── code-playground.css # Styles für den Code-Editor-Widget
│   └── quiz.css            # Styles für Quiz-Blöcke
│
├── scripts/
│   ├── progress.js         # localStorage-Wrapper (Fortschritt & Quiz-Ergebnisse)
│   ├── app.js              # Hash-Router, Kapitel-Renderer-Controller, Sidebar
│   ├── renderer.js         # Section-Type → HTML (7 Typen)
│   ├── playground.js       # In-Browser Code-Editor mit Ausführung
│   ├── quiz.js             # Quiz-Logik, Auswertung, Fortschritt
│   ├── demos.js            # Alle 7 interaktiven TechStore-Demos
│   └── index.js            # Startseite: Kapitelgrid + Fortschrittsanzeige
│
└── content/
    ├── chapters.js         # Kapitel-Registry (Metadaten + Verweise auf Sektionen)
    ├── 01-variablen.js
    ├── 02-datentypen.js
    ├── 03-operatoren.js
    ├── 04-control-flow.js
    ├── 05-funktionen.js
    ├── 06-arrays.js
    └── 07-zusammenspiel.js
```

---

## Routing — Hash-basierte Navigation

Die gesamte Kursnavigation läuft über den URL-Hash in `chapter.html`:

```
chapter.html#variablen
chapter.html#datentypen
chapter.html#arrays-objekte
…
```

`app.js` lauscht auf das `hashchange`-Event und ruft bei jeder Änderung `navigateToCurrentHash()` auf. Diese Funktion sucht in `CHAPTERS` nach dem passenden Kapitel-Objekt, ruft `renderChapter()` auf und aktualisiert Sidebar, Topbar und Vor-/Zurück-Navigation. Es gibt keinen Server-Request — der gesamte Kontext liegt bereits im Browser.

---

## Content-Layer — JavaScript-Datendateien

Kapitelinhalte sind als plain-JS-Objekte definiert (keine JSON-Dateien, kein Fetch). Jede Kapitel-Datei exportiert eine globale Variable:

```js
// content/01-variablen.js
const chapter01 = {
  sections: [
    { type: "explanation", title: "Was ist eine Variable?", content: "…", keyPoints: […] },
    { type: "code-example", title: "Deklaration", code: "…" },
    { type: "playground", title: "Aufgabe", starterCode: "…", hint: "…" },
    { type: "quiz",   questions: […] },
    // …
  ]
};
```

`content/chapters.js` hält die globale `CHAPTERS`-Registry mit Metadaten (ID, Titel, Icon, Story-Intro). Die `sections` werden lazy über einen `get`-Accessor gelesen:

```js
{
  id: "variablen",
  get sections() {
    return typeof chapter01 !== "undefined" ? chapter01.sections : [];
  }
}
```

So kann `index.html` die Registry laden, ohne alle 7 Kapitel-Dateien zu laden.

---

## Section-Typen (renderer.js)

`Renderer.render(section, chapterId, index)` erzeugt für jeden Typen das passende HTML:

| Typ | Beschreibung |
|---|---|
| `explanation` | Fließtext + Key-Points-Liste + Business-Kontext-Box |
| `code-example` | Syntaxhervorgehobener Code-Block (kein Editor) |
| `playground` | Editierbarer Code-Editor mit Ausführung (Standard + Bonus) |
| `quiz` | Multiple-Choice-Block mit Auswertung |
| `demo` | Container für eine interaktive TechStore-Demo |
| `pitfall` | Warnhinweis-Box (häufige Fehler) |
| `comparison` | Vergleichstabelle (z.B. `==` vs. `===`) |

Die Syntax-Highlighting in `code-example` ist eine schlanke eigene Implementierung über Regex für Keywords, Strings, Zahlen, Kommentare und Operatoren — keine externe Bibliothek.

---

## Code-Playground (playground.js)

Der Playground rendert sich selbst in einen Container mit `data-starter-code`-Attribut. Codeausführung passiert über:

```js
const fn = new Function("console", userCode);
fn(mockConsole);
```

Ein Mock-`console`-Objekt fängt `log`, `warn`, `error` und `info` ab und schreibt farblich codierte Zeilen in das Output-Panel. So läuft Nutzer-Code isoliert ohne globale Seiteneffekte.

Weitere Features:
- **Zeilennummern** — werden per `<div>`-Overlay synchron zur Textarea gehalten
- **Tab-Taste** — fügt 2 Leerzeichen ein statt den Fokus zu verlieren
- **Reset** — stellt den ursprünglichen Starter-Code wieder her
- **Hinweis** — ein- / ausklappbares Hinweis-Panel pro Aufgabe

---

## Quiz (quiz.js)

Quiz-Blöcke werden als HTML von `renderer.js` erzeugt (Fragen als JSON im `data-questions`-Attribut). `Quiz.initAll()` übernimmt dann die Interaktion:

1. Beim Laden werden bereits gespeicherte Antworten aus `Progress` wiederhergestellt
2. Ein Klick auf eine Option markiert sie als *ausgewählt* und zeigt sofort richtig (grün) / falsch (rot) an — falsche Antworten zeigen zusätzlich die richtige Option
3. Nach Beantwortung aller Fragen erscheint ein Score-Banner
4. Ergebnisse werden über `Progress.saveQuizResult()` in `localStorage` persistiert

---

## Fortschritt (progress.js)

Alle Fortschrittsdaten liegen unter dem `localStorage`-Key `techstore-learn-progress`:

```json
{
  "completed": ["variablen", "datentypen"],
  "quizResults": {
    "variablen": { "0": true, "1": false, "2": true }
  }
}
```

Öffentliche API:

```js
Progress.isCompleted(chapterId)
Progress.markCompleted(chapterId)
Progress.getCompletedCount()
Progress.saveQuizResult(chapterId, questionIndex, correct)
Progress.getQuizResult(chapterId, questionIndex)
Progress.reset()
```

---

## Interaktive Demos (demos.js)

Jedes Kapitel hat eine interaktive Demo, die ein echtes TechStore-Funktionsmerkmal nachbaut. `Demos.init()` wird von `app.js` nach dem Rendern aufgerufen und sucht nach `[data-demo-id]`-Containern:

| Demo-ID | Kapitel | Was sie zeigt |
|---|---|---|
| `cart-calculator` | Variablen | Produktwahl + Mengenwähler + MwSt-Berechnung live |
| `product-validator` | Datentypen | `typeof`-Prüfung auf fehlerhaften Produktdaten |
| `discount-calculator` | Operatoren | Rabattstaffel-Slider + ternäre Operator-Kette |
| `order-tracker` | Kontrollstrukturen | Bestellstatus-Timeline via `switch` |
| `invoice-generator` | Funktionen | Live-Rechnungsvorschau aus Funktion |
| `catalog-manager` | Arrays & Objekte | Suche, Filter, Sortierung auf Produktliste |
| `techstore-dashboard` | Zusammenspiel | KPI-Karten + vollständige Bestelltabelle |

---

## Design System (design-system.css)

Eine eigenständige Kopie der ursprünglichen Kurs-Design-Tokens, angepasst für die Lernplattform. Alle Werte als CSS Custom Properties auf `:root`:

- **Primärfarbe**: Indigo `#4f46e5`
- **Bonus-Farbe**: Purple `#a855f7` (für Bonus-Challenge-Aufgaben)
- **Code-Hintergrund**: Dark Indigo `#1e1b4b`
- **Schriften**: `Inter` (UI) + `JetBrains Mono` (Code), beide via Google Fonts
- Utility-Klassen für Spacing, Typography, Flex-Layouts, Badges, Buttons und Cards

---

## Inhalte erweitern

**Neues Kapitel hinzufügen:**

1. `content/0X-thema.js` anlegen mit `const chapterXX = { sections: […] }`
2. In `content/chapters.js` einen Eintrag in `CHAPTERS` ergänzen (inkl. `get sections()`)
3. In `chapter.html` das neue Script-Tag vor `scripts/app.js` laden
4. Optional: in `scripts/demos.js` eine neue Demo-Funktion registrieren

**Bestehenden Inhalt ändern:**

Nur die jeweilige `content/0X-*.js`-Datei editieren — kein anderer Code muss angefasst werden.

**Neue Section-Typen:**

In `renderer.js` eine neue Render-Funktion schreiben und im `renderers`-Objekt registrieren.
