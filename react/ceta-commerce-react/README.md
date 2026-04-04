# Ceta Commerce – Referenzanwendung

E-Commerce Webshop für **Ceta** – ein Startup für spezialisierte Baustellenausrüstung.
Gebaut als Referenzarchitektur für moderne Web-Entwicklung mit React Router v7.

## Schnellstart

```bash
npm install
npm run dev
```

Öffnet auf [http://localhost:5173](http://localhost:5173)

## Befehle

| Befehl            | Beschreibung                  |
| ----------------- | ----------------------------- |
| `npm run dev`     | Entwicklungsserver starten    |
| `npm run build`   | Produktions-Build erstellen   |
| `npm run typecheck` | TypeScript-Typen prüfen     |
| `npx vitest run`  | Tests ausführen               |
| `npx vitest`      | Tests im Watch-Modus          |

## Technologie

- **Framework:** React 19 + React Router 7 (SSR)
- **Sprache:** TypeScript
- **Build-Tool:** Vite
- **Styling:** Eigenes CSS Design System (kein Tailwind)
- **Testing:** Vitest + React Testing Library

## Projektstruktur

```
app/
├── components/          # Wiederverwendbare DUMB Components (Component Catalog)
│   ├── ui/              # Basis-Bausteine: Button, Badge, Card, Input, Select, TextArea
│   ├── product/         # Produkt-Darstellung: ProductCard, VariantPicker, FeatureList
│   ├── cart/            # Warenkorb: CartItemRow, CartSummary, CartBadge
│   ├── maintenance/     # Wartung: RequestCard, RequestForm, StatusBadge, RequestList
│   ├── layout/          # Layout: Header, Footer, Navigation, PageHeader
│   └── index.ts         # Barrel Export – alle Komponenten zentral importieren
├── routes/              # SMART Components (Seiten mit Logik)
│   ├── home.tsx         # Startseite
│   ├── products.tsx     # Produktübersicht mit Suche
│   ├── product-detail.tsx # Produktdetail mit Variantenauswahl
│   ├── cart.tsx         # Warenkorb
│   ├── maintenance.tsx  # Wartungs-Dashboard mit Statusfilter
│   ├── maintenance-new.tsx # Neue Wartungsanfrage (Formular)
│   └── about.tsx        # Über Ceta
├── services/            # Service Layer (Geschäftslogik)
│   ├── product.service.ts
│   ├── cart.service.ts
│   └── maintenance.service.ts
├── data/                # Statische Daten (simuliert API)
│   ├── products.ts
│   └── maintenance-requests.ts
├── types/               # TypeScript Interfaces
│   ├── product.ts
│   ├── cart.ts
│   └── maintenance.ts
├── styles/              # CSS Design System
│   ├── design-tokens.css # Farben, Abstände, Typografie als CSS Custom Properties
│   ├── reset.css
│   ├── typography.css
│   ├── layout.css
│   └── components.css
├── root.tsx             # App-Shell (Layout mit Header + Footer)
├── routes.ts            # Routen-Konfiguration
└── app.css              # Importiert alle Stylesheets
```

## Architektur-Entscheidungen

### Smart vs. Dumb Components

- **Dumb Components** (`components/`): Bekommen alles über Props, wissen nichts über Services oder Routing. Wiederverwendbar wie Lego-Steine.
- **Smart Components** (`routes/`): Verwalten State, rufen Services auf, orchestrieren Dumb Components.

### Service Layer

Alle Datenzugriffe laufen über Services (`services/`). Keine Komponente greift direkt auf Daten zu.
Die Services enthalten `// TODO`-Kommentare für die spätere API-Anbindung.

### Kein externes State-Management

Der Warenkorb nutzt eine Modul-Variable im `cart.service.ts` mit einem Listener-Pattern.
Das ist bewusst einfach gehalten – das Konzept ist auf Angular übertragbar.

## URL-Struktur

| URL                      | Seite                        |
| ------------------------ | ---------------------------- |
| `/`                      | Startseite                   |
| `/products`              | Produktübersicht             |
| `/products/:productId`   | Produktdetail                |
| `/cart`                  | Warenkorb                    |
| `/maintenance`           | Wartungs-Dashboard           |
| `/maintenance/new`       | Neue Wartungsanfrage         |
| `/about`                 | Über Ceta                    |

## Produkte

| Produkt       | Beschreibung                     | Basic  | Pro     | Enterprise |
| ------------- | -------------------------------- | ------ | ------- | ---------- |
| **CetaCore**  | Smarter Schutzhelm               | 249 €  | 449 €   | 799 €      |
| **CetaLevel** | Laser-Vermessungssystem          | 189 €  | 379 €   | 699 €      |
| **CetaGuard** | Autonomes Überwachungssystem     | 599 €  | 1.199 € | 2.499 €    |
