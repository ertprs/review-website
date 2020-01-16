import React, { Component } from "react";
import Pusher from "pusher-js";
import {
  setReviewsPusherConnect,
  setReviewsLoadingStatus
} from "../../store/actions/dashboardActions";
import { connect } from "react-redux";
import _get from "lodash/get";

class ReviewsPusher extends Component {
  state = { reviewScrapeResult: {}, timeOutKey: "" };
  pusherCopy = null;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.type !== this.props.type) {
      const { timeOutKey } = this.state;
      if (this.props.type) {
        if (this.props.type === "LOCATE_PLACE_SUCCESS") {
          clearTimeout(timeOutKey);
          let newTimeOutKey = setTimeout(() => {
            this.pusherCopy.disconnect();
          }, 300000);
          this.setState({ timeOutKey: newTimeOutKey });
        }
      }
    }
  }

  componentDidMount() {
    const { domain, setReviewsPusherConnect } = this.props;
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });

    this.pusherCopy = pusher;
    const channel = pusher.subscribe(domain);
    pusher.connection.bind("connected", () => {
      console.log("connected");
      setReviewsPusherConnect(true);
      this.bindToKey(pusher, channel);
    });
  }

  bindToKey = (pusher, channel) => {
    const { setReviewsPusherConnect, setReviewsLoadingStatus } = this.props;

    channel.bind("aggregator", data => {
      this.props.onAggregatorDataChange(data);
      console.log(data, "response from reviews pusher");
    });

    let timeOutKey = setTimeout(() => {
      pusher.disconnect();
    }, 300000);
    this.setState({ timeOutKey });
    pusher.connection.bind("disconnected", () => {
      setReviewsPusherConnect(false);
      //? This will stop loading of reviews, because pusher is disconnected.
      setReviewsLoadingStatus([], false);
      console.log("reviews pusher disconnected");
    });
  };

  componentWillUnmount() {
    this.pusherCopy.disconnect();
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const type = _get(state, "dashboardData.type", "");
  return { type };
};

export default connect(mapStateToProps, {
  setReviewsPusherConnect,
  setReviewsLoadingStatus
})(ReviewsPusher);
