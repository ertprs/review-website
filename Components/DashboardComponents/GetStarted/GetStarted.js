import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import stringHelpers from "../../../utility/stringHelpers";
import Snackbar from "../../Widgets/Snackbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  locatePlaceByPlaceId,
  setGetStartedShow,
  setGooglePlaces,
  setReviewsPusherConnect,
  setReviewsAfterLogin
} from "../../../store/actions/dashboardActions";
import { setIsNewUser } from "../../../store/actions/authActions";
import { locatePlaceApi, getStartedVideoUrl } from "../../../utility/config";
import { connect } from "react-redux";
import _get from "lodash/get";
import Button from "@material-ui/core/Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormField from "../../Widgets/FormField/FormField";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import AvailablePlatformsList from "./AvailablePlatformsList";
import AddPlatformDialog from "./AddPlatform/AddPlatformDialog/AddPlatformDialog";
import validate from "../../../utility/validate";
import { reviewChannelBoxStyles } from "./reviewChannelBoxStyles";
import { reviewURLBoxStyles } from "./reviewURLBoxStyles";
import { reviewURLObjects } from "../../../utility/constants/reviewURLObjects";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import IconButton from "@material-ui/core/IconButton";
import _omit from "lodash/omit";
import _now from "lodash/now";
import GoogleReviewURLBox from "./GoogleReviewURLBox/GoogleReviewURLBox";
import SetAsPrimaryModal from "./SetAsPrimaryModal/SetAsPrimaryModal";
import BottomNotificationBar from "./BottomNotificationBar/BottomNotificationBar";
import ClosedGetStartedConfirmationDialog from "./CloseGetStartedConfirmationDialog";
import { isValidArray } from "../../../utility/commonFunctions";

