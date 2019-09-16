import css from 'styled-jsx/css';

export const trustDontTrustStyles = css`
    .trustDontTrustBoxContainer{
        /* background:#fff;
        border-radius:25px; */
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
        color:#fff;
    }

    .trustIconContainerInner img, .dontTrustIconContainerInner img{
        height:75px;
        width:75px;
        cursor:pointer;
    }

    /*-------- trust review modal -----------*/
    .trustReviewModal{

    }

    .trustReviewModalHeader{
        margin-top:10px;
        margin-bottom:25px;
    }
    .submitBtn{
        padding:2% 3%;
        border:1px solid #21bc61;
        background:#21bc61;
        color:#fff;
        transition:all 0.4s;
        cursor:pointer;
        outline:none;
    }
    .submitBtn:hover{
        border:1px solid #26d970;
        background:#26d970;
    }

    /*-------------- tokens -----------*/
    .tokens{
        text-align:right;
        margin:10px 25px;
    }

    /*--------------------- stepTwoTextArea ------------*/
    .registerBtnContainer{
        margin: 20px 0 20px 0;
        text-align:center;
    }
    .registerBtn{
        padding:12px 22px 12px 22px;
        background:#21bc61;
        border:1px solid #21bc61;
        color:#fff;
        transition: all 0.4s;
        outline:none;
        font-size:1rem;
        cursor:pointer;
    }
    .registerBtn:hover{
        background: #26d970;
        border:1px solid #26d970;
    }
`;