import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
class BottomNotificationBar extends Component {
  renderSaveAndCloseBtn() {
    return (
      <div className="btnContainer">
        <div className="row">
          <div className="col-md-6">
            <div style={{ textAlign: "center" }}>
              <Button
                color="primary"
                variant="contained"
                size="small"
                endIcon={<CloseIcon />}
              >
                Close
              </Button>
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: "center" }}>
              <Button
                color="primary"
                variant="contained"
                size="small"
                endIcon={<SaveIcon />}
              >
                Save permanently
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <style jsx>
          {`
            .bottomNotificationContainer {
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              background: rgba(35, 93, 87, 0.8);
              padding: 10px 10px 8px 10px;
            }
            .notificationMsg {
              color: #fff;
              font-weight: bold;
            }
          `}
        </style>
        <div className="bottomNotificationContainer">
          <div className="row">
            <div className="col-md-7 offset-md-1">
              <div className="notificationMsg">
                * Save your changes permanently before leaving this page by
                clicking the save permanently button on the right.
              </div>
            </div>
            <div className="col-md-4">{this.renderSaveAndCloseBtn()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default BottomNotificationBar;
