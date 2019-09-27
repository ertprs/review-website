import css from 'styled-jsx/css';

export default css`
    .displayFlex {
        display: flex;
    }

    .cardHeader {
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
    }

    .cardHeader div{
        flex:1;
    }

    .userNameReview {
        display: flex;
        flex-direction: column;
        
        justify-content: center;
        margin-left: 3%;
    } 

    .userReviewRating{
        display:flex;
        align-items:center;
        text-align:right;
    }

    .userReviewRatingSm{
        display:none;
    }

    .cardImg {
        max-width: 50px;
        height: auto;
        border-radius: 50px;
    }

    .userName {
        margin: 0;
        padding: 2px 0;
        font-weight: 500;
        font-size: 16px;
    }

    .reviews {
        color: #5e5e5e; 
    }

    .cardBody {
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f1;
    }

    .cardBodyHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .time {
        color: #5e5e5e;
    }

    .cardBodyMain {
        margin: 0;
        padding: 0;
    }

    .cardBodyMain p {
        margin: 0;
        padding: 0;
    }

    .cardFooter {
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .cardFooter span {
        color: #5e5e5e;
    }

    .useful {
        margin-right: 15px;
    }

    .iconText {
        margin-left: 4px;
    }

    .writeReviewContainer {
        margin-bottom: 25px;
    }

    .writeReviewBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .writeReviewBox div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .writeReviewTxt {
        margin-left: 20px;
        font-size: 16px;
        color: #21bc61;
    }

    .writeReviewTxt:hover {
        color: #19914b;
        cursor: pointer;
        transition: 0.5s;
    }

    .postButton {
        width: 25%;
        padding: 10px 30px;
        border: 1px solid #28b661;
        background: #28b661;
        color: #fff;
        font-weight: 400;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        -ms-border-radius: 3px;
        -o-border-radius: 3px;
        cursor: pointer;
        transition: all 0.4s;
      }
    
      .postButton:hover {
        background: #30ab4a;
      }
    
      .postButton:disabled {
        border: 1px solid #baf0d0;
        background: #baf0d0;
      }

      .mb-25 {
          margin-bottom: 25px;
      }

      /*------- Media queries ----------*/
      @media screen and (max-width:475px){
        .writeReviewBox{
            flex-direction:column;
        }
        .reviewIndicator{
            margin-top:8px;
        }
      }

      @media screen and (max-width:390px){
        .cardHeader{
            flex-direction:column;
        }
        .userNameReview{
            margin:13px 0 0 0;
        }
        .userReviewRating{
            text-align:left;
        }
      }
`