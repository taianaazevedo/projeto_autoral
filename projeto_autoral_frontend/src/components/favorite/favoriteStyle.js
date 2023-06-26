import styled from "styled-components";

export const StyledFavorite = styled.main`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  margin-top: 75px;
  align-items: center;
  z-index: 1;
  h1 {
    font-family: "Gochi Hand";
    font-weight: 400;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 1.8rem;
    color: #5d5d5d;
    text-align: center;
  }
`;

export const StyledBox = styled.div`
  background-color: white;
  width: 50%;
  height: auto;
  margin: 35px auto;
  border-radius: 10px;
  border: 1px solid #f2f091;
  p {
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
    background-color: transparent;
    padding-top: 1rem;
    font-size: 1.2rem;
    text-align: center;
    color: #505050;
    padding-bottom: 10px;
  }
  .user-info {
    background-color: transparent;
    display: flex;
    align-items: center;
    padding-top: 10px;
    margin-left: 10px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    h1 {
      font-family: "Nunito";
      background-color: transparent;
      font-weight: 700;
      padding-top: 10px;
      font-size: 1.1rem;
      margin-left: 10px;
      color: #768420;
    }
  }
  .options {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-right: 15px;
    padding-bottom: 10px;
    .delete, span {
        margin-left: 10px;
      display: flex;
      align-items: center;
      background-color: transparent;
      font-size: 15px;
      font-weight: 400;
      color: #f0690e;
    }
    .link-to {
      background-color: transparent;
      font-size: 15px;
      font-weight: 400;
      color: #f0690e;
      text-decoration: none;
    }
    .link-to:hover,
    .delete:hover, span:hover {
      color: #768420;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 90%;
    height: auto;
    margin: 30px auto;
  }
`;
