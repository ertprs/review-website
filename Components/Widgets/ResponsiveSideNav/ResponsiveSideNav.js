import React from "react";
import AmpLinkWrapper from '../../AmpWrappers/AmpLinkWrapper';
import responsiveSideNavStyles from "./responsiveSideNavStyles";

const ResponsiveSideNav = props => {
  return (
    <nav className="responsiveSideNavContainer">
      <style jsx>{responsiveSideNavStyles}</style>
      <div className="responsiveSideNavItems">
        <div>
          <AmpLinkWrapper href="/" alt="nav-link">
            Home
          </AmpLinkWrapper>
        </div>
        <div>
          <AmpLinkWrapper href="/" alt="nav-link">
            About
          </AmpLinkWrapper>
        </div>
        <div>
          <AmpLinkWrapper href="/" alt="nav-link">
            Support
          </AmpLinkWrapper>
        </div>
        <div>
          <AmpLinkWrapper href="/" alt="nav-link">
            Contacts
          </AmpLinkWrapper>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveSideNav;
