import React, { Component } from "react";
import FormField from "../../Widgets/FormField/FormField";
import StarRatings from "react-star-ratings";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import _get from "lodash/get";
import { emailTemplates } from "../../../utility/emailTemplates/emailTemplates";
import { connect } from "react-redux";
import Snackbar from "../../Widgets/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { clearCampaignData } from "../../../store/actions/dashboardActions";

class SelectTemplateForm extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };
  renderHeader = () => {
    return (
      <div className="container">
        <style jsx>
          {`
            .header {
              font-weight: lighter;
            }
            .subHeader {
              font-weight: lighter;
              margin-top: 22px;
              margin-bottom: 50px;
            }
            @media screen and (max-width: 400px) {
              .header {
                font-size: 1.3rem;
              }
              .subHeader {
                font-size: 0.9rem;
              }
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-12">
            <h3 className="header">Create your invitation email</h3>
            <h6 className="subHeader">
              Use our optimized invitation email template or customize it to fit
              your brand. You can modify the text below.
            </h6>
          </div>
        </div>
      </div>
    );
  };

  renderBody = () => {
    return (
      <div className="container">
        <div className="row">
          {/* <div className="col-md-4">{this.renderFormFields()}</div> */}
          <div className="col-md-12">{this.renderTemplate()}</div>
        </div>
      </div>
    );
  };

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
      <div>
        <style jsx>
          {`
            .header {
              // margin-bottom: 30px;
              text-decoration: underline;
              display: block;
              font-weight: bold;
              font-size: 16px;
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
        <div className="subject">
          <div className="header">
            Email Subject:{" "}
            <FormField
              {...formData["subject"]}
              id="subject"
              handleChange={e => {
                this.props.handleChange(e, "subject", "selectTemplateData");
              }}
              parentStyles={{
                display: "inline-block",
                width: "80%",
                margin: "0px 10px",
                padding: "0"
              }}
              styles={{
                border: "1px dotted grey"
              }}
            />
          </div>
          {/* {formData.subject.value !== ""
                ? formData.subject.value + " "
                : "Leave a review on Entity and get a gift!"} */}
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
          <span>
            <FormField
              {...formData["exampleText"]}
              id="exampleText"
              handleChange={e => {
                this.props.handleChange(e, "exampleText", "selectTemplateData");
              }}
              rows={2}
              parentStyles={{
                display: "inline-block",
                width: "100%",
                margin: "0px 10px",
                padding: "0"
              }}
              styles={{
                border: "1px dotted grey",
                lineHeight: "1.2"
              }}
            />
            {/* {exampleText[0] !== undefined
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
              : ""} */}
          </span>
          <span>
            <FormField
              {...formData["leaveReviewText"]}
              id="leaveReviewText"
              handleChange={e => {
                this.props.handleChange(
                  e,
                  "leaveReviewText",
                  "selectTemplateData"
                );
              }}
              parentStyles={{
                display: "inline-block",
                width: "100%",
                margin: "0px 10px",
                padding: "0"
              }}
              styles={{
                border: "1px dotted grey"
              }}
            />
            {/* {formData.leaveReviewText.value.length > 0
              ? formData.leaveReviewText.value
              : leaveReviewText} */}
          </span>
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
              {templateLang !== "latvian" ? (
                <>
                  {regards[1]}
                  <FormField
                    {...formData["entity"]}
                    id="entity"
                    handleChange={e => {
                      this.props.handleChange(
                        e,
                        "entity",
                        "selectTemplateData"
                      );
                    }}
                    parentStyles={{
                      display: "inline-block",
                      width: "25%",
                      margin: "0px 10px",
                      padding: "0"
                    }}
                    styles={{
                      border: "1px dotted grey",
                      padding: "0px 10px"
                    }}
                  />
                </>
              ) : (
                <div>
                  <FormField
                    {...formData["entity"]}
                    id="entity"
                    handleChange={e => {
                      this.props.handleChange(
                        e,
                        "entity",
                        "selectTemplateData"
                      );
                    }}
                    parentStyles={{
                      display: "inline-block",
                      width: "25%",
                      marginRight: "10px",
                      padding: "0"
                    }}
                    styles={{
                      border: "1px dotted grey",
                      padding: "0px 10px"
                    }}
                  />
                  {regards[1]}
                </div>
              )}
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
    );
  };

  renderFormFields = () => {
    const { formData } = this.props;
    let output = [];
    for (let item in formData) {
      if (item !== "clientName") {
        output = [
          ...output,
          <>
            <div className="col-md-12">
              <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                {formData[item].labelText} :
              </div>
            </div>
            <div className="col-md-12">
              <FormField
                {...formData[item]}
                id={item}
                handleChange={e => {
                  this.props.handleChange(e, item, "selectTemplateData");
                }}
              />
            </div>
          </>
        ];
      }
    }
    return [...output];
  };

  componentDidUpdate(prevProps) {
    const {
      isLoading,
      success,
      errorMsg,
      clearCampaignData,
      createCampaignData
    } = this.props;
    if (this.props !== prevProps) {
      if (success === true && !isLoading) {
        this.setState(
          {
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Sample email Sent Successfully!"
          },
          () => {
            clearCampaignData({
              isLoading: false,
              errorMsg: "",
              quotaDetails: _get(createCampaignData, "quotaDetails", {}),
              success: "undefined"
            });
          }
        );
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
    const { formData, isLoading } = this.props;
    let valid = true;
    for (let item in formData) {
      valid = valid && formData[item].valid;
    }
    return (
      <>
        {this.renderHeader()}
        {this.renderBody()}
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
            <div className="col-md-2">
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowRight />}
                onClick={this.props.handleNext}
                size="small"
                disabled={!valid}
              >
                Continue
              </Button>
            </div>
            <div className="col-md-6">
              {isLoading ? (
                <Button variant="contained" color="primary" size="large">
                  <CircularProgress color={"#f1f1f1"} size={16} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.handleNext("isTestEmail")}
                  size="small"
                >
                  Send sample template on my mail
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
  // const templateId = _get(dashboardData, "emailTemplate.template.id", "");
  const createCampaignRes = _get(dashboardData, "createCampaign", {});
  const isLoading = _get(createCampaignRes, "isLoading", false);
  const success = _get(createCampaignRes, "success", "undefined");
  const errorMsg = _get(createCampaignRes, "errorMsg", "");
  const createCampaignData = _get(dashboardData, "createCampaign", {});
  return { isLoading, success, errorMsg, createCampaignData };
};

export default connect(mapStateToProps, { clearCampaignData })(
  SelectTemplateForm
);
