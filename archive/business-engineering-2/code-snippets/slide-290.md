Eingabe (JSON, Nutzereingabe, URL)
         │
         ▼
┌─────────────────────────┐
│  1. VALIDIERUNG         │  Ist der Datensatz gültig?
│                         │  Hat er alle Pflichtfelder?
│  "Darf das rein?"       │  Sind die Typen richtig?
└────────────┬────────────┘
             │ ✅ Gültig
             ▼
┌─────────────────────────┐
│  2. NORMALISIERUNG      │  Konsistente Formate erzwingen
│                         │  Leerzeichen trimmen
│  "In welcher Form?"     │  Groß-/Kleinschreibung angleichen
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. TRANSFORMATION      │  Rohdaten → UI-taugliche Struktur
│                         │  Felder umbenennen/ergänzen
│  "Was braucht die UI?"  │  Berechnete Werte hinzufügen
└────────────┬────────────┘
             │
             ▼
        Saubere Daten → Komponenten