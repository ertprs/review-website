import css from "styled-jsx/css";

export const reviewListStyles = css`
  .reviewCard {
    border: 1px solid #d8d8d8;
    // box-shadow: 0 1px 2px #d8d8d8;
    margin: 20px 0px;
    background-color: #fff;
    border-radius: 5px;
  }

  .topBox {
    border-bottom: 1px solid #d8d8d8;
    padding: 2%;
    margin: 0;
  }

  .cardLink {
    font-size: 18px;
    cursor: pointer;
    font-weight: 550;
  }

  .cardLink:hover {
    color: #4084bd;
  }

  .userName {
    margin-top: 10px;
  }

  .source {
    margin-top: 10px;
    color: grey;
    font-size: 12px;
  }

  .dateContainer {
    display: flex;
    justify-content: flex-end;
  }

  .date {
    font-size: 14px;
  }

  .bottomBox {
    margin-top: 10px;
    padding: 0% 11%;
  }

  .bottomBoxInner {
    display: flex;
  }

  .footerLinks {
    padding: 0px 20px;
    cursor: pointer;
  }

  // .footerLinks::after {
  //     content: '';
  //     width: 20%;
  //     position: absolute;
  //     top: 100%;
  //     left: 0;
  //     display: none;
  // }

  .footerLinks:hover {
    color: #4084bd;
    border-bottom: 5px solid #4084bd;
  }

  // .footerLinks:hover.footerLinks::after {
  //     display: block;

  // }

  .icons {
    margin-right: 8px;
  }

  .replyCard {
    border: 1px solid #f3f3f3;
    background-color: #f7f7f7;
    border-radius: 0px 5px 5px 0px;
    transition: 0.5s;
  }

  .companyName {
    margin-top: 20px;
    margin-left: 30px;
  }

  .replyInputBox {
    margin-top: 20px;
  }

  .postReplyButton {
    width: auto;
    padding: 10px;
    border: 1px solid #28b661;
    background: #28b661;
    color: #fff;
    font-size: 14px;
    letter-spacing: 0.5px;
    font-weight: 400;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    cursor: pointer;
    transition: all 0.4s;
    margin-bottom: 20px;
  }

  .postReplyButton:disabled {
    border: 1px solid #baf0d0;
    background: #baf0d0;
  }

  .postReplyIcon {
    padding: 0px 8px;
    font-size: 15px;
  }
`;
