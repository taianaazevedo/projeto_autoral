import { styled } from "styled-components";

export const StyledReferences = styled.div`
  margin: 45px auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h1 {
    font-family: "Gochi Hand";
    font-weight: 400;
    margin-left: 10px;
    margin-right: 10px;
    background-color: transparent;
    font-size: 1.8rem;
    text-align: center;
    color: #505050;
    padding-bottom: 10px;
  }

  @media (min-width: 481px) and (max-width: 1000px) {
    width: 90%;
    height: auto;
  }

  @media (min-width: 100px) and (max-width: 480px) {
    width: 90%;
    height: auto;
    margin: 10px auto;
  }
`;

export const StyledForm = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  p {
    font-family: "Gochi Hand";
    background-color: transparent;
    color: #505050;
    font-size: 1.4rem;
    font-weight: 400;
  }
  form {
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .alert {
      margin-top: 5px;
      font-size: 15px;
      font-weight: 600;
      text-align: center;
      color: #e5331e;
      background-color: transparent;
    }
    input {
      height: 31px;
      background: #ffffff;
      border-radius: 5px;
      border: none;
      font-size: 15px;
      box-shadow: 1px 1px 16px 0px rgba(0, 0, 0, 0.21);
      outline: none;
    }
    button {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: #ffffff;
      width: 15%;
      height: 31px;
      background: #ffa438;
      border-radius: 5px;
      border: none;
      box-shadow: 1px 1px 16px 0px rgba(0, 0, 0, 0.21);
      cursor: pointer;
    }
  }
  @media (min-width: 481px) and (max-width: 1000px) {
    width: 90%;
  }

  @media (min-width: 100px) and (max-width: 480px) {
    width: 90%;
    margin: 10px auto;
    form {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      input {
        width: 90%;
        margin-top: 7px;
      }
      button {
        margin-top: 10px;
        width: 30%;
      }
    }
  }
`;
