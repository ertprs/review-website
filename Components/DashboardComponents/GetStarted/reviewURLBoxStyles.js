import css from "styled-jsx/css";

export const reviewURLBoxStyles = css`
  .reviewURLBox {
    padding: 25px;
    height: 163px;
  }
  .reviewURLBoxHeader {
    margin-bottom: 20px;
  }
  .reviewURLBoxContainerInner {
    display: flex;
  }
  .reviewURLBoxContainerInner div:first-child {
    flex-basis: 30%;
  }
  .reviewURLBoxContainerInner div:last-child {
    flex-basis: 100%;
    align-self: center;
    margin-left: 15px;
  }

  .reviewURLBoxImgContainer {
    max-width: 65px;
    height: auto;
  }
  .reviewURLBoxImgContainer img {
    max-width: 100%;
    height: auto;
  }

  @media screen and (max-width: 720px) {
    .reviewURLBoxImgContainer {
      display: none;
    }
    .reviewURLBoxHeader h4 {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  }
`;
