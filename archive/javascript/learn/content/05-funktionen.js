/**
 * 05-funktionen.js — Kapitel: Funktionen
 */

const chapter05 = {
  sections: [
    /* ── Erklärung: Warum Funktionen? ── */
    {
      type: "explanation",
      title: "Warum brauchen wir Funktionen?",
      content:
        "Stell dir vor, du berechnest im TechStore-System mehrmals die MwSt: " +
        "beim Warenkorb, auf der Rechnung, im Bestellbestätigungsmail. " +
        "Jedes Mal denselben Code schreiben ist fehleranfällig — " +
        "wenn sich der MwSt-Satz ändert, müsstest du alle Stellen finden und ändern.\n\n" +
        "**Funktionen lösen das:** Du schreibst die Logik einmal, gibst ihr einen Namen, " +
        "und rufst sie überall auf.",
      keyPoints: [
        "**DRY-Prinzip:** Don't Repeat Yourself — Code nur einmal schreiben",
        "Funktionen machen Code **lesbar**: `berechneEndpreis(preis, rabatt)` erklärt sich selbst",
        "Funktionen sind **testbar**: du kannst eine Funktion isoliert prüfen",
        "Funktionen sind die Bausteine jedes größeren Systems",
      ],
      businessContext:
        "Im TechStore gibt es `berechneEndpreis()`, `formatiereWaehrung()`, " +
        "`validiereProduktnamen()` — jede dieser Funktionen kann überall genutzt werden.",
    },

    /* ── Code-Beispiel: Funktionsdeklaration ── */
    {
      type: "code-example",
      title: "Funktionen deklarieren und aufrufen",
      code:
        "// Funktionsdeklaration\n" +
        "function berechneEndpreis(nettopreis, rabatt) {\n" +
        "  const MWST = 0.19;\n" +
        "  const preisNachRabatt = nettopreis * (1 - rabatt);\n" +
        "  const bruttopreis = preisNachRabatt * (1 + MWST);\n" +
        "  return bruttopreis;\n" +
        "}\n\n" +
        "// Funktion aufrufen\n" +
        "const endpreis1 = berechneEndpreis(999, 0);    // kein Rabatt\n" +
        "const endpreis2 = berechneEndpreis(999, 0.10); // 10% Rabatt\n\n" +
        "console.log(endpreis1.toFixed(2)); // 1188.81\n" +
        "console.log(endpreis2.toFixed(2)); // 1069.93",
      highlightLines: [2, 6, 10, 11],
      explanation:
        "Eine Funktion besteht aus: **Name** (`berechneEndpreis`), " +
        "**Parametern** (`nettopreis`, `rabatt`), " +
        "**Körper** (der Code in `{}`), und einem **Rückgabewert** (`return`). " +
        "Ohne `return` gibt eine Funktion `undefined` zurück.",
    },

    /* ── Erklärung: Parameter & Default Values ── */
    {
      type: "explanation",
      title: "Parameter, Argumente & Default-Werte",
      content:
        "**Parameter** sind die Platzhalter in der Funktionsdefinition. " +
        "**Argumente** sind die echten Werte die du beim Aufruf übergibst.",
      keyPoints: [
        "Nicht übergebene Parameter sind automatisch `undefined`",
        "**Default-Werte** werden gesetzt wenn kein Argument übergeben wird: `function f(x = 0)`",
        "Du kannst so viele Parameter übergeben wie du möchtest",
        "Primitive Typen (Zahlen, Strings) werden **kopiert** übergeben (pass-by-value)",
        "Objekte und Arrays werden **per Referenz** übergeben — Änderungen wirken sich auf das Original aus",
      ],
    },

    /* ── Code-Beispiel: Default Values + Pass by Value/Reference ── */
    {
      type: "code-example",
      title: "Default-Werte und der Unterschied bei Objekten",
      code:
        "// Default-Werte\n" +
        "function berechneMwSt(betrag, satz = 0.19) {\n" +
        "  return betrag * satz;\n" +
        "}\n" +
        "console.log(berechneMwSt(100));      // 19    — Standardsatz\n" +
        "console.log(berechneMwSt(100, 0.07)); // 7    — reduzierter Satz\n\n" +
        "// Pass-by-value: Primitive werden kopiert\n" +
        "function erhoehePreis(preis) {\n" +
        "  preis += 100; // nur die lokale Kopie wird geändert\n" +
        "}\n" +
        "let produktpreis = 499;\n" +
        "erhoehePreis(produktpreis);\n" +
        "console.log(produktpreis); // 499 — unverändert!\n\n" +
        "// Pass-by-reference: Objekte werden nicht kopiert\n" +
        "function aktiviereProdukt(produkt) {\n" +
        "  produkt.istAktiv = true; // Original wird geändert!\n" +
        "}\n" +
        "const laptop = { name: 'MacBook', istAktiv: false };\n" +
        "aktiviereProdukt(laptop);\n" +
        "console.log(laptop.istAktiv); // true — wurde verändert!",
      highlightLines: [2, 14, 17],
      explanation:
        "**Wichtig bei Objekten:** Wenn du ein Objekt an eine Funktion übergibst und " +
        "dessen Properties veränderst, wirkt sich das auf das Original aus. " +
        "Das kann gewollt sein — aber auch unerwartete Bugs erzeugen.",
    },

    /* ── Erklärung: Return ── */
    {
      type: "explanation",
      title: "Rückgabewerte & return",
      content:
        "Funktionen können einen Wert zurückgeben mit `return`. " +
        "Das ermöglicht es Funktionen als Bausteine in Ausdrücken zu nutzen.",
      keyPoints: [
        "Ohne `return` gibt jede Funktion `undefined` zurück",
        "`return` beendet die Funktion sofort — Code danach wird nicht ausgeführt",
        "Du kannst jeden Datentyp zurückgeben: Zahl, String, Boolean, Objekt, Array",
        "**Mehrere Returns** sind möglich — für frühe Rückgaben bei Fehlern",
      ],
    },

    /* ── Erklärung: Arrow Functions ── */
    {
      type: "explanation",
      title: "Arrow Functions — moderne, kompakte Syntax",
      content:
        "Arrow Functions `=>` sind eine kürzere Schreibweise für Funktionen, " +
        "die mit ES6 (2015) eingeführt wurde. " +
        "Du wirst sie überall im modernen JavaScript sehen.",
      keyPoints: [
        "Syntax: `const fn = (parameter) => { return wert; }`",
        "Bei einem einzelnen Ausdruck kann `return` und `{}` weggelassen werden: `const fn = x => x * 2`",
        "Bei einem Parameter können auch die Klammern weggelassen werden",
        "Arrow Functions sind ideal als **Callback-Funktionen** (kommen gleich)",
        "Wichtige Einschränkung: haben kein eigenes `this` — dazu mehr im OOP-Kapitel",
      ],
    },

    /* ── Code-Beispiel: Arrow Functions ── */
    {
      type: "code-example",
      title: "Arrow Functions — Schreibweisen",
      code:
        "// Traditionelle Funktion\n" +
        "function berechneRabatt(preis, rabatt) {\n" +
        "  return preis * rabatt;\n" +
        "}\n\n" +
        "// Arrow Function — Langform\n" +
        "const berechneRabattArrow = (preis, rabatt) => {\n" +
        "  return preis * rabatt;\n" +
        "};\n\n" +
        "// Arrow Function — Kurzform (ein Ausdruck)\n" +
        "const berechneRabattKurz = (preis, rabatt) => preis * rabatt;\n\n" +
        "// Alle drei machen dasselbe\n" +
        "console.log(berechneRabatt(999, 0.10));      // 99.9\n" +
        "console.log(berechneRabattArrow(999, 0.10)); // 99.9\n" +
        "console.log(berechneRabattKurz(999, 0.10));  // 99.9\n\n" +
        "// Typischer Einsatz: als Argument an andere Funktionen\n" +
        "const preise = [999, 149, 299, 1299];\n" +
        "const mitMwSt = preise.map(preis => preis * 1.19);\n" +
        "console.log(mitMwSt); // [1188.81, 177.31, 355.81, 1545.81]",
      highlightLines: [7, 12, 19],
      explanation:
        "In der letzten Zeile siehst du Arrow Functions in ihrem häufigsten Einsatz: " +
        "als Argument an `map()`. `preis => preis * 1.19` ist eine anonyme Arrow Function " +
        "die für jedes Element aufgerufen wird.",
    },

    /* ── Erklärung: Callbacks ── */
    {
      type: "explanation",
      title: "Funktionen als Parameter — Callbacks",
      content:
        "In JavaScript können Funktionen als Argumente an andere Funktionen übergeben werden. " +
        "Das ist eines der mächtigsten Features der Sprache.\n\n" +
        "Eine Funktion die als Argument übergeben wird nennt man **Callback-Funktion**. " +
        "Die empfangende Funktion 'ruft zurück' ('calls back') wenn sie bereit ist.",
      keyPoints: [
        "Funktionen sind in JavaScript **First-Class Citizens** — sie können wie Werte behandelt werden",
        "Callbacks ermöglichen **flexible, wiederverwendbare** Funktionen",
        "Du wirst Callbacks überall sehen: bei Array-Methoden, Events, async/await",
        "Das Konzept bildet die Basis für funktionale Programmierung",
      ],
      businessContext:
        "Im TechStore: `produkte.filter(p => p.preis < 500)` — " +
        "die Filterbedingung ist eine Callback-Funktion. " +
        "Du entscheidest welches Kriterium angewendet wird.",
    },

    /* ── Code-Beispiel: Callbacks ── */
    {
      type: "code-example",
      title: "Callback-Funktionen im TechStore",
      code:
        "// Eine Funktion die eine andere als Parameter nimmt\n" +
        "function verarbeiteBestellung(bestellung, benachrichtigungsFn) {\n" +
        "  // ... Bestellung verarbeiten ...\n" +
        "  const msg = `Bestellung ${bestellung.id} verarbeitet`;\n" +
        "  benachrichtigungsFn(msg); // Callback aufrufen\n" +
        "}\n\n" +
        "// Verschiedene Callbacks für verschiedene Kanäle\n" +
        "const perEmail = (msg) => console.log(`📧 E-Mail: ${msg}`);\n" +
        "const perSMS   = (msg) => console.log(`📱 SMS: ${msg}`);\n" +
        "const perLog   = (msg) => console.log(`📋 Log: ${msg}`);\n\n" +
        "const bestellung = { id: 'TS-001', kunde: 'Anna Müller' };\n\n" +
        "verarbeiteBestellung(bestellung, perEmail);\n" +
        "verarbeiteBestellung(bestellung, perSMS);\n" +
        "verarbeiteBestellung(bestellung, perLog);",
      highlightLines: [2, 5, 14, 15, 16],
      explanation:
        "Durch Callbacks ist `verarbeiteBestellung` **unabhängig** vom Benachrichtigungskanal. " +
        "Das macht die Funktion flexibel und testbar. " +
        "Du kannst neue Kanäle hinzufügen ohne die Hauptfunktion zu ändern.",
    },

    /* ── Pitfall ── */
    {
      type: "pitfall",
      title: "Häufiger Fehler: Funktion ohne return",
      mistakes: [
        {
          bad: "function berechneEndpreis(netto, rabatt) {\n  const preis = netto * (1 - rabatt) * 1.19;\n  console.log(preis); // Ausgabe, aber kein return!\n}\n\nconst endpreis = berechneEndpreis(999, 0.10);\nconsole.log(endpreis); // undefined ← Bug!",
          good: "function berechneEndpreis(netto, rabatt) {\n  const preis = netto * (1 - rabatt) * 1.19;\n  return preis; // Wert zurückgeben!\n}\n\nconst endpreis = berechneEndpreis(999, 0.10);\nconsole.log(endpreis); // 1069.93 ✓",
          why:
            "Ohne `return` liefert die Funktion immer `undefined`. " +
            "`console.log()` innerhalb einer Funktion zeigt den Wert an — " +
            "gibt ihn aber nicht zurück. " +
            "Diese Verwechslung ist ein sehr häufiger Anfängerfehler.",
        },
      ],
    },

    /* ── Live Demo ── */
    {
      type: "demo",
      title: "Live: Rechnungs-Generator",
      demoId: "invoice-generator",
      description:
        "Jede Berechnung ist eine eigene Funktion: `berechneNetto()`, " +
        "`berechneBrutto()`, `formatierePreis()`. " +
        "Sieh wie sie zusammenspielen.",
    },

    /* ── Playground: Standard ── */
    {
      type: "playground",
      title: "Aufgabe: Preisberechnungs-Funktionen",
      difficulty: "standard",
      starterCode:
        "// Aufgabe: Erstelle Funktionen für die TechStore-Preisberechnung\n\n" +
        "// 1. Schreibe eine Funktion berechneNetto(brutto)\n" +
        "//    Formel: netto = brutto / 1.19\n\n" +
        "// 2. Schreibe eine Funktion berechneMwSt(netto)\n" +
        "//    Formel: mwst = netto * 0.19\n\n" +
        "// 3. Schreibe eine Funktion berechneBrutto(netto, rabatt = 0)\n" +
        "//    Formel: brutto = netto * (1 - rabatt) * 1.19\n\n" +
        "// 4. Teste die Funktionen:\n" +
        "//    - Was ist der Nettopreis von 1188.81 €?\n" +
        "//    - Was ist der Bruttopreis von 999 € mit 10% Rabatt?\n\n" +
        "// 5. Gib beide Ergebnisse aus\n",
      hint:
        "Für den Default-Wert: `function berechneBrutto(netto, rabatt = 0)`. " +
        "Ohne Rabatt-Argument wird 0 verwendet.",
    },

    /* ── Playground: Bonus ── */
    {
      type: "playground",
      title: "Bonus-Challenge: Formatierungsfunktion als Callback",
      difficulty: "bonus",
      starterCode:
        "// Bonus: Formatierungsfunktionen als Callbacks\n\n" +
        "// Gegeben: eine generische Ausgabe-Funktion\n" +
        "function gebeAus(wert, formatierer) {\n" +
        "  console.log(formatierer(wert));\n" +
        "}\n\n" +
        "// Aufgabe: Schreibe drei Formatierungsfunktionen:\n\n" +
        "// 1. alsEuro(betrag) → '999,00 €'\n" +
        "//    Tipp: betrag.toFixed(2) gibt '999.00' zurück\n\n" +
        "// 2. alsProzent(zahl) → '10 %'  (z.B. für 0.10)\n" +
        "//    Tipp: Math.round(zahl * 100)\n\n" +
        "// 3. alsLabel(text) → '[TECHSTORE] text in Großbuchstaben'\n" +
        "//    Tipp: text.toUpperCase()\n\n" +
        "// Teste alle drei mit gebeAus():\n" +
        "// gebeAus(1188.81, alsEuro);\n" +
        "// gebeAus(0.15, alsProzent);\n" +
        "// gebeAus('neues produkt', alsLabel);\n",
      hint:
        "Arrow Functions sind hier ideal: `const alsEuro = betrag => betrag.toFixed(2) + ' €';` " +
        "Für das Komma statt Punkt: `.replace('.', ',')` auf den String anwenden.",
    },

    /* ── Quiz ── */
    {
      type: "quiz",
      questions: [
        {
          question:
            "Was gibt diese Funktion zurück?\n" +
            "`function grüße(name) { console.log('Hallo ' + name); }`",
          options: [
            "Den String `'Hallo ' + name`",
            "`true`",
            "`undefined`",
            "Einen Fehler",
          ],
          correct: 2,
          explanation:
            "Ohne explizites `return` gibt jede Funktion `undefined` zurück. " +
            "`console.log()` innerhalb der Funktion gibt den Text aus — " +
            "aber das ist nicht dasselbe wie der Rückgabewert der Funktion.",
        },
        {
          question:
            "Du rufst `berechneEndpreis(999)` auf, aber die Funktion erwartet zwei Parameter `(preis, rabatt)`. " +
            "Was ist `rabatt` innerhalb der Funktion?",
          options: [
            "0",
            "Ein TypeError wird geworfen",
            "`undefined`",
            "`null`",
          ],
          correct: 2,
          explanation:
            "Nicht übergebene Parameter sind automatisch `undefined`. " +
            "Um das zu verhindern nutzt man Default-Werte: `function berechneEndpreis(preis, rabatt = 0)`. " +
            "Dann ist `rabatt` automatisch 0 wenn kein Argument übergeben wird.",
        },
        {
          question:
            "Was ist der Hauptvorteil von Arrow Functions gegenüber regulären Funktionen?",
          options: [
            "Sie sind schneller",
            "Kürzere Syntax — besonders nützlich als Callback-Argumente",
            "Sie können als Konstruktoren genutzt werden",
            "Sie haben ein eigenes `this`",
          ],
          correct: 1,
          explanation:
            "Arrow Functions haben eine kompaktere Syntax die besonders bei Callbacks nützlich ist. " +
            "Statt `produkte.map(function(p) { return p.preis; })` schreibst du `produkte.map(p => p.preis)`. " +
            "Wichtig: Arrow Functions können **nicht** als Konstruktoren eingesetzt werden und haben kein eigenes `this`.",
        },
      ],
    },
  ],
};
