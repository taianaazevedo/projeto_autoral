import { useNavigate } from "react-router-dom";
import FormSignUp from "../forms/formSignUp";
import Logo from "../logo/logo";
import { StyledSignUp } from "./signUpStyle";

export default function SignUpPage() {
  const navigate = useNavigate();

  function navToSignIn(){
    navigate("/sign-in")
  }

  return (
    <StyledSignUp>
      <Logo />
      <FormSignUp />
      <p className="link-login" onClick={navToSignIn}>
        Já possui uma conta?
        <br />
        Faça login
      </p>
    </StyledSignUp>
  );
}