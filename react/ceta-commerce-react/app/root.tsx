import { useState, useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";

import type { Route } from "./+types/root";
import { Header, Footer, Button } from "./components";
import { getCartItemCount, onCartChange } from "./services";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // Cart-Count State lebt hier, weil der Header ihn braucht.
  // Der Header ist ein Dumb Component – er bekommt den Count als Prop.
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Initialen Wert setzen
    setCartItemCount(getCartItemCount());

    // Bei Änderungen aktualisieren
    const unsubscribe = onCartChange(() => {
      setCartItemCount(getCartItemCount());
    });
    return unsubscribe;
  }, []);

  return (
    <div className="page">
      <Header cartItemCount={cartItemCount} />
      <main className="page__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Ein unerwarteter Fehler ist aufgetreten.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 – Seite nicht gefunden" : "Fehler";
    details =
      error.status === 404
        ? "Die angeforderte Seite existiert nicht."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="page">
      <Header cartItemCount={0} />
      <main className="page__content">
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state__icon">⚠️</div>
              <h1 className="empty-state__title">{message}</h1>
              <p className="empty-state__description">{details}</p>
              <div className="mt-lg">
                <Link to="/" className="btn btn--primary">
                  Zurück zur Startseite
                </Link>
              </div>
            </div>
            {stack && (
              <pre
                style={{
                  marginTop: "var(--spacing-xl)",
                  padding: "var(--spacing-md)",
                  backgroundColor: "var(--color-gray-100)",
                  borderRadius: "var(--radius-md)",
                  overflow: "auto",
                  fontSize: "var(--font-size-sm)",
                }}
              >
                <code>{stack}</code>
              </pre>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
