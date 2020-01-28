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
import QRCode from "./QRCode";
import QRLoggedInMsg from "./QRLoggedInMsg";
import CampaignStarted from "./CampaignStartedMsg";
import CampaignFinished from "./CampaignFinishedMsg";

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
    whatsAppPusherConnected
  } = props;
  const event = _get(activeEvent, "event", "");
  const value = _get(activeEvent, "value", "");
  let title = "";
  const renderComponentByEvent = () => {
    switch (event) {
      case "qr_code_changed":
        title = "Scan QR Code";
        return <QRCode QRCodeString={value || ""} />;
      case "qr_code_expired":
        title = "QR Code Expired";
        return (
          <QRCode
            QRCodeString=""
            reloadQRCode={reloadQRCode}
            activeEvent={activeEvent}
            whatsAppPusherConnected={whatsAppPusherConnected}
          />
        );
      case "login_successful":
        console.log("LOGIN SUCCESSS DIALOG");
        title = "Logged In Successfully!";
        return <QRLoggedInMsg />;
      case "campaign_started":
        title = "Campaign Started!";
        return <CampaignStarted />;
      case "campaign_finished":
        title = "Campaign Finished!";
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
