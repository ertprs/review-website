import React, { Component } from "react";
import { authenticationPageStyles } from "../Styles/authenticationPageStyles";
import FormField from "../Widgets/FormField/FormField";
import countrieslist from "../../utility/newCountryList.json";
import validate from "../../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { businessRegisterApi } from "../../utility/config";
import Router from "next/router";
import { connect } from "react-redux";
import { businessSignUp } from "../../store/actions/authActions";
import Snackbar from "../Widgets/Snackbar";
import { CircularProgress } from "@material-ui/core";
import Link from "next/link";
import { redirectWithDomain } from "../../store/actions/domainProfileActions";
import dynamic from "next/dynamic";
const IntlTelInput = dynamic(() => import("react-intl-tel-input"), {
  ssr: false
});
import Head from "next/head";

class BusinessUserRegistration extends Component {
  state = {
    agreement: "no",
    formData: {
      website: {
        element: "input",
        value: "",
        placeholder: "yourdomain.com",
        errorMessage:
          "Please enter a valid domain (for eg: thetrustsearch.com)",
        valid: false,
        touched: false,
        validationRules: {
          required: true
          // isDomain: true
        },
        name: "website name"
      },
      company: {
        element: "input",
        value: "",
        placeholder: "Enter your company name",
        errorMessage: "Enter valid company name (atleast 3 characters)",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        name: "company"
      },
      name: {
        element: "input",
        value: "",
        placeholder: "Enter your full name",
        errorMessage: "Enter valid name (atleast 5 characters)",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "name"
      },
      email: {
        element: "input",
        value: "",
        placeholder: "email@yourdomain.com",
        errorMessage: "Please enter a valid email",
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
        errorMessage: "Required (At least 8 character)",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 8
        },
        name: "password"
      },
      password_confirmation: {
        element: "input",
        value: "",
        placeholder: "Please confirm your password",
        errorMessage: "Password and confirm password must match",
        valid: false,
        touched: false,
        type: "number",
        validationRules: {
          required: true
        },
        name: "password_confirmation"
      },
      phone: {
        element: "input",
        value: "",
        placeholder: "Enter your phone no.",
        errorMessage: "Please enter a valid phone no.",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "phone"
      },
      country: {
        element: "select",
        name: "country",
        value: "",
        dialCode: "",
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
      password_confirmation: ""
    },
    isLoading: false,
    isRegistrationFailed: false,
    success: false,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    oAuthLoading: false
  };

