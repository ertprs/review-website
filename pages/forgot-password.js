import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import { baseURL, forgotPasswordApi } from "../utility/config";
import Router from "next/router";
import Snackbar from "../Components/Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import Layout from "../hoc/layout/layout";

class ForgotPassword extends Component {
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
      }
    },
    isLoading: false,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
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

  handleForgotPasswordClick = () => {
    this.setState({ isLoading: true });
    const { formData } = this.state;
    const reqBody = {
      email: _get(formData, "email.value", "")
    };
    axios
      .post(`${baseURL}${forgotPasswordApi}`, reqBody)
      .then(result => {
        this.setState({ isLoading: false });
        let success = _get(result, "data.success", false);
        if (success) {
          this.setState({
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Email sent successfully!"
          });
          setTimeout(() => {
            this.setState({
              snackbarMsg: "Redirecting...",
              variant: "success"
            });
            setTimeout(() => {
              Router.push("/email-sent-forgot-password");
            }, 1000);
          }, 2000);
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          showSnackbar: true,
          variant: "error",
          snackbarMsg: "Something went wrong!"
        });
      });
  };

  render() {
    const { formData, isLoading } = this.state;
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>{" "}
              <div className="card">
                <div className="cardHeading">
                  <h3> Forgot password </h3>{" "}
                </div>{" "}
                <FormField
                  {...formData.email}
                  handleChange={this.handleChange}
                  id="email"
                  rows="5"
                  col="5"
                />
                {isLoading ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress size={30} color="secondary" />
                  </div>
                ) : (
                  <button
                    disabled={!formData.email.valid}
                    className="registerBtn"
                    onClick={this.handleForgotPasswordClick}
                  >
                    Forgot Password
                  </button>
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

export default ForgotPassword;
