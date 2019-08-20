import css from "styled-jsx/css";

export default css`
  .searchBoxContainer {
    display: flex;
    background: #fff;
    width: 85%;
    padding: 0.7% 0.7% 0.7% 1.2%;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
  }

  .searchBoxContainer > div:first-child {
    flex: 1;
  }

  .searchBoxInput {
    width: 100%;
    align-self: center;
  }

  .searchBoxInput input {
    width: 100%;
    border: none;
    outline: none;
    margin: 0;
  }

  .searchBoxInput input:link,
  .searchBoxInput input:visited,
  .searchBoxInput input:hover,
  .searchBoxInput input:active {
    outline: none;
  }

  .searchBtnContainer {
    flex: 0;
  }

  .searchBtn {
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
    transition:all 0.4s;
  }

  .searchBtn:hover{
    background:#30ab4a;
  }

  @media only screen and (max-width: 539px) {
    .searchBoxContainer {
      width: 100%;
      margin-top: 2%;
    }
  }
`;
