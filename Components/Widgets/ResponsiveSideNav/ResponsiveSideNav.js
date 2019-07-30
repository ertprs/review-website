import React from "react";
import responsiveSideNavStyles from "./responsiveSideNavStyles";

const ResponsiveSideNav = ({ handleMenuBtnClick }) => {
  return (
    <nav className="responsiveSideNavContainer">
      <style jsx>
        {responsiveSideNavStyles}
      </style>
      <div className="responsiveSideNavItems">
        <div>
          <a href="/" alt="nav-link">
            Home
          </a>
        </div>
        <div>
          <a href="/" alt="nav-link">
            About
          </a>
        </div>
        <div>
          <a href="/" alt="nav-link">
            Support
          </a>
        </div>
        <div>
          <a href="/" alt="nav-link">
            Contacts
          </a>
        </div>
        <div>
          <a
            href="/"
            alt="nav-link"
            onClick={e => {
              e.preventDefault();
              handleMenuBtnClick();
            }}
          >
            X
          </a>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveSideNav;
