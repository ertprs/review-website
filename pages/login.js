import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Layout from "../hoc/layout/layout";
import {
  baseURL,
  loginApi,
  googleClientId,
  facebookAppId,
  loginApiOAuth
} from "../utility/config";
import Router from "next/router";
import Loader from "../Components/Widgets/Loader/Loader";
import { connect } from 'react-redux';
import { logIn } from '../store/actions/authActions';

class Login extends Component {
  state = {
    formData: {
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
          required: true
        },
        name: "password"
      }
    },
    isLoading: false,
    isUnauthorized: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { formData } = this.state
    if (this.props !== prevProps) {
      let isWrongCredentials = _get(this.props, 'auth.logInTemp.isWrongCredentials', false)
      if (isWrongCredentials) {
        this.setState({
          formData: { ...formData, password: { ...formData.password, value: "" } }
        })
      }
    }
  }

  handleChange = (e, id) => {
    const { value } = e.target;
    const { formData } = this.state;
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

  handleLoginClick = () => {
    const { formData } = this.state;
    const { logIn } = this.props
    let reqBody = this.createReqBody(formData);
    logIn(reqBody, loginApi, 1)
  };

  OAuthSignIn = (response, name) => {
    console.log(response, "res");
    const { logIn } = this.props
    let reqBody = {}
    let loginType = 0
    if (name === 'google') {
      reqBody = {
        provider: name,
        data: {
          id_token: _get(response, "Zi.id_token", "")
        }
      }
      logIn(reqBody, loginApiOAuth, 3)
    } else if (name === 'facebook') {
      reqBody = {
        provider: name,
        data: {
          accessToken: response.accessToken
        }
      }
      logIn(reqBody, loginApiOAuth, 2)
    }
  };

  render() {
    const { formData } = this.state;
    const { logIn, logInTemp } = this.props.auth
    if (_get(logIn, 'authorized', false)) {
      Router.push('/')
    }
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>{" "}
              <div className="card">
                <div className="cardHeading">
                  <h4> Login to read and write reviews </h4>{" "}
                </div>{" "}
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
                <a className="forgotPasswordLink" href="/forgot-password">
                  Forgot password?
                </a>
                {_get(logInTemp, 'isLoggingIn', false) ? (
                  <Loader />
                ) : (
                    <button
                      disabled={
                        !(formData.email.valid && formData.password.valid)
                      }
                      className="registerBtn"
                      onClick={this.handleLoginClick}
                    >
                      Login
                  </button>
                  )}
                {_get(logInTemp, 'isWrongCredentials', false) ? <p className="errorMsg">
                  Please enter the correct credentials.
                </p> : _get(logInTemp, 'isLoginFailed', false) ? <p className="errorMsg">
                    Some error occured!
                </p> : ""}
                <GoogleLogin
                  clientId={googleClientId}
                  render={renderProps => (
                    <button
                      className="loginBtn loginBtn--google"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Login with Google
                    </button>
                  )}
                  onSuccess={response => this.OAuthSignIn(response, "google")}
                  onFailure={response => this.OAuthSignIn(response, "google")}
                  cookiePolicy={"single_host_origin"}
                />
                <FacebookLogin
                  appId={facebookAppId}
                  // autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  callback={response => this.OAuthSignIn(response, "facebook")}
                  render={renderProps => (
                    <button
                      className="loginBtn loginBtn--facebook"
                      onClick={renderProps.onClick}
                    >
                      Login with Facebook
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

export default connect(mapStateToProps, { logIn })(Login);
