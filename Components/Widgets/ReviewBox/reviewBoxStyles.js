import css from "styled-jsx/css";

export const reviewBoxStyles = css`
  .reviewBox {
    padding: 20px;
    margin: 2%;
    box-shadow: 0px 2px 7px #ddd;
    height:159px;
    background:#fff;
  }
  .reviewVideoBox {
    padding: 0;
    margin: 2%;
  }

  .reviewHeader {
    display: flex;
  }

  .reviewHeader > div {
    flex-basis: 1;
  }
  .reviewHeader .reviewHeaderDate {
    text-align: right;
    font-size: 0.78rem;
    flex:1;
  }

  .reviewHeaderTitle {
    font-weight: bold;
    text-transform:capitalize;
    font-family: 'Open Sans', sans-serif;
    font-size:14px;
    color:#333333;
  }

  .reviewRatings {
    margin: 1.5% 0 2% 0;
  }

  .videoReviewRatings {
    margin: 0;
  }

  .reviewText {
    text-align: left;
    font-size: 12.5px;
    line-height:1.6;
    color:#666666;
  }

  /*----------- Media queries -----------*/
  @media screen and (max-width:765px){
    .reviewText {
      font-size:12px;
    }
    .reviewHeaderTitle {
      font-size:13px;
    }
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
