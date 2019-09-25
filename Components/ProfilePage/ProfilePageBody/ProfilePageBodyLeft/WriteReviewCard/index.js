import React, { Component } from 'react'
import Paper from '../../../../MaterialComponents/Paper';
import styles from '../ProfilePageBodyLeftStyles';
import RatingIndicators from '../../../../Widgets/RatingIndicators/RatingIndicators';

export default class index extends Component {
    changeRating = (data) => {
        console.log(data)
    }

    render() {
        return (
            <div className="writeReviewContainer">
                <style jsx>{styles}</style>
                <Paper>
                    <div className="writeReviewBox">
                        <div>
                            <img
                                src="/static/about/images/arturs_color.png"
                                alt="user-img"
                                className="cardImg"
                            />
                            <span className="writeReviewTxt">Write a review</span>
                        </div>
                        <RatingIndicators
                            // rating={4}
                            typeOfWidget="star"
                            widgetRatedColors="#21bc61"
                            widgetHoverColors="#21bc61"
                            widgetDimensions="35px"
                            widgetSpacings="1px"
                            changeRating={this.changeRating}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}
