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
import {
  MainListItems,
  SecondaryListItems
} from "../../Components/MaterialComponents/listItems";
import Home from "../../Components/DashboardComponents/Home/Home";
import PlacesAutoComplete from "../../Components/Widgets/PlacesAutoComplete/PlacesAutoComplete";
import GetStarted from "../../Components/DashboardComponents/GetStarted/GetStarted";
import GetReviews from "../../Components/DashboardComponents/GetReviews/GetReviews";
import Reviews from "../../Components/DashboardComponents/Reviews";
import WidgetsShowCase from "../../Components/DashboardComponents/WidgetsShowCase/WidgetsShowCase";
import { logOut } from "../../store/actions/authActions";
import { connect } from "react-redux";
import Router from "next/router";
import Snackbar from "../../Components/Widgets/Snackbar";
import _get from "lodash/get";

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
  const [open, setOpen] = React.useState(true);
  const [stepToRender, setStepToRender] = React.useState(0);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  useEffect(() => {
    const loginType = _get(props, "loginType", 0);
    if (loginType !== 4) {
      Router.push("/");
    }
  }, []);

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

  const renderAppropriateComponent = () => {
    if (stepToRender === 0) {
      return <Home />;
    } else if (stepToRender === 1) {
      return <Reviews />;
    } else if (stepToRender === 2) {
      return <GetReviews />;
    } else if (stepToRender === 3) {
      return <GetStarted />;
    } else if (stepToRender === 4) {
      return <WidgetsShowCase />;
    }
  };

  const handleLogout = () => {
    setShowSnackbar(true);
    props.logOut();
    Router.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
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
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Welcome Arturs !
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
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
            handleMainListItemClick={handleMenuItemClicked}
            stepToRender={stepToRender}
          />
        </List>
        <Divider />
        <List>
          <SecondaryListItems />
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
        variant="success"
        handleClose={() => setShowSnackbar(false)}
        message="Logout Successfully!"
      />
    </div>
  );
}

const mapStateToProps = state => {
  const { auth } = state;
  const authorized = _get(auth, "logIn.authorized", false);
  const loginType = _get(auth, "logIn.loginType", 0);
  return { authorized, loginType };
};

export default connect(
  mapStateToProps,
  { logOut }
)(Dashboard);
