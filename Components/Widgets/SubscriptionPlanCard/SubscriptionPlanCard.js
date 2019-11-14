import React from "react";
import { subscriptionPlanCardStyles } from "./subscriptionPlanCardStyles";
import uuid from "uuid/v1";
const SubscriptionPlanCard = props => {
  const { cardHeader, cardBody, cardFooter, variant } = props;
  switch (variant) {
    case "newIndexPage":
      return (
        <div
          className={`subscriptionPlanCard newIndexPage ${
            cardHeader.toLowerCase() === "premium" ? "translateY" : ""
          } ${cardHeader.toLowerCase()}`}
        >
          <style jsx>{subscriptionPlanCardStyles}</style>
          <div className="subscriptionPlanCardHeader">
            <h4>{cardHeader}</h4>
          </div>
          <div className="subscriptionPlanCardBody">
            <ul className={`${cardHeader.toLowerCase()}`}>
              {cardBody.map(item => {
                return <li key={uuid()}>{item}</li>;
              })}
            </ul>
          </div>
          <div className="subscriptionPlanCardFooter">
            {cardHeader.toLowerCase()!=="free" && cardHeader.toLowerCase()!=="professional" ? <span className="currency">
              <i className="fa fa-euro"></i>
            </span> : null}
            <span className="price">{cardHeader.toLowerCase()!=="free" ? cardFooter.price : cardFooter.price.toUpperCase()}</span>{" "}
            <span className="duration">{cardFooter.duration}</span>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={`subscriptionPlanCard ${
            cardHeader.toLowerCase() === "premium" ? "elevatedCard" : ""
          }`}
        >
          <style jsx>{subscriptionPlanCardStyles}</style>
          <div className="subscriptionPlanCardHeader">
            <h4>{cardHeader}</h4>
          </div>
          <div className="subscriptionPlanCardBody">
            <ul className={`${cardHeader.toLowerCase()}`}>
              {cardBody.map(item => {
                return <li key={uuid()}>{item}</li>;
              })}
            </ul>
          </div>
          <div className="subscriptionPlanCardFooter">
            <span className="currency">
              <i className="fa fa-euro"></i>
            </span>{" "}
            <span className="price">{cardFooter.price}</span>{" "}
            <span className="duration">{cardFooter.duration}</span>
          </div>
        </div>
      );
  }
};

export default SubscriptionPlanCard;
