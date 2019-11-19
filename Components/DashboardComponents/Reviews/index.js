import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/styles';
import GoogleReviewsDs from "./GoogleReviewsDs";

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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        background:"#fff !important"
        // backgroundColor: theme.palette.background.paper
      }
  });

class ReviewsContainer extends React.Component {

  state = {
      selectedTab:0
  }

 handleChange = (event, newValue) => {
    this.setState({selectedTab:newValue})
  };
  render(){
    const {classes} = this.props;
    const {selectedTab} = this.state;
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
            >
              <Tab label="All reviews" {...a11yProps(0)} />
              <Tab label="Google reviews" {...a11yProps(1)} />
              <Tab label="Trustpilot reviews" {...a11yProps(2)} />
              <Tab label="TrustedShops reviews" {...a11yProps(3)} />
              <Tab label="App Store reviews" {...a11yProps(4)} />
              <Tab label="Google play reviews" {...a11yProps(5)} />
            </Tabs>
          </AppBar>
          <TabPanel value={selectedTab} index={0}>
            <GoogleReviewsDs />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={selectedTab} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={selectedTab} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={selectedTab} index={6}>
            Item Seven
          </TabPanel>
        </div>
      );
  }
}

export default withStyles(styles)(ReviewsContainer);
