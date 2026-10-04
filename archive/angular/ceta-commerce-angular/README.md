# Ceta Commerce — Angular

Eine moderne **E-Commerce-Webanwendung** auf Basis von Angular 21, entwickelt als Lehrprojekt im Rahmen des DHBW-Moduls *Webprogrammierung*. Die App demonstriert aktuelle Angular-Konzepte wie **Signals**, **Standalone Components**, **Lazy Loading** und **Server-Side Rendering**.

---

## Tech Stack

| Bereich | Technologie |
|---|---|
| Framework | Angular 21.2 |
| Sprache | TypeScript 5.9 (strict) |
| SSR | `@angular/ssr` + Express 5 |
| Testing | Vitest |
| Package Manager | npm 10.9.3 |
| Styling | CSS Custom Properties (Design Tokens) |

---

## Features

- **Produktkatalog** — Listing, Suche und Detailansicht mit Varianten
- **Warenkorb** — Reaktiver State mit Angular Signals (`signal`, `computed`)
- **Wartungsanfragen** — CRUD-ähnlicher Workflow mit Statusübergängen
- **Server-Side Rendering** — Hydration mit `withEventReplay()` für optimale Performance
- **Lazy-loaded Routes** — Alle Seiten werden per `loadComponent` on-demand geladen

---

## Projektstruktur

```
src/
├── app/
│   ├── components/         # Wiederverwendbare UI-Bausteine
│   │   ├── layout/         # Header, Footer
│   │   ├── cart/           # Warenkorb-Komponenten
│   │   ├── product/        # Produkt-Komponenten
│   │   ├── maintenance/    # Wartungsanfrage-Komponenten
│   │   └── ui/             # Generische UI-Elemente
│   ├── pages/              # Routen-Komponenten (lazy-loaded)
│   │   ├── home/
│   │   ├── products/
│   │   ├── product-detail/
│   │   ├── cart/
│   │   ├── maintenance/
│   │   ├── maintenance-new/
│   │   └── about/
│   ├── services/           # Geschäftslogik & State
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   └── maintenance.service.ts
│   ├── types/              # TypeScript-Interfaces
│   └── data/               # Lokale Demodaten
└── styles/                 # CSS-Architektur (Tokens → Reset → Typography → Layout → Components)
```

---

## Routen

| Pfad | Seite |
|---|---|
| `/` | Startseite |
| `/products` | Produktübersicht |
| `/products/:productId` | Produktdetail |
| `/cart` | Warenkorb |
| `/maintenance` | Wartungsanfragen |
| `/maintenance/new` | Neue Wartungsanfrage |
| `/about` | Über uns |

---

## Angular-Konzepte im Fokus

### Signals & Computed Values
```ts
// CartService
readonly cart = signal<Cart>({ items: [] });
readonly cartItemCount = computed(() =>
  this.cart().items.reduce((sum, item) => sum + item.quantity, 0)
);
```

### Lazy-loaded Standalone Components
```ts
// app.routes.ts
{
  path: 'products',
  loadComponent: () => import('./pages/products/products.page'),
}
```

### Client Hydration mit Event Replay
```ts
// app.config.ts
provideClientHydration(withEventReplay())
```

---

## Lokale Entwicklung

**Voraussetzungen:** Node.js ≥ 20, npm ≥ 10

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (http://localhost:4200)
npm start

# Tests ausführen
npm test

# Produktions-Build erstellen
npm run build

# SSR-Server starten (nach Build)
npm run serve:ssr:ceta-commerce-angular
```

---

## Code Scaffolding

```bash
# Neue Komponente generieren
ng generate component components/my-component

# Neuen Service generieren
ng generate service services/my-service

# Alle verfügbaren Schematics anzeigen
ng generate --help
```

---

## Weiterführende Links

- [Angular Dokumentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
- [Angular CLI Referenz](https://angular.dev/tools/cli)
- [Vitest Dokumentation](https://vitest.dev)
