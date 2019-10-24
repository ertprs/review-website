import React, { useState } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BuisnessUserRegistration from "../Components/Registration/businessUser";
import InternetUSerRegistration from "../Components/Registration/internetUser";
import Layout from "../hoc/layout/layout";
import isAlreadyLoggedIn from "../utility/isAuthenticated/isAlreadyLoggedIn";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

const Registration = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const a11yProps = index => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  };

  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  return (
    <Layout>
      <div className="mainContainer">
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <style jsx> {authenticationPageStyles} </style>{" "}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="Registration tabs"
            >
              <Tab label="User Registration" {...a11yProps(0)} />
              <Tab label="Business Registration" {...a11yProps(1)} />
            </Tabs>
            {tabValue === 0 ? (
              <InternetUSerRegistration />
            ) : (
              <BuisnessUserRegistration />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Registration.getInitialProps = async ctx => {
  isAlreadyLoggedIn(ctx);
  return {};
};

export default Registration;
