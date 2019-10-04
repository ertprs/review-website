import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import { baseURL, resetPasswordApi } from "../utility/config";
import Loader from "../Components/Widgets/Loader/Loader";
import Router from "next/router";
import Layout from "../hoc/layout/layout";
import Snackbar from "../Components/Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import { verifyToken } from "../store/actions/authActions";
import { connect } from "react-redux";
import {
  VERIFY_RESET_PASSWORD_TOKEN_INIT,
  VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
  VERIFY_RESET_PASSWORD_TOKEN_FAILURE
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
    isLoading: true,
    isTokenValid: false,
    token: "",
    success: false,
    isLoadingButton: false,
    showError: false,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };

  componentDidMount() {
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
    this.setState({ isLoadingButton: true });
    const { formData, token } = this.state;
    const reqBody = {
      password: _get(formData, "password.value", ""),
      token
    };
    axios
      .post(`${baseURL}${resetPasswordApi}`, reqBody)
      .then(result => {
        this.setState({ isLoadingButton: false });
        let success = _get(result, "data.success", false);
        if (success) {
          this.setState({
            showError: false,
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Password reset successfully!"
          });
          Router.push("/login");
        }
      })
      .catch(error => {
        this.setState({
          showError: false,
          showSnackbar: true,
          variant: "error",
          snackbarMsg: "Something went wrong!",
          isLoading: false,
          showError: true
        });
      });
  };

  onLoginClick = () => {
    Router.push("/login");
  };

  showData = () => {
    const { type, success } = this.props;
    const { formData, showError, isLoadingButton } = this.state;
    let data;
    if (type === VERIFY_RESET_PASSWORD_TOKEN_INIT) {
      data = (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={30} color="secondary" />
        </div>
      );
    }
    if (
      !success &&
      (type === VERIFY_RESET_PASSWORD_TOKEN_SUCCESS ||
        type === VERIFY_RESET_PASSWORD_TOKEN_FAILURE)
    ) {
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

    if (type === VERIFY_RESET_PASSWORD_TOKEN_SUCCESS && success) {
      data = (
        <React.Fragment>
          <div className="cardHeading">
            <style jsx> {authenticationPageStyles} </style>
            <h3> Create new password </h3>
          </div>
          <FormField
            {...formData.password}
            handleChange={this.handleChange}
            type="password"
            id="password"
            rows="5"
            col="5"
          />
          {isLoadingButton ? (
            <Loader />
          ) : (
            <button
              disabled={!formData.password.valid}
              className="registerBtn"
              onClick={this.handleResetPasswordClick}
            >
              Reset Password
            </button>
          )}
          {showError ? <p className="errorMsg">Something went wrong!</p> : ""}
        </React.Fragment>
      );
    }
    return data;
  };

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
  const { verifyTokenTemp } = auth;
  const type = _get(auth, "type", "");
  const success = _get(verifyTokenTemp, "success", false);
  return { type, success };
};

export default connect(
  mapStateToProps,
  { verifyToken }
)(ResetPassword);
