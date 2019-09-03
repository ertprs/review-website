import css from 'styled-jsx/css';

export const solutionForCompaniesStyles = css`
.businessSolutionSteps{
        display:flex;
    }

    .businessSolutionStepCountContainer{
        flex-basis:15%;
        margin-right:3%;
    }

    .businessSolutionStepCount{
        box-shadow:0px 0px 18px #d9d9d9;
        border:1px solid #00D350;
        height:40px;
        width:40px;
        color:#fff;
        font-weight:bold;
        border-radius:50%;
        text-align:center;
        line-height:37px;
        background-image: linear-gradient(to top left, rgba(0,167,246,0.9), rgba(0,211,80,0.9));
        background-position:center;
        background-repeat:no-repeat;
        font-size:1.12rem;
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

    .businessSolutionStepImage{
        display:none;
    }

    .businessSolutionStepImageContainer{
        width:100%;
        height:auto;
    }

    .businessSolutionStepImageContainer img{
        max-width:100%;
        height:auto;
    }

    /*---- media queries ---*/
    @media screen and (max-width:991px){
    .businessSolutionSteps{
        flex-direction:column;
    }
    
    .businessSolutionStepCountContainer{
        margin:4% 0 8% 0;
    }
    
    } 

    @media screen and (max-width:767px){

        .businessSolutionSteps{
            margin-bottom:7%;
        }

        .businessSolutionStepCountContainer{
            margin:0;
        }

        .businessSolutionStepSubHeader{
            margin-top:3%;
        }

        .businessSolutionStepBody{
            margin-top:4.5%;
        }

        .businessSolutionStepImage{
            display:block;
        }
    }

    @media screen and (max-width:375px){
        .businessSolutionStepCountContainer{
        margin:0 0 3% 0;
        }

        .businessSolutionStepHeader h6{
            font-size:0.9rem;
            margin-bottom:5%;
        }
    }
`;