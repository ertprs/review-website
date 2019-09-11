import css from 'styled-jsx/css';

export const videoUploadFormStyles = css`
    .videoUploadFormContainer{
        margin-top:4.5%;
    }

    .videoUploadFormHeader{
        margin:2% 0 4% 0;
    }

    .uploadVideoBtnContainer{
        margin-top:2%;
    }

    .videoUploadBtn{
        display:inline-block;
        padding:1% 2% 1% 2%;
        border-radius:25px;
        background:#21bc61;
        color:#fff;
        border:1px solid #21bc61;
        outline:none;
        font-size:1rem;
        transition: all 0.4s;

    }

    .videoUploadBtn:hover{
        background: #26d970;
        border:1px solid #26d970;
    }

    .videoUploadBtn:link, .videoUploadBtn:visited, .videoUploadBtn:hover, .videoUploadBtn:active{
        outline:none;
        cursor:pointer;
    }

`;