import styled from "styled-components";

export const StyledHome = styled.main`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  margin-top: 75px;
  align-items: center;
  z-index: 1;
  .logo {
    margin: 0 auto;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    .p1 {
      font-family: "Gochi Hand";
      font-weight: 400;
      font-size: 28px;
      text-align: center;
      color: #e85a0b;
    }
    .p2 {
      margin-left: 6px;
      font-family: "Gochi Hand";
      font-weight: 400;
      font-size: 28px;
      text-align: center;
      color: #768420;
    }
  }
`;
