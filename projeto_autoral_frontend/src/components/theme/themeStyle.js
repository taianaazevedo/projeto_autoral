import styled from "styled-components";

export const Base = styled.article`
  background-color: white;
  width: 50%;
  height: auto;
  margin: 45px auto;
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
      background-color: transparent;
      font-weight: 700;
      padding-top: 10px;
      font-size: 1.1rem;
      margin-left: 10px;
      color: #768420;
    }
  }
  .see-more {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 15px;
    padding-bottom: 10px;
    .link-to {
      background-color: transparent;
      font-size: 15px;
      font-weight: 400;
      color: #f0690e;
      text-decoration: none;
    }
    .link-to:hover {
      color: #768420;
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
export const StyledTheme = styled(Base)``;

export const StyledBox = styled(Base)`
  .user-info {
    justify-content: space-between;
  }
  .delete {
    background-color: transparent;
    display: flex;
    align-items: center;
    margin-right: 15px;
    color: #f0690e;
  }
  .see-more {
    margin-top: 10px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    margin-left: 15px;
    padding-bottom: 10px;
  }
  .link-to,
  span {
    margin-left: 10px;
    display: flex;
    align-items: center;
    background-color: transparent;
    font-size: 15px;
    font-weight: 400;
    color: #f0690e;
  }
  span:hover,
  .delete:hover {
    color: #768420;
    cursor: pointer;
  }
`;

export const Alert = styled.p`
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  background-color: transparent;
  padding-top: 5rem;
  font-size: 1.2rem;
  text-align: center;
  color: #505050;
`;

export const Title = styled.h1`
  font-family: "Gochi Hand";
  font-weight: 400;
  margin-left: 10px;
  margin-right: 10px;
  background-color: transparent;
  padding-top: 5rem;
  font-size: 1.8rem;
  text-align: center;
  color: #505050;
`;

export const StyledEdit = styled.main`
  margin: 80px auto 30px auto;
  width: 50%;
  h1 {
    font-family: "Gochi Hand";
    font-weight: 400;
    margin-left: 10px;
    margin-right: 10px;
    background-color: transparent;
    padding-top: 1rem;
    font-size: 1.8rem;
    text-align: center;
    color: #505050;
    padding-bottom: 10px;
  }
  .theme,
  .edit-theme,
  .music,
  .edit-music,
  .movie,
  .edit-movie,
  .serie,
  .edit-serie,
  .book,
  .edit-book {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 10px;
  }
  p {
    background-color: transparent;
    font-size: 1.2rem;
    text-align: center;
    color: #505050;
  }
  button {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
    width: 13%;
    height: 31px;
    background: #ffa438;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  .edit-theme {
    margin-top: 10px;
    input {
      width: 80%;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #768420;
    }
  }
  .edit-music,
  .edit-movie,
  .edit-serie,
  .edit-book {
    margin-top: 10px;
    input {
      width: 40%;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #768420;
    }
  }
  @media (min-width: 481px) and (max-width: 800px) {
    width: 90%;
  }

  @media (min-width: 100px) and (max-width: 480px) {
    width: 90%;
    button {
      width: 20%;
    }
    .edit-theme,
    .edit-music,
    .edit-movie,
    .edit-serie,
    .edit-book {
      padding: 10px;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 5px;
      margin-top: 10px;
      button {
        margin-top: 5px;
        width: 20%;
      }
      input {
        margin-top: 5px;
        width: 90%;
       }
    }
  }
`;
