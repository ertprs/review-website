import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";
import GoogleReviews from "./Google";
import FacebookReviews from "./Facebook";
import TrustpilotReviews from "./Trustpilot";
import TrustedshopReviews from "./Trustedshop";
import Paper from '@material-ui/core/Paper/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    background: "#fff",
    marginTop:"-12px"
    // backgroundColor: theme.palette.background.paper
  }
});

class ReviewsContainer extends React.Component {
  state = {
    selectedTab: 0
  };

  handleChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  scrollToTop = ()=>{
    window.scrollTo(0,0);
  }

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={selectedTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.flexContainer}
          >
            <Tab label="Google reviews" {...a11yProps(0)} />
            <Tab label="Facebook reviews" {...a11yProps(1)} />
            <Tab label="TrustedShop reviews" {...a11yProps(2)} />
            <Tab label="Trustpilot reviews" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTab} index={0}>
          <GoogleReviews />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <FacebookReviews />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <TrustedshopReviews />
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <TrustpilotReviews scrollToTop={this.scrollToTop}/>
        </TabPanel>
      </div>
    );
  }
}

export default withStyles(styles)(ReviewsContainer);
