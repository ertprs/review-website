import css from 'styled-jsx/css';

export const newLeaveReviewPageStyles = css`
    /*----- Review container inner ----*/
    .reviewContainerInner{
        background:#fff;
        padding:5%;
        margin-bottom:5%;
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
        margin:2% 0 2% 0;
    }

    .mainReviewRatingsContainer, .mainReviewRatingsCaption{
        text-align:center;
    }

    .mainReviewRatingsCaption{
        margin: 2% 0 0 0;
        color:#999;
        font-style:italic;
    }

`;