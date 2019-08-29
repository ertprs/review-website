import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import FormField from '../FormField/FormField';
import {emailSubscriptionStyles} from './emailSubscriptionStyles';

class EmailSubscription extends React.Component {

  state = {
    formData:{
      websiteOwner: {
        element: "checkbox",
        type: "text",
        value: this.props.websiteOwner,
        placeholder: "Name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: false
        },
        name: "websiteOwner"
      },
    }
  }

  handleSubmit = (e)=>{
    this.props.handleSubscriptionEmailSubmit(e);
  }

  handleOwnerChange = (e)=>{
    this.props.handleWebsiteOwnerChange(e.target.value)
  }

  render() {
    console.log(this.state.formData.websiteOwner.value)
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
        <FormField
              {...this.state.formData.websiteOwner}
              id="websiteOwner"
              handleChange={this.handleOwnerChange}
        />
        </div>
      </div>
    );
  }
}

export default EmailSubscription;
