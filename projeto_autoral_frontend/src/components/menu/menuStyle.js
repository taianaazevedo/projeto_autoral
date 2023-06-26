import styled from "styled-components";

export const StyledMenu = styled.nav`
  position: fixed;
  top: 50px;
  z-index: 2;
  background-color: #ffe195;
  width: 100%;
  max-width: 300px;
  height: 30vh;
  border-radius: 0px 0px 5px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  animation: scale-in-ver-top 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @keyframes scale-in-ver-top {
    0% {
      -webkit-transform: scaleY(0);
      transform: scaleY(0);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
      opacity: 1;
    }
  }
  p {
    font-family: "Gochi Hand";
    background-color: transparent;
    font-weight: 200;
    font-size: 20px;
    color: #505050;
    margin-left: 8px;
  }
`;

export const MenuBase = styled.li`
  margin-left: 7px;
  display: flex;
  align-items: center;
  width: 95%;
  height: 50px;
  background: #fff2cf;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #fff79c;
  }
`;

export const UserInfo = styled(MenuBase)`
  img {
    margin-left: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

export const PostTheme = styled(MenuBase)``;
export const Favorites = styled(MenuBase)``;
