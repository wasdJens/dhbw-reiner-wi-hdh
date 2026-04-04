// app/components/layout/Navigation.tsx – wie in Ceta implementiert
import { NavLink } from "react-router"; // ← "react-router", nicht "-dom"!

export function Navigation() {
  return (
    <nav className="nav">
      {/* NavLink: Bekommt automatisch eine CSS-Klasse wenn aktiv */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `nav__link ${isActive ? "nav__link--active" : ""}`
        }
        end // ← nur exakter Match für die Startseite
      >
        Start
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `nav__link ${isActive ? "nav__link--active" : ""}`
        }
      >
        Produkte
      </NavLink>

      <NavLink
        to="/maintenance"
        className={({ isActive }) =>
          `nav__link ${isActive ? "nav__link--active" : ""}`
        }
      >
        Wartung
      </NavLink>

      {/* ❌ NIEMALS normales <a> für interne Links! */}
      {/* <a href="/products">Produkte</a>  ← Das löst einen Seitenreload aus! */}
    </nav>
  );
}