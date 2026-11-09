import "./customButton.css";
import type { ButtonProps } from "../../types/interface";

const CustomButton = ({ children, onClick, type = "submit", disabled }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="button" disabled={disabled}>
      {children}
    </button>
  );
};

export default CustomButton;