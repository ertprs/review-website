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
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid review URL",
        placeholder: "Enter google review URL (optional)",
        validationRules: {
          required: false,
          isDomain: true
        },
        label: "Google review URL: ",
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
      clearReviewsData
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
      this.setState({ disabledSave: true });
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
    const { userProfile } = this.props;
    const name = _get(userProfile, "company.name", "");
    this.setState({
      selectedAddress: { ...reqBody, name },
      address: address,
      disabledSave: false
    });
  };

  renderSelectedAddress = () => {
    const { selectedAddress } = this.state;
    return Object.keys(selectedAddress).length > 0 ? (
      <div style={{ marginTop: "30px" }}>
        <p>
          <span style={{ fontWeight: "bold" }}>Selected address :</span>{" "}
          {this.state.address}
        </p>
      </div>
    ) : null;
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
          }
        `}</style>
        <h3 className="getStartedHeader">
          <span style={{ textTransform: "capitalize" }}>
            {stringHelpers("getTimeGreeting")}
          </span>{" "}
          {name}
        </h3>
        <h6 className="getStartedSubHeader">
          This is your personal setup guide. Let’s get you up and running so you
          can get more reviews and build trust.
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

  renderContinueBtn = () => {
    const { selectedAddress, formData, disabledSave } = this.state;
    const { type, isLoading } = this.props;
    return Object.keys(selectedAddress).length > 0 || this.anyURLSelected() ? (
      <div style={{ textAlign: "right" }}>
        {isLoading === true ? (
          <Button>
            <CircularProgress size={25} />
          </Button>
        ) : (
          <>
            <Button
              disabled={disabledSave}
              style={{ marginRight: "10px" }}
              // endIcon={<ArrowRight />}
              onClick={this.handleContinueClick}
              variant="contained"
              color="primary"
              size="large"
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              // startIcon={<ArrowBackIcon />}
              onClick={() => {
                this.props.setGetStartedShow(false, "");
              }}
            >
              Close
            </Button>
          </>
        )}
      </div>
    ) : null;
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
    return Object.keys(selectedAddress).length > 0 ? (
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
          <a
            href="https://www.loom.com/share/ef51f581d64842a6bcdcd000d2645708"
            target="_blank"
          >
            {" "}
            <p>How to create review short link - Watch Video</p>{" "}
            <div style={{ maxWidth: "300px", height: "auto" }}>
              <img
                style={{ maxWidth: "100%", height: "auto" }}
                src="https://cdn.loom.com/sessions/thumbnails/ef51f581d64842a6bcdcd000d2645708-with-play.gif"
              />
            </div>
          </a>
        </div>
      </div>
    ) : null;
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
            <h4>Google Reviews</h4>
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
    const { placeId, locatePlace } = this.props;
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
      setGooglePlaces
    } = this.props;
    const { formData, address, selectedAddress } = this.state;
    const directReviewUrl = _get(formData, "directReviewUrl.value", "");
    const socialArrayPrev = _get(prevProps, "socialArray", []);
    const socialArray = _get(this.props, "socialArray", []);

    if (this.props !== prevProps) {
      if (isLoading !== prevProps.isLoading && success !== prevProps.success) {
        if (isLoading === false && success) {
          this.setState(
            {
              showSnackbar: true,
              variant: "success",
              snackbarMsg: "Data located successfully!"
            },
            () => {
              changeStepToRender(1);
            }
          );

          if (_get(formData, "directReviewUrl.touched", false)) {
            // used to show updated direct review url on home, google reviews, send invitations, dispatching this action only when gooogle review url is changed
            let googlePlaces = {
              directReviewUrl: directReviewUrl || "",
              address: address || "",
              placeId: _get(selectedAddress, "placeId", "")
            };
            setGooglePlaces(googlePlaces);
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
                <img src={`/static/images/${formData[reviewURLToEdit].logo}`} />
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
              {this.renderContinueBtn()}
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
            {/* {this.props.showGetStarted ? (
              <div style={{ marginRight: "50px", marginLeft: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    this.props.setGetStartedShow(false, "");
                  }}
                >
                  Back
                </Button>
              </div>
            ) : null} */}
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
    reviewURLToEdit
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
