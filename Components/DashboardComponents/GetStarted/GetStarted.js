import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import PlacesAutoComplete from "../../../Components/Widgets/PlacesAutoComplete/PlacesAutoComplete";
import stringHelpers from "../../../utility/stringHelpers";
import Snackbar from "../../Widgets/Snackbar";
import {
  locatePlaceByPlaceId,
  setGetStartedShow
} from "../../../store/actions/dashboardActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { locatePlaceApi, getStartedVideoUrl } from "../../../utility/config";
import { connect } from "react-redux";
import _get from "lodash/get";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormField from "../../Widgets/FormField/FormField";
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

class GetStarted extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    address: "",
    selectedAddress: {},
    formData: {
      directReviewUrl: {
        element: "input",
        type: "text",
        value: _get(
          this.props,
          "businessProfile.google_places.directReviewUrl",
          ""
        ),
        valid: false,
        touched: false,
        errorMessage: "Enter valid review URL",
        placeholder: "Enter google review URL (optional)",
        validationRules: {
          required: false,
          isDomain: true
        },
        label: "Google review URL: ",
        name: "google",
        logo: "googleIcon.png",
        title: "Google reviews",
        key: 0,
        name: "google"
      },
      facebookReviewUrl: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid URL",
        placeholder: "Enter facebook business page URL (optional)",
        validationRules: {
          required: false,
          isDomain: true
        },
        label: "Facebook Business Page URL: ",
        logo: "facebookLogo.png",
        title: "Facebook reviews",
        key: 1,
        name: "facebook"
      },
      trustPilotReviewUrl: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid URL",
        placeholder: "Enter TrustPilot page URL (optional)",
        validationRules: {
          required: false,
          isDomain: true
        },
        label: "TrustPilot Page URL: ",
        logo: "trustpilotLogo.png",
        title: "TrustPilot reviews",
        key: 18,
        name: "trustpilot"
      },
      trustedShopsReviewUrl: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid URL",
        placeholder: "Enter TrustedShops page URL (optional)",
        validationRules: {
          required: false,
          isDomain: true
        },
        label: "TrustedShops Page URL: ",
        logo: "trustedShopLogo.jpg",
        title: "TrustedShops reviews",
        key: 19,
        name: "trustedshops"
      }
      //   appStoreReviewUrl: {
      //     element: "input",
      //     type: "text",
      //     value: "",
      //     valid: false,
      //     touched: false,
      //     errorMessage: "Enter valid URL",
      //     placeholder: "Enter App Store review page URL (optional)",
      //     validationRules: {
      //       required: false,
      //       isDomain: true
      //     },
      //     label: "App Store review Page URL: ",
      //     logo: "appStoreLogo.png",
      //     title: "App Store reviews"
      //   },
      //   googlePlayStoreReviewUrl: {
      //     element: "input",
      //     type: "text",
      //     value: "",
      //     valid: false,
      //     touched: false,
      //     errorMessage: "Enter valid URL",
      //     placeholder: "Enter Google play Store review page URL (optional)",
      //     validationRules: {
      //       required: false,
      //       isDomain: true
      //     },
      //     label: "Google play Store URL: ",
      //     logo: "googlePlayStoreLogo.png",
      //     title: "Google play store reviews"
      //   }
    },
    disabledSave: true
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

  handleAddressSelect = (reqBody, address) => {
    const { userProfile, businessProfile } = this.props;
    const name = _get(userProfile, "company.name", "");
    const googlePlaceId = _get(reqBody, "placeId", "");
    const domain = _get(businessProfile, "domain", "");
    const googleReviewUrl = `https://www.google.com/maps/search/?api=1&query=${domain}&query_place_id=${googlePlaceId}`;
    this.setState({
      selectedAddress: { ...reqBody, name },
      address: address,
      disabledSave: false,
      formData: {
        ...this.state.formData,
        directReviewUrl: {
          ...this.state.formData["directReviewUrl"],
          value: googleReviewUrl,
          valid: true,
          touched: true
        }
      }
    });
  };

  renderSelectedAddress = () => {
    const { selectedAddress, address } = this.state;
    const addressSelected = _get(this.props, "addressSelected", "");
    return Object.keys(selectedAddress).length > 0 ? (
      <div style={{ marginTop: "15px" }}>
        {address ? (
          <p>
            <span style={{ fontWeight: "bold" }}>Selected address :</span>{" "}
            {address}
          </p>
        ) : null}
      </div>
    ) : (
      <div style={{ marginTop: "15px" }}>
        {addressSelected ? (
          <p>
            <span style={{ fontWeight: "bold" }}>Selected address :</span>{" "}
            {addressSelected}
          </p>
        ) : null}
      </div>
    );
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

  renderDirectReviewUrl = () => {
    const { formData, selectedAddress } = this.state;
    return (
      <div className="row">
        <div
          className="col-md-7"
          style={{ alignItems: "flex-end", display: "flex", flex: "1" }}
        >
          <div style={{ width: "100%" }}>
            <FormField
              {...formData.directReviewUrl}
              id="directReviewUrl"
              handleChange={this.handleChange}
              styles={{
                border: "0",
                borderBottom: "1px solid #999",
                borderRadius: "0",
                marginLeft: 0,
                paddingLeft: 0
              }}
            />
          </div>
        </div>
        <div className="col-md-5">
          <Link href="https://www.loom.com/share/ef51f581d64842a6bcdcd000d2645708">
            <a target="_blank">
              {" "}
              <p>How to create review short link - Watch Video</p>{" "}
              <div style={{ maxWidth: "300px", height: "auto" }}>
                <img
                  style={{ maxWidth: "100%", height: "auto" }}
                  src="https://cdn.loom.com/sessions/thumbnails/ef51f581d64842a6bcdcd000d2645708-with-play.gif"
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    );
  };

  renderGetStartedBox = () => {
    return (
      <Paper>
        <style jsx>
          {`
            .getStartedBox {
              padding: 25px;
            }
            .getStartedBoxHeader {
              margin-bottom: 55px;
            }
            .getStartedBoxContainerInner {
              display: flex;
            }
            .getStartedBoxContainerInner div:first-child {
              flex-basis: 25%;
            }
            .getStartedBoxContainerInner div:last-child {
              flex-basis: 75%;
            }

            .getStartedBoxImgContainer {
              max-width: 250px;
              height: auto;
            }
            .getStartedBoxImgContainer img {
              max-width: 100%;
              height: auto;
            }

            @media screen and (max-width: 720px) {
              .getStartedBoxImgContainer {
                display: none;
              }
              .getStartedBoxHeader h4 {
                font-size: 1.1rem;
                margin-bottom: 35px;
              }
            }
          `}
        </style>
        <div className="getStartedBox">
          <div className="getStartedBoxHeader">
            <h4>Locate your business</h4>
          </div>
          <div className="getStartedBoxContainerInner">
            <div className="getStartedBoxImgContainer">
              <img src="/static/images/locate.png" />
            </div>
            <div className="getStartedBoxAutoComplete">
              <>
                <PlacesAutoComplete
                  handleAddressSelect={this.handleAddressSelect}
                />
                {this.renderSelectedAddress()}
                {this.renderDirectReviewUrl()}
                {/* {this.renderContinueBtn()} */}
              </>
            </div>
          </div>
        </div>
      </Paper>
    );
  };

  componentDidMount() {
    const { placeId, locatePlace, businessProfile } = this.props;
    if (placeId !== "" || locatePlace) {
      this.props.changeStepToRender(1);
    }
    const socialArray = _get(this.props, "socialArray", []);
    if (socialArray) {
      if (socialArray.length > 0) {
        this.prefillSocialURLs(socialArray);
      }
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
    }
  }

  prefillSocialURLs = socialArray => {
    let formDataLocal = this.state.formData;
    socialArray.forEach(item => {
      if (reviewURLObjects[item.social_media_app_id]) {
        let socialObj = reviewURLObjects[item.social_media_app_id] || {};
        let editURL = _get(socialObj, "editURL", "");
        let URL = _get(item, "url", "");
        if (formDataLocal[editURL]) {
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
    });
    this.setState({ formData: { ...this.state.formData, ...formDataLocal } });
  };

  renderReviewURLBoxes = () => {
    const { formData } = this.state;
    let output = [];
    for (let item in formData) {
      if (item !== "directReviewUrl") {
        output = [
          ...output,
          <Grid item xs={6} md={6} lg={6}>
            <Paper>
              <style jsx>{reviewURLBoxStyles}</style>
              <div className="reviewURLBox">
                <div className="reviewURLBoxHeader">
                  <h4>{formData[item].title}</h4>
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
      }
    }
    return output;
  };

  renderSpecificReviewURLBox = reviewURLToEdit => {
    const { formData } = this.state;
    if (reviewURLToEdit === "getStartedBox") {
      return this.renderGetStartedBox();
    } else {
      return (
        <Grid item xs={6} md={6} lg={6}>
          <Paper>
            <style jsx>{reviewURLBoxStyles}</style>
            <div className="reviewURLBox">
              <div className="reviewURLBoxHeader">
                <h4>{formData[reviewURLToEdit].title}</h4>
              </div>
              <div className="reviewURLBoxContainerInner">
                <div className="reviewURLBoxImgContainer">
                  <img
                    src={`/static/images/${formData[reviewURLToEdit].logo}`}
                  />
                </div>
                <div className="reviewURLBoxAutoComplete">
                  <>
                    <FormField
                      {...formData[reviewURLToEdit]}
                      id={reviewURLToEdit}
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
      );
    }
  };

  render() {
    const reviewURLToEdit = _get(this.props, "reviewURLToEdit", "");
    return (
      <div>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              {this.renderGetStartedHeader()}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {this.renderContinueBtn(reviewURLToEdit)}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {reviewURLToEdit === "" ? (
              <Grid item xs={12} md={6} lg={6}>
                {this.renderGetStartedBox()}
              </Grid>
            ) : null}
            {reviewURLToEdit === ""
              ? this.renderReviewURLBoxes()
              : this.renderSpecificReviewURLBox(reviewURLToEdit)}
          </Grid>
          <Grid container spacing={3} style={{ marginTop: "35px" }}>
            {this.renderContinueBtn()}
          </Grid>
        </Container>
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
    googlePlaces
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
