import css from "styled-jsx/css";

const whatsAppMsgStyle = css`
  $inputRow: #f5f1ee;

  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: "Roboto", sans-serif;
  }

  .app {
    display: flex;
    flex-direction: column;
    float: right;
    height: 300px;
    width: 100%;
    margin-top: 20px;
  }

  .time {
    font-size: 11px;
    color: rgba(0, 0, 0, 0.45);
    position: absolute;
    right: 0.25em;
    bottom: 0.25em;
  }

  .message {
    position: relative;
    display: inline-block;
    padding: 0.5em 4em 0.5em 0.5em;
    border-radius: 0.46875em;
    box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
    width: 100%;
  }

  .row {
    margin-bottom: 0.75em;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
  }

  .in {
    background-color: #fff;
  }

  .out {
    background-color: #dcf8c6;
  }

  .container {
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    flex-direction: column;
    position: relative;
    background-color: #e5ddd5;
    flex: 1 1 0;
    padding: 1em 9%;
  }

  .tile {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.06;
    background: url(http://res.cloudinary.com/keiwo/image/upload/v1498803497/whatsapp-bg_dpw6kf.png);
  }

  .link {
    color: #34b7f1;
  }
`;

export default whatsAppMsgStyle;
