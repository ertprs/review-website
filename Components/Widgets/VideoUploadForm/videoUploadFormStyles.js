import css from "styled-jsx/css";

export const videoUploadFormStyles = css`
  .videoUploadFormContainer {
    margin-top: 28px;
  }

  .videoUploadFormHeader {
    margin: 10px 0 35px 0;
  }

  input[type="file"] {
    display: none;
  }

  .video-file-upload {
    border: 1px solid #21bc61;
    margin-top:20px;
    background:#21bc61;
    border-radius:25px;
    color:#fff;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    transition:all 0.4s;
  }

  .uploadVideoBtnContainer {
    margin-top: 35px;
  }

  .videoUploadBtn {
    display: inline-block;
    padding:8px 16px 8px 16px;
    border-radius: 25px;
    background: #21bc61;
    color: #fff;
    border: 1px solid #21bc61;
    outline: none;
    font-size: 1rem;
    transition: all 0.4s;
  }

  .videoUploadBtn:hover, .video-file-upload:hover {
    background: #26d970;
    border: 1px solid #26d970;
  }

  .videoUploadBtn:link,
  .videoUploadBtn:visited,
  .videoUploadBtn:hover,
  .videoUploadBtn:active {
    outline: none;
    cursor: pointer;
  }

  .errorMsg{
    color:red;
    font-size:0.9rem;
  }
`;
