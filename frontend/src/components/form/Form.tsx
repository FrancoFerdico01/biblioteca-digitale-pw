import Brand from "../brand/Brand";
import InputCustom from "../inputCustom/InputCustom";
import CustomButton from "../customButton/CustomButton";
import "./form.css";
import type { FormProps } from "../../types/interface";
import { useLocation } from "react-router-dom";

const Form = ({ headerText, buttonText, linkText }: FormProps) => {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <form className="form">
      <div className="form-header">
        <Brand />
        <p className="form-header-text">{headerText}</p>
      </div>
      <div className="form-body">
        {isLogin && (
          <>
            <div>
              <InputCustom type="email" required label="Email" />
            </div>
            <div>
              <InputCustom type="password" required label="Password" />
            </div>
          </>
        )}
        {isRegister && (
          <>
            <div>
              <InputCustom type="text" required label="Nome" />
            </div>
            <div>
              <InputCustom type="text" required label="Cognome" />
            </div>
            <div>
              <InputCustom type="email" required label="Email" />
            </div>
            <div>
              <InputCustom type="password" required label="Password" />
            </div>
          </>
        )}
      </div>
      <CustomButton type="submit">{buttonText}</CustomButton>
      <a className="form-link" href="">
        {linkText}
      </a>
    </form>
  );
};

export default Form;
