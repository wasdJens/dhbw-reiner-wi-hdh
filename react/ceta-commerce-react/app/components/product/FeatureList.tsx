/**
 * FeatureList – Liste von Produkt-Features
 *
 * DUMB COMPONENT: Zeigt eine Liste von Features mit Häkchen-Icons an.
 */

interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="feature-list">
      {features.map((feature) => (
        <li key={feature} className="feature-list__item">
          <span className="feature-list__icon">✓</span>
          {feature}
        </li>
      ))}
    </ul>
  );
}
