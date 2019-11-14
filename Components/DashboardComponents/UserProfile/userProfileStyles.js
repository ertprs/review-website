import css from "styled-jsx/css";

const userProfileStyles = css`
  .avatarContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cardContainer {
    padding: 150px;
    margin: 150px;
  }

  .cardHeader {
    display: flex;
    justify-content: space-between;
  }

  .heading {
    margin-bottom: 23px;
    letter-spacing: 0.5px;
    font-size: 24px;
  }

  .textBold {
    font-weight: bold;
  }

  .value {
    text-align: right;
    margin: 0;
    padding: 0;
  }

  .mt-50 {
    margin-top: 50px;
  }
`;

export default userProfileStyles;
