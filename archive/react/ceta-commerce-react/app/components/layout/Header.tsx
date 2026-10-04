/**
 * Header – Kopfzeile der Anwendung
 *
 * Enthält Logo, Navigation und Warenkorb-Badge.
 * Der Header ist eine Komposition aus kleineren Komponenten.
 *
 * Hinweis: Der Header braucht die Warenkorb-Anzahl als Prop,
 * da der CartBadge ein Dumb Component ist.
 */

import { Link } from "react-router";
import { Navigation } from "./Navigation";
import { CartBadge } from "../cart/CartBadge";

interface HeaderProps {
  cartItemCount: number;
}

export function Header({ cartItemCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Ceta<span>.</span>
        </Link>
        <Navigation />
        <CartBadge itemCount={cartItemCount} />
      </div>
    </header>
  );
}
