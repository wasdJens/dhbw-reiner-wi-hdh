/**
 * Navigation – Hauptnavigation der Anwendung
 *
 * DUMB COMPONENT: Rendert Navigationslinks.
 * Nutzt NavLink von React Router für aktive Zustände.
 */

import { NavLink } from "react-router";

interface NavigationItem {
  to: string;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { to: "/", label: "Start" },
  { to: "/products", label: "Produkte" },
  { to: "/maintenance", label: "Wartung" },
  { to: "/about", label: "Über Ceta" },
];

export function Navigation() {
  return (
    <nav className="nav">
      {navigationItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `nav__link ${isActive ? "nav__link--active" : ""}`
          }
          end={item.to === "/"}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
