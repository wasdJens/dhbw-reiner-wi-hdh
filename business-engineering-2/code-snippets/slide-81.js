// const = Wert ändert sich nicht (unveränderlich)
const companyName = "Acme GmbH";
const taxRate = 0.19;
const maxItemsPerPage = 20;

// let = Wert kann sich ändern
let currentPage = 1;
let cartTotal = 0;
let searchQuery = "";

// NIEMALS var verwenden (veraltet, fehleranfällig)