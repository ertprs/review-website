import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import ReviewsPusher from "../../Components/ReviewsPusher/ReviewsPusher";
import NotificationPusher from "../../Components/NotificationPusherComponent/NotificationPusherComponent";
import {
  MainListItems,
  SecondaryListItems,
  DashboardLogo
} from "../../Components/MaterialComponents/listItems";
//? Actions
import { logOut } from "../../store/actions/authActions";
import {
  upgradeToPremium,
  fetchReviews,
  setInvitationQuota,
  setReviewsAfterLogin,
  setReviewsPusherConnect
} from "../../store/actions/dashboardActions";
import Snackbar from "../../Components/Widgets/Snackbar";
//? Lodash
import _get from "lodash/get";
import _findKey from "lodash/findKey";
//? Utilities
import getSubscriptionPlan from "../../utility/getSubscriptionPlan";
import { isValidArray } from "../../utility/commonFunctions";
import isAuthenticatedBusiness from "../../utility/isAuthenticated/isAuthenticatedBusiness";
//? Dynamic imported components
const Home = dynamic(() =>
  import("../../Components/DashboardComponents/Home/Home")
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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const { upgradeToPremiumRes, isFirstTimeLogin } = props;
  const [open, setOpen] = useState(true);
  const [stepToRender, setStepToRender] = useState(isFirstTimeLogin ? 0 : 1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState("success");
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [reviewsSelectedTab, setReviewsSelectedTab] = useState(0);
  const initState = {};

  let userName = "";
  if (_get(props, "userName", "")) {
    if (_get(props, "userName", "").length > 0) {
      let nameAfterSplit = _get(props, "userName", "").split(" ");
      if (nameAfterSplit.length > 0) {
        userName = nameAfterSplit[0];
      }
    }
  }
  let getStartedHide = false;
  let homeDisabled = false;
  let menuItemsDisabled = false;
  let getStartedDisabled = false;
  if (!isFirstTimeLogin) {
    getStartedHide = true;
    homeDisabled = false;
    menuItemsDisabled = false;
  } else if (isFirstTimeLogin) {
    getStartedHide = false;
    homeDisabled = true;
    menuItemsDisabled = true;
  }
  if (_get(props, "isSubscriptionExpired", false) === true) {
    getStartedHide = false;
    homeDisabled = false;
    menuItemsDisabled = true;
    getStartedDisabled = true;
  } else if (_get(props, "activation_required", false)) {
    if (_get(props, "userActivated", false)) {
      menuItemsDisabled = false;
    } else if (_get(props, "userActivated", false) === false) {
      menuItemsDisabled = true;
    }
  }

  const changePageWithUrl = () => {
    let url = window.location.href;
    let urlSplit = url.split("/");
    let stepQuery = urlSplit[urlSplit.length - 1];
    if (stepQuery) {
      const stepKey = _findKey(dashboardSteps, { name: stepQuery });
      if (stepKey) {
        if (!menuItemsDisabled && !homeDisabled && !getStartedDisabled) {
          // Current URL is "/"
          const href = `/dashboard?v=${stepQuery}`;
          const as = `/dashboard/${stepQuery}`;
          Router.push(href, as, { shallow: true });
          setStepToRender(Number(stepKey));
        }
      } else {
        window.location.href = "/dashboard/home";
      }
    } else {
      window.location.href = "/dashboard/home";
    }
  };

  useEffect(() => {
    if (props.queryStep) {
      if (props.queryStep.v) {
        const stepQuery = props.queryStep.v;
        const stepKey = _findKey(dashboardSteps, { name: stepQuery });
        if (stepKey) {
          if (!menuItemsDisabled && !homeDisabled && !getStartedDisabled) {
            // Current URL is "/"
            const href = `/dashboard?v=${stepQuery}`;
            const as = `/dashboard/${stepQuery}`;
            Router.push(href, as, { shallow: true });
            setStepToRender(Number(stepKey));
          }
        } else {
          window.location.href = "/dashboard/home";
        }
      }
    }
    if (upgradeToPremiumRes === true) {
      setShowSnackbar(true);
      setSnackbarVariant("success");
      setSnackbarMsg("Request Sent Successfully!");
    } else if (upgradeToPremiumRes === false) {
      setShowSnackbar(true);
      setSnackbarVariant("success");
      setSnackbarMsg("Request Sent Successfully!");
    }
  }, [upgradeToPremiumRes]);

  useEffect(() => {
    window.addEventListener("popstate", changePageWithUrl);
    return () => {
      window.removeEventListener("popstate", changePageWithUrl);
    };
  }, []);

  useEffect(() => {
    const { setReviewsPusherConnect } = props;
    //? this will connect the pusher when someone reloads the dashboard, so that we can again listen for the keys and fetch reviews accordingly
    setReviewsPusherConnect(true);
    //? this will fetch reviews of all platforms that exist inside social array
    const socialArray = _get(props, "socialArray", []);
    const reviews = _get(props, "reviews", {});
    if (isValidArray(socialArray)) {
      if (reviews) {
        if (Object.keys(reviews).length === 0) {
          //?need to make sure that this is not called after login
          props.setReviewsAfterLogin(socialArray);
        }
      }
    }
    //? **********************************************************************************
  }, []);

  const handleMenuItemClicked = index => {
    const step = dashboardSteps[index].name;
    // Current URL is "/"
    const href = `/dashboard?v=${step}`;
    const as = `/dashboard/${step}`;
    Router.push(href, as, { shallow: true });
    setStepToRender(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeStepToRender = index => {
    const step = dashboardSteps[index].name;
    // Current URL is "/"
    const href = `/dashboard?v=${step}`;
    const as = `/dashboard/${step}`;
    Router.push(href, as, { shallow: true });
    setStepToRender(index);
  };

  const mainContainer = useRef(null);

  const scrollToTopOfThePage = () => {
    if (mainContainer) {
      if (mainContainer.current) {
        if (mainContainer.current.scrollTop) {
          mainContainer.current.scrollTop = 0;
        }
      }
    }
  };

  const dashboardSteps = {
    0: {
      name: "getStarted",
      componentToRender: (
        <GetStarted
          changeStepToRender={changeStepToRender}
          scrollToTopOfThePage={scrollToTopOfThePage}
        />
      )
    },
    1: {
      name: "home",
      componentToRender: (
        <Home
          changeStepToRender={changeStepToRender}
          navigateToReviews={tabIndex => {
            setReviewsSelectedTab(tabIndex);
            handleMenuItemClicked(2);
          }}
          scrollToTopOfThePage={scrollToTopOfThePage}
        />
      )
    },
    2: {
      name: "reviews",
      componentToRender: (
        <Reviews
          selectedTab={reviewsSelectedTab}
          scrollToTopOfThePage={scrollToTopOfThePage}
        />
      )
    },
    3: {
      name: "getReviews",
      componentToRender: (
        <GetReviews
          navigateToCampaignManagement={() => handleMenuItemClicked(4)}
          changeStepToRender={changeStepToRender}
          scrollToTopOfThePage={scrollToTopOfThePage}
        />
      )
    },
    4: {
      name: "whatsAppInvitation",
      componentToRender: (
        <WhatsAppInvitation scrollToTopOfThePage={scrollToTopOfThePage} />
      )
    },
    5: {
      name: "campaignManagement",
      componentToRender: (
        <CampaignManagement
          navigateToCreateCampaign={() => handleMenuItemClicked(3)}
          scrollToTopOfThePage={scrollToTopOfThePage}
        />
      )
    },
    6: {
      name: "invitationHistory",
      componentToRender: (
        <InvitationHistory scrollToTopOfThePage={scrollToTopOfThePage} />
      )
    },
    7: {
      name: "widgets",
      componentToRender: (
        <WidgetsShowCase scrollToTopOfThePage={scrollToTopOfThePage} />
      )
    },
    8: {
      name: "reviewUrl",
      componentToRender: (
        <ReviewUrl scrollToTopOfThePage={scrollToTopOfThePage} />
      )
    },

    9: {
      name: "userProfile",
      componentToRender: (
        <UserProfile scrollToTopOfThePage={scrollToTopOfThePage} />
      )
    }
  };

  const renderAppropriateComponent = () => {
    const ComponentToRender = dashboardSteps[stepToRender].componentToRender;
    return ComponentToRender;
  };

  const handleLogout = () => {
    setShowSnackbar(true);
    setSnackbarVariant("success");
    setSnackbarMsg("Logout Successfully!");
    props.logOut();
  };

  const clickToUpgradeHandler = () => {
    const { upgradeToPremium, userName, userEmail, userPhone } = props;
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

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const { domainId, subscriptionId, setInvitationQuota, domain } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      {subscriptionId ? (
        <NotificationPusher
          subscriptionId={subscriptionId}
          onCampaignInvitesDataChange={data => {
            setInvitationQuota({ ...data });
          }}
        />
      ) : null}
      {props.isReviewsPusherConnected === true ? (
        <ReviewsPusher
          domain={domain}
          onAggregatorDataChange={data => {
            let socialAppId = _get(data, "response.socialAppId", "");
            let profileId = _get(data, "response.profileId", "");
            props.fetchReviews(socialAppId, profileId, domainId);
          }}
        />
      ) : null}
      <AppBar
        style={{ background: "#303030" }}
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
            style={{ color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            style={{ color: "#fff" }}
          >
            Welcome {userName || ""} !
          </Typography>
          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={handleLogout}
              style={{ color: "#fff" }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems
            getStartedDisabled={getStartedDisabled}
            getStartedHide={getStartedHide}
            homeDisabled={homeDisabled}
            menuItemDisabled={menuItemsDisabled}
            handleMainListItemClick={handleMenuItemClicked}
            stepToRender={stepToRender}
            domain={domain || "google.com"}
          />
        </List>
        <Divider />
        <List>
          <SecondaryListItems
            subscriptionPlan={getSubscriptionPlan(
              _get(props, "subscriptionPlan", 0)
            )}
            handleClick={clickToUpgradeHandler}
            isLoading={props.upgradeToPremiumIsLoading || false}
          />
        </List>
        <Divider />
        <List>
          <DashboardLogo />
        </List>
      </Drawer>
      <main className={classes.content} ref={mainContainer}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {renderAppropriateComponent()}
        </Container>
      </main>
      <Snackbar
        open={showSnackbar}
        variant={snackbarVariant}
        handleClose={handleSnackbarClose}
        message={snackbarMsg}
      />
    </div>
  );
}

Dashboard.getInitialProps = async ctx => {
  // Check user's session
  const queryStep = ctx.query;
  isAuthenticatedBusiness(ctx);
  return { queryStep };
};

const mapStateToProps = state => {
  const { auth, dashboardData } = state;
  const userName = _get(auth, "logIn.userProfile.name", "");
  const userEmail = _get(auth, "logIn.userProfile.email", "");
  const userPhone = _get(auth, "logIn.userProfile.phone", "");
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
  const upgradeToPremiumRes = _get(
    dashboardData,
    "upgradePremium.success",
    "undefined"
  );
  const upgradeToPremiumIsLoading = _get(
    dashboardData,
    "upgradePremium.isLoading",
    false
  );
  const isSubscriptionExpired = _get(auth, "isSubscriptionExpired", false);
  const isReviewsPusherConnected = _get(
    dashboardData,
    "isReviewsPusherConnected",
    "undefined"
  );
  const subscriptionId = _get(auth, "logIn.userProfile.subscription.id", "");
  return {
    userName,
    userEmail,
    userPhone,
    activation_required,
    subscriptionPlan,
    userActivated,
    upgradeToPremiumRes,
    upgradeToPremiumIsLoading,
    domain,
    isSubscriptionExpired,
    isReviewsPusherConnected,
    domainId,
    subscriptionId,
    socialArray,
    reviews,
    isFirstTimeLogin
  };
};

export default connect(mapStateToProps, {
  logOut,
  upgradeToPremium,
  fetchReviews,
  setInvitationQuota,
  setReviewsAfterLogin,
  setReviewsPusherConnect
})(Dashboard);
