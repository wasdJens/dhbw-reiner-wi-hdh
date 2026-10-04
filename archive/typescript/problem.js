// ============================================
// PROBLEM: Typische Fehler in JavaScript Projekten
// ============================================

// Beispiel 1: Funktion ohne klare Typ-Dokumentation
function calculateDiscount(price, discountPercent) {
  return price * (1 - discountPercent / 100);
}

// Was passiert hier? Niemand sieht die erwarteten Typen!
const result1 = calculateDiscount(100, 10); // OK: 90
const result2 = calculateDiscount("100", 10); // BUG! String statt Number
const result3 = calculateDiscount(100, "10%"); // BUG! String statt Number

// Beispiel 2: Objekt mit unklaren Properties
function createUser(data) {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    age: data.age,
  };
}

const user1 = createUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 25,
});

// Tippfehler: niemand warnt uns!
const user2 = createUser({
  id: 2,
  name: "Bob",
  emai: "bob@example.com", // FEHLER: "emai" statt "email"
  age: 30,
});

console.log(user2.email); // undefined - schwer zu debuggen!

// Beispiel 3: Array mit Datentyp-Chaos
function processUsers(users) {
  return users.map((user) => {
    return {
      displayName: user.name.toUpperCase(), // Was wenn name kein String ist?
      isAdult: user.age >= 18, // Was wenn age kein Number ist?
    };
  });
}

const usersData = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: "25" }, // FEHLER: age ist String!
  { name: 123, age: 30 }, // FEHLER: name ist Number!
];

try {
  const result = processUsers(usersData);
  console.log(result);
} catch (error) {
  console.log("Fehler zur Runtime:", error.message);
}

// Beispiel 4: Funktion mit optional/required Parameters
function updateUserProfile(userId, firstName, lastName, email, phone) {
  // Welche Parameter sind optional? Wer weiß?
  // Wurde phone falsch positioniert?
  return {
    userId,
    firstName,
    lastName,
    email,
    phone,
  };
}

// Ist das korrekt?
updateUserProfile(1, "John", "Doe", "john@example.com");
// Oder sollte es so sein?
updateUserProfile(1, "John", "Doe", "john@example.com", "+49123456");

// Beispiel 5: API Response ohne Struktur-Garantie
function fetchUserData(userId) {
  // Simuliert API Response
  return {
    id: userId,
    name: "John",
    email: "john@example.com",
  };
}

async function displayUserInfo(userId) {
  const user = await fetchUserData(userId);

  // Wir nehmen an, dass user diese Properties hat
  // Aber wenn die API sich ändert? Keine Warnung!
  console.log(`Name: ${user.fullName}`); // FEHLER: "fullName" existiert nicht!
  console.log(`Email: ${user.email}`);
}

displayUserInfo(1).catch((err) => console.error("Error:", err));
