/**
 * 03-operatoren.js — Kapitel: Operatoren & Vergleiche
 */

const chapter03 = {
  sections: [
    /* ── Erklärung: Arithmetik ── */
    {
      type: "explanation",
      title: "Arithmetische Operatoren",
      content:
        "Arithmetische Operatoren funktionieren in JavaScript meist wie erwartet — " +
        "mit einer wichtigen Ausnahme beim `+` Operator.",
      keyPoints: [
        "`+` — Addition bei Zahlen, **Konkatenation** bei Strings",
        "`-` — Subtraktion (konvertiert beide Seiten zu Zahlen)",
        "`*` — Multiplikation",
        "`/` — Division (gibt immer einen Float zurück: `10 / 3` → `3.333...`)",
        "`%` — Modulo (Rest bei Division: `10 % 3` → `1`)",
        "`**` — Potenz: `2 ** 10` → `1024`",
      ],
      businessContext:
        "Im TechStore berechnen wir `preis * menge` für Gesamtbeträge, " +
        "`betrag % 100` um Cent-Beträge zu ermitteln, und " +
        "`preis * (1 + MWST)` für den Bruttopreis.",
    },

    /* ── Code-Beispiel: + Falle ── */
    {
      type: "code-example",
      title: "Die + Operator Falle",
      code:
        "// Beide Zahlen — wie erwartet\n" +
        "console.log(100 + 50);     // 150\n\n" +
        "// Ein String dabei — Konkatenation!\n" +
        "console.log('100' + 50);   // '10050' ← Achtung!\n" +
        "console.log(100 + '50');   // '10050' ← Achtung!\n\n" +
        "// Andere Operatoren erzwingen Zahl-Konvertierung\n" +
        "console.log('100' - 50);   // 50  ← klappt\n" +
        "console.log('100' * 2);    // 200 ← klappt\n\n" +
        "// Lösung: explizit konvertieren\n" +
        "const eingabe = '100';\n" +
        "console.log(Number(eingabe) + 50); // 150 ✓",
      highlightLines: [4, 5],
      explanation:
        "**Merkregel:** `+` hat zwei Modi — wenn mindestens ein Operand ein String ist, " +
        "wechselt er in den **String-Modus** und konkateniert. " +
        "Alle anderen Operatoren konvertieren immer zu Zahlen.",
    },

    /* ── Erklärung: Vergleiche ── */
    {
      type: "explanation",
      title: "Vergleichsoperatoren",
      content:
        "Vergleichsoperatoren geben immer einen Boolean-Wert zurück (`true` oder `false`).",
      keyPoints: [
        "`>` größer als, `<` kleiner als",
        "`>=` größer gleich, `<=` kleiner gleich",
        "`===` **streng gleich** (gleicher Wert UND gleicher Typ)",
        "`!==` **streng ungleich**",
        "`==` lose gleich (mit Typ-Konvertierung) — **meide diesen!**",
        "`!=` lose ungleich — **meide diesen!**",
      ],
    },

    /* ── Code-Beispiel: === vs == ── */
    {
      type: "code-example",
      title: "=== vs. == — warum das wichtig ist",
      code:
        "// Lose Gleichheit (==) konvertiert den Typ\n" +
        "console.log('100' == 100);   // true  ← gefährlich!\n" +
        "console.log(0 == false);     // true  ← was?!\n" +
        "console.log('' == false);    // true  ← was?!\n" +
        "console.log(null == undefined); // true ← was?!\n\n" +
        "// Strenge Gleichheit (===) vergleicht Wert UND Typ\n" +
        "console.log('100' === 100);  // false ← korrekt\n" +
        "console.log(0 === false);    // false ← korrekt\n" +
        "console.log('' === false);   // false ← korrekt\n\n" +
        "// Im TechStore: Preis-Vergleich\n" +
        "const preisFromAPI = '999'; // String aus dem Backend\n" +
        "const rabattSchwelle = 999;\n" +
        "console.log(preisFromAPI == rabattSchwelle);  // true  ← Bug!\n" +
        "console.log(preisFromAPI === rabattSchwelle); // false ← korrekt",
      highlightLines: [2, 3, 4, 5, 13, 14],
      explanation:
        "**Regel ohne Ausnahme:** Nutze **immer** `===` und `!==`. " +
        "Die lose Gleichheit `==` erzeugt überraschende Ergebnisse durch " +
        "automatische Typ-Konvertierung. `===` vergleicht Wert und Typ ohne Überraschungen.",
    },

    /* ── Erklärung: Logische Operatoren ── */
    {
      type: "explanation",
      title: "Logische Operatoren",
      content:
        "Mit logischen Operatoren verknüpfst du mehrere Bedingungen. " +
        "Sie werden in `if`-Bedingungen und anderen Ausdrücken verwendet.",
      keyPoints: [
        "`&&` (UND) — beide Bedingungen müssen `true` sein",
        "`||` (ODER) — mindestens eine Bedingung muss `true` sein",
        "`!` (NICHT) — kehrt den Boolean-Wert um: `!true` → `false`",
      ],
      businessContext:
        "Im TechStore: `istVerfügbar && preis <= budget` — " +
        "nur kaufen wenn das Produkt verfügbar UND im Budget ist.",
    },

    /* ── Erklärung: Ternary ── */
    {
      type: "explanation",
      title: "Der Ternary-Operator — kompaktes if/else",
      content:
        "Der Ternary-Operator `?:` ist eine kompakte Alternative zu einem einfachen `if/else`. " +
        "Er eignet sich gut für Zuweisungen bei denen der Wert von einer Bedingung abhängt.",
      keyPoints: [
        "Syntax: `bedingung ? wertWennTrue : wertWennFalse`",
        "Liest sich als: 'wenn Bedingung zutrifft, dann X, sonst Y'",
        "Gut für **Zuweisungen**: `const label = isVor ? 'Verfügbar' : 'Ausverkauft'`",
        "Schlecht für komplexe Logik — dann ist `if/else` lesbarer",
      ],
    },

    /* ── Code-Beispiel: Alles zusammen ── */
    {
      type: "code-example",
      title: "Operatoren im TechStore-Kontext",
      code:
        "const bestellwert = 750;\n" +
        "const istPremiumKunde = true;\n\n" +
        "// Rabatt berechnen mit Vergleich + logischem Operator\n" +
        "const baseRabatt = bestellwert >= 500 ? 0.10 : 0.05;\n" +
        "const extraRabatt = istPremiumKunde ? 0.05 : 0;\n" +
        "const gesamtRabatt = baseRabatt + extraRabatt;\n\n" +
        "// Versandkosten mit Ternary\n" +
        "const versand = bestellwert >= 500 ? 0 : 4.99;\n\n" +
        "// Endpreis berechnen\n" +
        "const endpreis = bestellwert * (1 - gesamtRabatt) + versand;\n\n" +
        "console.log(`Rabatt: ${gesamtRabatt * 100}%`);\n" +
        "console.log(`Versand: ${versand} €`);\n" +
        "console.log(`Endpreis: ${endpreis.toFixed(2)} €`);",
      explanation:
        "Dieser Code kombiniert Vergleiche (`>=`), logische Operatoren (`+` für Rabattsumme), " +
        "und Ternary für kompakte Entscheidungen. Das ist ein typisches Muster in Geschäftslogik.",
    },

    /* ── Pitfall ── */
    {
      type: "pitfall",
      title: "Häufiger Fehler: == statt ===",
      mistakes: [
        {
          bad: "// Bestellstatus aus der Datenbank kann eine Zahl oder ein String sein\nconst status = 0; // 0 = offen, 1 = bezahlt\n\nif (status == false) { // true! 0 == false ist true\n  console.log('Bestellung offen'); // wird ausgegeben\n}",
          good: "const status = 0;\n\nif (status === 0) { // explizit auf 0 prüfen\n  console.log('Bestellung offen'); // korrekt\n}",
          why:
            "`0 == false` ist `true` in JavaScript wegen automatischer Typ-Konvertierung. " +
            "Das führt zu schwer findbaren Bugs. " +
            "Immer `===` verwenden — niemals `==`.",
        },
      ],
    },

    /* ── Comparison Table ── */
    {
      type: "comparison",
      title: "== vs. === auf einen Blick",
      headers: ["Ausdruck", "== Ergebnis", "=== Ergebnis", "Erklärung"],
      rows: [
        ["`'5' == 5`", "`true`", "`false`", "String vs. Number"],
        ["`0 == false`", "`true`", "`false`", "0 wird zu `false` konvertiert"],
        ["`'' == false`", "`true`", "`false`", "Leerer String ist falsy"],
        ["`null == undefined`", "`true`", "`false`", "Sonderfall"],
        ["`5 === 5`", "`true`", "`true`", "Gleicher Wert, gleicher Typ"],
        ["`'5' === '5'`", "`true`", "`true`", "Gleicher Wert, gleicher Typ"],
      ],
    },

    /* ── Live Demo ── */
    {
      type: "demo",
      title: "Live: Rabatt-Staffel-Rechner",
      demoId: "discount-calculator",
      description:
        "Sieh wie Vergleichsoperatoren und der Ternary-Operator Rabattstufen berechnen.",
    },

    /* ── Playground: Standard ── */
    {
      type: "playground",
      title: "Aufgabe: Brutto/Netto-Rechner",
      difficulty: "standard",
      starterCode:
        "// Aufgabe: TechStore Brutto/Netto-Rechner\n\n" +
        "const bruttoPreis = 1188.81; // Preis inkl. 19% MwSt\n" +
        "const MWST_SATZ = 0.19;\n\n" +
        "// 1. Berechne den Nettopreis aus dem Bruttopreis\n" +
        "//    Formel: netto = brutto / (1 + MWST_SATZ)\n\n" +
        "// 2. Berechne den MwSt-Betrag\n\n" +
        "// 3. Prüfe mit === ob der Nettopreis > 500 ist\n\n" +
        "// 4. Nutze den Ternary-Operator:\n" +
        "//    Wenn Nettopreis > 500 → 'Versandkostenfrei'\n" +
        "//    Sonst → 'zzgl. 4,99 € Versand'\n\n" +
        "// 5. Gib alle Werte aus\n",
      hint:
        "Netto = Brutto / 1.19. " +
        "Für den Ternary: `const versand = netto > 500 ? 'Versandkostenfrei' : 'zzgl. 4,99 € Versand';`",
    },

    /* ── Playground: Bonus ── */
    {
      type: "playground",
      title: "Bonus-Challenge: Gestaffelte Versandkosten",
      difficulty: "bonus",
      starterCode:
        "// Bonus: Gestaffelte Versandkosten\n\n" +
        "// TechStore Versandkostenregeln:\n" +
        "// - Express-Kunden: immer kostenlos\n" +
        "// - Bestellwert >= 500 €: kostenlos\n" +
        "// - Bestellwert >= 200 €: 2,99 €\n" +
        "// - Bestellwert < 200 €: 5,99 €\n\n" +
        "const bestellwert = 350;\n" +
        "const istExpressKunde = false;\n\n" +
        "// Berechne die Versandkosten mit Ternary oder Logische Operatoren\n" +
        "// Tipp: Ternary kann verschachtelt werden:\n" +
        "// bedingung1 ? wert1 : bedingung2 ? wert2 : wert3\n\n" +
        "// Gib das Ergebnis aus:\n" +
        "// 'Bestellwert: 350 € — Versandkosten: 2.99 €'\n",
      hint:
        "Verschachtelter Ternary oder logische Kombination: " +
        "`const versand = istExpressKunde || bestellwert >= 500 ? 0 : bestellwert >= 200 ? 2.99 : 5.99;`",
    },

    /* ── Quiz ── */
    {
      type: "quiz",
      questions: [
        {
          question: "Was gibt `'10' + 5 + 3` aus?",
          options: [
            "`18`",
            "`'1053'`",
            "`'1008'`",
            "`'1053'` — warte, `'108'`",
          ],
          correct: 1,
          explanation:
            "JavaScript wertet von links nach rechts aus. " +
            "`'10' + 5` → `'105'` (String-Konkatenation). " +
            "`'105' + 3` → `'1053'` (wieder Konkatenation). " +
            "Wenn du 18 willst: `Number('10') + 5 + 3`.",
        },
        {
          question:
            "Das TechStore-System erhält `bestellwert = '750'` (String) aus einem Formular. " +
            "Der Rabatt soll gelten wenn `bestellwert >= 500`. Was passiert?",
          options: [
            "Ein TypeError wird geworfen",
            "Funktioniert korrekt — `>= 500` konvertiert '750' zu 750",
            "Funktioniert nicht — String kann nicht mit >= verglichen werden",
            "Gibt immer `false` zurück",
          ],
          correct: 1,
          explanation:
            "Die Vergleichsoperatoren `<`, `>`, `<=`, `>=` konvertieren Strings zu Zahlen. " +
            "`'750' >= 500` → `750 >= 500` → `true`. " +
            "Trotzdem: explizit konvertieren mit `Number()` ist sauberer.",
        },
        {
          question: "Was gibt `!!(0)` aus?",
          options: ["`0`", "`true`", "`false`", "`undefined`"],
          correct: 2,
          explanation:
            "`0` ist **falsy** in JavaScript. " +
            "`!0` → `true`. " +
            "`!!0` → `false`. " +
            "Dieses Muster `!!wert` konvertiert einen beliebigen Wert in einen echten Boolean.",
        },
      ],
    },
  ],
};
