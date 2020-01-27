import css from "styled-jsx/css";

const styles = css`
  .alignRight {
    text-align: right;
  }

  .templateContainer {
    border: 1px solid black;
    padding: 15px;
    margin-top: 50px;
    padding: 30px;
  }

  .submitBtn {
    margin-top: 30px;
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

  .QRCodeStepsList li{
    padding:15px;
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
