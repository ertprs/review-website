import css from 'styled-jsx/css';

export const trustDontTrustStyles = css`
    .trustDontTrustBoxContainer{
        background:#fff;
        border-radius:25px;
    }
    .trustDontTrustBoxContainerInner{
        display: flex;
        padding:4%;
    }
    .trustIconContainer, .dontTrustIconContainer{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        flex-basis:50%;
    }

    .trustHeader, .dontTrustHeader{
        text-transform:uppercase;
        margin-bottom:10px;
    }

    .trustIconContainerInner img, .dontTrustIconContainerInner img{
        height:75px;
        width:75px;
        cursor:pointer;
    }
`;