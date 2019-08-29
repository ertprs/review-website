import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import {emailSubscriptionStyles} from './emailSubscriptionStyles';

class EmailSubscription extends React.Component {


  handleSubmit = (e)=>{
    this.props.handleSubscriptionEmailSubmit(e);
  }

  handleOwnerChange = (e)=>{
    this.props.handleWebsiteOwnerChange(e.target.value)
  }

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
            value={this.props.value}
            placeholder="name@mail.com"
            handleSearchSubmit={this.handleSubmit}
            onchange={this.props.handleEmailChange}
          />
        </div>
        <div className="emailSubscriptionCheckBox">
          <label>
            <input type="checkbox" onChange={(e)=> this.props.handleWebsiteOwnerChange(e.target.value==="yes" ? "no": "yes")} value={this.props.websiteOwner}
            checked={this.props.websiteOwner==="yes" ? true : false}/> Check if this is your website
          </label>
        </div>
        <div className="emailSubscriptionError">
          {this.props.touched && !this.props.valid ? <span>please enter valid email address</span> : null}
        </div>
      </div>
    );
  }
}

export default EmailSubscription;
