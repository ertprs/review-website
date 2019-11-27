import React, { Component } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NeedDeveloperSupport from "../../../Widgets/NeedDeveloperSupport/NeedDeveloperSupport";
import validate from "../../../../utility/validate";
import Languages from "../../../../utility/languages";
import { sendConfigData } from "../../../../store/actions/dashboardActions";
import _get from "lodash/get";
import _find from "lodash/find";
import * as Forms from "./AutomaticInvitationForms";
import { connect } from "react-redux";

class AutomaticInvitation extends Component {
  state = {
    selectedOption: "",
    formData: {
      woocommerceFormData: {
        shopName: {
          element: "input",
          type: "text",
          value: "",
          placeholder: "Shop Name",
          touched: false,
          valid: false,
          validationRules: {
            required: true
          },
          errorMessage: "",
          name: "name",
          id: "shopName",
          labelText: "Enter shop name"
        },
        consumer_keys: {
          element: "input",
          type: "text",
          value: "",
          placeholder: "Consumer keys",
          touched: false,
          valid: false,
          validationRules: {
            required: true
          },
          errorMessage: "",
          name: "consumer_keys",
          id: "consumer_keys",
          labelText: "Enter key"
        },
        consumer_secret: {
          element: "input",
          type: "text",
          value: "",
          placeholder: "Consumer Secret",
          touched: false,
          valid: false,
          validationRules: {
            required: true
          },
          errorMessage: "",
          name: "consumer_secret",
          id: "consumer_secret",
          labelText: "Enter secret"
        },
        locale: {
          element: "select",
          name: "locale",
          value: "",
          options: [...Languages],
          placeholder: "Select your language",
          valid: false,
          validationRules: {
            required: true
          },
          touched: false,
          errorMessage: "",
          id: "locale",
          labelText: "Select your locale"
        }
      }
    }
  };

  handleFormDataChange = (e, id, formName) => {
    const { formData } = this.state;
    const specificFormData = formData[formName];
    this.setState({
      formData: {
        ...formData,
        [formName]: {
          ...specificFormData,
          [id]: {
            ...specificFormData[id],
            value: e.target.value,
            touched: true,
            valid: validate(
              e.target.value,
              specificFormData[id].validationRules
            )
          }
        }
      }
    });
  };

  handleSaveAndContinue = () => {
    const { woocommerceFormData } = this.state.formData;
    const { sendConfigData } = this.props;
    let reqBody = {
      type: 1,
      name: "API WooCom shop",
      locale: "en",
      authDetails: {
        consumer_keys: _get(woocommerceFormData, "consumer_keys.value", ""),
        consumer_secret: _get(woocommerceFormData, "consumer_secret.value", "")
      }
    };
    sendConfigData(reqBody);
  };

  handeRadioChange = event => {
    const { value } = event.target;
    const { sendToSelectTemplate, availablePlatforms } = this.props;
    let selectedOptionName = _find(availablePlatforms, ["id", value]);
    console.log(selectedOptionName, "selectedOptionName");
    if (selectedOptionName) {
      this.setState({
        selectedOption: value,
        formName: _get(selectedOptionName, "name", "")
      });
    }
    // sendToSelectTemplate();
  };

  renderExpansionPanels = () => {
    const { selectedOption, formData } = this.state;
    const { availablePlatforms } = this.props;
    const output = (availablePlatforms || []).map((item, index) => {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="integration-platforms"
            id="integration-platforms"
            onClick={e => {
              console.log(e.target.value, "hello");
            }}
          >
            <FormControlLabel
              aria-label="Acknowledge"
              //! this will stop expandation on click of radio button
              // onClick={event => event.stopPropagation()}
              // onFocus={event => event.stopPropagation()}
              control={<Radio />}
              label={item.name}
              value={item.id}
              onClick={e => {
                console.log(e.target.value, "hello2");
              }}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary">
              {/* <WoocommerceForm
                formData={{ ...formData.woocommerceFormData }}
                handleFormDataChange={this.handleFormDataChange}
                handleSaveAndContinue={this.handleSaveAndContinue}
              /> */}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
    return output;
  };

  render() {
    console.log(Forms, "Forms");
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-md-6">
            <h1>Automatic Invitation</h1>
            <p>Ask your customers to leave a review about their experience</p>
            <h5>Choose any of the methods below to add customers to invite</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
        <div style={{ marginTop: "50px" }}>
          <NeedDeveloperSupport />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const availablePlatforms = _get(dashboardData, "availablePlatforms.data", []);
  return { availablePlatforms };
};

export default connect(mapStateToProps, { sendConfigData })(
  AutomaticInvitation
);
