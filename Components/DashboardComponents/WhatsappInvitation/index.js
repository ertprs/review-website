import React, { Component } from "react";
import Snackbar from "../../Widgets/Snackbar";
import WhatsAppInvitationPusher from "./WhatsAppInvitationPusher";
import {
  whatsAppTemplates,
  getMessage
} from "../../../utility/whatsAppTemplate";
import { isValidArray } from "../../../utility/commonFunctions";
import validate from "../../../utility/validate";
import {
  whatsAppManualInvitationInit,
  whatsAppAutomaticInvitationInit,
  whatsAppAutomaticCreateCampaign
} from "../../../store/actions/dashboardActions";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import _get from "lodash/get";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";

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
      //? when you add any extra step don't forget to increase totalSteps
      totalSteps: 2,
      //? mounting pusher when response from commit api is success(inside cdu) and un mounting when qr_code_expired, logout_successful, campaign_failed, campaign_finished
      mountWhatsAppPusher: false,
      openFullScreenDialog: false,
      //? latest broadcasted event
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

    //? if we are on create template page and someone wants to go back then we are disconnecting pusher
    if (activeStep === 2) {
      this.setState({ mountWhatsAppPusher: false });
    }
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
  //? In automatic campaign: Initially it will be called on click of "Start Sending Invitations" at that time it will call "whatsAppAutomaticInvitationInit" then it will be called on event db_session_updated that time it will call "whatsAppAutomaticCreateCampaign" with reqBody(add sendAfterMinutes and shop)

  //? In manual campaign it will be called only once on click of "Start Sending Invitations" and will call "whatsAppManualInvitationInit" with req body(without sendAfterMinutes and shop)
  startWhatsAppInvitation = (e, isCreateCampaign) => {
    const {
      whatsAppManualInvitationInit,
      whatsAppAutomaticInvitationInit,
      whatsAppAutomaticCreateCampaign,
      ecommerceIntegrations
    } = this.props;
    const {
      uploadCustomerData,
      createTemplate,
      sendAfterMinutes,
      //?selectedShop: this is type_id not the id we are sending
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

    //* If selectedWhatsAppInvitationMethod is automatic we are considering it as automatic campaign

    //? In autmatic campaign case
    if (selectedWhatsAppInvitationMethod === "automatic") {
      //?sendAfterMinutes:- make sure if the user doesn't schedules the invitation this value must be sent as 0
      reqBody["sendAfterMinutes"] = _get(sendAfterMinutes, "value", 0) || 0;
      //? We are sending id of that shop which is available in business_profile>integrations>ecommerce
      let shopId = "";
      if (isValidArray(ecommerceIntegrations)) {
        let foundPlatform = _find(ecommerceIntegrations, [
          "type_id",
          selectedShop
        ]);
        if (foundPlatform) {
          shopId = _get(foundPlatform, "id", "");
        }
      }
      reqBody["shop"] = shopId;
      if (isCreateCampaign) {
        whatsAppAutomaticCreateCampaign(reqBody);
      } else {
        whatsAppAutomaticInvitationInit();
      }
    }
    //? In manual campaign case
    else {
      whatsAppManualInvitationInit(reqBody);
    }
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
      case "db_session_updated":
        this.dbSessionUpdated(data);
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

  //? We open QRCode dialog in qr_code_changed, "qrSessionInvalid", "login_successful" event
  //? To open dialog there may be three cases: qr_code_changed, qr_session_invalid or login_successful

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

  //? We are unmounting whatsapp pusher and on click of reload button we are calling startWhatsAppInvitation to mount it again
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

  //? We will receive this broadcast in both automatic and manual invitations but we are using this in automatic invitations only to make createCampaign API call. And in case of automatic this will be the last broadcast.
  dbSessionUpdated = data => {
    const { selectedWhatsAppInvitationMethod } = this.state;
    if (selectedWhatsAppInvitationMethod === "automatic") {
      //?In whatsApp automatic invitation case we are calling this function to hit createCampaign API, true is used to identify that it is being called to create campaign.
      this.startWhatsAppInvitation(e, true);
    }
    this.setState({ activeEvent: data });
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
    //? we are showing snackbar only when any of two api calls (invite and commit for both manual and automatic) fails
    const {
      whatsAppManualInvitationInitData,
      whatsAppManualInvitationCommitData,
      whatsAppAutomaticInvitationInitData,
      whatsAppAutomaticInvitationCommitData
    } = this.props;
    const whatsAppManualInviteErrorMsg = _get(
      whatsAppManualInvitationInitData,
      "errorMsg",
      "Some Error Occurred !"
    );
    const whatsAppManualInviteSuccess = _get(
      whatsAppManualInvitationInitData,
      "success",
      undefined
    );
    const whatsAppManualCommitErrorMsg = _get(
      whatsAppManualInvitationCommitData,
      "errorMsg",
      "Some Error Occurred !"
    );
    const whatsAppManualCommitSuccess = _get(
      whatsAppManualInvitationCommitData,
      "success",
      undefined
    );
    const whatsAppAutomaticInviteInitSuccess = _get(
      whatsAppAutomaticInvitationInitData,
      "success",
      undefined
    );
    const whatsAppAutomaticInviteInitErrorMsg = _get(
      whatsAppAutomaticInvitationInitData,
      "errorMsg",
      "Some error ocurred"
    );

    const whatsAppAutomaticInviteCommitSuccess = _get(
      whatsAppAutomaticInvitationCommitData,
      "success",
      undefined
    );
    const whatsAppAutomaticInviteCommitErrorMsg = _get(
      whatsAppAutomaticInvitationCommitData,
      "errorMsg",
      "Some error ocurred"
    );

    //? snackbar on error of  whatsAppManualInvite || whatsAppManualCommit
    if (
      whatsAppManualInviteSuccess !==
        prevProps.whatsAppManualInvitationInitData.success ||
      whatsAppManualCommitSuccess !==
        prevProps.whatsAppManualInvitationCommitData.success
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

    //? snackbar on error of  whatsAppAutomaticInvitationInit || whatsAppAutomaticInvitationCommit
    if (
      whatsAppAutomaticInviteInitSuccess !==
        prevProps.whatsAppAutomaticInvitationInitData.success ||
      whatsAppAutomaticInviteCommitSuccess !==
        prevProps.whatsAppAutomaticInvitationCommitData.success
    ) {
      if (whatsAppAutomaticInviteInitSuccess === false) {
        this.setState({
          openSnackbar: true,
          snackbarMsg: whatsAppAutomaticInviteInitErrorMsg,
          snackbarVariant: "error"
        });
      } else if (whatsAppAutomaticInviteCommitSuccess === false) {
        this.setState({
          openSnackbar: true,
          snackbarMsg: whatsAppAutomaticInviteCommitErrorMsg,
          snackbarVariant: "error"
        });
      }
    }

    //? mounting pusher on success of commit(2nd) api
    if (
      whatsAppManualCommitSuccess !==
        _get(
          prevProps,
          "whatsAppManualInvitationCommitData.success",
          undefined
        ) ||
      whatsAppAutomaticInviteCommitSuccess !==
        _get(
          prevProps,
          "whatsAppAutomaticInvitationCommitData.success",
          undefined
        )
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
      snackbarVariant,
      selectedWhatsAppInvitationMethod
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
          isAutomatic={selectedWhatsAppInvitationMethod === "automatic"}
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
  const channelName =
    _get(dashboardData, "whatsAppManualInvitationInit.channelName", "") ||
    _get(dashboardData, "whatsAppAutomaticInvitationInit.channelName", "");
  const whatsAppManualInvitationInitData = _get(
    dashboardData,
    "whatsAppManualInvitationInit",
    {}
  );
  const whatsAppManualInvitationCommitData = _get(
    dashboardData,
    "whatsAppManualInvitationCommit",
    {}
  );
  const whatsAppAutomaticInvitationInitData = _get(
    dashboardData,
    "whatsAppAutomaticInvitationInit",
    {}
  );
  const whatsAppAutomaticInvitationCommitData = _get(
    dashboardData,
    "whatsAppAutomaticInvitationCommit",
    {}
  );
  const ecommerceIntegrations = _get(
    auth,
    "logIn.userProfile.business_profile.integrations.ecommerce",
    []
  );
  return {
    templateLanguage,
    companyName,
    channelName,
    whatsAppManualInvitationInitData,
    whatsAppManualInvitationCommitData,
    whatsAppAutomaticInvitationInitData,
    whatsAppAutomaticInvitationCommitData,
    ecommerceIntegrations
  };
};

export default connect(mapStateToProps, {
  whatsAppManualInvitationInit,
  whatsAppAutomaticInvitationInit,
  whatsAppAutomaticCreateCampaign
})(WhatsAppInvitation);
