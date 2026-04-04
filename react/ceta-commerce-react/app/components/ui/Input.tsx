/**
 * Input – Textfeld-Baustein
 *
 * DUMB COMPONENT: Ein Eingabefeld mit Label und optionaler Fehlermeldung.
 */

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number" | "search";
  error?: string;
  required?: boolean;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
}: InputProps) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        className={`form-input ${error ? "form-input--error" : ""}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
