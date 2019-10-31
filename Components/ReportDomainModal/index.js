import React from "react";
import { reportDomainStyles } from "./reportDomainStyles";
import FormField from "../Widgets/FormField/FormField";
import { connect } from "react-redux";
import Router from "next/router";
import fraudTypeOptions from "../../utility/constants/reportDomainConstants";
import OAuthButtons from "../Widgets/oAuthBtns";
import CircularProgress from "@material-ui/core/CircularProgress";
import _get from "lodash/get";
import Button from "@material-ui/core/Button";
import {
  reportDomain,
  reportDomainAfterLogin
} from "../../store/actions/domainProfileActions";
import _isEmpty from "lodash/isEmpty";
import ReportIcon from "@material-ui/icons/Report";

class ReportDomainModal extends React.Component {
  state = {
    formData: {
      fraudType: {
        element: "select",
        value: "",
        placeholder: "Select Fraud Type",
        errorMessage: "",
        options: fraudTypeOptions,
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "fraudType"
      },
      title: {
        element: "input",
        value: "",
        placeholder: "Title",
        errorMessage: "Please enter the title",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "title"
      },
      description: {
        element: "textarea",
        value: "",
        placeholder: "140 characters to 280",
        errorMessage: "140 to 280 characters ",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 10,
          maxLength: 280
        },
        name: "description"
      }
    },
    isLoading: false,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    authButtonLoading: false
  };

  createReqBody = formData => {
    let reqBody = {};
    if (!_isEmpty(formData)) {
      let ObjectKeysArray = Object.keys(formData);
      if (!_isEmpty(ObjectKeysArray) && Array.isArray(ObjectKeysArray)) {
        ObjectKeysArray.map(key => {
          if (formData.hasOwnProperty([key])) {
            reqBody[key] = formData[key].value;
          }
        });
      }
    }
    return reqBody;
  };

  handleReportClick = () => {
    const { formData } = this.state;
    const { authorized } = this.props;
    const { reportDomain, reportDomainAfterLogin } = this.props;
    let reqBody = this.createReqBody(formData);
    if (authorized) {
      reportDomain(reqBody);
    } else {
      reportDomainAfterLogin(reqBody, true);
      Router.push("/login");
    }
  };

  renderAuthButtons = valid => {
    const { reportDomainData, authorized } = this.props;
    const isLoadingReportDomain = _get(reportDomainData, "isLoading", false);
    const success = _get(reportDomainData, "success", "undefined");
    const errorMsg = _get(reportDomainData, "errorMsg", "Some Error Occured!");
    const { authButtonLoading } = this.state;
    // let msg = "";
    // if (success === true) {
    //   msg = "Reported successfully!";
    // } else if (errorMsg) {
    //   msg = errorMsg;
    // }
    if (!authorized) {
      return (
        <div className="container">
          {authButtonLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : !isLoadingReportDomain ? (
            <>
              <OAuthButtons disabled={!valid} />
              <div style={{ margin: "10px 0px" }}>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  disabled={!valid}
                  onClick={this.handleReportClick}
                >
                  Login and Report
                </Button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", margin: "10px 0px" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          )}
        </div>
      );
    } else if (authorized) {
      return (
        <div className="container">
          {isLoadingReportDomain ? (
            <div style={{ textAlign: "center", margin: "10px 0px" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                disabled={!valid}
                onClick={this.handleReportClick}
                endIcon={<ReportIcon />}
              >
                Report
              </Button>
            </>
          )}
        </div>
      );
    }
  };

  componentDidUpdate(prevProps, nextProps) {
    const { authType } = this.props;
    if (this.props !== prevProps) {
      if (authType === "LOGIN_INIT") {
        this.setState({ authButtonLoading: true });
      } else if (authType === "LOGIN_SUCCESS" || authType === "LOGIN_FAILURE") {
        this.setState({ authButtonLoading: false });
      }
    }
  }

  render() {
    const { formData } = this.state;
    let valid = true;
    for (let item in formData) {
      valid = valid && formData[item].valid;
    }
    return (
      <div>
        <>
          <style jsx>{reportDomainStyles}</style>
          <div className="trustReviewModal">
            <h3 className="heading">Report Fraud Domain</h3>
            <div className="trustReviewModalForm">
              <FormField
                {...formData.fraudType}
                handleChange={(e, id) => this.handleFormDataChange(e, id)}
                id="fraudType"
                rows="5"
                col="5"
                styles={{ height: "38px" }}
              />
              <FormField
                {...formData.title}
                handleChange={(e, id) => this.handleFormDataChange(e, id)}
                id="title"
                rows="5"
                col="5"
              />
              <FormField
                {...formData.description}
                handleChange={(e, id) => this.handleFormDataChange(e, id)}
                id="description"
                rows="5"
                col="5"
              />
              <div className="row">
                <div className="col-md-12"></div>
                {this.renderAuthButtons(valid)}
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, profileData } = state;
  const authorized = _get(auth, "logIn.authorized", false);
  const authType = _get(auth, "type", "");
  const reportDomainData = _get(profileData, "reportDomain", {});
  return { authorized, reportDomainData, authType };
};

export default connect(
  mapStateToProps,
  { reportDomain, reportDomainAfterLogin }
)(ReportDomainModal);
