import css from "styled-jsx/css";

export default css`
  .responsiveSideNavContainer {
    position: absolute;
    top: 100%;
    left: 0;
    height: 100vh;
    background: #fff;
    width: 100%;
    z-index: 100000;
    overflow-y: auto;
  }

  .responsiveSideNavItems {
    display: flex;
    flex-direction: column;
    padding: 5%;
  }

  .responsiveSideNavItems div {
    border-bottom: 1px solid #d8d8d8;
    padding: 5%;
    font-size: 1.2rem;
  }
  
  .responsiveSideNavItems > div :global(a) {
    text-decoration: none;
    color: #28b661;
    cursor: pointer;
  }
`;
