/**
 * Badge – Kleine Kennzeichnung / Label
 *
 * DUMB COMPONENT: Zeigt einen farbigen Tag an.
 * Wird z.B. für Produktkategorien, Status-Anzeigen und Tier-Labels verwendet.
 */

interface BadgeProps {
  label: string;
  variant?:
    | "primary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral";
}

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{label}</span>;
}
