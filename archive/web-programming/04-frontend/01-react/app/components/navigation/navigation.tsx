import { NavLink } from "react-router";
import "./navigation.css";

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/second-page">Second page</NavLink>
      <NavLink to="/beers">Beers</NavLink>
    </nav>
  );
}
