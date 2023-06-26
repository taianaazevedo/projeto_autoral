import { TiArrowBackOutline } from "react-icons/ti";
import { StyledButtonBackToHome } from "./buttonStyled";
import { Link } from "react-router-dom";

export default function BackToHome() {
  return (
    <>
      <StyledButtonBackToHome>
        <Link to={"/home"} className="link-home">
          <p>Home</p>
          <TiArrowBackOutline size={20}/>
        </Link>
      </StyledButtonBackToHome>
    </>
  );
}
