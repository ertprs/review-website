import React, { Component } from "react";
import uuid from "uuid/v1";
import { Button } from "@material-ui/core";
import StarRatings from "react-star-ratings";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { connect } from "react-redux";
import _get from "lodash/get";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../Widgets/Snackbar";
import sendgridTemaplateIds from "../../../utility/constants/sendgridTemaplateIds";
import _filter from "lodash/get";
import Link from "next/link";
import { reviewURLObjects } from "../../../utility/constants/reviewURLObjects";
import { emailTemplates } from "../../../utility/emailTemplates/emailTemplates";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
        <div className="rowStyle" key={uuid()}>
          <style jsx>
            {`
              .rowStyle {
                margin-bottom: 15px;
                font-size: 1.05rem;
              }

              .boldFont {
                font-weight: bold;
              }
              @media screen and (max-width: 405px) {
                .rowStyle {
                  font-size: 0.9rem;
                }
              }
            `}
          </style>
          <div className="row">
            <div className="col-md-6 boldFont">{item.key}</div>
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
      domain
    } = this.props;
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
      { key: "Email Subject", value: emailSubject }
      // { key: "Client Name", value: clientName },
      // { key: "Reply-to Email", value: "art@cunami.lv" },
      // { key: "Number of valid lines that will be processed", value: "1" }
    ];

    return (
      <div className="container">
        <style jsx>
          {`
            .rowStyle {
              margin-bottom: 15px;
              font-size: 1.05rem;
            }

            .boldFont {
              font-weight: bold;
            }
            @media screen and (max-width: 405px) {
              .rowStyle {
                font-size: 0.9rem;
              }
            }
          `}
        </style>

        {this.renderInfoCards(data)}
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

  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }

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

  renderTemplate = () => {
    const { formData, templateId } = this.props;
    const templateObj = emailTemplates[templateId] || {};
    const templateLang = _get(templateObj, "templateLanguage", "");
    const salutation = _get(templateObj, "salutation", "");
    const exampleText = _get(templateObj, "exampleText", []);
    const leaveReviewText = _get(templateObj, "leaveReviewText", "");
    const regards = _get(templateObj, "regards", []);
    const footer = _get(templateObj, "footer", "");
    return (
      <div className="container">
        <style jsx>
          {`
            .mainContainer {
              border: 1px solid #f5f5f5;
              padding: 30px;
            }
            .headerText {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .header {
              // margin-bottom: 30px;
              text-decoration: underline;
            }
            .subject {
              padding: 10px;
              border: 1px solid #d8d8d8;
              margin-bottom: 11px;
            }

            .header h6 {
              padding: 0;
              margin: 0;
            }

            .logoContainer {
              width: 150px;
            }
            .logoContainer img {
              max-width: 100%;
              height: auto;
            }
            .bold {
              font-weight: bold;
            }
            .ratings {
              margin-bottom: 50px;
            }
            .templateContainer {
              border: 1px solid #d8d8d8;
              padding: 15px;
            }
            @media screen and (max-width: 335px) {
              .templateContainer {
                font-size: 0.8rem;
              }
            }
          `}
        </style>
        <div className="headerText">Email template preview:</div>
        <div className="mainContainer">
          <div className="subject">
            <div className="header">
              <h6>
                Email Subject:{" "}
                {formData.subject.value !== ""
                  ? formData.subject.value + " "
                  : "Leave a review on Entity and get a gift!"}
              </h6>
            </div>
          </div>
          <div className="templateContainer">
            <p>
              {salutation}{" "}
              <span className="bold">
                {formData.clientName.value !== ""
                  ? formData.clientName.value + " "
                  : "customerName"}
              </span>
            </p>
            <p>
              {exampleText[0] !== undefined
                ? formData.exampleText.value.length > 0
                  ? formData.exampleText.value
                  : exampleText[0] || ""
                : ""}{" "}
              <span className="bold">
                {formData.exampleText.value.length > 0
                  ? ""
                  : formData.entity.value !== ""
                  ? formData.entity.value + " "
                  : "entity domain "}
              </span>
              {exampleText[1] !== undefined
                ? formData.exampleText.value.length > 0 || ""
                  ? ""
                  : exampleText[1] || ""
                : ""}
            </p>
            <p>
              {formData.leaveReviewText.value.length > 0
                ? formData.leaveReviewText.value
                : leaveReviewText}
            </p>
            <p className="ratings">
              <StarRatings
                rating={0}
                starRatedColor="#21bc61"
                starDimension="24px"
                starSpacing="0.5px"
                numberOfStars={5}
                name="rating"
              />
            </p>
            <p className="salutation">
              <div>{regards[0] || ""}</div>
              <div>
                {templateLang !== "latvian"
                  ? regards[1] + " " + formData.entity.value || ""
                  : formData.entity.value + " " + regards[1]}
              </div>
              <div>{regards[2] || ""}</div>
            </p>
            <p>
              <div className="logoContainer">
                <img src="/static/business/index/images/gradientLogo.png" />
              </div>
            </p>
            <div>{footer}</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      isLoading,
      isCampaignEditMode,
      navigateToCampaignManagement
    } = this.props;
    return (
      <>
        {isCampaignEditMode ? (
          <div style={{ float: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToCampaignManagement}
              startIcon={<ArrowBackIcon />}
            >
              Go Back To Campaign History
            </Button>
          </div>
        ) : null}
        {this.renderSendInvitationsHeader()}
        {this.renderSendInvitationsBody()}
        {this.renderTemplate()}
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
  const domain = _get(auth, "logIn.userProfile.business_profile.domain", "");
  const socialArray = _get(
    auth,
    "logIn.userProfile.business_profile.social",
    []
  );
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
    domain,
    socialArray
  };
};

export default connect(mapStateToProps)(SendInvitations);
