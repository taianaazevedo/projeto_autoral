import { StyledBox } from "./favoriteStyle";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { deleteFavorite } from "../../services/themeApi";

export default function FavoriteBox({ favorites, setFavorites, user }) {
  async function deleteFav(id) {
    try {
      await deleteFavorite(user.token, id);
      alert("Excluído com sucesso!");
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== id)
      );
    } catch (error) {
      alert("Houve um erro. Tente novamente");
    }
  }

  return (
    <>
      {favorites.map((fav) => {
        return (
          <StyledBox key={fav.id}>
            <div className="user-info">
              <img src={fav.Theme.User.imgUrl} alt="user_img" />
              <h1>{fav.Theme.User.name}</h1>
            </div>
            <p>{fav.Theme.title}</p>
            <div className="options">
              <div className="delete" onClick={() => deleteFav(fav.id)}>
                <BsTrash size={16} />
                <span>Excluir</span>
              </div>
              <Link to={`/theme/${fav.Theme.id}`} className="link-to">
                Ver mais ➔
              </Link>
            </div>
          </StyledBox>
        );
      })}
    </>
  );
}
