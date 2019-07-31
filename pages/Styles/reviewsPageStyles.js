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
    background: linear-gradient(
        to right,
        rgba(247, 247, 247, 1) 50%,
        rgba(247, 247, 247, 0.5) 70%,
        rgba(247, 247, 247, 0.1) 90%
      ),
      url("https://thetrustsearch.com/themes/watchdog/assets/images/green.png");
  }
  .reviewImgContainer {
    max-height: 156px;
    max-width: 250px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.1);
  }
  .ratingsColumn {
    display: flex;
  }
  .ratingsBadgeCont{
    flex-basis: 11%;
    margin-top: 1%;
  }
  .ratingsIndCont{
    flex-basis: 28.5%;
  }
  .reviewFlag{
    margin-top:0.5%;
    flex-basis:18%;
  }

  .reviewVerifiedBtn{
    margin-top: 1%;
    flex-basis: 18%;
  }
  .bigRatingInd{
    display:flex;
     flex-direction:column; 
     justify-content:center;
  }
  .bigRatingCaption{
    text-align:center;
    color:#fff;
    margin-top: 4%;
  }

  .reviewAnalysisReport{
    padding:1%;
    margin : 5% 0 5% 0;
  }

  .reviewAnalysisHeading{
    margin-bottom:3%;
  }

  .reviewAnalysisHeading h4{
    font-weight:400;
  }

  .reviewAnalysisHeading i{
    font-size:1.1rem;
    vertical-align:middle;
    margin-right:8px
  }
`;
