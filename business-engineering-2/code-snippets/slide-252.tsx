// app/root.tsx – Wrapper mit Header + Footer (wie App.tsx in React Router v6)
import { Outlet } from "react-router";
import { Header } from "./components";
import { Footer } from "./components";

export default function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onCartChange((cart) =>
      setCartItemCount(getCartItemCount(cart)),
    );
    return unsubscribe;
  }, []);

  return (
    <div>
      <Header cartItemCount={cartItemCount} />

      <Outlet />
      {/* ← Hier wird die aktive Route gerendert (statt <Routes><Route>) */}

      <Footer />
    </div>
  );
}