import css from 'styled-jsx/css';

export const aboutPageStyles = css`
    /*----- Hero section styling -------*/
    .aboutHeroContainer{
        background:url('/static/about/images/background_girl_2.png');
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        padding-top:2%;
        padding-bottom:10%;
        margin-bottom:5%;
    }

    .aboutHeroLogoContainer{
        height:100px;
        width:200px;
    }

    .aboutHeroHeading{
        text-transform:uppercase;
    }

    .aboutHeroHeading .heading{
        font-size:4rem;
    }

    .aboutHeroImage{
        height:420px;
        width:100%;
        text-align:center;
    }
`;