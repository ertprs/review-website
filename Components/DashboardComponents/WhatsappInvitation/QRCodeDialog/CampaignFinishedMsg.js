import React from "react";
import _get from "lodash/get";

export default function({ result }) {
  const failed = _get(result, "failed", 0);
  const success = _get(result, "success", 0);
  return (
    <div>
      <h2>Campaign Finished!</h2>
      <span>Here are the results:</span>
      <span>Successful: {success}</span>
      <span>Failed: {failed}</span>
    </div>
  );
}
