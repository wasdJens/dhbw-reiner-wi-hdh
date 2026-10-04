import { products } from "./products.js";

// ============================================
// Pretty Print Helper Functions
// ============================================

function prettyPrint(data, title = null) {
  if (title) {
    console.log(`\n📋 ${title}`);
    console.log("─".repeat(50));
  }
  console.log(JSON.stringify(data, null, 2));
}

function section(title) {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`  ${title}`);
  console.log(`${"=".repeat(50)}`);
}

// ============================================
// Array Methods Demonstrators
// ============================================

// 1️⃣ Find unique categories
section("1. Which categories exist?");
const uniqueCategories = [...new Set(products.map((p) => p.category))];
prettyPrint(uniqueCategories, "Unique Categories");

// Alternative with reduce:
const categoriesWithCount = products.reduce((acc, p) => {
  const existing = acc.find((cat) => cat.name === p.category);
  if (existing) {
    existing.count++;
  } else {
    acc.push({ name: p.category, count: 1 });
  }
  return acc;
}, []);
prettyPrint(categoriesWithCount, "Categories with Product Count");

// 2️⃣ List all products in a specific category
section("2. List all products in category 'Office'");
const officeProducts = products.filter((p) => p.category === "Office");
prettyPrint(officeProducts, "Office Products");

// 3️⃣ Calculate the highest price
section("3. What is the highest price?");
const highestPrice = Math.max(...products.map((p) => p.price));
const mostExpensive = products.find((p) => p.price === highestPrice);
prettyPrint({ highestPrice, product: mostExpensive }, "Most Expensive Product");

// ============================================
// Additional Useful Examples
// ============================================

// 4️⃣ Calculate average price by category
section("4. Average price by category");
const avgByCategory = uniqueCategories.map((category) => {
  const categoryProducts = products.filter((p) => p.category === category);
  const avgPrice =
    categoryProducts.reduce((sum, p) => sum + p.price, 0) /
    categoryProducts.length;
  return {
    category,
    avgPrice: avgPrice.toFixed(2),
  };
});
prettyPrint(avgByCategory, "Average Price by Category");

// 5️⃣ Best rated products
section("5. Best rated products (by rating)");
const bestRated = [...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3)
  .map((p) => ({ name: p.name, rating: p.rating, category: p.category }));
prettyPrint(bestRated, "Top 3 Best Rated");

// 6️⃣ Top sellers (by units sold)
section("6. Top sellers (by units sold)");
const topSellers = [...products]
  .sort((a, b) => b.sold - a.sold)
  .slice(0, 3)
  .map((p) => ({ name: p.name, sold: p.sold, price: p.price }));
prettyPrint(topSellers, "Top 3 Best Sellers");

// 7️⃣ Product price range in each category
section("7. Price range by category");
const priceRanges = uniqueCategories.map((category) => {
  const categoryProducts = products.filter((p) => p.category === category);
  const prices = categoryProducts.map((p) => p.price).sort((a, b) => a - b);
  return {
    category,
    min: Math.min(...prices),
    max: Math.max(...prices),
    range: (Math.max(...prices) - Math.min(...prices)).toFixed(2),
  };
});
prettyPrint(priceRanges, "Price Range by Category");

// 8️⃣ Total revenue (if we sold all current stock at current prices)
section("8. Total revenue calculation");
const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sold, 0);
prettyPrint(
  {
    totalRevenue: totalRevenue.toFixed(2),
    productCount: products.length,
    totalUnitsSold: products.reduce((sum, p) => sum + p.sold, 0),
  },
  "Revenue Statistics",
);

// ============================================
// Display all products at the end
// ============================================
section("All Products Overview");
prettyPrint(products);
