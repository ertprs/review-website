import React, { Component } from "react";
import Pusher from "pusher-js";

class NotificationPusherComponent extends Component {
  pusherCopy = null;

  componentDidMount() {
    const { subscriptionId } = this.props;
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });

    this.pusherCopy = pusher;
    const channel = pusher.subscribe(`notifications.${subscriptionId}`);
    pusher.connection.bind("connected", () => {
      console.log("Notification pusher connected");
      this.bindToKey(pusher, channel);
    });
  }
  bindToKey = (pusher, channel) => {
    channel.bind("account_notifications", data => {
      this.props.onNotificationPusherDataChange(data);
      console.log(data, "Response from notification pusher");
    });
    pusher.connection.bind("disconnected", () => {
      console.log("Notification pusher disconnected");
    });
  };

  componentWillUnmount() {
    this.pusherCopy.disconnect();
  }

  render() {
    return <></>;
  }
}

export default NotificationPusherComponent;
