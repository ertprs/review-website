import React from "react";
import AmpLinkWrapper from '../../AmpWrappers/AmpLinkWrapper';
import responsiveSideNavStyles from "./responsiveSideNavStyles";

const ResponsiveSideNav = props => {
  const {authorized, userName} = props;
  return (
    <nav className="responsiveSideNavContainer">
      <style jsx>{responsiveSideNavStyles}</style>
      <div className="responsiveSideNavItems">
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
        {!authorized ? (
            <React.Fragment>
              <div>
                <i className="fa fa-sign-in" style={{ marginRight: "5px", color:"#21bc61"}} />
                <AmpLinkWrapper href="/login" alt="nav-link">
                  Login{" "}
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
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>
                Hello, <span style={{ marginRight: "10px" }}>{userName}</span>
              </div>
              <div>
                <i className="fa fa-sign-out" style={{ marginRight: "5px" }} />
                <AmpLinkWrapper href="/logout" alt="nav-link">
                  Logout
                </AmpLinkWrapper>
              </div>
            </React.Fragment>
          )}
      </div>
    </nav>
  );
};

export default ResponsiveSideNav;
