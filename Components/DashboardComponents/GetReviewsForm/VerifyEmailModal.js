import React, { Component } from "react";
import FormField from "../../../Components/Widgets/FormField/FormField";
import validate from "../../../utility/validate";

export default class VerifyEmailModal extends Component {
  state = {
    formData: {
      email: {
        element: "input",
        value: "",
        placeholder: "email",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        name: "email"
      },
      emailDomain: {
        element: "select",
        value: "",
        placeholder: "@domain.com",
        errorMessage: "",
        options: [{ name: "@gmail.com", value: "@gmail.com" }],
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "emailDomain"
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

  render() {
    const { formData } = this.state;

    return (
      <>
        <style jsx>
          {`
            .modalContainer {
              max-width: 400px;
              height: auto;
            }
            .customButton {
              width: auto;
              padding: 10px 30px;
              font-weight: 400;
              border-radius: 3px;
              -webkit-border-radius: 3px;
              -moz-border-radius: 3px;
              -ms-border-radius: 3px;
              -o-border-radius: 3px;
              cursor: pointer;
              transition: all 0.4s;
              margin-right: 10px;
            }

            .cancelBtn {
              color: #000;
              background: inherit;
              border: 1px solid #28b661;
            }

            .submitBtn {
              color: #fff;
              background: #28b661;
              border: 1px solid #28b661;
            }

            .customButton:hover {
              background: #30ab4a;
            }

            .cancelBtn:hover {
              color: #fff;
            }

            .customButton:disabled {
              border: 1px solid #baf0d0;
              background: #baf0d0;
            }

            .formFieldContainer {
              margin-top: 20px;
            }

            .bodyText {
              font-size: 16px;
            }

            .d-flex {
              display: flex;
            }
          `}
        </style>
        <div className="container modalContainer">
          <div>
            <h5>Verify your E-mail</h5>
            <div className="formFieldContainer row">
              <div className="col-md-6">
                <FormField
                  {...formData.email}
                  handleChange={this.handleChange}
                  id="email"
                  rows="5"
                  col="5"
                />
              </div>
              <div className="col-md-6">
                <FormField
                  {...formData.emailDomain}
                  handleChange={this.handleChange}
                  id="emailDomain"
                  rows="5"
                  col="5"
                  styles={{ height: "38px" }}
                />
              </div>
            </div>
            <p className="bodyText">
              To verify your Reply-to Email, we will send you an email with a
              verification link. Please click on the link to set it up.
            </p>
            <div className="d-flex">
              <button className="customButton cancelBtn">No, cancel</button>
              <button className="customButton submitBtn">
                Send verification
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
