import React, { Component } from "react";
import Pusher from "pusher-js";

class DomainPusherComponent extends Component {
  state = { reviewScrapeResult: {} };
  pusherCopy = null;

  componentDidMount() {
    const { domain } = this.props;
    console.log(domain)
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });

    this.pusherCopy = pusher;
    const channel = pusher.subscribe(domain);
    pusher.connection.bind("connected", () => {
      console.log("connected");
      this.bindToKey(pusher, channel);
    });
  }
  //change state and create separate onChildStateChange for both.
  bindToKey = (pusher, channel) => {
    channel.bind("google_reviews", data => {
      //   this.setState({ reviewScrapeResult: { ...data } }, () => {
      //     // this.props.onChildStateChange(this.state.reviewScrapeResult);
      //     console.log(data, "response from DomainPusherComponent Google_Reviews");
      //     // pusher.disconnect();
      //   });
      console.log(data, "response from DomainPusherComponent Google_Reviews");
    });

    channel.bind("aggregator", data => {
      this.props.onAggregatorDataChange(data)
      console.log(
        data,
        "response from DomainPusherComponent DomainNameAggregator"
      );
    });

    setTimeout(() => {
      pusher.disconnect();
    }, 300000);

    pusher.connection.bind("disconnected", () => {
      console.log("disconnected");
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