class GetStarted extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    formData: {},
    generatedCardsFormData: {},
    selectedAvailablePlatformItems: [],
    disabledSave: true,
    modelOpen: false,
    showSetAsPrimaryModal: false,
    showCloseConfirmationModal: false,
    selectedSetAsPrimaryFormDataObject: {}
  };

  handleRemoveTemporaryCard = formDataItemKey => {
    let key = formDataItemKey;
    const { formData } = this.state;
    if (formData[formDataItemKey]) {
      const formDataAfterOmission = _omit(formData, key);
      this.setState({
        formData: { ...formDataAfterOmission }
      });
    }
  };

  //! Generate Form fields from socialArray for already configured social profiles and from review_platforms for rest of the available platforms.
  //GENERIC_METHOD : generates formFields from fieldsArray parameter.
  generateFormFieldsDynamically = (
    fieldsArray,
    isSocialArray = false,
    updateMode = false,
    wipeMode = false
  ) => {
    let formData = {};
    fieldsArray.forEach((item, index) => {
      let name = _get(item, "name", "");
      let url = _get(item, "url", "");
      let social_media_app_id = _get(item, "social_media_app_id", "");
      let id = _get(item, "id", "");
      let is_primary = _get(item, "is_primary", "");
      if (name && social_media_app_id) {
        let formFieldKey =
          social_media_app_id.toString() + "ReviewUrl_" + id + "_" + index;
        formData = {
          ...formData,
          [formFieldKey]: {
            element: "input",
            type: "text",
            value: "",
            valid: false,
            touched: false,
            errorMessage: "Enter valid URL",
            placeholder: `Enter ${name} page URL (required)`,
            validationRules: {
              required: true
            },
            label: `${name} Page URL: `,
            logo: `${name}Logo.png`,
            title: `${name} reviews`,
            key: social_media_app_id,
            social_media_app_id: social_media_app_id,
            name: name,
            id: id,
            editURL: formFieldKey,
            isTemporary: !isSocialArray ? true : false,
            extraPayload: {},
            primary: is_primary
          }
        };
      }
    });
    //setState also
    if (wipeMode) {
      this.setState({ formData: { ...formData } }, () => {
        this.prefillSocialURLs(fieldsArray);
      });
    } else if (updateMode) {
      this.setState(
        { formData: { ...formData, ...this.state.formData } },
        () => {
          this.prefillSocialURLs(fieldsArray);
        }
      );
    } else {
      this.setState(
        { formData: { ...this.state.formData, ...formData } },
        () => {
          this.prefillSocialURLs(fieldsArray);
        }
      );
    }
  };

  handleModalVisibilityToggle = () => {
    this.setState(prevState => {
      return { ...prevState, modelOpen: !prevState.modelOpen };
    });
  };

  handleSetAsPrimaryModalVisibilityToggle = formDataItemKey => {
    const formData = _get(this.state, "formData", {});
    const formDataItem = formData[formDataItemKey] || {};
    this.setState(prevState => {
      return {
        ...prevState,
        selectedSetAsPrimaryFormDataObject: { ...formDataItem },
        showSetAsPrimaryModal: !prevState.showSetAsPrimaryModal
      };
    });
  };

  handleCloseConfirmationModalVisibilityToggle = (exitGetStarted = false) => {
    if (exitGetStarted) {
      this.props.setGetStartedShow(false, "");
    }
    this.setState(prevState => {
      return {
        ...prevState,
        showCloseConfirmationModal: !prevState.showCloseConfirmationModal
      };
    });
  };

  handleSavePermanentlyClick = () => {
    const formData = _get(this.state, "formData", {});
    const {
      setReviewsPusherConnect,
      locatePlaceByPlaceId,
      googlePlaces
    } = this.props;
    let reqBody = {};
    //profiles array to be sent in API call
    let profiles = [];
    //loop through formData, check which records have been touched by the user and push them inside profiles in the required format
    for (let item in formData) {
      let profileBody = {};
      let formDataItem = formData[item] || {};
      let touched = _get(formDataItem, "touched", false);
      let valid = _get(formDataItem, "touched", false);
      //if the formDataItem was changed and is valid
      if (touched && valid) {
        let isTemporary = _get(formDataItem, "isTemporary", false);
        let social_media_app_id = _get(formDataItem, "social_media_app_id");
        let url = _get(formDataItem, "value", "");
        //check if it's a new record, (isTemporary), then we do not need to add id in payload
        if (isTemporary) {
          let identity = _get(formDataItem, "identity", "");
          let identity_data = _get(formDataItem, "identity_data", {});
          identity_data = _omit(identity_data, "directReviewUrl");
          let profile_name = _get(formDataItem, "name", "");
          let primary = _get(formDataItem, "primary", "");
          let clientKey = _get(formDataItem, "editURL", item);
          //check for google in primary , becoz it can have multiple profiles
          if (social_media_app_id === 22) {
            primary = primary ? 1 : 0;
          } else {
            primary = 1;
          }
          profileBody = {
            ...profileBody,
            platform: social_media_app_id,
            url: url,
            identity: identity,
            identity_data: identity_data,
            profile_name: profile_name,
            primary: primary,
            clientKey: clientKey
          };
        }
        //for already existing records, we will send the id
        else {
          let identity = _get(formDataItem, "identity", "");
          let identity_data = _get(formDataItem, "identity_data", "");
          identity_data = _omit(identity_data, "directReviewUrl");
          let profile_name = _get(formDataItem, "name", "");
          let primary = _get(formDataItem, "primary", "");
          if (social_media_app_id === 22) {
            primary = primary ? 1 : 0;
          } else {
            primary = 1;
          }
          let id = _get(formDataItem, "id", "");
          profileBody = {
            ...profileBody,
            id: id,
            platform: social_media_app_id,
            url: url,
            identity: identity,
            identity_data: identity_data,
            profile_name: profile_name,
            primary: primary
          };
        }
        profiles.push(profileBody);
      }
    }

    reqBody = { profiles: [...profiles] };
    //! pass request body to reducer
    if (Object.keys(reqBody).length > 0) {
      locatePlaceByPlaceId(
        reqBody,
        this.props.token,
        `${process.env.BASE_URL}${locatePlaceApi}`
      );
    }
    setReviewsPusherConnect(true);
  };

  handleAvailablePlatformsListChange = arr => {
    if (Array.isArray(arr) && arr.length > 0) {
      this.setState({ selectedAvailablePlatformItems: [...arr] });
    } else {
      this.setState({ selectedAvailablePlatformItems: [] });
    }
  };

  //! modified method (Specifically for google reviews) to set Google review URL, address and other params with latest value
  handleAddressSelect = reqBody => {
    const { formData } = this.state;
    const placeId = _get(reqBody, "placeId", "");
    const address = _get(reqBody, "address", "");
    const url = _get(reqBody, "url", "");
    const formDataItemKey = _get(reqBody, "formDataItemKey", "");
    if (formData && formData[formDataItemKey]) {
      this.setState(
        {
          formData: {
            ...formData,
            [formDataItemKey]: {
              ...formData[formDataItemKey],
              value: url,
              touched: true,
              identity: placeId,
              identity_data: {
                ...formData[formDataItemKey].identity_data,
                address: address,
                directReviewUrl: url
              },
              extraPayload: {
                ...formData[formDataItemKey].extraPayload,
                placeId: placeId,
                address: address,
                directReviewUrl: url
              },
              valid: validate(url, formData[formDataItemKey].validationRules)
            }
          }
        }
        // () => {
        //   console.log("state set");
        // }
      );
    }
  };

  //! (Specifically for google reviews for now) but functionality wise it's generic and can be used with other platforms also in future
  handleGooglePlaceNameChange = (newName, formDataItemKey) => {
    const formDataLocal = _get(this.state, "formData", {});
    if (formDataLocal[formDataItemKey]) {
      this.setState(
        {
          formData: {
            ...formDataLocal,
            [formDataItemKey]: {
              ...formDataLocal[formDataItemKey],
              name: newName,
              profile_name: newName,
              touched: true,
              valid: validate(
                formDataLocal[formDataItemKey].value,
                formDataLocal[formDataItemKey].validationRules
              )
            }
          }
        }
        // () => {
        //   console.log("Google review URL state set with latest name");
        // }
      );
    }
  };

  renderGetStartedHeader = () => {
    const { userProfile } = this.props;
    const name = _get(userProfile, "name", "");
    return (
      <div>
        <style jsx>{`
          .getStartedHeader {
            margin: 20px 0 25px 0;
          }
          .getStartedSubHeader {
            margin-bottom: 25px;
            line-height: 2rem;
          }
        `}</style>
        <h3 className="getStartedHeader">
          <span style={{ textTransform: "capitalize" }}>
            {stringHelpers("getTimeGreeting")}
          </span>{" "}
          {name}
        </h3>
        <h6 className="getStartedSubHeader">
          Please choose any one of the platforms to get started. You need to
          enter the URL of your business page for the platform that you choose,
          so that we can fetch information about your business.
        </h6>
      </div>
    );
  };

  anyFormDataChanged = () => {
    const formData = _get(this.state, "formData", {});
    let hasChanged = false;
    if (formData) {
      if (Object.keys(formData).length > 0) {
        for (let item in formData) {
          let formDataItem = formData[item] || {};
          let valid = _get(formDataItem, "valid", false);
          let value = _get(formDataItem, "value", "");
          let touched = _get(formDataItem, "touched", false);
          hasChanged = hasChanged || (valid && value !== "" && touched);
        }
      }
    }
    return hasChanged;
  };

  handleChange = (e, id) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: {
          ...this.state.formData[id],
          value: e.target.value,
          valid: validate(
            e.target.value,
            this.state.formData[id].validationRules
          ),
          touched: true
        }
      },
      disabledSave: false
    });
  };

  componentDidMount() {
    const {
      placeId,
      locatePlace,
      businessProfile,
      socialArray,
      reviewURLToEdit
    } = this.props;
    if (socialArray) {
      //! NOT reviewURLToEdit check to only generate form fields for the selected social media platform
      if (socialArray.length > 0 && !reviewURLToEdit) {
        //check on update also - Done
        this.generateFormFieldsDynamically(
          _get(this.props, "socialArray", []),
          true
        );
      } else if (socialArray.length > 0 && reviewURLToEdit) {
        //generate formFields for the social media platform selected for editing
        this.generateFormFieldsForOnlySelectedPlatform(reviewURLToEdit);
      }
    }
    if (this.props.scrollToTopOfThePage) {
      this.props.scrollToTopOfThePage();
    }
    //? right now we are not dependent on placeId only, user should see getstarted always
    // if (placeId !== "" || locatePlace) {
    //   this.props.changeStepToRender(1);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      success,
      changeStepToRender,
      isLoading,
      errorMsg,
      setGooglePlaces,
      googlePlaces,
      reviewURLToEdit
    } = this.props;
    if (this.props !== prevProps) {
      if (isLoading !== prevProps.isLoading && success !== prevProps.success) {
        if (isLoading === false && success) {
          let socialArray = _get(this.props, "socialArray", []);
          this.setState(
            {
              showSnackbar: true,
              variant: "success",
              snackbarMsg: "All the changes were saved Successfully!"
            },
            () => {
              if (Array.isArray(socialArray)) {
                if (socialArray.length > 0 && !reviewURLToEdit) {
                  if (socialArray.reverse()) {
                    this.setState({ formData: {} }, () => {
                      this.generateFormFieldsDynamically(socialArray.reverse());
                    });
                  } else {
                    this.setState({ formData: {} }, () => {
                      this.generateFormFieldsDynamically(socialArray);
                    });
                  }
                } else if (socialArray.length > 0 && reviewURLToEdit) {
                  //generate formFields for the social media platform selected for editing
                  this.generateFormFieldsForOnlySelectedPlatform(
                    reviewURLToEdit
                  );
                }
              }
              changeStepToRender(1);
            }
          );
        } else if (isLoading === false && !success) {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: errorMsg
          });
        }
      } else if (
        this.props.socialArray !== prevProps.socialArray &&
        !reviewURLToEdit
      ) {
        let newSocialArray = _get(this.props, "socialArray", []);
        this.generateFormFieldsDynamically(newSocialArray, true);
      } else if (
        this.props.socialArray !== prevProps.socialArray &&
        reviewURLToEdit
      ) {
        //generate formFields for the social media platform selected for editing
        this.generateFormFieldsForOnlySelectedPlatform(reviewURLToEdit);
      }
    }
  }
  //Fix pre-fill social urls to work with dynamic data - DONE
  prefillSocialURLs = socialArray => {
    let formDataLocal = this.state.formData;
    if (Object.keys(formDataLocal).length > 0) {
      socialArray.forEach((item, index) => {
        let socialObj = item;
        let name = _get(socialObj, "name", "");
        let profile_name = _get(socialObj, "profile_name", "");
        let url = _get(socialObj, "url", "");
        let id = _get(socialObj, "id", "");
        let social_media_app_id = _get(socialObj, "social_media_app_id", "");
        let has_review_aggregator = _get(item, "has_review_aggregator", 0);
        if (name && name.length > 0) {
          let editURL =
            social_media_app_id.toString() + "ReviewUrl_" + id + "_" + index;
          if (formDataLocal[editURL]) {
            //!check if google to add identity and identity_data and extra payload
            if (social_media_app_id === 22) {
              let directReviewUrl = _get(
                socialObj,
                "identity_data.directReviewUrl",
                ""
              );
              url = url ? url : directReviewUrl;
              let address = _get(socialObj, "identity_data.address", "");
              let placeId = _get(socialObj, "identity", "");
              formDataLocal = {
                ...formDataLocal,
                [editURL]: {
                  ...formDataLocal[editURL],
                  value: url,
                  valid: true,
                  identity: placeId,
                  profile_name: profile_name || name,
                  name: profile_name || name,
                  identity_data: {
                    directReviewUrl,
                    address
                  },
                  extraPayload: {
                    address,
                    placeId,
                    directReviewUrl
                  },
                  has_review_aggregator
                }
              };
            } else {
              formDataLocal = {
                ...formDataLocal,
                [editURL]: {
                  ...formDataLocal[editURL],
                  value: url,
                  valid: true,
                  has_review_aggregator
                }
              };
            }
          }
        }
      });
      this.setState({ formData: { ...this.state.formData, ...formDataLocal } });
    }
  };

  renderReviewURLBoxes = () => {
    const { formData } = this.state;
    let output = [];
    for (let item in formData) {
      //special case for google since the BOX is different from other reviewURL boxes.
      //check if the item contains platformId as 22
      let formField = _get(formData, item, {});
      let platformId = _get(formField, "social_media_app_id", "");
      if (platformId !== 22) {
        output = [
          ...output,
          <Grid item xs={12} md={6} lg={6}>
            <Paper>
              <style jsx>{reviewURLBoxStyles}</style>
              <div className="reviewURLBox">
                <div className="reviewURLBoxHeader">
                  <div className="reviewBoxHeaderContainer">
                    <div>
                      <h6>{formData[item].title}</h6>
                    </div>
                    {formData[item].isTemporary ? (
                      <div>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => {
                            let key = item;
                            const { formData } = this.state;
                            const formDataAfterOmission = _omit(formData, item);
                            this.setState({
                              formData: { ...formDataAfterOmission }
                            });
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <div>
                        <Tooltip title="This platform is already configured, but you are allowed to edit the platform URL and save changes">
                          <InfoIcon />
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
                <div className="reviewURLBoxContainerInner">
                  <div className="reviewURLBoxImgContainer">
                    {/* <img src={`/static/images/${formData[item].logo}`} /> */}
                  </div>
                  <div className="reviewURLBoxAutoComplete">
                    <>
                      <FormField
                        {...formData[item]}
                        id={item}
                        handleChange={this.handleChange}
                        styles={{
                          border: "0",
                          borderBottom: "1px solid #999",
                          borderRadius: "0",
                          marginLeft: 0,
                          paddingLeft: 0
                        }}
                      />
                    </>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        ];
      } else if (platformId == 22) {
        output = [
          ...output,
          <Grid item xs={12} md={6} lg={6}>
            <GoogleReviewURLBox
              formData={formData}
              formDataItemKey={item}
              handleAddressSelect={this.handleAddressSelect}
              handleGooglePlaceNameChange={this.handleGooglePlaceNameChange}
              handleRemoveTemporaryCard={this.handleRemoveTemporaryCard}
              handleSetAsPrimaryModalVisibilityToggle={
                this.handleSetAsPrimaryModalVisibilityToggle
              }
              showSetAsPrimaryModal={this.state.showSetAsPrimaryModal}
            />
          </Grid>
        ];
      }
    }
    return output;
  };

  //!Generate form fields dynamically only for selected social_media_app_id to edit
  generateFormFieldsForOnlySelectedPlatform = (reviewURLToEdit = "") => {
    //!if the review url is provided then continue
    if (reviewURLToEdit) {
      const socialArray = _get(this.props, "socialArray", []);
      if (socialArray) {
        if (Array.isArray(socialArray)) {
          if (socialArray.length > 0) {
            let onlySelectedPlatformArray = socialArray.filter(item => {
              let socialMediaAppId = _get(item, "social_media_app_id", "");
              if (socialMediaAppId) {
                return socialMediaAppId === reviewURLToEdit;
              }
            });
            if (onlySelectedPlatformArray) {
              if (Array.isArray(onlySelectedPlatformArray)) {
                if (onlySelectedPlatformArray.length > 0) {
                  this.generateFormFieldsDynamically(
                    onlySelectedPlatformArray,
                    true
                  );
                }
              }
            }
          }
        }
      }
    }
  };

  //!Generic method to handle primary location change for all platforms

  handlePrimaryLocationChange = selectedSetAsPrimaryFormDataObject => {
    let formData = _get(this.state, "formData", {});
    let formDataLocal = _get(this.state, "formData", {});
    const selectedSocialMediaId = _get(
      selectedSetAsPrimaryFormDataObject,
      "social_media_app_id",
      ""
    );
    const selectedFormDataItemKey = _get(
      selectedSetAsPrimaryFormDataObject,
      "editURL",
      ""
    );
    for (let item in formData) {
      let formItemObject = formData[item] || {};
      let socialMediaAppId = _get(formItemObject, "social_media_app_id", "");
      let formDataItemKey = _get(formItemObject, "editURL", "");
      if (socialMediaAppId === selectedSocialMediaId) {
        if (formDataItemKey === selectedFormDataItemKey) {
          formDataLocal = {
            ...formDataLocal,
            [formDataItemKey]: {
              ...formDataLocal[formDataItemKey],
              primary: 1,
              touched: true
            }
          };
        } else {
          formDataLocal = {
            ...formDataLocal,
            [formDataItemKey]: {
              ...formDataLocal[formDataItemKey],
              primary: ""
            }
          };
        }
      }
    }
    this.setState({ formData: { ...formData, ...formDataLocal } });
  };

  handleUseThesePlatformsClick = () => {
    const { selectedAvailablePlatformItems, formData } = this.state;
    const reviewURLToEdit = _get(this.props, "reviewURLToEdit", "");
    let parsedArray = [];
    if (
      selectedAvailablePlatformItems &&
      Array.isArray(selectedAvailablePlatformItems)
    ) {
      if (selectedAvailablePlatformItems.length > 0 && !reviewURLToEdit) {
        selectedAvailablePlatformItems.forEach(item => {
          let temp = {};
          temp.name = _get(item, "label", "");
          temp.social_media_app_id = Number(_get(item, "value", -1)) || -1;
          temp.url = "";
          //!adding a unique ID using timestamps for google only, change the condition below or use for all platforms in case multiple cards are needed.
          temp.id = (Number(_get(item, "value", -1)) || -1) == 22 ? _now() : "";
          parsedArray.push(temp);
        });
        this.generateFormFieldsDynamically(parsedArray, false, true);
        this.setState({ selectedAvailablePlatformItems: [] });
      }
    }
  };

  isUseThesePlatformsDisabled = () => {
    const { selectedAvailablePlatformItems } = this.state;
    let invalid = true;
    if (selectedAvailablePlatformItems) {
      if (Array.isArray(selectedAvailablePlatformItems)) {
        if (selectedAvailablePlatformItems.length > 0) {
          invalid = false;
        }
      }
    }
    return invalid;
  };

  startWithThesePlatforms = () => {
    const {
      setIsNewUser,
      changeStepToRender,
      setReviewsAfterLogin,
      socialArray
    } = this.props;
    setIsNewUser(false);
    //! reviews will be fetched in dashboard cdm
    // if (isValidArray(socialArray)) {
    //   setReviewsAfterLogin(socialArray);
    // }
    changeStepToRender(1);
  };

  render() {
    const reviewURLToEdit = _get(this.props, "reviewURLToEdit", "");
    const { modelOpen } = this.state;
    const showGetStarted = _get(this.props, "showGetStarted", false);
    const isLoading = _get(this.props, "isLoading", false);
    const { isFirstTimeLogin, socialArray } = this.props;
    return (
      <>
        <div>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={8}>
                {this.renderGetStartedHeader()}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                {showGetStarted && !this.anyFormDataChanged() ? (
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        this.props.setGetStartedShow(false, "");
                      }}
                      startIcon={<ArrowBackIcon />}
                    >
                      Back
                    </Button>
                  </div>
                ) : null}
              </Grid>
            </Grid>
            {reviewURLToEdit === "" ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={9} lg={9}>
                  <AvailablePlatformsList
                    reviewPlatforms={_get(
                      this.props,
                      "review_platforms.data",
                      {}
                    )}
                    socialPlatforms={_get(this.props, "socialArray", [])}
                    handleAvailablePlatformsListChange={
                      this.handleAvailablePlatformsListChange
                    }
                    selectedAvailablePlatformItems={
                      this.state.selectedAvailablePlatformItems
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <div style={{ textAlign: "left" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.handleUseThesePlatformsClick}
                      disabled={this.isUseThesePlatformsDisabled()}
                    >
                      Use these platforms
                    </Button>
                  </div>
                </Grid>
              </Grid>
            ) : null}
            <Grid container spacing={3}>
              {reviewURLToEdit === "" ? (
                <Grid
                  container
                  xs={12}
                  lg={12}
                  xs={12}
                  style={{ padding: "12px", marginTop: "15px" }}
                >
                  <div>
                    <h6>
                      If your platform is not listed in the dropdown above, you
                      may add it now :{" "}
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={this.handleModalVisibilityToggle}
                      >
                        Add a new platform
                      </Button>
                    </h6>
                  </div>
                </Grid>
              ) : null}
              {isFirstTimeLogin && (socialArray || []).length > 0 ? (
                <div style={{ margin: "10px 0px" }}>
                  <h4 style={{ color: "green" }}>
                    We've discovered these platforms for you automatically. You
                    may
                    <Button
                      style={{ color: "green", marginLeft: "10px" }}
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={this.startWithThesePlatforms}
                    >
                      continue with these platforms{" "}
                    </Button>{" "}
                    only or you may add more platforms by selecting it from
                    above dropdown.
                  </h4>
                </div>
              ) : null}
              {this.renderReviewURLBoxes()}
            </Grid>
            <Grid
              container
              spacing={3}
              style={{ marginTop: "35px", marginLeft: "4px" }}
            >
              {showGetStarted && !this.anyFormDataChanged() ? (
                <div style={{ textAlign: "right" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      this.props.setGetStartedShow(false, "");
                    }}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back
                  </Button>
                </div>
              ) : null}
            </Grid>
          </Container>
          <AddPlatformDialog
            open={modelOpen}
            handleClose={this.handleModalVisibilityToggle}
          />
          <SetAsPrimaryModal
            open={this.state.showSetAsPrimaryModal}
            handleClose={this.handleSetAsPrimaryModalVisibilityToggle}
            formData={this.state.formData}
            selectedSetAsPrimaryFormDataObject={
              this.state.selectedSetAsPrimaryFormDataObject
            }
            handlePrimaryLocationChange={this.handlePrimaryLocationChange}
          />
          <ClosedGetStartedConfirmationDialog
            open={this.state.showCloseConfirmationModal}
            handleClose={exitGetStarted => {
              this.handleCloseConfirmationModalVisibilityToggle(exitGetStarted);
            }}
          />
          <Slide
            direction="up"
            in={this.anyFormDataChanged()}
            mountOnEnter
            unmountOnExit
          >
            <BottomNotificationBar
              handleClose={this.handleCloseConfirmationModalVisibilityToggle}
              handleSavePermanentlyClick={this.handleSavePermanentlyClick}
              showGetStarted={this.props.showGetStarted}
              isLoading={isLoading}
            />
          </Slide>
        </div>
        <div>
          <Snackbar
            open={this.state.showSnackbar}
            variant={this.state.variant}
            handleClose={() => this.setState({ showSnackbar: false })}
            message={this.state.snackbarMsg}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const token = _get(auth, "logIn.token", "");
  const userProfile = _get(auth, "logIn.userProfile", {});
  const businessProfile = _get(auth, "logIn.userProfile.business_profile", {});
  const addressSelected = _get(businessProfile, "google_places.address", "");
  const googlePlaces = _get(businessProfile, "google_places", {});
  let socialArray = _get(businessProfile, "social", []);
  if (!isValidArray(socialArray)) {
    socialArray = [];
  }
  const isLoading = _get(dashboardData, "locatePlaceTemp.isLoading", undefined);
  const placeId = _get(businessProfile, "google_places.placeId", "");
  const type = _get(dashboardData, "type", "");
  const success = _get(dashboardData, "locatePlace.success", false);
  const locatePlace = _get(dashboardData, "locatePlace.success", false);
  const errorMsg = _get(
    dashboardData,
    "locatePlaceTemp.errorMsg",
    "Some Error Occured!"
  );
  const showGetStarted = _get(dashboardData, "showGetStarted", false);
  //? need to rename this reviewURLToEdit to reviewPlatformToEdit everywhere
  let reviewURLToEdit = _get(dashboardData, "reviewPlatformToEdit", "");
  if (reviewURLToEdit) {
    if (Number(reviewURLToEdit)) {
      reviewURLToEdit = Number(reviewURLToEdit);
    } else {
      reviewURLToEdit = "";
    }
  }
  const review_platforms = _get(dashboardData, "review_platforms", {});
  const isFirstTimeLogin = _get(auth, "logIn.userProfile.isNew", false);
  return {
    success,
    businessProfile,
    token,
    type,
    placeId,
    locatePlace,
    userProfile,
    isLoading,
    errorMsg,
    socialArray,
    showGetStarted,
    reviewURLToEdit,
    addressSelected,
    googlePlaces,
    review_platforms,
    isFirstTimeLogin
  };
};

export default connect(mapStateToProps, {
  locatePlaceByPlaceId,
  setGooglePlaces,
  setReviewsPusherConnect,
  setGetStartedShow,
  setIsNewUser,
  setReviewsAfterLogin
})(GetStarted);
