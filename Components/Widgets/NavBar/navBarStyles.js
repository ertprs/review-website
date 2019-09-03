import css from "styled-jsx/css";

export default css`
  .navbarContainer {
    display: flex;
  }
  .logoContainer {
    flex-basis: 17%;
  }

  .logoContainer :global(img), .logoContainer :global(amp-img){
    height: 42px;
    width: auto;
  }

  .primaryLinksContainer {
    display: flex;
    flex-basis: 63%;
  }

  .primaryLinksContainer > div {
    margin: 0.5% 2% 0 2%;
  }

  .secondaryLinksContainer {
    display: flex;
    flex-basis: 20%;
  }

  .secondaryLinksContainer > div {
    margin: 0.5% 0% 0 0%;
  }

  .secondaryLinksContainer i {
    color: #666;
  }

  /*------ Styling the links ---------*/
  .primaryLinksContainer :global(a),
  .secondaryLinksContainer :global(a) {
    color: #555;
    text-decoration: none;
  }

  /*-------- Styling the ham burger menu icon and button ---------*/
  .menuIconContainer {
    align-self: center;
    display: none;
  }

  .menuBtn {
    border: none;
    outline: none;
    height: 35px;
    width: 35px;
    background: transparent;
  }

  .menuBtn:hover,
  .menuBtn:active {
    outline: none;
  }

  .menuBtn i {
    font-size: 1.3rem;
  }

  /*------ Media queries for responsive web design -----*/

  @media only screen and (max-width: 1120px) {
    .primaryLinksContainer {
      align-items: center;
    }
    .secondaryLinksContainer {
      align-items: center;
    }
  }

  @media only screen and (max-width: 1065px) {
    .primaryLinksContainer {
      display: none;
    }
    .secondaryLinksContainer {
      display: none;
    }
    .logoContainer {
      flex: 1;
    }
    .menuIconContainer {
      display: block;
    }
  }
`;
