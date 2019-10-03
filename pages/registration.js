import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import countrieslist from "../utility/countryList";
import validate from "../utility/validate";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Layout from "../hoc/layout/layout";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import {
  registerApi,
  registerApiOAuth,
  googleClientId,
  facebookAppId
} from "../utility/config";
import Router from "next/router";
import { connect } from 'react-redux';
import { signUp, redirectToLoginWithEmail } from '../store/actions/authActions';
import Snackbar from '../Components/Widgets/Snackbar';
import { CircularProgress } from '@material-ui/core';
import OAuthButtons from '../Components/Widgets/oAuthBtns';

class Registration extends Component {
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
    snackbarMsg: ""
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
    const { signUp } = this.props
    const { formData } = this.state;
    let reqBody = this.createReqBody(formData, registerApi);
    signUp(reqBody, registerApi, 1)
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth !== prevProps.auth) {
      const { signUpTemp } = this.props.auth
      const isSignUpFailed = _get(signUpTemp, 'isSignupFailed', false)
      const isSignupSuccess = _get(signUpTemp, 'signUpSuccess', false)
      if (isSignUpFailed) {
        let snackbarMsg = _get(signUpTemp, 'status', 0) === 409 ? "Email already registered" :
          "Something went wrong!"
        this.setState({ showSnackbar: true, variant: "error", snackbarMsg })
        setTimeout(() => {
          this.setState({ snackbarMsg: "Redirecting to login page", variant: "success" })
          setTimeout(() => {
            Router.push('/login')
          }, 1000)
        }, 2000)
      } else {
        this.setState({ showSnackbar: false })
      }

      if (isSignupSuccess) {
        let snackbarMsg = "Registration Successfull!"
        this.setState({ showSnackbar: true, variant: "success", snackbarMsg })
        setTimeout(() => {
          this.setState({ snackbarMsg: "Redirecting....", variant: "success" })
          setTimeout(() => {
            Router.push('/afterRegistration')
          }, 1000)
        }, 2000)
      }
    }
  }

  render() {
    const { formData, errorMsg } = this.state;
    const { signUpTemp } = this.props.auth
    if (_get(signUpTemp, 'status', 0) === 409) {
      // ? This will redirect the user to login page with email prefilled in case of already registered.
      // const { redirectToLoginWithEmail } = this.props
      // let email = _get(this.state, 'formData.email.value', '')
      // redirectToLoginWithEmail(email)
    }
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
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
                  {...formData.country}
                  handleChange={this.handleChange}
                  id="country"
                  rows="5"
                  col="5"
                />
                {_get(signUpTemp, 'isSigningUp', false) ? (
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
                      <OAuthButtons />
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps, { signUp, redirectToLoginWithEmail })(Registration);
