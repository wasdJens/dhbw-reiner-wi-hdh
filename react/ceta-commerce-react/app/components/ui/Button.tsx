/**
 * Button – Universeller Button-Baustein
 *
 * DUMB COMPONENT: Bekommt alles über Props, weiß nichts über die Anwendung.
 * Kann überall verwendet werden: Warenkorb, Formulare, Navigation, etc.
 */

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size !== "md" ? `btn--${size}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
