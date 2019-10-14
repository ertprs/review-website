import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Layout from "../hoc/layout/layout";
import { loginApi } from "../utility/config";
import Router from "next/router";
import { connect } from "react-redux";
import { logIn } from "../store/actions/authActions";
import Snackbar from "../Components/Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import OAuthButtons from "../Components/Widgets/oAuthBtns";
import Link from "next/link";
import {
  OAUTH_SIGNIN_INIT,
  OAUTH_SIGNIN_END
} from "../store/actions/actionTypes";

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
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    oAuthLoading: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    // ? This will redirect the user to login page with email prefilled in case of already registered.
    // const { auth } = this.props
    // const { formData } = this.state
    // if (auth.type == "REDIRECT_TO_LOGIN_WITH_EMAIL") {
    //   const emailPrefill = _get(auth, 'tempEmail.emailPrefill', false)
    //   const email = _get(auth, 'tempEmail.email', '')
    //   if (emailPrefill) {
    //     this.setState({
    //       formData: {
    //         ...formData,
    //         email: { ...formData.email, value: email }
    //       }
    //     })
    //   }
    // }
  }

  componentClicked = res => {};

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
    const { logIn } = this.props;
    let reqBody = this.createReqBody(formData);
    logIn(reqBody, loginApi, 1);
  };

  componentDidUpdate(prevProps, prevState) {
    const { logIn, logInTemp, signUpTemp, type } = this.props.auth;
    console.log(type, "type");
    const { formData } = this.state;
    if (this.props !== prevProps) {
      let isWrongCredentials = _get(
        this.props,
        "auth.logInTemp.isWrongCredentials",
        false
      );
      if (isWrongCredentials) {
        this.setState({
          formData: {
            ...formData,
            password: { ...formData.password, value: "" }
          }
        });
      }
    }
    if (this.props.auth !== prevProps.auth) {
      const isWrongCredentials = _get(logInTemp, "isWrongCredentials", false);
      const isLoginFailed = _get(logInTemp, "isLoginFailed", false);
      const signUpSuccess = _get(signUpTemp, "signUpSuccess", "undefined");
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

      if (oAuthSignUpSuccess === false) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: "Some error occured while Sign Up."
        });
      }

      if (isLoginFailed) {
        if (isWrongCredentials) {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: "Please enter correct credentials!"
          });
        } else {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: "Some Error Occured!"
          });
        }
      } else if (authorized) {
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
    }
  }

  handleKeyDown = e => {
    if (e.keyCode == 13) {
      this.handleLoginClick();
    }
  };

  render() {
    const { formData, oAuthLoading } = this.state;
    const { logIn, logInTemp } = this.props.auth;
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>{" "}
              <div className="card">
                <div className="cardHeading">
                  <h5> Login to read and write reviews </h5>{" "}
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
                  onkeyDown={this.handleKeyDown}
                  type="password"
                  id="password"
                  rows="5"
                  col="5"
                />
                <a className="forgotPasswordLink" href="/forgot-password">
                  Forgot password?
                </a>
                {_get(logInTemp, "isLoggingIn", false) ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress size={30} color="secondary" />
                  </div>
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
                      <Link href="/registration">
                        <a>Don't have account? Sign Up</a>
                      </Link>
                    </div>
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
  const { auth } = state;
  return { auth };
};

export default connect(
  mapStateToProps,
  { logIn }
)(Login);
