import css from "styled-jsx/css";

export const googleLoginBtnStyles = css`
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
`;
