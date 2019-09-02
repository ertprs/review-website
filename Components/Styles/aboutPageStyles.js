import css from "styled-jsx/css";

export const aboutPageStyles = css`
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
    margin: 10% 0 22% 0;
    position:relative;
  }

  .userProblemImageContainer {
    max-height: 400px;
    max-width: 400px;
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
    margin-bottom: 5%;
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

  /*----- Company problems section -----*/
  .companiesProblemContainer {
    margin: 15% 0 15% 0;
  }
  .companiesProblemImgContainer {
    height: 100%;
    width: 100%;
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
  .trustHelpContainer{
        margin-bottom:5%;
    }

    .trustHelpHeader{
        margin-bottom:15%;
    }

    .trustHelpHeader h1{
        font-weight:400;
    }

    .trustHelpImgContainer{
        height:100%;
        width:100%;
    }

    /*---- Investors section ----*/

    .investorsContainer{
        margin: 20% 0 10% 0;
    }

    .investorsHeader{
        text-align:right;
        margin-bottom:10%;
    }

    .investorsHeader h1{
        font-weight:350;
        text-transform:uppercase;
    }
    .investorsInfo{
        margin-top: 5%;
    }

    /*--------- Desktop team section ---------*/
    .desktopTeamGridContainer{
      max-width:80%;
      margin:0 auto;
    }

    .desktopTeamSectionContainer{
        margin:10% 0 10% 0;
    }

    .desktopTeamSectionHeader{
      margin-bottom: 5%;
    }
    .desktopTeamSectionHeader h1{
        text-transform:uppercase;
        font-weight:400;
    }

    /*-------- Register info section ------*/
    .registerInfoContainer{
      margin:10% 0 0 0;
    }

    .registerImageContainer{
      max-width:80%;
      margin:0 auto;
      text-align:center;
    }

    .registerationInfo{
      margin-top:5%;
      text-align:center;
    }
    /*------ Styling the footer section ------*/
    .footer{
      margin: 5% 0 5% 0;
    }

    .footerImageContainer{
      height:80px;
      width:80px;
      margin:0 auto;
    }
`;
