/**
 * =========================================
 * JavaScript DOM Manipulation - Live Demo
 * =========================================
 *
 * Das Geheimnis von modernen Webseiten:
 * JavaScript ändert HTML ohne Seitenreload!
 */

// ============================================
// EXAMPLE 1: DYNAMISCHER PREIS
// ============================================
// Zeigt: textContent ändert den Text in HTML-Elementen

console.log("✅ Example 1: Dynamischer Preis wird initialisiert...");

// Alle Größen-Buttons auswählen
const sizeButtons = document.querySelectorAll(".size-btn");

// Für jeden Button einen Event-Listener hinzufügen
sizeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Neue Größe und Preis aus dem Button auslesen
    const selectedSize = event.target.dataset.size;
    const newPrice = event.target.dataset.price;

    // Das Preis-Element im HTML finden und aktualisieren
    const priceElement = document.getElementById("price");
    priceElement.textContent = newPrice; // ← DOM MANIPULATION PASSIERT HIER

    // Visuell zeigen: Welcher Button ist aktiv
    sizeButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    console.log(`Preis geändert zu: ${newPrice}€ (Größe: ${selectedSize})`);
  });
});

// ============================================
// EXAMPLE 2: LIVE FILTER
// ============================================
// Zeigt: addEventListener + style.display kann Elemente zeigen/verstecken

console.log("✅ Example 2: Live Filter wird initialisiert...");

const searchInput = document.getElementById("search-input");
const productItems = document.querySelectorAll(".product-item");

searchInput.addEventListener("input", (event) => {
  // Was der Nutzer eingetippt hat
  const searchQuery = event.target.value.toLowerCase();

  // Jeden Produkt-Eintrag durchgehen
  productItems.forEach((product) => {
    // Produktname aus dem HTML auslesen
    const productName = product.dataset.productName.toLowerCase();

    // Passt der Produktname zur Suche?
    const matches = productName.includes(searchQuery);

    // Element zeigen oder verstecken
    if (matches || searchQuery === "") {
      product.classList.remove("hidden"); // ← DOM MANIPULATION PASSIERT HIER
    } else {
      product.classList.add("hidden"); // ← DOM MANIPULATION PASSIERT HIER
    }
  });

  console.log(`Filter angewendet: "${searchQuery}"`);
});

// ============================================
// EXAMPLE 3: INTERAKTIVER COUNTER
// ============================================
// Zeigt: JavaScript speichert Daten (count) und aktualisiert HTML

console.log("✅ Example 3: Counter wird initialisiert...");

// Eine zentrale Variable, die den aktuellen Count speichert
let count = 0;

// HTML-Elemente auswählen
const counterDisplay = document.getElementById("counter");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const resetBtn = document.getElementById("reset-btn");

/**
 * Hilfsfunktion: Counter-Anzeige aktualisieren
 * Dies ist der Kern: HTML wird mit JavaScript aktualisiert
 */
function updateCounterDisplay() {
  counterDisplay.textContent = count; // ← DOM MANIPULATION PASSIERT HIER

  // Kleine Animation hinzufügen
  counterDisplay.classList.add("pulse");
  setTimeout(() => counterDisplay.classList.remove("pulse"), 200);

  console.log(`Counter aktualisiert: ${count}`);
}

// Increment (Hinzufügen)
incrementBtn.addEventListener("click", () => {
  count++; // Variable ändern
  updateCounterDisplay(); // HTML aktualisieren
});

// Decrement (Entfernen)
decrementBtn.addEventListener("click", () => {
  if (count > 0) {
    count--; // Variable ändern
    updateCounterDisplay(); // HTML aktualisieren
  }
});

// Reset (Zurücksetzen)
resetBtn.addEventListener("click", () => {
  count = 0; // Variable ändern
  updateCounterDisplay(); // HTML aktualisieren
});

// ============================================
// ZUSAMMENFASSUNG
// ============================================
/*
Die drei Patterns aus dieser Demo:

1️⃣ DIRECT TEXT UPDATE
   document.getElementById('price').textContent = '39,99€'
   → Nutzer sieht sofort die Änderung!

2️⃣ CONDITIONAL VISIBILITY
   element.classList.add('hidden')
   element.classList.remove('hidden')
   → Elemente erscheinen/verschwinden

3️⃣ STATE MANAGEMENT
   let count = 0;
   count++;
   document.getElementById('counter').textContent = count;
   → JavaScript memoriert Werte und aktualisiert HTML

Das ist ALLES was "dynamisch" heißt. Diese drei Patterns ändern
die ganze Webseite - ohne neusladen, sofort, live!

Wenn du das verstanden hast, verstehst du auch:
- Gmail: State (Mails) + DOM Update
- Netflix: Daten laden + HTML anpassen
- Instagram: Neue Post? Nur JavaScript aktualisiert die Seite

Welcome to the real Web! 🚀
*/

console.log("🎉 DOM Manipulation ist aktiv! Versuche die Interaktionen!");
