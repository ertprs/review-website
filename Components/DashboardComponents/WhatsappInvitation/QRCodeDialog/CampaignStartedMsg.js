import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CampaignStartedMsg() {
  return (
    <div className="container textCenter">
      <CircularProgress />
      <div className="mt_25px">Sending your messages...</div>
    </div>
  );
}
