import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import _get from "lodash/get";
import CampaignScheduleAutomatic from "../../../../../GetReviewsForms/CampaignScheduleAutomatic";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleInvitationDialog = props => {
  const classes = useStyles();
  const {
    open,
    handleClose,
    sendAfterMinutes,
    handleSendAfterMinutesChange
  } = props;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Schedule invitations
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: "35px" }}>
          <CampaignScheduleAutomatic
            handleChange={handleSendAfterMinutesChange}
            campaignScheduleAutomaticData={sendAfterMinutes}
            showSaveBtn={true}
            handleSave={handleClose}
            handleClose={handleClose}
            captionText="* If you do not select a time from above, it will automatically be set to sent immediately"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ScheduleInvitationDialog;
