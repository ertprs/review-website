import css from 'styled-jsx/css';

export const newLeaveReviewPageStyles = css`
    /*----- Review container inner ----*/
    .reviewContainerInner{
        background:#fff;
        padding:5%;
    }

    /*---- Header section --------*/
    .reviewHeader{
        /* background:#fff; */
    }

    .reviewHeaderLogoContainer{
        height:auto;
        width:200px;
    }

    .reviewHeaderLogoImage{
        max-width:100%;
        height: auto;
    }

    /*------- hero section ------*/
    .reviewHeroContainer{
        margin: 2% 0 3% 0;
    }

    .reviewHeroHeading{
        margin-bottom:2%;
    }

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
        margin: 2% 0 9% 0;
        color:#999;
        font-style:italic;
    }

    /*------- Final review section -------*/
    .finalReviewSectionHeader{
        border-bottom:1px solid #d8d8d8;
        padding-bottom:4%;
    }

    /*------ rate product attributes ------*/
    .rateProdAttrContainer{
        margin-bottom : 2%;
        border-bottom:1px solid #d8d8d8;
        padding-bottom:4%;
    }

    .rateProdAttrBody{
        margin-top:3%;
    }

    .rateProdAttrError, .reviewError, .checkBoxError{
        color:red;
        font-size:0.8rem;
    }

    /*-------- review text box container ------*/
    .reviewTextBoxContainer{
        border-bottom:1px solid #d8d8d8;
        margin-bottom:3%;
    }

    .reviewTextBoxHeader{
        margin:2.5% 0 2.5% 0;
    }

    /*--------- checkbox and btn container ------*/
    .checkBoxAndBtnContainer{
        margin-bottom:8%;
    }
    .checkBoxError{
        margin-top:2%;
    }
    .checkBoxContainer{
        font-size:0.9rem;
    }
    .checkBoxContainer a{
        color:#21bc61;
    }

    .submitBtnContainer{
        text-align:right;
    }

    .reviewSubmitBtn{
        display:inline-block;
        padding:4% 3% 4% 3%;
        background:#21bc61;
        color:#fff;
        border:1px solid #21bc61;
        outline:none;
        font-size:1rem;
        transition: all 0.4s;

    }

    .reviewSubmitBtn:hover{
        background: #26d970;
        border:1px solid #26d970;
    }

    .reviewSubmitBtn:link, .reviewSubmitBtn:visited, .reviewSubmitBtn:hover, .reviewSubmitBtn:active{
        outline:none;
        cursor:pointer;
    }
`;  