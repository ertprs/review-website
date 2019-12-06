import css from "styled-jsx/css";

export const reviewURLBoxStyles = css`
  .reviewURLBox {
    padding: 25px;
    height:261.13px;
  }
  .reviewURLBoxHeader {
    margin-bottom: 55px;
  }
  .reviewURLBoxContainerInner {
    display: flex;
  }
  .reviewURLBoxContainerInner div:first-child {
    flex-basis: 35%;
  }
  .reviewURLBoxContainerInner div:last-child {
    flex-basis: 65%;
    align-self:center;
    margin-left:20px;
  }

  .reviewURLBoxImgContainer {
    max-width: 100px;
    height: auto;
  }
  .reviewURLBoxImgContainer img {
    max-width: 100%;
    height: auto;
    border-radius:10px;
  }

  @media screen and (max-width: 720px) {
    .reviewURLBoxImgContainer {
      display: none;
    }
    .reviewURLBoxHeader h4 {
      font-size: 1.1rem;
      margin-bottom: 35px;
    }
  }
`;
