import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import { baseURL, forgotPasswordApi } from "../utility/config";
import Loader from "../components/Widgets/Loader/Loader";
import Router from "next/router";
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
    isLoading: false
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
          Router.push("/afterRegistration");
        }
      })
      .catch(error => {
        console.log(error, "registration error");
        this.setState({ isLoading: false });
        alert("Something went wrong!");
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
                  <h3> Create new password </h3>{" "}
                </div>{" "}
                <FormField
                  {...formData.email}
                  handleChange={this.handleChange}
                  id="email"
                  rows="5"
                  col="5"
                />
                {isLoading ? (
                  <Loader />
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
      </Layout>
    );
  }
}

export default ForgotPassword;
