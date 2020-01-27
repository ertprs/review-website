import React, { Component } from "react";
import QRCodeDialog from "./QRCodeDialog";
import WhatsAppInvitationPusher from "./WhatsAppInvitationPusher";
import {
  whatsAppTemplates,
  getMessage
} from "../../../utility/whatsAppTemplate";
import { isValidArray } from "../../../utility/commonFunctions";
import { whatsAppManualInvitation } from "../../../store/actions/dashboardActions";
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
      activeStep: 1,
      totalSteps: 2,
      uploadCustomerData: [],
      mountWhatsAppPusher: false,
      QRCodeString: "",
      openQRCodeDialog: false,
      QRCodeDialogTitle: "",
      activeEvent: {},
      createTemplate: {
        templateLanguage: {
          element: "select",
          name: "templateLanguage",
          value: "",
          code: "",
          options: _get(this.props, "templateLanguage", []),
          placeholder: "Select template language",
          errorMessage:
            "Please select template language to start creating template!",
          valid: false,
          touched: false,
          validationRules: {
            required: true
          }
        },
        customerName: "{{{name}}}",
        inputFields: {
          salutation: {
            element: "input",
            name: "salutation",
            labelText: "Enter salutation:",
            type: "text",
            value: "",
            valid: true,
            touched: true,
            errorMessage: "Please enter a salutation!",
            placeholder: "Enter salutation",
            validationRules: {
              required: true
            }
          },
          message: {
            element: "textarea",
            name: "message",
            labelText: "Enter your message:",
            type: "text",
            value: "",
            valid: true,
            touched: true,
            errorMessage: "Please enter a message!",
            placeholder: "Enter your message here",
            rows: "5",
            cols: "5",
            validationRules: {
              required: true
            }
          },
          reviewUrl: {
            element: "input",
            name: "reviewUrl",
            labelText: "Enter Review Url:",
            type: "text",
            value: "",
            valid: false,
            touched: false,
            errorMessage: "Please enter a Review Url!",
            placeholder: "Enter Review Url",
            validationRules: {
              required: true
            }
          }
        }
      }
    };
  }

  setUploadCustomerData = data => {
    this.setState({ uploadCustomerData: [...data] });
  };

  handleNext = (e, stepNo = null) => {
    const { totalSteps } = this.state;
    let activeStep = _get(this.state, "activeStep", 1);
    //? If step no is greater than total no of steps or less than one then we are setting it to 1
    if ((stepNo > totalSteps || stepNo < 1) && stepNo) {
      stepNo = 1;
    }
    if (activeStep < totalSteps) {
      activeStep = stepNo ? stepNo : activeStep + 1;
    } else {
      activeStep = activeStep;
    }
    this.setState({ activeStep });
  };

  handlePrev = (e, stepNo = null) => {
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

  handleTemplateLanguageChange = e => {
    const { name, value } = e.target;
    const { companyName } = this.props;
    const createTemplateObj = _get(this.state, "createTemplate", {});
    let inputFieldsObj = _get(this.state, "createTemplate.inputFields", {});
    let salutation = "";
    let message = "";
    if (value) {
      salutation = whatsAppTemplates[value].hasOwnProperty("salutation")
        ? whatsAppTemplates[value].salutation
        : "";
      message = getMessage(value, companyName);
    }
    this.setState({
      createTemplate: {
        ...createTemplateObj,
        [name]: {
          ..._get(createTemplateObj, name, {}),
          value,
          touched: true,
          valid: validate(value, createTemplateObj[name].validationRules)
        },
        inputFields: {
          ...inputFieldsObj,
          salutation: {
            ..._get(inputFieldsObj, "salutation", {}),
            value: salutation,
            valid: true
          },
          message: {
            ..._get(inputFieldsObj, "message", {}),
            value: message,
            valid: true
          }
        }
      }
    });
  };

  handleFormDataChange = e => {
    const { name, value } = e.target;
    const objData = _get(this.state, "createTemplate.inputFields", {});
    this.setState({
      createTemplate: {
        ..._get(this.state, "createTemplate", {}),
        inputFields: {
          ...objData,
          [name]: {
            ..._get(objData, name, {}),
            value,
            touched: true,
            valid: validate(value, objData[name].validationRules)
          }
        }
      }
    });
  };

  initWhatsAppInvitation = () => {
    const { whatsAppManualInvitation } = this.props;
    const { uploadCustomerData, createTemplate } = this.state;
    let salutation = _get(createTemplate, "inputFields.salutation.value", "");
    let customerName = _get(createTemplate, "customerName", "");
    let message = _get(createTemplate, "inputFields.message.value", "");
    let reviewUrl = _get(createTemplate, "inputFields.reviewUrl.value", "");
    let template = `${salutation} ${customerName}, ${message} ${reviewUrl}`;
    let reqBody = {};
    if (isValidArray(uploadCustomerData)) {
      reqBody["customers"] = [...uploadCustomerData];
    }
    if (template) {
      reqBody["template"] = template;
    }
    reqBody["storeCustomerData"] = false;
    console.log(reqBody, "reqBody");
    whatsAppManualInvitation(reqBody);
  };

  renderActiveComponent = () => {
    const { activeStep, createTemplate } = this.state;
    switch (activeStep) {
      case 1:
        return (
          <UploadCustomerData
            setUploadCustomerData={this.setUploadCustomerData}
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
          />
        );
      case 2:
        return (
          <CreateTemplate
            createTemplate={createTemplate || {}}
            handleFormDataChange={this.handleFormDataChange}
            handleTemplateLanguageChange={this.handleTemplateLanguageChange}
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
            handleSubmit={this.initWhatsAppInvitation}
          />
        );
      default:
        return null;
    }
  };

  //! A top level handler to handle pusher events appropriately
  whatsAppPusherHandler = data => {
    const event = _get(data, "event", "");
    switch (event) {
      case "qr_code_changed":
        this.qrCodeChange(data);
        break;
      // This comes when backend opens whatsAppWeb.com in headless browser. Doesn't useful for us.
      // case "qr_code_started":
      //   this.qrCodeStarted(data);
      //   break;
      case " qr_code_expired":
        this.qrCodeExpired(data);
        break;
      case "login_successful":
        this.loginSuccessful(data);
        break;
      case "logout_successful":
        this.logoutSuccessful(data);
        break;
      case "campaign_started":
        this.campaignStarted(data);
        break;
      case "campaign_failed":
        this.campaignFailed(data);
        break;
      case "campaign_finished":
        this.campaignFinished(data);
        break;
      default:
        console.error(`WhatsAppPusher default case ${event}`);
    }
  };

  //! handler for displaying QR code on UI
  qrCodeChange = data => {
    const value = _get(data, "value", "");
    this.setState({
      QRCodeString: value,
      openQRCodeDialog: true,
      QRCodeDialogTitle: "Scan QR Code",
      activeEvent: data
    });
  };

  //! handler for displaying Retry
  qrCodeExpired = data => {
    this.setState({ mountWhatsAppPusher: false, activeEvent: data });
  };

  qrCodeStarted = data => {
    //show QR code scanned successfully
    this.setState({ activeEvent: data });
  };

  loginSuccessful = data => {
    this.setState({ activeEvent: data });
  };

  logoutSuccessful = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data,
      openQRCodeDialog: false
    });
  };

  campaignStarted = data => {
    this.setState({ activeEvent: data });
  };

  campaignFailed = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data,
      openQRCodeDialog: false
    });
  };

  campaignFinished = data => {
    this.setState({ mountWhatsAppPusher: false, activeEvent: data });
  };

  componentDidUpdate(prevProps, prevState) {
    const { whatsAppManualInvite, whatsAppManualCommit } = this.props;
    const whatsAppManualCommitSuccess = _get(
      whatsAppManualCommit,
      "success",
      false
    );
    if (
      whatsAppManualCommitSuccess !==
      _get(prevProps, "whatsAppManualCommit.success", false)
    ) {
      this.setState({ mountWhatsAppPusher: whatsAppManualCommitSuccess });
    }
  }

  render() {
    const {
      mountWhatsAppPusher,
      openQRCodeDialog,
      QRCodeString,
      QRCodeDialogTitle,
      activeEvent
    } = this.state;
    const { channelName } = this.props;
    return (
      <div>
        {mountWhatsAppPusher ? (
          <WhatsAppInvitationPusher
            channelName={channelName}
            whatsAppPusherHandler={this.whatsAppPusherHandler}
          />
        ) : null}
        {this.renderActiveComponent()}
        <QRCodeDialog
          open={openQRCodeDialog}
          QRCodeString={QRCodeString}
          title={QRCodeDialogTitle}
          activeEvent={activeEvent || {}}
          handleClose={() => {
            this.setState({ openQRCodeDialog: false });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, dashboardData } = state;
  const templateLanguage = _get(dashboardData, "parsedCampaignLanguage", [
    {
      name: "English",
      value: "d-be60fd9faf074996b23625429aa1dffd",
      code: "en"
    }
  ]);
  let companyName = _get(auth, "logIn.userProfile.company.name", "");
  let channelName = _get(dashboardData, "whatsAppManualInvite.channelName", "");
  let whatsAppManualInvite = _get(dashboardData, "whatsAppManualInvite", {});
  let whatsAppManualCommit = _get(dashboardData, "whatsAppManualCommit", {});
  return {
    templateLanguage,
    companyName,
    channelName,
    whatsAppManualInvite,
    whatsAppManualCommit
  };
};

export default connect(mapStateToProps, { whatsAppManualInvitation })(
  WhatsAppInvitation
);
