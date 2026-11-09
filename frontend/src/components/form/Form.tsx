import Brand from "../brand/Brand";
import InputCustom from "../inputCustom/InputCustom";
import CustomButton from "../customButton/CustomButton";
import "./form.css";
import type { FormProps } from "../../types/interface";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { ApiError, getMe, login, register } from "../../services/api";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../i18n/errorMessage";

const Form = ({ headerText, buttonText, linkText }: FormProps) => {
  const { t } = useTranslation("form");
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<ApiError | "unexpected" | null>(null);

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    try {
      if (isRegister) {
        await register({
          first_name: String(data.get("first_name")),
          last_name: String(data.get("last_name")),
          email,
          phone: String(data.get("phone")),
          password,
        });
        // Dopo la registrazione facciamo subito il login per ottenere il token
      }
      await login(email, password);
      const me = await getMe();
      navigate(me.is_admin ? "/dashboard" : "/");
    } catch (err) {
      setError(err instanceof ApiError ? err : "unexpected");
    }
  };

  return (
    <form className="form" onSubmit={isLogin || isRegister ? handleSubmit : undefined}>
      <div className="form-header">
        <Brand />
        <p className="form-header-text">{headerText}</p>
      </div>
      <div className="form-body">
        {isLogin && (
          <>
            <div>
              <InputCustom type="email" required label={t("email")} />
            </div>
            <div>
              <InputCustom type="password" required label={t("password")} />
            </div>
          </>
        )}
        {isRegister && (
          <>
            <div>
              <InputCustom type="text" name="first_name" required label="Nome" />
            </div>
            <div>
              <InputCustom type="text" name="last_name" required label="Cognome" />
            </div>
            <div>
              <InputCustom type="email" required label={t("email")} />
            </div>
            <div>
              <InputCustom type="tel" name="phone" required label="Numero di telefono" />
            </div>
            <div>
              <InputCustom type="password" required label={t("password")} />
            </div>
          </>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error === "unexpected" ? t("unexpectedError") : getErrorMessage(error)}</p>}
      <CustomButton type="submit">{buttonText}</CustomButton>
      <a className="form-link" href="">
        {linkText}
      </a>
    </form>
  );
};

export default Form;
