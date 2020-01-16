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
import FetchedIcon from "@material-ui/icons/CheckCircleRounded";
import LinearProgress from "@material-ui/core/LinearProgress";
import { resendActivationLink } from "../../../store/actions/authActions";
import { resendActivationLinkApi } from "../../../utility/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  upgradeToPremium,
  setGetStartedShow
} from "../../../store/actions/dashboardActions";
import withStyles from "@material-ui/styles/withStyles";
import Snackbar from "../../Widgets/Snackbar";
import getSubscriptionPlan from "../../../utility/getSubscriptionPlan";
import GetStarted from "../GetStarted/GetStarted";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Moment from "react-moment";
import { ratingColor, ratingType } from "../../../utility/ratingTypeColor";
import { reviewChannelBoxStyles } from "../GetStarted/reviewChannelBoxStyles";
import { reviewURLObjects } from "../../../utility/constants/reviewURLObjects";
import Link from "next/link";
import { iconNames } from "../../../utility/constants/socialMediaConstants";
import SmartUrl from "../../../Components/DashboardComponents/SmartUrl";
import dynamic from "next/dynamic";
import Head from "next/head";
const SimpleBar = dynamic(() => import("simplebar-react"), {
  ssr: false
});
import OverallPerformance from "./OverallPerformance";
import ReviewFetchStatus from "./ReviewsFetchStatus";
const styles = theme => ({
  button: {
    width: "150px"
  }
});
const ReviewPlatforms = dynamic(() => import("./ReviewPlatforms"));

class Home extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };

  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { success, socialArray } = this.props;
    if (success !== prevProps.success) {
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
                rating={Number(item.rating)}
                starRatedColor={
                  ratingColor[Math.round(Number(item.rating)) || 0]
                }
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

  renderInvitationsCard = () => {
    const { quotaDetails } = this.props;
    const total = _get(quotaDetails, "invitations.total", 0);
    const remaining = _get(quotaDetails, "invitations.remaining", 0);
    const created = _get(quotaDetails, "invitations.created", 0);
    const sent = _get(quotaDetails, "invitations.sent", 0);
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
          .container {
            margin: 50px 0;
            border-bottom: 1px solid #999;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
        <SimpleCard style={{ height: "298px" }}>
          <div className="header">
            <Title>
              <h5>Invitations Summary</h5>
            </Title>
            <span>You can send unlimited invitations to your customers.</span>
          </div>
          <div className="body">
            <div className="container">
              <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Total Invitations Created:
              </p>
              <h1>{created}</h1>
            </div>
            <div className="container">
              <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Total Invitations Sent :{" "}
              </p>
              {/* <span
              style={{ fontWeight: "bold", fontSize: "20px", color: "green" }}
              >
                {sent}
              </span> */}
              <h1>{sent}</h1>
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderBusinessDetails = () => {
    const { businessProfile, userProfile, showGetStarted } = this.props;
    const domain = _get(businessProfile, "domain", "");
    const companyName = _get(userProfile, "company.name", "");
    const subscriptionPlan = _get(userProfile, "subscription.plan_type_id", "");
    const expiresAt = _get(userProfile, "subscription.expires_at", "");

    return (
      <div className="businessDetailsContainer">
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
            <Link href={`https://www.${domain}`}>
              <a target="_blank">{domain}</a>
            </Link>
          </div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Company Name :</div>
          <div>{companyName}</div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Subscription Plan :</div>
          <div>{getSubscriptionPlan(subscriptionPlan)}</div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Subscription Expiry Date :</div>
          <div>
            <Moment format="DD/MM/YYYY HH:mm">
              {expiresAt || new Date().getDate()}
            </Moment>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      classes,
      isSubscriptionExpired,
      userActivated,
      changeStepToRender,
      showGetStarted,
      businessProfile,
      screenshot
    } = this.props;
    const domain = _get(businessProfile, "domain", "");
    let parsed_domain_name = domain.replace(/https:\/\//gim, "");
    parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
    const screenshotLayer = `https://api.screenshotlayer.com/api/capture?access_key=1ed89e56fa17fe2bd7cc86f2a0e6a209&url=https://www.${parsed_domain_name}&viewport=1440x900&width=250&random=${Math.floor(
      Math.random() * 10 + 1
    )}`;
    const noImgFound = "/static/images/noimageavailable.jpg";
    const domainScreenshot = screenshot
      ? screenshot
      : screenshotLayer
      ? screenshotLayer
      : noImgFound;
    return (
      <>
        <Head>
          <link
            href="/static/css/SimpleBar/simpleBarStyles.min.css"
            type="text/css"
            rel="stylesheet"
          />
        </Head>
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
        {!showGetStarted ? (
          <Grid container spacing={3}>
            {isSubscriptionExpired === true
              ? this.renderSubscriptionInfo(classes)
              : userActivated === false
              ? this.renderActivationInfo(classes)
              : ""}
            <Grid item xs={12} md={12} lg={12}>
              <SimpleCard>
                <div className="businessDetailsContainer">
                  <div className="businessDetailsImgContainer">
                    <img src={domainScreenshot} />
                  </div>
                  <div className="businessDetailsTextContainer">
                    {this.renderBusinessDetails()}
                  </div>
                </div>
              </SimpleCard>
            </Grid>
            <OverallPerformance />
            <ReviewFetchStatus {...this.props} />
            {this.renderInvitationsCard()}
            <ReviewPlatforms />
            {/* <>
              <Grid item xs={6} md={6} lg={6}>
                <h4 style={{ marginLeft: "5px" }}>Review Platforms : </h4>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <div style={{ textAlign: "right" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    // startIcon={<EditIcon />}
                    onClick={() => {
                      this.props.setGetStartedShow(!showGetStarted);
                    }}
                  >
                    Add/Edit Review Platforms
                  </Button>
                </div>
              </Grid>
            </> */}
            {/* {this.renderReviewURLBoxes()} */}
          </Grid>
        ) : (
          <div>
            <GetStarted
              changeStepToRender={data => {}}
              scrollToTopOfThePage={this.props.scrollToTopOfThePage()}
            />
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
  const allReviews = _get(dashboardData, "reviews", {});
  const quotaDetails = _get(dashboardData, "quotaDetails", {});
  const token = _get(auth, "logIn.token", "");
  const success = _get(auth, "resendActivation.success", "undefiend");
  const isLoading = _get(auth, "resendActivation.isLoading", false);
  const userProfile = _get(auth, "logIn.userProfile", {});
  const businessProfile = _get(auth, "logIn.userProfile.business_profile", {});
  const socialArray = _get(businessProfile, "social", []);
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
  const businessAddress = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.address",
    ""
  );
  const googlePlaceId = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.placeId",
    ""
  );
  const reviewsObject = _get(dashboardData, "reviewsObject", {});

  const showGetStarted = _get(dashboardData, "showGetStarted", false);
  const screenshot = _get(
    auth,
    "logIn.userProfile.business_profile.screenshot",
    ""
  );

  return {
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
    userActivated,
    businessAddress,
    reviewsObject,
    googlePlaceId,
    socialArray,
    dashboardData,
    showGetStarted,
    screenshot
  };
};

export default connect(mapStateToProps, {
  resendActivationLink,
  upgradeToPremium,
  setGetStartedShow
})(withStyles(styles)(Home));
