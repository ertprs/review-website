import React, { Component } from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import WhatsAppInvitationPusher from "../WhatsAppInvitationPusher";
import Snackbar from "../../../Widgets/Snackbar";
import {
  whatsAppAutomaticInvitationInit,
  emptyWhatsAppData
} from "../../../../store/actions/dashboardActions";
import { showWhatsAppNotificationBar } from "../../../../store/actions/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import _get from "lodash/get";
const QRCodeDialog = dynamic(() => import("../QRCodeDialog"), {
  loading: () => (
    <div className="dynamicImport">
      <p>Loading.....</p>
    </div>
  )
});

class NotificationBar extends Component {
  state = {
    //? mounting pusher when response from commit api is success(inside cdu) and un mounting when qr_code_expired, logout_successful, campaign_failed, campaign_finished
    mountWhatsAppPusher: false,
    openFullScreenDialog: false,
    //? latest broadcasted event
    activeEvent: {},
    openSnackbar: false,
    snackbarVariant: "",
    snackbarMsg: ""
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      whatsAppAutomaticInvitationInit,
      whatsAppAutomaticInvitationCommit
    } = this.props;
    //? snackbar on error of  whatsAppManualInvite || whatsAppManualCommit
    if (
      _get(whatsAppAutomaticInvitationInit, "success", undefined) !==
        _get(prevProps, "whatsAppAutomaticInvitationInit.success", undefined) ||
      _get(whatsAppAutomaticInvitationCommit, "success", undefined) !==
        _get(prevProps, "whatsAppAutomaticInvitationCommit.success", undefined)
    ) {
      if (
        _get(whatsAppAutomaticInvitationInit, "success", undefined) === false
      ) {
        this.setState({
          openSnackbar: true,
          snackbarMsg: _get(
            whatsAppAutomaticInvitationInit,
            "errorMsg",
            "Some error occurred!"
          ),
          snackbarVariant: "error"
        });
      } else if (
        _get(whatsAppAutomaticInvitationCommit, "success", undefined) === false
      ) {
        this.setState({
          openSnackbar: true,
          snackbarMsg: _get(
            whatsAppAutomaticInvitationCommit,
            "errorMsg",
            "Some error occurred!"
          ),
          snackbarVariant: "error"
        });
      }
    }
    //? mounting pusher on success of commit(2nd) api
    if (
      _get(whatsAppAutomaticInvitationCommit, "success", undefined) !==
      _get(prevProps, "whatsAppAutomaticInvitationCommit.success", undefined)
    ) {
      this.setState({
        mountWhatsAppPusher: _get(
          whatsAppAutomaticInvitationCommit,
          "success",
          undefined
        )
      });
    }
  }

  //! A top level handler to handle pusher events appropriately
  whatsAppPusherHandler = data => {
    const event = _get(data, "event", "");
    //add any new case for any other kind of event broadcast e.g: phone disconnected
    switch (event) {
      //! qr_code_started comes when backend opens whatsAppWeb.com in headless browser. Doesn't useful for us.
      case "qr_code_started":
        break;
      case "qr_code_changed":
        this.qrCodeChange(data);
        break;
      case "qr_code_expired":
        this.qrCodeExpired(data);
        break;
      case "login_successful":
        this.loginSuccessful(data);
        break;
      case "db_session_updated":
        this.dbSessionUpdated(data);
        break;
      case "logout_successful":
        this.logoutSuccessful(data);
        break;
      case "campaign_failed":
        this.campaignFailed(data);
        break;
      default:
        this.setState({
          mountWhatsAppPusher: false,
          openFullScreenDialog: false,
          openSnackbar: true,
          snackbarMsg: event,
          snackbarVariant: "error"
        });
    }
  };

  //? We open QRCode dialog in qr_code_changed event
  qrCodeChange = data => {
    this.setState({
      openFullScreenDialog: true,
      activeEvent: data
    });
  };

  //? We are unmounting whatsapp pusher and on click of reload button we are calling startWhatsAppInvitation to mount it again
  qrCodeExpired = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data
    });
  };

  loginSuccessful = data => {
    this.setState({ openFullScreenDialog: true, activeEvent: data });
  };

  logoutSuccessful = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data,
      openFullScreenDialog: false,
      openSnackbar: true,
      snackbarMsg: _get(data, "event", "Logged out successfully!"),
      snackbarVariant: "info"
    });
  };

  //? We will receive this broadcast in both automatic and manual invitations but we are using this in automatic invitations only to make createCampaign API call. And in case of automatic this will be the last broadcast.
  dbSessionUpdated = data => {
    this.setState({ activeEvent: data });
  };

  campaignFailed = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data,
      openFullScreenDialog: false,
      openSnackbar: true,
      snackbarMsg: _get(data, "event", "Campaign failed!"),
      snackbarVariant: "error"
    });
  };

  handleQuitCampaign = () => {
    const { emptyWhatsAppData, showWhatsAppNotificationBar } = this.props;
    const { activeEvent } = this.state;
    this.setState(
      {
        openFullScreenDialog: false,
        mountWhatsAppPusher: false
      },
      () => {
        emptyWhatsAppData();
        if (_get(activeEvent, "event", "") === "db_session_updated") {
          showWhatsAppNotificationBar(false);
        }
      }
    );
  };

  render() {
    const {
      whatsAppAutomaticInvitationInit,
      isLoading,
      channelName
    } = this.props;
    const {
      mountWhatsAppPusher,
      openFullScreenDialog,
      activeEvent,
      openSnackbar,
      snackbarMsg,
      snackbarVariant
    } = this.state;
    return (
      <>
        <style jsx>
          {`
            .topNotificationContainer {
              position: fixed;
              bottom: 0;
              width: 100%;
              height: 40px;
              background: #2196f3;
              padding: 10px 0px;
              z-index: 1200;
              text-align: center;
            }
            .notificationMsg {
              color: #fff;
              font-weight: bold;
            }

            .link {
            }

            .link:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          `}
        </style>
        {mountWhatsAppPusher ? (
          <WhatsAppInvitationPusher
            channelName={channelName}
            whatsAppPusherHandler={this.whatsAppPusherHandler}
          />
        ) : null}

        <div className="topNotificationContainer">
          {isLoading || mountWhatsAppPusher ? (
            <CircularProgress size={22} style={{ color: "#fff" }} />
          ) : (
            <span className="notificationMsg">
              Your WhatsApp session is expired. Please login again. &nbsp;
              <span
                className="link"
                onClick={() => {
                  whatsAppAutomaticInvitationInit();
                }}
              >
                Click here
              </span>
            </span>
          )}
        </div>

        <QRCodeDialog
          open={openFullScreenDialog}
          activeEvent={activeEvent || {}}
          handleClose={this.handleQuitCampaign}
          reloadQRCode={() => {
            whatsAppAutomaticInvitationInit();
          }}
          whatsAppPusherConnected={mountWhatsAppPusher}
          relogin={true}
        />
        <Snackbar
          open={openSnackbar}
          message={snackbarMsg}
          variant={snackbarVariant}
          handleClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { whatsAppAutomaticInvitationInit, whatsAppAutomaticInvitationCommit } =
    state.dashboardData || {};
  const channelName = _get(whatsAppAutomaticInvitationInit, "channelName", "");
  const isLoading =
    _get(whatsAppAutomaticInvitationInit, "isLoading", false) ||
    _get(whatsAppAutomaticInvitationCommit, "isLoading", false);
  const whatsAppAutomaticInvitationCommitSuccess = _get(
    whatsAppAutomaticInvitationInit,
    "success",
    false
  );
  return {
    isLoading,
    channelName,
    whatsAppAutomaticInvitationInit,
    whatsAppAutomaticInvitationCommit,
    //? remove this295
    whatsAppAutomaticInvitationCommitSuccess
  };
};

export default connect(mapStateToProps, {
  whatsAppAutomaticInvitationInit,
  emptyWhatsAppData,
  showWhatsAppNotificationBar
})(NotificationBar);
