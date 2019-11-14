import css from "styled-jsx/css";

export const subscriptionPlanCardStyles = css`
  .subscriptionPlanCard {
    border: 1px solid #fff;
    background: #fff;
  }

  .elevatedCard {
    box-shadow: 0px 0px 32px #d9d9d9;
  }

  .translateY{
    transform:translateY(-50px);
    box-shadow: 0px 0px 15px #999;

  }

  .subscriptionPlanCardHeader {
    text-align: center;
    padding: 8% 5% 5% 5%;
  }

  .subscriptionPlanCardHeader h4 {
    font-weight: 400;
  }

  .subscriptionPlanCardBody {
    font-size: 0.9rem;
  }

  .subscriptionPlanCardBody ul {
    list-style-type: none;
    list-style-image: url("/static/business/index/images/bulletpoint.png");
  }
  .subscriptionPlanCardBody ul li {
    padding-left: 1rem;
  }

  .free .subscriptionPlanCardBody .free li,
  .premium .subscriptionPlanCardBody .premium li,
  .professional .subscriptionPlanCardBody .professional li {
    margin-bottom: 2.0rem;
  }

  .subscriptionPlanCardBody .standard li {
    margin-bottom: 2.7rem;
  }

  .subscriptionPlanCardBody .premium li {
    margin-bottom: 2.03rem;
  }

  .subscriptionPlanCardBody .professional li {
    margin-bottom: 2.248rem;
  }

  .subscriptionPlanCardFooter {
    text-align: center;
  }

  .subscriptionPlanCardFooter .currency i {
    vertical-align: top;
    font-size: 20px !important;
    margin-right: 2%;
  }

  .subscriptionPlanCardFooter .price {
    font-size: 3.5rem;
    font-weight: 300;
  }

  .professional .subscriptionPlanCardFooter, .free .subscriptionPlanCardFooter{
    margin-bottom:15px;
  }

  .professional .subscriptionPlanCardFooter .price,
  .free .subscriptionPlanCardFooter .price {
    font-size: 2rem;
  }

  .subscriptionPlanCardFooter .duration {
    font-size: 1.7rem;
    font-weight: lighter;
    margin-left: 1%;
  }

  /*----- Media queries ------*/
  @media screen and (max-width: 1199px) {
    .subscriptionPlanCardBody .standard li {
      margin-bottom: 2.45rem;
    }
  }

  @media screen and (max-width: 991px) {
    .subscriptionPlanCardBody ul li {
      padding-left: 0rem;
    }
    .subscriptionPlanCardBody .professional li {
      margin-bottom: 2.45rem;
    }
  }

  @media screen and (max-width: 767px) {
    .subscriptionPlanCardBody ul li {
      padding-left: 1rem;
    }

    .subscriptionPlanCardBody .standard li {
      margin-bottom: 2.7rem;
    }

    .subscriptionPlanCardBody .professional li {
      margin-bottom: 2.248rem;
    }
    .translateY{
      transform:translateY(0)
    }
  }
`;
