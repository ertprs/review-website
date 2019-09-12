import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import Layout from "../hoc/layout/layout";

class SetPassword extends Component {
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
    }
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

  handleSetPasswordClick = () => {
    console.log("clicked");
  };

  render() {
    const { formData } = this.state;
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
                  {...formData.password}
                  handleChange={this.handleChange}
                  type="password"
                  id="password"
                  rows="5"
                  col="5"
                />
                {/* <a href="#">Forgot password?</a> */}
                <button
                  disabled={!formData.password.valid}
                  className="registerBtn"
                  onClick={this.handleSetPasswordClick}
                >
                  Set Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default SetPassword;
