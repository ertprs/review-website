import React from "react";
import { trustDontTrustStyles } from "./trustDontTrustStyles";
import CustomModal from "../Widgets/CustomModal/CustomModal";
import FormField from "../Widgets/FormField/FormField";
import validate from "../../utility/validate";
import FaceBookLoginBtn from "../Widgets/FacebookLoginBtn/FacebookLoginBtn";
import GoogleLoginBtn from "../Widgets/GoogleLoginBtn/GoogleLoginBtn";

class TrustDontTrust extends React.Component {
  state = {
    step: 1,
    formData: {
      review: {
        element: "textarea",
        value: "",
        placeholder: "140 characters to 280",
        errorMessage: "140 to 280 characters ",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 140,
          maxLength: 280
        },
        name: "review"
      }
      // email: {
      //   element: "input",
      //   type: "email",
      //   value: "",
      //   placeholder: "Your email address",
      //   errorMessage: "please enter a valid email address",
      //   valid: false,
      //   touched: false,
      //   validationRules: {
      //     required: true,
      //     isEmail: true
      //   },
      //   name: "email"
      // }
    }
  };

  renderTrustDontTrustBox = () => {
    return (
      <div className="trustDontTrustBoxContainer">
        <style jsx>{trustDontTrustStyles}</style>
        <div className="trustDontTrustBoxContainerInner">
          <div className="trustIconContainer">
            <div className="trustHeader">
              <h6>trust</h6>
            </div>
            <div
              className="trustIconContainerInner"
              onClick={this.props.handleModalClose}
            >
              <img src="/static/images/trust.svg" />
            </div>
          </div>
          <div className="dontTrustIconContainer">
            <div className="dontTrustHeader">
              <h6>don't trust</h6>
            </div>
            <div
              className="dontTrustIconContainerInner"
              onClick={this.props.handleModalClose}
            >
              <img src="/static/images/dont_trust.svg" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  handleFormDataChange = (e, id) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: {
          ...this.state.formData[id],
          value: e.target.value,
          valid: validate(
            e.target.value,
            this.state.formData[id].validationRules
          ),
          touched: true
        }
      }
    });
  };

  validateFields = fields => {
    let valid = true;
    let newFormData = { ...fields };
    for (let item in fields) {
      valid = valid && fields[item].valid;
      if (!valid) {
        newFormData = {
          ...newFormData,
          [item]: { ...fields[item], touched: true, valid: false }
        };
      }
    }
    if (!valid) {
      this.setState({ formData: { ...this.state.formData, ...newFormData } });
    }
    return valid;
  };

  handleNextBtnClick = fields => {
    const valid = this.validateFields(fields);
    if (valid) {
      this.setState(currentState => {
        return { step: currentState.step + 1 };
      });
    }
  };

  renderStepTwo = () => {
    return (
      <>
        <style jsx>{trustDontTrustStyles}</style>
        <div className="trustReviewModal">
          <div className="trustReviewModalHeader">
            <h5>
              Signup / Login using any of the methods below and get +15 more
              tokens
            </h5>
          </div>
          <div className="trustReviewModalForm">
            {/* <div className="stepTwoTextArea">
              <FormField value={this.state.formData.review.value} element="textarea" rows="5" cols="5" handleChange={(e)=>{}} readOnly={true} />
            </div> */}
            <div className="row">
              <div className="col-md-12">
                <div className="registerBtnContainer">
                  <button className="registerBtn">
                    Register / Login
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FaceBookLoginBtn text="Login with Facebook" />
              </div>
              <div className="col-md-6">
                <GoogleLoginBtn text="Login with Google" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  renderStepOne = () => {
    return (
      <>
        <style jsx>{trustDontTrustStyles}</style>
        <div className="trustReviewModal">
          <div className="tokens">+30 Tokens</div>
          <div className="trustReviewModalHeader">
            <h5>Tell us, why you trust / don’t trust this company?</h5>
          </div>
          <div className="trustReviewModalForm">
            <FormField
              {...this.state.formData.review}
              handleChange={(e, id) => this.handleFormDataChange(e, id)}
              id="review"
              rows="5"
              col="5"
            />
            <div className="row">
              <div className="col-md-12">
                {/* <FormField
                  {...this.state.formData.email}
                  id="email"
                  handleChange={(e, id) => this.handleFormDataChange(e, id)}
                /> */}
                {/* email: this.state.formData['email'] */}
              </div>
              <div className="col-md-12">
                <button
                  className="submitBtn"
                  onClick={() => {
                    this.handleNextBtnClick({
                      review: this.state.formData["review"]
                    });
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  renderStepThree = () => {
    return (
      <>
        <style jsx>{trustDontTrustStyles}</style>
        <div className="trustReviewModal">
          <div className="tokens">+10 Tokens</div>
          <div className="trustReviewModalHeader">
            <h5>Would you like to tell us more about this company?</h5>
          </div>
        </div>
      </>
    );
  };

  renderAppropriateForm = () => {
    const { step } = this.state;
    if (step === 1) {
      return this.renderStepOne();
    }
    if (step === 2) {
      return this.renderStepTwo();
    }
  };

  renderTrustDontTrustModal = () => {
    return (
      <CustomModal
        showModal={this.props.showModal}
        handleModalClose={this.props.handleModalClose}
        modalCustomStyles={{ background: "#f9f9f9", border: "1px solid #fff" }}
      >
        {this.renderAppropriateForm()}
      </CustomModal>
    );
  };

  render() {
    return (
      <div>
        {this.renderTrustDontTrustModal()}
        {this.renderTrustDontTrustBox()}
      </div>
    );
  }
}

export default TrustDontTrust;