  handleChange = (e, id) => {
    const { value } = e.target;
    const { formData, errorMsg } = this.state;
    if (id === "password_confirmation") {
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
    } else if (id === "password") {
      let valid = value === _get(formData, "password_confirmation.value", "");
      if (valid) {
        this.setState({
          errorMsg: {
            ...errorMsg,
            ["password_confirmation"]: ""
          }
        });
      }
      this.setState({
        formData: {
          ...formData,
          [id]: {
            ...formData[id],
            valid: validate(value, formData[id].validationRules),
            value: value,
            touched: true
          },
          password_confirmation: {
            ...formData["password_confirmation"],
            valid
          }
        }
      });
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

  componentWillMount() {
    window.scrollTo(0, 0);
    const { domainName } = this.props;
    const { formData } = this.state;
    if (domainName) {
      this.setState({
        formData: {
          ...formData,
          website: {
            ...formData.website,
            value: domainName,
            valid: true,
            touched: true
          }
        }
      });
    }
  }

  componentWillUnmount() {
    const { redirectWithDomain } = this.props;
    redirectWithDomain("", "");
  }

  createReqBody = formData => {
    let reqBody = {};
    if (!_isEmpty(formData)) {
      let ObjectKeysArray = Object.keys(formData);
      if (!_isEmpty(ObjectKeysArray) && Array.isArray(ObjectKeysArray)) {
        ObjectKeysArray.map(key => {
          if (formData.hasOwnProperty([key])) {
            if (key === "phone") {
              reqBody[
                key
              ] = `+${formData[key].dialCode}-${formData[key].value}`;
            } else {
              reqBody[key] = formData[key].value;
            }
          }
        });
      }
    }
    return reqBody;
  };

  handleRegisterClick = () => {
    const { businessSignUp } = this.props;
    const { formData } = this.state;
    let reqBody = this.createReqBody(formData);
    console.log(reqBody, "reqBody");
    businessSignUp(reqBody, businessRegisterApi);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth !== prevProps.auth) {
      const {
        isSignUpFailed,
        isSignupSuccess,
        error,
        isSigningUp,
        authorized
      } = this.props;
      this.setState({ isLoading: isSigningUp });

      if (isSignUpFailed) {
        let snackbarMsg;
        snackbarMsg = error;
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg,
          isLoading: false
        });
      }

      if (isSignupSuccess) {
        let snackbarMsg = "Registration Successfull!";
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg
        });
        if (authorized === true) {
          this.setState(
            {
              showSnackbar: true,
              variant: "success",
              snackbarMsg: "Logged in successfully!"
            },
            () => {
              Router.push("/dashboard");
            }
          );
        } else if (authorized === false) {
          this.setState(
            {
              showSnackbar: true,
              variant: "error",
              snackbarMsg: "Some error occured while loggin in!"
            },
            () => {
              Router.push("/login");
            }
          );
        }
      }
    }
  }

  handleKeyDown = e => {
    if (e.keyCode == 13) {
      this.handleRegisterClick();
    }
  };

  render() {
    const { formData, isLoading, agreement } = this.state;
    return (
      <>
        <Head>
          <link
            href="/static/css/react-intl-tel-input/react-intl-tel-input.css"
            type="text/css"
            rel="stylesheet"
          />
        </Head>
        <style jsx> {authenticationPageStyles} </style>{" "}
        <div className="card">
          <div className="cardHeading">
            <h3> Create a free business account </h3>{" "}
          </div>{" "}
          <FormField
            {...formData.website}
            handleChange={this.handleChange}
            id="website"
            rows="5"
            col="5"
          />
          <FormField
            {...formData.company}
            handleChange={this.handleChange}
            id="company"
            rows="5"
            col="5"
          />
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
            {...formData.password_confirmation}
            handleChange={this.handleChange}
            onkeyDown={this.handleKeyDown}
            type="password"
            id="password_confirmation"
            rows="5"
            col="5"
          />
          <IntlTelInput
            style={{ width: "100%" }}
            containerClassName="intl-tel-input"
            value={_get(formData, "phone.value", "")}
            numberType="MOBILE"
            inputClassName={
              formData.phone.valid
                ? "formField"
                : `formField ${formData.phone.touched ? "invalidField" : ""}`
            }
            autoPlaceholder={true}
            defaultCountry="lv"
            onPhoneNumberChange={(isValid, value, countryData) => {
              console.log(value, countryData, "value, countryData");
              const dialCode = _get(countryData, "dialCode", "0");
              this.setState({
                formData: {
                  ...formData,
                  phone: {
                    ...formData.phone,
                    valid: isValid,
                    value: value,
                    dialCode: dialCode,
                    touched: true
                  }
                }
              });
            }}
            onSelectFlag={(value, countryData) => {
              const dialCode = _get(countryData, "dialCode", "");
              this.setState({
                formData: {
                  ...formData,
                  phone: {
                    ...formData.phone,
                    valid: false,
                    value: "",
                    dialCode: dialCode,
                    touched: true
                  }
                }
              });
            }}
          />
          <div className="errorMsg">
            {!formData.phone.valid && formData.phone.touched
              ? formData.phone.errorMessage
              : ""}
          </div>
          <FormField
            {...formData.country}
            handleChange={this.handleChange}
            id="country"
            rows="5"
            col="5"
            styles={{ height: "38px" }}
          />
          <div style={{ margin: "20px 0 20px 0" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                onChange={e =>
                  this.setState({
                    agreement: e.target.value === "yes" ? "no" : "yes"
                  })
                }
                value={this.state.agreement}
                checked={this.state.agreement === "yes" ? true : false}
              />{" "}
              Accept our terms and conditions
            </label>
            <p
              style={{ fontSize: "12px", marginLeft: "5px", marginTop: "5px" }}
            >
              <Link href="/termsAndConditions">
                <a target="_blank">Read our terms and conditions</a>
              </Link>
            </p>
          </div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={30} color="secondary" />
            </div>
          ) : (
            <>
              <button
                disabled={
                  !(
                    formData.website.valid &&
                    formData.company.valid &&
                    formData.name.valid &&
                    formData.email.valid &&
                    formData.password.valid &&
                    formData.password_confirmation.valid &&
                    formData.phone.valid &&
                    formData.country.valid &&
                    agreement === "yes"
                  )
                }
                className="registerBtn"
                onClick={this.handleRegisterClick}
              >
                Register your business
              </button>
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "10px"
            }}
          >
            <Link href="/login">
              <a>Already have account? Login</a>
            </Link>
          </div>
        </div>
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { auth, profileData } = state;
  const { businessSignUpTemp } = auth;
  const isSignUpFailed = _get(businessSignUpTemp, "isSignupFailed", false);
  const isSignupSuccess = _get(businessSignUpTemp, "signUpSuccess", false);
  const status = _get(businessSignUpTemp, "status", -1);
  const error = _get(businessSignUpTemp, "error", "");
  const isSigningUp = _get(businessSignUpTemp, "isSigningUp", false);
  const authorized = _get(auth, "logIn.authorized", "undefiend");
  const domainName = _get(profileData, "domain", "");
  return {
    auth,
    isSignUpFailed,
    isSignupSuccess,
    status,
    error,
    isSigningUp,
    authorized,
    domainName
  };
};

export default connect(mapStateToProps, { businessSignUp, redirectWithDomain })(
  BusinessUserRegistration
);
