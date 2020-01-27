import React, { Component } from "react";
import Pusher from "pusher-js";
import {
  setReviewsPusherConnect,
  setReviewsLoadingStatus
} from "../../store/actions/dashboardActions";
import { connect } from "react-redux";
import _get from "lodash/get";

class WhatsAppInvitationPusher extends Component {
  state = { reviewScrapeResult: {}, timeOutKey: "" };
  pusherCopy = null;

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevProps.type !== this.props.type) {
  //       const { timeOutKey } = this.state;
  //       if (this.props.type) {
  //         if (this.props.type === "LOCATE_PLACE_SUCCESS") {
  //           clearTimeout(timeOutKey);
  //           let newTimeOutKey = setTimeout(() => {
  //             this.pusherCopy.disconnect();
  //           }, 300000);
  //           this.setState({ timeOutKey: newTimeOutKey });
  //         }
  //       }
  //     }
  //   }

  componentDidMount() {
    const { channelName, setReviewsPusherConnect } = this.props;
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });

    this.pusherCopy = pusher;
    const channel = pusher.subscribe(channelName);
    pusher.connection.bind("connected", () => {
      console.log("WhatsApp pusher connected");
      //   setReviewsPusherConnect(true);
      this.bindToKey(pusher, channel);
    });
  }

  bindToKey = (pusher, channel) => {
    const {
      whatsAppPusherHandler,
      setReviewsPusherConnect,
      setReviewsLoadingStatus
    } = this.props;

    channel.bind("qr_scan", data => {
      let event = "qr_scan";
      this.props.whatsAppPusherHandler(event, data);
      console.log(data, "qr_scan event from WhatsApp pusher");
    });

    channel.bind("qr_scan_complete", data => {
      let event = "qr_scan_complete";
      this.props.whatsAppPusherHandler(event, data);
      console.log(data, "qr_scan_complete event from WhatsApp pusher");
    });

    channel.bind("qr_expired", data => {
      let event = "qr_expired";
      this.props.whatsAppPusherHandler(event, data);
      // disconnect when received
      console.log(data, "qr_expired event from WhatsApp pusher");
    });

    channel.bind("send_failed", data => {
      let event = "send_failed";
      this.props.whatsAppPusherHandler(event, data);
      console.log(data, "send_failed from WhatsApp pusher");
    });

    channel.bind("send_success", data => {
      let event = "send_success";
      this.props.whatsAppPusherHandler(event, data);
      console.log(data, "send_success event from WhatsApp pusher");
    });

    pusher.connection.bind("disconnected", () => {
      //   setReviewsPusherConnect(false);
      //? This will stop loading of reviews, because pusher is disconnected.
      //   setReviewsLoadingStatus([], false);
      console.log("WhatsAppInvitationPusher pusher disconnected");
    });
  };

  componentWillUnmount() {
    this.pusherCopy.disconnect();
  }

  render() {
    return <div></div>;
  }
}

//! A top level handler to handle pusher events appropriately
const whatsAppPusherHandler = (event, data) => {
  switch (event) {
    case "qr_scan":
      this.qrScanInitHandler(data);
      break;
    case "qr_scan_complete":
      this.qrScanCompleteHandler(data);
      break;
    case "qr_expired":
      this.qrScanExpiredHandler(data);
      break;
    case "send_failed":
      this.sendFailedHandler(data);
      break;
    case "send_success":
      this.sendSuccessHandler(data);
      break;
  }
};

//! Function to handle qrScanInit step, need to generate a QR code using the string
const qrScanInitHandler = data => {
  const code = _get(data, "code", "");
  //display QR code.
};

//! Function to handle qrScanComplete step, display loader of sending invites

const qrScanCompleteHandler = data => {
  //display loader of sending invites
};

//! Function to disconnect the pusher and go for retry from scanning step
const qrScanExpiredHandler = data => {
  // Need to disconnect the pusher and go for retry from scanning step
};

//! Function to disconnect the pusher ...
const sendFailedHandler = data => {
  //display appropriate error msg and show retry option.
};

//! Function to disconnect the pusher and go show success message
const sendSuccessHandler = data => {
  //display appropriate success message and redirect to step one.
};

const mapStateToProps = (state, ownProps) => {
  const type = _get(state, "dashboardData.type", "");
  return { type };
};

export default connect(mapStateToProps, {
  setReviewsPusherConnect,
  setReviewsLoadingStatus
})(WhatsAppInvitationPusher);
