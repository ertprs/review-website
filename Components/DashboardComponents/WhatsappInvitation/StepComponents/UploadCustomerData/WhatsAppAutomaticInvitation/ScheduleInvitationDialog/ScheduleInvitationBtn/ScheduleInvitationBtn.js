import React from "react";
import Button from "@material-ui/core/Button";
const ScheduleInvitationBtn = props => {
  const { handleClick } = props;
  return (
    <Button onClick={handleClick} size="small">
      Click here to schedule your invitation
    </Button>
  );
};

export default ScheduleInvitationBtn;
