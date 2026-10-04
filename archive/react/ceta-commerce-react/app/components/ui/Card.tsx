/**
 * Card – Container-Baustein mit optionalem Bild
 *
 * DUMB COMPONENT: Eine visuelle Karte die beliebigen Inhalt aufnehmen kann.
 * Verwendet Component Composition: children werden als Inhalt gerendert.
 */

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({ children, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick} role={onClick ? "button" : undefined}>
      {children}
    </div>
  );
}

/** Bildbereich der Karte */
export function CardImage({ src, alt }: { src: string; alt: string }) {
  return <img className="card__image" src={src} alt={alt} />;
}

/** Inhaltsbereich der Karte */
export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card__body">{children}</div>;
}

/** Fußzeile der Karte */
export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card__footer">{children}</div>;
}
