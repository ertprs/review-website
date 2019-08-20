import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import keys from "../../static/utils/keys";

// 1- subscribe to all the keys -
// 2- on connection make a network request for verification -
// *-if connection fails, poll repeatedly and do 3-4 till all received
// 3- Recieve the initial keys -
// 4- compare with the subscribed keys and unsubscribe the already received.
//* As soon as the state changes with the introduction of the binded key, unsubscribe to it (alternate to step 4)
// 5- at the end close the connection.

//to unbind as the response is received
const unBindKeys = (pusher,channel, key, domainData) => {
  if (Object.keys(domainData).length >= 10) {
    unBindAllKeys(pusher, channel);
  }
  channel.unbind(key);
};

// to unbind all the keys if got them all in the initial request and disconnect pusher
const unBindAllKeys = (pusher, channel) => {
  channel.unbind();
  pusher.disconnect();
};

//to unbind if a few were received in the initial req and not all
const unBindReceivedKeys = (pusher, channel, domainData) => {
  if (Object.keys(domainData).length === 11) {
    unBindAllKeys(pusher, channel);
  }
  //unbinding loop for few channels
  else {
    for (let key in domainData) {
      channel.unbind(key);
    }
  }
};


//To bind to all keys on component mounting
// const bindToAllKeys = (payloadKey, setDomainData, domainData, pusher, channel)=>{
//   channel.bind(payloadKey, data => {
//     let newDomainData = {[payloadKey]:data.response};
//     console.log(domainData)
//     setDomainData({ ...domainData, ...newDomainData });
//     unBindKeys(pusher,channel, payloadKey, domainData);
//   });
// }

const TestComponent = props => {
  const [domainData, setDomainData] = useState({});
  const allKeys = { ...keys };

  useEffect(() => {
    const { domain } = props;
    const pusher = new Pusher("a962a1b0d1b0ab9e3399", {
      cluster: "ap2",
      forceTLS: true
    });

    const channel = pusher.subscribe(domain);

    //Loop to bind to all the keys and unbind on receiving the data
    //closure problem, fix - go for individual keys

    const bindToAllKeys = (payloadKey)=>{
      channel.bind(payloadKey, data => {
        let newDomainData = {[payloadKey]:data.response};
        console.log(domainData)
        setDomainData({ ...domainData, ...newDomainData });
        unBindKeys(pusher,channel, payloadKey, domainData);
      });
    }
    
    for (let key in allKeys) {
      let payloadKey = allKeys[key]
      bindToAllKeys(payloadKey)
    } 
    //loop end

    // on connection make a network request for intial keys -
    pusher.connection.bind("connected", () => {
      console.log("connected");
      axios
        .get(
          `https://search-api-dev.cryptopolice.com/api/verify?domain=https://${domain}`
        )
        .then(res => {
          //set the state and call unbindRecievedKeys
          setDomainData({ ...domainData, ...res.data.response });
          unBindReceivedKeys(pusher, channel, res.data.response);
        })
        .catch(err => {
          console.log(err);
        });
    });

    pusher.connection.bind("disconnected", () => {
      console.log("disconnected");
    });

    // returned function will be called on component unmount
    return () => {
      console.log("unmounted");
      pusher.disconnect();
    };
  }, []);
  console.log(domainData)
  return <div>Pusher React test component</div>;
};

export default TestComponent;
