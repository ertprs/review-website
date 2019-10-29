import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../MaterialComponents/Card";
import StarRatings from "react-star-ratings";
import Title from "../../MaterialComponents/Title";
import { connect } from "react-redux";
import _get from "lodash/get";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { resendActivationLink } from "../../../store/actions/authActions";
import { upgradeToPremium } from "../../../store/actions/dashboardActions";
import { resendActivationLinkApi } from "../../../utility/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/styles/withStyles";
import Snackbar from "../../Widgets/Snackbar";
import getSubscriptionPlan from "../../../utility/getSubscriptionPlan";
import GetStarted from "../GetStarted/GetStarted";
import EditIcon from "@material-ui/icons/Edit";
const styles = theme => ({
  button: {
    width: "150px"
  }
});

class Home extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    editMode: false
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

  clickToUpgradeHandler = () => {
    const { upgradeToPremium, userName, userEmail, userPhone } = this.props;
    const data = {
      email: userEmail || "",
      name: userName || "",
      type: "some_random_form",
      objective: "get things done now",
      phone: userPhone || "123456789",
      websiteOwner: true
    };
    upgradeToPremium(data);
  };

  renderSubscriptionInfo = classes => {
    const { upgradeToPremiumIsLoading, activated } = this.props;
    if (activated == false) {
      return (
        <Grid item xs={12} md={12} lg={12}>
          <SimpleCard>
            <Typography>
              You don't have any active subscription. Please subscribe to use
              our features. &nbsp;&nbsp;
              {upgradeToPremiumIsLoading ? (
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
                  onClick={this.clickToUpgradeHandler}
                  color="primary"
                >
                  Upgrade Now
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
                : "Nothing found till yet, Will be updated in 24 hours !"}
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderInvitationsCard = () => {
    const { quotaDetails } = this.props;
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
    const {
      businessProfile,
      userProfile,
      googleDirectReviewUrl,
      googleDirectReviewUrlFirstTime,
      businessAddress,
      businessAddressFirstTime
    } = this.props;
    const domain = _get(businessProfile, "domain", "");
    const companyName = _get(userProfile, "company.name", "");
    const subscriptionPlan = _get(userProfile, "subscription.plan_type_id", "");
    const expiresAt = _get(userProfile, "subscription.expires_at", "");
    const googleReviewUrl =
      googleDirectReviewUrl === ""
        ? googleDirectReviewUrlFirstTime
        : googleDirectReviewUrl;
    const businessAdd =
      businessAddress === "" ? businessAddressFirstTime : businessAddress;
    return (
      <div className="businessDetailsContainer">
        <div className="editBtnContainer">
          <Button
            color="primary"
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              this.setState(prevState => {
                return { editMode: !prevState.editMode };
              });
            }}
          >
            Edit
          </Button>
        </div>
        <style jsx>
          {`
            .bold {
              font-weight: bold;
            }
            .editBtnContainer {
              text-align: right;
            }
            .businessDetailsContainer {
              margin-left: 25px;
            }
            .businessDetailsFlexItem {
              display: flex;
              margin-bottom: 10px;
            }
            .businessDetailsFlexItem div {
              flex: 1;
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
          <div className="bold">Google direct review url :</div>
          <div>
            <a href={googleReviewUrl} target="_blank">
              {businessAdd}
            </a>
          </div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Expires At :</div>
          <div>{expiresAt}</div>
        </div>
      </div>
    );
  };

  render() {
    const {
      classes,
      isSubscriptionExpired,
      userActivated,
      changeStepToRender
    } = this.props;
    const { editMode } = this.state;
    return (
      <>
        <style jsx>
          {`
            .businessDetailsContainer {
              display: flex;
            }
            .businessDetailsImgContainer {
              flex-basis: 20%;
              display: flex;
              align-items: center;
            }
            .businessDetailsTextContainer {
              flex-basis: 80%;
            }
            .businessDetailsImgContainer img {
              max-width: 100%;
              height: auto;
            }

            @media screen and (max-width: 720px) {
              .businessDetailsImgContainer {
                display: none;
              }
            }
          `}
        </style>
        {!editMode ? (
          <Grid container spacing={3}>
            {isSubscriptionExpired === true
              ? this.renderSubscriptionInfo(classes)
              : userActivated === false
              ? this.renderActivationInfo(classes)
              : ""}
            {this.renderOverviewCard()}
            {this.renderRecentReviewsCard()}
            {this.renderInvitationsCard()}
            <Grid item xs={12} md={12} lg={12}>
              <SimpleCard>
                <div className="businessDetailsContainer">
                  <div className="businessDetailsImgContainer">
                    <img src="/static/images/googleMyBusiness.jpg" />
                  </div>
                  <div className="businessDetailsTextContainer">
                    {this.renderBusinessDetails()}
                  </div>
                </div>
              </SimpleCard>
            </Grid>
          </Grid>
        ) : (
          <div>
            <GetStarted
              changeStepToRender={data => {}}
              home={true}
              changeEditMode={() => {
                this.setState({
                  editMode: false
                });
              }}
            />
            <div style={{ marginLeft: "30px" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  this.setState({
                    editMode: false
                  });
                }}
              >
                Back
              </Button>
            </div>
          </div>
        )}
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
  const isSubscriptionExpired = _get(auth, "isSubscriptionExpired", false);
  const userName = _get(auth, "logIn.userProfile.name", "");
  const userEmail = _get(auth, "logIn.userProfile.email", "");
  const userPhone = _get(auth, "logIn.userProfile.phone", "");
  const userActivated = _get(auth, "userActivated", false);
  const upgradeToPremiumIsLoading = _get(
    dashboardData,
    "upgradePremium.isLoading",
    false
  );
  const googleDirectReviewUrl = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.directReviewUrl",
    ""
  );
  const googleDirectReviewUrlFirstTime = _get(
    dashboardData,
    "googleDirectReviewUrl",
    ""
  );
  const businessAddress = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.address",
    ""
  );
  const businessAddressFirstTime = _get(dashboardData, "businessAddress", "");
  return {
    reviewsData,
    quotaDetails,
    activated,
    activation_required,
    token,
    success,
    isLoading,
    userProfile,
    businessProfile,
    isSubscriptionExpired,
    userName,
    userEmail,
    userPhone,
    upgradeToPremiumIsLoading,
    googleDirectReviewUrl,
    googleDirectReviewUrlFirstTime,
    userActivated,
    businessAddress,
    businessAddressFirstTime
  };
};

export default connect(
  mapStateToProps,
  { resendActivationLink, upgradeToPremium }
)(withStyles(styles)(Home));
