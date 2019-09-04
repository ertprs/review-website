import React from "react";
import AmpLinkWrapper from '../../AmpWrappers/AmpLinkWrapper';
import responsiveSideNavStyles from "./responsiveSideNavStyles";

const ResponsiveSideNav = props => {
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
      </div>
    </nav>
  );
};

export default ResponsiveSideNav;
