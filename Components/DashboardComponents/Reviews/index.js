import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";
import _get from "lodash/get";
import _groupBy from "lodash/groupBy";
import { connect } from "react-redux";
import CommonReviewTabPanel from "./CommonReviewTabPanel";
import { isValidArray } from "../../../utility/commonFunctions";

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
    marginTop: "-12px"
    // backgroundColor: theme.palette.background.paper
  }
});

class ReviewsContainer extends React.Component {
  state = {
    selectedTab: _get(this.props, "selectedTab", 0)
  };

  handleTabChange = (event, selectedTab, item) => {
    this.setState({ selectedTab });
  };

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }

  getUniqueSocialMediaIds = () => {
    const socialArray = _get(this.props, "socialArray", []);
    if (isValidArray(socialArray)) {
      let socialArrayGroupedByKeys = _groupBy(
        socialArray,
        "social_media_app_id"
      );
      if (socialArrayGroupedByKeys) {
        let uniqueSocialKeys = Object.keys(socialArrayGroupedByKeys);
        return uniqueSocialKeys;
      }
    }
    return [];
  };

  generateTabsDynamically = () => {
    const uniqueSocialMediaKeysArray = this.getUniqueSocialMediaIds();
    const reviewPlatforms = _get(this.props, "reviewPlatforms", {});
    let output = [];
    if (isValidArray(uniqueSocialMediaKeysArray)) {
      output = uniqueSocialMediaKeysArray.map((item, index) => {
        let tabLabel = _get(reviewPlatforms, Number(item) || "", "");
        return <Tab label={tabLabel} {...a11yProps(index)} id={item} />;
      });
    }
    return output;
  };

  generateTabPanelsDynamically = () => {
    const { selectedTab } = this.state;
    const uniqueSocialMediaKeysArray = this.getUniqueSocialMediaIds();
    let output = [];
    if (isValidArray(uniqueSocialMediaKeysArray)) {
      output = uniqueSocialMediaKeysArray.map((item, index) => {
        return (
          <TabPanel value={selectedTab} index={index}>
            <CommonReviewTabPanel socialMediaAppId={Number(item) || item} />
          </TabPanel>
        );
      });
    }
    return output;
  };

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.flexContainer}
          >
            {this.generateTabsDynamically()}
          </Tabs>
        </AppBar>
        {this.generateTabPanelsDynamically()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const socialArray = _get(
    state,
    "auth.logIn.userProfile.business_profile.social"
  );
  const reviewPlatforms = _get(
    state,
    "dashboardData.review_platforms.data",
    {}
  );
  return { socialArray, reviewPlatforms };
};

export default connect(mapStateToProps)(withStyles(styles)(ReviewsContainer));
