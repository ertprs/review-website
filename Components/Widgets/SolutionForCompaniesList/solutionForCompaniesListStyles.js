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