import React from 'react';
import ratingBadgeStyles from './ratingsBadgeStyles';

const RatingBadge = (props)=>{
    return(
       <div>
           <style jsx>
               {ratingBadgeStyles}
           </style>
           <div className="ratingBadgeContainer" style={{...props.style}}>
             {Number(props.ratingCount).toFixed(1).toString()}
           </div>
       </div>
    )
}

export default RatingBadge;