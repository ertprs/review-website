import css from 'styled-jsx/css';

export const scheduleMeetingStyles = css`
    .scheduleMeetingContainer{
        max-width:500px;
        margin:0 auto;
    }

    .scheduleMeetingHeader{
        margin:2% 0 6% 0;
        text-align:center;
    }

    .scheduleMeetingHeader .heading{
        font-weight:400;
        line-height:1.6;
        font-size:1.1rem;
    }

    .scheduleMeetingFormContainer{
        max-width:80%;
        margin:0 auto;
    }

    .scheduleMeetingBtnContainer{
        text-align:center;
    }

    .scheduleMeetingBtnContainer button{
        text-transform:uppercase;
        color:#fff;
        font-weight:bold;
        border-radius:50px;
        padding:3% 12% 3% 12%;
        background: linear-gradient(to bottom, rgba(0,167,246) 60%, rgba(0,211,80));
        border-top:1px solid #00A7F6;
        border-bottom:1px solid #00D350;
        border-left: 1px solid #00A7F6;
        border-right: 1px solid #00D350;
        margin-top:1rem;
        cursor:pointer;
        outline:none;
    }

    .scheduleMeetingBtnContainer button:link, .scheduleMeetingBtnContainer button:visited, .scheduleMeetingBtnContainer button:hover, .scheduleMeetingBtnContainer button:active{
        outline:none;
    }

    .objectiveLabel{
        font-size:0.95rem;
        margin-bottom:5%;
    }
`;