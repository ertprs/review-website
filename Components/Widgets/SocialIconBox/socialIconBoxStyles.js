import css from 'styled-jsx/css';

export const socialIconBoxStyles =   css`
    .socialIconBoxContainer{
        display:flex;
        margin-bottom:2%;
        transition:all 0.3s;
    }

    .socialIconBoxContainer:hover{
        background:#f5f5f5;
    }

    .socialIconContainer{
        display:flex;
        align-items:center;
        justify-content:center;
        height:45px;
        width:45px;
        margin-right:4%;
        border:1px solid #000;
        background:#f5f5f5;
        border:1px solid #f5f5f5;
    }
    .socialIconContainer i {
        font-size:1.6rem;
    }
    .socialFollowersContainer{
        display:flex;
        flex-direction:column;
        align-items:stretch;
    }

    .socialFollowersContainer .followers{
        font-weight:600;
    }
    .socialFollowersContainer .caption{
        font-size:0.8rem;
    }
`;