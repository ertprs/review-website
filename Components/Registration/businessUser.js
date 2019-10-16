import React, { Component } from "react";
import { authenticationPageStyles } from "../Styles/authenticationPageStyles";
import FormField from "../Widgets/FormField/FormField";
import countrieslist from "../../utility/newCountryList.json";
import validate from "../../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { businessRegisterApi } from "../../utility/config";
import Router from "next/router";
import { connect } from "react-redux";
import { businessSignUp } from "../../store/actions/authActions";
import Snackbar from "../Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import Link from "next/link";

class BusinessUserRegistration extends Component {
  state = {
    formData: {
      website: {
        element: "input",
        value: "",
        placeholder: "https://www.yourdomain.com",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isDomain: true
        },
        name: "website name"
      },
      company: {
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
        name: "company"
      },
      name: {
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
        name: "name"
      },
      email: {
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
        name: "email"
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
      phone: {
        element: "input",
        value: "",
        placeholder: "Enter your phone no.",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "phone"
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
    const { businessSignUp } = this.props;
    const { formData } = this.state;
    let reqBody = this.createReqBody(formData);
    console.log(reqBody, "reqBody");
    businessSignUp(reqBody, businessRegisterApi);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth !== prevProps.auth) {
      const {
        isSignUpFailed,
        isSignupSuccess,
        status,
        errorMsg,
        isSigningUp
      } = this.props;
      this.setState({ isLoading: isSigningUp });

      if (isSignUpFailed) {
        let snackbarMsg;
        if (status === 409) {
          snackbarMsg = "User already registered!";
        } else if (errorMsg === "subscription_exists") {
          snackbarMsg = "Company is already subscribed!";
        } else if (errorMsg === "activation_required") {
          snackbarMsg = "User not activated";
        } else if (errorMsg === "already_claimed") {
          snackbarMsg = "This domain is already claimed!";
        }
        this.setState({ showSnackbar: true, variant: "error", snackbarMsg });
      }

      if (isSignupSuccess) {
        let snackbarMsg = "Registration Successfull!";
        this.setState({ showSnackbar: true, variant: "success", snackbarMsg });
        setTimeout(() => {
          this.setState({ snackbarMsg: "Redirecting....", variant: "success" });
          setTimeout(() => {
            Router.push("/login");
          }, 1000);
        }, 2000);
      }
    }
  }

  handleKeyDown = e => {
    if (e.keyCode == 13) {
      this.handleRegisterClick();
    }
  };

  render() {
    const { formData, isLoading } = this.state;
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
            {...formData.company}
            handleChange={this.handleChange}
            id="company"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.name}
            handleChange={this.handleChange}
            id="name"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.email}
            handleChange={this.handleChange}
            id="email"
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
          <FormField
            {...formData.phone}
            handleChange={this.handleChange}
            onkeyDown={this.handleKeyDown}
            id="phone"
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
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <button
                disabled={
                  !(
                    formData.website.valid &&
                    formData.company.valid &&
                    formData.name.valid &&
                    formData.email.valid &&
                    formData.password.valid &&
                    formData.password_confirmation.valid &&
                    formData.phone.valid &&
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
  const { businessSignUpTemp } = auth;
  const isSignUpFailed = _get(businessSignUpTemp, "isSignupFailed", false);
  const isSignupSuccess = _get(businessSignUpTemp, "signUpSuccess", false);
  const status = _get(businessSignUpTemp, "status", -1);
  const errorMsg = _get(businessSignUpTemp, "errorMsg", "");
  const isSigningUp = _get(businessSignUpTemp, "isSigningUp", false);
  return {
    auth,
    isSignUpFailed,
    isSignupSuccess,
    status,
    errorMsg,
    isSigningUp
  };
};

export default connect(
  mapStateToProps,
  { businessSignUp }
)(BusinessUserRegistration);