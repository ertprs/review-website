import css from 'styled-jsx/css';

export const claimYourWebsiteStyles = css`
    .claimYourWebsiteText{
        font-size:1.01rem;
        text-align:center;
        line-height:1.5;
    }

    .claimYourWebsiteBoxBigContainer{
        margin:25px 0 25px 0;
    }

    .claimYourWebsiteBoxBig{
        display: flex;
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
        background:#1c9f52;
        color:#fff;
        border:1px solid #1c9f52;
        font-size:1.05rem;
        transition: all 0.4s;
    }

    .claimBtn:hover{
        background:#21bc61;
        border:1px solid #21bc61;
        cursor:pointer;
        outline:none;
    }

    .claimBtnHeroText{
        text-transform:uppercase;
    }

    /*----------- Small box variant --------*/
    .claimYourWebsiteBoxSmall .claimYourWebsiteFooter{
        margin-bottom:10px;
        text-align:justify;
    }

    .claimYourWebsiteBoxSmall .claimYourWebsiteText{
        text-align:justify;
    }

    @media only screen and (max-width:767px){
        .claimYourWebsiteBoxBigContainer{
            display:none;
        }
    }
`;