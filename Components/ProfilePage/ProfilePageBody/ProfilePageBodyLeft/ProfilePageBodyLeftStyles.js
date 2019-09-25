import css from 'styled-jsx/css';

export default css`
    .displayFlex {
        display: flex;
    }

    .cardHeader {
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
    }

    .userNameReview {
        display: flex;
        flex-direction: column;
        alignItems: center;
        justify-content: center;
        margin-left: 3%;
    } 

    .cardImg {
        width: auto;
        height: 50px;
        border-radius: 50px;
    }

    .userName {
        margin: 0;
        padding: 2px 0;
    }

    .reviews {
        color: #5e5e5e; 
    }

    .cardBody {
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f1;
    }

    .cardBodyHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .time {
        color: #5e5e5e;
    }

    .cardBodyMain {
        margin: 0;
        padding: 0;
    }

    .cardBodyMain p {
        margin: 0;
        padding: 0;
    }

    .cardFooter {
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .cardFooter span {
        color: #5e5e5e;
    }

    .useful {
        margin-right: 15px;
    }

    .iconText {
        marginLeft: 4px;
    }

    .writeReviewContainer {
        margin-bottom: 25px;
    }

    .writeReviewBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .writeReviewBox div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .writeReviewTxt {
        margin-left: 20px;
        font-size: 16px;
        color: #21bc61;
    }

    .writeReviewTxt:hover {
        color: #19914b;
        cursor: pointer;
        transition: 0.5s;
    }
`