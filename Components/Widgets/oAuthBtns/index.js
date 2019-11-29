import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { registerApiOAuth } from "../../../utility/config";
import styles from "./oAuthStyles";
import { signUp } from "../../../store/actions/authActions";
import { connect } from "react-redux";
import _get from "lodash/get";
import { oAuthSigninginInit } from "../../../store/actions/authActions";

class OAuthButtons extends Component {
  OAuthSignIn = (response, name, signupType) => {
    const { signUp, oAuthSigninginInit } = this.props;
    let reqBody = {};
    if (response.hasOwnProperty("accessToken")) {
      oAuthSigninginInit();
      if (name === "google") {
        reqBody = {
          provider: name,
          data: {
            id_token: _get(response, "Zi.id_token", "")
          }
        };
        signUp(reqBody, registerApiOAuth, signupType);
      } else if (name === "facebook") {
        reqBody = {
          provider: name,
          data: {
            accessToken: response.accessToken
          }
        };
        signUp(reqBody, registerApiOAuth, signupType);
      }
    }
  };

  componentClicked = res => {};

  render() {
    const { disabled } = this.props;
    return (
      <div>
        <style jsx>{styles}</style>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          disabled={disabled}
          render={renderProps => (
            <button
              className="loginBtn loginBtn--google"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Continue with Google
            </button>
          )}
          onSuccess={response => this.OAuthSignIn(response, "google", 3)}
          onFailure={response => this.OAuthSignIn(response, "google", 3)}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          // autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={response => this.OAuthSignIn(response, "facebook", 2)}
          render={renderProps => (
            <button
              className="loginBtn loginBtn--facebook"
              onClick={renderProps.onClick}
              disabled={disabled}
            >
              Continue with Facebook
            </button>
          )}
        />
      </div>
    );
  }
}

export default connect(null, { signUp, oAuthSigninginInit })(OAuthButtons);
