import Form from "../../components/form/Form";
import { useTranslation } from "react-i18next";
import "./login.css";

const Login = () => {
  const { t } = useTranslation("login");
  return (
    <div className="login-container">
      <Form headerText={t("title")} buttonText={t("login")} linkText={t("forgotPassword")} />
    </div>
  );
};

export default Login;