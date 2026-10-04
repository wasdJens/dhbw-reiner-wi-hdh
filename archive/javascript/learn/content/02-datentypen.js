/**
 * 02-datentypen.js — Kapitel: Datentypen
 */

const chapter02 = {
  sections: [
    /* ── Erklärung: Dynamische Typisierung ── */
    {
      type: "explanation",
      title: "JavaScript ist dynamisch typisiert",
      content:
        "In vielen Programmiersprachen muss man beim Deklarieren einer Variable angeben, " +
        "welchen Typ sie haben soll (`int`, `string`, `boolean`). " +
        "JavaScript tut das **nicht** — der Typ wird zur Laufzeit automatisch bestimmt.\n\n" +
        "Das macht JavaScript flexibel — aber auch fehleranfällig. " +
        "Eine Variable kann ihren Typ zur Laufzeit ändern, was zu unerwarteten " +
        "Ergebnissen führen kann.",
      keyPoints: [
        "JavaScript ermittelt den Datentyp **automatisch** anhand des Wertes",
        "Eine Variable kann ihren Typ **zur Laufzeit** ändern",
        "Es gibt **8 Datentypen** in JavaScript",
        "Mit `typeof` kann man den aktuellen Typ eines Wertes prüfen",
      ],
      businessContext:
        "Im TechStore kommt eine Produktdaten-Datei vom Server. " +
        "Wenn jemand den Preis versehentlich als Text statt als Zahl schickt, " +
        "können Berechnungen schiefgehen — deshalb ist Typ-Bewusstsein wichtig.",
    },

    /* ── Code-Beispiel: Datentypen Überblick ── */
    {
      type: "code-example",
      title: "Die wichtigsten Datentypen im Überblick",
      code:
        "// Number — für alle Zahlen\n" +
        "const preis = 999;          // Integer\n" +
        "const rabatt = 0.15;        // Float\n\n" +
        "// String — für Text\n" +
        "const produktName = 'MacBook Pro';\n" +
        'const kategorie = "Laptop";\n' +
        "const info = `Preis: ${preis} €`; // Template Literal\n\n" +
        "// Boolean — nur true oder false\n" +
        "const istVerfügbar = true;\n" +
        "const istAusverkauft = false;\n\n" +
        "// null — explizit kein Wert vorhanden\n" +
        "let lieferadresse = null; // Kunde hat noch keine Adresse angegeben\n\n" +
        "// undefined — Variable deklariert aber kein Wert zugewiesen\n" +
        "let gutscheinCode; // noch nicht gesetzt\n" +
        "console.log(gutscheinCode); // undefined",
      highlightLines: [2, 3, 6, 7, 8, 11, 12, 15, 18],
      explanation:
        "**Wichtig:** `null` und `undefined` sind zwei verschiedene Konzepte. " +
        "`null` bedeutet: *kein Wert, bewusst gesetzt*. " +
        "`undefined` bedeutet: *kein Wert, weil noch nichts zugewiesen wurde*.",
    },

    /* ── Erklärung: Strings vertieft ── */
    {
      type: "explanation",
      title: "Strings: Text in JavaScript",
      content:
        "Strings können mit `'einfachen'`, `\"doppelten\"` oder `` `Backtick-Anführungszeichen` `` erstellt werden. " +
        "Die ersten beiden sind identisch — Backticks haben eine besondere Fähigkeit.",
      keyPoints: [
        "**Konkatenation** mit `+`: `'Hello' + ' ' + 'World'` → `'Hello World'`",
        "**Template Literals** (Backticks): `` `Preis: ${preis} €` `` — direkte Einbettung von Variablen",
        "Template Literals können auch Ausdrücke enthalten: `` `MwSt: ${preis * 0.19} €` ``",
        "**Multiline** ist nur mit Template Literals einfach möglich",
      ],
      businessContext:
        "Im TechStore nutzen wir Template Literals um Rechnungstexte zu generieren: " +
        "`` `Rechnung für Bestellung #${bestellNr}: ${formatEuro(betrag)}` ``",
    },

    /* ── Code-Beispiel: Template Literals ── */
    {
      type: "code-example",
      title: "Template Literals vs. String-Konkatenation",
      code:
        "const kunde = 'Anna Müller';\n" +
        "const betrag = 1188.81;\n" +
        "const bestellNr = 'TS-001';\n\n" +
        "// ❌ Alte Art: umständliche Konkatenation\n" +
        "const alt = 'Sehr geehrte/r ' + kunde + ',\\n' +\n" +
        "            'Ihre Bestellung ' + bestellNr + ' beträgt ' + betrag + ' €.';\n\n" +
        "// ✅ Moderne Art: Template Literal\n" +
        "const modern = `Sehr geehrte/r ${kunde},\n" +
        "Ihre Bestellung ${bestellNr} beträgt ${betrag.toFixed(2)} €.`;\n\n" +
        "console.log(modern);",
      highlightLines: [9, 10],
      explanation:
        "Template Literals (Backticks) machen Code lesbarer. " +
        "Mit `${ausdruck}` können Variablen und Berechnungen direkt eingebettet werden. " +
        "`.toFixed(2)` ist eine Methode auf Zahlen — sie rundet auf 2 Nachkommastellen.",
    },

    /* ── Erklärung: null vs. undefined ── */
    {
      type: "explanation",
      title: "null vs. undefined — ein wichtiger Unterschied",
      content:
        "Dieser Unterschied verwirrt viele Anfänger, ist aber wichtig:\n\n" +
        "**`undefined`**: Die Variable existiert, hat aber noch keinen Wert erhalten. " +
        "JavaScript setzt dies *automatisch*.\n\n" +
        "**`null`**: Ein bewusst gesetzter leerer Wert. Du als Entwickler sagst: " +
        "*ich weiß dass dieser Platz existiert, aber der Wert ist (noch) unbekannt*.",
      keyPoints: [
        "`undefined` = JavaScript hat keinen Wert gefunden",
        "`null` = Du hast bewusst 'kein Wert' gesetzt",
        "Beide sind **falsy** (werden wie `false` behandelt in Bedingungen)",
        "`typeof null` gibt `'object'` zurück — das ist ein bekannter Bug in JS",
      ],
      businessContext:
        "Wenn ein neuer Kunde sich registriert, ist seine Lieferadresse `null` — " +
        "er hat sie noch nicht angegeben. " +
        "Ein Formularfeld das noch nie angezeigt wurde ist `undefined`. " +
        "Das hilft zu unterscheiden ob jemand aktiv 'nichts' eingegeben hat.",
    },

    /* ── Erklärung: typeof ── */
    {
      type: "explanation",
      title: "typeof — Datentyp ermitteln",
      content:
        "Mit dem `typeof`-Operator kannst du den Typ eines Wertes zur Laufzeit prüfen. " +
        "Das ist nützlich um eingehende Daten zu validieren.",
      keyPoints: [
        "`typeof 42` → `'number'`",
        "`typeof 'hello'` → `'string'`",
        "`typeof true` → `'boolean'`",
        "`typeof undefined` → `'undefined'`",
        "`typeof null` → `'object'` ⚠️ (historischer Bug in JavaScript!)",
        "`typeof {}` → `'object'`",
        "`typeof function(){}` → `'function'`",
      ],
    },

    /* ── Code-Beispiel: typeof ── */
    {
      type: "code-example",
      title: "typeof in der Praxis",
      code:
        "// Produkt-Validierung im TechStore\n" +
        "function validiereProdukt(produkt) {\n" +
        "  if (typeof produkt.name !== 'string') {\n" +
        "    console.log('Fehler: Name muss ein Text sein');\n" +
        "  }\n" +
        "  if (typeof produkt.preis !== 'number') {\n" +
        "    console.log('Fehler: Preis muss eine Zahl sein');\n" +
        "  }\n" +
        "  if (typeof produkt.istVerfügbar !== 'boolean') {\n" +
        "    console.log('Fehler: istVerfügbar muss true/false sein');\n" +
        "  }\n" +
        "}\n\n" +
        "// Gültiges Produkt:\n" +
        "validiereProdukt({ name: 'MacBook', preis: 999, istVerfügbar: true });\n\n" +
        "// Fehlerhaftes Produkt:\n" +
        "validiereProdukt({ name: 12345, preis: 'teuer', istVerfügbar: null });",
      explanation:
        "Dieser Pattern — Daten validieren bevor man sie nutzt — ist fundamentales " +
        "**defensive programming**. Im echten TechStore würde man das beim Laden " +
        "von Daten aus einer API einsetzen.",
    },

    /* ── Pitfall: Typ-Verwechslung ── */
    {
      type: "pitfall",
      title: "Häufiger Fehler: Zahl vs. String beim Rechnen",
      mistakes: [
        {
          bad: "// Formularwert ist immer ein String!\nconst eingabe = '100'; // kommt aus einem Eingabefeld\nconst mwst = eingabe * 0.19;\nconsole.log(mwst); // 19 ← zufällig richtig\n\nconst fehler = eingabe + 50;\nconsole.log(fehler); // '10050' ← String-Konkatenation!",
          good: "// Immer in Zahl umwandeln!\nconst eingabe = '100';\nconst preis = Number(eingabe); // oder: parseInt(eingabe, 10)\nconst mwst = preis * 0.19;\nconsole.log(mwst); // 19\n\nconst summe = preis + 50;\nconsole.log(summe); // 150 ✓",
          why:
            "Werte aus Formulareingaben, URL-Parametern oder APIs sind oft Strings. " +
            "Mit `*`, `/`, `-` klappt es zufällig (JS konvertiert automatisch). " +
            "Mit `+` passiert String-Konkatenation statt Addition. " +
            "Nutze `Number()`, `parseInt()` oder `parseFloat()` um explizit zu konvertieren.",
        },
      ],
    },

    /* ── Live Demo ── */
    {
      type: "demo",
      title: "Live: Produktdaten-Validator",
      demoId: "product-validator",
      description:
        "Wähle ein Produkt und sieh wie `typeof` fehlerhafte Datentypen aufdeckt.",
    },

    /* ── Playground: Standard ── */
    {
      type: "playground",
      title: "Aufgabe: Produkt-Datenmodell",
      difficulty: "standard",
      description:
        "Lege ein Produkt mit korrekten Datentypen an und prüfe sie mit typeof.",
      starterCode:
        "// Aufgabe: Erstelle ein gültiges TechStore-Produkt\n\n" +
        "// 1. Erstelle folgende Variablen mit den RICHTIGEN Typen:\n" +
        "//    - produktName      (Text)\n" +
        "//    - preis            (Zahl)\n" +
        "//    - istVerfügbar     (true oder false)\n" +
        "//    - lieferadresse    (noch nicht bekannt — nutze null)\n\n" +
        "// 2. Gib für jede Variable typeof aus\n" +
        "//    z.B.: console.log('Typ des Namens:', typeof produktName);\n\n" +
        "// 3. Erstelle einen info-String mit Template Literal:\n" +
        "//    'MacBook Pro kostet 999 € — verfügbar: true'\n",
      hint: "Für Aufgabe 3: `` const info = `${produktName} kostet ${preis} € — verfügbar: ${istVerfügbar}`; ``",
    },

    /* ── Playground: Bonus ── */
    {
      type: "playground",
      title: "Bonus-Challenge: Typ-Validator",
      difficulty: "bonus",
      description: "Schreibe eine Funktion die Produktdaten validiert.",
      starterCode:
        "// Bonus: Schreibe eine validiereProdukt() Funktion\n\n" +
        "// Die Funktion soll prüfen ob:\n" +
        "// - name ein string ist\n" +
        "// - preis eine number ist (und > 0)\n" +
        "// - istVerfügbar ein boolean ist\n\n" +
        "// Testdaten:\n" +
        "const produkt1 = { name: 'iPhone 15', preis: 799, istVerfügbar: true };\n" +
        "const produkt2 = { name: 42,          preis: 'gratis', istVerfügbar: null };\n\n" +
        "// Erwartete Ausgabe für produkt2:\n" +
        "// 'Fehler: name muss ein string sein'\n" +
        "// 'Fehler: preis muss eine Zahl > 0 sein'\n" +
        "// 'Fehler: istVerfügbar muss ein boolean sein'\n",
      hint:
        "Nutze `typeof wert !== 'erwarteter-typ'` zur Prüfung. " +
        "Für preis zusätzlich: `preis <= 0`. " +
        "Funktionen lernst du im nächsten Kapitel — probier es trotzdem!",
    },

    /* ── Quiz ── */
    {
      type: "quiz",
      questions: [
        {
          question: "Was gibt `typeof null` zurück?",
          options: ["`'null'`", "`'undefined'`", "`'object'`", "`'boolean'`"],
          correct: 2,
          explanation:
            "`typeof null === 'object'` — das ist ein bekannter, historischer Bug in JavaScript. " +
            "Er wurde nie gefixt um bestehenden Code nicht zu brechen. " +
            "Zum Prüfen auf null nutzt man deshalb `wert === null`.",
        },
        {
          question:
            "Ein Formularfeld gibt den Wert `'25'` zurück (String). " +
            "Du rechnest: `'25' + 10`. Was ist das Ergebnis?",
          options: [
            "`35` (Zahl)",
            "`'2510'` (String)",
            "`'35'` (String)",
            "Ein Fehler",
          ],
          correct: 1,
          explanation:
            "Der `+` Operator bei Strings bedeutet **Konkatenation**. " +
            "'25' + 10 wird zu '2510'. " +
            "Nutze `Number('25') + 10` um den String in eine Zahl umzuwandeln.",
        },
        {
          question:
            "Was ist der Unterschied zwischen `null` und `undefined` im TechStore-Kontext?",
          options: [
            "Kein Unterschied — beide bedeuten 'kein Wert'",
            "`null` = bewusst gesetzt ('Adresse noch unbekannt'); `undefined` = Variable hat noch keinen Wert",
            "`undefined` = bewusst gesetzt; `null` = automatisch gesetzt",
            "`null` ist für Zahlen, `undefined` für Strings",
          ],
          correct: 1,
          explanation:
            "`null` setzt du aktiv: `let adresse = null;` — bewusste Entscheidung, kein Wert. " +
            "`undefined` bekommt eine Variable automatisch wenn sie deklariert aber nicht initialisiert wurde. " +
            "Im TechStore: eine nicht ausgefüllte Adresse = `null`; " +
            "eine Variable die noch gar nicht verwendet wurde = `undefined`.",
        },
      ],
    },
  ],
};
