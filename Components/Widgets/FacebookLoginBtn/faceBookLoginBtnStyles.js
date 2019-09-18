import css from "styled-jsx/css";

export const faceBookLoginBtnStyles = css`
  .loginBtn {
    margin-top: 10px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    padding: 0px 15px 0px 46px;
    border: none;
    text-align: center;
    line-height: 34px;
    white-space: nowrap;
    border-radius: 0.2em;
    font-size: 14px;
    color: #fff;
    font-weight: 400;
    word-spacing: 1px;
    cursor:pointer;
  }

  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }

  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }
  .loginBtn--facebook {
    background-color: #4c69ba;
    background-image: linear-gradient(#4c69ba, #3b55a0);
    /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
    text-shadow: 0 -1px 0 #354c8c;
  }

  .loginBtn--facebook:before {
    border-right: #364e92 1px solid;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png")
      6px 6px no-repeat;
  }

  .loginBtn--facebook:hover,
  .loginBtn--facebook:focus {
    background-color: #5b7bd5;
    background-image: linear-gradient(#5b7bd5, #4864b1);
  }
`;
