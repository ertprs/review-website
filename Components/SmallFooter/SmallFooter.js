import React from "react";
import smallFooterStyles from "./smallFooterStyles";
import { layoutStyles } from "../../style";
import Link from "next/link";

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
            <Link href="/">
              <a>
                <i className="fa fa-facebook" />
              </a>
            </Link>
          </div>
          <div className="footerTopSocialLink">
            <Link href="/">
              <a>
                <i className="fa fa-twitter" />
              </a>
            </Link>
          </div>
          <div className="footerTopSocialLink">
            <Link href="/">
              <a>
                <i className="fa fa-google-plus" />
              </a>
            </Link>
          </div>
          <div className="footerTopSocialLink">
            <Link href="/">
              <a>
                <i className="fa fa-linkedin" />
              </a>
            </Link>
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
                  <Link href="/">
                    <a>Claim your ownership</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Engage your community</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Receive alerts</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Plans &amp; Pricing</a>
                  </Link>
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
                  <Link href="/">
                    <a>Check website reputation</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Get rewards</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Be safe online</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Referral program</a>
                  </Link>
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
                  <Link href="/">
                    <a>Contact</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Privacy policy</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>Terms of use</a>
                  </Link>
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
                  <Link href="/">
                    <a>Login</a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a>My Account</a>
                  </Link>
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
          <Link href="https://thetrustsearch.com/termsAndConditions">
            <a
              target="_blank"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Privacy policy
            </a>
          </Link>
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
