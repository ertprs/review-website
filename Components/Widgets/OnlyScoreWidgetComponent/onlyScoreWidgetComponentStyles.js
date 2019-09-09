import css from "styled-jsx/css";

export const onlyScoreWidgetComponentStyles = css`
  .widgetBox, .carouselWidgetBox {
    box-shadow: 0px 2px 4px #a1a1a1;
    padding: 7% 0 5% 0;
    height: 100%;
    max-width: 99%;
    margin: 0.5px auto;
    text-align: center;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
  }

  .carouselWidgetBox{
      box-shadow:none;
      padding:1% 0 0 0;
  }

  .ratingIndicator, .carouselRatingIndicator {
    margin: 2% 0 2% 0;
    display: block;
  }

  .carouselRatingIndicator{
    margin:2% 0 3% 0;
    display:block;
  }

  .smallRatingIndicator, .carouselSmallRatingIndicator {
    display: none;
  }

  .learnMoreLink {
    color: #21bc61;
    font-size: 1.2rem;
    text-decoration: underline;
  }

  .widgetImgContainer {
    height: 100px;
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .carouselWidgetImgContainer{
    height: 39px;
    width: 80%;
    margin:0 auto;
  }

  @media screen and (max-width:991px){
      .carouselRatingIndicator{
          display:none;
      }
      .carouselSmallRatingIndicator{
          display:block;
          margin-bottom:3%;
      }
  }

  @media screen and (max-width: 320px) {
    .ratingIndicator {
      display: none;
    }

    .smallRatingIndicator {
      display: block;
      margin: 2% 0 2% 0;
    }
    .widgetImgContainer {
      width: 80%;
      height: 75px;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 225px) {
    .widgetHeading {
      font-size: 1.2rem;
    }
    .widgetRating {
      font-size: 1.1rem;
    }
    .smallRatingIndicator {
      display: none;
    }
  }
`;
