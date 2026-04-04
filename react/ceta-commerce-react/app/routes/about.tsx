/**
 * About Page – Über Ceta
 *
 * SMART COMPONENT (minimal): Statischer Inhalt über das Unternehmen.
 * Demonstriert eine einfache informative Seite.
 */

import { PageHeader } from "../components";

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="Über Ceta"
        description="Spezialisierte Ausrüstung für die Baubranche – direkt und digital."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h2 className="heading-3 mb-md">Unsere Geschichte</h2>
          <p className="mb-lg" style={{ lineHeight: "var(--line-height-relaxed)" }}>
            Ceta wurde gegründet, weil Baufirmen bessere Ausrüstung verdienen –
            und einen einfacheren Weg, sie zu bekommen. Traditionell kaufen
            Bauunternehmen ihre Spezialgeräte über langsame Vertriebskanäle,
            unübersichtliche Kataloge und endlose Telefonate. Ceta ändert das.
          </p>

          <h2 className="heading-3 mb-md">Was uns unterscheidet</h2>
          <div className="grid grid--3 mb-xl">
            <div className="card">
              <div className="card__body">
                <h3 className="heading-4 mb-sm">🛒 Online-First</h3>
                <p className="text-sm text-muted">
                  Bestellen Sie Ausrüstung so einfach wie bei jedem anderen
                  Online-Shop. Keine Vertriebsgespräche, keine Wartezeiten.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card__body">
                <h3 className="heading-4 mb-sm">🔧 Wartung inklusive</h3>
                <p className="text-sm text-muted">
                  Als einziger Anbieter im Markt bieten wir Wartung direkt über
                  den Webshop an. Anfrage stellen, Status tracken, fertig.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card__body">
                <h3 className="heading-4 mb-sm">📊 Transparent</h3>
                <p className="text-sm text-muted">
                  Klare Preise, klare Varianten, klare Features. Sie sehen genau
                  was Sie bekommen – ohne versteckte Kosten.
                </p>
              </div>
            </div>
          </div>

          <h2 className="heading-3 mb-md">Unsere Produkte</h2>
          <p className="mb-lg" style={{ lineHeight: "var(--line-height-relaxed)" }}>
            Wir konzentrieren uns auf drei Produktlinien, die wir wirklich gut
            machen: Sicherheit (CetaCore), Vermessung (CetaLevel) und
            Baustellenüberwachung (CetaGuard). Jedes Produkt gibt es in drei
            Varianten – von der Grundausstattung bis zur Enterprise-Lösung mit
            allen Features.
          </p>

          <h2 className="heading-3 mb-md">Kontakt</h2>
          <p style={{ lineHeight: "var(--line-height-relaxed)" }}>
            Ceta GmbH
            <br />
            Musterstraße 42
            <br />
            70174 Stuttgart
            <br />
            <br />
            info@ceta-commerce.de
            <br />
            +49 711 123 456 0
          </p>
        </div>
      </section>
    </div>
  );
}
