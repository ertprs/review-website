// 757926713122 - b99qpe0npfm18ko5vek0ch1tgtruei87.apps.googleusercontent.com;

import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import countrieslist from "../utility/countryList";
import validate from "../utility/validate";
import _get from "lodash/get";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Layout from "../hoc/layout/layout";

class Registration extends Component {
  state = {
    formData: {
      name: {
        element: "input",
        value: "",
        placeholder: "Enter your name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "name"
      },
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
      },
      confirm_password: {
        element: "input",
        value: "",
        placeholder: "Please confirm your password",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "confirm_password"
      },
      country: {
        element: "select",
        name: "country",
        value: "",
        options: [...countrieslist],
        placeholder: "Select your country",
        valid: false,
        validationRules: {
          required: true
        },
        touched: false,
        errorMessage: ""
      }
    },
    errorMsg: {
      confirm_password: ""
    }
  };

  handleChange = (e, id) => {
    const { value } = e.target;
    const { formData, errorMsg } = this.state;
    if (id === "confirm_password") {
      let valid = value === _get(formData, "password.value", "");
      if (!valid) {
        this.setState({
          errorMsg: {
            ...errorMsg,
            [id]: "Password do not match!"
          },
          formData: {
            ...formData,
            [id]: {
              ...formData[id],
              valid: false,
              value: value,
              touched: true
            }
          }
        });
      } else {
        this.setState({
          errorMsg: {
            ...errorMsg,
            [id]: ""
          },
          formData: {
            ...formData,
            [id]: {
              ...formData[id],
              valid: true,
              value: value,
              touched: true
            }
          }
        });
      }
    } else {
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
    }
  };

  handleRegisterClick = () => {
    console.log("clicked");
  };

  responseGoogle = response => {
    console.log(response, "res");
  };

  render() {
    const { formData, errorMsg } = this.state;
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>{" "}
              <div className="card">
                <div className="cardHeading">
                  <h3> Create a free account </h3>{" "}
                </div>{" "}
                <FormField
                  {...formData.name}
                  handleChange={this.handleChange}
                  id="name"
                  rows="5"
                  col="5"
                />
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
                <FormField
                  {...formData.confirm_password}
                  handleChange={this.handleChange}
                  type="password"
                  id="confirm_password"
                  rows="5"
                  col="5"
                />
                <span className="errorMsg">
                  {" "}
                  {_get(errorMsg, "confirm_password", "")}{" "}
                </span>{" "}
                <FormField
                  {...formData.country}
                  handleChange={this.handleChange}
                  id="country"
                  rows="5"
                  col="5"
                />
                <button
                  disabled={
                    !(
                      formData.name.valid &&
                      formData.email.valid &&
                      formData.password.valid &&
                      formData.confirm_password.valid &&
                      formData.country.valid
                    )
                  }
                  className="registerBtn"
                  onClick={this.handleRegisterClick}
                >
                  Register
                </button>
                <GoogleLogin
                  clientId="464520761652-jd9gfi81jvbmpe3l8917u4jqj0pgpq9v.apps.googleusercontent.com"
                  render={renderProps => (
                    <button
                      className="loginBtn loginBtn--google"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Signup with Google
                    </button>
                  )}
                  buttonText="Login with Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  // cookiePolicy={"single_host_origin"}
                />
                <FacebookLogin
                  appId="1088597931155576"
                  // autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  // callback={responseFacebook}
                  render={renderProps => (
                    <button
                      className="loginBtn loginBtn--facebook"
                      onClick={renderProps.onClick}
                    >
                      Signup with Facebook
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

export default Registration;
