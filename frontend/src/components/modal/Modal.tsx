import "./modal.css";
import type { ModalProps } from "../../types/interface";
import InputCustom from "../inputCustom/InputCustom";
import Brand from "../brand/Brand";
import { Link } from "react-router-dom";
import CustomButton from "../customButton/CustomButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ onClose, title, paragraph }: ModalProps) => {
  const navigation = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

const handleLogin = () => {
  if (
    values.email === import.meta.env.EMAIL_ADMIN &&
    values.password === import.meta.env.PASSWORD_ADMIN
  ) {
    navigation("/dashboard");
  }
};


  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Brand />
        <div className="modal-text">
          <h2>{title}</h2>
          <p>{paragraph}</p>
        </div>
        <div className="modal-actions">
          {title === "Area Riservata" ? (
            <div className="modal-inputs">
              <div>
                <InputCustom type="email" label="Email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
              </div>
              <div>
                <InputCustom type="password" label="Password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
              </div>
            </div>
          ) : (
            <div className="modal-links">
              <Link to="/login">Accedi</Link>
              <Link to="/register">Registrati</Link>
            </div>
          )}
          {title === "Area Riservata" ? (
            <CustomButton onClick={handleLogin}>Accedi</CustomButton>
          ) : (
            <CustomButton onClick={onClose}>Chiudi</CustomButton>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
