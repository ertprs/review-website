import React, { Component } from "react";
import Paper from "../../../../MaterialComponents/Paper";
import styles from "../ProfilePageBodyLeftStyles";
import RatingIndicators from "../../../../Widgets/RatingIndicators/RatingIndicators";
import FormField from "../../../../Widgets/FormField/FormField";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: "",
      starSize: 0
    };
    this.windowSize = 0;
  }

  componentDidMount() {
    this.windowSize = window.matchMedia("(max-width: 991px)");
    this.changeStarSize(this.windowSize);
    this.windowSize.addEventListener("change", this.changeStarSize);
  }

  componentWillUnmount() {
    this.windowSize.removeEventListener("change", this.changeStarSize);
  }

  changeStarSize = windowSize => {
    if (windowSize.matches) {
      // If media query matches
      this.setState({ starSize: 28 });
    } else {
      this.setState({ starSize: 35 });
    }
  };

  changeRating = data => {
    this.setState({ rating: data });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ review: value });
  };

  render() {
    return (
      <div className="writeReviewContainer">
        <style jsx>
          {`
            .cancelReviewBtn {
              color: #111;
              cursor: pointer;
              transition: all 0.4s;
            }
            .cancelReviewBtn:hover {
              color: #21bc61;
            }
            .postReviewButton {
              padding: 8px 12px;
              color: #fff;
              background: #21bc61;
              border: 1px solid #21bc61;
              transition: all 0.4s;
              outline:none;
            }
            .postReviewButton:hover {
              background: #19914b;
              border: 1px solid #19914b;
              cursor:pointer;
              outline:none;
            }
          `}
        </style>
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
            <div className="reviewIndicator">
              <RatingIndicators
                rating={this.state.rating}
                typeOfWidget="star"
                widgetRatedColors="#21bc61"
                widgetHoverColors="#21bc61"
                widgetDimensions={this.state.starSize}
                widgetSpacings="1px"
                changeRating={this.changeRating}
              />
            </div>
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
              <button className="postReviewButton">Post Review</button>
              <br />
              <div style={{ paddingTop: "10px" }}>
                <span
                  className="cancelReviewBtn"
                  onClick={() => this.setState({ rating: 0 })}
                >
                  I don't want to give review
                </span>
              </div>
            </>
          ) : (
            ""
          )}
        </Paper>
      </div>
    );
  }
}
