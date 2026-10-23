import type { InputCustomProps } from "../../types/interface";
import "./inputCustom.css";

const InputCustom = ({ type, required, label, value, onChange }: InputCustomProps) => {

  return (
    <>
    <label className="input-custom-label" htmlFor={type}>{label}:</label>
    <input placeholder={label} type={type} id={type} name={type} required={required} value={value} onChange={onChange} className="input-custom" />
    </>
  )
}

export default InputCustom