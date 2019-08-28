import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import {emailSubscriptionStyles} from './emailSubscriptionStyles';

class EmailSubscription extends React.Component {
  handleEmailSubmit = () => {
    alert("sent");
  };

  render() {
    return (
      <div className="emailSubscriptionContainer">
          <style jsx>
              {emailSubscriptionStyles}
          </style>
        <div className="emailSubscriptionHeader">
        <h6 className="heading">
          Please leave your email to receive suggestions on improving
          Trustworthiness of your website.
        </h6>
        </div>
        <div className="emailSubscriptionBoxContainer">
          <SearchBox
            variant="business"
            text="SEND"
            placeholder="name@mail.com"
            handleSearchSubmit={this.handleSearchBoxSubmit}
          />
        </div>
        <div className="emailSubscriptionCheckBox">
            Check if this is your website
        </div>
      </div>
    );
  }
}

export default EmailSubscription;
