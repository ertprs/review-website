import React, { Component } from "react";
import { authenticationPageStyles } from "../Styles/authenticationPageStyles";
import FormField from "../Widgets/FormField/FormField";
import validate from "../../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { loginApi } from "../../utility/config";
import Router from "next/router";
import { connect } from "react-redux";
import { businessLogIn } from "../../store/actions/authActions";
import Snackbar from "../Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import Link from "next/link";

class BusinessUserLogin extends Component {
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
    const { businessLogIn } = this.props;
    let reqBody = this.createReqBody(formData);
    businessLogIn(reqBody, loginApi);
  };

  componentDidUpdate(prevProps, prevState) {
    const { logIn, logInTemp } = _get(this.props, "auth", {});
    const pathname = _get(this.props, "pathname", "");
    const { formData } = this.state;
    const isLoginFailed = _get(logInTemp, "isLoginFailed", false);
    const authorized = _get(logIn, "authorized", false);
    const isLoggingIn = _get(logInTemp, "isLoggingIn", false);
    const error = _get(logInTemp, "error", "Some Error Occured.");
    const isWrongCredentials = _get(logInTemp, "isWrongCredentials", false);
    if (this.props.auth !== prevProps.auth) {
      this.setState({ isLoading: isLoggingIn });
      if (isWrongCredentials) {
        this.setState({
          formData: {
            ...formData,
            password: { ...formData.password, value: "", valid: false }
          }
        });
      }
      if (isLoginFailed) {
        let snackbarMsg = "";
        if (isWrongCredentials) {
          snackbarMsg = "Please enter correct credentials!";
        } else {
          snackbarMsg = error;
        }
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg
        });
      } else if (authorized === true) {
        this.setState(
          {
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Logged in successfully!"
          },
          () => {
            if (pathname) {
              Router.push(pathname);
            } else {
              Router.push("/dashboard");
            }
          }
        );
      }
    }
  }

  handleKeyDown = e => {
    if (e.keyCode == 13) {
      this.handleLoginClick();
    }
  };

  render() {
    const { formData, isLoading } = this.state;
    return (
      <>
        <style jsx> {authenticationPageStyles} </style>{" "}
        <div className="card">
          <div className="cardHeading">
            <h5> Login to your business account </h5>{" "}
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
          <Link href="/forgot-password">
            <a className="forgotPasswordLink">Forgot password?</a>
          </Link>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <button
                disabled={!(formData.email.valid && formData.password.valid)}
                className="registerBtn"
                onClick={this.handleLoginClick}
              >
                Login
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "10px"
                }}
              >
                <Link href="/registration#business">
                  <a>Don't have account? Sign Up</a>
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

export default connect(mapStateToProps, { businessLogIn })(BusinessUserLogin);
