import React from "react";
import { connect } from "react-redux";
import getQRCode from "yaqrcode";
import MenuIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import ReloadIcon from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "../styles";
import _get from "lodash/get";

const QRCode = ({
  QRCodeString,
  reloadQRCode,
  isLoading,
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
                className="qrCodeEl"
                src={getQRCode(QRCodeString, { size: 500 })}
              />
            ) : //? showing loader when any of two api call is in progress or we haven't received any broadcast from pusher
            isLoading ? (
              <div className="qrCodeEl">
                <CircularProgress size={250} />
              </div>
            ) : whatsAppPusherConnected ? (
              <div className="qrCodeMsg">
                <h6>Loading QR code...</h6>
              </div>
            ) : (
              <Tooltip
                title={
                  <span style={{ fontSize: "14px" }}>
                    Click to reload QR code
                  </span>
                }
              >
                <IconButton onClick={reloadQRCode}>
                  <ReloadIcon style={{ height: "250px", width: "250px" }} />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { dashboardData } = state;
  let whatsAppManualInvitationInit = _get(dashboardData, "whatsAppManualInvitationInit", {});
  let whatsAppManualInvitationCommit = _get(dashboardData, "whatsAppManualInvitationCommit", {});
  const isLoading =
    _get(whatsAppManualInvitationInit, "isLoading", false) ||
    _get(whatsAppManualInvitationCommit, "isLoading", false);
  return {
    isLoading
  };
};

export default connect(mapStateToProps)(QRCode);
