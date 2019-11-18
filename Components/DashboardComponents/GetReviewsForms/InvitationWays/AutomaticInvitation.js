import React, { Component } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";

export default class AutomaticInvitation extends Component {
  state = {
    selectedOption: ""
  };

  handeRadioChange = event => {
    const { value } = event.target;
    const { sendToSelectTemplate } = this.props;
    this.setState({ selectedOption: value });
    sendToSelectTemplate();
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <style jsx>{`
          .mt-20 {
            margin-top: 20px;
          }
        `}</style>
        <h1>Automatic Invitation</h1>
        <p>Ask your customers to leave a review about their experience</p>
        <h5>Choose any of the methods below to add customers to invite</h5>
        <div className="mt-20">
          <RadioGroup
            aria-label="typesOfinvitation"
            name="typesOfinvitation"
            value={selectedOption}
            onChange={this.handeRadioChange}
          >
            <FormControlLabel value="api" control={<Radio />} label="Api" />
            <FormControlLabel
              value="woocommerce"
              control={<Radio />}
              label="Woocommerce"
            />
            <FormControlLabel
              value="wordpress"
              control={<Radio />}
              label="Word Press"
            />
            <FormControlLabel
              value="magento"
              control={<Radio />}
              label="Magento"
            />
            <FormControlLabel
              value="shopify"
              control={<Radio />}
              label="Shopify"
            />
          </RadioGroup>
        </div>
      </div>
    );
  }
}
