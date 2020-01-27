import React from "react";
import getQRCode from "yaqrcode";
import MenuIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import styles from "../styles";

const QRCode = ({ QRCodeString }) => {
  return (
    <div className="row">
      <style jsx>{styles}</style>
      <div className="col-md-5">
        <h3>Scan QR code to start sending invites:</h3>
        <ol>
          <li>Open WhatsApp on your phone.</li>
          <li>
            Tap Menu <MenuIcon /> or Setting <SettingsIcon /> and select
            WhatsApp Web
          </li>
          <li> Point your phone to this screen to capture the code</li>
        </ol>
      </div>
      <div className="col-md-7">
        <div className="qrCodeContainer">
          <img
            className="qrCodeImg"
            src={getQRCode(QRCodeString, { size: 500 })}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCode;
