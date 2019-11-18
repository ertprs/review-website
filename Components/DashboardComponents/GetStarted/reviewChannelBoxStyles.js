import css from "styled-jsx/css";

export const  reviewChannelBoxStyles = css`
  .reviewChannelBox {
    padding: 25px;
  }
  .reviewChannelBoxHeader {
    margin-bottom: 40px;
  }
  .reviewBoxItemContainer {
    display: flex;
    margin-bottom:20px;
    box-shadow:0px 2px 4px #d8d8d8;
    padding:15px;
  }
  .reviewBoxItemContainer > div:first-child {
    flex-basis: 20%;
  }
  .reviewBoxItemContainer > div:last-child {
    flex-basis: 80%;
    align-self: center;
  }
  .reviewBoxItemLogoContainer {
    max-width: 60px;
    height: auto;
  }
  .reviewBoxItemLogoContainer img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;
