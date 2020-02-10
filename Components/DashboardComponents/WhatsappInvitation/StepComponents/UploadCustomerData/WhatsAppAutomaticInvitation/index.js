import React, { Component } from "react";
import { RadioGroup, Radio, FormControlLabel, Button } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NeedDeveloperSupport from "../../../../../Widgets/NeedDeveloperSupport/NeedDeveloperSupport";
import validate from "../../../../../../utility/validate";
import Languages from "../../../../../../utility/languages";
import Snackbar from "../../../../../Widgets/Snackbar";
import { sendConfigData } from "../../../../../../store/actions/dashboardActions";
import _get from "lodash/get";
import _find from "lodash/find";
import * as Forms from "../../../../GetReviewsForms/InvitationWays/AutomaticInvitationForms";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import CredentialModal from "../../../../GetReviewsForms/InvitationWays/AutomaticInvitationForms/CredentialModal";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Chip from "@material-ui/core/Chip";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import AccessTime from "@material-ui/icons/AccessTime";
//! we'll get the values to pre-fill from props in availableformdata object with key similar to formname and then manually need to set the values of each individual key
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class AutomaticInvitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formName: "",
      showSnackbar: false,
      variant: "success",
      snackbarMsg: "",
      disabledSaveButton: false,
      formData: {
        WooCommerce: {
          shopName: {
            element: "input",
            type: "text",
            value: _get(
              this.props,
              "availablePlatformsData.WooCommerce.name",
              ""
            ),
            placeholder: "Shop Name",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "name",
            id: "shopName",
            labelText: "Enter shop name"
          },
          consumer_key: {
            element: "input",
            type: "text",
            value: _get(
              this.props,
              "availablePlatformsData.WooCommerce.auth_details.consumer_key",
              ""
            ),
            placeholder: "Consumer keys",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "consumer_key",
            id: "consumer_key",
            labelText: "Enter key"
          },
          consumer_secret: {
            element: "input",
            type: "text",
            value: _get(
              this.props,
              "availablePlatformsData.WooCommerce.auth_details.consumer_secret",
              ""
            ),
            placeholder: "Consumer Secret",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "consumer_secret",
            id: "consumer_secret",
            labelText: "Enter secret"
          },
          url: {
            element: "input",
            type: "text",
            value: _get(
              this.props,
              "availablePlatformsData.WooCommerce.url",
              ""
            ),
            validationRules: {
              required: true
            },
            placeholder: "your platform url",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "url",
            id: "url",
            labelText: "Your platform url *"
          },
          locale: {
            element: "select",
            name: "locale",
            value: _get(
              this.props,
              "availablePlatformsData.WooCommerce.locale",
              ""
            ),
            options: [...Languages],
            placeholder: "Select your language",
            valid: false,
            touched: false,
            errorMessage: "",
            id: "locale",
            labelText: "Select your locale"
          }
        },
        TrustSearch_API: {
          shopName: {
            element: "input",
            type: "text",
            value: _get(
              this.props,
              "availablePlatformsData.TrustSearch API.name",
              ""
            ),
            placeholder: "Shop Name",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "name",
            id: "shopName",
            labelText: "Enter shop name *"
          },
          locale: {
            element: "select",
            name: "locale",
            value: _get(
              this.props,
              "availablePlatformsData.TrustSearch API.locale",
              ""
            ),
            options: [...Languages],
            placeholder: "Select your language",
            valid: false,
            touched: false,
            errorMessage: "",
            id: "locale",
            labelText: "Select your locale *"
          }
        },
        Magento: {
          shopName: {
            element: "input",
            type: "text",
            value: _get(this.props, "availablePlatformsData.Magento.name", ""),
            placeholder: "Shop Name",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "name",
            id: "shopName",
            labelText: "Enter shop name *",
            validationRules: {
              required: true
            }
          },
          locale: {
            element: "select",
            name: "locale",
            value: _get(
              this.props,
              "availablePlatformsData.Magento.locale",
              ""
            ),
            options: [...Languages],
            placeholder: "Select your language",
            valid: false,
            touched: false,
            errorMessage: "",
            id: "locale",
            labelText: "Select your locale *",
            validationRules: {
              required: true
            }
          }
        },
        BCC: {
          name: {
            element: "input",
            type: "text",
            value: _get(this.props, "availablePlatformsData.BCC.name", ""),
            placeholder: "Name",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "name",
            id: "name",
            labelText: "Enter name *"
          },
          bccSender: {
            element: "input",
            type: "email",
            value: _get(this.props, "availablePlatformsData.BCC.bccSender", ""),
            placeholder: "Bcc email",
            touched: false,
            valid: false,
            errorMessage: "",
            name: "bccSender",
            id: "bccSender",
            labelText: "2. Enter your ecommcerce system's sender email : *"
          },
          locale: {
            element: "select",
            name: "locale",
            value: _get(this.props, "availablePlatformsData.BCC.locale", ""),
            options: [...Languages],
            placeholder: "Select your language",
            valid: false,
            touched: false,
            errorMessage: "",
            id: "locale",
            labelText: "Select your locale *",
            validationRules: {
              required: true
            }
          }
        },
        showCredentialModal: false
      }
    };
  }

  handleFormDataChange = (e, id, formName) => {
    const { formData } = this.state;
    const { value } = e.target;
    const specificFormData = formData[formName];
    this.setState({
      formData: {
        ...formData,
        [formName]: {
          ...specificFormData,
          [id]: {
            ...specificFormData[id],
            value,
            touched: true,
            valid: validate(value, specificFormData[id].validationRules)
          }
        }
      }
    });
  };

  getFormName = selectedPlatform => {
    const { availablePlatforms } = this.props;
    let selectedOptionObj = _find(availablePlatforms, ["id", selectedPlatform]);
    if (selectedOptionObj) {
      let name = _get(selectedOptionObj, "name", "");
      if (name == "TrustSearch API") {
        name = name.replace(/\s+/, "_");
      }
      this.setState({
        formName: name
      });
    }
  };

  handleRadioChange = event => {
    const { value } = event.target;
    const { setSelectedPlatform } = this.props;
    setSelectedPlatform(Number(value));
    this.getFormName(Number(value));
  };

  handleCredentialModalVisibilityToggle = () => {
    this.setState(prevState => {
      return { showCredentialModal: !prevState.showCredentialModal };
    });
  };

  renderForm = () => {
    const { formName, formData } = this.state;
    const { isLoading, sendConfigData, selectedPlatform } = this.props;
    let form = <div />;
    if (formName) {
      const FormComponent = Forms[formName];
      if (FormComponent) {
        form = (
          <div style={{ width: "100%" }}>
            <FormComponent
              type={selectedPlatform}
              isLoading={isLoading}
              formData={{ ...formData[formName] }}
              handleFormDataChange={this.handleFormDataChange}
              handleSaveAndContinue={reqBody => {
                sendConfigData(reqBody);
              }}
              {...this.props}
            />
          </div>
        );
      }
    }
    return form;
  };

  renderExpansionPanels = () => {
    const {
      availablePlatforms,
      setSelectedPlatform,
      selectedPlatform
    } = this.props;
    const output = (availablePlatforms || []).map((item, index) => {
      return (
        <ExpansionPanel
          expanded={item.id === selectedPlatform}
          onChange={e => {
            this.getFormName(item.id);
            setSelectedPlatform(item.id);
          }}
        >
          <ExpansionPanelSummary
            onClick={e => {}}
            // expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="integration-platforms"
            id="integration-platforms"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              //! this will stop expandation on click of radio button
              // onClick={event => event.stopPropagation()}
              // onFocus={event => event.stopPropagation()}
              control={<Radio />}
              label={
                item.name === "BCC" ? (
                  <>
                    <span style={{ fontWeight: "bold" }}> {item.name} </span> -
                    <span style={{ fontSize: "0.89rem", marginLeft: "5px" }}>
                      Start inviting your customers using email connection with
                      TrustSearch. Put TrustSearch email in your "Thank you
                      email" template in BCC section.{" "}
                      <span style={{ fontWeight: "bold", marginRight: "6px" }}>
                        Difficulty level
                      </span>{" "}
                      -{" "}
                      <Chip
                        icon={<TagFacesIcon style={{ color: "#fff" }} />}
                        label={"Easy"}
                        size="small"
                        style={{ background: "#43A047", color: "#fff" }}
                      />
                      <span
                        style={{ fontWeight: "bold", margin: "0 6px 0 6px" }}
                      >
                        Time to setup -
                      </span>
                      <Chip
                        icon={<AccessTime style={{ color: "#fff" }} />}
                        label={" < 5 min"}
                        size="small"
                        style={{ background: "#43A047", color: "#fff" }}
                      />
                    </span>
                  </>
                ) : (
                  <span style={{ fontWeight: "bold" }}>{item.name}</span>
                )
              }
              value={item.id}
              onClick={e => {
                this.getFormName(item.id);
              }}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ width: "100%" }}>
            {this.renderForm()}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
    return output;
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      success,
      errorMsg,
      isLoading,
      selectedPlatform,
      sendToSelectPlatformSplit
    } = this.props;
    const { formName } = this.state;
    if (success !== prevProps.success) {
      let showSnackbar = false;
      let variant = "";
      let snackbarMsg = "";
      if (success === true) {
        showSnackbar = true;
        variant = "success";
        snackbarMsg = "Configured Successfully!";
      } else if (success === false) {
        showSnackbar = true;
        variant = "error";
        snackbarMsg = errorMsg || "Some error occurred!";
      }
      this.setState(
        {
          showSnackbar,
          variant,
          snackbarMsg
        },
        () => {
          //! we are disabling modal for woocommerce and bcc and sending them directly to select platform
          if (success && (formName === "WooCommerce" || formName === "BCC")) {
            // sendToSelectPlatformSplit();
          }
        }
      );
      if (formName !== "WooCommerce" && formName !== "BCC") {
        this.setState({ showCredentialModal: true });
      }
    }
    if (selectedPlatform !== prevProps.selectedPlatform) {
    }
  }

  componentDidMount() {
    const { selectedPlatform } = this.props;
    if (selectedPlatform) {
      this.renderExpansionPanels();
      this.getFormName(selectedPlatform);
    }
  }

  render() {
    const { showSnackbar, snackbarMsg, variant, formName } = this.state;
    const {
      availablePlatforms,
      availablePlatformsData,
      selectedPlatform,
      navigateToCampaignManagement,
      isCampaignEditMode
    } = this.props;
    const particularPlatformData = _get(availablePlatformsData, formName, {});
    const secretKey = _get(particularPlatformData, "secret_key", "");
    const systemIdentifier = _get(
      particularPlatformData,
      "system_identifier",
      ""
    );
    return (
      <div className="container">
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-md-8">
            <h1>Automatic Invitation</h1>
            {availablePlatforms.length > 0 ? (
              <>
                <p>
                  Ask your customers to leave a review about their experience
                </p>
                <h5>
                  Choose any of the methods below to add customers to invite
                </h5>
              </>
            ) : (
              <p>
                You either don't have any platforms available configured, or
                your platform data might be loaded, please move to the home page
                and check data loading status
              </p>
            )}
          </div>
          <div className="col-md-4">
            {isCampaignEditMode ? (
              <div style={{ float: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={navigateToCampaignManagement}
                  startIcon={<ArrowBackIcon />}
                >
                  Go Back To Campaign History
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <RadioGroup
              aria-label="typesOfinvitation"
              name="typesOfinvitation"
              value={selectedPlatform}
              onChange={this.handleRadioChange}
            >
              {this.renderExpansionPanels()}
            </RadioGroup>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <NeedDeveloperSupport />
        </div>
        <CredentialModal
          showModal={this.state.showCredentialModal}
          handleModalClose={this.handleCredentialModalVisibilityToggle}
          saveAndContinue={() => {
            // this.props.sendToSelectPlatformSplit();
          }}
        >
          <div>
            <div className="container">
              <div className="row" style={{ marginTop: "15px" }}>
                <div className="col-md-4" style={{ margin: "8px 0 8px 0" }}>
                  <div style={{ fontWeight: "bold" }}>Secret key :</div>
                </div>
                <div className="col-md-6">
                  <div
                    style={{
                      wordBreak: "break-all",
                      border: "1px solid #d8d8d8",
                      padding: "15px"
                    }}
                  >
                    {secretKey || "No Key Found"}
                  </div>
                </div>
                {!secretKey ? null : (
                  <div className="col-md-2">
                    <Tooltip
                      title={
                        <span style={{ fontSize: "14px" }}>
                          Copy to clipboard
                        </span>
                      }
                    >
                      <CopyToClipboard
                        text={secretKey}
                        onCopy={() =>
                          this.setState({
                            showSnackbar: true,
                            variant: "success",
                            snackbarMsg: "Secret key Copied to clipboard"
                          })
                        }
                      >
                        <IconButton aria-label="copy">
                          <CopyIcon />
                        </IconButton>
                      </CopyToClipboard>
                    </Tooltip>
                  </div>
                )}
              </div>
              <div className="row" style={{ marginTop: "15px" }}>
                <div className="col-md-4">
                  <div style={{ fontWeight: "bold" }}>System Identifier :</div>
                </div>
                <div className="col-md-6">
                  <div style={{ border: "1px solid #d8d8d8", padding: "15px" }}>
                    {systemIdentifier || "No Key Found"}
                  </div>
                </div>
                {!systemIdentifier ? null : (
                  <div className="col-md-2">
                    <Tooltip title="Copy to clipboard">
                      <CopyToClipboard
                        text={systemIdentifier}
                        onCopy={() =>
                          this.setState({
                            showSnackbar: true,
                            variant: "success",
                            snackbarMsg: "System identifier Copied to clipboard"
                          })
                        }
                      >
                        <IconButton aria-label="copy">
                          <CopyIcon />
                        </IconButton>
                      </CopyToClipboard>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CredentialModal>
        <Snackbar
          open={showSnackbar}
          variant={variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={snackbarMsg}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const availablePlatforms = _get(dashboardData, "availablePlatforms.data", []);
  const shopId = _get(dashboardData, "configDetails.data.id");
  const isLoading = _get(dashboardData, "configDetails.isLoading", false);
  const errorMsg = _get(dashboardData, "configDetails.errorMsg", "");
  const success = _get(dashboardData, "configDetails.success", undefined);
  const ecommerceIntegrations = _get(
    auth,
    "logIn.userProfile.business_profile.integrations.ecommerce",
    []
  );
  const domainName = _get(auth, "logIn.userProfile.company.name", "");
  let availablePlatformsData = {};

  //! we are looping over the array of integration/ecommerce and creating a object with they key(type in array) that matches with our form key in formdata state. So that we can prefill it.

  ecommerceIntegrations.map((data, index) => {
    let platformName = _get(data, "type", "");
    availablePlatformsData[platformName] = {
      ...data
    };
  });
  return {
    availablePlatforms,
    availablePlatformsData,
    shopId,
    isLoading,
    errorMsg,
    success,
    domainName
  };
};

export default connect(mapStateToProps, { sendConfigData })(
  AutomaticInvitation
);
