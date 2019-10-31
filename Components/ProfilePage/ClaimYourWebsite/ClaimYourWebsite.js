import React, { Component } from "react";
import Paper from "../../MaterialComponents/Paper";
import { claimYourWebsiteStyles } from "./claimYourWebsiteStyles";
import { connect } from "react-redux";
import _get from "lodash/get";
import Router from 'next/router';

class ClaimYourWebsite extends Component {
  renderClaimButton = () => {
    return (
      <>
        <style jsx>{claimYourWebsiteStyles}</style>
        <button className="claimBtn" onClick={()=>Router.push("/login#business")}>
          <span className="claimBtnHeroText">click</span> if this is your
          website
        </button>
      </>
    );
  };

  renderAppropriateBox = () => {
    const { variant, domain_name } = this.props;
    switch (variant) {
      case "big":
        return (
          <div className="claimYourWebsiteBoxBigContainer">
            <style jsx>{claimYourWebsiteStyles}</style>
            <Paper>
              <div className="claimYourWebsiteBoxBig">
                <h5 style={{ textAlign: "center" }}>
                  Claim ownership of {domain_name} profile !
                </h5>
                <p className="claimYourWebsiteText">
                  Trustsearch can help you to motivate your clients to leave
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
                <h5>Claim ownership of {domain_name} profile !</h5>
                <p className="claimYourWebsiteTextSmall">
                  Claim ownership of {domain_name} if this is your website and
                  start to build your online reputation!
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

const mapStateToProps = state => {
  return {
    // domain_name: state.profileData.domainProfileData.headerData.data.domain_name
    domain_name : _get(state,"profileData.domainProfileData.headerData.data.domain_name","")
  };
};

export default connect(mapStateToProps)(ClaimYourWebsite);
