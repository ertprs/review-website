import React, { Component } from 'react'
import Paper from '../../../../MaterialComponents/Paper';
import styles from '../ProfilePageBodyLeftStyles';
import RatingIndicators from '../../../../Widgets/RatingIndicators/RatingIndicators';
import FormField from "../../../../Widgets/FormField/FormField";

export default class index extends Component {
    state = {
        rating: 0,
        review: ""
    }

    changeRating = (data) => {
        this.setState({ rating: data })
    }

    handleChange = (e) => {
        const { value } = e.target
        this.setState({ review: value })
    }

    render() {
        return (
            <div className="writeReviewContainer">
                <style jsx>{styles}</style>
                <Paper>
                    <div className="writeReviewBox">
                        <div>
                            <img
                                src="/static/images/noProfileImg.jpg"
                                alt="user-img"
                                className="cardImg"
                            />
                            <span className="writeReviewTxt">Share your experience?</span>
                        </div>
                        <RatingIndicators
                            rating={this.state.rating}
                            typeOfWidget="star"
                            widgetRatedColors="#21bc61"
                            widgetHoverColors="#21bc61"
                            widgetDimensions="35px"
                            widgetSpacings="1px"
                            changeRating={this.changeRating}
                        />
                    </div>
                    {this.state.rating > 0 ? (
                        <>
                            <div style={{ marginTop: "20px" }}>
                                <FormField
                                    placeholder="Please write few words about your experience ....."
                                    // {...formData.password}
                                    element="textarea"
                                    handleChange={this.handleChange}
                                    type="text"
                                    value={this.state.review}
                                    // id="review"
                                    rows="5"
                                    col="5"
                                />
                            </div>
                            <button className="postButton">Post Review</button>
                            <br />
                            <div style={{ paddingTop: "10px" }}>
                                <a onClick={() => this.setState({ rating: 0 })} href="#">I don't want to give review</a>
                            </div>
                        </>
                    )
                        : ""}
                </Paper>
            </div>
        )
    }
}
