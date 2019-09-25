import css from "styled-jsx/css";

export const authenticationPageStyles = css.global`
  .mainContainer {
    margin: 100px 0 30px 0;
  }

  .card {
    border: 1px solid #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 12%;
    background-color: #fff;
  }

  .cardHeading {
    margin-bottom: 20px;
  }

  .registerBtn {
    width: 100%;
    padding: 10px 30px;
    border: 1px solid #28b661;
    background: #28b661;
    color: #fff;
    font-weight: 400;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    cursor: pointer;
    transition: all 0.4s;
  }

  .registerBtn:hover {
    background: #30ab4a;
  }

  .registerBtn:disabled {
    border: 1px solid #baf0d0;
    background: #baf0d0;
  }

  .errorMsg {
    color: red;
    font-size: 14px;
    margin: 10px 0;
  }

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

  /* Facebook */
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

  /* Google */
  .loginBtn--google {
    /*font-family: "Roboto", Roboto, arial, sans-serif;*/
    background: #dd4b39;
  }

  .loginBtn--google:before {
    border-right: #bb3f30 1px solid;
    padding-right: 35px;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
      6px 6px no-repeat;
  }

  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background: #e74b37;
  }

  .forgotPasswordLink {
    display: block;
    margin-bottom: 10px;
  }

  .contactLink {
    margin-left: 5px;
    font-size: 16.5px;
  }
`;
