import type { InputCustomProps } from "../../types/interface";
import "./inputCustom.css";

const InputCustom = ({
  type,
  name,
  required,
  label,
  value,
  accept,
  onChange,
}: InputCustomProps) => {
  const fieldName = name ?? type;
  return (
    <div className="input-custom-container">
      <label className="input-custom-label" htmlFor={fieldName}>
        {label}:
      </label>
      <input
        placeholder={label}
        type={type}
        id={fieldName}
        name={fieldName}
        required={required}
        value={value}
        accept={accept}
        onChange={onChange}
        className="input-custom"
      />
    </div>
  );
};

export default InputCustom;
