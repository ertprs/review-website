import React, { Component } from "react";
import Pusher from "pusher-js";

export default class ReviewsPusher extends Component {
  state = { reviewScrapeResult: {} };
  pusherCopy = null;


  componentDidMount(){
    const { domain } = this.props;
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });

    this.pusherCopy = pusher;
    const channel = pusher.subscribe(domain);
    pusher.connection.bind("connected", ()=>{
        console.log("connected")
        this.bindToKey(pusher, channel);
    });
  }

  bindToKey = (pusher, channel)=>{
    channel.bind('google_reviews', (data)=>{
        this.setState({reviewScrapeResult:{...data}}, ()=>{
            this.props.onChildStateChange(this.state.reviewScrapeResult);
            console.log(data, "response from pusher")
            pusher.disconnect();
        })
    });

    setTimeout(()=>{
        pusher.disconnect();
    }, 300000)

    pusher.connection.bind("disconnected", () => {console.log("disconnected")});
  }

  componentWillUnmount() {
    this.pusherCopy.disconnect();
  }

  render() {
    return <div></div>;
  }
}
