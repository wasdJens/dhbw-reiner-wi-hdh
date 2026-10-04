/**
 * Statische Produktdaten für Ceta Commerce
 *
 * Diese Daten simulieren eine Datenbank oder API-Antwort.
 * TODO: In einem späteren Semester durch fetch('/api/products') ersetzen.
 *
 * Ceta verkauft drei Produkte:
 * 1. CetaCore – Smart Safety Helmet
 * 2. CetaLevel – Precision Laser Measurement System
 * 3. CetaGuard – Autonomous Site Security System
 */

import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "ceta-core",
    name: "CetaCore",
    slug: "ceta-core",
    category: "Sicherheit",
    shortDescription: "Smarter Schutzhelm mit Kommunikation und Sensorik",
    description:
      "Der CetaCore revolutioniert die Baustellen-Sicherheit. Integrierte Kommunikation, Sensoren zur Aufprallerkennung und optionale biometrische Überwachung schützen Ihre Mitarbeiter in Echtzeit. Von der einfachen Push-to-Talk-Kommunikation bis hin zum vollständigen Gesundheits-Monitoring – wählen Sie die Variante, die zu Ihrem Bedarf passt.",
    imageUrl: "/images/ceta-core.jpg",
    variants: [
      {
        id: "ceta-core-basic",
        tier: "basic",
        name: "CetaCore Basic",
        price: 249,
        features: [
          "Zertifizierter Industrieschutzhelm",
          "Push-to-Talk Kommunikation",
          "Aufprallerkennung mit Alarm",
          "8 Stunden Akkulaufzeit",
          "Wetterfest (IP54)",
        ],
        inStock: true,
      },
      {
        id: "ceta-core-pro",
        tier: "pro",
        name: "CetaCore Pro",
        price: 449,
        features: [
          "Alle Basic-Features",
          "Aktive Geräuschunterdrückung",
          "LED-Statusanzeigen",
          "Sturzerkennung mit automatischem Notruf",
          "12 Stunden Akkulaufzeit",
          "Wetterfest (IP67)",
        ],
        inStock: true,
      },
      {
        id: "ceta-core-enterprise",
        tier: "enterprise",
        name: "CetaCore Enterprise",
        price: 799,
        features: [
          "Alle Pro-Features",
          "Echtzeit-Biometrie-Monitoring (Puls, Temperatur)",
          "GPS-Tracking & Geofencing",
          "Integration in Flottenmanagement",
          "24 Stunden Akkulaufzeit",
          "5 Jahre Garantie",
        ],
        inStock: true,
      },
    ],
  },
  {
    id: "ceta-level",
    name: "CetaLevel",
    slug: "ceta-level",
    category: "Vermessung",
    shortDescription:
      "Präzisions-Laservermessungssystem für die Baustelle",
    description:
      "CetaLevel bringt Vermessungsgenauigkeit auf jede Baustelle. Vom einfachen Punktlaser für schnelle Messungen bis zum vollständigen 3D-Mapping-System – CetaLevel passt sich Ihren Anforderungen an. Bluetooth-Export und Cloud-Synchronisation machen die Datenverarbeitung nahtlos.",
    imageUrl: "/images/ceta-level.jpg",
    variants: [
      {
        id: "ceta-level-basic",
        tier: "basic",
        name: "CetaLevel Basic",
        price: 189,
        features: [
          "Punktlaser mit ±1mm Genauigkeit",
          "Manuelle Ablesung über Display",
          "Entfernungsmessung bis 50m",
          "Integrierte Wasserwaage",
          "Robustes Aluminiumgehäuse",
        ],
        inStock: true,
      },
      {
        id: "ceta-level-pro",
        tier: "pro",
        name: "CetaLevel Pro",
        price: 379,
        features: [
          "Alle Basic-Features",
          "Automatische Entfernungs- und Winkelberechnung",
          "Bluetooth-Export an Smartphone/Tablet",
          "Entfernungsmessung bis 100m",
          "Flächen- und Volumenberechnung",
          "USB-C Schnellladung",
        ],
        inStock: true,
      },
      {
        id: "ceta-level-enterprise",
        tier: "enterprise",
        name: "CetaLevel Enterprise",
        price: 699,
        features: [
          "Alle Pro-Features",
          "3D-Mapping & Punktwolken-Scan",
          "Cloud-Synchronisation in Echtzeit",
          "Multi-Punkt-Kalibrierung",
          "Entfernungsmessung bis 200m",
          "API-Zugang für BIM-Integration",
          "Inkl. Stativ und Transportkoffer",
        ],
        inStock: false,
      },
    ],
  },
  {
    id: "ceta-guard",
    name: "CetaGuard",
    slug: "ceta-guard",
    category: "Sicherheitstechnik",
    shortDescription:
      "Autonomes Baustellenüberwachungssystem – 24/7 Schutz",
    description:
      "CetaGuard schützt Ihre Baustelle rund um die Uhr. Die containerisierten Sensoreinheiten erkennen Bewegungen, überwachen Perimeter und alarmieren bei Auffälligkeiten. Von einfacher Bewegungserkennung bis hin zur KI-gestützten Anomalieerkennung mit direkter Anbindung an Rettungsdienste.",
    imageUrl: "/images/ceta-guard.jpg",
    variants: [
      {
        id: "ceta-guard-basic",
        tier: "basic",
        name: "CetaGuard Basic",
        price: 599,
        features: [
          "Bewegungserkennung im Umkreis von 30m",
          "SMS- und E-Mail-Benachrichtigungen",
          "Solarbetrieben mit Backup-Akku",
          "Wetterfest (IP66)",
          "Einfache Montage ohne Stromanschluss",
        ],
        inStock: true,
      },
      {
        id: "ceta-guard-pro",
        tier: "pro",
        name: "CetaGuard Pro",
        price: 1199,
        features: [
          "Alle Basic-Features",
          "HD-Kamera-Integration mit Nachtsicht",
          "Perimeter-Mapping & Zonendefinition",
          "Live-Stream über Web-Dashboard",
          "Bewegungserkennung bis 80m",
          "Sirene und Lichtabschreckung",
        ],
        inStock: true,
      },
      {
        id: "ceta-guard-enterprise",
        tier: "enterprise",
        name: "CetaGuard Enterprise",
        price: 2499,
        features: [
          "Alle Pro-Features",
          "KI-gestützte Anomalieerkennung",
          "Automatische Rettungsdienst-Integration",
          "360°-Überwachung mit Schwenk-Kameras",
          "Bewegungserkennung bis 150m",
          "Zentrale Verwaltung mehrerer Standorte",
          "SLA mit 4h Reaktionszeit",
        ],
        inStock: true,
      },
    ],
  },
];
