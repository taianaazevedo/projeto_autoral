import styled from "styled-components";

export const StyledThemeById = styled.article`
  width: 50%;
  height: auto;
  margin: 75px auto;
  h1 {
    background-color: white;
    border-radius: 10px;
    font-weight: 700;
    padding: 10px;
    font-size: 1.5rem;
    color: #5d5d5d;
    text-align: center;
  }

  .references,
  .music,
  .book,
  .movie,
  .serie {
    background-color: white;
    border-radius: 10px;
    color: #768420;
    padding: 10px;
    font-weight: 600;
    margin-top: 5px;
    font-size: 1.2rem;
    p {
      background-color: transparent;
      margin-top: 5px;
    }
    span {
      color: #5d5d5d;
      background-color: transparent;
      font-size: 1.2rem;
    }
  }
  .favorite {
    margin-top: 10px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      color: #5d5d5d;
      font-size: 1rem;
      margin-right: 5px;
    }
  }
  .author-post {
    background-color: white;
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px;
    font-size: 1.2rem;
    h2 {
      background-color: transparent;
      color: #768420;
      font-weight: 600;
      margin-top: 5px;
    }
    span {
      color: #5d5d5d;
      background-color: transparent;
      font-size: 1.2rem;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 90%;
    height: auto;
    margin: 65px auto;
  }
`;
