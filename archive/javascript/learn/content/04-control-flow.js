/**
 * 04-control-flow.js — Kapitel: Kontrollstrukturen
 */

const chapter04 = {
  sections: [
    /* ── Erklärung: if/else ── */
    {
      type: "explanation",
      title: "if / else — Entscheidungen treffen",
      content:
        "Mit `if` kann dein Programm auf der Grundlage einer Bedingung " +
        "unterschiedliche Wege einschlagen. " +
        "Das ist das fundamentale Werkzeug um auf verschiedene Situationen zu reagieren.",
      keyPoints: [
        "`if (bedingung)` führt den Block aus wenn die Bedingung `true` ist",
        "`else` wird ausgeführt wenn die Bedingung `false` ist",
        "`else if (anderesBedingung)` prüft weitere Bedingungen",
        "Die Bedingung wird immer in einen **Boolean** umgewandelt",
      ],
      businessContext:
        "Im TechStore: Wenn der Lagerbestand < 10 ist, zeige eine Warnmeldung. " +
        "Wenn der Kunde ein Premium-Mitglied ist, gib Rabatt. " +
        "Sonst: normale Berechnung.",
    },

    /* ── Erklärung: Truthy / Falsy ── */
    {
      type: "explanation",
      title: "Truthy & Falsy — was gilt als false?",
      content:
        "JavaScript konvertiert automatisch Werte zu `true` oder `false` wenn sie in " +
        "einer Bedingung stehen. Das nennt man **truthy** und **falsy**.\n\n" +
        "Diese Werte gelten als **falsy** — sie verhalten sich wie `false`:",
      keyPoints: [
        "`false` — logisch",
        "`0` — die Zahl Null",
        "`''` oder `\"\"` — leerer String",
        "`null` — kein Wert",
        "`undefined` — nicht initialisiert",
        "`NaN` — 'Not a Number' (z.B. Ergebnis von `0/0`)",
        "**Alles andere** gilt als **truthy** — auch `0.0001`, `'false'`, `[]`, `{}`",
      ],
    },

    /* ── Code-Beispiel: if/else ── */
    {
      type: "code-example",
      title: "if/else im TechStore",
      code:
        "const lagerbestand = 3;\n" +
        "const minBestand = 10;\n" +
        "const bestellmenge = 2;\n\n" +
        "// Verfügbarkeit prüfen\n" +
        "if (bestellmenge > lagerbestand) {\n" +
        "  console.log('Nicht genug Lagerbestand!');\n" +
        "} else if (lagerbestand < minBestand) {\n" +
        "  console.log('Bestellung möglich — Warnung: Lagerbestand niedrig');\n" +
        "} else {\n" +
        "  console.log('Bestellung kann ausgeführt werden');\n" +
        "}\n\n" +
        "// Truthy/Falsy in Aktion\n" +
        "const gutscheinCode = null; // Kunde hat keinen Gutschein\n\n" +
        "if (gutscheinCode) {\n" +
        "  console.log('Gutschein anwenden: ' + gutscheinCode);\n" +
        "} else {\n" +
        "  console.log('Kein Gutschein');\n" +
        "}",
      highlightLines: [6, 8, 10, 16],
      explanation:
        "Die zweite `if`-Prüfung mit `gutscheinCode` macht sich Falsy-Werte zunutze: " +
        "`null` ist falsy, also wird der `else`-Block ausgeführt. " +
        "Das ist kürzer als `if (gutscheinCode !== null && gutscheinCode !== undefined)`.",
    },

    /* ── Erklärung: switch ── */
    {
      type: "explanation",
      title: "switch — für viele Fälle übersichtlicher",
      content:
        "Wenn eine Variable einen von vielen fest definierten Werten annehmen kann, " +
        "ist `switch` übersichtlicher als viele `else if` Blöcke.",
      keyPoints: [
        "`switch (ausdruck)` vergleicht den Ausdruck mit `case`-Werten",
        "Jeder `case` endet mit `break` — sonst 'fällt er durch' zum nächsten",
        "`default` ist optional und wird ausgeführt wenn kein `case` zutrifft",
        "`switch` nutzt **strikte Gleichheit** (`===`) — keine Typ-Konvertierung",
      ],
    },

    /* ── Code-Beispiel: switch ── */
    {
      type: "code-example",
      title: "switch für Bestellstatus",
      code:
        "const bestellStatus = 'versendet';\n" +
        "let naechsteAktion;\n" +
        "let statusFarbe;\n\n" +
        "switch (bestellStatus) {\n" +
        "  case 'eingegangen':\n" +
        "    naechsteAktion = 'Zahlung abwarten';\n" +
        "    statusFarbe = 'grau';\n" +
        "    break;\n" +
        "  case 'bezahlt':\n" +
        "    naechsteAktion = 'Ware verpacken';\n" +
        "    statusFarbe = 'blau';\n" +
        "    break;\n" +
        "  case 'versendet':\n" +
        "    naechsteAktion = 'Lieferung verfolgen';\n" +
        "    statusFarbe = 'orange';\n" +
        "    break;\n" +
        "  case 'zugestellt':\n" +
        "    naechsteAktion = 'Abgeschlossen';\n" +
        "    statusFarbe = 'grün';\n" +
        "    break;\n" +
        "  default:\n" +
        "    naechsteAktion = 'Unbekannter Status';\n" +
        "    statusFarbe = 'rot';\n" +
        "}\n\n" +
        "console.log(`Status: ${bestellStatus} | Aktion: ${naechsteAktion}`);",
      explanation:
        "Ohne `break` würde JavaScript alle folgenden `case`-Blöcke ausführen " +
        "(sog. 'Fall-through'). Das ist manchmal gewollt, in den meisten Fällen aber ein Bug.",
    },

    /* ── Pitfall: switch ohne break ── */
    {
      type: "pitfall",
      title: "Häufiger Fehler: break vergessen in switch",
      mistakes: [
        {
          bad: "const status = 'bezahlt';\n\nswitch (status) {\n  case 'bezahlt':\n    console.log('Status: Bezahlt');\n    // break vergessen!\n  case 'versendet':\n    console.log('Status: Versendet'); // wird AUCH ausgegeben!\n    break;\n}",
          good: "const status = 'bezahlt';\n\nswitch (status) {\n  case 'bezahlt':\n    console.log('Status: Bezahlt');\n    break; // verhindert Fall-through\n  case 'versendet':\n    console.log('Status: Versendet');\n    break;\n}",
          why:
            "Ohne `break` 'fällt' JavaScript zum nächsten `case` durch ('fall-through'). " +
            "Das ist ein häufiger Fehler der schwer zu debuggen ist.",
        },
      ],
    },

    /* ── Erklärung: Loops ── */
    {
      type: "explanation",
      title: "Schleifen — Code wiederholen",
      content:
        "Schleifen wiederholen einen Code-Block solange eine Bedingung erfüllt ist " +
        "oder über eine Menge von Elementen iteriert werden soll.",
      keyPoints: [
        "`for` — wenn du die **Anzahl der Iterationen** kennst oder einen Zählindex brauchst",
        "`while` — wenn du **nicht weißt wie oft**, aber eine Abbruchbedingung kennst",
        "`do...while` — wie `while`, aber der Block wird **mindestens einmal** ausgeführt",
        "`break` — bricht die Schleife sofort ab",
        "`continue` — überspringt die aktuelle Iteration und geht zur nächsten",
      ],
      businessContext:
        "Im TechStore: `for` um alle Produkte im Warenkorb zu verarbeiten. " +
        "`while` um auf eine Zahlung zu warten solange sie noch aussteht.",
    },

    /* ── Comparison Table: Loops ── */
    {
      type: "comparison",
      title: "Welche Schleife — wann?",
      headers: ["Schleife", "Wann nutzen?", "Beispiel"],
      rows: [
        [
          "`for`",
          "Bekannte Anzahl / Index benötigt",
          "`for (let i = 0; i < 10; i++)`",
        ],
        [
          "`while`",
          "Unbekannte Anzahl / Bedingung",
          "`while (ausstehend > 0)`",
        ],
        [
          "`do...while`",
          "Mindestens einmal ausführen",
          "`do { ... } while (retry)`",
        ],
        [
          "`for...of`",
          "Über Array-Elemente iterieren",
          "`for (const p of produkte)`",
        ],
        [
          "`forEach`",
          "Array-Methode, modernes Pattern",
          "`produkte.forEach(p => ...)`",
        ],
      ],
    },

    /* ── Code-Beispiel: Schleifen ── */
    {
      type: "code-example",
      title: "Schleifen im TechStore",
      code:
        "const warenkorb = ['Laptop', 'Maus', 'Tastatur', 'Monitor'];\n\n" +
        "// for-Schleife mit Index\n" +
        "console.log('--- Warenkorb ---');\n" +
        "for (let i = 0; i < warenkorb.length; i++) {\n" +
        "  console.log(`${i + 1}. ${warenkorb[i]}`);\n" +
        "}\n\n" +
        "// while-Schleife: Bestand reduzieren\n" +
        "let bestand = 5;\n" +
        "let bestellungen = 0;\n\n" +
        "while (bestand > 0) {\n" +
        "  bestand--;\n" +
        "  bestellungen++;\n" +
        "}\n" +
        "console.log(`${bestellungen} Bestellungen ausgeführt`);\n\n" +
        "// continue: bestimmte Elemente überspringen\n" +
        "for (let i = 0; i < warenkorb.length; i++) {\n" +
        "  if (warenkorb[i] === 'Maus') continue; // überspringen\n" +
        "  console.log('Verarbeite: ' + warenkorb[i]);\n" +
        "}",
      explanation:
        "**Achtung bei `while`:** Stelle immer sicher dass die Bedingung irgendwann `false` wird, " +
        "sonst entsteht eine Endlosschleife die den Browser einfriert.",
    },

    /* ── Live Demo ── */
    {
      type: "demo",
      title: "Live: Bestellstatus-Tracker",
      demoId: "order-tracker",
      description:
        "Verfolge eine Bestellung durch alle Status-Phasen. " +
        "switch steuert die Statusänderungen, Schleifen verarbeiten die Bestellpositionen.",
    },

    /* ── Playground: Standard ── */
    {
      type: "playground",
      title: "Aufgabe: Bestellstatus-Ausgabe",
      difficulty: "standard",
      starterCode:
        "// Aufgabe: Schreibe ein switch-Statement für den TechStore Bestellstatus\n\n" +
        "const status = 'verpackt'; // ändere diesen Wert zum Testen\n\n" +
        "// 1. Nutze switch um je nach status eine passende Nachricht auszugeben:\n" +
        "//    - eingegangen → 'Bestellung erhalten, warte auf Zahlung'\n" +
        "//    - bezahlt     → 'Zahlung bestätigt, wird vorbereitet'\n" +
        "//    - verpackt    → 'Paket wird gepackt'\n" +
        "//    - versendet   → 'Paket unterwegs'\n" +
        "//    - zugestellt  → 'Erfolgreich zugestellt!'\n" +
        "//    - default     → 'Unbekannter Status'\n\n" +
        "// 2. Gib außerdem aus: Wurde die Bestellung bereits bezahlt?\n" +
        "//    (true wenn status === 'bezahlt', 'verpackt', 'versendet', oder 'zugestellt')\n",
      hint:
        "Für Aufgabe 2 kannst du `||` nutzen: " +
        "`const istBezahlt = status === 'bezahlt' || status === 'verpackt' || ...`",
    },

    /* ── Playground: Bonus ── */
    {
      type: "playground",
      title: "Bonus-Challenge: Lagerverwaltung",
      difficulty: "bonus",
      starterCode:
        "// Bonus: Lagerverwaltung mit Schleifen\n\n" +
        "// Simulation: Bestands-Array (Index = Produkt-ID, Wert = Lagerbestand)\n" +
        "const lagerbestand = [12, 0, 5, 8, 0, 3, 15, 0, 2];\n" +
        "const MINDESTBESTAND = 3;\n\n" +
        "// Aufgabe 1: Zähle wie viele Produkte ausverkauft sind (Bestand === 0)\n\n" +
        "// Aufgabe 2: Zähle wie viele Produkte unter dem Mindestbestand sind\n\n" +
        "// Aufgabe 3: Finde die Produkt-IDs die nachbestellt werden müssen\n" +
        "//            (Bestand < MINDESTBESTAND, aber nicht ausverkauft)\n\n" +
        "// Aufgabe 4: Berechne den Gesamt-Lagerbestand\n\n" +
        "// Tipp: Nutze eine for-Schleife mit Index oder probiere Array.forEach()\n",
      hint:
        "Für Aufgabe 1: `let ausverkauft = 0; for (let bestand of lagerbestand) { if (bestand === 0) ausverkauft++; }` " +
        "Für Aufgabe 3: Erstelle ein leeres Array `[]` und verwende `push()` (kommt in Kapitel 6).",
    },

    /* ── Quiz ── */
    {
      type: "quiz",
      questions: [
        {
          question: "Was passiert wenn du `break` in einem `switch` vergisst?",
          options: [
            "Ein SyntaxError wird geworfen",
            "JavaScript führt nur den passenden `case` aus",
            "JavaScript führt den passenden `case` + alle folgenden aus ('fall-through')",
            "Der `default` Block wird ausgeführt",
          ],
          correct: 2,
          explanation:
            "Ohne `break` 'fällt' JavaScript nach einem `case` in den nächsten. " +
            "Das ist das sogenannte 'fall-through' Verhalten und meist ein Bug.",
        },
        {
          question: "Welche dieser Werte ist **truthy**?",
          options: [
            "`0`",
            "`''` (leerer String)",
            "`'0'` (String mit '0')",
            "`null`",
          ],
          correct: 2,
          explanation:
            "`'0'` (ein String der die Ziffer 0 enthält) ist **truthy** — " +
            "weil es ein nicht-leerer String ist. " +
            "Nur der leere String `''` ist falsy. " +
            "`0` (Zahl), `''`, `null`, `undefined` sind alle falsy.",
        },
        {
          question:
            "Du hast eine `for`-Schleife von 0 bis 100 und möchtest bei 50 aufhören. Welches Keyword?",
          options: ["`return`", "`stop`", "`continue`", "`break`"],
          correct: 3,
          explanation:
            "`break` beendet die Schleife sofort. " +
            "`continue` überspringt nur die aktuelle Iteration und macht weiter. " +
            "`return` verlässt die gesamte Funktion.",
        },
      ],
    },
  ],
};
