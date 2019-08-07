import css, { global } from "styled-jsx/css";

export const reviewPageStyles = css`
  .domainDescContainer {
    margin: 1.5% 0 2% 0;
  }
  .domainDesc {
    color: #6b6b6b;
    font-size: 1.1rem;
    margin-left: 4px;
  }
  .reviewHeaderContainer {
    margin-top: 75.51px;
    padding: 5%;
  }

  .reviewImgContainer {
    max-height: 156px;
    max-width: 250px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.1);
  }
  .ratingsColumn {
    display: flex;
  }
  .ratingsBadgeCont {
    flex-basis: 11%;
    margin-top: 1%;
  }
  .ratingsIndCont {
    flex-basis: 28.5%;
  }
  .reviewFlag {
    margin-top: 0.5%;
    flex-basis: 18%;
  }

  .reviewVerifiedBtn {
    margin-top: 1%;
    flex-basis: 18%;
  }
  .bigRatingInd {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .bigRatingCaption {
    color: #fff;
    margin-top: 4%;
  }

  .reviewAnalysisReport {
    padding: 1%;
    margin: 5% 0 5% 0;
  }

  .reviewAnalysisHeading {
    margin-bottom: 3%;
  }

  .reviewAnalysisHeading h4 {
    font-weight: 400;
  }

  .reviewAnalysisHeading i {
    font-size: 1.1rem;
    vertical-align: middle;
    margin-right: 8px;
  }

  .reviewShareBtnContainer {
    margin-bottom: 5%;
  }

  .reviewDescription {
    margin-top: 5%;
    font-size: 0.9rem;
  }

  .reviewVideosContainer,
  .reviewTrafficContainer,
  .reviewSocialContainer,
  .textualReviewsContainer {
    margin-bottom: 5%;
  }

  .reviewVideosHeader,
  .reviewTrafficHeader,
  .reviewSocialHeader,
  .textualReviewHeader {
    margin-bottom: 5%;
  }

  .reviewVideosHeader i,
  .reviewTrafficHeader i,
  .reviewSocialHeader i,
  .textualReviewHeader i {
    margin-right: 11px;
  }

  .reviewVideosHeader h5,
  .reviewTrafficHeader h5,
  .reviewSocialHeader h5,
  .textualReviewHeader h5 {
    font-weight: 400;
  }

  @media only screen and (max-width: 1199px) {
    .ratingsBadgeCont {
      flex-basis: 8%;
    }
    .ratingsIndCont {
      flex-basis: 33%;
    }
  }

  @media only screen and (max-width: 1017px) {
    .ratings {
      display: none;
    }
  }

  @media only screen and (max-width: 991px) {
    .ratingsBadgeCont {
      flex-basis: 11%;
    }
    .ratingsIndCont {
      flex-basis: 40%;
    }
    .reviewFlag {
      flex-basis: 24%;
    }

    .reviewVerifiedBtn {
      flex-basis: 25%;
    }

    .bigRatingCaption {
      text-align: center;
    }

    .bigRatingCaption h3 {
      font-size: 1.5rem;
    }

    .reviewStatsFlex {
      flex-direction: column;
    }

    .reviewStatsFlex > div {
      flex-basis: 100%;
      max-width: 100%;
    }

    .reviewStatsFlex > div:first-child {
      margin-bottom: 8%;
    }

    .reviewStatsFlex > div:nth-child(2) {
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media only screen and (max-width: 768px) {
    .bigRatingInd {
      display: none;
    }
    .reviewShareBtnContainer {
      margin-bottom: 12%;
    }
  }
  @media only screen and (max-width: 767px) {
    .domainDescRow {
      margin-top: 5%;
    }
    .reviewVideosHeader,
    .reviewTrafficHeader,
    .reviewSocialHeader,
    .textualReviewHeader {
      margin-bottom: 10%;
    }
  }

  @media only screen and (max-width: 390px) {
    .ratingsBadgeCont {
      flex-basis: 11%;
    }
    .ratingsIndCont {
      flex-basis: 50%;
      text-align: center;
    }
    .reviewFlag {
      flex-basis: 30%;
    }
    .reviewVerifiedBtn {
      display: none;
    }
  }

  @media only screen and (max-width: 370px) {
    .reviewsShareBtnCont {
      font-size: 0.9rem;
    }
  }

  @media only screen and (max-width: 342px) {
    .reviewsShareBtnCont {
      font-size: 0.8rem;
    }
  }

  @media only screen and (max-width: 320px) {
    .ratingsBadgeCont {
      flex-basis: 15%;
    }
    .ratingsIndCont {
      flex-basis: 80%;
      text-align: left;
    }
    .reviewFlag,
    .reviewVerifiedBtn {
      display: none;
    }
  }
`;
