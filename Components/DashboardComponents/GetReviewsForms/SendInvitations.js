import React, { Component } from "react";
import uuid from "uuid/v1";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { connect } from "react-redux";
import _get from "lodash/get";

class SendInvitations extends Component {
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
        <div className="renderInfoContainer">
          <style jsx>
            {`
              .renderInfoContainer {
                margin-bottom: 15px;
                font-size: 1.05rem;
              }
            `}
          </style>
          <div className="row">
            <div className="col-md-6">{item.key}</div>
            <div className="col-md-6">{item.value}</div>
          </div>
        </div>
      );
    });
  };

  renderSendInvitationsBody = (senderName, clientName, entity) => {
    const data = [
      { key: "Sender Name", value: senderName },
      { key: "Sender Email", value: "noreply.invitations@trustpilotmail.com" },
      // { key: "Reply-to Email", value: "art@cunami.lv" },
      { key: "Client Name", value: clientName },
      { key: "Entity", value: entity },
      {
        key: "Send your customers to this website to write their review",
        value: "https://www.trustpilot.com"
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

  render() {
    const { senderName, clientName, entity } = this.props;
    return (
      <>
        {this.renderSendInvitationsHeader()}
        {this.renderSendInvitationsBody(senderName, clientName, entity)}
        {this.renderSendInvitationsFooter()}
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-2">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowLeft />}
              onClick={this.props.handleBack}
            >
              Back
            </Button>
          </div>
          <div className="col-md-2">
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              onClick={this.props.handleNext}
            >
              Continue
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { getReviewsData } = state.dashboardData;
  const senderName = _get(
    getReviewsData,
    "senderInfoData.senderName.value",
    ""
  );
  const clientName = _get(
    getReviewsData,
    "selectTemplateData.clientName.value",
    ""
  );
  const entity = _get(getReviewsData, "selectTemplateData.entity.value", "");
  return { senderName, clientName, entity };
};

export default connect(mapStateToProps)(SendInvitations);