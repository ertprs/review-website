import css from "styled-jsx/css";

export const reviewListStyles = css`
    .reviewCard {
        border: 1px solid #fff;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
        margin: 10px 0px;
        background-color: #fff;
    }

    .topBox {
        border-bottom: 1px solid #f1f1f1;
        padding: 2%;
    }

    .cardLink {
        font-size: 18px;
        cursor: pointer;
        font-weight: 550;
    }

    .cardLink:hover {
        color: #4084bd;
    }

    .userName {
        margin-top: 10px;
    }

    .source {
        margin-top: 10px;
        color: grey;
        font-size: 12px;
    }

    .date {
        font-size: 14px;
    }

    .bottomBox {
        margin-top: 10px;
        padding: 0% 13%;
    }

    .bottomBoxInner {
        display: flex;
    }

    .footerLinks {
        padding: 0px 10px;
        cursor: pointer;
        transition: all 0.4s;
    }

    // .footerLinks::after {
    //     content: '';
    //     width: 20%;
    //     position: absolute;
    //     top: 100%;
    //     left: 0;
    //     display: none;
    // }

    .footerLinks:hover {
        color: #4084bd;
        border-bottom: 5px solid #4084bd; 
    }

    // .footerLinks:hover.footerLinks::after {
    //     display: block;

    // }

    .icons {
        margin-right: 5px;
    }
`