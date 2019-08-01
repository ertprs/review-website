import css from "styled-jsx/css";

export const reviewCardStyles = css`
  .reviewCardContainer {
    display: flex;
    color:#666;
  }
  .reviewProfilePic {
    align-self: center;
    margin-right: 5%;
  }
  .reviewPicContainer {
    height: 75px;
    width: 75px;
  }
  .reviewerName{
    font-weight:500;
    margin-bottom:2%;
  }
  .reviewRatings {
    display: flex;
    margin: 1% 0 1% 0;
  }
  .reviewRatings .badge {
    flex-basis: 12%;
    align-self: center;
  }
  .reviewRatings .rating {
    align-self: flex-start;
    flex-basis: 50%;
  }
  .reviewRatings .date {
    align-self: flex-end;
    color:#666;
    font-size:0.9rem;
  }

  .reviewDetails{
    flex-basis:80%;
  }

  .reviewText p{
    word-break: break-word;
  }

  @media only screen and (max-width: 991px) {
    
    .reviewRatings {
      flex-direction: column;
    }
    .reviewRatings .badge {
      display: none;
    }
    .reviewRatings .date {
      align-self: flex-start;
      margin: 1% 0 1% 0;
    }
  }

  @media only screen and (max-width:480px){
    .reviewCardContainer {
      flex-direction: column;
    }
    .reviewProfilePic{
      align-self:flex-start;
      margin-bottom:2%;
    }
  }
`;
