import React, { createRef, Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import dynamic from "next/dynamic";
import CssBaseline from "@material-ui/core/CssBaseline";
import Slide from "@material-ui/core/Slide";
import ReviewsPusher from "../../Components/ReviewsPusher/ReviewsPusher";
import NotificationPusher from "../../Components/NotificationPusherComponent/NotificationPusherComponent";
import Snackbar from "../../Components/Widgets/Snackbar";
//? Actions
import {
  logOut,
  setInvitationQuota,
  showWhatsAppNotificationBar
} from "../../store/actions/authActions";
import {
  fetchReviews,
  setReviewsAfterLogin,
  setReviewsPusherConnect
} from "../../store/actions/dashboardActions";
//? Lodash
import _get from "lodash/get";
import _findKey from "lodash/findKey";
//? Utilities
import { isValidArray } from "../../utility/commonFunctions";
import isAuthenticatedBusiness from "../../utility/isAuthenticated/isAuthenticatedBusiness";
//? Dynamic imported components
const DashboardLayout = dynamic(() => import("./DashboardLayout"));
const NotificationBar = dynamic(() =>
  import(
    "../../Components/DashboardComponents/WhatsappInvitation/ReloginNotificationBar"
  )
);
const Home = dynamic(
  () => import("../../Components/DashboardComponents/Home"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const GetStarted = dynamic(
  () => import("../../Components/DashboardComponents/GetStarted/GetStarted"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const GetReviews = dynamic(
  () => import("../../Components/DashboardComponents/GetReviews/GetReviews"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const Reviews = dynamic(
  () => import("../../Components/DashboardComponents/Reviews"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const InvitationHistory = dynamic(
  () => import("../../Components/DashboardComponents/InvitationHistory"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const WidgetsShowCase = dynamic(
  () =>
    import(
      "../../Components/DashboardComponents/WidgetsShowCase/WidgetsShowCase"
    ),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const UserProfile = dynamic(
  () => import("../../Components/DashboardComponents/UserProfile"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const CampaignManagement = dynamic(
  () => import("../../Components/DashboardComponents/CampaignManagement"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const ReviewUrl = dynamic(
  () => import("../../Components/DashboardComponents/SmartUrl"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const WhatsAppInvitation = dynamic(
  () => import("../../Components/DashboardComponents/WhatsappInvitation"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.mainContainer = createRef(null);
    this.getStartedHide = false;
    this.homeDisabled = false;
    this.menuItemsDisabled = false;
    this.getStartedDisabled = false;
    this.state = {
      openDrawer: true,
      stepToRender: _get(this.props, "isFirstTimeLogin", false) ? 0 : 1,
      showSnackbar: false,
      snackbarVariant: "success",
      snackbarMsg: "",
      reviewsSelectedTab: 0,
      getStartedHide: false,
      homeDisabled: false,
      menuItemsDisabled: false,
      getStartedDisabled: false
    };
  }

  scrollToTopOfThePage = () => {
    if (this.mainContainer) {
      if (this.mainContainer.current) {
        if (this.mainContainer.current.scrollTop) {
          this.mainContainer.current.scrollTop = 0;
        }
      }
    }
  };

  changeStepToRender = index => {
    const step = this.dashboardSteps[index].name;
    const href = `/dashboard?v=${step}`;
    const as = `/dashboard/${step}`;
    Router.push(href, as, { shallow: true });
    this.setState({ stepToRender: index });
  };

  dashboardSteps = {
    0: {
      name: "getStarted",
      componentToRender: (
        <GetStarted
          changeStepToRender={this.changeStepToRender}
          scrollToTopOfThePage={this.scrollToTopOfThePage}
        />
      )
    },
    1: {
      name: "home",
      componentToRender: (
        <Home
          changeStepToRender={this.changeStepToRender}
          navigateToReviews={tabIndex => {
            this.setState({ reviewsSelectedTab: tabIndex });
            handleMenuItemClicked(2);
          }}
          scrollToTopOfThePage={this.scrollToTopOfThePage}
        />
      )
    },
    2: {
      name: "reviews",
      componentToRender: (
        <Reviews
          selectedTab={_get(this.state, "reviewsSelectedTab", 0)}
          scrollToTopOfThePage={this.scrollToTopOfThePage}
        />
      )
    },
    3: {
      name: "getReviews",
      componentToRender: (
        <GetReviews
          navigateToCampaignManagement={() => this.handleMenuItemClicked(4)}
          changeStepToRender={this.changeStepToRender}
          scrollToTopOfThePage={this.scrollToTopOfThePage}
        />
      )
    },
    4: {
      name: "whatsAppInvitation",
      componentToRender: (
        <WhatsAppInvitation scrollToTopOfThePage={this.scrollToTopOfThePage} />
      )
    },
    5: {
      name: "campaignManagement",
      componentToRender: (
        <CampaignManagement
          navigateToCreateCampaign={() => this.handleMenuItemClicked(3)}
          scrollToTopOfThePage={this.scrollToTopOfThePage}
        />
      )
    },
    6: {
      name: "invitationHistory",
      componentToRender: (
        <InvitationHistory scrollToTopOfThePage={this.scrollToTopOfThePage} />
      )
    },
    7: {
      name: "widgets",
      componentToRender: (
        <WidgetsShowCase scrollToTopOfThePage={this.scrollToTopOfThePage} />
      )
    },
    8: {
      name: "reviewUrl",
      componentToRender: (
        <ReviewUrl scrollToTopOfThePage={this.scrollToTopOfThePage} />
      )
    },

    9: {
      name: "userProfile",
      componentToRender: (
        <UserProfile scrollToTopOfThePage={this.scrollToTopOfThePage} />
      )
    }
  };

  componentDidMount() {
    const {
      setReviewsPusherConnect,
      setReviewsAfterLogin,
      socialArray,
      reviews
    } = this.props;
    window.addEventListener("popstate", this.changePageWithUrl);
    //? this will connect the pusher when someone reloads the dashboard, so that we can again listen for the keys and fetch reviews accordingly
    setReviewsPusherConnect(true);
    //? ************this will fetch reviews of all platforms that exist inside social array***********
    if (isValidArray(socialArray)) {
      if (reviews) {
        if (Object.keys(reviews).length === 0) {
          setReviewsAfterLogin(socialArray);
        }
      }
    }
    //? ***********************************************************************************************
    this.setShallowRouting();
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.changePageWithUrl);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      upgradeToPremiumSuccess,
      upgradeToPremiumErrorMsg,
      queryStep
    } = this.props;
    if (upgradeToPremiumSuccess !== prevProps.upgradeToPremiumSuccess) {
      if (upgradeToPremiumSuccess === true) {
        this.setState({
          showSnackbar: true,
          snackbarVariant: "success",
          snackbarMsg: "Request Sent Successfully!"
        });
      } else if (upgradeToPremiumSuccess === false) {
        this.setState({
          showSnackbar: true,
          snackbarVariant: "error",
          snackbarMsg: upgradeToPremiumErrorMsg
        });
      }
    }

    if (queryStep !== prevProps.queryStep) {
      this.setShallowRouting();
    }
  }

  setShallowRouting = () => {
    const { queryStep } = this.props;
    if (queryStep) {
      if (queryStep.v) {
        const stepQuery = queryStep.v;
        const stepKey = _findKey(this.dashboardSteps, { name: stepQuery });
        if (stepKey) {
          if (
            !this.menuItemsDisabled &&
            !this.homeDisabled &&
            !this.getStartedDisabled
          ) {
            const href = `/dashboard?v=${stepQuery}`;
            const as = `/dashboard/${stepQuery}`;
            Router.push(href, as, { shallow: true });
            this.setState({ stepToRender: Number(stepKey) });
          }
        } else {
          window.location.href = "/dashboard/home";
        }
      }
    }
  };

  handleMenuItemClicked = index => {
    const step = this.dashboardSteps[index].name;
    const href = `/dashboard?v=${step}`;
    const as = `/dashboard/${step}`;
    Router.push(href, as, { shallow: true });
    this.setState({ stepToRender: index });
  };

  changePageWithUrl = () => {
    let url = window.location.href;
    let urlSplit = url.split("/");
    let stepQuery = urlSplit[urlSplit.length - 1];
    if (stepQuery) {
      const stepKey = _findKey(this.dashboardSteps, { name: stepQuery });
      if (stepKey) {
        if (
          !this.menuItemsDisabled &&
          !this.homeDisabled &&
          !this.getStartedDisabled
        ) {
          const href = `/dashboard?v=${stepQuery}`;
          const as = `/dashboard/${stepQuery}`;
          Router.push(href, as, { shallow: true });
          this.setState({ stepToRender: Number(stepKey) });
        }
      } else {
        window.location.href = "/dashboard/home";
      }
    } else {
      window.location.href = "/dashboard/home";
    }
  };

  renderAppropriateComponent = () => {
    const { stepToRender } = this.state;
    return this.dashboardSteps[stepToRender].componentToRender;
  };

  handleLogout = () => {
    const { logOut } = this.props;
    this.setState({
      showSnackbar: true,
      snackbarVariant: "success",
      snackbarMsg: "Logout Successfully!"
    });
    logOut();
  };

  notificationPusherHandler = data => {
    const { showWhatsAppNotificationBar, setInvitationQuota } = this.props;
    const { eventType } = data || {};
    switch (eventType) {
      case "invite_stats":
        setInvitationQuota({
          ..._get(data, "invitations", {})
        });
        break;
      case "whatsapp_login_required":
        showWhatsAppNotificationBar(_get(data, "success", false));
        break;
      default:
        console.log("new event", data);
    }
  };

  render() {
    const {
      userName,
      isFirstTimeLogin,
      isSubscriptionExpired,
      activation_required,
      userActivated,
      subscriptionId,
      isReviewsPusherConnected,
      fetchReviews,
      domainId,
      domain,
      subscriptionPlan,
      upgradeToPremiumIsLoading,
      showWhatsAppNotification
    } = this.props;
    const {
      showSnackbar,
      snackbarVariant,
      snackbarMsg,
      openDrawer,
      stepToRender
    } = this.state;
    let updatedUserName = "";
    if (userName) {
      let nameAfterSplit = userName.split(" ");
      if (nameAfterSplit.length > 0) {
        updatedUserName = nameAfterSplit[0];
      }
    }

    //? set menu items show and hide
    if (!isFirstTimeLogin) {
      this.getStartedHide = true;
      this.homeDisabled = false;
      this.menuItemsDisabled = false;
    } else if (isFirstTimeLogin) {
      this.getStartedHide = false;
      this.homeDisabled = true;
      this.menuItemsDisabled = true;
    }
    if (isSubscriptionExpired === true) {
      this.getStartedHide = true;
      this.homeDisabled = false;
      this.menuItemsDisabled = true;
      this.getStartedDisabled = true;
    } else if (activation_required) {
      if (userActivated) {
        this.menuItemsDisabled = false;
      } else if (userActivated === false) {
        this.menuItemsDisabled = true;
      }
    }
    //? *****************************************************/

    return (
      <>
        <div className="dFlex">
          <style jsx>{`
            .dFlex {
              display: flex;
            }
          `}</style>
          <CssBaseline />
          {subscriptionId ? (
            <NotificationPusher
              subscriptionId={subscriptionId}
              onNotificationPusherDataChange={this.notificationPusherHandler}
            />
          ) : null}
          {isReviewsPusherConnected === true ? (
            <ReviewsPusher
              domain={domain}
              onAggregatorDataChange={data => {
                let socialAppId = _get(data, "response.socialAppId", "");
                let profileId = _get(data, "response.profileId", "");
                fetchReviews(socialAppId, profileId, domainId);
              }}
            />
          ) : null}

          <DashboardLayout
            ref={this.mainContainer}
            userName={updatedUserName}
            handleLogout={this.handleLogout}
            open={openDrawer}
            handleDrawerClose={() => {
              this.setState({ openDrawer: false });
            }}
            handleDrawerOpen={() => {
              this.setState({ openDrawer: true });
            }}
            subscriptionPlan={subscriptionPlan}
            upgradeToPremiumIsLoading={upgradeToPremiumIsLoading}
            domain={domain}
            getStartedDisabled={this.getStartedDisabled}
            getStartedHide={this.getStartedHide}
            homeDisabled={this.homeDisabled}
            menuItemsDisabled={this.menuItemsDisabled}
            handleMenuItemClicked={this.handleMenuItemClicked}
            stepToRender={stepToRender}
          >
            {this.renderAppropriateComponent()}
          </DashboardLayout>
          <Snackbar
            open={showSnackbar}
            variant={snackbarVariant}
            handleClose={() => {
              this.setState({ showSnackbar: false });
            }}
            message={snackbarMsg}
          />
        </div>
        {/* <Slide
          direction="up"
          in={showWhatsAppNotification}
          mountOnEnter
          unmountOnExit
        > */}
        {showWhatsAppNotification ? (
          // ? hiding this if we are in whatsApp invitation tab
          stepToRender !== 4 ? (
            <NotificationBar />
          ) : null
        ) : null}
        {/* </Slide> */}
      </>
    );
  }
}

Dashboard.getInitialProps = async ctx => {
  const queryStep = ctx.query;
  isAuthenticatedBusiness(ctx);
  return { queryStep };
};

const mapStateToProps = state => {
  const { auth, dashboardData } = state;
  const userName = _get(auth, "logIn.userProfile.name", "");
  const domain = _get(auth, "logIn.userProfile.business_profile.domain", "");
  const domainId = _get(auth, "logIn.userProfile.business_profile.domainId", 0);
  const isFirstTimeLogin = _get(auth, "logIn.userProfile.isNew", false);
  const socialArray = _get(
    auth,
    "logIn.userProfile.business_profile.social",
    []
  );
  const reviews = _get(dashboardData, "reviews", {});
  const activation_required = _get(
    auth,
    "logIn.userProfile.activation_required",
    false
  );
  const subscriptionPlan = _get(
    auth,
    "logIn.userProfile.subscription.plan_type_id",
    0
  );
  const userActivated = _get(auth, "logIn.userProfile.activated", false);
  const upgradeToPremiumSuccess = _get(
    dashboardData,
    "upgradePremium.success",
    undefined
  );
  const upgradeToPremiumIsLoading = _get(
    dashboardData,
    "upgradePremium.isLoading",
    false
  );
  const upgradeToPremiumErrorMsg = _get(
    dashboardData,
    "upgradePremium.errorMsg",
    "Some Error Occurred!"
  );
  const isSubscriptionExpired = _get(auth, "isSubscriptionExpired", false);
  const isReviewsPusherConnected = _get(
    dashboardData,
    "isReviewsPusherConnected",
    "undefined"
  );
  const subscriptionId = _get(auth, "logIn.userProfile.subscription.id", "");
  const showWhatsAppNotification = _get(
    auth,
    "logIn.userProfile.whatsapp_login_required",
    false
  );
  return {
    userName,
    activation_required,
    subscriptionPlan,
    userActivated,
    upgradeToPremiumSuccess,
    upgradeToPremiumIsLoading,
    upgradeToPremiumErrorMsg,
    domain,
    isSubscriptionExpired,
    isReviewsPusherConnected,
    domainId,
    subscriptionId,
    socialArray,
    reviews,
    isFirstTimeLogin,
    showWhatsAppNotification
  };
};

export default connect(mapStateToProps, {
  logOut,
  fetchReviews,
  setInvitationQuota,
  showWhatsAppNotificationBar,
  setReviewsAfterLogin,
  setReviewsPusherConnect
})(Dashboard);
