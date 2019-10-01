import css from 'styled-jsx/css';

export default css`
  .footer {
    background: #111;
    color: #c0c0c0;
  }

  .footerContainerInner {
    max-width: 85%;
    margin: 0 auto;
    display: flex;
  }

  /*---- Footer top section styling -----*/
  .footerTopSection {
    border-bottom: 1px solid #484848;
    padding: 2%;
  }

  .footerTopLogoContainer {
    flex-basis: 60%;
  }

  :global(.footerTopLogo ){
    height: 46px;
    width: auto;
  }

  .footerTopSocialLinksContainer {
    display: flex;
    flex-basis: 20%;
    align-items: center;
  }

  .footerTopSocialLinksContainer > div {
    flex: 1;
    font-size: 1.2rem;
  }

  .footerTopSocialLinksContainer > div > a:link,
  .footerTopSocialLinksContainer > div > a:visited {
    text-decoration: none;
    color: #c0c0c0;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -ms-transition: all 0.2s;
    -o-transition: all 0.2s;
  }

  .footerTopSocialLinksContainer > div > a:hover,
  .footerTopSocialLinksContainer > div > a:active {
    color: #fff;
  }

  .footerTopLocalizationContainer {
    flex-basis: 20%;
    display: flex;
    justify-content: flex-end;
  }

  .footerTopLocalizationBtn {
    background-color: #444;
    color: #fff;
    border: 1px solid #444;
    padding: 9px 18px 9px 18px;
    transition: 0.4s all;
    -webkit-transition: 0.4s all;
    -moz-transition: 0.4s all;
    -ms-transition: 0.4s all;
    -o-transition: 0.4s all;
  }

  .footerTopLocalizationBtn:hover {
    background-color: #28b661;
    border: 1px solid #28b661;
  }

  /*------- Footer middle section styling ------*/
  .footerMiddleSection {
    padding: 5% 0 4% 0;
  }

  .footerMiddleSectionHeading {
    font-size: 18px;
    margin-bottom: 18%;
    color: #fff;
    font-weight: 400;
  }

  .footerMiddleSectionLinks {
    font-size: 0.9rem;
  }

  .footerMiddleSectionLinks div {
    margin: 4% 0 4% 0;
  }

  .footerMiddleSectionLinks a {
    text-decoration: none;
    color: #e0e0e0;
  }

  /*----- Styling the newsletter -------*/
  .emailInputBox {
    display: flex;
    align-items: stretch;
  }

  .emailInputBox div:first-child {
    flex-basis: 70%;
  }

  .emailInputBox div:nth-child(2) {
    flex-basis: 30%;
    margin-left: 2%;
  }

  .emailInputBox input {
    background: #262626;
    border: 1px solid #262626;
    padding: 2.5% 3% 2.5% 3%;
    width: 100%;
    color: #e0e0e0;
    outline: none;
  }

  .emailInputBox button {
    border: none;
    outline: none;
    padding: 9px 15px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    background: #28b661;
    color: #fff;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
  }

  .emailInputBox button:hover {
    background-color: #fff;
  }

  .emailInputBox button:hover i {
    color: #000;
  }

  /*---- Styling the footer bottom section ----*/
  .footerBottomSection {
    padding: 25px 0px;
    border-top: 1px solid #484848;
    font-size: 0.9rem;
  }

  /*------- Media queries for responsive design ---*/

  @media only screen and (max-width:1199px){
    .footerContainerInner {
      max-width:94.5%;
    }
  }

  @media only screen and (max-width: 1027px) {
    .footerContainerInner {
      flex-direction: column;
      max-width:85%;
    }
    .footerTopSocialLinksContainer > div {
      flex: 0;
      margin: 5% 2% 0 2%;
    }
    .footerTopLocalizationContainer {
      justify-content: flex-start;
      margin-top: 5%;
    }

    .footerMiddleSectionHeading {
      margin: 5% 0 5% 0;
    }
  }
`;
