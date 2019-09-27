import React, { Component } from "react";
import Paper from "../../MaterialComponents/Paper";
import { claimYourWebsiteStyles } from "./claimYourWebsiteStyles";

export default class ClaimYourWebsite extends Component {
  renderClaimButton = () => {
    return (
      <>
        <style jsx>{claimYourWebsiteStyles}</style>
        <button className="claimBtn">
          <span className="claimBtnHeroText">click</span> if this is your
          website
        </button>
      </>
    );
  };

  renderAppropriateBox = () => {
    const { variant } = this.props;
    switch (variant) {
      case "big":
        return (
          <div className="claimYourWebsiteBoxBigContainer">
            <style jsx>{claimYourWebsiteStyles}</style>
            <Paper>
              <div className="claimYourWebsiteBoxBig">
                <p className="claimYourWebsiteText">
                  Trust search can help you to motivate your clients to leave
                  textual and video reviews and build positive online
                  reputation, adding provable facts that verifies your trust
                  leading to better conversion rate and more sales !
                </p>
              </div>
              <div className="claimYourWebsiteFooter">
                {this.renderClaimButton()}
              </div>
            </Paper>
          </div>
        );
      case "small":
        return (
          <div className="claimYourWebsiteBoxSmallContainer">
            <style jsx>{claimYourWebsiteStyles}</style>
            <Paper>
              <div className="claimYourWebsiteBoxSmall">
                <h6>Claim ownership of hardcodedDomain profile</h6>
                <p className="claimYourWebsiteText">
                  Claim ownership of hardcodedDomain.com if this is your website and start to build your online reputation!
                </p>
                <div className="claimYourWebsiteFooter">
                  {this.renderClaimButton()}
                </div>
              </div>
            </Paper>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return <>{this.renderAppropriateBox()}</>;
  }
}
