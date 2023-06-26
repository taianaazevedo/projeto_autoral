import { Link } from "react-router-dom";
import { StyledPage } from "./pageStyle";
import img1 from "../../assets/writting.svg";
import img2 from "../../assets/thinking.svg";

export default function Page() {
  return (
    <>
      <StyledPage>
        <div className="header">
          <div className="name">
            <p className="p1">Citação </p>
            <p className="p2">em Foco</p>
          </div>
          <div className="buttons">
            <Link to={"/sign-in"} className="link">
              <span>Entre</span>
            </Link>
            <Link to={"/sign-up"} className="link">
              <span>Cadastre-se</span>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="text">
            <h1>
              Compartilhe e conheça novas
              <br />
              referências para sua redação!
            </h1>
            <p>
              Citação em Foco é uma plataforma colaborativa de compartilhamento
              de referências que podem ser usadas na sua redação. Aqui, você
              pode dar e receber dicas dos mais diversos tipos, e ainda
              aproveita para conhecer novos filmes, séries, livros e músicas!
            </p>
          </div>
          <div className="images">
            <img src={img1} className="img1" alt="img" />
            <img src={img2} className="img2" alt="img" />
          </div>
        </div>
      </StyledPage>
    </>
  );
}
