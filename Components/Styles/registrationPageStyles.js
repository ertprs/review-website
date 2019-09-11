import css from "styled-jsx/css";

export const registrationPageStyles = css.global`
  .card {
    border: 1px solid #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 12%;
    margin-top: 15%;
  }

  .registerBtn {
    padding: 10px 30px;
    border: 1px solid #28b661;
    background: #28b661;
    color: #fff;
    font-weight: 600;
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
    border: 1px solid #59da8d;
    background: #59da8d;
  }

  .errorMsg {
    color: red;
    font-size: 14px;
  }
`;
