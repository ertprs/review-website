import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import PlacesAutoComplete from "../../../Components/Widgets/PlacesAutoComplete/PlacesAutoComplete";
import stringHelpers from "../../../utility/stringHelpers";
import Snackbar from "../../Widgets/Snackbar";
import { locatePlaceByPlaceId } from "../../../store/actions/dashboardActions";
import { locatePlaceApi, getStartedVideoUrl } from "../../../utility/config";
import { connect } from "react-redux";
import _get from "lodash/get";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormField from "../../Widgets/FormField/FormField";
import validate from "../../../utility/validate";
import {
  setGoogleDirectReviewUrl,
  setReviewsPusherConnect,
  clearReviewsData
} from "../../../store/actions/dashboardActions";

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
        valid: true,
        touched: true,
        errorMessage: "Enter valid review URL",
        placeholder: "Enter google review URL",
        validationRules: {
          required: false,
          isDomain: true
        },
        label: "Google review URL: "
      }
    }
  };

  handleContinueClick = () => {
    const { selectedAddress, address, formData } = this.state;
    const {
      setReviewsPusherConnect,
      locatePlaceByPlaceId,
      clearReviewsData
    } = this.props;
    if (Object.keys(selectedAddress).length > 0) {
      let data = {};
      if (formData["directReviewUrl"].value === "") {
        data = {
          ...selectedAddress,
          address
        };
      } else {
        data = {
          ...selectedAddress,
          directReviewUrl: formData["directReviewUrl"].value,
          address
        };
      }
      locatePlaceByPlaceId(
        data,
        this.props.token,
        `${process.env.BASE_URL}${locatePlaceApi}`
      );
      setReviewsPusherConnect(true);
      clearReviewsData();
    }
  };

  handleAddressSelect = (reqBody, address) => {
    const { userProfile } = this.props;
    const name = _get(userProfile, "company.name", "");
    this.setState({
      selectedAddress: { ...reqBody, name },
      address: address
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

  renderContinueBtn = () => {
    const { selectedAddress, formData } = this.state;
    const { type, isLoading } = this.props;
    return Object.keys(selectedAddress).length > 0  ? (
      <div style={{ marginTop: "50px", textAlign: "right" }}>
        {isLoading === true ? (
          <CircularProgress size={25} />
        ) : (
          <Button
            endIcon={<ArrowRight />}
            onClick={this.handleContinueClick}
            variant="contained"
            color="primary"
          >
            Claim &amp; continue
          </Button>
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
      }
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
            <img
              style={{ maxWidth: "300px" }}
              src="https://cdn.loom.com/sessions/thumbnails/ef51f581d64842a6bcdcd000d2645708-with-play.gif"
            />
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
            <h4>Please claim your Business</h4>
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
                {this.renderContinueBtn()}
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
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      success,
      changeStepToRender,
      isLoading,
      errorMsg,
      setGoogleDirectReviewUrl
    } = this.props;
    const { formData, address, selectedAddress } = this.state;
    const directReviewUrl = _get(formData, "directReviewUrl.value", "");
    if (this.props !== prevProps) {
      if (isLoading === false && success) {
        if (!this.props.home) {
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
        } else if (this.props.home) {
          this.props.changeEditMode();
        }
        setGoogleDirectReviewUrl(
          directReviewUrl,
          address,
          _get(selectedAddress, "placeId", "")
        );
      } else if (isLoading === false && !success) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: errorMsg
        });
      }
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {this.renderGetStartedHeader()}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {this.renderGetStartedBox()}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              {/* <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: "0"
                }}
              >
                <iframe
                  src="https://www.loom.com/embed/ef51f581d64842a6bcdcd000d2645708"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%"
                  }}
                ></iframe>
              </div> */}
            </Grid>
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
  return {
    success,
    businessProfile,
    token,
    type,
    placeId,
    locatePlace,
    userProfile,
    isLoading,
    errorMsg
  };
};

export default connect(
  mapStateToProps,
  {
    locatePlaceByPlaceId,
    setGoogleDirectReviewUrl,
    setReviewsPusherConnect,
    clearReviewsData
  }
)(GetStarted);
