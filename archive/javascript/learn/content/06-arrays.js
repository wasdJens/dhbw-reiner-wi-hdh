/**
 * 06-arrays.js — Kapitel: Arrays & Objekte
 */

const chapter06 = {
  sections: [
    /* ── Erklärung: Objekte ── */
    {
      type: "explanation",
      title: "Objekte — strukturierte Daten",
      content:
        "Ein Produkt im TechStore hat viele Eigenschaften: " +
        "einen Namen, einen Preis, eine Kategorie, einen Lagerstand. " +
        "All diese Daten in separaten Variablen zu speichern ist unhandlich. " +
        "Ein **Objekt** fasst zusammengehörige Daten in einer Einheit zusammen.",
      keyPoints: [
        "Objekte gruppieren Eigenschaften (**Properties**) als Schlüssel-Wert-Paare",
        "Zugriff mit **Dot-Notation**: `produkt.preis`",
        "Zugriff mit **Bracket-Notation**: `produkt['preis']` — nötig für dynamische Keys",
        "Neue Properties hinzufügen: `produkt.kategorie = 'Laptop'`",
        "Properties entfernen: `delete produkt.altesfeld`",
        "Objekte können andere Objekte als Properties enthalten (**nesting**)",
      ],
      businessContext:
        "Im TechStore modelliert ein Objekt ein Produkt, einen Kunden oder eine Bestellung. " +
        "Alle zugehörigen Daten sind zusammen — kein Durchsuchen von vielen Variablen mehr.",
    },

    /* ── Code-Beispiel: Objekte ── */
    {
      type: "code-example",
      title: "Produkt-Objekte im TechStore",
      code:
        "// Objekt mit Object-Literal Syntax\n" +
        "const laptop = {\n" +
        "  name: 'MacBook Pro',\n" +
        "  preis: 1299,\n" +
        "  kategorie: 'Laptop',\n" +
        "  istVerfügbar: true,\n" +
        "  spezifikationen: {\n" +
        "    ram: 16,\n" +
        "    speicher: 512,\n" +
        "  },\n" +
        "};\n\n" +
        "// Dot-Notation — für bekannte Properties\n" +
        "console.log(laptop.name);             // 'MacBook Pro'\n" +
        "console.log(laptop.spezifikationen.ram); // 16\n\n" +
        "// Bracket-Notation — für dynamische Keys\n" +
        "const feld = 'preis';\n" +
        "console.log(laptop[feld]);            // 1299\n\n" +
        "// Property hinzufügen\n" +
        "laptop.bewertung = 4.8;\n\n" +
        "// Property löschen\n" +
        "delete laptop.spezifikationen;\n\n" +
        "console.log(laptop);",
      highlightLines: [2, 14, 18, 21, 24],
      explanation:
        "Bracket-Notation `[]` ist nötig wenn der Property-Name in einer Variable steckt " +
        "oder Sonderzeichen enthält (z.B. `produkt['lager-nr']`). " +
        "Dot-Notation funktioniert nur mit gültigen Identifier-Namen.",
    },

    /* ── Erklärung: Primitive vs. Reference ── */
    {
      type: "explanation",
      title: "Primitive vs. Reference — ein wichtiger Unterschied",
      content:
        "Jetzt, wo wir sowohl Primitive (Zahlen, Strings, Boolean) als auch " +
        "Objekte kennen, können wir einen fundamentalen Unterschied erklären " +
        "der viele Bugs verursacht.",
      keyPoints: [
        "**Primitive** werden beim Zuweisen/Übergeben **kopiert** — jede Variable hat ihre eigene Kopie",
        "**Objekte** werden per **Referenz** weitergegeben — alle Variablen zeigen auf dasselbe Objekt",
        "Das gilt auch für Funktionsparameter!",
        "Um eine echte Kopie eines Objekts zu erstellen: `const kopie = { ...original }` (Spread-Operator)",
      ],
    },

    /* ── Code-Beispiel: Primitive vs Reference ── */
    {
      type: "code-example",
      title: "Primitive vs. Reference in Aktion",
      code:
        "// Primitive: Kopie wird erstellt\n" +
        "let preis1 = 999;\n" +
        "let preis2 = preis1; // Kopie!\n" +
        "preis2 = 799;\n" +
        "console.log(preis1); // 999 — unverändert\n\n" +
        "// Objekte: Referenz wird geteilt\n" +
        "const produkt1 = { name: 'MacBook', preis: 999 };\n" +
        "const produkt2 = produkt1; // Selbe Referenz!\n" +
        "produkt2.preis = 799;\n" +
        "console.log(produkt1.preis); // 799 — verändert!\n\n" +
        "// Echte Kopie mit Spread-Operator\n" +
        "const produkt3 = { ...produkt1 }; // Flache Kopie\n" +
        "produkt3.preis = 1099;\n" +
        "console.log(produkt1.preis); // 799 — unverändert ✓",
      highlightLines: [9, 10, 13],
      explanation:
        "Das Reference-Verhalten überrascht viele Anfänger. " +
        "`produkt2 = produkt1` kopiert **nicht** das Objekt, sondern nur die **Adresse** " +
        "(den Zeiger/Pointer) auf das Objekt im Speicher. " +
        "Der Spread-Operator `{ ...obj }` erstellt eine flache Kopie.",
    },

    /* ── Erklärung: Arrays ── */
    {
      type: "explanation",
      title: "Arrays — geordnete Listen",
      content:
        "Ein Array ist eine geordnete Sammlung von Werten. " +
        "Im Gegensatz zu einem Objekt haben Elemente in einem Array keine Namen — " +
        "sondern **numerische Indizes** (0, 1, 2, ...).",
      keyPoints: [
        "Arrays werden mit `[]` deklariert: `const produkte = ['Laptop', 'Maus']`",
        "Zugriff über Index (beginnt bei **0**): `produkte[0]` → `'Laptop'`",
        "`produkte.length` gibt die Anzahl der Elemente zurück",
        "Arrays in JavaScript können Werte **verschiedener Typen** beinhalten",
        "Arrays sind eigentlich Objekte — deshalb zeigen sie Reference-Verhalten",
      ],
    },

    /* ── Code-Beispiel: Arrays Grundlagen ── */
    {
      type: "code-example",
      title: "Arrays und ihre Methoden",
      code:
        "const warenkorb = [];\n\n" +
        "// Elemente hinzufügen\n" +
        "warenkorb.push('MacBook Pro');    // ans Ende anfügen\n" +
        "warenkorb.push('iPhone 15');\n" +
        "warenkorb.unshift('AirPods Pro'); // an den Anfang\n\n" +
        "console.log(warenkorb);\n" +
        "// ['AirPods Pro', 'MacBook Pro', 'iPhone 15']\n\n" +
        "// Zugriff\n" +
        "console.log(warenkorb[0]);        // 'AirPods Pro'\n" +
        "console.log(warenkorb.length);    // 3\n\n" +
        "// Elemente entfernen\n" +
        "const letztes = warenkorb.pop();  // letztes entfernen + zurückgeben\n" +
        "const erstes  = warenkorb.shift();// erstes entfernen + zurückgeben\n\n" +
        "console.log(letztes); // 'iPhone 15'\n" +
        "console.log(erstes);  // 'AirPods Pro'\n" +
        "console.log(warenkorb); // ['MacBook Pro']",
      explanation:
        "`push` / `pop` arbeiten am **Ende** des Arrays. " +
        "`unshift` / `shift` arbeiten am **Anfang**. " +
        "**Merkhilfe:** push/pop = Stack (Stapel). unshift/shift = Queue (Warteschlange from front).",
    },

    /* ── Erklärung: Higher Order Functions ── */
    {
      type: "explanation",
      title: "Higher-Order Array-Methoden — das Herzstück modernen JS",
      content:
        "Die mächtigsten Array-Methoden nehmen eine Callback-Funktion als Argument. " +
        "Das nennt man **Higher-Order Functions**.\n\n" +
        "Statt eine `for`-Schleife zu schreiben beschreibst du *was* passieren soll, " +
        "nicht *wie* die Iteration funktioniert. Das ist der Kern **deklarativer Programmierung**.",
      keyPoints: [
        "`forEach` — führt eine Funktion für jedes Element aus (kein Rückgabewert)",
        "`map` — transformiert jedes Element zu einem neuen Wert → gibt **neues Array** zurück",
        "`filter` — behält nur Elemente für die die Funktion `true` zurückgibt → **neues Array**",
        "`find` — gibt das **erste** Element zurück für das die Funktion `true` ist",
        "`some` — gibt `true` wenn **mindestens ein** Element die Bedingung erfüllt",
        "`every` — gibt `true` wenn **alle** Elemente die Bedingung erfüllen",
      ],
      businessContext:
        "Im TechStore: `produkte.filter(p => p.preis < 500)` für Budget-Produkte, " +
        "`produkte.map(p => p.preis)` um nur die Preisliste zu extrahieren, " +
        "`bestellungen.find(b => b.id === 'TS-001')` um eine Bestellung zu finden.",
    },

    /* ── Code-Beispiel: Higher Order Functions ── */
    {
      type: "code-example",
      title: "map, filter, find, forEach",
      code:
        "const produkte = [\n" +
        "  { name: 'MacBook Pro',  preis: 1299, kategorie: 'Laptop'     },\n" +
        "  { name: 'iPhone 15',    preis:  799, kategorie: 'Smartphone' },\n" +
        "  { name: 'AirPods Pro',  preis:  279, kategorie: 'Audio'      },\n" +
        "  { name: 'Dell Monitor', preis:  349, kategorie: 'Monitor'    },\n" +
        "];\n\n" +
        "// map: Preisliste extrahieren\n" +
        "const preise = produkte.map(p => p.preis);\n" +
        "console.log(preise); // [1299, 799, 279, 349]\n\n" +
        "// filter: Produkte unter 500 €\n" +
        "const budget = produkte.filter(p => p.preis < 500);\n" +
        "console.log(budget.length); // 2\n\n" +
        "// find: ein Produkt suchen\n" +
        "const iphone = produkte.find(p => p.name === 'iPhone 15');\n" +
        "console.log(iphone.preis); // 799\n\n" +
        "// forEach: alle Namen ausgeben\n" +
        "produkte.forEach((p, index) => {\n" +
        "  console.log(`${index + 1}. ${p.name}: ${p.preis} €`);\n" +
        "});",
      highlightLines: [9, 13, 17, 21],
      explanation:
        "**Wichtig:** `map` und `filter` geben immer ein **neues Array** zurück — " +
        "das Original bleibt unverändert. " +
        "`find` gibt `undefined` zurück wenn kein Element gefunden wird — " +
        "immer prüfen bevor auf Properties des Ergebnisses zugegriffen wird.",
    },

    /* ── Code-Beispiel: Arrays verketten ── */
    {
      type: "code-example",
      title: "Array-Methoden verketten — Method Chaining",
      code:
        "const produkte = [\n" +
        "  { name: 'MacBook Pro',  preis: 1299, kategorie: 'Laptop',  inStock: true  },\n" +
        "  { name: 'iPhone 15',    preis:  799, kategorie: 'Handy',   inStock: false },\n" +
        "  { name: 'iPad Air',     preis:  649, kategorie: 'Tablet',  inStock: true  },\n" +
        "  { name: 'Dell Monitor', preis:  349, kategorie: 'Monitor', inStock: true  },\n" +
        "];\n\n" +
        "// Meistgekaufte verfügbare Produkte am teuersten zuerst — kompakt!\n" +
        "const empfehlungen = produkte\n" +
        "  .filter(p => p.inStock)               // nur verfügbare\n" +
        "  .filter(p => p.preis >= 500)           // mind. 500 €\n" +
        "  .map(p => ({ ...p, bruttoPreis: p.preis * 1.19 })) // MwSt dazu\n" +
        "  .sort((a, b) => b.preis - a.preis);   // teuerste zuerst\n\n" +
        "empfehlungen.forEach(p => {\n" +
        "  console.log(`${p.name}: ${p.bruttoPreis.toFixed(2)} € (brutto)`);\n" +
        "});",
      highlightLines: [9, 10, 11, 12, 13],
      explanation:
        "**Method Chaining** ist ein zentrales JavaScript-Muster: " +
        "Methoden werden nacheinander auf das Ergebnis der vorherigen Methode aufgerufen. " +
        "Jede Methode gibt ein neues Array zurück — das Original bleibt unberührt.",
    },

    /* ── Comparison Table: Array-Methoden ── */
    {
      type: "comparison",
      title: "Array-Methoden Übersicht",
      headers: ["Methode", "Rückgabe", "Verändert Original?", "Wann nutzen?"],
      rows: [
        ["`push(el)`", "Neue Länge", "Ja", "Element ans Ende hinzufügen"],
        ["`pop()`", "Entferntes Element", "Ja", "Letztes Element entfernen"],
        ["`shift()`", "Entferntes Element", "Ja", "Erstes Element entfernen"],
        ["`unshift(el)`", "Neue Länge", "Ja", "Element an Anfang hinzufügen"],
        ["`map(fn)`", "Neues Array", "Nein", "Jedes Element transformieren"],
        ["`filter(fn)`", "Neues Array", "Nein", "Elemente herausfiltern"],
        [
          "`find(fn)`",
          "Element oder `undefined`",
          "Nein",
          "Erstes passendes Element finden",
        ],
        ["`forEach(fn)`", "`undefined`", "Nein", "Für jedes Element etwas tun"],
        [
          "`some(fn)`",
          "`true`/`false`",
          "Nein",
          "Existiert mind. ein passendes?",
        ],
        [
          "`every(fn)`",
          "`true`/`false`",
          "Nein",
          "Erfüllen alle die Bedingung?",
        ],
      ],
    },

    /* ── Pitfall ── */
    {
      type: "pitfall",
      title: "Häufiger Fehler: Original vs. Kopie bei Array-Methoden",
      mistakes: [
        {
          bad: "const produkte = ['Laptop', 'Maus', 'Monitor'];\n\n// filter gibt ein NEUES Array zurück!\nprodukte.filter(p => p !== 'Maus');\n\nconsole.log(produkte);\n// ['Laptop', 'Maus', 'Monitor'] ← unverändert, Bug!",
          good: "const produkte = ['Laptop', 'Maus', 'Monitor'];\n\n// Rückgabewert in neuer Variable speichern\nconst ohneZubehör = produkte.filter(p => p !== 'Maus');\n\nconsole.log(ohneZubehör);\n// ['Laptop', 'Monitor'] ✓\nconsole.log(produkte);\n// ['Laptop', 'Maus', 'Monitor'] ← Original bleibt",
          why:
            "`filter`, `map`, `sort` (!) und andere Methoden geben ein neues Array zurück. " +
            "Wenn du das Ergebnis nicht speicherst, verlierst du es. " +
            "**Achtung:** `sort()` verändert das Original! Vorher kopieren: `[...arr].sort()`.",
        },
      ],
    },

    /* ── Live Demo ── */
    {
      type: "demo",
      title: "Live: Produkt-Katalog-Manager",
      demoId: "catalog-manager",
      description:
        "Filtere, such und sortiere den TechStore-Produktkatalog. " +
        "Im Hintergrund arbeiten `filter()`, `sort()` und `map()` auf einem Array von Objekten.",
    },

    /* ── Playground: Standard ── */
    {
      type: "playground",
      title: "Aufgabe: Warenkorb-Auswertung",
      difficulty: "standard",
      starterCode:
        "// Aufgabe: Warenkorb mit Produkt-Objekten auswerten\n\n" +
        "const warenkorb = [\n" +
        "  { name: 'MacBook Pro',  preis: 1299, menge: 1 },\n" +
        "  { name: 'USB-C Kabel',  preis:   25, menge: 3 },\n" +
        "  { name: 'iPad Air',     preis:  649, menge: 1 },\n" +
        "  { name: 'Maus',         preis:   79, menge: 2 },\n" +
        "];\n\n" +
        "// 1. Berechne den Gesamtpreis aller Positionen\n" +
        "//    (preis * menge für jeden Artikel, dann zusammenzählen)\n" +
        "//    Tipp: map() um Zeilenpreise zu berechnen, dann forEach() oder reduce() zum Addieren\n\n" +
        "// 2. Filtere nur Artikel die mehr als 100 € pro Stück kosten\n\n" +
        "// 3. Erstelle eine neue Liste nur mit den Produktnamen (als einfaches String-Array)\n\n" +
        "// 4. Prüfe ob ALLE Artikel verfügbar sind\n" +
        "//    (In diesem Beispiel: Annahme alle sind verfügbar — nutze every())\n\n" +
        "// Gib alle Ergebnisse aus\n",
      hint:
        "Für den Gesamtpreis: `let total = 0; warenkorb.forEach(item => { total += item.preis * item.menge; });` " +
        "Oder: `warenkorb.map(i => i.preis * i.menge).reduce((sum, val) => sum + val, 0)`",
    },

    /* ── Playground: Bonus ── */
    {
      type: "playground",
      title: "Bonus-Challenge: Produktkatalog-Statistiken",
      difficulty: "bonus",
      starterCode:
        "// Bonus: Statistiken aus dem Produktkatalog berechnen\n\n" +
        "const katalog = [\n" +
        "  { name: 'MacBook Pro',  preis: 1299, kategorie: 'Laptop',     inStock: true  },\n" +
        "  { name: 'iPhone 15',    preis:  799, kategorie: 'Smartphone', inStock: true  },\n" +
        "  { name: 'iPad Air',     preis:  649, kategorie: 'Tablet',     inStock: false },\n" +
        "  { name: 'Dell Monitor', preis:  349, kategorie: 'Monitor',    inStock: true  },\n" +
        "  { name: 'AirPods Pro',  preis:  279, kategorie: 'Audio',      inStock: true  },\n" +
        "  { name: 'USB-C Kabel',  preis:   25, kategorie: 'Zubehör',    inStock: true  },\n" +
        "];\n\n" +
        "// Aufgabe:\n" +
        "// 1. Günstigstes verfügbares Produkt ermitteln\n" +
        "// 2. Teuersten Preis ermitteln\n" +
        "// 3. Durchschnittspreis berechnen\n" +
        "// 4. Gibt es Produkte die ausverkauft sind? (some())\n" +
        "// 5. Sind alle Produkte unter 2000 €? (every())\n" +
        "// 6. Erstelle eine sortierte Preisliste (NUR Preise, aufsteigend)\n",
      hint:
        "Für min/max: `Math.min(...katalog.map(p => p.preis))` oder `filter + sort`. " +
        "Durchschnitt: `preise.reduce((sum, p) => sum + p, 0) / preise.length`",
    },

    /* ── Quiz ── */
    {
      type: "quiz",
      questions: [
        {
          question:
            "Du hast:\n`const a = [1, 2, 3];\nconst b = a;\nb.push(4);\nconsole.log(a.length);`\n\nWas wird ausgegeben?",
          options: ["`3`", "`4`", "Ein Fehler", "`undefined`"],
          correct: 1,
          explanation:
            "Arrays sind Objekte und werden per Referenz übergeben. " +
            "`const b = a` erstellt keine Kopie — beide Variablen zeigen auf dasselbe Array. " +
            "Deshalb ist `a.length` nach `b.push(4)` jetzt 4.",
        },
        {
          question:
            "Was gibt folgender Code aus?\n" +
            "`[1, 2, 3, 4, 5].filter(n => n > 2).map(n => n * 10)`",
          options: [
            "`[3, 4, 5]`",
            "`[30, 40, 50]`",
            "`[10, 20, 30, 40, 50]`",
            "Ein Fehler",
          ],
          correct: 1,
          explanation:
            "Erst filtert `filter(n => n > 2)` das Array zu `[3, 4, 5]`. " +
            "Dann verdoppelt... multipliziert `map(n => n * 10)` jedes Element: `[30, 40, 50]`. " +
            "Method Chaining — das Ergebnis einer Methode ist die Quelle der nächsten.",
        },
        {
          question:
            "Was ist der Unterschied zwischen `find()` und `filter()` auf einem Array?",
          options: [
            "Kein Unterschied — beide filtern Elemente",
            "`find()` gibt das **erste** passende Element zurück; `filter()` gibt ein **Array** aller passenden zurück",
            "`filter()` gibt das erste Element zurück; `find()` gibt alle zurück",
            "`find()` verändert das Array; `filter()` nicht",
          ],
          correct: 1,
          explanation:
            "`find()` bricht nach dem ersten Treffer ab und gibt das Element zurück (oder `undefined`). " +
            "`filter()` durchläuft das gesamte Array und gibt ein neues Array mit allen Treffern zurück. " +
            "Für eine einzelne Bestellung: `find()`. Für alle Budget-Produkte: `filter()`.",
        },
      ],
    },
  ],
};
