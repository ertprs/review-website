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
import {
  upgradeToPremium,
  setGetStartedShow
} from "../../../store/actions/dashboardActions";
import withStyles from "@material-ui/styles/withStyles";
import getSubscriptionPlan from "../../../utility/getSubscriptionPlan";
import GetStarted from "../GetStarted/GetStarted";
import { ratingColor, ratingType } from "../../../utility/ratingTypeColor";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
import OverallPerformance from "./OverallPerformance";
import ReviewFetchStatus from "./ReviewsFetchStatus";
import ActivationInfo from "./ActivationInfo";
import SubscriptionInfo from "./SubscriptionInfo";
import { utcToTimezone } from "../../../utility/commonFunctions";
const ReviewPlatforms = dynamic(() => import("./ReviewPlatforms"));

const styles = theme => ({
  button: {
    width: "150px"
  }
});

class Home extends Component {
  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }

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
            margin: 25px 0;
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
              <h1>{sent}</h1>
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
    const timezone = _get(userProfile, "timezone", "");
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
          <div>{utcToTimezone(expiresAt, timezone)}</div>
        </div>
      </div>
    );
  };

  render() {
    const {
      classes,
      isSubscriptionExpired,
      activated,
      showGetStarted,
      screenshot
    } = this.props;
    const noImgFound = "/static/images/noimageavailable.png";
    const domainScreenshot = screenshot ? screenshot : noImgFound;
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
            {isSubscriptionExpired === true ? (
              <SubscriptionInfo />
            ) : activated === false ? (
              <ActivationInfo />
            ) : (
              ""
            )}
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
          </Grid>
        ) : (
          <div>
            <GetStarted
              changeStepToRender={data => {}}
              scrollToTopOfThePage={this.props.scrollToTopOfThePage()}
            />
          </div>
        )}
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
  const quotaDetails = _get(dashboardData, "quotaDetails", {});
  const userProfile = _get(auth, "logIn.userProfile", {});
  const businessProfile = _get(auth, "logIn.userProfile.business_profile", {});
  const socialArray = _get(businessProfile, "social", []);
  const isSubscriptionExpired = _get(auth, "isSubscriptionExpired", false);
  const upgradeToPremiumIsLoading = _get(
    dashboardData,
    "upgradePremium.isLoading",
    false
  );
  const businessAddress = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.address",
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
    userProfile,
    businessProfile,
    isSubscriptionExpired,
    upgradeToPremiumIsLoading,
    businessAddress,
    reviewsObject,
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
