import styled from "styled-components";

export const StyledButtonBackToHome = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid #e85a0b;
  .link-home,
  p {
    font-family: "Gochi Hand";
    background-color: transparent;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #e85a0b;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    bottom: 30px;
    right: 30px;
  }

  @media (max-width: 480px) {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
`;
