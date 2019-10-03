import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import {baseURL} from '../../utility/config';
//child component to fetch data and listen to channels and in turn update parent component


class PusherDataComponent extends React.Component {
  state = { domainData: {} };
  pusherCopy=null

   unBindKeys = (pusher, channel, key) => {
    channel.unbind(key);
  };

   unBindAllKeys = (pusher, channel) => {
    channel.unbind();
    pusher.disconnect();
  };

   unBindReceivedKeys = (pusher, channel) => {
    
    for (let key in this.state.domainData) {
      channel.unbind(this.state.domainData);
    }
  };

  bindToScheduledKeys = (
  pusher,
  channel,
  responseData
) => {
  let sch = (responseData || {}).sch || [];
  if (sch.length > 0) {
    sch.forEach(key => {
      channel.bind(key, data => {
        this.setState({ domainData : {...this.state.domainData, [key]: {...data.response} }}, ()=>{
          this.props.onChildStateChange(this.state.domainData)
        });
      });
    });
  } else {
    pusher.disconnect();
  }
};

  componentDidMount() {
    const { domain } = this.props;
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });
    this.pusherCopy = pusher;
    const channel = pusher.subscribe(domain);
    // on connection make a network request for intial keys -
    pusher.connection.bind("connected", () => {
      axios
        .get(
          `${baseURL}/api/verify?domain=https://${domain}`
        )
        .then(res => {
          //set the state and call unbindRecievedKeys
          this.setState({ domainData : {...this.state.domainData, ...res.data.response}}, ()=>{
            this.props.onChildStateChange(this.state.domainData)
            if (((res || {}).data || {}).response) {
              this.unBindReceivedKeys(pusher, channel, res.data.response);
              this.bindToScheduledKeys(
                pusher,channel,
                res.data.response,
              );
            }
            //else poll till no key comes
            else{
                let intr = setInterval(()=>{
                    axios.get(`${baseURL}/api/verify?domain=https://${domain}`)
                    .then(res=>{
                        this.setState({ domainData : {...this.state.domainData, ...res.data.response}}, ()=>{
                        this.props.onChildStateChange(this.state.domainData)
                        if (((res || {}).data || {}).response) {
                            this.unBindReceivedKeys(pusher, channel, res.data.response);
                            this.bindToScheduledKeys(
                              pusher,channel,
                              res.data.response,
                            );
                            clearInterval(intr)
                          }
                        })
                    })
                    .catch(err=>{
                    })
                }, 500)
            }

          });
        })
        .catch(err => {
        });
    });

    pusher.connection.bind("disconnected", () => {
    });
  }

  componentWillUnmount(){
    this.pusherCopy.disconnect();
  }

  render() {
    return <div></div>;
  }
}

export default PusherDataComponent;
