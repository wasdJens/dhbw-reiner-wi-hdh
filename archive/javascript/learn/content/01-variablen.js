/**
 * 01-variablen.js — Kapitel: Variablen & Konstanten
 */

const chapter01 = {
  sections: [
    /* ── Erklärung: Was ist eine Variable? ── */
    {
      type: "explanation",
      title: "Was ist eine Variable?",
      content:
        "Eine Variable ist ein **benannter Speicherplatz** im Arbeitsspeicher. " +
        "Du vergibst ihr einen Namen und kannst darin beliebige Werte ablegen — " +
        "und später wieder abrufen oder verändern.\n\n" +
        "Denk an eine beschriftete Box in einem Lager: der Name ist das Etikett, " +
        "der Inhalt ist der Wert.",
      keyPoints: [
        "Mit `let` deklarierst du eine Variable, die ihren Wert ändern kann",
        "Mit `const` deklarierst du eine Konstante — der Wert bleibt fest",
        "`var` existiert noch aus historischen Gründen — verwende es **nicht** mehr",
        "Eine Variable **kann** einen Wert haben, **muss** aber nicht (dann ist sie `undefined`)",
      ],
      businessContext:
        "Im TechStore speichern wir den MwSt-Satz als `const MWST = 0.19` — " +
        "er ändert sich nie. Den aktuellen Warenkorb-Betrag speichern wir als `let total` — " +
        "er ändert sich mit jedem Artikel.",
    },

    /* ── Code-Beispiel: Deklaration ── */
    {
      type: "code-example",
      title: "Variablen deklarieren",
      code:
        "// const für Werte die sich NICHT ändern\n" +
        "const MWST = 0.19;\n" +
        "const SHOP_NAME = 'TechStore';\n\n" +
        "// let für Werte die sich ändern\n" +
        "let preis = 999;\n" +
        "let menge = 1;\n\n" +
        "// Berechnung mit Variablen\n" +
        "let endpreis = preis * menge * (1 + MWST);\n" +
        "console.log(endpreis); // 1188.81",
      highlightLines: [2, 3, 6, 7, 10],
      explanation:
        "**Faustregel:** Nutze immer `const` als Standard. " +
        "Wechsle zu `let` wenn du den Wert später neu zuweisen musst. " +
        "Das erzwingt bewusstes Nachdenken über veränderliche Zustände.",
    },

    /* ── Erklärung: Naming Rules ── */
    {
      type: "explanation",
      title: "Variablen benennen",
      content:
        "Variablennamen in JavaScript haben einige Regeln und Konventionen:\n\n" +
        "**Regeln (Pflicht):**\n" +
        "Darf nicht mit einer Zahl beginnen. Keine Leerzeichen. " +
        "Keine reservierten Keywords wie `function`, `let`, `class`.\n\n" +
        "**Konventionen (Empfehlung):**\n" +
        "Verwende **camelCase** für Variablen (`produktName`, `totalBetrag`). " +
        "Verwende **UPPER_SNAKE_CASE** für Konstanten (`MAX_BESTELLMENGE`, `MWST`).",
      keyPoints: [
        "✓ `produktPreis`, `kundenName`, `MWST` — gültig",
        "✗ `1preis`, `produkt name`, `let` — ungültig",
        "Variablen sind **case-sensitive**: `preis` ≠ `Preis` ≠ `PREIS`",
        "Gute Namen machen Code lesbar ohne Kommentare",
      ],
    },

    /* ── Pitfall: var vs let/const ── */
    {
      type: "pitfall",
      title: "Häufiger Fehler: var vs. let/const",
      mistakes: [
        {
          bad: "var rabatt = 0.10;\nvar rabatt = 0.15; // kein Fehler!\nconsole.log(rabatt); // 0.15",
          good: "let rabatt = 0.10;\nrabatt = 0.15; // Wert ändern ist ok\nconsole.log(rabatt); // 0.15",
          why:
            "`var` erlaubt versehentliche Neu-Deklaration ohne Fehler. " +
            "Das kann zu schwer findbaren Bugs führen. " +
            "`let` wirft einen Fehler wenn du dieselbe Variable zweimal deklarierst.",
        },
        {
          bad: "const endpreis = 0;\nendpreis = 999 * 1.19; // TypeError!",
          good: "let endpreis = 0;\nendpreis = 999 * 1.19; // funktioniert",
          why:
            "`const` bedeutet: die **Bindung** des Namens an den Wert ist konstant. " +
            "Du kannst den Wert nicht neu zuweisen. " +
            "Nutze `let` wenn du eine Variable initial leer lassen und später befüllen willst.",
        },
      ],
    },

    /* ── Live Demo ── */
    {
      type: "demo",
      title: "Live: TechStore Warenkorbrechner",
      demoId: "cart-calculator",
      description:
        "Sieh wie `const` und `let` in einer echten Kalkulation zusammenwirken. " +
        "Der MwSt-Satz ist fest (`const`), Preis und Menge sind veränderlich (`let`).",
    },

    /* ── Playground: Standard ── */
    {
      type: "playground",
      title: "Aufgabe: Produktkalkulation",
      difficulty: "standard",
      description:
        "Erstelle Variablen für ein TechStore-Produkt und berechne den Bruttopreis.",
      starterCode:
        "// Aufgabe: Erstelle Variablen für ein Produkt und berechne den Bruttopreis\n\n" +
        "// 1. Deklariere MWST als Konstante (19% = 0.19)\n\n" +
        "// 2. Deklariere den Nettopreis eines Produkts deiner Wahl\n\n" +
        "// 3. Berechne den Bruttopreis (Netto * (1 + MWST))\n\n" +
        "// 4. Gib den Bruttopreis mit console.log() aus\n",
      hint:
        "Nutze `const` für MWST, da sie sich nie ändert. " +
        "Nutze `let` für den Nettopreis. " +
        "Die Formel: `bruttopreis = nettopreis * (1 + MWST)`",
    },

    /* ── Playground: Bonus ── */
    {
      type: "playground",
      title: "Bonus-Challenge: Mengenrabatt",
      difficulty: "bonus",
      description:
        "Berechne den Endpreis für eine Bestellung mit Mengenrabatt.",
      starterCode:
        "// Bonus-Challenge: Mengenrabatt-Kalkulation\n\n" +
        "// Produktdaten (verändere diese nach Belieben)\n" +
        "const produktName = 'MacBook Pro';\n" +
        "const einzelpreis = 999;\n" +
        "const menge = 3;\n" +
        "const MWST = 0.19;\n\n" +
        "// Aufgabe:\n" +
        "// 1. Berechne den Netto-Gesamtpreis (einzelpreis * menge)\n\n" +
        "// 2. Wenn die Menge >= 3 ist, gilt 10% Mengenrabatt — berechne den Rabattbetrag\n\n" +
        "// 3. Berechne den Bruttopreis nach Rabatt\n\n" +
        "// 4. Gib eine Zusammenfassung aus:\n" +
        "//    z.B. 'MacBook Pro x3: 2697€ → nach Rabatt: 2427€ → brutto: 2888.13€'\n",
      hint:
        "Du brauchst mehrere `let`-Variablen. " +
        "Für den Rabatt: `let rabatt = menge >= 3 ? netto * 0.10 : 0;` " +
        "Nutze Template Literals für die Ausgabe: `` `${produktName} x${menge}...` ``",
    },

    /* ── Quiz ── */
    {
      type: "quiz",
      questions: [
        {
          question:
            "Was passiert wenn du folgenden Code ausführst?\n`const preis = 499;\npreis = 599;`",
          options: [
            "preis wird auf 599 gesetzt",
            "Ein `TypeError: Assignment to constant variable` Fehler",
            "preis bleibt 499 ohne Fehlermeldung",
            "preis wird `undefined`",
          ],
          correct: 1,
          explanation:
            "`const` verhindert die Neu-Zuweisung eines Wertes. " +
            "JavaScript wirft einen TypeError. " +
            "Das ist beabsichtigt — es schützt vor versehentlichen Änderungen.",
        },
        {
          question:
            "Du baust einen Bestellzähler der bei jedem Kauf um 1 steigt. " +
            "Welches Keyword nutzt du?",
          options: ["`const`", "`let`", "`var`", "Kein Keyword nötig"],
          correct: 1,
          explanation:
            "`let` — weil sich der Zähler verändert. " +
            "`const` würde einen Fehler werfen wenn du `zähler++` schreibst. " +
            "`var` sollte nicht mehr verwendet werden.",
        },
        {
          question:
            "Was ist der Unterschied zwischen einer **Deklaration** und einer **Initialisierung**?",
          options: [
            "Kein Unterschied — beide bedeuten dasselbe",
            "Deklaration = Variable benennen; Initialisierung = Wert zuweisen",
            "Deklaration = mit `let`; Initialisierung = mit `const`",
            "Deklaration = globale Variable; Initialisierung = lokale Variable",
          ],
          correct: 1,
          explanation:
            "`let bestellmenge;` ist eine Deklaration — die Variable existiert, hat aber noch keinen Wert (`undefined`). " +
            "`bestellmenge = 5;` ist die Initialisierung. " +
            "Beides in einem: `let bestellmenge = 5;`",
        },
      ],
    },
  ],
};
