import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../MaterialComponents/Card";
import StarRatings from "react-star-ratings";
import Title from "../../MaterialComponents/Title";
import { connect } from "react-redux";
import _get from "lodash/get";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { resendActivationLink } from "../../../store/actions/authActions";
import { resendActivationLinkApi } from "../../../utility/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/styles/withStyles";
import Snackbar from "../../Widgets/Snackbar";
import getSubscriptionPlan from "../../../utility/getSubscriptionPlan";

const styles = theme => ({
  button: {
    width: "150px"
  }
});

class Home extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const { success } = this.props;
      let snackbarMsg = "";
      if (success === true) {
        snackbarMsg = "Mail sent successfully, Please verify your email.";
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg
        });
      } else if (success === false) {
        snackbarMsg = "Some error occured.";
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg
        });
      }
    }
  }

  sendActivationLink = () => {
    const { token, resendActivationLink } = this.props;
    resendActivationLink(token, resendActivationLinkApi);
  };

  renderActivationInfo = classes => {
    const { activated, isLoading, activation_required } = this.props;
    console.log(isLoading, "isLoading");
    if (activated == false) {
      return (
        <Grid item xs={12} md={12} lg={12}>
          <SimpleCard>
            <Typography>
              Your account is not activated.&nbsp;
              {activation_required
                ? "Please activate your account to use our features."
                : null}
              &nbsp;&nbsp;
              {isLoading ? (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  <CircularProgress size={25} color={"fff"} />
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={this.sendActivationLink}
                  color="primary"
                >
                  Activate now
                </Button>
              )}
            </Typography>
          </SimpleCard>
        </Grid>
      );
    }
  };

  renderOverviewCard = () => {
    const { reviewsData } = this.props;
    const rating = _get(reviewsData, "rating", 0);
    const total = _get(reviewsData, "total", 0);
    return (
      <Grid item xs={12} md={4} lg={4}>
        <style jsx>{`
          .header {
            margin-bottom: 30px;
          }
          .body {
            margin-bottom: 30px;
          }
          .bodyHeader {
            margin-left: 4px;
          }
          .ratingsContainer {
            margin: 10px 0 10px 0;
          }
          .bodyFooter {
            margin-left: 4px;
          }
          .footer {
            border: 1px solid #d8d8d8;
            padding: 10px;
          }
          .trustScore {
            font-size: 1.5rem;
            font-weight: lighter;
          }
        `}</style>
        <SimpleCard style={{ height: "298px" }}>
          <div className="header">
            <Title>
              <h5>Overall performance</h5>
            </Title>
          </div>
          <div className="body">
            <div className="bodyHeader">
              <h4>Average</h4>
            </div>
            <div className="ratingsContainer">
              <StarRatings
                rating={Number(rating)}
                starRatedColor="#21bc61"
                starDimension="30px"
                starSpacing="0.5px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="bodyFooter">
              <div>Based on {total} reviews</div>
            </div>
          </div>
          <div className="footer">
            <div>Trustsearch score</div>
            <div className="trustScore">
              <span style={{ fontWeight: "400" }}>{rating}</span> out of 5
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderReviewSnippets = topThreeReviews => {
    return topThreeReviews.map(item => {
      let reviewText = "";
      if (item.hasOwnProperty("text")) {
        if (item.text) {
          if (item.text.length > 26) {
            reviewText = _get(item, "text", "").substring(0, 26) + "...";
          } else {
            reviewText = _get(item, "text", "");
          }
        }
      }
      return (
        <div className="reviewSnippetContainer">
          <style jsx>
            {`
              .reviewSnippetContainer {
                margin-bottom: 25px;
              }
              .reviewBody {
                display: flex;
                justify-content: space-between;
              }
              .reviewBodyText {
                margin-top: 1.5px;
                color: #999;
                font-size: 0.8rem;
              }
            `}
          </style>
          <div className="reviewText">{reviewText}</div>
          <div className="reviewBody">
            <div>
              <StarRatings
                rating={item.rating}
                starRatedColor="#21bc61"
                starDimension="17px"
                starSpacing="0.5px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="reviewBodyText">{item.name}</div>
          </div>
        </div>
      );
    });
  };

  renderRecentReviewsCard = () => {
    const { reviewsData } = this.props;
    const reviews = _get(reviewsData, "reviews", []);
    const topThreeReviews = reviews.length > 3 ? reviews.slice(0, 3) : reviews;
    return (
      <Grid item xs={12} md={4} lg={4}>
        <style jsx>{`
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
          }
          .fadedHeader {
            font-weight: lighter;
            color: #555;
          }
        `}</style>
        <SimpleCard style={{ height: "298px" }}>
          <div className="header">
            <Title>
              <h5>Latest reviews</h5>
            </Title>
            <div className="fadedHeader">(Top 3 )</div>
          </div>
          <div className="body">
            <div>
              {topThreeReviews.length > 0
                ? this.renderReviewSnippets(topThreeReviews)
                : "Will be displayed in 24 hours !"}
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderInvitationsCard = () => {
    const { quotaDetails } = this.props;
    console.log(quotaDetails, "quotaDetails");
    const total = _get(quotaDetails, "invitations.total", 0);
    const remaining = _get(quotaDetails, "invitations.remaining", 0);
    return (
      <Grid item xs={12} md={4} lg={4}>
        <style jsx>{`
          .header {
            margin-bottom: 24px;
          }
          .fadedHeader {
            font-weight: lighter;
            color: #555;
          }
        `}</style>
        <SimpleCard style={{ height: "298px" }}>
          <div className="header">
            <Title>
              <h5>Invitations Summary</h5>
            </Title>
          </div>
          <div className="body">
            <div
              style={{
                marginBottom: "21px",
                borderBottom: "1px solid #999"
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Total Invitations :{" "}
              </p>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  textAlign: "right"
                }}
              >
                {total}
              </h1>
            </div>
            <div style={{ borderBottom: "1px solid #999" }}>
              <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Invitations Left :{" "}
              </p>
              <h1 style={{ textAlign: "right" }}>{remaining}</h1>
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderBusinessDetails = () => {
    const { businessProfile, userProfile } = this.props;
    const domain = _get(businessProfile, "domain", "");
    const companyName = _get(userProfile, "company.name", "");
    const subscriptionPlan = _get(userProfile, "subscription.plan_type_id", "");
    const expiresAt = _get(userProfile, "subscription.expires_at", "");
    return (
      <Grid item xs={12} md={12} lg={12}>
        <SimpleCard>
          <div className="businessDetailsContainer">
            <style jsx>
              {`
                .bold {
                  font-weight: bold;
                }
                .businessDetailsContainer {
                  margin-left: 25px;
                }
                .businessDetailsFlexItem {
                  display: flex;
                  margin-bottom: 10px;
                }
                .businessDetailsFlexItem div {
                  flex-basis: 100%;
                  font-size: 16px;
                }
                @media screen and (max-width: 720px) {
                  .businessDetailsFlexItem {
                    flex-direction: column;
                    flex-basis: 100%;
                  }
                }
              `}
            </style>
            <div className="businessDetailsFlexItem">
              <div className="bold">Domain :</div>
              <div>
                <a href={`https://www.${domain}`} target="_blank">
                  {domain}
                </a>
              </div>
            </div>
            <div className="businessDetailsFlexItem">
              <div className="bold">Company Name :</div>
              <div>{companyName}</div>
            </div>
            <div className="businessDetailsFlexItem">
              <div className="bold">Subscription plan :</div>
              <div>{getSubscriptionPlan(subscriptionPlan)}</div>
            </div>
            <div className="businessDetailsFlexItem">
              <div className="bold">Expires At :</div>
              <div>{expiresAt}</div>
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container spacing={3}>
          {this.renderActivationInfo(classes)}
          {this.renderOverviewCard()}
          {this.renderRecentReviewsCard()}
          {this.renderInvitationsCard()}
          {this.renderBusinessDetails()}
        </Grid>
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const activated = _get(auth, "logIn.userProfile.activated", false);
  const activation_required = _get(
    auth,
    "logIn.userProfile.activation_required",
    false
  );
  const reviewsData = _get(dashboardData, "reviews.data", {});
  const quotaDetails = _get(dashboardData, "quotaDetails", {});
  const token = _get(auth, "logIn.token", "");
  const success = _get(auth, "resendActivation.success", "undefiend");
  const isLoading = _get(auth, "resendActivation.isLoading", false);
  const userProfile = _get(auth, "logIn.userProfile", {});
  const businessProfile = _get(auth, "logIn.userProfile.business_profile", {});

  return {
    reviewsData,
    quotaDetails,
    activated,
    activation_required,
    token,
    success,
    isLoading,
    userProfile,
    businessProfile
  };
};

export default connect(
  mapStateToProps,
  { resendActivationLink }
)(withStyles(styles)(Home));
