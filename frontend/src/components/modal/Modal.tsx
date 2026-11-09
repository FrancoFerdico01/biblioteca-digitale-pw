import "./modal.css";
import type { ModalProps } from "../../types/interface";
import InputCustom from "../inputCustom/InputCustom";
import Brand from "../brand/Brand";
import { Link } from "react-router-dom";
import CustomButton from "../customButton/CustomButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, clearToken, getMe, login } from "../../services/api";
import { useTranslation } from "react-i18next";

const Modal = ({
  onClose,
  title,
  paragraph,
  adminLogin = false,
  actionLabel,
  actionTo,
  details,
  onConfirm,
  confirmLabel,
  confirmDisabled,
}: ModalProps) => {
  const { t } = useTranslation("modal");
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
        setError(t("adminOnly"));
        return;
      }
      navigation("/dashboard");
    } catch (err) {
      clearToken();
      setError(err instanceof ApiError ? err.message : t("unexpectedError"));
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
          {adminLogin ? (
            <div className="modal-inputs">
              <div>
                <InputCustom type="email" label={t("email")} value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
              </div>
              <div>
                <InputCustom type="password" label={t("password")} value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
              </div>
            </div>
          ) : actionTo || onConfirm ? null : (
            <div className="modal-links">
              <Link to="/login">{t("login")}</Link>
              <Link to="/register">{t("register")}</Link>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {onConfirm ? (
            <div className="modal-confirm-actions">
              <CustomButton type="button" onClick={onClose}>{t("cancel")}</CustomButton>
              <CustomButton type="button" onClick={onConfirm} disabled={confirmDisabled}>
                {confirmLabel}
              </CustomButton>
            </div>
          ) : adminLogin ? (
            <CustomButton onClick={handleLogin}>{t("login")}</CustomButton>
          ) : actionTo ? (
            <CustomButton onClick={() => navigation(actionTo)}>{actionLabel}</CustomButton>
          ) : (
            <CustomButton onClick={onClose}>{t("close")}</CustomButton>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
