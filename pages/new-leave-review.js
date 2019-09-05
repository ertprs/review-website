import React from "react";
import { newLeaveReviewPageStyles } from "../Components/Styles/newLeaveReviewPageStyles";
import Ratings from "react-ratings-declarative";
import ReviewCard from "../Components/Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../Components/Widgets/RatingIndicators/RatingIndicators";


class NewLeaveReview extends React.Component {
  state = {
    mainRating: 0
  };

  handleRatingChange = (id, newRating) => {
    this.setState({ [id]: newRating });
  };

  renderReviewHeader = () => {
    return (
      <div className="reviewHeader">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="reviewHeaderLogoContainer">
          <img
            src="/static/business/index/images/gradientLogo.png"
            className="reviewHeaderLogoImage"
          />
        </div>
      </div>
    );
  };

  renderReviewHeroSection = () => {
    return (
      <div className="reviewHeroContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="reviewHeroHeading">
          <h3>Review your recent purchase</h3>
        </div>
        <div className="reviewHeroSubheading">
          <h6>Your feedback helps others make good choices</h6>
        </div>
      </div>
    );
  };

  renderMainReviewSection = () => {
    return (
      <div className="mainReviewSection">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="mainReviewImageContainer">
          <img src="/static/images/capture.png" />
        </div>
        <div className="mainReviewHeading">
          <h4>https://google.com</h4>
        </div>
        <div className="mainReviewRatingsContainer">
          <Ratings
            rating={this.state.mainRating}
            widgetRatedColors="#21bc61"
            widgetHoverColors="#21bc61"
            widgetDimensions="40px"
            widgetSpacings="2px"
            changeRating={newRating => {
              this.handleRatingChange("mainRating", newRating);
            }}
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </div>
        <div className="mainReviewRatingsCaption">
          How would you rate this product?
        </div>
      </div>
    );
  };

  renderFinalReviewSection = () => {
    const reviewCardBody = (
        <RatingIndicators
        rating={this.state.mainRating}
        typeOfWidget="star"
        widgetRatedColors="#21bc61"
        widgetDimensions="40px"
        widgetSpacings="2px"
      />
    );
    return (
      <div className="finalReviewSection">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="finalReviewSectionHeader">
          <ReviewCard
            variant="productCard"
            image="/static/images/capture.png"
            title="google.com"
            body={reviewCardBody}
          />
        </div>
        <div className="finalReviewSectionBody"></div>
      </div>
    );
  };

  render() {
    const { mainRating } = this.state;
    return (
      <div style={{ background: "#f5f5f5", height: "110vh" }}>
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="container">
          {this.renderReviewHeader()}
          {this.renderReviewHeroSection()}
          <div className="reviewContainerInner">
            {mainRating > 0
              ? this.renderFinalReviewSection()
              : this.renderMainReviewSection()}
          </div>
        </div>
      </div>
    );
  }
}

export default NewLeaveReview;
