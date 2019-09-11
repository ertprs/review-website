import React, { Component } from "react";
import { registrationPageStyles } from "../Components/Styles/registrationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import countrieslist from "../utility/countryList";
import validate from "../utility/validate";
import _get from "lodash/get";

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
          errorMsg: { ...errorMsg, [id]: "Password do not match!" },
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
          errorMsg: { ...errorMsg, [id]: "" },
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

  render() {
    const { formData, errorMsg } = this.state;
    return (
      <div className="container">
        <div className="col-md-6 offset-md-3">
          <style jsx>{registrationPageStyles}</style>
          <div className="card">
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
              {_get(errorMsg, "confirm_password", "")}
            </span>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
