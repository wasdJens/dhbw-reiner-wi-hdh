# Toolbox – Referenz

**Toolbox · Bauteile für das Web.** Das Lernprojekt, das Studierende Kapitel für Kapitel aufbauen: eine Website, die Web-Patterns dokumentiert – gebaut mit genau diesen Patterns.

## Ansehen

`index.html` im Browser öffnen (Doppelklick). Kein Server, keine Installation, kein JavaScript.

## Struktur

```
toolbox/
├── README.md
├── design.md                ← festgeschriebenes Design-System
├── index.html               ← Startseite: alle Patterns nach Kategorie
├── patterns/
│   ├── html-grundgeruest.html
│   ├── landmarks.html
│   ├── ueberschriften.html
│   ├── listen.html
│   ├── links.html
│   ├── tabellen.html
│   ├── breadcrumbs.html
│   ├── aktuelle-seite.html
│   ├── bilder.html
│   ├── responsive-images.html
│   ├── label-fehlermeldung.html
│   ├── selektoren.html
│   ├── box-model.html
│   ├── cascade-layers.html
│   ├── custom-properties.html
│   ├── progressive-enhancement.html
│   ├── flexbox.html
│   ├── seitenlayout.html
│   ├── auto-fill-grid.html
│   ├── media-queries.html
│   ├── clamp.html
│   ├── container-queries.html
│   ├── design-tokens.html
│   ├── oklch.html
│   ├── light-dark.html
│   ├── akkordeon.html
│   ├── popover-menue.html
│   └── skip-link.html
└── assets/
    ├── css/
    │   ├── main.css         ← einzige eingebundene Datei, legt @layer-Reihenfolge fest
    │   ├── tokens.css       ← alle Farben, Schriften, Abstände
    │   ├── base.css         ← Schriften, Reset, nackte HTML-Elemente
    │   ├── layout.css       ← Header, Sidebar ab 64rem, Inhalt, Footer
    │   ├── components.css   ← Bausteine mit Klassen (.demo, .code, .pager, .skip-link …)
    │   └── overrides.css    ← eigene Gestaltung (freiwillig), letzte Ebene
    ├── fonts/               ← selbst gehostete Schriften + Lizenzen (SIL OFL)
    └── img/                 ← Bilder der Demos: eigene Grafik und eigene Screenshots (CC0 1.0)
```

