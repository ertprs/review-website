import css from "styled-jsx/css";

export const aboutPageStyles = css`
  /*----- utility ----*/
  .mb {
    margin-bottom: 10%;
  }

  /*----- Hero section styling -------*/
  .aboutHeroContainer {
    background: url("/static/about/images/background_girl_2.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding-top: 2%;
    padding-bottom: 10%;
    margin-bottom: 5%;
    position: relative;
  }

  .aboutHeroLogoContainer {
    height: 100px;
    width: 200px;
  }

  .aboutHeroHeading {
    text-transform: uppercase;
  }

  .aboutHeroHeading .heading {
    font-size: 3.5rem;
    font-weight: 650;
  }

  .aboutHeroImage {
    height: 420px;
    width: 100%;
    text-align: center;
  }

  /*------- User problem section styling -------*/
  .userProblemContainer {
    /* margin: 10% 0 10% 0; */
    position: relative;
  }

  .userProblemImageContainer,
  .userProblemImageSmallContainer {
    max-height: 300px;
    max-width: 300px;
  }

  .userProblemImageSmallContainer {
    display: none;
  }

  .userProblemText {
    text-align: right;
  }

  .userProblemTextHeader {
    margin-bottom: 5%;
  }

  .userProblemTextHeader .heading1,
  .heading2 {
    margin-bottom: 0;
    font-weight: 400;
  }

  .userProblemTextBody {
  }

  /*---- User solution section styling ------*/
  .userSolutionContainer {
    margin-bottom: 14%;
  }

  .userSolutionHeader h1 {
    font-weight: lighter;
    font-weight: 400;
    margin-bottom: 2rem;
  }
  .userSolutionImageContainer {
    height: 100%;
    width: 100%;
    margin-top: 2%;
  }

  .userSolutionImageSmallContainer {
    display: none;
    height: auto;
    width: auto;
    margin: 0 auto;
    text-align: center;
  }

  /*----- Company problems section -----*/
  .companiesProblemContainer {
    /* margin: 15% 0 15% 0; */
  }
  .companiesProblemImgContainer {
    height: 100%;
    width: 100%;
  }

  .companiesProblemImgSmallContainer {
    display: none;
  }

  .companiesProblemHeader .heading1,
  .companiesProblemHeader .heading2 {
    margin-bottom: 0;
    font-weight: 400;
  }

  .companiesProblemText {
    text-align: right;
  }

  .companiesProblemBody {
    margin-top: 5%;
  }

  /*------- Trust help section ------*/
  .trustHelpContainer {
    margin-bottom: 5%;
  }

  .trustHelpHeader {
    margin-bottom: 15%;
  }

  .trustHelpHeader h1 {
    font-weight: 400;
  }

  .trustHelpImgContainer {
    height: 100%;
    width: 100%;
  }

  /*---- Investors section ----*/

  .investorsContainer {
    margin: 14% 0 0% 0;
  }

  .investorsHeader {
    text-align: right;
    margin-bottom: 10%;
  }

  .investorsHeader h1 {
    font-weight: 350;
    text-transform: uppercase;
  }

  .deskInvestorImgContainer {
    max-width: 100%;
    height: auto;
    text-align: center;
    margin: 0 auto 4% auto;
  }

  .investorMobile {
    display: none;
  }

  .investorBox {
    display: flex;
    max-width: 90%;
    margin: 2% auto;
  }

  .investorBoxImageContainer {
    max-width: 150px;
    height: auto;
    margin-right: 5%;
    flex-basis: 50%;
  }

  .investorBoxTextContainer {
    align-self: center;
    flex-basis: 40%;
  }

  .investorsInfo {
    margin-top: 5%;
  }

  /*--------- Desktop team section ---------*/
  .desktopTeamGridContainer {
    max-width: 80%;
    margin: 0 auto;
  }

  .desktopTeamSectionContainer {
    margin: 10% 0 10% 0;
  }

  .desktopTeamSectionHeader {
    margin-bottom: 5%;
  }
  .desktopTeamSectionHeader h1 {
    text-transform: uppercase;
    font-weight: 400;
  }

  /*-------- Register info section ------*/
  .registerInfoContainer {
    margin: 10% 0 0 0;
  }

  .registerImageContainer {
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  .registrationInfo {
    margin-top: 5%;
    text-align: center;
  }
  /*------ Styling the footer section ------*/
  .footer {
    margin: 5% 0 5% 0;
  }

  .footerImageContainer {
    height: 80px;
    width: 80px;
    margin: 0 auto;
  }

  /*------ Media queries ----*/

  @media screen and (max-width:991px){
    .desktopTeamGridContainer{
      max-width:100%;
      margin:0 auto;
    }
  }

  @media screen and (max-width: 767px) {
    .aboutHeroContainer {
      background: none;
    }

    .aboutHeroLogoContainer {
      margin-top: 5%;
      height: 50px;
    }

    .aboutHeroHeading {
      margin-top: 15%;
    }

    .aboutHeroHeading .heading {
      font-size: 2.4rem;
    }

    .aboutHeroImage {
      display: none;
    }

    /*--- user solution -----*/
    .userSolutionImageContainer {
      display: none;
    }
    .userSolutionImageSmallContainer {
      display: block;
      margin: 0 auto;
    }

    /*---- companies problem section ----*/
    .companiesProblemImgContainer {
      display: none;
    }

    .companiesProblemImgSmallContainer {
      height: 60%;
      width: 60%;
      margin: 0 auto;
      display: block;
    }

    /*------ trust help --------*/
    .trustHelpImgContainer {
      display: none;
    }

    .trustHelpHeader {
      margin-bottom: 8%;
    }

    /*----- Investor section ----*/
    .deskInvestorImgContainer {
      max-width: 150px;
      margin-bottom: 5%;
    }
  }

  @media screen and (max-width: 575px) {
    /*----- Investor section --------*/
    .investorDesktop {
      display: none;
    }

    .investorMobile {
      display: block;
    }
    .investorsInfo{
      font-size:0.8rem;
    }

    /*---- registeration info section------*/
    .registrationInfo{
      display:none;
    }

    /*------- Footer section -------*/
    .footer{
      margin:10% 0 10% 0;
    }
  }

  @media screen and (max-width: 475px) {
    /*---- user problem section -----*/
    .userProblemImageContainer {
      display: none;
    }
    .userProblemImageSmallContainer {
      display: block;
      margin: 0 auto 12% auto;
    }
    .userProblemTextHeader .heading1,
    .userProblemTextHeader .heading2 {
      font-size: 2.25rem;
    }
    .userProblemTextBody {
      font-size: 0.9rem;
    }

    /*----- User solution section -------*/
    .userSolutionHeader h1 {
      font-size: 2.25rem;
    }
    .userSolutionBody {
      font-size: 0.9rem;
    }

    /*----- company problem section -----*/
    .companiesProblemHeader .heading1,
    .companiesProblemHeader .heading2 {
      font-size: 2.2rem;
    }
    .companiesProblemBody {
      font-size: 0.9rem;
    }

    .companiesProblemImgSmallContainer {
      height: 80%;
      width: 80%;
    }

    /*----- Trust help section ------*/
    .trustHelpHeader h1 {
      font-size: 2rem;
    }
    /*---- Investors and partners section ------*/
    .investorsHeader h1 {
      font-size: 2.25rem;
    }
    .investorBox {
      display: flex;
      max-width: 99%;
      margin: 2.5% auto;
    }
  }

  @media screen and (max-width:375px){
    .registerImageContainer{
      max-width:95%;
    }

    /*---- footer ---*/
    .footer{
      margin:15% 0 12% 0;
    }
    .footerImageContainer{
      height:70px;
      width: 70px;
    }
  }
`;
