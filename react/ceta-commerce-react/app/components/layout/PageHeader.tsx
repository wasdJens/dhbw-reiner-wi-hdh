/**
 * PageHeader – Seitenüberschrift mit optionaler Beschreibung
 *
 * DUMB COMPONENT: Wird auf jeder Unterseite als einheitlicher Kopfbereich verwendet.
 */

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="container">
        <h1 className="page-header__title">{title}</h1>
        {description && (
          <p className="page-header__description">{description}</p>
        )}
      </div>
    </div>
  );
}
