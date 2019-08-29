import css from 'styled-jsx/css';

export const emailSubscriptionStyles = css`
    .emailSubscriptionContainer{
        max-width:500px;
        margin:0 auto;
    }

    .emailSubscriptionHeader{
        margin:2% 0 6% 0;
        text-align:center;
    }

    .emailSubscriptionHeader .heading{
        font-weight:400;
        line-height:1.6;
    }

    .emailSubscriptionBoxContainer{
        max-width:80%;
        margin:0 auto;
    }
    .emailSubscriptionCheckBox{
        margin: 4% 0 0 0;
        text-align:center;
        font-size:0.9rem;
    }

    .emailSubscriptionError{
        text-align:left;
        margin: 1% 0 1% 1%;
        color:red;
        font-size:0.9rem;
    }
`;