import React, { useState, useEffect } from "react";
import { indexPageStyles } from "../Components/Styles/indexPageStyles";
import SearchBox from "../Components/Widgets/SearchBox/SearchBox";
import WebStats from "../Components/Widgets/WebStats/WebStats";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Head from "next/head";
import Router from "next/router";
import uuid from "uuid/v1";
import { CircularProgress } from "@material-ui/core";
import Layout from "../hoc/layout/layout";
import SearchInput from "../Components/MaterialComponents/SearchInput";
import { connect } from "react-redux";
import Snackbar from "../Components/Widgets/Snackbar";
import { startLoading } from "../store/actions/loaderAction";
import { GoogleLogout } from "react-google-login";
import { logOut } from "../store/actions/authActions";
import _get from "lodash/get";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logoContainer: {
    marginRight: "12px"
  },
  title: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // },
    "&:hover": {
      cursor: "pointer"
    }
  },
  logoImg: {
    height: "50px",
    width: "auto",
    "&:hover": {
      cursor: "pointer"
    }
  },
  navLink: {
    color: "#000",
    textDecoration: "none",
    padding: "15px 25px 0 25px",
    "&:hover": {
      color: "#d8d8d8",
      textDecoration: "none",
      cursor: "pointer"
    }
  },
  navLinkMobile: {
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      color: "#000"
    }
  },
  // navLink:{
  //   color:"#fff",
  //   textDecoration:"none",
  //   padding:"25px"
  // },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: "10px",
    height: "100%",
    position: "absolute",
    margin: "-28px 0px 0px 10px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const renderWebStats = () => {
  let statsData = [
    { header: "1,800,000,000", caption: "Active website worldwide" },
    { header: "42,000,000", caption: "Business websites on the Internet" },
    { header: "4,383,810,342", caption: "Internet users" }
  ];

  return statsData.map(dataItem => {
    return (
      <div className="homeWebStatItem" key={uuid()}>
        <style jsx>{indexPageStyles}</style>
        <WebStats {...dataItem} />
      </div>
    );
  });
};

