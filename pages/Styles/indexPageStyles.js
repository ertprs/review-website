import css from 'styled-jsx/css';

export const indexPageStyles = css.global`
  .homeContainer {
    margin-top: 75.51px;
    height: 100vh;
    background: linear-gradient(
        to right,
        rgba(250, 250, 250, 1) 20%,
        rgba(250, 250, 250, 0.95) 50%,
        rgba(250, 250, 250, 0.1) 80%,
        rgba(250, 250, 250, 0) 100%
      ),
      url("/static/images/home-background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
  }

  .homeContainerInner {
    align-self: center;
    width: 85%;
    margin: -6% auto 0 auto;
  }

  .heroHeading{
    margin: 2% 0 2% 0;
  }

  .heroSubHeading {
    font-weight: lighter;
    line-height: 150%;
  }

  .heroSubHeadingMainText {
    font-weight: 600;
    color: #28b661;
    margin: 0 1%;
  }

  /*-------- Analyse btn styling --------*/
  .analyseBtn {
    background: #28b661;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    display: inline-block;
    padding: 6px 5px 6px 5px;
    border: 1px solid #28b661;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
  }

  /*------ WebStatItem styling --------*/
  .homeWebStatsContainer {
    display: flex;
  }
  .homeWebStatItem {
    flex: auto;
    flex-grow: 0;
    margin-right: 35px;
    padding-right: 35px;
    border-right: 1px solid #e0e0e0;
  }

  .homeWebStatItem:last-child {
    border-right-width: 0px;
  }

  /*----- Media queries for responsiveness to different screen sizes ----*/
  @media only screen and (max-width: 767px) {
    .homeWebStatsContainer {
      display: none;
    }
  }

  @media only screen and (max-width: 539px) {
    .homeContainerInner {
      width: 95%;
    }
  }
  }
  
`;