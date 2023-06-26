import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  background: rgb(255, 169, 82);
  background: linear-gradient(
    90deg,
    rgba(255, 169, 82, 1) 0%,
    rgba(255, 245, 146, 1) 50%,
    rgba(182, 212, 89, 1) 100%
  );
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .searchBar {
    width: 50%;
    background-color: transparent;
    display: block;
    position: relative;
    ul {
      position: absolute;
      top: 125%;
      left: 0;
      background-color: #ffffff;
      width: 100%;
      height: auto;
      border-radius: 5px;
      padding: 3px;
      font-size: 16px;
      font-weight: 400;
      color: #515151;
      li {
        border-radius: 5px;
        height: auto;
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        background-color: transparent;
        &:hover {
          background-color: #fff79c;
        }
        p {
          background-color: transparent;
        }
      }
    }
    input {
      color: #404040;
      font-size: 14px;
      font-weight: 700;
      width: 100%;
      height: 30px;
      border: none;
      border-radius: 5px;
    }
    input:focus {
      outline: none;
      background-color: transparent;
    }
  }
`;
