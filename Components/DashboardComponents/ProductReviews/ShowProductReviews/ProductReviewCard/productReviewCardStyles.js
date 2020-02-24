import css from "styled-jsx/css";

export default css`
  /*----- common styles -----*/
  .logoFlex,
  .reviewDetailsFlex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  /*----- Card container styles ----*/
  .cardContainer {
    padding: 25px;
  }

  /*------ Review Details styles ------*/
  .reviewerName,
  .ratingContainer,
  .dateContainer {
    margin: 12px 0 12px 0;
  }

  .ratingContainer {
    margin-left: -2px;
  }

  /* ---- Logo styles ----*/
  .logoFlex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .logoContainer {
    height: 50px;
    width: 50px;
    text-align: center;
    margin: 0 auto;
  }
  .logoContainer img {
    max-width: 100%;
    height: auto;
  }
`;
