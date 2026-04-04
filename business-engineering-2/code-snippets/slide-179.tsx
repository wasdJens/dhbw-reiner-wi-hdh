// ✅ DUMB: Weiß nichts über die Welt. Zeigt nur an.
// Kann überall verwendet werden.

// app/components/ui/Button.tsx
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, variant = "primary", size = "md", onClick, disabled = false }: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// Verwendung überall in Ceta:
<Button label="Details ansehen" variant="outline" onClick={handleView} />
<Button label="In den Warenkorb" variant="primary" onClick={handleAdd} />
<Button label="Abbrechen" variant="ghost" onClick={handleCancel} />