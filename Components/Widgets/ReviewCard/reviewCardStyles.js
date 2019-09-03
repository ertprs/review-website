import css from "styled-jsx/css";

export const reviewCardStyles = css`
  /*--- review variant styling ------*/
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

  /*---- Business varinat styling -------*/
  .businessProfilePic{
    align-self: flex-start;
    margin-right: 5%;
  }

  .businessPicContainer{
    height:105px;
    width:105px;
  }

  .businessDetails{
    flex-basis:55%;
  }

  .businessTitle{
    font-weight:bold;
    margin-bottom:1%;
  }

  .businessText{
    font-size:0.9rem;
    text-align:left;
  }

  /*-------- Team variant styling ---------*/
  .individualName{
    font-weight:bold;
    font-size:1rem;
  }

  .individualDesignation{
    text-transform:uppercase;
    font-size:0.8rem;
  }

  .specializationItem{
    font-size:0.7rem;
  }

  .specializationItem:first-child{
    margin-top:2%;
  }

  /*--------- Business varinat styling end -----*/

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

    /*----- business variant ------*/
    .businessPicContainer{
      height:90px;
      width:90px;
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

    /*---- business variant ----*/
    .businessProfilePic{
      align-self:center;
      margin : 0 0 5% 0;
    }
    .businessText, .businessTitle{
      text-align:center;
    }
  }

`;
