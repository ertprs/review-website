import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Layout from "../hoc/layout/layout";
import {
  baseURL,
  loginApi,
  googleClientId,
  facebookClientId,
  loginApiOAuth
} from "../utility/config";
import Router from "next/router";
import Loader from "../Components/Widgets/Loader/Loader";

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
    console.log(reqBody, "reqBody");
    return reqBody;
  };

  handleLoginClick = () => {
    this.setState({ isLoading: true });
    const { formData } = this.state;
    let reqBody = this.createReqBody(formData);
    axios
      .post(`${baseURL}${loginApi}`, reqBody)
      .then(result => {
        this.setState({ isLoading: false });
        let success = _get(result, 'data.success', false)
        if (success) {
          this.setState({ isUnauthorized: false })
          window.location.assign('/')
          let token = _get(result, "data.token", "");
          localStorage.setItem("token", token);
        }
      })
      .catch(error => {
        console.log(error.response, "login error");
        let message = _get(error, 'response.data.message', '') === 'Unauthorized'
        if (message) {
          this.setState({ isUnauthorized: true })
        }
        this.setState({
          isLoading: false,
          formData: {
            ...formData,
            password: {
              ...formData.password,
              value: ""
            }
          }
        });
      });
  };

  OAuthSignIn = (response, name) => {
    console.log(response, "res");
    const reqBody = {
      provider: name,
      data: {
        id_token: _get(response, "Zi.id_token", "")
      }
    };
    axios
      .post(`${baseURL}${loginApiOAuth}`, reqBody)
      .then(result => {
        console.log("oauth login result", result);
        let success = _get(result, 'data.success', false)
        if (success) {
          this.setState({ isUnauthorized: false })
          let token = _get(result, "data.token", "");
          localStorage.setItem("token", token);
          window.location.assign('/')
        }
      })
      .catch(error => {
        console.log("oauth login error", error);
      });
  };

  render() {
    const { formData, isLoading, isUnauthorized } = this.state;
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
                {isLoading ? (
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
                {isUnauthorized ? <p className="errorMsg">
                  Please enter the correct credentials.
                </p> : ''}
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
                  appId={facebookClientId}
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

export default Login;
