import React from "react";

export default function NoReviewsFound() {
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
          No reviews found till yet! Will be updated soon
        </h1>
      </div>
    </>
  );
}
