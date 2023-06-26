import { StyledMenu, UserInfo, PostTheme, Favorites } from "./menuStyle";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  function goToPostTheme(){
    navigate("/theme/create-theme")
  }

  function goToFavorites(){
    navigate("/favorites")
  }

  function goToMyProfile(){
    navigate("/my-profile")
  }

  return (
    <StyledMenu>
      <UserInfo onClick={goToMyProfile}>
        <img src={user.imgUrl} alt="user_image" />
        <p>Meus posts</p>
      </UserInfo>
      <Favorites onClick={goToFavorites}>
        <p>• Meus favoritos</p>
      </Favorites>
      <PostTheme onClick={goToPostTheme}>
        <p>• Postar um tema</p>
      </PostTheme>
    </StyledMenu>
  );
}
