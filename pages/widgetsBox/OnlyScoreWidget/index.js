import React, { useState, useEffect } from "react";
import OnlyScoreWidgetComponent from "../../../Components/Widgets/OnlyScoreWidgetComponent/OnlyScoreWidgetComponent";
import _get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import axios from "axios";

const retrieveRequiredData = reviewData => {
  const ratings = Number(_get(reviewData, "rating", 0));

  const totalReviews = _get(reviewData, "total", 0);

  return { ratings, totalReviews };
};

const renderOnlyScoreWidgetComponent = (reviewData, props) => {
  if (props.variant !== "carousel") {
    const requiredData = retrieveRequiredData(reviewData);
    return (
      <OnlyScoreWidgetComponent
        requiredData={requiredData}
        variant={props.variant}
        domain={props.domain}
      />
    );
  } else {
    return (
      <OnlyScoreWidgetComponent
        requiredData={props.requiredData}
        variant={props.variant}
        textReviews={props.textReviews}
        domain={props.domain}
      />
    );
  }
};

class OnlyScoreWidget extends React.Component {
  state = {
    reviewData: {}
  };

  componentDidMount() {
    const platformId = _get(this.props, "platformId", 0);
    let requestURL = "";
    if (platformId === "0") {
      requestURL = `${process.env.BASE_URL}/api/reviews/domain?perPage=24&page=1&domain=${this.props.domain}`;
    } else {
      requestURL = `${process.env.BASE_URL}/api/reviews/domain?perPage=24&page=1&domain=${this.props.domain}&platform=${platformId}`;
    }
    axios
      .get(requestURL)
      .then(res => {
        if (platformId === 0 || platformId === "0") {
          if (!isEmpty(res.data)) {
            const reviews = _get(res, "data.reviews", []);
            if (reviews && Array.isArray(reviews)) {
              if (reviews.length > 0) {
                this.setState({ reviewData: { ...res.data } });
              } else {
                this.setState({ reviewData: { noReviewFound: true } });
              }
            }
          }
        } else {
          if (!isEmpty(res.data)) {
            if (!isEmpty(res.data.data)) {
              const reviews = _get(res, "data.data.reviews", []);
              if (reviews && Array.isArray(reviews)) {
                if (reviews.length > 0) {
                  this.setState({
                    reviewData: { ...res.data.data, url: res.data.url }
                  });
                } else {
                  this.setState({ reviewData: { noReviewFound: true } });
                }
              }
            }
          }
        }
      })
      .catch(error => {
        this.setState({ reviewData: { success: false } });
        let success = _get(error, "response.data.success", false);
        if (!success) {
          this.setState({
            reviewData: { rating: "0", reviews: [], total: 0, next: "" }
          });
        }
      });
  }

  render() {
    return (
      <>
        {this.props.variant !== "carousel" ? <></> : <></>}
        {renderOnlyScoreWidgetComponent(this.state.reviewData, this.props)}
      </>
    );
  }
}

OnlyScoreWidget.getInitialProps = async ({ query }) => {
  if (query) {
    const searchURL = query.businessunitId
      ? `${query.businessunitId}`
      : "google.com";
    const platformId = (await query.platformId) ? `${query.platformId}` : 0;
    return { domain: searchURL, platformId };
  }
};

export default OnlyScoreWidget;
