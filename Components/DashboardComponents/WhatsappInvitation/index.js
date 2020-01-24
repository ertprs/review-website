import React, { Component } from "react";
import validate from "../../../utility/validate";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import _get from "lodash/get";
//Components
const UploadCustomerData = dynamic(
  () => import("./StepComponents/UploadCustomerData"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const CreateTemplate = dynamic(
  () => import("./StepComponents/CreateTemplate"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

class WhatsAppInvitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 2,
      totalSteps: 2,
      createTemplate: {
        templateLanguage: {
          element: "select",
          value: "",
          code: "",
          options: _get(this.props, "templateLanguage", []),
          placeholder: "Select template language",
          errorMessage: "",
          valid: false,
          touched: false,
          validationRules: {
            required: true
          },
          name: "templateLanguage"
        },
        salutation: {
          element: "input",
          labelText: "Salutation",
          type: "text",
          value: "",
          valid: true,
          touched: true,
          errorMessage: "Please enter a salutation.",
          placeholder: "Enter salutation.",
          validationRules: {
            required: true
          }
        },
        customerName: "{{CustomerName}}",
        message: {
          element: "input",
          labelText: "Message",
          type: "text",
          value: "",
          valid: true,
          touched: true,
          errorMessage: "Please enter a message.",
          placeholder: "Enter your message here",
          validationRules: {
            required: true
          }
        },
        reviewUrl: {
          element: "input",
          labelText: "Subject",
          type: "text",
          value: "Leave a review on Entity",
          valid: true,
          touched: true,
          errorMessage: "Please enter a review url.",
          placeholder: "Enter review url",
          validationRules: {
            required: true
          }
        }
      }
    };
  }

  handleNext = stepNo => {
    const { totalSteps } = this.state;
    let activeStep = _get(this.state, "activeStep", 1);
    //? If step no is greater than total no of steps or less than one then we are setting it to 1
    if (stepNo > totalSteps || stepNo < 1) {
      stepNo = 1;
    }
    if (activeStep < totalSteps) {
      activeStep = stepNo ? stepNo : activeStep + 1;
    } else {
      activeStep = activeStep;
    }
    activeStep = stepNo ? stepNo : activeStep + 1;
    this.setState({ activeStep });
  };

  handlePrev = stepNo => {
    const { totalSteps } = this.state;
    let activeStep = _get(this.state, "activeStep", 1);
    //? If step no is greater than total no of steps or less than one then we are setting it to 1
    if (stepNo > totalSteps || stepNo < 1) {
      stepNo = 1;
    }
    //? If we are already at step 1 it will not change
    if (activeStep > 1) {
      activeStep = stepNo ? stepNo : activeStep - 1;
    } else {
      activeStep = activeStep;
    }
    this.setState({ activeStep });
  };

  handleChange = (e, stateKeyName) => {
    const { name, value } = e.target;
    const objData = _get(this.state, stateKeyName, {});
    this.setState({
      [stateKeyName]: {
        ...objData,
        [name]: {
          ..._get(objData, name, {}),
          value,
          touched: true,
          valid: validate(value, objData[name].validationRules)
        }
      }
    });
  };

  renderActiveComponent = () => {
    const { activeStep, createTemplate } = this.state;
    switch (activeStep) {
      case 1:
        return <UploadCustomerData />;
      case 2:
        return (
          <CreateTemplate
            createTemplate={createTemplate || {}}
            handleChange={this.handleChange}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return <div>{this.renderActiveComponent()}</div>;
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const templateLanguage = _get(dashboardData, "parsedCampaignLanguage", [
    {
      name: "English",
      value: "d-be60fd9faf074996b23625429aa1dffd",
      code: "en"
    }
  ]);
  return { templateLanguage };
};

export default connect(mapStateToProps)(WhatsAppInvitation);
