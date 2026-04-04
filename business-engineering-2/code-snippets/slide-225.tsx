// React: Der gesamte Datenfluss der Ceta-Anwendung

// 1. root.tsx hat den globalen Warenkorb-Zähler als State
export default function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  // useEffect: Lauscht auf Änderungen im Cart-Service
  useEffect(() => {
    const unsubscribe = onCartChange((cart) => {
      setCartItemCount(getCartItemCount(cart));
    });
    return unsubscribe; // Aufräumen wenn Komponente entfernt wird
  }, []);

  // 2. Daten fließen NACH UNTEN über Props
  return (
    <div>
      <Header cartItemCount={cartItemCount} />
      {/* Event fließt NACH OBEN über den cart.service.ts */}
      <Outlet />
    </div>
  );
}

// 3. Header: Dumb Component, bekommt Zähler als Prop
function Header({ cartItemCount }: { cartItemCount: number }) {
  return (
    <header className="header">
      <Navigation />
      <CartBadge itemCount={cartItemCount} />
    </header>
  );
}

// 4. ProductDetailPage (Smart): Warenkorb-Aktion via Service
export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProductById(productId ?? "");

  function handleAddToCart() {
    if (product && selectedVariant) {
      addToCart(product.id, selectedVariantId); // ← Service-Aufruf!
      // cart.service.ts benachrichtigt alle Listener automatisch
      // root.tsx empfängt die Änderung und aktualisiert cartItemCount
    }
  }
  // ...
}