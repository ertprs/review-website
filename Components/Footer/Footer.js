import React from "react";
import footerStyles from "./footerStyles";
import Link from "next/link";

const renderFooterTopSection = () => {
  return (
    <div className="footerTopSection">
      <style jsx>{footerStyles}</style>
      <div className="footerContainerInner">
        <div className="footerTopLogoContainer">
          <div style={{ width: "176.04px", height: "45.99px" }}>
            <img
              src="/static/images/logo_footer.png"
              alt="trustsearchlogo"
              classes="footerTopLogo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>

        <div className="footerTopSocialLinksContainer">
          <div className="footerTopSocialLink">
            <Link href="https://www.facebook.com/CryptoPolicecom/">
              <a target="_blank">
                <i className="fa fa-facebook" />
              </a>
            </Link>
          </div>
          <div className="footerTopSocialLink">
            <Link href="https://www.linkedin.com/company/trustsearch/">
              <a target="_blank">
                <i className="fa fa-linkedin" />
              </a>
            </Link>
          </div>
          {/* <div className="footerTopSocialLink">
            <a href="/">
              <i className="fa fa-twitter" />
            </a>
          </div> */}
          {/* <div className="footerTopSocialLink">
            <a href="/">
              <i className="fa fa-google-plus" />
            </a>
          </div> */}
        </div>

        {/* <div className="footerTopLocalizationContainer">
          <button className="footerTopLocalizationBtn">
            English
          </button>
        </div> */}
        <div className="footerTopLocalizationContainer">
          <Link href="https://thetrustsearch.com/termsAndConditions">
            <a
              target="_blank"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Terms and Conditions
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const renderFooterMiddleSection = () => {
  return (
    <div className="footerMiddleSection">
      <style jsx>{footerStyles}</style>
      <div className="footerContainerInner">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="footerMiddleLinksSection">
                <div>
                  <h3 className="footerMiddleSectionHeading">For Business</h3>
                </div>
                <div className="footerMiddleSectionLinks">
                  <div>
                    <Link href="https://thetrustsearch.com/registration#business">
                      <a target="_blank">Claim your ownership</a>
                    </Link>
                  </div>
                  {/* <div>
                  <a href="/">Engage your community</a>
                </div> */}
                  {/* <div>
                  <a href="/">Receive alerts</a>
                </div> */}
                  <div>
                    <Link href="https://thetrustsearch.com/business">
                      <a target="_blank">Plans &amp; Pricing</a>
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
                    <Link href="https://thetrustsearch.com">
                      <a target="_blank">Check website reputation</a>
                    </Link>
                  </div>
                  {/* <div>
                  <a href="/">Get rewards</a>
                </div>
                <div>
                  <a href="/">Be safe online</a>
                </div>
                <div>
                  <a href="/">Referral program</a>
                </div> */}
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
                    <Link href="https://thetrustsearch.com/about">
                      <a target="_blank">Contact</a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/termsAndConditions">
                      <a>Privacy policy</a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/termsAndConditions">
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
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                  <div>
                    <Link href="/registration">
                      <a>Register</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {renderNewsLetter()} */}
      </div>
    </div>
  );
};

const renderNewsLetter = () => {
  // make newsletter input controlled and subscription
  return (
    <div className="newsLetterSection">
      <style jsx>{footerStyles}</style>
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
      <style jsx>{footerStyles}</style>
      <div style={{ textAlign: "center" }}>
        &copy; {new Date().getFullYear()}{" "}
        <span style={{ color: "#fff", fontWeight: "400" }}>TrustSearch.</span>{" "}
        All Rights Reserved.
      </div>
    </div>
  );
};

const Footer = props => {
  return (
    <>
      <style jsx>{footerStyles}</style>
      <footer className="footer" style={{ ...props.footerStyles }}>
        {renderFooterTopSection()}
        {renderFooterMiddleSection()}
        {renderFooterBottomSection()}
      </footer>
    </>
  );
};

export default Footer;
