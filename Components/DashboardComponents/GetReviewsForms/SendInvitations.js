import React, { Component } from "react";
import uuid from "uuid/v1";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { connect } from "react-redux";
import _get from "lodash/get";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../Widgets/Snackbar";

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
            <div className="col-md-6">{item.value}</div>
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
      services
    } = this.props;
    const data = [
      { key: "Campaign Name", value: campaignName },
      { key: "Campaign Language", value: campaignLanguage },
      { key: "Sender Name", value: senderName },
      { key: "Sender Email", value: senderEmail },
      { key: "Client Name", value: clientName },
      { key: "Client Name", value: clientName },
      { key: "Entity", value: entity },
      { key: "Email Subject", value: emailSubject },
      { key: "Services", value: services },
      // { key: "Reply-to Email", value: "art@cunami.lv" },
      {
        key: "Send your customers to this website to write their review",
        value: "https://www.trustsearch.com"
      },
      { key: "Number of valid lines that will be processed", value: "1" }
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
    console.log(isLoading, "isLoading");
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
                  <CircularProgress color={"#f1f1f1"} size={20} />
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
  const { dashboardData } = state;
  const { getReviewsData } = dashboardData;
  const { createCampaign, selectTemplateData } = getReviewsData || {};
  const campaignName = _get(createCampaign, "campaignName.value", "");
  const campaignLanguage = _get(createCampaign, "campaignLanguage.value", "");
  const senderName = _get(createCampaign, "senderName.value", "");
  const senderEmail = _get(createCampaign, "senderEmail.value", "");
  const clientName = _get(selectTemplateData, "clientName.value", "");
  const entity = _get(selectTemplateData, "entity.value", "");
  const emailSubject = _get(selectTemplateData, "subject.value", "");
  const services = _get(selectTemplateData, "services.value", "");

  const createCampaignRes = _get(dashboardData, "createCampaign", {});
  const isLoading = _get(createCampaignRes, "isLoading", false);
  const success = _get(createCampaignRes, "success", "undefined");
  const errorMsg = _get(createCampaignRes, "errorMsg", "");

  return {
    campaignName,
    campaignLanguage,
    senderName,
    senderEmail,
    clientName,
    entity,
    emailSubject,
    services,
    isLoading,
    success,
    errorMsg
  };
};

export default connect(mapStateToProps)(SendInvitations);
