import React from "react";
import _get from "lodash/get";

const NoReviewsFound = ({ noReviewFound }) => {
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
        <h1 className="text">
          {noReviewFound ? "No review found!" : "Reviews will be updated soon!"}
        </h1>
      </div>
    </>
  );
};

export default NoReviewsFound;
