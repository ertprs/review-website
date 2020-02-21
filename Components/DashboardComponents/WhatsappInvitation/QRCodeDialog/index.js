import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import _get from "lodash/get";
import styles from "../styles";
import QRSessionInvalid from "./QRSessionInvalid";
import QRCode from "./QRCode";
import QRLoggedInMsg from "./QRLoggedInMsg";
import CampaignStarted from "./CampaignStartedMsg";
import CampaignFinished from "./CampaignFinishedMsg";
import CreateCampaign from "./CampaignCreatedMsg";
import Relogin from "./Relogin";

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

const QRCodeDialog = props => {
  const classes = useStyles();
  const {
    open,
    handleClose,
    activeEvent,
    reloadQRCode,
    whatsAppPusherConnected,
    isAutomatic,
    relogin
  } = props;
  const event = _get(activeEvent, "event", "");
  const value = _get(activeEvent, "value", "");
  let title = "";
  const renderComponentByEvent = () => {
    switch (event) {
      case "qr_session_invalid":
        return <QRSessionInvalid />;
      case "qr_code_changed":
        return <QRCode QRCodeString={value || ""} />;
      case "qr_code_expired":
        return (
          <QRCode
            QRCodeString=""
            reloadQRCode={reloadQRCode}
            activeEvent={activeEvent}
            whatsAppPusherConnected={whatsAppPusherConnected}
          />
        );
      case "login_successful":
        return <QRLoggedInMsg />;
      //? We will receive this broadcast in both automatic and manual invitations but we are using this in automatic invitations only.
      //? In automatic invitations we are using this to make createCampaign API call and it will be the last broadcast.
      //? We are also using this in case of relogin and in that case we will get relogin=true and will render different component
      case "db_session_updated":
        return isAutomatic ? <CreateCampaign /> : relogin ? <Relogin /> : null;
      case "campaign_started":
        return <CampaignStarted />;
      case "campaign_finished":
        return <CampaignFinished result={value || {}} />;
      default:
        null;
    }
  };

  return (
    <div>
      <style jsx>{styles}</style>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            {event === "campaign_finished" ||
            "qr_code_expired" ||
            "db_session_updated" ||
            "qr_code_changed" ? (
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
        {renderComponentByEvent()}
      </Dialog>
    </div>
  );
};

export default QRCodeDialog;
