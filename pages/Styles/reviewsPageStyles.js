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
    justify-content:center;
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

  .reviewDescription {
    margin-top: 3%;
    font-size: 0.9rem;
  }

  .reviewVideosContainer,
  .textualReviewsContainer {
    margin-bottom: 5%;
  }

  .reviewVideosHeader,
  .textualReviewHeader {
    margin-bottom: 5%;
  }

  .reviewVideosHeader i,
  .textualReviewHeader i {
    margin-right: 11px;
  }

  .reviewVideosHeader h5,
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

  @media only screen and (max-width: 1017px){
    .ratings{
      display:none;
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

    .bigRatingCaption{
      text-align:center;
    }

    .bigRatingCaption h3{
      font-size:1.5rem;
     
    }
  }
  @media only screen and (max-width: 768px) {
    .bigRatingInd {
      display: none;
    }
  }
  @media only screen and (max-width: 767px) {
    .domainDescRow {
      margin-top: 5%;
    }
  }

  @media only screen and (max-width: 390px) {
    .ratingsBadgeCont {
      flex-basis: 11%;
    }
    .ratingsIndCont {
      flex-basis: 50%;
      text-align:center;
    }
    .reviewFlag {
      flex-basis: 30%;
    }
    .reviewVerifiedBtn {
      display:none;
    }
  }

  @media only screen and (max-width: 320px) {
    .ratingsBadgeCont {
      flex-basis: 15%;
    }
    .ratingsIndCont {
      flex-basis: 80%;
      text-align:left;
    }
    .reviewFlag,  .reviewVerifiedBtn {
      display:none;
    }
  }
`;
