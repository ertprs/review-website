import React, { useState, useEffect } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BusinessUserLogin from "../Components/Login/businessUser";
import InternetUSerLogin from "../Components/Login/internetUser";
import Layout from "../hoc/layout/layout";
import isAlreadyLoggedIn from "../utility/isAuthenticated/isAlreadyLoggedIn";
import _get from "lodash/get";

const Login = props => {
  const [tabValue, setTabValue] = useState(0);
  const pathname = _get(props, "pathname", "");
  const a11yProps = index => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  };

  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  useEffect(() => {
    let location = window.location.href;
    let splittedLocation = location.split("#");
    let isBusiness = "";
    if (splittedLocation && splittedLocation.length > 1) {
      isBusiness = splittedLocation[1];
    }
    if (isBusiness === ("business" || "Business")) {
      setTabValue(0);
    }
  }, []);

  return (
    <Layout>
      <div className="loginContainer">
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <style jsx> {authenticationPageStyles} </style>{" "}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="Login tabs"
            >
              <Tab label="Business Login" {...a11yProps(0)} />
              <Tab label="User Login" {...a11yProps(1)} />
            </Tabs>
            {tabValue === 1 ? (
              <InternetUSerLogin />
            ) : (
              <BusinessUserLogin pathname={pathname} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Login.getInitialProps = async ctx => {
  isAlreadyLoggedIn(ctx);
  const pathname = _get(ctx, "query.pathname", "");
  return { pathname };
};

export default Login;
