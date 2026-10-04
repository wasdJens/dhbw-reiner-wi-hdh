// Die Funktion:
function calculateGrossPrice(netPrice: number, taxRate: number = 0.19): number {
  return netPrice * (1 + taxRate);
}

// Die Tests:
describe("calculateGrossPrice", () => {
  test("berechnet mit Standard-Steuersatz", () => {
    expect(calculateGrossPrice(100)).toBe(119);
  });

  test("berechnet mit benutzerdefiniertem Steuersatz", () => {
    expect(calculateGrossPrice(100, 0.07)).toBe(107);
  });

  test("gibt 0 für Nettopreis 0", () => {
    expect(calculateGrossPrice(0)).toBe(0);
  });

  test("funktioniert mit Dezimalzahlen", () => {
    expect(calculateGrossPrice(29.99)).toBeCloseTo(35.69, 2);
  });
});
