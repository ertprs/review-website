import React, { useEffect, useState } from "react";
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
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReviewsPusher from "../../Components/ReviewsPusher/ReviewsPusher";
import {
  MainListItems,
  SecondaryListItems,
  DashboardLogo
} from "../../Components/MaterialComponents/listItems";
import { logOut } from "../../store/actions/authActions";
import {
  upgradeToPremium,
  fetchReviews,
  getThirdPartyReviews
} from "../../store/actions/dashboardActions";
import { connect } from "react-redux";
import Router from "next/router";
import { useRouter } from "next/router";
import Snackbar from "../../Components/Widgets/Snackbar";
import _get from "lodash/get";
import getSubscriptionPlan from "../../utility/getSubscriptionPlan";
import dynamic from "next/dynamic";
import isAuthenticatedBusiness from "../../utility/isAuthenticated/isAuthenticatedBusiness";
import Tooltip from "@material-ui/core/Tooltip";
import nextCookie from "next-cookies";
import _findKey from "lodash/findKey";

//Dynamic imported components
const Home = dynamic(() =>
  import("../../Components/DashboardComponents/Home/Home")
);
const GetStarted = dynamic(
  () => import("../../Components/DashboardComponents/GetStarted/GetStarted"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const GetReviews = dynamic(
  () => import("../../Components/DashboardComponents/GetReviews/GetReviews"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const Reviews = dynamic(
  () => import("../../Components/DashboardComponents/Reviews"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const InvitationHistory = dynamic(
  () => import("../../Components/DashboardComponents/InvitationHistory"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
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
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);

const UserProfile = dynamic(
  () => import("../../Components/DashboardComponents/UserProfile"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
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
  const router = useRouter();

  const { pathname, query } = router;

  const [open, setOpen] = React.useState(false);
  const [stepToRender, setStepToRender] = React.useState(
    (props.pLocated === false || props.pLocated === undefined) &&
      (props.pId === undefined || props.pId === "")
      ? 0
      : 1
  );
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarVariant, setSnackbarVariant] = React.useState("success");
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const { upgradeToPremiumRes, placeLocated, fetchReviews, token } = props;
  const initState = {};
  const [parentState, setParentState] = useState(initState);

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
  if (
    _get(props, "placeId", "") !== "" ||
    _get(props, "placeLocated", false) ||
    props.pId !== ""
  ) {
    getStartedHide = true;
    homeDisabled = false;
    menuItemsDisabled = false;
  } else if (
    _get(props, "placeId", "") === "" ||
    !_get(props, "placeLocated", false)
  ) {
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

  useEffect(() => {
    if (props.queryStep) {
      if (props.queryStep.v) {
        // console.log(props.queryStep.v, "QUERY_STEP");
        const stepQuery = props.queryStep.v;
        const stepKey = _findKey(dashboardSteps, { name: stepQuery });
        // console.log(Number(stepKey));
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const changeStepToRender = index => {
    const step = dashboardSteps[index].name;
    // Current URL is "/"
    const href = `/dashboard?v=${step}`;
    const as = `/dashboard/${step}`;
    Router.push(href, as, { shallow: true });
    console.log(step, "step");
    setStepToRender(index);
  };

  const dashboardSteps = {
    0: {
      name: "getStarted",
      componentToRender: <GetStarted changeStepToRender={changeStepToRender} />
    },
    1: {
      name: "home",
      componentToRender: <Home changeStepToRender={changeStepToRender} />
    },
    2: {
      name: "reviews",
      componentToRender: <Reviews />
    },
    3: {
      name: "getReviews",
      componentToRender: <GetReviews changeStepToRender={changeStepToRender} />
    },
    4: {
      name: "invitationHistory",
      componentToRender: <InvitationHistory />
    },
    5: {
      name: "widgets",
      componentToRender: <WidgetsShowCase />
    },
    6: {
      name: "userProfile",
      componentToRender: <UserProfile />
    }
  };

  const renderAppropriateComponent = pId => {
    const ComponentToRender = dashboardSteps[stepToRender].componentToRender;
    return ComponentToRender;
    // if (stepToRender === 0) {
    // return <GetStarted changeStepToRender={changeStepToRender} />;
    // } else if (stepToRender === 1) {
    // return <Home changeStepToRender={changeStepToRender} />;
    // } else if (stepToRender === 2) {
    // return <Reviews />;
    // } else if (stepToRender === 3) {
    // return <GetReviews changeStepToRender={changeStepToRender} />;
    // } else if (stepToRender === 4) {
    // return <InvitationHistory />;
    // } else if (stepToRender === 5) {
    // return <WidgetsShowCase />;
    // }
  };

  const handleLogout = () => {
    setShowSnackbar(true);
    setSnackbarVariant("success");
    setSnackbarMsg("Logout Successfully!");
    // Router.push("/");
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

  const { domainId, getThirdPartyReviews } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* {placeLocated &&
      props.domain !== "" &&
      props.reviews.length === 0 && */}
      {props.isReviewsPusherConnected === true ? (
        <ReviewsPusher
          domain={props.domain}
          onChildStateChange={newState => {
            setParentState({ ...parentState, ...newState });
            const fetchSuccess = _get(newState, "response.success", false);
            const reviewsCount = _get(newState, "response.reviewCount", 0);
            if (reviewsCount > 0 && fetchSuccess) {
              fetchReviews(token);
            }
          }}
          onAggregatorDataChange={data => {
            let socialAppId = _get(data, "response.socialAppId", 0);
            getThirdPartyReviews(socialAppId, domainId);
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
          />
        </List>
        <Divider />
        <List>
          <SecondaryListItems
            subsriptionPlan={getSubscriptionPlan(
              _get(props, "subsriptionPlan", 0)
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {renderAppropriateComponent(props.pId)}
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
  const { placeId, placeLocated } = nextCookie(ctx);
  return { pId: placeId, pLocated: placeLocated, queryStep };
};

const mapStateToProps = state => {
  const { auth, dashboardData } = state;
  const authorized = _get(auth, "logIn.authorized", false);
  const loginType = _get(auth, "logIn.loginType", 0);
  const userName = _get(auth, "logIn.userProfile.name", "");
  const userEmail = _get(auth, "logIn.userProfile.email", "");
  const userPhone = _get(auth, "logIn.userProfile.phone", "");
  const domain = _get(auth, "logIn.userProfile.business_profile.domain", "");
  const reviews = _get(dashboardData, "reviews.data.reviews", []);
  const token = _get(auth, "logIn.token", "");
  const domainId = _get(auth, "logIn.userProfile.business_profile.domainId", 0);
  const activation_required = _get(
    auth,
    "logIn.userProfile.activation_required",
    false
  );
  const subsriptionPlan = _get(
    auth,
    "logIn.userProfile.subscription.plan_type_id",
    0
  );
  const userActivated = _get(auth, "userActivated", false);
  const businessProfile = _get(auth, "logIn.userProfile.business_profile", {});
  const placeId = _get(businessProfile, "google_places.placeId", "");
  const placeLocated = _get(dashboardData, "locatePlace.success", false);
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
  return {
    authorized,
    loginType,
    userName,
    userEmail,
    userPhone,
    activation_required,
    subsriptionPlan,
    userActivated,
    placeId,
    placeLocated,
    upgradeToPremiumRes,
    upgradeToPremiumIsLoading,
    domain,
    reviews,
    token,
    isSubscriptionExpired,
    isReviewsPusherConnected,
    domainId
  };
};

export default connect(mapStateToProps, {
  logOut,
  upgradeToPremium,
  fetchReviews,
  getThirdPartyReviews
})(Dashboard);
