// ❌ Was tut dieser Code?
const d = g();
const f = d.filter((x) => x.a > 50 && x.b);
const r = f.map((x) => ({ ...x, c: x.a * 0.9 }));

// ✅ Derselbe Code, lesbar:
const allProducts = getAllProducts();
const expensiveInStock = allProducts.filter(
  (product) => product.price > 50 && product.inStock,
);
const discountedProducts = expensiveInStock.map((product) => ({
  ...product,
  discountPrice: product.price * 0.9,
}));