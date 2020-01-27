import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CampaignStartedMsg() {
  return (
    <div>
      <CircularProgress />
      Started sending invitations..
    </div>
  );
}
