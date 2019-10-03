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
import Snackbar from '../Components/Widgets/Snackbar';
import { CircularProgress } from '@material-ui/core';

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
    token: '',
    success: false,
    isLoadingButton: false,
    showError: false,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };

  componentDidMount() {
    const url = window.location.href;
    if (url) {
      let splitUrlArray = url.split("/");
      let token = "";
      if (!_isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
        token = splitUrlArray[splitUrlArray.length - 1];
      }
      if (token) {
        this.setState({ token })
        let reqBody = {
          token: token
        }
        axios
          .post(`${baseURL}${resetPasswordApi}`, reqBody)
          .then(result => {
            let success = _get(result, "data.success", false);
            if (success) {
              this.setState({ isTokenValid: true })
            }
            this.setState({ success, isLoading: false });
          })
          .catch(error => {
            let success = _get(error, "response.data.success", false);
            this.setState({ success, isLoading: false, isTokenValid: false });
          });
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
          this.setState({ showError: false })
          window.location.assign("/login");
        }
      })
      .catch(error => {
        this.setState({ isLoading: false, showError: true });
      });
  };

  onLoginClick = () => {
    window.location.assign('/login')
  }

  render() {
    const { formData, isLoading, isTokenValid, showError, isLoadingButton } = this.state;
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>{" "}
              <div className="card">
                {isLoading ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress size={30} color="secondary" />
                  </div>
                ) : isTokenValid ? (
                  <React.Fragment>
                    <div className="cardHeading">
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
                    {isLoadingButton ? <Loader /> : <button
                      disabled={!formData.password.valid}
                      className="registerBtn"
                      onClick={this.handleResetPasswordClick}
                    >
                      Reset Password
                  </button>}
                    {showError ? <p className="errorMsg">Something went wrong!</p> : ""}
                  </React.Fragment>
                ) :
                    <React.Fragment>
                      <div className="cardHeading">
                        <h2 className="errorMsg">Something went wrong!</h2>
                      </div>
                      <button className="registerBtn" onClick={this.onLoginClick}>
                        Go to Login
                      </button>
                    </React.Fragment>
                }
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

export default ResetPassword;
