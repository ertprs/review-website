import React, { Component } from "react";
import Select from "react-select";

import select2CountryList from "../../utility/select2CountryList.json";
import { authenticationPageStyles } from "../Styles/authenticationPageStyles";
import FormField from "../Widgets/FormField/FormField";
import countrieslist from "../../utility/newCountryList.json";
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
import OAuthButtons from "../Widgets/oAuthBtns";
import {
  OAUTH_SIGNIN_INIT,
  OAUTH_SIGNIN_END
} from "../../store/actions/actionTypes";
import Link from "next/link";

class InternetUserRegistration extends Component {
  state = {
    formData: {
      name: {
        element: "input",
        value: "",
        placeholder: "Enter your name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        name: "name"
      },
      email: {
        element: "input",
        value: "",
        placeholder: "email@gmail.com",
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
        value: "",
        placeholder: "Enter your password",
        element: "input",
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
        validationRules: {
          required: true
        },
        name: "password_confirmation"
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
    oAuthLoading: false,
    tabValue: 0
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
              value,
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
              value,
              touched: true
            }
          }
        });
      }
    } else if (id === "password") {
      let valid = value === _get(formData, "password_confirmation.value", "");
      if (valid) {
        this.setState({
          errorMsg: {
            ...errorMsg,
            ["password_confirmation"]: ""
          }
        });
      }
      this.setState({
        formData: {
          ...formData,
          [id]: {
            ...formData[id],
            valid: validate(value, formData[id].validationRules),
            value: value,
            touched: true
          },
          password_confirmation: {
            ...formData["password_confirmation"],
            valid
          }
        }
      });
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
          // if (key !== "password_confirmation") {
          if (formData.hasOwnProperty([key])) {
            reqBody[key] = formData[key].value;
          }
          // }
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

  a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }

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
        let snackbarMsg = "Registration Successfull!";
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

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  render() {
    const { formData, errorMsg, oAuthLoading } = this.state;
    const { signUpTemp } = this.props.auth;
    if (_get(signUpTemp, "status", 0) === 409) {
      // ? This will redirect the user to login page with email prefilled in case of already registered.
      // const { redirectToLoginWithEmail } = this.props
      // let email = _get(this.state, 'formData.email.value', '')
      // redirectToLoginWithEmail(email)
    }
    return (
      <>
        <style jsx> {authenticationPageStyles} </style>{" "}
        <div className="card">
          <div className="cardHeading">
            <h3> Create a free account </h3>{" "}
          </div>{" "}
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
          <span className="errorMsg">
            {" "}
            {_get(errorMsg, "password_confirmation", "")}{" "}
          </span>{" "}
          {/* <FormField
            {...formData.country}
            handleChange={this.handleChange}
            id="country"
            rows="5"
            col="5"
            styles={{ height: "38px" }}
          /> */}
          <div style={{marginBottom:"1rem"}}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="countries-list"
              placeholder="Select your country..."
              options={select2CountryList}
              onChange={valObj => {
                let e = {};
                e.target = valObj || {};
                e.target = {
                  ...e.target,
                  value: valObj ? valObj.value.toString() : "",
                  numericCode: valObj ? valObj.value : ""
                };
                this.handleChange(e, "country");
              }}
            />
          </div>
          {_get(signUpTemp, "isSigningUp", false) ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <button
                disabled={
                  !(
                    formData.name.valid &&
                    formData.email.valid &&
                    formData.password.valid &&
                    formData.password_confirmation.valid &&
                    formData.country.valid
                  )
                }
                className="registerBtn"
                onClick={this.handleRegisterClick}
              >
                Register
              </button>
            </>
          )}
          {oAuthLoading ? (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <OAuthButtons />
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
            </>
          )}
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

export default connect(mapStateToProps, { signUp, redirectToLoginWithEmail })(
  InternetUserRegistration
);
