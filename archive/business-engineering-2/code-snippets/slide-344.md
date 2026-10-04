Entwickler       →  Code pushen
                        │
                        ▼
                 ┌──────────────┐
                 │ CI-Pipeline  │
                 │              │
                 │ 1. Build     │  Kompiliert der Code?
                 │ 2. Lint      │  Stilfehler?
                 │ 3. Tests     │  Alle Tests grün?
                 │ 4. Security  │  Bekannte Schwachstellen?
                 └──────┬───────┘
                        │
               ┌────────┴────────┐
               │                 │
            ✅ Alles OK       ❌ Fehler
               │                 │
               ▼                 ▼
        Deploy auf            Stopp.
        Staging/Prod.         Entwickler wird
                              benachrichtigt.
                              Kein Deploy.