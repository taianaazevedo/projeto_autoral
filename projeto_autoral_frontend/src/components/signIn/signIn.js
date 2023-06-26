import { useContext } from "react";
import FormSignIn from "../forms/formSignIn";
import Logo from "../logo/logo";
import { StyledSignIn } from "./signInStyle";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function navToSignUp(){
    navigate("/sign-up")
  }

  return (
    <StyledSignIn>
      <Logo />
      <FormSignIn setUser={setUser} />
        <p className="link-sign-up" onClick={navToSignUp}>
          Ainda não tem uma conta?
          <br />
          Cadastre-se
        </p>
    </StyledSignIn>
  );
}
