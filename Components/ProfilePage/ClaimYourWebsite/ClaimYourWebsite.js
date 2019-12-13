import React, { Component } from "react";
import Paper from "../../MaterialComponents/Paper";
import { claimYourWebsiteStyles } from "./claimYourWebsiteStyles";
import { connect } from "react-redux";
import _get from "lodash/get";
import Button from "@material-ui/core/Button";
import { redirectWithDomain } from "../../../store/actions/domainProfileActions";
import Router from "next/router";

class ClaimYourWebsite extends Component {
  renderClaimButton = () => {
    const { redirectWithDomain, domain_name } = this.props;
    let parsed_domain_name = domain_name.replace(/https:\/\//gim, "");
    parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
    return (
      <>
        <style jsx>{claimYourWebsiteStyles}</style>
        <Button
          variant="contained"
          color="primary"
          // className="claimBtn"
          onClick={() => {
            Router.push(`/get-widgets/${parsed_domain_name}`);
          }}
        >
          Click if this is your website
        </Button>
      </>
    );
  };

  renderAppropriateBox = () => {
    const { variant, domain_name, redirectWithDomain } = this.props;
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
                  <div style={{ textAlign: "center" }}>
                    {this.renderClaimButton()}
                  </div>
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
    domain_name: _get(
      state,
      "profileData.domainProfileData.headerData.data.domain_name",
      ""
    )
  };
};

export default connect(mapStateToProps, { redirectWithDomain })(
  ClaimYourWebsite
);
