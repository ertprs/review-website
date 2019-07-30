import css from 'styled-jsx/css';

export const verifiedBtnStyles = css`
    .verifiedBtnContainer{
        display:flex;
        padding: 1% 2% 1% 2%;
        justify-content:center;
    }
    .icon-container{
        background: #38B653;
        color:#fff;
        width:30%;
    }
    .text-container{
        background:#30AB4A;
        width:70%;
        color:#fff;
    }

    .icon-container, .text-container{
        padding:1%;
        font-size:0.8rem;
        text-align:center;
    }
`;