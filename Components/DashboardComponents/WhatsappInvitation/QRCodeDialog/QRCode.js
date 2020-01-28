import React from "react";
import { connect } from "react-redux";
import getQRCode from "yaqrcode";
import MenuIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import ReloadIcon from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "../styles";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import isEmpty from "lodash/isEmpty";

const QRCode = ({
  QRCodeString,
  reloadQRCode,
  isLoading,
  activeEvent,
  whatsAppPusherConnected
}) => {
  return (
    <div className="container">
      <div className="row">
        <style jsx>{styles}</style>
        <div className="col-md-6 p_25 mt_50">
          <h3>Scan QR code to start sending invites:</h3>
          <ol className="QRCodeStepsList">
            <li>Open WhatsApp on your phone.</li>
            <li>
              Tap Menu <MenuIcon /> or Setting <SettingsIcon /> and select
              WhatsApp Web
            </li>
            <li> Point your phone to this screen to capture the code</li>
          </ol>
        </div>
        <div className="col-md-6">
          <div className="qrCodeContainer">
            {QRCodeString ? (
              <img
                className="qrCodeImg"
                src={getQRCode(QRCodeString, { size: 500 })}
              />
            ) : //? showing loader when any of two api call is in progress or we haven't received any broadcast from pusher
            isLoading ? (
              <CircularProgress size={50} />
            ) : whatsAppPusherConnected ? (
              <h6>loading QR code...</h6>
            ) : (
              <IconButton onClick={reloadQRCode}>
                <ReloadIcon size={50} />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { dashboardData } = state;
  let whatsAppManualInvite = _get(dashboardData, "whatsAppManualInvite", {});
  let whatsAppManualCommit = _get(dashboardData, "whatsAppManualCommit", {});
  const isLoading =
    _get(whatsAppManualInvite, "isLoading", false) ||
    _get(whatsAppManualCommit, "isLoading", false);
  return {
    isLoading
  };
};

export default connect(mapStateToProps)(QRCode);
