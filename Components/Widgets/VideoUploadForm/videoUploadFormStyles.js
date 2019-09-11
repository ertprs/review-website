import css from 'styled-jsx/css';

export const videoUploadFormStyles = css`
    .videoUploadFormContainer{

    }

    .videoUploadBtn{
        display:inline-block;
        padding:1% 2% 1% 2%;
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