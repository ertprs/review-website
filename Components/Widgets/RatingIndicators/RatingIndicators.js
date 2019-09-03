import React from 'react';
import Ratings from 'react-ratings-declarative';

const RatingIndicators = (props)=>{
    return(
        <Ratings {...props}>
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        </Ratings>
    )
}
export default RatingIndicators;