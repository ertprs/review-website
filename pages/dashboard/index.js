import React, { useEffect } from "react";
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
import {
  MainListItems,
  SecondaryListItems,
  DashboardLogo
} from "../../Components/MaterialComponents/listItems";
import { logOut } from "../../store/actions/authActions";
import { upgradeToPremium } from "../../store/actions/dashboardActions";
import { connect } from "react-redux";
import Router from "next/router";
import Snackbar from "../../Components/Widgets/Snackbar";
import _get from "lodash/get";
import getSubscriptionPlan from "../../utility/getSubscriptionPlan";
import dynamic from "next/dynamic";

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

// import Home from "../../Components/DashboardComponents/Home/Home";
// import GetStarted from "../../Components/DashboardComponents/GetStarted/GetStarted";
// import GetReviews from "../../Components/DashboardComponents/GetReviews/GetReviews";
// import Reviews from "../../Components/DashboardComponents/Reviews";
// import InvitationHistory from "../../Components/DashboardComponents/InvitationHistory";
// import WidgetsShowCase from "../../Components/DashboardComponents/WidgetsShowCase/WidgetsShowCase";

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
  const [open, setOpen] = React.useState(false);
  const [stepToRender, setStepToRender] = React.useState(0);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarVariant, setSnackbarVariant] = React.useState("success");
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const { upgradeToPremiumRes } = props;
  useEffect(() => {
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
    setStepToRender(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const changeStepToRender = step => {
    console.log(step, "step");
    setStepToRender(step);
  };

  const renderAppropriateComponent = () => {
    if (stepToRender === 0) {
      return <GetStarted changeStepToRender={changeStepToRender} />;
    } else if (stepToRender === 1) {
      return <Home />;
    } else if (stepToRender === 2) {
      return <Reviews />;
    } else if (stepToRender === 3) {
      return <GetReviews />;
    } else if (stepToRender === 4) {
      return <InvitationHistory />;
    } else if (stepToRender === 5) {
      return <WidgetsShowCase />;
    }
  };

  const handleLogout = () => {
    setShowSnackbar(true);
    setSnackbarVariant("success");
    setSnackbarMsg("Logout Successfully!");
    props.logOut();
    Router.push("/");
  };

  let userName = "";
  if (_get(props, "userName", "").length > 0) {
    let nameAfterSplit = _get(props, "userName", "").split(" ");
    if (nameAfterSplit.length > 0) {
      userName = nameAfterSplit[0];
    }
  }
  let getStartedHide = false;
  let homeDisabled = false;
  let menuItemsDisabled = false;
  if (
    _get(props, "placeId", "") !== "" ||
    _get(props, "placeLocated", "false")
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

  if (_get(props, "activation_required", false)) {
    if (_get(props, "userActivated", false)) {
      menuItemsDisabled = false;
    } else if (_get(props, "userActivated", false) === false) {
      menuItemsDisabled = true;
    }
  }

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

  return (
    <div className={classes.root}>
      <CssBaseline />
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
          <IconButton
            color="inherit"
            onClick={handleLogout}
            style={{ color: "#fff" }}
          >
            <LogoutIcon />
          </IconButton>
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

const mapStateToProps = state => {
  const { auth, dashboardData } = state;
  const authorized = _get(auth, "logIn.authorized", false);
  const loginType = _get(auth, "logIn.loginType", 0);
  const userName = _get(auth, "logIn.userProfile.name", "");
  const userEmail = _get(auth, "logIn.userProfile.email", "");
  const userPhone = _get(auth, "logIn.userProfile.phone", "");
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
    upgradeToPremiumIsLoading
  };
};

export default connect(
  mapStateToProps,
  { logOut, upgradeToPremium }
)(Dashboard);
