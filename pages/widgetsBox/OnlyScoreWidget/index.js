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
    axios
      .get(
        `${process.env.BASE_URL}/api/reviews/domain?perPage=17&page=1&domain=${props.domain}`
      )
      .then(res => {
        console.log("response form widget ", res.data);
        if (!isEmpty(res.data)) setReviewData({ ...res.data });
      })
      .catch(err => {
        console.log(err);
      });
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

    return { domain: searchURL };
  }
};

export default OnlyScoreWidget;
