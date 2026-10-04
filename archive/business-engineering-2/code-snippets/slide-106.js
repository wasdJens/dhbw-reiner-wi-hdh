// Ohne Destructuring
const product = getProductById(1);
const name = product.name;
const price = product.price;
const category = product.category;

// Mit Destructuring – dieselbe Wirkung, ein Drittel Code
const { name, price, category } = getProductById(1);

// In Funktionsparametern
function displayProduct({ name, price, category }) {
  console.log(`${name} (${category}): ${price}€`);
}
displayProduct(product);

// Array Destructuring
const [first, second, ...rest] = getAllProducts();
console.log(first.name);   // Erstes Produkt
console.log(rest.length);  // Alle außer den ersten beiden