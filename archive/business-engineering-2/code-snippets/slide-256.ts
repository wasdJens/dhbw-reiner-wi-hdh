// src/app/components/layout/navigation.component.ts
// Daten-getriebene Navigation – Links als Array, gerendert mit @for
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-navigation",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.css",
})
export class NavigationComponent {
  readonly items = [
    { to: "/", label: "Start", exact: true },
    { to: "/products", label: "Produkte", exact: false },
    { to: "/maintenance", label: "Wartung", exact: false },
    { to: "/about", label: "Über Ceta", exact: false },
  ];
}

<!-- navigation.component.html -->
<nav class="nav">
  @for (item of items; track item.to) {
    <a
      [routerLink]="item.to"
      routerLinkActive="nav__link--active"
      [routerLinkActiveOptions]="{ exact: item.exact }"
      class="nav__link"
    >
      {{ item.label }}
    </a>
  }
  <!-- ❌ NIEMALS normales href für interne Links! -->
  <!-- <a href="/products">Produkte</a>  ← Löst Seitenreload aus! SPA kaputt! -->
</nav>