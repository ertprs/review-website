import React from "react";
import _get from "lodash/get";

export default function({ result }) {
  const failed = _get(result, "failed", 0);
  const success = _get(result, "success", 0);
  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h2>Campaign Finished!</h2>
      <div>Here are the results:</div>
      <div>Successful: {success}</div>
      <div>Failed: {failed}</div>
    </div>
  );
}
