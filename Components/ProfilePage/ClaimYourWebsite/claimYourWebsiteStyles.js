import css from 'styled-jsx/css';

export const claimYourWebsiteStyles = css`
    .claimYourWebsiteText{
        font-size:1.01rem;
        text-align:center;
        line-height:1.5;
        margin-top:10px;
    }

    .claimYourWebsiteBoxBigContainer{
        margin:25px 0 25px 0;
    }

    .claimYourWebsiteBoxBig{
        display: flex;
        flex-direction:column;
        justify-content: flex;
        align-items: flex;
        margin-top: 5px;
    }

    .claimYourWebsiteFooter{
        margin-top:5px;
        text-align:center;
    }

    .claimBtn{
        padding:8px 10px;
        background:#21bc61;
        color:#fff;
        border:1px solid #21bc61;
        font-size:1rem;
        transition: all 0.4s;
        border-radius:2px;
    }

    .claimBtn:hover{
        background:#1c9f52;
        border:1px solid #1c9f52;
        cursor:pointer;
        outline:none;
    }

    .claimBtnHeroText{
        text-transform:capitalize;
    }

    /*----------- Small box variant --------*/
    .claimYourWebsiteBoxSmall .claimYourWebsiteFooter{
        margin-bottom:10px;
        text-align:justify;
    }
    .claimYourWebsiteTextSmall{
        font-size:1rem;
        text-align:justify;
    }

    @media screen and (max-width:991px) {
        .claimYourWebsiteBoxSmall h5{
            font-size:1.2rem;
            line-height:1.4;
        }
        .claimYourWebsiteTextSmall{
            font-size:0.9rem;
        }
        .claimBtn{
            font-size:0.8rem;
        }
    }

    @media only screen and (max-width:767px){
        .claimYourWebsiteBoxBigContainer{
            display:none;
        }
    }
`;