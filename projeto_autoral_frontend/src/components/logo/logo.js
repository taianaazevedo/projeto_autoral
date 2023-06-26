import logo from "../../assets/notebook.png";
import { StyledLogo } from "./logoStyle"

export default function Logo() {
  return (
    <StyledLogo>
      <img src={logo} alt="logo" className="scale-in-center" />
      <p className="p1">Citação</p>
      <p className="p2">em Foco</p>
    </StyledLogo>
  );
}
