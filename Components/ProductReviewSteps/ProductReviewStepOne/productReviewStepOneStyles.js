import css from 'styled-jsx/css';

export const productReviewStepOneStyles = css`
    /*-------- Main review section -------*/
    .mainReviewImageContainer{
        max-width:250px;
        height:auto;
        margin:0 auto;
    }

    .mainReviewImageContainer img{
        max-width:100%;
        height:auto;
    }

    .mainReviewHeading{
        text-align:center;
        margin:3% 0 3% 0;
    }

    .mainReviewRatingsContainer, .mainReviewRatingsCaption{
        text-align:center;
    }

    .mainReviewRatingsCaption{
        margin: 2% 0 15% 0;
        color:#999;
        font-style:italic;
    }

    /*-------- product label ---------*/
    .labelContainer{
        box-shadow:0px 2px 4px #d5d5d5;
        padding:5%;
        cursor:pointer;
    }

    .labelHeader{
        display:flex;
    }
    .labelId{
        flex-basis:98%;
    }

    .labelSymbol{
        color:#21bc61;
        text-align:right;
    }

    /*--------- product selection ------*/
    .productSelectionHeader{
        margin: 35px 0 35px 0;
    }

    .productSelectionHeader h5{
        margin:25px 0 50px 0;
    }

    .productSelectionSubHeader{
        margin:20px 0 20px 0;
    }

    /*------- nextBtn --------*/
    .nextBtn{
        padding:10px 20px;
        color:#fff;
        margin-top:15px;
        border:1px solid #21bc61;
        background:#21bc61;
        cursor:pointer;
    }

`;