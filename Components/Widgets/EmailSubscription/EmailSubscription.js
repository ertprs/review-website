import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import UniversalLoader from "../UniversalLoader/UniversalLoader";
import { emailSubscriptionStyles } from "./emailSubscriptionStyles";

class EmailSubscription extends React.Component {
  handleSubmit = e => {
    this.props.handleSubscriptionEmailSubmit(e);
  };

  handleOwnerChange = e => {
    this.props.handleWebsiteOwnerChange(e.target.value);
  };

  renderSubscriptionEmailForm = () => {
    return (
      <div className="emailSubscriptionContainer">
        <div className="emailSubscriptionHeader">
          <h6 className="heading">
            Please leave your email to receive suggestions on improving
            Trustworthiness of your website.
          </h6>
        </div>
        <style jsx>{emailSubscriptionStyles}</style>
        {this.props.subscriptionEmailSent === "no" ? (
          this.renderForm()
        ) : (
          <UniversalLoader
            status={this.props.subscriptionEmailSent}
          >
            {/* First child for loading state */}
            <div style={{textAlign:"center"}}>Adding your email ... <i className="fa fa-check"></i></div>
            {/* Second child for success state */}
            <div style={{textAlign:"center"}}>Email added successfully <i className="fa fa-check"></i></div>
            {/* third child for error state */}
            <div style={{textAlign:"center"}}>Some error occured, please try again later <i className="fa fa-check"></i></div>
          </UniversalLoader>
        )}
      </div>
    );
  };

  renderForm = () => {
    return (
      <>
        <style jsx>{emailSubscriptionStyles}</style>
        <div className="emailSubscriptionBoxContainer">
          <SearchBox
            variant="business"
            text="SEND"
            value={this.props.value}
            placeholder="name@mail.com"
            handleSearchSubmit={this.handleSubmit}
            onchange={this.props.handleEmailChange}
          />
          <div className="emailSubscriptionError">
            {this.props.touched && !this.props.valid ? (
              <span>Please enter a valid email address</span>
            ) : null}
          </div>
        </div>
        <div className="emailSubscriptionCheckBox">
          <label>
            <input
              type="checkbox"
              onChange={e =>
                this.props.handleWebsiteOwnerChange(
                  e.target.value === "yes" ? "no" : "yes"
                )
              }
              value={this.props.websiteOwner}
              checked={this.props.websiteOwner === "yes" ? true : false}
            />{" "}
            Check if this is your website
          </label>
        </div>
      </>
    );
  };

  render() {
    return <>{this.renderSubscriptionEmailForm()}</>;
  }
}

export default EmailSubscription;
