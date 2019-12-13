import css from "styled-jsx/css";

export const combinedReviewsWidgetStyles = css`
  .platformCardContainer {
    height: 75px;
    /* border: 1px solid #000; */
    /* box-shadow:0px 2px 4px #d8d8d8; */
    margin: 2%;
    padding: 10px;
    display: flex;
    flex: 1;
    cursor: pointer;
  }
  .platformCardContainer > div:first-child {
    flex-basis: 30%;
  }

  .platformCardContainer > div:last-child {
    flex-basis: 70%;
  }

  .textContainer h4 {
    margin-bottom: 4px;
  }

  .logoContainer {
    max-height: 50px;
    max-width: 50px;
    margin: 0 auto;
  }
  .logoContainer img {
    max-width: 100%;
    height: auto;
  }
  /*--------- Stats footer -------*/
  .statsFooterContainer {
    max-width: 87%;
    margin: 25px auto 0 auto;
    border-top: 2px solid #f5f5f5;
    padding-top: 25px;
  }
  .starRatingContainer {
    margin-left: -15px;
  }
  .totalReviewsTextContainer h4 {
    font-weight: lighter;
  }
  .bold {
    font-weight: bolder;
  }
  .footerFlex {
    display: flex;
  }
  .footerFlex > div:first-child {
    flex-basis: 65%;
  }
  .footerFlex > div:last-child {
    flex-basis: 35%;
  }
  .footerLogoContainer {
    height: auto;
    width: 170px;
    margin: 0 auto;
  }
  .footerLogoContainer img {
    max-width: 100%;
    height: auto;
  }
  .smallFooterContainer {
    display: none;
  }

  /*----------No reviews found container --------*/
  .noReviewsFoundContainer {
    padding: 50px;
    background: #f5f5f5;
    height: 100%;
  }
  .noReviewsFoundImageContainer {
    max-width: 250px;
    height: auto;
    margin: 0 auto;
  }
  .noReviewsFoundImageContainer img {
    max-width: 100%;
    height: auto;
  }
  .noReviewFoundTextContainer {
    margin-top: 25px;
    text-align: center;
  }

  /*------- Fetching box ---------*/
  .fetchingContainer {
    padding: 50px;
    background: #f5f5f5;
    height: 100%;
  }
  .fetchingImageContainer {
    max-width: 250px;
    height: auto;
    margin: 0 auto;
    text-align: center;
  }
  .fetchingImageContainer img {
    max-width: 100%;
    height: auto;
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }
  /* Standard syntax */
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .fetchingTextContainer {
    margin-top: 25px;
    text-align: center;
  }

  @media screen and (max-width: 1184px) {
    .starRatingContainer {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 1085px) {
    .totalReviewsTextContainer h4 {
      font-size: 1.1rem;
    }
    .textContainer {
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: 1054px) {
    .ratingContainer {
      display: none;
    }
    .footerFlex {
      display: none;
    }
    .smallFooterContainer {
      display: block;
      text-align: center;
    }
    .smallFooterText {
      display: inline-block;
    }
    .smallFooterImageContainer {
      display: inline-block;
      height: auto;
      width: 75px;
      margin-left: 15px;
    }
    .smallFooterImageContainer img {
      max-width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: 1024px) {
    .totalReviewsTextContainer h4 {
      font-size: 1.1rem;
    }
    .textContainer {
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: 460px) {
    .logoContainer {
      max-height: 30px;
      max-width: 30px;
      margin: 0 auto;
    }
    .platformCardContainer > div:first-child {
      flex-basis: 22%;
    }

    .platformCardContainer > div:last-child {
      flex-basis: 78%;
    }
    .textContainer h4 {
      font-size: 0.9rem;
      margin-bottom: 0;
      font-weight: bold;
    }
    .textContainer {
      font-size: 0.8rem;
    }
  }
`;
