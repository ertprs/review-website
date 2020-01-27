import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CampaignStartedMsg() {
  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <CircularProgress />
      <div style={{marginTop:"25px"}}>Started sending invitations..</div>
    </div>
  );
}
