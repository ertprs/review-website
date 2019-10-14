import React, { Component } from "react";
import { authenticationPageStyles } from "../Styles/authenticationPageStyles";
import FormField from "../Widgets/FormField/FormField";
import countrieslist from "../../utility/countryList";
import validate from "../../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { registerApi } from "../../utility/config";
import Router from "next/router";
import { connect } from "react-redux";
import {
  signUp,
  redirectToLoginWithEmail
} from "../../store/actions/authActions";
import Snackbar from "../Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import Link from "next/link";

class BusinessUserRegistration extends Component {
  state = {
    formData: {
      website: {
        element: "input",
        value: "",
        placeholder: "Enter your website name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        name: "website name"
      },
      companyName: {
        element: "input",
        value: "",
        placeholder: "Enter your company name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        name: "companyName"
      },
      fullName: {
        element: "input",
        value: "",
        placeholder: "Enter your full name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "fullName"
      },
      workEmail: {
        element: "input",
        value: "",
        placeholder: "email@yourdomain.com",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "workEmail"
      },
      password: {
        element: "input",
        value: "",
        placeholder: "Enter your password",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 8
        },
        name: "password"
      },
      password_confirmation: {
        element: "input",
        value: "",
        placeholder: "Please confirm your password",
        errorMessage: "",
        valid: false,
        touched: false,
        type: "number",
        validationRules: {
          required: true
        },
        name: "password_confirmation"
      },
      phoneNumber: {
        element: "input",
        value: "",
        placeholder: "+91-7985757646",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "phoneNumber"
      },
      country: {
        element: "select",
        name: "country",
        value: "",
        options: [...countrieslist],
        placeholder: "Select your country",
        valid: false,
        validationRules: {
          required: true
        },
        touched: false,
        errorMessage: ""
      }
    },
    errorMsg: {
      password_confirmation: ""
    },
    isLoading: false,
    isRegistrationFailed: false,
    success: false,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    oAuthLoading: false
  };

  handleChange = (e, id) => {
    const { value } = e.target;
    const { formData, errorMsg } = this.state;
    if (id === "password_confirmation") {
      let valid = value === _get(formData, "password.value", "");
      if (!valid) {
        this.setState({
          errorMsg: {
            ...errorMsg,
            [id]: "Password do not match!"
          },
          formData: {
            ...formData,
            [id]: {
              ...formData[id],
              valid: false,
              value: value,
              touched: true
            }
          }
        });
      } else {
        this.setState({
          errorMsg: {
            ...errorMsg,
            [id]: ""
          },
          formData: {
            ...formData,
            [id]: {
              ...formData[id],
              valid: true,
              value: value,
              touched: true
            }
          }
        });
      }
    } else {
      this.setState({
        formData: {
          ...formData,
          [id]: {
            ...formData[id],
            value: value,
            valid: validate(value, formData[id].validationRules),
            touched: true
          }
        }
      });
    }
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

  handleRegisterClick = () => {
    const { signUp } = this.props;
    const { formData } = this.state;
    let reqBody = this.createReqBody(formData, registerApi);
    signUp(reqBody, registerApi, 1);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth !== prevProps.auth) {
      const { signUpTemp, type, logIn } = this.props.auth;
      const isSignUpFailed = _get(signUpTemp, "isSignupFailed", false);
      const isSignupSuccess = _get(signUpTemp, "signUpSuccess", false);
      const authorized = _get(logIn, "authorized", false);
      const oAuthSignUpSuccess = _get(
        signUpTemp,
        "oAuthSignUpSuccess",
        "undefined"
      );

      if (type === OAUTH_SIGNIN_INIT) {
        this.setState({ oAuthLoading: true });
      }

      if (type === OAUTH_SIGNIN_END) {
        this.setState({ oAuthLoading: false });
      }

      if (authorized) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Logged in successfully!"
        });
        setTimeout(() => {
          this.setState({
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Redirecting..."
          });
          setTimeout(() => {
            Router.push("/");
          }, 1000);
        }, 1000);
      }

      if (isSignUpFailed) {
        let snackbarMsg =
          _get(signUpTemp, "status", 0) === 409
            ? "Email already registered"
            : "Something went wrong!";
        this.setState({ showSnackbar: true, variant: "error", snackbarMsg });
        setTimeout(() => {
          this.setState({
            snackbarMsg: "Redirecting to login page",
            variant: "success"
          });
          setTimeout(() => {
            Router.push("/login");
          }, 1000);
        }, 2000);
      } else {
        this.setState({ showSnackbar: false });
      }

      if (isSignupSuccess) {
        let snackbarMsg = "Business Successfull!";
        this.setState({ showSnackbar: true, variant: "success", snackbarMsg });
        setTimeout(() => {
          this.setState({ snackbarMsg: "Redirecting....", variant: "success" });
          setTimeout(() => {
            Router.push("/afterRegistration");
          }, 1000);
        }, 2000);
      }

      if (oAuthSignUpSuccess === false) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: "Some error occured while Sign Up."
        });
      }
    }
  }

  handleKeyDown = e => {
    if (e.keyCode == 13) {
      this.handleRegisterClick();
    }
  };

  render() {
    const { formData, errorMsg, oAuthLoading } = this.state;
    const { signUpTemp } = this.props.auth;
    return (
      <>
        <style jsx> {authenticationPageStyles} </style>{" "}
        <div className="card">
          <div className="cardHeading">
            <h3> Create a free business account </h3>{" "}
          </div>{" "}
          <FormField
            {...formData.website}
            handleChange={this.handleChange}
            id="website"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.companyName}
            handleChange={this.handleChange}
            id="companyName"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.fullName}
            handleChange={this.handleChange}
            id="fullName"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.workEmail}
            handleChange={this.handleChange}
            id="workEmail"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.password}
            handleChange={this.handleChange}
            type="password"
            id="password"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.password_confirmation}
            handleChange={this.handleChange}
            onkeyDown={this.handleKeyDown}
            type="password"
            id="password_confirmation"
            rows="5"
            col="5"
          />
          <span className="errorMsg">
            {" "}
            {_get(errorMsg, "password_confirmation", "")}{" "}
          </span>{" "}
          <FormField
            {...formData.phoneNumber}
            handleChange={this.handleChange}
            onkeyDown={this.handleKeyDown}
            type="password"
            id="phoneNumber"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.country}
            handleChange={this.handleChange}
            id="country"
            rows="5"
            col="5"
            styles={{ height: "38px" }}
          />
          {_get(signUpTemp, "isSigningUp", false) ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <button
                disabled={
                  !(
                    formData.website.valid &&
                    formData.companyName.valid &&
                    formData.fullName.valid &&
                    formData.workEmail.valid &&
                    formData.password.valid &&
                    formData.password_confirmation.valid &&
                    formData.phoneNumber.valid &&
                    formData.country.valid
                  )
                }
                className="registerBtn"
                onClick={this.handleRegisterClick}
              >
                Register your business
              </button>
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "10px"
            }}
          >
            <Link href="/login">
              <a>Already have account? Login</a>
            </Link>
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
  const { auth } = state;
  return { auth };
};

export default connect(
  mapStateToProps,
  { signUp, redirectToLoginWithEmail }
)(BusinessUserRegistration);
