import React from "react";
import _get from "lodash/get";
import Expansion from "./Expansion";

export default function({ result }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <style jsx>
        {`
          .heading,
          .subHeading {
            margin-bottom: 50px;
          }
        `}
      </style>
      <h2 className="heading">Campaign Finished !</h2>
      <h6 className="subHeading">Here are the results : </h6>
      <Expansion result={result || {}} />
    </div>
  );
}
