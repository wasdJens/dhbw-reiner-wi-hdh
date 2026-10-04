App (root.tsx)
├── Header
│ ├── Navigation
│ │ ├── NavLink ("Start")
│ │ ├── NavLink ("Produkte")
│ │ ├── NavLink ("Wartung")
│ │ └── NavLink ("Über Ceta")
│ └── CartBadge (itemCount)
├── <Outlet> ← aktive Route wird hier gerendert
│ ├── ProductsPage (smart) ← State: searchTerm
│ │ ├── PageHeader
│ │ ├── Input (Suche)
│ │ └── ProductGrid
│ │ ├── ProductCard (featured)
│ │ ├── ProductCard (featured)
│ │ └── ProductCard (featured)
│ ├── ProductDetailPage (smart) ← State: selectedVariantId
│ │ ├── VariantPicker
│ │ ├── FeatureList
│ │ └── Button "In den Warenkorb"
│ └── CartPage (smart)
│ ├── CartItemRow
│ ├── CartItemRow
│ └── CartSummary
└── Footer
