import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { StyledHome } from "./homeStyle";
import logo from "../../assets/notebook.png";
import Theme from "../theme/theme";
import { UserContext } from "../../contexts/userContext";
import { getThemes } from "../../services/themeApi";

export default function HomePage() {
  const { user } = useContext(UserContext);
  const [themes, setThemes] = useState([]);

  async function getThemesApi() {
    try {
      const themesApi = await getThemes(user.token);
      setThemes(themesApi);
    } catch (error) {
      alert("Erro ao carregar os temas. Tente novamente.");
    }
  }

  useEffect(() => {
    getThemesApi();
  }, []);

  return (
    <>
      <StyledHome>
        <div className="logo">
          <img src={logo} alt="logo_img" />
          <p className="p1">Citação</p>
          <p className="p2">em Foco</p>
        </div>
      </StyledHome>
      {themes?.length > 0 ? (
        <Theme themes={themes} />
      ) : (
        <Alert>Ainda não há temas postados. Seja o primeiro!</Alert>
      )}
    </>
  );
}

const Alert = styled.p`
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  background-color: transparent;
  padding-top: 5rem;
  font-size: 1.2rem;
  text-align: center;
  color: #505050;
`;
