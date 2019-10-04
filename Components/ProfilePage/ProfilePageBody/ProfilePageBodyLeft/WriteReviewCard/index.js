import React, { Component } from "react";
import Paper from "../../../../MaterialComponents/Paper";
import styles from "../ProfilePageBodyLeftStyles";
import RatingIndicators from "../../../../Widgets/RatingIndicators/RatingIndicators";
import FormField from "../../../../Widgets/FormField/FormField";
import validate from "../../../../../utility/validate";
import _get from "lodash/get";
import { connect } from "react-redux";
import {
  sendTrustVote,
  sendTrustDataLater
} from "../../../../../store/actions/trustAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import OAuthButtons from "../../../../Widgets/oAuthBtns";
import Snackbar from "../../../../../Components/Widgets/Snackbar";
import Router from "next/router";

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        review: {
          element: "textarea",
          value: "",
          placeholder: "Please write few words about your experience .....",
          errorMessage: "",
          valid: false,
          touched: false,
          validationRules: {
            required: true,
            minLength: 140,
            maxLength: 1000
          },
          name: "review"
        }
      },
      rating: 0,
      review: "",
      starSize: 0,
      isLoading: false,
      showSnackbar: false,
      variant: "success",
      snackbarMsg: ""
    };
    this.windowSize = 0;
  }

  componentDidMount() {
    this.windowSize = window.matchMedia("screen and (max-width: 991px)");
    this.changeStarSize(this.windowSize);
    this.windowSize.addEventListener("change", this.changeStarSize);
  }

  componentWillUnmount() {
    this.windowSize.removeEventListener("change", this.changeStarSize);
  }

  changeStarSize = windowSize => {
    if (windowSize.matches) {
      // If media query matches
      this.setState({ starSize: 28 });
    } else {
      this.setState({ starSize: 35 });
    }
  };

  changeRating = data => {
    this.setState({ rating: data });
  };

  handleChange = (e, id) => {
    const { value } = e.target;
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [id]: {
          ...formData[id],
          value: value,
          valid: validate(value, formData[id].validationRules),
          touched: true
        }
      }
    });
  };

  handlePostReview = () => {
    this.setState({ isLoading: true });
    const { value } = this.state.formData.review;
    const { rating } = this.state;
    const { sendTrustVote, auth, profileData, sendTrustDataLater } = this.props;
    const authorized = _get(auth, "logIn.authorized", false);
    const domain = _get(
      profileData,
      "domainProfileData.headerData.data.domain_name",
      ""
    );
    const reqBody = {
      rating,
      text: value,
      domain
    };
    if (authorized) {
      sendTrustVote(reqBody);
    } else {
      sendTrustDataLater(reqBody);
      Router.push("/login");
    }
  };

  renderAuthButtons = (formData, isLoading, authButtonLoading, authorized) => {
    if (!authorized) {
      return (
        <>
          {authButtonLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : !isLoading ? (
            <>
              <OAuthButtons disabled={!_get(formData, "review.valid", false)} />
              <style jsx>{styles}</style>
              <button
                disabled={!_get(formData, "review.valid", false)}
                className="postReviewButton"
                onClick={this.handlePostReview}
              >
                Login and Post Review
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", margin: "10px 0px" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          )}
        </>
      );
    } else if (authorized) {
      return (
        <>
          {isLoading ? (
            <div style={{ textAlign: "center", margin: "10px 0px" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <style jsx>{styles}</style>
              <button
                disabled={!_get(formData, "review.valid", false)}
                className="postReviewButton"
                onClick={this.handlePostReview}
              >
                Post Review
              </button>
            </>
          )}
        </>
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { trustVote, auth } = this.props;
    const isSuccess = _get(trustVote, "payload.success", false);
    const actionType = _get(trustVote, "type", "");
    const status = _get(trustVote, "payload.status", 0);
    if (this.props.trustVote !== prevProps.trustVote) {
      if (actionType === "TRUST_VOTE_SUCCESS") {
        if (isSuccess && status === 200) {
          this.setState({
            rating: 0,
            isLoading: false,
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Review Posted Successfully!"
          });
        }
      } else if (actionType === "TRUST_VOTE_SUCCESS") {
        if (!isSuccess) {
          this.setState({
            rating: 0,
            isLoading: false,
            showSnackbar: true,
            variant: "error",
            snackbarMsg: "Some Error Occured!"
          });
        }
      }
    }

    if (this.props.auth !== prevProps.auth) {
      const isLoginFailed = _get(auth, "logInTemp.isLoginFailed", false);
      const isWrongCredentials = _get(
        auth,
        "logInTemp.isWrongCredentials",
        false
      );
      const actionType = _get(auth, "type", "");
      const authorized = _get(auth, "logIn.authorized", false);
      if (isLoginFailed) {
        if (isWrongCredentials) {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: "Incorrect credentials!"
          });
        } else {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: "Some Error Occured!"
          });
        }
      } else if (authorized) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Logged in successfully!"
        });
      }
      if (actionType === "LOGIN_INIT") {
        this.setState({ authButtonLoading: true });
      } else if (
        actionType === "LOGIN_SUCCESS" ||
        actionType === "LOGIN_FAILURE"
      ) {
        this.setState({ authButtonLoading: false });
      }
    }
  }

  render() {
    const {
      formData,
      rating,
      starSize,
      isLoading,
      authButtonLoading
    } = this.state;
    const authorized = _get(this.props, "auth.logIn.authorized", false);
    return (
      <div className="writeReviewContainer">
        <style jsx>{styles}</style>
        <Paper>
          <div className="writeReviewBox">
            <div>
              <img
                src="/static/images/noProfileImg.jpg"
                alt="user-img"
                className="cardImg"
              />
              <span className="writeReviewTxt">Share your experience?</span>
            </div>
            <div className="reviewIndicator">
              <RatingIndicators
                rating={rating}
                typeOfWidget="star"
                widgetRatedColors="#21bc61"
                widgetHoverColors="#21bc61"
                widgetDimensions={starSize.toString()}
                widgetSpacings="1px"
                changeRating={this.changeRating}
              />
            </div>
          </div>
          {rating > 0 ? (
            <>
              <div className="mt-20">
                <FormField
                  {...formData.review}
                  handleChange={this.handleChange}
                  type="textarea"
                  id="review"
                  rows="5"
                  col="5"
                />
              </div>
              {this.renderAuthButtons(
                formData,
                isLoading,
                authButtonLoading,
                authorized
              )}
              <br />
              <div className="pt-10">
                <span
                  className="cancelReviewBtn"
                  onClick={() => this.setState({ rating: 0 })}
                >
                  I don't want to give review
                </span>
              </div>
            </>
          ) : (
            ""
          )}
        </Paper>
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
  const { auth, profileData, trustVote } = state;
  return { auth, profileData, trustVote };
};

export default connect(
  mapStateToProps,
  { sendTrustVote, sendTrustDataLater }
)(WriteReview);
