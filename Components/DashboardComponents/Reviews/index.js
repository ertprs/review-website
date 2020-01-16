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
import _find from "lodash/find";
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
    let uniqueSocialKeys = [];
    let socialArrayGroupedByKeys = {};
    if (isValidArray(socialArray)) {
      socialArrayGroupedByKeys = _groupBy(socialArray, "social_media_app_id");
      if (socialArrayGroupedByKeys) {
        uniqueSocialKeys = Object.keys(socialArrayGroupedByKeys);
      }
    }
    return {
      uniqueSocialKeys,
      socialArrayGroupedByKeys
    };
  };

  generateTabsDynamically = () => {
    const { reviewPlatforms } = this.props;
    const data = this.getUniqueSocialMediaIds();
    const uniqueSocialKeys = _get(data, "uniqueSocialKeys", []);
    let output = [];
    if (isValidArray(uniqueSocialKeys)) {
      output = uniqueSocialKeys.map((item, index) => {
        let tabLabel = _get(reviewPlatforms, Number(item) || "", "");
        return <Tab label={tabLabel} {...a11yProps(index)} id={item} />;
      });
    }
    return output;
  };

  generateTabPanelsDynamically = () => {
    const { selectedTab } = this.state;
    const { reviewPlatforms } = this.props;
    const data = this.getUniqueSocialMediaIds();
    const uniqueSocialKeys = _get(data, "uniqueSocialKeys", []);
    const socialArrayGroupedByKeys = _get(data, "socialArrayGroupedByKeys", {});
    let output = [];
    if (isValidArray(uniqueSocialKeys)) {
      output = uniqueSocialKeys.map((item, index) => {
        let dropDownData = [];
        let platformPlacesArray = socialArrayGroupedByKeys[item];
        dropDownData = (platformPlacesArray || []).map(place => {
          return {
            label: _get(place, "profile_name", ""),
            value: _get(place, "id", ""),
            isPrimary: _get(place, "is_primary", null)
          };
        });
        let primaryPlatform = _find(dropDownData, ["isPrimary", 1]);
        if (!primaryPlatform) {
          if (isValidArray(dropDownData)) {
            primaryPlatform = dropDownData[0];
          }
        }
        return (
          <TabPanel value={selectedTab} index={index}>
            <CommonReviewTabPanel
              dropDownData={dropDownData}
              reviewsPlatforms={reviewPlatforms}
              socialMediaAppId={Number(item) || item}
              primaryPlatform={primaryPlatform}
            />
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
  const { auth, dashboardData } = state;
  const socialArray = _get(auth, "logIn.userProfile.business_profile.social");
  const reviewPlatforms = _get(dashboardData, "review_platforms.data", {});
  return { socialArray, reviewPlatforms };
};

export default connect(mapStateToProps)(withStyles(styles)(ReviewsContainer));
