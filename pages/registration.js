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
  facebookAppId
} from "../utility/config";
import Router from "next/router";
import Loader from "../Components/Widgets/Loader/Loader";
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';

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
    const { signUp } = this.props
    const { formData } = this.state;
    let reqBody = this.createReqBody(formData, registerApi);
    signUp(reqBody, registerApi)
  };

  OAuthSignup = (response, name) => {
    console.log(response, "res");
    const { signUp } = this.props
    let reqBody = {}
    if (name === 'google') {
      reqBody = {
        provider: name,
        data: {
          id_token: _get(response, "Zi.id_token", "")
        }
      }
    } else if (name === 'facebook') {
      reqBody = {
        provider: name,
        data: {
          accessToken: response.accessToken
        }
      }
    }
    signUp(reqBody, registerApiOAuth)
  };

  render() {
    const { formData, errorMsg } = this.state;
    const { signUp, signUpTemp } = this.props.auth
    if (_get(signUp, 'signUpSuccess', false)) {
      // let him login directly
      Router.push('/login')
    }
    if (_get(signUpTemp, 'status', 0) === 409) {
      console.log('sending to login')
      // we need to push to login page with this email id with a email already registered message
      // Router.push('/login')
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
                {_get(signUpTemp, 'isSignupFailed', false) ?
                  _get(signUpTemp, 'status', 0) === 409 ? <p className="errorMsg">Email already registered</p> :
                    <p className="errorMsg">Something went wrong!</p> : ""
                }
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
                  appId={facebookAppId}
                  // autoLoad={true}
                  fields="name,email,picture"
                  // scope="public_profile,user_friends,user_actions.books"
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

const mapStateToProps = state => {
  const { auth } = state
  return { auth }
}

export default connect(mapStateToProps, { signUp })(Registration);
