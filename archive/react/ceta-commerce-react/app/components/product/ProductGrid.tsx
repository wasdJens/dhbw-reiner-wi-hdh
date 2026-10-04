/**
 * ProductGrid – Raster-Layout für Produktkarten
 *
 * DUMB COMPONENT: Verwendet Component Composition – die Kinder (children)
 * werden im Grid-Layout angeordnet. Das Grid weiß nicht WAS drin ist.
 */

interface ProductGridProps {
  children: React.ReactNode;
}

export function ProductGrid({ children }: ProductGridProps) {
  return <div className="grid grid--3">{children}</div>;
}
