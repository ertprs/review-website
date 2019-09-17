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
import axios from "axios";
import {
  baseURL,
  registerApi,
  registerApiOAuth,
  googleClientId,
  facebookClientId
} from "../utility/config";
import Router from "next/router";
import Loader from "../Components/Widgets/Loader/Loader";

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
    success: false
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
    console.log(reqBody, "reqBody");
    return reqBody;
  };

  handleRegisterClick = () => {
    this.setState({ isLoading: true });
    const { formData } = this.state;
    let reqBody = this.createReqBody(formData);
    axios
      .post(`${baseURL}${registerApi}`, reqBody)
      .then(res => {
        let success = _get(res, 'data.success', false)
        this.setState({ isLoading: false });
        if (success) {
          this.setState({ isRegistrationFailed: false })
          window.location.assign('/afterRegistration')
        }
      })
      .catch(error => {
        console.log(error, "registration error");
        let status = _get(error, 'response.status', 0)
        if (status === 409) {
          //navigate user to login page with email id prefilled
          this.setState({ isRegistrationFailed: false })
        } else {
          this.setState({ isRegistrationFailed: true })
        }
        this.setState({ isLoading: false });
      });
  };

  OAuthSignup = (response, name) => {
    console.log(response, "res");
    const reqBody = {
      provider: name,
      data: {
        id_token: _get(response, "Zi.id_token", "")
      }
    };
    axios
      .post(`${baseURL}${registerApiOAuth}`, reqBody)
      .then(result => {
        let success = _get(error, 'response.data.success', false)
        if (success) {
          this.setState({ isLoading: false, isRegistrationFailed: false })
          window.location.assign('/')
        }
        console.log("oauth register result", result);
      })
      .catch(error => {
        let status = _get(error, 'response.status', 0)
        let success = _get(error, 'response.data.success', false)
        if (status == 409 && !success) {
          // navigate him to login
        } else {
          alert('Some error occured!')
        }
        console.log("oauth register error", error);
      });
  };

  render() {
    const { formData, errorMsg, isLoading, isRegistrationFailed } = this.state;
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
                {isLoading ? (
                  <Loader />
                ) : (
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
                  )}
                {isRegistrationFailed ? <p className="errorMsg">Something went wrong!</p>
                  : ''}
                <GoogleLogin
                  clientId={googleClientId}
                  render={renderProps => (
                    <button
                      className="loginBtn loginBtn--google"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Signup with Google
                    </button>
                  )}
                  buttonText="Login with Google"
                  onSuccess={response => this.OAuthSignup(response, "google")}
                  onFailure={response => this.OAuthSignup(response, "google")}
                  cookiePolicy={"single_host_origin"}
                />
                <FacebookLogin
                  appId={facebookClientId}
                  // autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  callback={response => this.OAuthSignup(response, "facebook")}
                  render={renderProps => (
                    <button
                      className="loginBtn loginBtn--facebook"
                      onClick={renderProps.onClick}
                    >
                      Signup with Facebook
                    </button>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Registration;
