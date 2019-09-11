import React, { useState } from "react";
import PusherDataComponent from "../../../Components/PusherDataComponent/PusherDataComponent";
import OnlyScoreWidgetComponent from "../../../Components/Widgets/OnlyScoreWidgetComponent/OnlyScoreWidgetComponent";

const retrieveRequiredData = parentState => {
  const response = { ...parentState };
  const ratings = (
    (((response || {}).general_analysis || {}).payload || {}).ratings || {}
  ).watchdog
    ? ((((response || {}).general_analysis || {}).payload || {}).ratings || {})
        .watchdog
    : "";

  const totalReviews = (((response || {}).wot || {}).payload || {}).comments
    ? (((response || {}).wot || {}).payload || {}).comments.length
    : 0;

  return { ratings, totalReviews };
};

const renderOnlyScoreWidgetComponent = (parentState, props) => {
  if (props.variant !== "carousel") {
    const requiredData = retrieveRequiredData(parentState);
    return (
      <OnlyScoreWidgetComponent
        requiredData={requiredData}
        variant={props.variant}
      />
    );
  }
  else{
    return (
      <OnlyScoreWidgetComponent
        requiredData={props.requiredData}
        variant={props.variant}
      />
    );
  }
};

const OnlyScoreWidget = props => {
  let initState = {};
  const [parentState, setParentState] = useState(initState);
  return (
    <>
      {props.variant !== "carousel" ? (
        <PusherDataComponent
          domain={props.domain}
          onChildStateChange={newState => {
            setParentState({ ...parentState, ...newState });
          }}
        />
      ) : (
        <></>
      )}
      {renderOnlyScoreWidgetComponent(parentState, props)}
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
