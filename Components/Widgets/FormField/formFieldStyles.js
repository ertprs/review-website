import css from "styled-jsx/css";

export const formFieldStyles = css`
  .formFieldGroup {
    margin-bottom: 1rem;
  }

  .formField {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    resize: none;
    outline: none;
  }
  .invalidField {
    border: 1px solid #ff7158;
  }
  .errorMsg{
    color:red;
    font-size:0.8rem;
    margin-bottom:1%;
  }
`;
