import React, { Component } from "react";
import uuid from "uuid/v1";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

export default class SendInvitations extends Component {
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
              @media screen and (max-width:405px){
                .renderInfoContainer {
                  font-size: 0.9rem;
                }
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

  renderSendInvitationsBody = () => {
    const data = [
      { key: "Sender Name", value: "Cunami" },
      // { key: "Sender Email", value: "noreply.invitations@trustpilotmail.com" },
      { key: "Reply-to Email", value: "art@cunami.lv" },
      { key: "Template", value: "For purchase experiences (Best in test)" },
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
            @media screen and (max-width:405px){
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

  render() {
    return (
      <>
        {this.renderSendInvitationsHeader()}
        {this.renderSendInvitationsBody()}
        {this.renderSendInvitationsFooter()}
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
          <div className="col-md-2">
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              onClick={this.props.handleNext}
              size="small"
            >
              Continue
            </Button>
          </div>
        </div>
      </>
    );
  }
}
