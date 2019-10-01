import css from "styled-jsx/css";

export const reviewBoxStyles = css`
  .reviewBox {
    padding: 2% 4% 2% 4%;
    margin: 2%;
    box-shadow: 0px 2px 4px #999;
    height:159px;
  }
  .reviewVideoBox {
    padding: 0;
    margin: 2%;
  }

  .reviewHeader {
    display: flex;
  }

  .reviewHeader > div {
    flex-basis: 50%;
  }
  .reviewHeader .reviewHeaderDate {
    text-align: right;
    font-size: 0.9rem;
  }

  .reviewHeaderTitle {
    font-weight: 500;
  }

  .reviewRatings {
    margin: 1.5% 0 2% 0;
  }

  .videoReviewRatings {
    margin: 0;
  }

  .reviewText {
    text-align: justify;
    font-size: 0.9rem;
    word-break:break-all;
  }

  /*---------- Trust don't trust icon container -------------*/
  .trustDontTrustIconContainer{
    display:flex;
    align-items:stretch;
  }

  .trustDontTrustIconContainer >div{
    flex-basis:50%;
  }

  .trustIconGreen{
    color:green;
  }

  .trustIconRed{
    color:#ff7043;
  }

  @media screen and (max-width: 210px) {
    .reviewHeaderDate{
      display:none;
    }
  }
`;
