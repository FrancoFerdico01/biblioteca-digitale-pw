import "./modal.css";
import type { ModalProps } from "../../types/interface";
import InputCustom from "../inputCustom/InputCustom";
import Brand from "../brand/Brand";
import { Link } from "react-router-dom";
import CustomButton from "../customButton/CustomButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, clearToken, getMe, login } from "../../services/api";

const Modal = ({
  onClose,
  title,
  paragraph,
  actionLabel,
  actionTo,
  details,
  onConfirm,
  confirmLabel,
  confirmDisabled,
}: ModalProps) => {
  const navigation = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Il controllo admin avviene sul backend: le credenziali non stanno nel frontend
  const handleLogin = async () => {
    setError("");
    try {
      await login(values.email, values.password);
      const me = await getMe();
      if (!me.is_admin) {
        clearToken();
        setError("Accesso riservato all'amministratore");
        return;
      }
      navigation("/dashboard");
    } catch (err) {
      clearToken();
      setError(err instanceof ApiError ? err.message : "Errore imprevisto");
    }
  };


  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Brand />
        <div className="modal-text">
          <h2>{title}</h2>
          <p>{paragraph}</p>
          {details}
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
          ) : actionTo || onConfirm ? null : (
            <div className="modal-links">
              <Link to="/login">Accedi</Link>
              <Link to="/register">Registrati</Link>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {onConfirm ? (
            <div className="modal-confirm-actions">
              <CustomButton type="button" onClick={onClose}>Annulla</CustomButton>
              <CustomButton type="button" onClick={onConfirm} disabled={confirmDisabled}>
                {confirmLabel}
              </CustomButton>
            </div>
          ) : title === "Area Riservata" ? (
            <CustomButton onClick={handleLogin}>Accedi</CustomButton>
          ) : actionTo ? (
            <CustomButton onClick={() => navigation(actionTo)}>{actionLabel}</CustomButton>
          ) : (
            <CustomButton onClick={onClose}>Chiudi</CustomButton>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
