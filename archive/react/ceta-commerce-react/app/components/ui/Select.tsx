/**
 * Select – Dropdown-Baustein
 *
 * DUMB COMPONENT: Ein Auswahlfeld mit Label und optionaler Fehlermeldung.
 */

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
}: SelectProps) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <select
        className={`form-input ${error ? "form-input--error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
