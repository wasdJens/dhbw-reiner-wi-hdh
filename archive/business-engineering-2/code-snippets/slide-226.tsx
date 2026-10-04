// Die Kette: Nutzer-Aktion → Service-Aufruf → Listener → State-Update → Re-Render

// Schritt 1: Nutzer klickt in ProductDetailPage auf "In den Warenkorb"
export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProductById(productId ?? "");
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants[0]?.id ?? "",
  );

  function handleAddToCart() {
    if (product && selectedVariantId) {
      addToCart(product.id, selectedVariantId); // ← Schreibt in cart.service.ts
      // cart.service.ts benachrichtigt alle Listener
    }
  }

  return (
    <Button
      label="In den Warenkorb"
      variant="primary"
      onClick={handleAddToCart}
    />
  );
}

// Schritt 2: cart.service.ts empfängt Aufruf und benachrichtigt Listener
// addToCart() → cart.items ergänzen → listeners.forEach(fn => fn(cart))

// Schritt 3: root.tsx empfängt Event via onCartChange-Listener
export default function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onCartChange((cart) => {
      setCartItemCount(getCartItemCount(cart)); // ← State-Update!
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Header cartItemCount={cartItemCount} />{" "}
      {/* Aktualisiert sich automatisch! */}
      <Outlet />
    </>
  );
}