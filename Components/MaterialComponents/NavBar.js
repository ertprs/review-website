import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Router from "next/router";
// import Link from "../../src/Link";
import Link from "next/link";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import Snackbar from "../Widgets/Snackbar";
import SearchBoxSuggestion from "../../Components/Widgets/SuggestionBox";
import _get from "lodash/get";

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
    color: "#fff",
    textDecoration: "none",
    padding: "25px",
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
      color: "#000",
      textDecoration: "none"
    }
  },
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

const hitDomainApi = searchBoxVal => {
  if (
    searchBoxVal.trim() !== "" &&
    /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim.test(
      searchBoxVal
    )
  ) {
    let domainName = searchBoxVal.toLowerCase().trim();
    let parsed_domain_name = domainName.replace(/https:\/\//gim, "");
    parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
    window.location.assign(`${parsed_domain_name}`);
  }
};

const handleSearchBoxKeyPress = (e, searchBoxVal) => {
  if (e.keyCode === 13) {
    hitDomainApi(searchBoxVal);
  }
};

function PrimarySearchAppBar(props) {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
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

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName.includes("reviews")) {
      setShowInputBase(true);
    } else {
      setShowInputBase(false);
    }
  }, []);

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
    setShowSnackbar(true);
    props.logOut();
    Router.push("/");
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchBoxValue, setSearchBoxValue] = React.useState("");
  const [showInputBase, setShowInputBase] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

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
          <MenuItem>
            <a onClick={() => handleLogout()}>Logout</a>
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
              <MenuItem>
                <a onClick={() => handleLogout()}>Logout</a>
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
          <MenuItem>
            <a onClick={() => handleLogout()}>Logout</a>
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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href="/about">
        <MenuItem>
          <a className={classes.navLinkMobile}>About Us</a>
        </MenuItem>
      </Link>

      <div>
        <MenuItem>
          <a
            href="https://b2b.thetrustsearch.com/en/"
            className={classes.navLinkMobile}
          >
            Business
          </a>
        </MenuItem>
      </div>
      {!authorized ? (
        <>
          <Link href="/login">
            <MenuItem>
              <a className={classes.navLinkMobile}>Login</a>
            </MenuItem>
          </Link>
          <Link href="/registration">
            <MenuItem>
              <a className={classes.navLinkMobile}>Sign up</a>
            </MenuItem>
          </Link>
        </>
      ) : (
        <>
          <Link href="/dashboard">
            <MenuItem>
              <a className={classes.navLinkMobile}>Dashboard</a>
            </MenuItem>
          </Link>
          {loginType === 1 || loginType === 2 ? (
            <Link href="/">
              <MenuItem onClick={() => handleLogout()}>
                <a className={classes.navLinkMobile}>Logout</a>
              </MenuItem>
            </Link>
          ) : null}
          {loginType === 3 ? (
            <Link href="/">
              <MenuItem>
                <a onClick={() => handleLogout()} className={classes.navLink}>
                  Logout
                </a>
              </MenuItem>
            </Link>
          ) : null}
          {loginType === 4 ? (
            <Link href="/">
              <MenuItem>
                <a onClick={() => handleLogout()} className={classes.navLink}>
                  Logout
                </a>
              </MenuItem>
            </Link>
          ) : null}
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={{ background: "#303030" }} position="static">
        <Toolbar>
          <div
            onClick={() => Router.push("/")}
            className={classes.logoContainer}
          >
            <img
              src="/static/images/logo_footer.png"
              className={classes.logoImg}
            />
          </div>
          {!showInputBase ? (
            <Typography
              onClick={() => Router.push("/")}
              className={classes.title}
              variant="h6"
              noWrap
              style={{ margin: "0 5px 0 0", color: "#f1f1f1" }}
            >
              TrustSearch
            </Typography>
          ) : null}
          {showInputBase ? (
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={e => setSearchBoxValue(e.target.value)}
                onKeyDown={e => handleSearchBoxKeyPress(e, searchBoxValue)}
                value={searchBoxValue}
              />
              <div
                // style={{

                // }}
                onClick={() => {
                  hitDomainApi(searchBoxValue);
                }}
                className={classes.searchIcon}
              >
                <SearchIcon />
              </div>
            </div>
          ) : null}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link href="/about">
              <a className={classes.navLink}>About Us</a>
            </Link>
            <Link href="https://b2b.thetrustsearch.com/en/">
              <a className={classes.navLink}>Business</a>
            </Link>
            {!authorized ? (
              <>
                <Link href="/login">
                  <a className={classes.navLink}>Login</a>
                </Link>
                <Link href="/registration">
                  <a className={classes.navLink}>Sign up</a>
                </Link>
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
                    <span>{userName ? `Hello, ${userName}` : ""}</span>
                  </span>
                </Link>
                {renderProfileMenu}
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {searchBoxValue.length > 0 ? (
        <SearchBoxSuggestion
          searchBoxVal={searchBoxValue}
          handleSearchSuggestionClick={hitDomainApi}
        />
      ) : null}
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
  return { auth };
};

export default connect(mapStateToProps, { logOut })(PrimarySearchAppBar);
