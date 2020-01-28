import css from "styled-jsx/css";

const styles = css`
  .p_25 {
    padding: 25px;
  }

  .mt_25px {
    margin-top: 25px;
  }

  .mt_50 {
    margin-top: 50px;
  }

  .textCenter {
    text-align: center;
  }

  .btnContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .templateContainer {
    border: 1px solid black;
    padding: 15px;
    margin-top: 50px;
    padding: 30px;
  }

  .checkboxContainer {
    margin-top: 30px;
    text-align: center;
  }

  .submitBtn {
    margin-top: 10px;
    text-align: center;
  }

  .qrCodeContainer {
    max-width: 300px;
    height: auto;
    margin: 60px auto;
  }

  .qrCodeImg {
    max-width: 100%;
    height: auto;
  }

  .QRCodeStepsList li {
    padding: 15px;
  }

  .generateURLSpan {
    color: blue;
  }
  .generateURLSpan:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
export default styles;
