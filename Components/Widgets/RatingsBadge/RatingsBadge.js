import React from 'react';
import ratingBadgeStyles from './ratingsBadgeStyles';

const RatingBadge = (props)=>{
    return(
       <div>
           <style jsx>
               {ratingBadgeStyles}
           </style>
           <div className="ratingBadgeContainer" style={{...props.style}}>
             {props.ratingCount}
           </div>
       </div>
    )
}

export default RatingBadge;