import { useContext, useEffect, useState } from "react";
import {
  getFavorites,
  getThemeById,
  postFavorite,
} from "../../services/themeApi";
import { UserContext } from "../../contexts/userContext";
import { StyledThemeById } from "./themeByIdStyle";
import BackToHome from "../backToHome/buttonToHome";
import { BsBalloonHeart, BsBalloonHeartFill } from "react-icons/bs";

export default function ThemeById({ id }) {
  const { user } = useContext(UserContext);
  const [themeById, setThemeById] = useState([]);
  const [isMyFavorite, setIsMyFavorite] = useState(false);

  async function getThemeByIdApi() {
    try {
      const favorites = await getFavorites(user.token);
      const themeData = await getThemeById(user.token, id);
      const isFavorite = favorites.some(
        (favorite) => favorite.Theme.id === themeData.id
      );
      setThemeById(themeData);
      setIsMyFavorite(isFavorite);
    } catch (error) {
      alert("Houve um erro inesperado. Tente novamente");
    }
  }

  async function postMyFavorite() {
    try {
      await postFavorite(user.token, themeById.id);
      setIsMyFavorite(true);
    } catch (error) {
      alert("Houve um erro inesperado. Tente novamente");
    }
  }

  useEffect(() => {
    getThemeByIdApi();
  }, [id]);

  return (
    <>
      <StyledThemeById>
        <h1>Tema: {themeById?.title}</h1>
        <div className="author-post">
          <h2>
            Postado por: <span>{themeById?.User?.name}</span>
          </h2>
        </div>
        <div className="references">
          <p>Referências:</p>
          <div className="music">
            <p>
              Música:{" "}
              {themeById?.Song?.length > 0 ? (
                <span>{themeById?.Song[0]?.title}</span>
              ) : (
                <span>-</span>
              )}
            </p>
            <p>
              Cantor(a):{" "}
              {themeById?.Song?.length > 0 ? (
                <span>{themeById?.Song[0]?.performer}</span>
              ) : (
                <span>-</span>
              )}
            </p>
          </div>
          <div className="movie">
            <p>
              Filme:{" "}
              {themeById?.Movie?.length > 0 ? (
                <span>{themeById?.Movie[0]?.title}</span>
              ) : (
                <span>-</span>
              )}
            </p>
            <p>
              Onde assistir:{" "}
              {themeById?.Movie?.length > 0 ? (
                <span>{themeById?.Movie[0]?.streaming}</span>
              ) : (
                <span>-</span>
              )}
            </p>
          </div>
          <div className="serie">
            <p>
              Série:{" "}
              {themeById?.Serie?.length > 0 ? (
                <span>{themeById?.Serie[0]?.title}</span>
              ) : (
                <span>-</span>
              )}
            </p>
            <p>
              Onde assistir:{" "}
              {themeById?.Serie?.length > 0 ? (
                <span>{themeById?.Serie[0]?.streaming}</span>
              ) : (
                <span>-</span>
              )}
            </p>
          </div>
          <div className="book">
            <p>
              Livro:{" "}
              {themeById?.Book?.length > 0 ? (
                <span>{themeById?.Book[0]?.title}</span>
              ) : (
                <span>-</span>
              )}
            </p>
            <p>
              Autor(a):{" "}
              {themeById?.Book?.length > 0 ? (
                <span>{themeById?.Book[0]?.author}</span>
              ) : (
                <span>-</span>
              )}
            </p>
          </div>
          <div className="favorite">
            {isMyFavorite ? (
              <>
                <p>Salvo nos favoritos</p>
                <BsBalloonHeartFill size={25} style={{ color: "red" }} />
              </>
            ) : (
              <>
                <p>Favoritar</p>
                <BsBalloonHeart
                  size={25}
                  style={{ color: "#5d5d5d", cursor: "pointer" }}
                  onClick={postMyFavorite}
                />
              </>
            )}
          </div>
        </div>
      </StyledThemeById>
      <BackToHome />
    </>
  );
}
