┌─────────────────────────────────────────────────┐
│  UI-Komponenten                                  │
│  ProductCard, ProductList, SearchBar, ...        │
│                                                   │
│  Wissen NICHTS über:                              │
│  - Woher die Daten kommen                        │
│  - Ob sie aus JSON, API oder Datenbank stammen   │
│  - Ob sie bereinigt werden mussten               │
└──────────────────────┬──────────────────────────┘
                       │  ruft auf
                       ▼
┌─────────────────────────────────────────────────┐
│  Service Layer                                   │
│  productService.ts                               │
│                                                   │
│  getAll(), getById(), search(), getByCategory()  │
│                                                   │
│  Verantwortlich für:                              │
│  - Daten laden                                   │
│  - Validierung und Bereinigung                   │
│  - Transformation für die UI                     │
└──────────────────────┬──────────────────────────┘
                       │  liest von
                       ▼
┌─────────────────────────────────────────────────┐
│  Datenquelle                                     │
│                                                   │
│  Heute:              Nächstes Semester:           │
│  products.json       fetch('/api/products')       │
│                                                   │
│  Die UI merkt von diesem Wechsel NICHTS.         │
└─────────────────────────────────────────────────┘