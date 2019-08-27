import css from 'styled-jsx/css';

export const businessPageStyles = css`
    /*--- utility classes ----*/
    .capitalize{
        text-transform:uppercase;
    }
    /*---- Business hero section ----*/
    .businessHeroContainer{
        display:flex;
        align-items:center;
        justify-content:center;
        height:100vh;
        width:100%;
        background-image: url('/static/business/index/images/background_image.jpg');
        background-repeat: no-repeat;
        background-size:cover;
        background-position:top;
    }

    .businessHeroSection{
        
    }

    .businessHeroLogoContainer{
        /* display:flex;
        justify-content:center; */
        margin-bottom:9%;
    }
    .businessHeroLogo{
        height:auto;
        width:245px;
        margin: 0 auto;
    }

    .businessHeroLogo img{
        max-width:100%;
        height:auto;
    }

    .businessHeroHeading{
        font-size:3rem;
        text-transform:uppercase;
        font-weight:bolder;
    }

    .businessHeroSubHeading{
        font-weight:350;
        text-transform:uppercase;
        font-size:1.47rem;
    }

    .businessSearchboxLabel{
        text-align:center;
        margin:8% 0 6% 0;
        font-size:1.2rem;
    }

    .businessSearchBoxContainer{
        width:75%;
        margin:0 auto;
    }

    /*---- Business HERO section END----*/

    /*---- Business Info section ----*/

    .businessInfoHeader{
        text-align:right;
        margin:2% 0 8% 0;
        padding-right:5%;
    }
    .businessInfoHeader h2, .businessSolutionHeader h2{
        font-weight:360 !important;
        font-size:2.5rem;
    }
    .businessInfoHelpPoint{
        margin-bottom:10%;
    }

    /*------- Business Solution section ----*/
    .businessSolutionHeader{
        text-align:left;
    }
    .businessSolutionHeader h2{
        font-size:2.2rem;
    }
    .businessSolutionSubHeader{
        margin:2% 0 2% 0;
    }
    .businessSolutionSubHeader p{
        font-size:1.05rem;
        font-weight:475;
        margin-bottom:5%;
    }
    .businessSolutionSteps{
        display:flex;
    }

    .businessSolutionStepCountContainer{
        flex-basis:15%;
        margin-right:3%;
    }

    .businessSolutionStepCount{
        box-shadow:0px 0px 18px #c5c5c5;
        border:1px solid #00D350;
        height:40px;
        width:40px;
        color:#fff;
        font-weight:bold;
        border-radius:50%;
        text-align:center;
        line-height:37px;
        background-image: linear-gradient(to top left, #00A7F6, #00D350);
        background-position:center;
        background-repeat:no-repeat;
    }

    .businessSolutionStepDetails{
        flex-basis:85%;
    }
    .businessSolutionStepHeader{
        margin-top:3%;
    }
    .businessSolutionStepHeader h6{
        text-transform:uppercase;
        font-size:1rem;
    }
    .businessSolutionStepSubHeader{
        font-weight:600;
        margin-top:5%;
        font-size:0.9rem;
    }
    .businessSolutionStepBody{
        margin-top:6%;
        font-size:0.9rem;
    }
`;