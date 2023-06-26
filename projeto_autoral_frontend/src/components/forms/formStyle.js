import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  .alert {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    color: #E5331E;
  }
  input {
    margin-top: 10px;
    width: 300px;
    height: 31px;
    background: #ffffff;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    box-shadow: 1px 1px 16px 0px rgba(0, 0, 0, 0.21);
  }
  button {
    margin-top: 15px;
    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
    width: 300px;
    height: 31px;
    background: #ffa438;
    border-radius: 5px;
    border: none;
    box-shadow: 1px 1px 16px 0px rgba(0, 0, 0, 0.21);
    cursor: pointer;
  }
`;
