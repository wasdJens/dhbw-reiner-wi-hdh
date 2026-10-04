// Eine Funktion ist keine Code-Übung
// Eine Funktion ist ein Geschäftsprozess

// Brutto-Preis berechnen
function calculateGrossPrice(netPrice, taxRate = 0.19) {
  return netPrice * (1 + taxRate);
}

// Rabatt anwenden
function applyDiscount(price, discountPercent) {
  const discount = price * (discountPercent / 100);
  return price - discount;
}

// Gesamtwert des Lagerbestands berechnen
function calculateInventoryValue(products) {
  let total = 0;
  for (const product of products) {
    total += product.price * product.quantity;
  }
  return total;
}

// Anwendung
const gross = calculateGrossPrice(29.99);
console.log(gross);  // 35.69

const discounted = applyDiscount(29.99, 15);
console.log(discounted);  // 25.49

const inventoryValue = calculateInventoryValue(catalog);
console.log(`Lagerwert: ${inventoryValue}€`);