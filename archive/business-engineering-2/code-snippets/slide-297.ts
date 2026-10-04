// Daten zusammenführen (Join)
import productsRaw from "../data/products.json";
import categoriesRaw from "../data/categories.json";

interface EnrichedProduct extends Product {
  categoryName: string;
  categoryDescription: string;
}

function enrichProducts(): EnrichedProduct[] {
  return productsRaw.map((p) => {
    const category = categoriesRaw.find((c) => c.id === p.categoryId);

    return {
      ...normalizeProduct(p),
      categoryName: category?.name ?? "Unbekannt",
      categoryDescription: category?.description ?? "",
    };
  });
}