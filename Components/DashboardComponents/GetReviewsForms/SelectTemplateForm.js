import React, { Component } from "react";
import FormField from "../../Widgets/FormField/FormField";
import StarRatings from "react-star-ratings";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import _get from "lodash/get";
import { emailTemplates } from "../../../utility/emailTemplates/emailTemplates";
import { connect } from "react-redux";

class SelectTemplateForm extends Component {
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
          <div className="col-md-4">{this.renderFormFields()}</div>
          <div className="col-md-8">{this.renderTemplate()}</div>
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
            <h6>
              Email Subject:{" "}
              {formData.subject.value !== ""
                ? formData.subject.value + " "
                : "Leave a review on Entity and get a gift!"}
            </h6>
          </div>
        </div>
        <div className="templateContainer">
          {/* <div className="header">
            <h6>
              {formData.subject.value !== ""
                ? formData.subject.value
                : "Leave a review on Entity and get a gift!"}
            </h6>
          </div> */}
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
    );
  };

  renderFormFields = () => {
    const { formData } = this.props;
    let output = [];
    for (let item in formData) {
      if (item !== "clientName") {
        output = [
          ...output,
          <div className="col-md-12">
            <FormField
              {...formData[item]}
              id={item}
              handleChange={e => {
                this.props.handleChange(e, item, "selectTemplateData");
              }}
            />
          </div>
        ];
      }
    }
    return [...output];
  };

  render() {
    const { formData } = this.props;
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
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const templateId = _get(dashboardData, "emailTemplate.template.id", "");
  return { templateId };
};

export default connect(mapStateToProps)(SelectTemplateForm);
