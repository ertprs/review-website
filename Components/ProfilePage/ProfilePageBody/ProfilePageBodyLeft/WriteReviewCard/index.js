import React, { Component } from "react";
import Paper from "../../../../MaterialComponents/Paper";
import styles from "../ProfilePageBodyLeftStyles";
import RatingIndicators from "../../../../Widgets/RatingIndicators/RatingIndicators";
import FormField from "../../../../Widgets/FormField/FormField";
import validate from "../../../../../utility/validate";
import _get from "lodash/get";
import { connect } from "react-redux";
import { sendTrustVote } from "../../../../../store/actions/trustAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import OAuthButtons from "../../../../Widgets/oAuthBtns";
import Snackbar from "../../../../../Components/Widgets/Snackbar";

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
            maxLength: 280
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
    this.windowSize = window.matchMedia("(max-width: 991px)");
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
    const { sendTrustVote, auth, profileData } = this.props;
    const authorized = _get(auth, "logIn.authorized", false);
    const domain = _get(
      profileData,
      "domainProfileData.headerData.data.domain_name",
      ""
    );
    if (authorized) {
      console.log(authorized, "authorized");
      const reqBody = {
        rating,
        text: value,
        domain
      };
      sendTrustVote(reqBody);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const isSuccess = _get(this.props, "trustVote.payload.success", false);
    const type = _get(this.props, "trustVote.type", "");
    if (this.props.trustVote !== prevProps.trustVote) {
      if (isSuccess) {
        this.setState({
          rating: 0,
          isLoading: false,
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Review Posted Successfully!"
        });
      } else {
        if (type !== "TRUST_VOTE_INIT") {
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
  }

  render() {
    const { formData, rating, starSize, isLoading, auth } = this.state;
    const authorized = _get(this.props, "auth.logIn.authorized", false);
    return (
      <div className="writeReviewContainer">
        <style jsx>
          {`
            .cancelReviewBtn {
              color: #111;
              cursor: pointer;
              transition: all 0.4s;
            }
            .cancelReviewBtn:hover {
              color: #21bc61;
            }
            .postReviewButton {
              width: 100%;
              padding: 8px 12px;
              color: #fff;
              background: #21bc61;
              border: 1px solid #21bc61;
              transition: all 0.4s;
              outline: none;
              border-radius: 2px;
            }

            .postReviewButton:disabled {
              border: 1px solid #baf0d0;
              background: #baf0d0;
            }

            .postReviewButton:hover {
              cursor: pointer;
              outline: none;
            }
          `}
        </style>
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
              {isLoading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress size={30} color="secondary" />
                </div>
              ) : (
                <button
                  disabled={!_get(formData, "review.valid", false) || !authorized}
                  className="postReviewButton"
                  onClick={this.handlePostReview}
                >
                  Post Review
                </button>
              )}
              {!authorized ? <OAuthButtons /> : null}
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
  { sendTrustVote }
)(WriteReview);
