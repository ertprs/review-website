import React, { Component } from "react";
import Pusher from "pusher-js";
import { profilePageLoadingTimeout } from "../../utility/constants/pusherTimeoutConstants";

class DomainPusherComponent extends Component {
  state = { reviewScrapeResult: {} };
  pusherCopy = null;

  componentDidMount() {
    const { domain } = this.props;
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });

    this.pusherCopy = pusher;
    const channel = pusher.subscribe(domain);
    pusher.connection.bind("connected", () => {
      console.log("aggregator pusher connected");
      this.bindToKey(pusher, channel);
    });
  }
  //change state and create separate onChildStateChange for both.
  bindToKey = (pusher, channel) => {
    channel.bind("aggregator", data => {
      this.props.onAggregatorDataChange(data);
      console.log(data, "response from aggregator pusher");
    });

    setTimeout(() => {
      pusher.disconnect();
    }, profilePageLoadingTimeout);

    pusher.connection.bind("disconnected", () => {
      console.log("aggregator pusher disconnected");
    });
  };

  componentWillUnmount() {
    this.pusherCopy.disconnect();
  }

  render() {
    return <div></div>;
  }
}

export default DomainPusherComponent;
