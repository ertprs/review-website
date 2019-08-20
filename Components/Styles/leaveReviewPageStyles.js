import css from "styled-jsx/css";

export const leaveReviewStyles = css`
  .leaveReviewContainer {
    margin-top: 75.5px;
    margin-bottom: 5%;
  }
  .leaveReviewHeaderContainer {
    text-align: center;
    margin: 7% 0 3% 0;
  }
  .leaveReviewRatingsContainer {
    text-align: center;
  }
  .leaveReviewTextContainer {
    margin-top: 5%;
  }
  .leaveReviewTextContainer .heading {
    margin-bottom: 2%;
  }
  .leaveReviewBtnStyles {
    display: block;
    color: #fff;
    background: #1c9f52;
    width: 100%;
    padding: 9px;
    border: 1px solid #1c9f52;
    font-weight: 400;
    font-size: 0.9rem;
    transition: all 0.4s;
    cursor: pointer;
    outline:none;
  }

  .leaveReviewBtnStyles i{
     opacity:0;
     transition: all 0.4s;
     font-size:1rem;
  }

  .leaveReviewBtnStyles:link, .leaveReviewBtnStyles:visited, .leaveReviewBtnStyles:hover, .leaveReviewBtnStyles:active{
      background:#21bc61;
      border: 1px solid #21bc61;
      outline:none;
  }
  .leaveReviewBtnStyles:hover i{
      opacity:1;
      padding-left:8px;
  }
`;
