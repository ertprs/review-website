import React from 'react';
import {subscriptionPlanCardStyles} from './subscriptionPlanCardStyles';
const SubscriptionPlanCard = (props)=>{
    const {cardHeader, cardBody, cardFooter} = props;
    return(
        <div className={`subscriptionPlanCard ${cardHeader.toLowerCase()==="premium" ? "elevatedCard" :""}`}>
            <style jsx>
                {subscriptionPlanCardStyles}
            </style>
            <div className="subscriptionPlanCardHeader">
              <h4>{cardHeader}</h4>
            </div>
            <div className="subscriptionPlanCardBody">
              <ul className={`${cardHeader.toLowerCase()}`}>
                {cardBody.map(item =>{
                    return <li>{item}</li>
                })}
              </ul>
            </div>
            <div className="subscriptionPlanCardFooter">
              <span className="currency"><i className="fa fa-euro"></i></span> <span className="price">{cardFooter.price}</span> <span className="duration">{cardFooter.duration}</span>
            </div>
          </div>
    )
}

export default SubscriptionPlanCard;