import React from "react";
import smallFooterStyles from "./smallFooterStyles";
import { layoutStyles } from "../../style";
const renderFooterTopSection = () => {
  return (
    <div className="footerTopSection">
      <style jsx>{smallFooterStyles}</style>
      <div className="footerContainerInner">
        <div className="footerTopLogoContainer">
          <img
            src="/static/images/logo_footer.png"
            alt="trustsearchlogo"
            classes="footerTopLogo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <div className="footerTopSocialLinksContainer">
          <div className="footerTopSocialLink">
            <a href="/">
              <i className="fa fa-facebook" />
            </a>
          </div>
          <div className="footerTopSocialLink">
            <a href="/">
              <i className="fa fa-twitter" />
            </a>
          </div>
          <div className="footerTopSocialLink">
            <a href="/">
              <i className="fa fa-google-plus" />
            </a>
          </div>
          <div className="footerTopSocialLink">
            <a href="/">
              <i className="fa fa-linkedin" />
            </a>
          </div>
        </div>

        <div className="footerTopLocalizationContainer">
          <button className="footerTopLocalizationBtn">English</button>
        </div>
      </div>
    </div>
  );
};

const renderFooterMiddleSection = () => {
  return (
    <div className="footerMiddleSection">
      <style jsx>{smallFooterStyles}</style>
      <div className="footerContainerInner">
        <div className="row" style={{ flexBasis: "80%" }}>
          <div className="col-md-3">
            <div className="footerMiddleLinksSection">
              <div>
                <h3 className="footerMiddleSectionHeading">For Business</h3>
              </div>
              <div className="footerMiddleSectionLinks">
                <div>
                  <a href="/">Claim your ownership</a>
                </div>
                <div>
                  <a href="/">Engage your community</a>
                </div>
                <div>
                  <a href="/">Receive alerts</a>
                </div>
                <div>
                  <a href="/">Plans &amp; Pricing</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footerMiddleLinksSection">
              <div>
                <h3 className="footerMiddleSectionHeading">
                  For Internet users
                </h3>
              </div>
              <div className="footerMiddleSectionLinks">
                <div>
                  <a href="/">Check website reputation</a>
                </div>
                <div>
                  <a href="/">Get rewards</a>
                </div>
                <div>
                  <a href="/">Be safe online</a>
                </div>
                <div>
                  <a href="/">Referral program</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footerMiddleLinksSection">
              <div>
                <h3 className="footerMiddleSectionHeading">Helpful Links</h3>
              </div>
              <div className="footerMiddleSectionLinks">
                <div>
                  <a href="/">Contact</a>
                </div>
                <div>
                  <a href="/">Privacy policy</a>
                </div>
                <div>
                  <a href="/">Terms of use</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footerMiddleLinksSection">
              <div>
                <h3 className="footerMiddleSectionHeading">Account</h3>
              </div>
              <div className="footerMiddleSectionLinks">
                <div>
                  <a href="/">Login</a>
                </div>
                <div>
                  <a href="/">My Account</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderNewsLetter()}
      </div>
    </div>
  );
};

const renderNewsLetter = () => {
  // make newsletter input controlled and subscription
  return (
    <div className="newsLetterSection">
      <style jsx>{smallFooterStyles}</style>
      <div>
        <h3
          className="footerMiddleSectionHeading"
          style={{ marginBottom: "4%" }}
        >
          <i className="fa fa-envelope-o mr-2" /> Sign Up for a Newsletter
        </h3>
      </div>
      <div className="newsLetterHeader">
        <p>
          Weekly breaking news, analysis and cutting edge advices on how to be
          safe online.
        </p>
        <div className="emailInputBox">
          <div>
            <input type="text" placeholder="Enter your email address" />
          </div>
          <div>
            <button>
              <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderFooterBottomSection = () => {
  return (
    <div className="footerBottomSection">
      <style jsx>{layoutStyles}</style>
      <style jsx>{smallFooterStyles}</style>
      <div className="row">
        <div
          className="col-md-4"
          style={{ textAlign: "center", color: "#fff" }}
        >
          <a
            href="https://thetrustsearch.com/termsAndConditions"
            target="_blank"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Terms of use
          </a>
        </div>
        <div className="col-md-4">
          <div style={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()}{" "}
            <span style={{ color: "#fff", fontWeight: "400" }}>
              TrustSearch.
            </span>{" "}
            All Rights Reserved.
          </div>
        </div>
        <div
          className="col-md-4"
          style={{ textAlign: "center", color: "#fff" }}
        >
          <a
            href="https://thetrustsearch.com/termsAndConditions"
            target="_blank"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <>
      <style jsx>{smallFooterStyles}</style>
      <footer className="footer">
        {/* {renderFooterTopSection()}
      {renderFooterMiddleSection()} */}
        {renderFooterBottomSection()}
      </footer>
    </>
  );
};

export default Footer;
