/**
 * 07-zusammenspiel.js — Kapitel: Alles zusammen
 */

const chapter07 = {
  sections: [
    /* ── Einleitung ── */
    {
      type: "explanation",
      title: "Das TechStore-System kommt zusammen",
      content:
        "In diesem abschließenden Kapitel kommt kein neuer Stoff. " +
        "Stattdessen zeigen wir wie alle gelernten Konzepte **gemeinsam** ein " +
        "vollständiges System bilden.\n\n" +
        "Das ist der Moment wo Programmierer merken: " +
        "die einzelnen Bausteine (Variablen, Typen, Operatoren, Bedingungen, Funktionen, Datenstrukturen) " +
        "sind erst zusammen richtig mächtig.",
      keyPoints: [
        "**Variablen & Konstanten** — Daten benennen und speichern",
        "**Datentypen** — den richtigen Typ für jeden Wert wählen",
        "**Operatoren** — Berechnungen und Vergleiche anstellen",
        "**Kontrollstrukturen** — auf Bedingungen reagieren und wiederholen",
        "**Funktionen** — Logik isolieren und wiederverwenden",
        "**Arrays & Objekte** — komplexe Daten strukturieren und verarbeiten",
      ],
      businessContext:
        "Der TechStore braucht all diese Konzepte gleichzeitig: " +
        "Bestellungen sind Objekte in Arrays, " +
        "Statusprüfungen sind Kontrollstrukturen, " +
        "Preisberechnungen sind Funktionen.",
    },

    /* ── Code: Alles zusammen ── */
    {
      type: "code-example",
      title: "Mini-Shop: Alle Konzepte in 50 Zeilen",
      code:
        "// Konstanten (Kapitel 1)\n" +
        "const MWST = 0.19;\n" +
        "const FREIVERSAND_AB = 500;\n\n" +
        "// Daten als Objekte in Array (Kapitel 6)\n" +
        "const katalog = [\n" +
        "  { id: 1, name: 'MacBook Pro', preis: 1099, inStock: true  },\n" +
        "  { id: 2, name: 'iPhone 15',   preis:  699, inStock: true  },\n" +
        "  { id: 3, name: 'iPad Air',    preis:  549, inStock: false },\n" +
        "];\n\n" +
        "// Funktion mit Callback (Kapitel 5)\n" +
        "function sucheProdukt(name) {\n" +
        "  return katalog.find(p => p.name.toLowerCase().includes(name.toLowerCase()));\n" +
        "}\n\n" +
        "// Funktion: Preis berechnen (Kapitel 5 + Operatoren)\n" +
        "function berechneEndpreis(netto, rabatt = 0) {\n" +
        "  return netto * (1 - rabatt) * (1 + MWST);\n" +
        "}\n\n" +
        "// Funktion: Bestellung prüfen (Kontrollstrukturen)\n" +
        "function prüfeBestellung(produkt, menge) {\n" +
        "  if (!produkt) return 'Produkt nicht gefunden';\n" +
        "  if (!produkt.inStock) return 'Ausverkauft';\n" +
        "  if (menge <= 0) return 'Ungültige Menge';\n" +
        "  return 'Bestellung möglich';\n" +
        "}\n\n" +
        "// Alles zusammen nutzen\n" +
        "const gefunden = sucheProdukt('macbook');\n" +
        "const status = prüfeBestellung(gefunden, 1);\n\n" +
        "if (status === 'Bestellung möglich') {\n" +
        "  const endpreis = berechneEndpreis(gefunden.preis);\n" +
        "  const versand = endpreis >= FREIVERSAND_AB ? 0 : 4.99;\n" +
        "  console.log(`✅ ${gefunden.name}: ${endpreis.toFixed(2)} € + ${versand} € Versand`);\n" +
        "} else {\n" +
        "  console.log(`❌ Fehler: ${status}`);\n" +
        "}",
      explanation:
        "Dieser Code ist kein Tutorial-Beispiel — so sieht echter JavaScript-Code aus. " +
        "Funktionen die klare Namen haben, Arrays mit `find()` durchsuchen, " +
        "Bedingungen die Fehlerfälle frühzeitig abfangen. " +
        "Willkommen in der realen Welt der Programmierung.",
    },

    /* ── Live Demo ── */
    {
      type: "demo",
      title: "Live: TechStore Dashboard",
      demoId: "techstore-dashboard",
      description:
        "Das vollständige TechStore-System: Bestellübersicht mit KPIs, " +
        "Status-Badges und berechneten Statistiken — alles mit Vanilla JavaScript.",
    },

    /* ── Code: Typische Patterns ── */
    {
      type: "code-example",
      title: "Typische JavaScript-Muster — deine neue Toolbox",
      code:
        "const bestellungen = [\n" +
        "  { id: 'TS-001', betrag: 1544.81, status: 'zugestellt' },\n" +
        "  { id: 'TS-002', betrag:  950.81, status: 'versendet'  },\n" +
        "  { id: 'TS-003', betrag:  415.31, status: 'bezahlt'    },\n" +
        "];\n\n" +
        "// Pattern 1: Aggregation (Summe berechnen)\n" +
        "const umsatz = bestellungen\n" +
        "  .reduce((summe, b) => summe + b.betrag, 0);\n" +
        "console.log(`Umsatz: ${umsatz.toFixed(2)} €`);\n\n" +
        "// Pattern 2: Gruppierung\n" +
        "const nachStatus = {};\n" +
        "bestellungen.forEach(b => {\n" +
        "  if (!nachStatus[b.status]) nachStatus[b.status] = [];\n" +
        "  nachStatus[b.status].push(b.id);\n" +
        "});\n" +
        "console.log(nachStatus);\n\n" +
        "// Pattern 3: Transformation für Anzeige\n" +
        "const anzeigeZeilen = bestellungen.map(b => ({\n" +
        "  ...b,\n" +
        "  betragFormatiert: b.betrag.toFixed(2) + ' €',\n" +
        "  istAbgeschlossen: b.status === 'zugestellt',\n" +
        "}));\n" +
        "console.log(anzeigeZeilen);",
      explanation:
        "`reduce()` ist die mächtigste Array-Methode — sie reduziert ein Array zu einem einzigen Wert. " +
        "Pattern 2 (Gruppierung) und Pattern 3 (Transformation mit Spread) " +
        "sind Muster die du in React, Angular und Node.js täglich begegnen wirst.",
    },

    /* ── Erklärung: Was kommt als nächstes? ── */
    {
      type: "explanation",
      title: "Was kommt als Nächstes?",
      content:
        "Mit diesen Grundlagen bist du bereit für die nächsten Themen der Vorlesung:",
      keyPoints: [
        "**DOM-Manipulation** — JavaScript steuert HTML direkt im Browser",
        "**Async/Await & fetch()** — Daten von APIs laden ohne die Seite zu blockieren",
        "**Node.js** — JavaScript auf dem Server ausführen",
        "**React / Angular** — Frontend-Frameworks die auf diesen Grundlagen aufbauen",
        "**TypeScript** — JavaScript mit statischen Typen",
      ],
      businessContext:
        "Alle Konzepte die du gelernt hast — Variablen, Typen, Funktionen, Arrays — " +
        "existieren in React/Angular genauso. " +
        "Der Unterschied: dort gibt es zusätzliche Abstraktionen **oben drauf**. " +
        "Wer die Grundlagen kennt, versteht Frameworks viel schneller.",
    },

    /* ── Playground: Standard ── */
    {
      type: "playground",
      title: "Abschluss-Aufgabe: Bestellverwaltung",
      difficulty: "standard",
      description:
        "Kombiniere alle gelernten Konzepte in einer Bestellverwaltungs-Funktion.",
      starterCode:
        "// Abschluss-Aufgabe: TechStore Bestellverwaltung\n\n" +
        "// Produktkatalog (Array von Objekten)\n" +
        "const produkte = [\n" +
        "  { id: 1, name: 'Laptop',  preis: 899,  inStock: true  },\n" +
        "  { id: 2, name: 'Handy',   preis: 599,  inStock: true  },\n" +
        "  { id: 3, name: 'Tablet',  preis: 449,  inStock: false },\n" +
        "  { id: 4, name: 'Maus',    preis:  49,  inStock: true  },\n" +
        "];\n\n" +
        "const MWST = 0.19;\n\n" +
        "// Aufgabe 1: Funktion findeProdunkt(id) — sucht ein Produkt per ID\n\n" +
        "// Aufgabe 2: Funktion berechneGesamtpreis(produktId, menge)\n" +
        "//            - Findet das Produkt\n" +
        "//            - Prüft ob inStock (wenn nicht: gibt 'Ausverkauft' zurück)\n" +
        "//            - Gibt den Bruttopreis (mit MwSt) zurück\n\n" +
        "// Aufgabe 3: Erstelle einen Warenkorb (Array) mit 3 Bestellpositionen\n" +
        "//            Dann berechne und gib den Gesamtbetrag aller Positionen aus\n\n" +
        "// Tipp: Nutze deine eigenen Funktionen aus Aufgabe 1 und 2!\n",
      hint:
        "Aufgabe 1: `function findeProdukt(id) { return produkte.find(p => p.id === id); }` " +
        "Aufgabe 3: Array mit Objekten `{ produktId: 1, menge: 2 }` und forEach um jeden Preis zu addieren.",
    },

    /* ── Playground: Bonus ── */
    {
      type: "playground",
      title: "Bonus-Challenge: Verkaufsstatistiken",
      difficulty: "bonus",
      description: "Berechne komplexe Statistiken aus Bestelldaten.",
      starterCode:
        "// Bonus: Verkaufsstatistiken\n\n" +
        "const bestellungen = [\n" +
        "  { id: 'TS-001', produkt: 'Laptop',  betrag: 1069.81, status: 'zugestellt', monat: 1 },\n" +
        "  { id: 'TS-002', produkt: 'Handy',   betrag:  712.81, status: 'zugestellt', monat: 1 },\n" +
        "  { id: 'TS-003', produkt: 'Laptop',  betrag: 1069.81, status: 'versendet',  monat: 2 },\n" +
        "  { id: 'TS-004', produkt: 'Tablet',  betrag:  534.31, status: 'zugestellt', monat: 2 },\n" +
        "  { id: 'TS-005', produkt: 'Handy',   betrag:  712.81, status: 'zugestellt', monat: 2 },\n" +
        "  { id: 'TS-006', produkt: 'Laptop',  betrag: 1069.81, status: 'bezahlt',    monat: 3 },\n" +
        "];\n\n" +
        "// 1. Gesamtumsatz aller abgeschlossenen Bestellungen (status === 'zugestellt')\n\n" +
        "// 2. Meistverkauftes Produkt (nach Anzahl der Bestellungen)\n\n" +
        "// 3. Umsatz pro Monat als Objekt: { 1: 1782.62, 2: ..., 3: ... }\n\n" +
        "// 4. Wie viel Prozent der Bestellungen wurden bereits zugestellt?\n",
      hint:
        "Für Aufgabe 2: Erst nach Produktnamen gruppieren (Objekt mit Zählern), " +
        "dann das Produkt mit dem höchsten Zähler finden. " +
        "Für Aufgabe 3: `forEach` + Objekt als Akkumulator.",
    },

    /* ── Quiz ── */
    {
      type: "quiz",
      questions: [
        {
          question:
            "Was gibt `[10, 20, 30].reduce((acc, val) => acc + val, 0)` zurück?",
          options: ["`[10, 20, 30]`", "`60`", "`30`", "`0`"],
          correct: 1,
          explanation:
            "`reduce()` aggregiert alle Elemente zu einem einzigen Wert. " +
            "Startwert ist `0`. Dann: `0 + 10 = 10`, `10 + 20 = 30`, `30 + 30 = 60`. " +
            "Ergebnis: `60`.",
        },
        {
          question:
            "Du hast `const bestellungen = [...]` und möchtest nur die Bestellungen " +
            "mit Status 'zugestellt' und Betrag > 500 €. Welche Kombination nutzt du?",
          options: [
            "`find()` + `map()`",
            "`filter()` + `filter()` (oder eine `filter()` mit `&&`)",
            "`forEach()` + `push()`",
            "`sort()` + `slice()`",
          ],
          correct: 1,
          explanation:
            "`filter()` mit einer kombinierten Bedingung ist am elegantesten: " +
            "`bestellungen.filter(b => b.status === 'zugestellt' && b.betrag > 500)`. " +
            "Oder zwei `filter()` hintereinander (Method Chaining). " +
            "`forEach + push` würde auch funktionieren, ist aber weniger idiomatisch.",
        },
        {
          question:
            "Welches Konzept brauchst du wenn du dasselbe Stück Logik an " +
            "10 verschiedenen Stellen in deinem Code benötigst?",
          options: [
            "Eine Schleife",
            "Ein Objekt",
            "Eine Funktion",
            "Eine Konstante",
          ],
          correct: 2,
          explanation:
            "**Funktionen** sind das Werkzeug um Logik zu kapseln und an vielen Stellen " +
            "wiederzuverwenden. Das DRY-Prinzip (Don't Repeat Yourself) sagt: " +
            "wenn du denselben Code zweimal schreibst, stecke ihn in eine Funktion.",
        },
      ],
    },
  ],
};
