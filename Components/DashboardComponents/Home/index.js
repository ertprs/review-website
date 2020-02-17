import React, { Component } from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import Head from "next/head";
const OverallPerformance = dynamic(() => import("./OverallPerformance"));
const BusinessDetails = dynamic(() => import("./BusinessDetails"));
const GetStarted = dynamic(() => import("../GetStarted/GetStarted"));
const InvitationDetails = dynamic(() => import("./InvittaionDetails"));
const ReviewFetchStatus = dynamic(() => import("./ReviewsFetchStatus"));
const ActivationInfo = dynamic(() => import("./ActivationInfo"));
const SubscriptionInfo = dynamic(() => import("./SubscriptionInfo"));
const ReviewPlatforms = dynamic(() => import("./ReviewPlatforms"));
import Grid from "@material-ui/core/Grid";
import { setGetStartedShow } from "../../../store/actions/dashboardActions";
import _get from "lodash/get";

class Home extends Component {
  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }

  render() {
    const { isSubscriptionExpired, activated, showGetStarted } = this.props;
    return (
      <>
        <Head>
          <link
            href="/static/css/SimpleBar/simpleBarStyles.min.css"
            type="text/css"
            rel="stylesheet"
          />
        </Head>
        {!showGetStarted ? (
          <Grid container spacing={3}>
            {isSubscriptionExpired === true ? (
              <SubscriptionInfo />
            ) : activated === false ? (
              <ActivationInfo />
            ) : (
              ""
            )}
            <BusinessDetails />
            <OverallPerformance />
            <ReviewFetchStatus {...this.props} />
            <InvitationDetails />
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
  const isSubscriptionExpired = _get(auth, "isSubscriptionExpired", false);
  const showGetStarted = _get(dashboardData, "showGetStarted", false);
  return {
    activated,
    isSubscriptionExpired,
    dashboardData,
    showGetStarted
  };
};

export default connect(mapStateToProps, {
  setGetStartedShow
})(Home);
