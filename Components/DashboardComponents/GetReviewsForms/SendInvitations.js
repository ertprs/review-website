import React, { Component } from "react";
import uuid from "uuid/v1";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { connect } from "react-redux";
import _get from "lodash/get";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../Widgets/Snackbar";
import sendgridTemaplateIds from "../../../utility/constants/sendgridTemaplateIds";
import _filter from "lodash/get";

class SendInvitations extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };
  renderSendInvitationsHeader = () => {
    return (
      <div className="container">
        <style>
          {`
                .mainHeading{
                    font-weight:300;
                }
                .subHeading{
                    margin-top:20px;
                    margin-bottom:20px;
                }
                @media screen and (max-width:405px){
                  font-size:0.9rem;
                }
              `}
        </style>
        <div className="row">
          <div className="col-md-12">
            <div className="header">
              <h3 className="mainHeading">Invitations are ready to go!</h3>
              <h5 className="subHeading">
                Review the details before you hit send:
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderInfoCards = data => {
    const { businessAddress, businessAddressFirstTime } = this.props;
    const businessAdd =
      businessAddress === "" ? businessAddressFirstTime : businessAddress;
    return data.map(item => {
      return (
        <div className="renderInfoContainer" key={uuid()}>
          <style jsx>
            {`
              .renderInfoContainer {
                margin-bottom: 15px;
                font-size: 1.05rem;
              }
              @media screen and (max-width: 405px) {
                .renderInfoContainer {
                  font-size: 0.9rem;
                }
              }
            `}
          </style>
          <div className="row">
            <div style={{ fontWeight: "bold" }} className="col-md-6">
              {item.key}
            </div>
            <div className="col-md-6">
              {item.key ===
              "Send your customers to this website to write their review" ? (
                <a href={item.value} target="_blank">
                  {businessAdd}
                </a>
              ) : (
                item.value
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  renderSendInvitationsBody = () => {
    const {
      campaignName,
      campaignLanguage,
      senderName,
      senderEmail,
      clientName,
      entity,
      emailSubject,
      googleDirectReviewUrl,
      googleDirectReviewUrlFirstTime,
      googlePlaceId,
      domain
    } = this.props;
    const googleReviewUrl =
      googleDirectReviewUrl === ""
        ? googleDirectReviewUrlFirstTime
        : googleDirectReviewUrl;
    let campaignLanguageArr = sendgridTemaplateIds.filter(template => {
      return template.value === campaignLanguage;
    });
    let campLangName = campaignLanguage;
    if (campaignLanguageArr) {
      campLangName = campaignLanguageArr[0].displayName;
    }
    const data = [
      { key: "Campaign Name", value: campaignName },
      { key: "Campaign Language", value: campLangName },
      { key: "Sender Name", value: senderName },
      { key: "Sender Email", value: senderEmail },
      { key: "Entity", value: entity },
      { key: "Email Subject", value: emailSubject },
      {
        key: "Send your customers to this website to write their review",
        value:
          googleReviewUrl === ""
            ? `https://www.google.com/maps/search/?api=1&query=${domain}&query_place_id=${googlePlaceId}`
            : googleReviewUrl
      }
      // { key: "Client Name", value: clientName },
      // { key: "Reply-to Email", value: "art@cunami.lv" },
      // { key: "Number of valid lines that will be processed", value: "1" }
    ];
    return (
      <div className="container">
        <div>{this.renderInfoCards(data)}</div>
      </div>
    );
  };

  renderSendInvitationsFooter = () => {
    return (
      <div className="container">
        <style jsx>
          {`
            .footerContainer {
              margin-top: 35px;
              font-size: 1rem;
            }
            @media screen and (max-width: 405px) {
              .footerContainer {
                font-size: 0.9rem;
              }
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-12">
            <div className="footerContainer">
              Invitations will be scheduled and sent as soon as possible.
            </div>
          </div>
        </div>
      </div>
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const { isLoading, success, errorMsg } = this.props;
    if (this.props !== prevProps) {
      if (success === true && !isLoading) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Invitations Sent Successfully!"
        });
      } else if (success === false && !isLoading) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: errorMsg
        });
      }
    }
  }

  render() {
    const { isLoading } = this.props;
    return (
      <>
        {this.renderSendInvitationsHeader()}
        {this.renderSendInvitationsBody()}
        {this.renderSendInvitationsFooter()}
        <div className="container">
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-md-2">
              <style jsx>
                {`
                  @media only screen and (max-width: 767px) {
                    .backBtn {
                      margin-left: 5px;
                      margin-bottom: 15px;
                    }
                  }
                `}
              </style>
              <div className="backBtn">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowLeft />}
                  onClick={this.props.handleBack}
                  size="small"
                >
                  Back
                </Button>
              </div>
            </div>
            <div className="col-md-3">
              {isLoading ? (
                <Button variant="contained" color="primary" size="large">
                  <CircularProgress color={"#f1f1f1"} size={16} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowRight />}
                  onClick={this.props.handleNext}
                  size="small"
                >
                  Send Invitations
                </Button>
              )}
            </div>
          </div>
        </div>
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const { getReviewsData } = dashboardData;
  const { createCampaign, selectTemplateData } = getReviewsData || {};
  const campaignName = _get(createCampaign, "campaignName.value", "");
  const campaignLanguage = _get(createCampaign, "campaignLanguage.value", "");
  const senderName = _get(createCampaign, "senderName.value", "");
  const senderEmail = _get(createCampaign, "senderEmail.value", "");
  const clientName = _get(selectTemplateData, "clientName.value", "");
  const entity = _get(selectTemplateData, "entity.value", "");
  const emailSubject = _get(selectTemplateData, "subject.value", "");

  const createCampaignRes = _get(dashboardData, "createCampaign", {});
  const isLoading = _get(createCampaignRes, "isLoading", false);
  const success = _get(createCampaignRes, "success", "undefined");
  const errorMsg = _get(createCampaignRes, "errorMsg", "");
  const googleDirectReviewUrl = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.directReviewUrl",
    ""
  );
  const googleDirectReviewUrlFirstTime = _get(
    dashboardData,
    "googleDirectReviewUrl",
    ""
  );
  const businessAddress = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.address",
    ""
  );
  const businessAddressFirstTime = _get(dashboardData, "businessAddress", "");
  const googlePlaceId = _get(dashboardData, "googlePlaceId", "");
  const domain = _get(auth, "logIn.userProfile.business_profile.domain", "");
  return {
    campaignName,
    campaignLanguage,
    senderName,
    senderEmail,
    clientName,
    entity,
    emailSubject,
    isLoading,
    success,
    errorMsg,
    googleDirectReviewUrl,
    googleDirectReviewUrlFirstTime,
    businessAddress,
    businessAddressFirstTime,
    googlePlaceId,
    domain
  };
};

export default connect(mapStateToProps)(SendInvitations);
