import css from "styled-jsx/css";

export const businessPageStyles = css`
  /*--- utility classes ----*/
  .capitalize {
    text-transform: uppercase;
  }
  /*---- Business hero section ----*/
  .businessHeroContainer {
    display: flex;
    justify-content: center;
    height: auto;
    width: 100%;
    background-image: url("/static/business/index/images/background_image.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
  }

  .businessHeroSection {
    margin:10% 0 32% 0;
  }

  .businessHeroLogoContainer {
    /* display:flex;
        justify-content:center; */
    margin-bottom: 9%;
  }
  .businessHeroLogo {
    height: auto;
    width: 245px;
    margin: 0 auto;
  }

  .businessHeroLogo img {
    max-width: 100%;
    height: auto;
  }

  .businessHeroHeading {
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: bolder;
  }

  .businessHeroSubHeading {
    font-weight: 350;
    text-transform: uppercase;
    font-size: 1.47rem;
  }

  .businessSearchboxLabel {
    text-align: center;
    margin: 8% 0 6% 0;
    font-size: 1.2rem;
  }

  .businessSearchBoxContainer {
    width: 75%;
    margin: 0 auto;
  }

  /*---- Business HERO section END----*/

  /*---- Business Info section ----*/

  .businessInfoContainer, .businessSolutionContainer{
    margin-top: 5%;
    margin-bottom: 18%; 
  }

  .businessInfoHeader,
  .whyToHeader {
    text-align: right;
    margin: 2% 0 8% 0;
    padding-right: 5%;
  }
  .businessInfoHeader h2,
  .businessSolutionHeader h2,
  .whyToHeader h2 {
    font-weight: 360 !important;
    font-size: 2.5rem;
  }
  .businessInfoHelpPoint {
    margin-bottom: 10%;
  }

  /*------- Business Solution section ----*/
  .businessSolutionHeader {
    text-align: left;
    margin-bottom: 3.5%;
  }
  .businessSolutionHeader h2 {
    font-size: 2.2rem;
  }
  .businessSolutionSubHeader {
    margin: 2% 0 2% 0;
  }
  .businessSolutionSubHeader p {
    font-size: 1.05rem;
    font-weight: 475;
    margin-bottom: 5%;
  }

  /*----- why to section -----*/

  .whyToHeader {
    margin: 3% 0 8% 0;
  }

  .whyToHeader h2 {
    font-size: 2.2rem;
  }

  .whyToNumber {
    text-align: center;
  }

  .whyToNumber .number {
    font-weight: bolder;
    font-size: 4.5rem;
    vertical-align: baseline;
  }

  .whyToNumber .symbol {
    margin-left: 5%;
    font-size: 2.6rem;
  }

  .whyToText {
    font-size: 0.8rem;
    text-align: center;
  }

  /*------ Subscription plan cards   -------*/
  .subscriptionPlanCardsContainer{
    margin:25% 0 10% 0;
  }

  /*-----  Arrange a meeting Btn ----*/
  .arrangeMeetingBtnContainer{
    text-align:center;
    margin-bottom:5%;
  }
  .arrangeMeetingBtn{
    padding:1.5% 6% 1.5% 6%;
    border-radius:50px;
    border-top:1px solid #00a7f6;
    border-bottom:1px solid #00d350;
    border-right:1px solid #00a7f6;
    border-left:1px solid #00a7f6;
    outline:none;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    background: linear-gradient(to bottom right, rgba(0,167,246,0.9) 20%, rgba(0,211,80,0.95));
    transition:all 0.4s;
    -webkit-transition: all 0.4s;
    cursor:pointer;
  }

  .arrangeMeetingBtn:link, .arrangeMeetingBtn:visited, .arrangeMeetingBtn:hover, .arrangeMeetingBtn:active{
    outline:none;
  }

  /*------- Footer styles ---------*/
  .footerLogoContainer{
    text-align:center;
    height:90px;
    width:90px;
    margin:3% auto 5% auto;
  }

  .footerLogoContainer img{
    max-width:100%;
    height:auto;
  }


  /*---- Media queries ----*/


  @media screen and (max-width:768px){
    /*---- Business info section ----*/
    .businessInfoHeader{
      margin-bottom:10%;
    }
  }

  @media screen and (max-width:767px){
    /*---- Business info section ----*/
    .businessInfoHeader{
      margin-bottom:10%;
    }
    .businessSolutionCombinedImg{
      display:none;
    }

    /*---- Business solution section ----*/
    .businessSolutionSubHeader{
      margin-bottom:6%;
    }
    .businessSolutionSubHeader p{
      font-size:1rem;
    }

    /*---- Whyto section ----*/
    .whyToNumberBox{
      margin-bottom:8%;
    }

    .whyToNumber .symbol{
      margin-left:3%;
      font-size:2.3rem;
    }
  }

  @media screen and (max-width:590px){

    /*---- Business hero section ----*/
    .businessHeroSection{
      margin-bottom:17%;
    }

    .businessHeroLogoContainer{
      margin-bottom:7.5%;
    }
   
    .businessHeroLogo{
      margin:0 0 0 3%;
      width:200px;
    }

    .businessHeroHeadingsContainer{
      max-width:90%;
      margin:0 auto;
    }

    .businessHeroHeading{
      font-size:2.3rem;
      margin:0 0 4.5% 0;
    }
    .businessHeroSubHeading{
      font-size:1.2rem;
      margin:0 0 5.2% 0;
    }
    .businessSearchboxLabel{
      text-align:left;
      max-width:90%;
      margin: 0 auto;
      font-size:1.1rem;
    }

    .businessSearchBoxContainer{
      width:90%;
      margin: 4% auto;
    }
  }

  @media screen and (max-width:520px){
    /*---- WhyTo section ----*/
    .whyToHeader{
      text-align:center;
    }
    .whyToHeader h2{
      font-size:2.05rem;
    }
  }

  @media screen and (max-width:363px){
    /*---- WhyTo section ----*/
    .whyToHeader{
      text-align:right;
    }
  }

  @media screen and (max-width:490px){
    /*---- Business info section ----*/
    .businessInfoHeader h2{
      font-size:2rem;
      margin-bottom:15%;
    }
  }

  @media screen and (max-width:417px){
    .businessSolutionHeader{
      margin-bottom:7%;
    }

    .businessSolutionHeader h2{
      font-size:2.1rem;
    }

    .businessSolutionSubHeader{
      margin-bottom:10%;
    }
  }
`;
