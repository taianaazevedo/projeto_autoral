import styled from "styled-components";

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 85px;
  .p1 {
    font-family: "Gochi Hand";
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    text-align: center;
    color: #e85a0b;
  }
  .p2 {
    font-family: "Gochi Hand";
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 20px;
    text-align: center;
    color: #768420;
  }
  img {
    width: 100px;
    height: 100px;
  }

  .scale-in-center {
    animation: scale-in-center 1s;
  }
  @keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
`;
