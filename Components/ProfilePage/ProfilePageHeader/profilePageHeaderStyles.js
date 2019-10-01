import css from 'styled-jsx/css';

export const profilePageHeaderStyles = css`

    .customContainer{
        max-width:90%;
        margin:0 auto;
    }

    .profilePageHeaderContainer{
        padding:15px 0 0 0;
    }

    .headerCard{
        margin-bottom:15px;
    }

    .headerCard:hover{
        cursor:pointer;
    }

    .companyLink{
        margin-bottom:7px;
    }

    .companyLink a{
        text-decoration:none;
        color:#000;
        font-weight:bold;
        font-size:1.1rem;
    }

    .companyLink a i{
        margin-right:6px;
    }

    .companyClaimStatus{
        margin-bottom:7px;
    }

    .companyClaimStatus i{
        margin-right:6px;
        font-size:1rem;
    }

    .companyClaimStatus .claimed{
        border-bottom:dotted;
        border-bottom-width:0.6px;
        font-weight: bold;
        font-size:1.05rem;
    }

    @media screen and (max-width:767px){
        .headerRight{
            margin-top:35px;
        }
    }
`;