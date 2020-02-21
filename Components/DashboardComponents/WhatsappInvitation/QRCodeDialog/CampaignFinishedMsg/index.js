import React from "react";
import _get from "lodash/get";
import Expansion from "./Expansion";
import CheckSign from "@material-ui/icons/CloudDoneRounded";

export default function({ result }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <style jsx>
        {`
          .mb_50 {
            margin-bottom: 50px;
          }
          .greenText {
            color: green;
          }
        `}
      </style>
      <CheckSign style={{ height: "6em", width: "6em", color: "green" }} />
      <h2 className="mb_50 greenText">Campaign Finished !</h2>
      <h6 className="mb_50">Here are the results : </h6>
      <Expansion result={result || {}} />
    </div>
  );
}