const Home = props => {
  const [showSnackbar, setShowSnacbar] = useState(false);
  const [isLoading, setPageLoading] = React.useState(false);
  useEffect(() => {
    // code to run on component mount
    if (props.showSnackbar) {
      setShowSnacbar(true);
    }
    window.scrollTo(0, 0);
  }, []);
  const [searchBoxVal, setSearchBoxVal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchBoxChange = e => {
    setSearchBoxVal(e.target.value);
  };

  const handleSearchSubmit = () => {
    props.startLoading();
    setPageLoading(true);
    if (searchBoxVal.trim() !== "") {
      if (
        /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim.test(
          searchBoxVal
        )
      ) {
        let domainName = searchBoxVal.toLowerCase().trim();
        let parsed_domain_name = domainName.replace(/https:\/\//gim, "");
        parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
        setLoading(true);
        Router.push(
          `/reviews?domain=${parsed_domain_name}`,
          `/reviews/${parsed_domain_name}`
        );
      } else {
        alert(
          "Please enter domain name in the format: (ex- thetrustsearch.com)"
        );
      }
    }
  };

  const renderHeroContent = () => {
    return (
      <div className="homeContainerInner">
        <style jsx>{indexPageStyles}</style>
        <div>
          <h3 className="heroHeading">
            TrustSearch - the search engine for trust!{" "}
          </h3>
          <h4 className="heroSubHeading">
            We help you to check
            <span className="heroSubHeadingMainText">trustworthiness</span> to
            <br /> websites, people and businesses.
          </h4>
        </div>

        <div
          className="analyseBtn"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          Analyse any website
        </div>

        <div className="homeSearchBoxContainer">
          {!loading ? (
            <>
              {/* <SearchBox
              onchange={handleSearchBoxChange}
              value={searchBoxVal}
              stateMethod={setSearchBoxVal}
              variant="thetrustsearchIndex"
              handleSearchSubmit={searchBoxVal => {
                handleSearchSubmit(setLoading, searchBoxVal);
              }}
            /> */}
              <SearchInput
                onchange={handleSearchBoxChange}
                value={searchBoxVal}
                onkeyDown={e => {
                  if (e.keyCode == 13) {
                    handleSearchSubmit();
                  }
                }}
                onsubmit={handleSearchSubmit}
              />
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CircularProgress color="secondary" />
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="homeWebStatsContainer">{renderWebStats()}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderLogo = () => {
    return (
      <div className="container">
        <style jsx>
          {`
            .logoImgContainer {
              max-width: 600px;
              height: auto;
              margin: 0 auto 35px auto;
            }
            .logoImgContainer img {
              max-width: 100%;
              height: auto;
              margin: 0 auto;
              display: block;
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-12">
            <div className="logoImgContainer">
              <img src="/static/images/main-page-logo.png" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="footerContainer">
        <style jsx>{`
          .footerContainer {
            background: #f2f2f2;
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 5px;
          }
        `}</style>
        <div className="container">
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <a
              href="https://thetrustsearch.com/termsAndConditions"
              target="_blank"
              style={{ color: "#000" }}
            >
              Terms and Conditions
            </a>
          </div>
          <div style={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()} TrustSearch. All rights reserved
          </div>
        </div>
      </div>
    );
  };

  const { auth } = props;
  const { authorized } = auth.logIn || false;
  const { userProfile } = auth.logIn || {};
  const loginType = _get(auth, "logIn.loginType", 0);
  let userName = "";
  if (userProfile) {
    if (userProfile.hasOwnProperty("name")) {
      if (userProfile.name.length > 0) {
        let nameAfterSplit = userProfile.name.split(" ");
        if (nameAfterSplit.length > 0) {
          userName = nameAfterSplit[0];
        }
      }
    }
  }

  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleLogout = () => {
    if (loginType === 2) {
      if (window) {
        if (window.hasOwnProperty("FB")) {
          window.FB.logout();
        }
      }
    }
    if (loginType === 3) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2
          .signOut()
          .then(
            auth2
              .disconnect()
              .then(console.log("Logout Sucessfully from google."))
          );
      }
    }
    setShowSnacbar(true);
    props.logOut();
    Router.push("/");
  };


  const handleProfileMenuOpen = event => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const profileMenuId = "profile-menu";
  const renderProfileMenu = (
    <Menu
      style={{ marginTop: "30px" }}
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {authorized && loginType === 4 ? (
        <Link href="/dashboard">
          <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
        </Link>
      ) : null}
      {loginType === 1 || loginType === 2 ? (
        <Link href="">
          <MenuItem onClick={() => handleLogout()}>
            <a>Logout</a>
          </MenuItem>
        </Link>
      ) : (
        ""
      )}
      {loginType === 3 ? (
        <GoogleLogout
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Logout"
          render={renderProps => (
            <Link href="">
              <MenuItem onClick={() => handleLogout()}>
                <a >Logout</a>
              </MenuItem>
            </Link>
          )}
          // onLogoutSuccess={logout}
        ></GoogleLogout>
      ) : (
        ""
      )}
      {loginType === 4 ? (
        <Link href="">
          <MenuItem onClick={() => handleLogout()}>
            <a >Logout</a>
          </MenuItem>
        </Link>
      ) : (
        ""
      )}
    </Menu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <>
      {/* <style jsx>{indexPageStyles}</style> */}
      <div className="topRightLinksContainer">
        <style jsx>
          {`
            .topRightLinksContainer {
              display: flex;
              justify-content: flex-end;
            }
            .topRightLinksItem {
              display: flex;
              flex-basis: 50%;
              justify-content: flex-end;
            }
            .topRightLinksItem > div {
              text-align: center;
              margin: 15px 20px 15px 20px;
            }
          `}
        </style>
        <div className="topRightLinksItem">
          <div>
            <Link href="/about">
              <a className={classes.navLinkMobile}>About us</a>
            </Link>
          </div>
          <div>
            <a
              className={classes.navLinkMobile}
              href="https://b2b.thetrustsearch.com/en/"
              target="_blank"
            >
              Business
            </a>
          </div>
          {!authorized ? (
            <>
              <div>
                <Link href="/login">
                  <a className={classes.navLinkMobile}>Login</a>
                </Link>
              </div>
              <div>
                <Link href="/registration">
                  <a className={classes.navLinkMobile}>Sign up</a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link>
                <span
                  className={classes.navLink}
                  onClick={e => {
                    e.preventDefault();
                    handleProfileMenuOpen(e);
                  }}
                >
                  <span>{userName}</span>
                </span>
              </Link>
              {renderProfileMenu}
            </>
          )}
        </div>
      </div>
      <div className="boxContainer">
        <style jsx>{`
          .boxContainer {
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // width: 100%;
            // transform: translate(-50%, -90%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70vh;
          }
          .boxContent {
            width: 100%;
          }
          .searchBoxContainer {
            width: 80%;
            margin: 0 auto;
          }
        `}</style>
        <div className="boxContent">
          {/* {renderHeroContent(searchBoxVal, setSearchBoxVal, loading, setLoading)} */}
          {renderLogo()}
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* {!loading ? (
                  <div className="searchBoxContainer">
                    <SearchInput
                      onchange={handleSearchBoxChange}
                      value={searchBoxVal}
                      onkeyDown={e => {
                        if (e.keyCode == 13) {
                          handleSearchSubmit();
                        }
                      }}
                      onsubmit={handleSearchSubmit}
                    />
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress color="secondary" />
                  </div>
                )} */}
                <div className="searchBoxContainer">
                    <SearchInput
                      onchange={handleSearchBoxChange}
                      value={searchBoxVal}
                      onkeyDown={e => {
                        if (e.keyCode == 13) {
                          handleSearchSubmit();
                        }
                      }}
                      onsubmit={handleSearchSubmit}
                    />
                  </div>
              </div>
            </div>
          </div>
          {renderFooter()}
        </div>
      </div>

      <Snackbar
        open={showSnackbar}
        variant={_get(props, "variant", "")}
        handleClose={() => setShowSnacbar(false)}
        message={_get(props, "message", "")}
      />
    </>
  );
};

const mapStateToProps = state => {
  const { auth, trustVote, profileData } = state;
  const authorized = _get(auth, "logIn.authorized", false);
  const profileDataActionType = _get(profileData, "type", "");
  const reportDomainSuccess = _get(
    profileData,
    "reportDomain.success",
    "undefined"
  );
  const reportDomainErrorMsg = _get(profileData, "reportDomain.errorMsg", "");
  let showSnackbar = false;
  let variant = "";
  let message = "";

  if (
    authorized &&
    _get(trustVote, "payload.success", false) === true &&
    _get(trustVote, "type", "") === "TRUST_VOTE_SUCCESS"
  ) {
    showSnackbar = true;
    variant = "success";
    message = "Review Posted Successfully!";
  } else if (
    authorized &&
    !_get(trustVote, "payload.success", false) === false &&
    _get(trustVote, "type", "") === "TRUST_VOTE_FAILURE"
  ) {
    showSnackbar = true;
    variant = "error";
    message = "Some Error Occured!";
  }

  if (
    authorized &&
    (profileDataActionType === "REPORT_DOMAIN_SUCCESS" ||
      profileDataActionType === "REPORT_DOMAIN_FAILURE")
  ) {
    if (reportDomainSuccess === true) {
      showSnackbar = true;
      variant = "success";
      message = "Domain Reported successfully!";
    } else if (reportDomainSuccess === false) {
      showSnackbar = true;
      variant = "error";
      message = reportDomainErrorMsg;
    }
  }
  return { showSnackbar, variant, message, auth };
};

export default connect(
  mapStateToProps,
  { startLoading, logOut }
)(Home);
