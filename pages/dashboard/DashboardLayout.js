import React from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import {
  MainListItems,
  SecondaryListItems,
  DashboardLogo
} from "../../Components/MaterialComponents/listItems";
import { getSubscriptionPlan } from "../../utility/commonFunctions";
import { upgradeToPremium } from "../../store/actions/dashboardActions";
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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

const DashboardLayout = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    userName,
    handleLogout,
    open,
    handleDrawerClose,
    upgradeToPremium,
    subscriptionPlan,
    upgradeToPremiumIsLoading,
    domain,
    getStartedDisabled,
    getStartedHide,
    homeDisabled,
    menuItemsDisabled,
    handleMenuItemClicked,
    stepToRender,
    handleDrawerOpen
  } = props;
  return (
    <>
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
            subscriptionPlan={getSubscriptionPlan(subscriptionPlan)}
            handleClick={upgradeToPremium}
            isLoading={upgradeToPremiumIsLoading || false}
          />
        </List>
        <Divider />
        <List>
          <DashboardLogo />
        </List>
      </Drawer>
      <main className={classes.content} ref={ref}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </>
  );
});

export default connect(null, { upgradeToPremium })(DashboardLayout);
