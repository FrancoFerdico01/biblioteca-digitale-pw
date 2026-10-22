import Form from "../../components/form/Form";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <Form headerText="Accedi al tuo account" buttonText="Login" linkText="Hai dimenticato la password?" />
    </div>
  );
};

export default Login;