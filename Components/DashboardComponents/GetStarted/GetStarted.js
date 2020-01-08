import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import stringHelpers from "../../../utility/stringHelpers";
import Snackbar from "../../Widgets/Snackbar";
import {
  locatePlaceByPlaceId,
  setGetStartedShow
} from "../../../store/actions/dashboardActions";
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
import {
  setGooglePlaces,
  setReviewsPusherConnect,
  setReviewsObjectWithPusher,
  clearReviewsData
} from "../../../store/actions/dashboardActions";
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
    updateMode = false
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
            placeholder: `Enter ${name} page URL (optional)`,
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
    // console.log(formData, "dynamic formData");
    if (updateMode) {
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

  handleContinueClick = () => {
    const { selectedAddress, address, formData } = this.state;
    const {
      setReviewsPusherConnect,
      setReviewsObjectWithPusher,
      locatePlaceByPlaceId,
      clearReviewsData,
      googlePlaces
    } = this.props;
    let reqBody = {};

    //! this object will be used to represent that which reviews are coming from pusher and their values represent that will they be fetched again or not.

    let reviewsObject = {
      google: false,
      facebook: false,
      trustpilot: false,
      trustedshops: false
    };

    for (let item in formData) {
      if (item === "directReviewUrl") {
        if (Object.keys(selectedAddress).length > 0) {
          reviewsObject.google = true;
          reqBody = {
            ...reqBody,
            google: {
              ...selectedAddress,
              address,
              directReviewUrl: formData[item].value
            }
          };
          clearReviewsData();
        } else if (
          Object.keys(selectedAddress).length === 0 &&
          formData[item].touched
        ) {
          reviewsObject.google = true;
          reqBody = {
            ...reqBody,
            google: {
              address: _get(googlePlaces, "address", ""),
              directReviewUrl: formData[item].value,
              name: _get(googlePlaces, "name", ""),
              placeId: _get(googlePlaces, "placeId", "")
            }
          };
          clearReviewsData();
        }
      } else {
        if (formData[item].valid && formData[item].touched) {
          let itemName = formData[item].name;
          reviewsObject[itemName] = true;
          let key = formData[item].key;
          reqBody = { ...reqBody, [key]: formData[item].value };
        }
      }
    }
    if (Object.keys(reqBody).length > 0) {
      locatePlaceByPlaceId(
        reqBody,
        this.props.token,
        `${process.env.BASE_URL}${locatePlaceApi}`
      );
      setReviewsPusherConnect(true);
      setReviewsObjectWithPusher(reviewsObject);
      //! we don't want to clear google reviews data as they will be already updating.
    }
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
    console.log(reqBody);
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
        },
        () => {
          console.log("state set");
        }
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
              touched: true,
              valid: validate(
                formDataLocal[formDataItemKey].value,
                formDataLocal[formDataItemKey].validationRules
              )
            }
          }
        },
        () => {
          console.log("Google review URL state set with latest name");
        }
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

  anyURLSelected = () => {
    let valid = false;
    let { formData } = this.state;
    for (let item in formData) {
      valid = valid || (formData[item].value !== "" && formData[item].valid);
    }
    return valid;
  };
  // To be FIXED
  renderContinueBtn = reviewURLToEdit => {
    const { selectedAddress, formData, disabledSave } = this.state;
    const { type, isLoading, showGetStarted } = this.props;
    return (
      <div style={{ textAlign: "right" }}>
        {isLoading === true ? (
          <Button variant="contained" color="primary" size="large">
            <CircularProgress size={25} style={{ color: "white" }} />
          </Button>
        ) : (
          <>
            {showGetStarted ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  this.props.setGetStartedShow(false, "");
                }}
              >
                Close
              </Button>
            ) : null}
            <Button
              disabled={
                disabledSave ||
                !(
                  Object.keys(selectedAddress).length > 0 ||
                  this.anyURLSelected()
                )
              }
              style={{ marginLeft: "20px" }}
              onClick={this.handleContinueClick}
              variant="contained"
              color="primary"
              size="large"
            >
              Save Changes
            </Button>
          </>
        )}
      </div>
    );
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
    const { placeId, locatePlace, businessProfile, socialArray } = this.props;
    if (socialArray) {
      if (socialArray.length > 0) {
        //check on update also - Done
        this.generateFormFieldsDynamically(
          _get(this.props, "socialArray", []),
          true
        );
      }
    }
    if (this.props.scrollToTopOfThePage) {
      this.props.scrollToTopOfThePage();
    }
    if (placeId !== "" || locatePlace) {
      this.props.changeStepToRender(1);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      success,
      changeStepToRender,
      isLoading,
      errorMsg,
      setGooglePlaces,
      googlePlaces
    } = this.props;
    const { formData, address, selectedAddress } = this.state;
    const directReviewUrl = _get(formData, "directReviewUrl.value", "");

    if (this.props !== prevProps) {
      if (isLoading !== prevProps.isLoading && success !== prevProps.success) {
        if (isLoading === false && success) {
          this.setState(
            {
              showSnackbar: true,
              variant: "success",
              snackbarMsg: "Review URL Updated Successfully!"
            },
            () => {
              changeStepToRender(1);
            }
          );

          if (
            _get(formData, "directReviewUrl.touched", false) ||
            selectedAddress
          ) {
            // this action is used to update google_places in login/userProfile/business_profile whenever we change directReviewURL or business address
            let newGooglePlaces = {
              directReviewUrl:
                directReviewUrl || _get(googlePlaces, "directReviewUrl", ""),
              address: address || _get(googlePlaces, "address", ""),
              placeId:
                _get(selectedAddress, "placeId", "") ||
                _get(googlePlaces, "placeId", "")
            };
            setGooglePlaces(newGooglePlaces);
          }
        } else if (isLoading === false && !success) {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: errorMsg
          });
        }
      }
      if (this.props.socialArray !== prevProps.socialArray) {
        this.generateFormFieldsDynamically(
          _get(this.props, "socialArray", []),
          true
        );
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
        let URL = _get(socialObj, "url", "");
        let id = _get(socialObj, "id", "");
        let social_media_app_id = _get(socialObj, "social_media_app_id", "");
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
              let address = _get(socialObj, "identity_data.address", "");
              let placeId = _get(socialObj, "identity", "");
              let url = _get(socialObj, "identity_data.directReviewUrl", "");
              formDataLocal = {
                ...formDataLocal,
                [editURL]: {
                  ...formDataLocal[editURL],
                  value: url,
                  valid: true,
                  identity: placeId,
                  identity_data: {
                    directReviewUrl,
                    address
                  },
                  extraPayload: {
                    address,
                    placeId,
                    directReviewUrl
                  }
                }
              };
            } else {
              formDataLocal = {
                ...formDataLocal,
                [editURL]: {
                  ...formDataLocal[editURL],
                  value: URL,
                  valid: true
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
                    <img src={`/static/images/${formData[item].logo}`} />
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

  renderSpecificReviewURLBox = reviewURLToEdit => {
    const { formData } = this.state;
    console.log(reviewURLToEdit);
    // if (Object.keys(formData).length > 0) {
    //   if (reviewURLToEdit === "getStartedBox") {
    //     return this.renderGetStartedBox();
    //   } else {
    //     return (
    //       <Grid item xs={6} md={6} lg={6}>
    //         <Paper>
    //           <style jsx>{reviewURLBoxStyles}</style>
    //           <div className="reviewURLBox">
    //             <div className="reviewURLBoxHeader">
    //               <h4>{formData[reviewURLToEdit].name}</h4>
    //             </div>
    //             <div className="reviewURLBoxContainerInner">
    //               <div className="reviewURLBoxImgContainer">
    //                 <img
    //                   src={`/static/images/${formData[reviewURLToEdit].logo}`}
    //                 />
    //               </div>
    //               <div className="reviewURLBoxAutoComplete">
    //                 <>
    //                   <FormField
    //                     {...formData[reviewURLToEdit]}
    //                     id={reviewURLToEdit}
    //                     handleChange={this.handleChange}
    //                     styles={{
    //                       border: "0",
    //                       borderBottom: "1px solid #999",
    //                       borderRadius: "0",
    //                       marginLeft: 0,
    //                       paddingLeft: 0
    //                     }}
    //                   />
    //                 </>
    //               </div>
    //             </div>
    //           </div>
    //         </Paper>
    //       </Grid>
    //     );
    //   }
    // }
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
            [formDataItemKey]: { ...formDataLocal[formDataItemKey], primary: 1 }
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
    console.log(selectedAvailablePlatformItems, "use these platforms");
    let parsedArray = [];
    if (
      selectedAvailablePlatformItems &&
      Array.isArray(selectedAvailablePlatformItems)
    ) {
      if (selectedAvailablePlatformItems.length > 0) {
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

  render() {
    const reviewURLToEdit = _get(this.props, "reviewURLToEdit", "");
    const { modelOpen } = this.state;
    return (
      <div>
        <Head>
          <link
            href="/static/css/SimpleBar/simpleBarStyles.min.css"
            type="text/css"
            rel="stylesheet"
          />
        </Head>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              {this.renderGetStartedHeader()}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {/* {this.renderContinueBtn(reviewURLToEdit)} */}
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
            {/* <SimpleBar
                style={{ height: "300px" }}
                autoHide={false}
                forceVisible="y"
              > */}
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
            {reviewURLToEdit === ""
              ? this.renderReviewURLBoxes()
              : this.renderSpecificReviewURLBox(reviewURLToEdit)}
            {/* {reviewURLToEdit === "" ? (
              <Grid item xs={12} md={6} lg={6}>
                {this.renderGetStartedBox()}
              </Grid>
            ) : null} */}
            {/* </SimpleBar> */}
          </Grid>
          {/* <Grid container spacing={3}>
            <Grid xs={12} md={12} lg={12}>
            <AddPlatform />
            Second column
            </Grid>
          </Grid> */}
          {/* <Grid container spacing={3}>
            {reviewURLToEdit === "" ? (
              <Grid item xs={12} md={6} lg={6}>
                {this.renderGetStartedBox()}
              </Grid>
            ) : null}
            {reviewURLToEdit === ""
              ? this.renderReviewURLBoxes()
              : this.renderSpecificReviewURLBox(reviewURLToEdit)}
          </Grid> */}
          <Grid container spacing={3} style={{ marginTop: "35px" }}>
            {/* {this.renderContinueBtn()} */}
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
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </div>
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
  const socialArray = _get(businessProfile, "social", []);
  const isLoading = _get(
    dashboardData,
    "locatePlaceTemp.isLoading",
    "undefined"
  );
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
  const reviewURLToEdit = _get(dashboardData, "reviewURLToEdit", "");
  const review_platforms = _get(dashboardData, "review_platforms", {});
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
    review_platforms
  };
};

export default connect(mapStateToProps, {
  locatePlaceByPlaceId,
  setGooglePlaces,
  setReviewsPusherConnect,
  setReviewsObjectWithPusher,
  clearReviewsData,
  setGetStartedShow
})(GetStarted);
