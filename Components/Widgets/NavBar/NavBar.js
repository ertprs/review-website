import React from "react";
import navBarStyles from "./navBarStyles";
import ResponsiveSideNav from "../ResponsiveSideNav/ResponsiveSideNav";
import * as AmpHelpers from "react-amphtml/helpers";
import AmpLinkWrapper from "../../AmpWrappers/AmpLinkWrapper";
import AmpImgWrapper from "../../AmpWrappers/AmpImgWrapper";
import { useAmp } from 'next/amp';
import { GoogleLogout } from 'react-google-login';
import { googleClientId } from '../../../utility/config';

const onLogout = () => {
}

const renderResponsiveSideNav = (showSideNav, handleMenuBtnClick) => {
  if (useAmp()) {
    return (<AmpHelpers.Bind hidden="showSideNav.show">
      {props => (
        <div {...props} hidden={true}>
          <ResponsiveSideNav />
        </div>
      )}
    </AmpHelpers.Bind>)
  }
  else
    return showSideNav ? <ResponsiveSideNav showSideNav={showSideNav} /> : null;
};

const NavBar = ({ showSideNav, handleMenuBtnClick }) => {
  return (
    <>
      <style jsx>{navBarStyles}</style>
      <nav className="navbarContainer">
        <div className="logoContainer">
          <div>
            <AmpLinkWrapper href="/" alt="home">
              <AmpImgWrapper
                src="/static/images/logo.png"
                alt="Trust search logo"
                height="42"
                width="157.85"
                layout="responsive"
                imgContainerStyles={{ width: "157.85px", height: "41.99px" }}
              />
            </AmpLinkWrapper>
          </div>
        </div>
        <div className="primaryLinksContainer">
          <div>
            <AmpLinkWrapper href="/about" alt="nav-link">
              About
            </AmpLinkWrapper>
          </div>
          <div>
            <AmpLinkWrapper href="/business" alt="nav-link">
              Business
            </AmpLinkWrapper>
          </div>
        </div>
        <div className="secondaryLinksContainer">
          <div>
            <i className="fa fa-sign-in" style={{ marginRight: "5px" }} />
            <AmpLinkWrapper href="/login" alt="nav-link">
              Login |{" "}
            </AmpLinkWrapper>
          </div>
          <div>
            <AmpLinkWrapper
              href="/registration"
              alt="nav-link"
              styles={{ marginLeft: "5px" }}
            >
              {" "}
              Register
            </AmpLinkWrapper>
          </div>
          {/* <GoogleLogout
            clientId={googleClientId}
            buttonText="Logout"
            onLogoutSuccess={onLogout}
          >
          </GoogleLogout> */}
        </div>
        <div className="menuIconContainer">
          {
            <AmpHelpers.Action
              events={{
                tap: [
                  "AMP.setState({ showSideNav: { show: !showSideNav.show } })"
                ]
              }}
            >
              {props => (
                <button
                  className="menuBtn"
                  onClick={handleMenuBtnClick}
                  {...props}
                >
                  <i className="fa fa-bars" />
                </button>
              )}
            </AmpHelpers.Action>
          }
        </div>
      </nav>
      {renderResponsiveSideNav(showSideNav, handleMenuBtnClick)}
    </>
  );
};

export default NavBar;
