import React from "react";
import navBarStyles from './navBarStyles';
import ResponsiveSideNav from '../ResponsiveSideNav/ResponsiveSideNav';
import AmpLinkWrapper from '../../AmpWrappers/AmpLinkWrapper';
import AmpImgWrapper from '../../AmpWrappers/AmpImgWrapper';

const renderResponsiveSideNav = (showSideNav, handleMenuBtnClick)=>{
  return showSideNav ? <ResponsiveSideNav handleMenuBtnClick={handleMenuBtnClick}/> : null
}

const NavBar = ({showSideNav, handleMenuBtnClick}) => {
  return (
    <>
    <style jsx>
      {navBarStyles}
    </style>
    <nav className="navbarContainer">
      <div className="logoContainer">
        <div>
          <AmpLinkWrapper href="/" alt="home">
            <AmpImgWrapper src="/static/images/logo.png" alt="Trust search logo" height="42" width="157.85" layout="responsive"  imgContainerStyles={{width:"157.85px", height:"41.99px"}}/>
          </AmpLinkWrapper>
        </div>
      </div>
      <div className="primaryLinksContainer">
        <div>
          <AmpLinkWrapper href="/" alt="nav-link">Home</AmpLinkWrapper>
        </div>
        <div>
        <AmpLinkWrapper href="/" alt="nav-link">About</AmpLinkWrapper>
        </div>
        <div>
        <AmpLinkWrapper href="/" alt="nav-link">Support</AmpLinkWrapper>
        </div>
        <div>
        <AmpLinkWrapper href="/" alt="nav-link">Contacts</AmpLinkWrapper>
        </div>
      </div>
      <div className="secondaryLinksContainer">
        <div>
          <i className="fa fa-sign-in" style={{marginRight:"5px"}}></i>
          <AmpLinkWrapper href="/" alt="nav-link">Login | </AmpLinkWrapper>
        </div>
        <div>
        <AmpLinkWrapper href="/" alt="nav-link" styles={{marginLeft:"5px"}}> Register</AmpLinkWrapper>
        </div>
      </div>
      <div className="menuIconContainer">
        {!showSideNav ? <button className="menuBtn" onClick={handleMenuBtnClick}>
          <i className="fa fa-bars"></i>
        </button> : null}
      </div>
    </nav>
    {renderResponsiveSideNav(showSideNav, handleMenuBtnClick)}
    </>
  );
};

export default NavBar;
