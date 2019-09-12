import css from 'styled-jsx/css';

export const productReviewStepTwoStyles = css`
    .reviewHeader{
        text-align:right;
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

    .reviewHeaderLogoContainer img{
        margin:25px 0 20px 0;
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
        margin: 2% 0 15% 0;
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
        margin-top:5%;
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

    /*------ Media queries ---------*/
    @media screen and (max-width:991px){
        /*------- Hero section --------*/
        .reviewHeroHeading{
            margin:5% 0 4% 0;
        }
        .reviewHeroSubheading{
            margin-bottom:5%;
        }
        .reviewContainerInner{
            padding:8%;
        }

        /*----- main review section ----*/
        .mainReviewHeading{
            margin:4% 0;
        }
        .mainReviewRatingsCaption{
            margin: 3% 0 9% 0;
        }
        /*----- final review section -----*/
        .finalReviewSectionHeader, .rateProdAttrContainer, .reviewTextBoxContainer{
            margin-bottom:5%;
            padding-bottom:5%;
        }
        .rateProdAttrHeader{
            margin-bottom:10%;
        }

    }

    @media screen and (max-width:767px){
        /*----- final review section -------*/
        .finalReviewSectionHeader, .rateProdAttrContainer, .reviewTextBoxContainer{
            margin-bottom:8%;
            padding-bottom:6%;
        }
        .checkBoxContainer{
            margin-bottom:5%;
        }
        .reviewSubmitBtn{
            padding: 3% 2%;
            font-size:0.92rem;
        }
    }

    @media screen and (max-width:575px){
        /*----- hero section ------*/
        .reviewHeroHeading h3{
            font-size:1.5rem;
        }

        .reviewContainerInner{
            padding:10%;
        }
        /*----- main review section ----*/
        .mainReviewHeading{
            margin:6% 0 4% 0;
        }
        .mainReviewRatingsCaption{
            margin: 4% 0 12%;
        }
        .mainReviewRatingsContainer{
            margin:7% 0 6% 0;
        }
    }

    @media screen and (max-width:475px){
        /*----- main review section ------*/
        .reviewHeroHeading h3{
            font-size:1.4rem;
        }

        .reviewHeroSubheading h6{
            font-size:0.95rem;
            margin-bottom:8%;
        }

        .reviewContainerInner{
            padding:10%;
        }

        /*------ main review section ------*/

        .mainReviewImageContainer{
            max-width:225px;
        }
        .mainReviewHeading h4{
            font-size: 1.2rem;
        }
        .mainReviewRatingsCaption{
            font-size:0.9rem;
        }

        /*------ final review section ----*/
        .finalReviewSectionHeader, .rateProdAttrContainer, .reviewTextBoxContainer{
            margin-bottom:10%;
            padding-bottom:7%;
        }

        .rateProdAttrHeader h5, .reviewTextBoxHeader h5{
            font-size:1.02rem;
        }

        .rateProdAttrBodyHeader h6{
            font-size:0.9rem;
            text-transform:capitalize;
        }

        .reviewTextBoxHeader{
            margin-bottom:5%;
        }

        .checkBoxContainer{
            margin-bottom:8%;
            font-size:0.8rem;
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
    }
`;