import React from 'react';
import ratingBadgeStyles from './ratingsBadgeStyles';

const RatingBadge = (props)=>{
    return(
       <div>
           <style jsx>
               {ratingBadgeStyles}
           </style>
           <div className="ratingBadgeContainer">
             {props.ratingCount}
           </div>
       </div>
    )
}

export default RatingBadge;