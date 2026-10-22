import "./customButton.css";
import type { ButtonProps } from "../../types/interface";

const CustomButton = ({ children, onClick, type = "submit" }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {children}
    </button>
  );
};

export default CustomButton;