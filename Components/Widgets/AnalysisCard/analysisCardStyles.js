import css from 'styled-jsx/css';

export const analysisCardStyles = css`
    .analysisCard{
        color:#666;
        box-shadow:0 2px 8px rgba(0,0,0,0.08);
        background-color:#fff;
        margin:10px 15px;
        padding:2%;
        border-radius:5px;
        transition:all 0.3s;
    }

    .analysisCardTitle{
        font-size:0.9rem;
        margin-bottom:1%;
        margin-left:2%;
        text-transform:capitalize;
    }

    .analysisCardDate{
        font-weight:600;
        margin-left:2%;
        font-size:0.95rem;
    }

    .analysisCard:hover{
        background:#000;
        color:#fff;
        transform:translateY(-10%);
    }
`;