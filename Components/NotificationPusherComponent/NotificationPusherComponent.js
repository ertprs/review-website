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
    channel.bind("invite_stats", data => {
      this.props.onCampaignInvitesDataChange(data);
      console.log(data, "Response from invites notification");
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
