import React from "react";
import _get from "lodash/get";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const NoReviewsFound = ({ isReviewsPusherConnected }) => {
  return (
    <>
      <style jsx>{`
        .container {
          height: 60vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text {
          font-size: 22px;
        }
      `}</style>
      <div className="container">
        {isReviewsPusherConnected === true ? (
          <CircularProgress />
        ) : (
          <h1 className="text">Reviews will be updated soon!</h1>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  const { dashboardData } = state;
  const isReviewsPusherConnected = _get(
    dashboardData,
    "isReviewsPusherConnected",
    false
  );

  return {
    isReviewsPusherConnected
  };
};

export default connect(mapStateToProps)(NoReviewsFound);
