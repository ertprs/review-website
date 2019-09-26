import css from "styled-jsx/css";

export const newAnalysisCardStyles = css`
  .cardContainer {
    /* display: flex;
        text-align:center;
        padding: 20px;
        border-bottom:1px solid #d8d8d8; */
    display: flex;
    text-align: left;
    padding: 15px;
    border-bottom: 1px solid #f1f1f1;
    text-transform: capitalize;
  }
  .cardLeftItem {
    flex: 1;
    text-align: left;
    font-weight: bold;
  }
  .cardItemRight {
    flex: 1;
    text-align: right;
  }

  @media screen and (max-width: 991px) and (min-width: 768px) {
    .cardContainer {
      flex-direction: column;
    }
    .cardItemRight {
      flex: 1;
      text-align: left;
      margin:6px 0 6px 0;
    }
  }
`;
