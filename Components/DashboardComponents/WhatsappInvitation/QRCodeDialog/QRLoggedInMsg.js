import React from "react";

function QRLoggedInMsg() {
  return (
    <div className="container">
      <style jsx>
        {`
          .campaignStartedContainer {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .imageContainer {
            max-width: 400px;
            height: auto;
          }
          .imageContainer img {
            max-width: 100%;
            height: auto;
          }
        `}
      </style>
      <div className="campaignStartedContainer">
        <div className="imageContainer">
          <img src="/static/images/check-mark-animated.gif" />
        </div>
        <div>
          <h4>Logged in successfully, preparing your invitations...</h4>
        </div>
      </div>
    </div>
  );
}

export default QRLoggedInMsg;
