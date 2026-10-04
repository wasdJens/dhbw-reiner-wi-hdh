/**
 * Footer – Fußzeile der Anwendung
 *
 * DUMB COMPONENT: Statischer Inhalt, keine Props nötig.
 */

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">
            Ceta<span>.</span>
          </div>
          <p className="footer__text mt-sm">
            Spezialisierte Ausrüstung für die Baubranche
          </p>
        </div>
        <p className="footer__text">
          © {new Date().getFullYear()} Ceta GmbH – Alle Rechte vorbehalten
        </p>
      </div>
    </footer>
  );
}
