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
  const [title, setTitle] = useState("");
  const classes = useStyles();
  const { open, handleClose, activeEvent } = props;
  const event = _get(activeEvent, "event", "");
  const value = _get(activeEvent, "value", "");

  const renderComponentByEvent = () => {
    switch (event) {
      case "qr_code_changed":
        // setTitle("Scan QR Code");
        return <QRCode QRCodeString={value || ""} />;
      case "qr_code_expired":
        // setTitle("QR Code Expired");
        return "Expired QR Code";
      case "login_successful":
        // setTitle("Logged In Successfully!");
        return <QRLoggedInMsg />;
      case "campaign_started":
        // setTitle("Campaign Started!");
        return <CampaignStarted />;
      case "campaign_finished":
        // setTitle("Campaign Finished!");
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
          </Toolbar>
          {renderComponentByEvent()}
        </AppBar>
      </Dialog>
    </div>
  );
};

export default QRCodeDialog;
