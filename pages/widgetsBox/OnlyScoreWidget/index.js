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

const OnlyScoreWidget = props => {
  let initState = {};
  const [parentState, setParentState] = useState(initState);
  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    if (props.domain !== undefined) {
      axios
        .get(
          `${process.env.BASE_URL}/api/reviews/domain?perPage=17&page=1&domain=${props.domain}`
        )
        .then(res => {
          if (!isEmpty(res.data)) setReviewData({ ...res.data });
        })
        .catch(error => {
          // console.log(err);
          let success = _get(error, "response.data.success", false);
          if (!success) {
            setReviewData({ rating: "0", reviews: [], total: 0, next: "" });
          }
        });
    }
  }, []);
  return (
    <>
      {props.variant !== "carousel" ? <></> : <></>}
      {renderOnlyScoreWidgetComponent(reviewData, props)}
    </>
  );
};

OnlyScoreWidget.getInitialProps = async ({ query }) => {
  if (query) {
    const searchURL = query.businessunitId
      ? `${query.businessunitId}`
      : "google.com";
    console.log(searchURL, "searchURL");
    return { domain: searchURL };
  }
};

export default OnlyScoreWidget;
