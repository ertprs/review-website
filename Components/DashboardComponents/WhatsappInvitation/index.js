import React, { Component } from "react";
import Snackbar from "../../Widgets/Snackbar";
import WhatsAppInvitationPusher from "./WhatsAppInvitationPusher";
import {
  whatsAppTemplates,
  getMessage
} from "../../../utility/whatsAppTemplate";
import { isValidArray } from "../../../utility/commonFunctions";
import validate from "../../../utility/validate";
import { whatsAppManualInvitation } from "../../../store/actions/dashboardActions";
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

const QRCodeDialog = dynamic(() => import("./QRCodeDialog"), {
  loading: () => (
    <div className="dynamicImport">
      <p>Loading.....</p>
    </div>
  )
});

class WhatsAppInvitation extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      activeStep: 1,
      //? when you add any extra step don't forget to increase it here
      totalSteps: 2,
      //? mounting pusher when response from commit api is success(inside cdu) and un mounting when qr_code_expired, logout_successful, campaign_failed, campaign_finished
      mountWhatsAppPusher: false,
      openFullScreenDialog: false,
      //? this is always the last broadcast event
      activeEvent: {},
      //? parsed data from CSV or copy-paste will be stored here
      uploadCustomerData: [],
      //? selected shop ID
      selectedShop: "",
      //? selected whatsApp Invitation method
      selectedWhatsAppInvitationMethod: "",
      //? send after minutes schedule, in case of automatic invitations
      sendAfterMinutes: {
        value: "",
        valid: false,
        validationRules: {
          required: true
        }
      },
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
        saveCampaign: true,
        keepMeLoggedIn: false,
        inputFields: {
          salutation: {
            element: "input",
            name: "salutation",
            labelText: "Enter salutation (required)*:",
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
            labelText: "Enter your message (required)*:",
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
            labelText: "Enter Review Url (required)*:",
            type: "text",
            value: "",
            valid: false,
            touched: false,
            errorMessage: "Please enter a valid review url!",
            placeholder: "Enter Review Url",
            validationRules: {
              required: true,
              isDomain: true
            }
          }
        }
      },
      openSnackbar: false,
      snackbarVariant: "",
      snackbarMsg: ""
    };
  }

  setUploadCustomerData = data => {
    this.setState({ uploadCustomerData: [...data] });
  };

  setSelectedWhatsAppInvitationMethod = selectedWhatsAppInvitationMethod => {
    this.setState({ selectedWhatsAppInvitationMethod });
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

  handleSelectedShopChange = selectedShop => {
    this.setState({ selectedShop });
  };

  handleSendAfterMinutesChange = val => {
    this.setState({
      sendAfterMinutes: {
        ...this.state.sendAfterMinutes,
        value: val,
        valid: validate(val, this.state.sendAfterMinutes.validationRules)
      }
    });
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

  startWhatsAppInvitation = () => {
    const { whatsAppManualInvitation } = this.props;
    const {
      uploadCustomerData,
      createTemplate,
      sendAfterMinutes,
      selectedShop,
      selectedWhatsAppInvitationMethod
    } = this.state;
    let salutation = _get(createTemplate, "inputFields.salutation.value", "");
    let customerName = _get(createTemplate, "customerName", "");
    let message = _get(createTemplate, "inputFields.message.value", "");
    let reviewUrl = _get(createTemplate, "inputFields.reviewUrl.value", "");
    let saveCampaign = _get(createTemplate, "saveCampaign", false);
    let keepMeLoggedIn = _get(createTemplate, "keepMeLoggedIn", false);
    let template = `${salutation} ${customerName}, ${message} ${reviewUrl}`;
    let reqBody = {};
    if (isValidArray(uploadCustomerData)) {
      reqBody["customers"] = [...uploadCustomerData];
    }
    if (template) {
      reqBody["template"] = template;
    }
    reqBody["storeCustomerData"] = saveCampaign;
    reqBody["rememberMe"] = keepMeLoggedIn;

    //!sendAfterMinutes, shop - for automatic campaigns, uncomment the code below when API is available
    // if (selectedWhatsAppInvitationMethod === "automatic") {
    //   reqBody["sendAfterMinutes"] = sendAfterMinutes;
    //   reqBody["shop"] = selectedShop;
    // }

    whatsAppManualInvitation(reqBody);
  };
  handleCheckboxChange = event => {
    const { checked, name } = event.target;
    this.setState({
      createTemplate: {
        ..._get(this.state, "createTemplate", {}),
        [name]: checked
      }
    });
  };

  renderActiveComponent = () => {
    const {
      activeStep,
      createTemplate,
      activeEvent,
      mountWhatsAppPusher,
      sendAfterMinutes,
      selectedShop
    } = this.state;
    switch (activeStep) {
      case 1:
        return (
          <UploadCustomerData
            setUploadCustomerData={this.setUploadCustomerData}
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
            handleSelectedShopChange={this.handleSelectedShopChange}
            sendAfterMinutes={sendAfterMinutes}
            handleSendAfterMinutesChange={this.handleSendAfterMinutesChange}
            selectedShop={selectedShop}
            setSelectedWhatsAppInvitationMethod={
              this.setSelectedWhatsAppInvitationMethod
            }
          />
        );
      case 2:
        return (
          <CreateTemplate
            createTemplate={createTemplate || {}}
            handleFormDataChange={this.handleFormDataChange}
            activeEvent={activeEvent}
            handleTemplateLanguageChange={this.handleTemplateLanguageChange}
            handlePrev={this.handlePrev}
            handleSubmit={this.startWhatsAppInvitation}
            handleCheckboxChange={this.handleCheckboxChange}
            whatsAppPusherConnected={mountWhatsAppPusher}
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
          />
        );
      default:
        return null;
    }
  };

  //! A top level handler to handle pusher events appropriately
  whatsAppPusherHandler = data => {
    const event = _get(data, "event", "");
    //add any new case for any other kind of event broadcast e.g: phone disconnected
    switch (event) {
      //! qr_code_started comes when backend opens whatsAppWeb.com in headless browser. Doesn't useful for us.
      case "qr_code_started":
        break;
      case "qr_session_invalid":
        this.qrSessionInvalid(data);
      case "qr_code_changed":
        this.qrCodeChange(data);
        break;
      case "qr_code_expired":
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
        this.setState({
          mountWhatsAppPusher: false,
          openFullScreenDialog: false,
          openSnackbar: true,
          snackbarMsg: event,
          snackbarVariant: "error"
        });
    }
  };

  //? We open QRCode dialog in "login_successful" or "qr_code_changed" event, we receive "qr_code_changed" event when QRCode string is generated, and "login_successful" if session is already exist in DB so he can directly send campaigns without scanning QRCode

  qrSessionInvalid = data => {
    this.setState({
      openFullScreenDialog: true,
      activeEvent: data
    });
  };

  qrCodeChange = data => {
    this.setState({
      openFullScreenDialog: true,
      activeEvent: data
    });
  };

  qrCodeExpired = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data
    });
  };

  loginSuccessful = data => {
    this.setState({ openFullScreenDialog: true, activeEvent: data });
  };

  logoutSuccessful = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data,
      openFullScreenDialog: false,
      openSnackbar: true,
      snackbarMsg: _get(data, "event", "Logged out successfully!"),
      snackbarVariant: "info"
    });
  };

  campaignStarted = data => {
    this.setState({ activeEvent: data });
  };

  campaignFailed = data => {
    this.setState({
      mountWhatsAppPusher: false,
      activeEvent: data,
      openFullScreenDialog: false,
      openSnackbar: true,
      snackbarMsg: _get(data, "event", "Campaign failed!"),
      snackbarVariant: "error"
    });
  };

  campaignFinished = data => {
    this.setState({ mountWhatsAppPusher: false, activeEvent: data });
  };

  componentDidUpdate(prevProps, prevState) {
    //? we are showing snackbar only when any of two api calls (invite and commit) fails
    const { whatsAppManualInvite, whatsAppManualCommit } = this.props;
    const whatsAppManualInviteErrorMsg = _get(
      whatsAppManualInvite,
      "errorMsg",
      "Some Error Occurred !"
    );
    const whatsAppManualInviteSuccess = _get(
      whatsAppManualInvite,
      "success",
      undefined
    );
    const whatsAppManualCommitErrorMsg = _get(
      whatsAppManualCommit,
      "errorMsg",
      "Some Error Occurred !"
    );
    const whatsAppManualCommitSuccess = _get(
      whatsAppManualCommit,
      "success",
      undefined
    );
    if (
      whatsAppManualInviteSuccess !== prevProps.whatsAppManualInvite.success ||
      whatsAppManualCommitSuccess !== prevProps.whatsAppManualCommit.success
    ) {
      if (whatsAppManualInviteSuccess === false) {
        this.setState({
          openSnackbar: true,
          snackbarMsg: whatsAppManualInviteErrorMsg,
          snackbarVariant: "error"
        });
      } else if (whatsAppManualCommitSuccess === false) {
        this.setState({
          openSnackbar: true,
          snackbarMsg: whatsAppManualCommitErrorMsg,
          snackbarVariant: "error"
        });
      }
    }
    //? mounting pusher on success of commit(2nd) api
    if (
      whatsAppManualCommitSuccess !==
      _get(prevProps, "whatsAppManualCommit.success", undefined)
    ) {
      this.setState({
        mountWhatsAppPusher: whatsAppManualCommitSuccess
      });
    }
  }

  //! Closing dialog box, setting to first step and initializing values in createTemplate
  handleQuitCampaign = () => {
    this.setState({
      openFullScreenDialog: false,
      mountWhatsAppPusher: false,
      activeStep: 1,
      createTemplate: {
        ..._get(this.state, "createTemplate", {}),
        templateLanguage: {
          ..._get(this.state, "createTemplate.templateLanguage", {}),
          value: "",
          valid: false,
          touched: false
        },
        inputFields: {
          ..._get(this.state, "createTemplate.inputFields", {}),
          reviewUrl: {
            ..._get(this.state, "createTemplate.inputFields.reviewUrl", {}),
            value: "",
            valid: false,
            touched: false
          }
        }
      }
    });
  };

  render() {
    const {
      mountWhatsAppPusher,
      openFullScreenDialog,
      activeEvent,
      openSnackbar,
      snackbarMsg,
      snackbarVariant
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
          open={openFullScreenDialog}
          activeEvent={activeEvent || {}}
          handleClose={this.handleQuitCampaign}
          reloadQRCode={this.startWhatsAppInvitation}
          whatsAppPusherConnected={mountWhatsAppPusher}
        />
        <Snackbar
          open={openSnackbar}
          message={snackbarMsg}
          variant={snackbarVariant}
          handleClose={() => {
            this.setState({ openSnackbar: false });
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
  const companyName = _get(auth, "logIn.userProfile.company.name", "");
  const channelName = _get(
    dashboardData,
    "whatsAppManualInvite.channelName",
    ""
  );
  const whatsAppManualInvite = _get(dashboardData, "whatsAppManualInvite", {});
  const whatsAppManualCommit = _get(dashboardData, "whatsAppManualCommit", {});
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
