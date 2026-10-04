/**
 * TextArea – Mehrzeiliges Textfeld
 *
 * DUMB COMPONENT: Ein Textarea mit Label und optionaler Fehlermeldung.
 */

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  required = false,
}: TextAreaProps) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <textarea
        className={`form-input ${error ? "form-input--error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
