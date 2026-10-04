/**
 * chapters.js — Kapitel-Registry
 *
 * Definiert die Reihenfolge und Metadaten aller Kapitel.
 * Die eigentlichen Inhalte (sections) sind in den
 * kapitel-spezifischen Dateien definiert.
 */

// CHAPTERS ist ein globales Array das von app.js und index.js genutzt wird.
// Es wird durch die einzelnen Kapitel-Dateien befüllt.
// Dieses File definiert die Reihenfolge und grundlegenden Metadaten.

const CHAPTERS = [
  {
    id: "variablen",
    title: "Variablen & Konstanten",
    subtitle: "Daten benennen und speichern",
    icon: "📦",
    storyIntro:
      "Das TechStore-System braucht einen Ort um Daten zu speichern — Produktpreise, Lagermengen und Kundendaten. Dafür brauchen wir Variablen.",
    get sections() {
      return typeof chapter01 !== "undefined" ? chapter01.sections : [];
    },
  },
  {
    id: "datentypen",
    title: "Datentypen",
    subtitle: "Zahlen, Texte, Wahrheitswerte und mehr",
    icon: "🔢",
    storyIntro:
      "Im TechStore hat jeder Datenwert einen Typ: Preise sind Zahlen, Produktnamen sind Texte, Verfügbarkeit ist ein Ja/Nein-Wert. JavaScript unterscheidet diese Typen — meistens automatisch.",
    get sections() {
      return typeof chapter02 !== "undefined" ? chapter02.sections : [];
    },
  },
  {
    id: "operatoren",
    title: "Operatoren & Vergleiche",
    subtitle: "Rechnen, vergleichen und entscheiden",
    icon: "⚖️",
    storyIntro:
      "Um Rabatte zu berechnen und Preisklassen zu prüfen, braucht das TechStore-System Operatoren. Hier lernen wir auch eine JavaScript-Tücke kennen: nicht alle Operatoren funktionieren so wie man denkt.",
    get sections() {
      return typeof chapter03 !== "undefined" ? chapter03.sections : [];
    },
  },
  {
    id: "control-flow",
    title: "Kontrollstrukturen",
    subtitle: "Bedingungen, Schleifen und Verzweigungen",
    icon: "🔀",
    storyIntro:
      "Im TechStore durchläuft jede Bestellung verschiedene Status. Je nach Status soll das System unterschiedlich reagieren. Dafür brauchen wir Kontrollstrukturen.",
    get sections() {
      return typeof chapter04 !== "undefined" ? chapter04.sections : [];
    },
  },
  {
    id: "funktionen",
    title: "Funktionen",
    subtitle: "Code wiederverwenden und strukturieren",
    icon: "⚙️",
    storyIntro:
      "Preisberechnung, Rabattlogik und Formatierung brauchen wir an vielen Stellen im TechStore-System. Statt denselben Code immer wieder zu schreiben, kapseln wir ihn in Funktionen.",
    get sections() {
      return typeof chapter05 !== "undefined" ? chapter05.sections : [];
    },
  },
  {
    id: "arrays-objekte",
    title: "Arrays & Objekte",
    subtitle: "Datenstrukturen für den Produktkatalog",
    icon: "🗂️",
    storyIntro:
      "Ein Produkt im TechStore hat viele Eigenschaften: Name, Preis, Kategorie, Lagerstand. Und es gibt hunderte Produkte. Dafür brauchen wir Objekte und Arrays.",
    get sections() {
      return typeof chapter06 !== "undefined" ? chapter06.sections : [];
    },
  },
  {
    id: "zusammenspiel",
    title: "Alles zusammen",
    subtitle: "Das TechStore-System in Aktion",
    icon: "🚀",
    storyIntro:
      "Alle gelernten Konzepte kommen jetzt zusammen. Wir bauen das vollständige TechStore-Dashboard das Bestellungen verwaltet, Statistiken berechnet und Daten filtert.",
    get sections() {
      return typeof chapter07 !== "undefined" ? chapter07.sections : [];
    },
  },
];
