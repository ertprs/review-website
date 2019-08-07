import css from "styled-jsx/css";

export const shareBtnStyles = css`
  .shareBtn {
    background: #28b661;
    display: inline-block;
    padding: 1% 2%;
    border-radius: 2.5px;
    transition: all 0.4s;
    text-align: center;
  }
  .shareBtn i {
    opacity: 0;
    transition: all 0.4s;
  }

  .shareBtn:hover {
    padding-left: 1%;
  }

  .shareBtn:hover i {
    opacity: 1;
    padding-left: 4%;
  }

`;
