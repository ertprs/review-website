import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import { baseURL, resetPasswordApi } from "../utility/config";
import Loader from "../components/Widgets/Loader/Loader";
import Router from "next/router";
import Layout from "../hoc/layout/layout";

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
          required: true
        },
        name: "password"
      }
    },
    isLoading: false,
    isTokenValid: false,
    token: ""
  };

  componentDidMount() {
    const { token } = this.state;
    if (token) {
      let reqBody = {
        token
      };
      axios
        .post(`${baseURL}${forgotPasswordApi}`, reqBody)
        .then(result => {
          this.setState({ isLoading: false });
          let success = _get(result, "data.success", false);
          if (success) {
            this.setState({ isTokenValid: true });
          }
        })
        .catch(error => {
          console.log(error, "registration error");
          this.setState({ isLoading: false });
          alert("Something went wrong!");
        });
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
    this.setState({ isLoading: true });
    const { formData, token } = this.state;
    const reqBody = {
      password: _get(formData, "password.value", ""),
      token
    };
    axios
      .post(`${baseURL}${resetPasswordApi}`, reqBody)
      .then(result => {
        this.setState({ isLoading: false });
        let success = _get(result, "data.success", false);
        if (success) {
          Router.push("/login");
        }
      })
      .catch(error => {
        console.log(error, "resetpassword error");
        this.setState({ isLoading: false });
        alert("Something went wrong!");
      });
  };

  render() {
    const { formData, isLoading, isTokenValid } = this.state;
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>{" "}
              {isLoading ? (
                <Loader />
              ) : isTokenValid ? (
                <div className="card">
                  <div className="cardHeading">
                    <h3> Create new password </h3>{" "}
                  </div>{" "}
                  <FormField
                    {...formData.password}
                    handleChange={this.handleChange}
                    type="password"
                    id="password"
                    rows="5"
                    col="5"
                  />
                  <button
                    disabled={!formData.password.valid}
                    className="registerBtn"
                    onClick={this.handleResetPasswordClick}
                  >
                    Reset Password
                  </button>
                </div>
              ) : (
                "Something went Wrong!"
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

ResetPassword.getInitialProps = query => {
  const url = query.domain;
  let splitUrlArray = url.split("/");
  let token = "";
  if (!_isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
    token = splitUrlArray[splitUrlArray.length - 1];
  }
  if (token) {
    this.setState({ token });
  }
};

export default ResetPassword;
