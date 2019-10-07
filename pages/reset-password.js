import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { resetPasswordApi } from "../utility/config";
import Router from "next/router";
import Layout from "../hoc/layout/layout";
import Snackbar from "../Components/Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import { verifyToken, resetPassword } from "../store/actions/authActions";
import { connect } from "react-redux";
import {
  VERIFY_RESET_PASSWORD_TOKEN_INIT,
  VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
  VERIFY_RESET_PASSWORD_TOKEN_FAILURE,
  RESET_PASSWORD_INIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from "../store/actions/actionTypes";

class ResetPassword extends Component {
  state = {
    formData: {
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
      }
    },
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    const { type } = this.props;
    const { verifyToken } = this.props;
    const url = window.location.href;
    if (
      type === VERIFY_RESET_PASSWORD_TOKEN_SUCCESS ||
      type === VERIFY_RESET_PASSWORD_TOKEN_FAILURE
    ) {
      return;
    } else {
      verifyToken(url, resetPasswordApi);
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

  handleResetPasswordClick = () => {
    const { resetPassword } = this.props;
    const url = window.location.href;
    let password = _get(this.state, "formData.password.value", "");
    resetPassword(password, url, resetPasswordApi);
  };

  onLoginClick = () => {
    Router.push("/login");
  };

  handleKeyDown = e => {
    if (e.keyCode == 13) {
      this.handleResetPasswordClick();
    }
  };

  showData = () => {
    const { type, success, verifyingToken, resetingPassword } = this.props;
    const { formData } = this.state;
    let data;
    if (verifyingToken) {
      data = (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={30} color="secondary" />
        </div>
      );
    }
    if (!success && !verifyingToken) {
      data = (
        <React.Fragment>
          <div className="cardHeading">
            <style jsx> {authenticationPageStyles} </style>
            <h3 style={{ color: "red" }}>Your token has expired!</h3>
          </div>
          <button className="registerBtn" onClick={this.onLoginClick}>
            Go to Login
          </button>
        </React.Fragment>
      );
    }

    if (success) {
      data = (
        <React.Fragment>
          <div className="cardHeading">
            <style jsx> {authenticationPageStyles} </style>
            <h3> Create new password </h3>
          </div>
          <FormField
            {...formData.password}
            handleChange={this.handleChange}
            onkeyDown={this.handleKeyDown}
            type="password"
            id="password"
            rows="5"
            col="5"
          />
          {resetingPassword === true ? (
            <div style={{ textAlign: "center " }}>
              <CircularProgress />
            </div>
          ) : (
            <button
              disabled={!formData.password.valid}
              className="registerBtn"
              onClick={this.handleResetPasswordClick}
            >
              Reset Password
            </button>
          )}
        </React.Fragment>
      );
    }
    return data;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth !== prevProps.auth) {
      const { type, resetPasswordSuccess } = this.props;
      if (resetPasswordSuccess && type === RESET_PASSWORD_SUCCESS) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Password reset successully!"
        });
        setTimeout(() => {
          this.setState({
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Redirecting to login..."
          });
          setTimeout(() => {
            Router.push("/login");
          }, 1000);
        }, 2000);
      } else if (
        (type === RESET_PASSWORD_SUCCESS || type === RESET_PASSWORD_FAILURE) &&
        !resetPasswordSuccess
      ) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: "Your token has expired. Please try again!"
        });
      }
    }
  }

  render() {
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>
              <div className="card">{this.showData()}</div>
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
  const { verifyTokenTemp, resetPasswordTemp } = auth;
  const type = _get(auth, "type", "");
  const success = _get(verifyTokenTemp, "success", false);
  const resetPasswordSuccess = _get(resetPasswordTemp, "success", false);
  const verifyingToken = _get(verifyTokenTemp, "verifyingToken", "undefined");
  const resetingPassword = _get(
    resetPasswordTemp,
    "resetingPassword",
    "undefined"
  );
  return {
    auth,
    type,
    success,
    resetPasswordSuccess,
    verifyingToken,
    resetingPassword
  };
};

export default connect(
  mapStateToProps,
  { verifyToken, resetPassword }
)(ResetPassword);
