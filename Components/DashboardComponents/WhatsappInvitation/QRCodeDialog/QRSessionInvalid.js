import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function QRSessionInvalid() {
  return (
    <div className="container">
      <style jsx>
        {`
          .campaignStartedContainer {
            display: flex;
            width: 100%;
            height: 100vh;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .redText {
            color: red;
          }
          .textCenter {
            text-align: center;
          }
          .mt_10 {
            margin-top: 10px;
          }
        `}
      </style>
      <div className="campaignStartedContainer">
        <div>
          <h4>
            Your session has expired! Please wait while we load new QR code for
            you
          </h4>
          <div className="textCenter mt_10">
            <CircularProgress color="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
