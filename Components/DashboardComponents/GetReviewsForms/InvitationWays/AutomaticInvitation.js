import React, { Component } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";

const automaticIntegrationMethods = [
  {
    id: 1,
    name: "API",
    description:
      "How to integrate our API with your system. Some description about the same will be here.",
    value: "api"
  },
  {
    id: 2,
    name: "Woocommerce",
    description:
      "How to integrate our API with your Woocommerce system. Some description about the same will be here.",
    value: "woocommerce"
  },
  {
    id: 3,
    name: "Wordpress",
    description:
      "How to integrate our API with your Wordpress system. Some description about the same will be here.",
    value: "wordpress"
  },
  {
    id: 4,
    name: "Magento",
    description:
      "How to integrate our API with your Magento system. Some description about the same will be here.",
    value: "magento"
  },
  {
    id: 5,
    name: "Shopify",
    description:
      "How to integrate our API with your Shopify system. Some description about the same will be here.",
    value: "shopify"
  }
];

export default class AutomaticInvitation extends Component {
  state = {
    selectedOption: ""
  };

  handeRadioChange = event => {
    const { value } = event.target;
    const { sendToSelectTemplate } = this.props;
    this.setState({ selectedOption: value });
    // sendToSelectTemplate();
  };

  renderExpansionPanels = () => {
    const { selectedOption } = this.state;
    const output = automaticIntegrationMethods.map((item, index) => {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={<Radio />}
              label={item.name}
              value={item.value}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary">{item.description}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
    return output;
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
            {this.renderExpansionPanels()}
          </RadioGroup>
        </div>
      </div>
    );
  }
}
