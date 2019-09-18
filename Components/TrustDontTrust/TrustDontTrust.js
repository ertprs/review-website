import React from "react";
import { trustDontTrustStyles } from "./trustDontTrustStyles";
import CustomModal from "../Widgets/CustomModal/CustomModal";
import FormField from "../Widgets/FormField/FormField";
import validate from "../../utility/validate";
import axios from "axios";
import UniversalLoader from "../Widgets/UniversalLoader/UniversalLoader";
import { connect } from "react-redux";
import { sendTrustVote, sendTrustDataLater } from "../../store/actions/trustAction";
import Router from "next/router";

class TrustDontTrust extends React.Component {
  state = {
    step: 1,
    trustFlag: "",
    reviewSent: "no",
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

  handleReviewAnonymousSubmit = () => {
    this.setState({ reviewSent: "in-progress" }, () => {
      //mimic data post
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          trust: this.state.trustFlag === "trust" ? true : false,
          text: this.state.formData.review,
          domain: this.props.domain
        })
        .then(res => {
          this.setState({ reviewSent: "success" });
          console.log(res);
        })
        .catch(err => {
          this.setState({ reviewSent: "error" });
          console.log(err);
        });
    });
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
              onClick={() => {
                this.setState({ trustFlag: "trust" });
                this.props.handleModalClose();
              }}
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
              onClick={() => {
                this.setState({ trustFlag: "dontTrust" });
                this.props.handleModalClose();
              }}
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
    const { authorized } = this.props.auth.payload;

    if (valid) {
      if (authorized) {
        this.props.sendTrustVote({
          trust: this.state.trustFlag === "trust" ? true : false,
          text: this.state.formData.review.value,
          domain: this.props.domain
        });
      } else {
        this.setState(currentState => {
          return { step: currentState.step + 1 };
        });
      }
    }
  };

  handleRegisterClick = ()=>{
    this.props.sendTrustDataLater({
      trust: this.state.trustFlag === "trust" ? true : false,
      text: this.state.formData.review.value,
      domain: this.props.domain
    })
    Router.push("/login")
  }


  renderStepTwo = () => {
    return (
      <>
        <style jsx>{trustDontTrustStyles}</style>
        <div className="trustReviewModal">
          <div className="trustReviewModalHeader">
            <h5>
              Signup / Login using any of the methods on our register / login
              page and get +15 more tokens
            </h5>
          </div>
          <div className="trustReviewModalForm">
            {/* <div className="stepTwoTextArea">
              <FormField value={this.state.formData.review.value} element="textarea" rows="5" cols="5" handleChange={(e)=>{}} readOnly={true} />
            </div> */}
            <div className="row">
              <div className="col-md-12">
                <div className="registerBtnContainer">
                  <button className="registerBtn" onClick={this.handleRegisterClick}>Register / Login</button>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6">
                <FaceBookLoginBtn text="Login with Facebook" />
              </div>
              <div className="col-md-6">
                <GoogleLoginBtn text="Login with Google" />
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-12" style={{ textAlign: "center" }}>
                or
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={{ textAlign: "center" }}>
                <span
                  className="anonymousBtn"
                  onClick={this.handleReviewAnonymousSubmit}
                >
                  continue anonymously
                </span>
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
            <h5>
              Tell us, why you{" "}
              {this.state.trustFlag === "trust" ? " " : "don't"} trust this
              company?
            </h5>
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

  // renderStepThree = () => {
  //   return (
  //     <>
  //       <style jsx>{trustDontTrustStyles}</style>
  //       <div className="trustReviewModal">
  //         <div className="tokens">+10 Tokens</div>
  //         <div className="trustReviewModalHeader">
  //           <h5>Would you like to tell us more about this company?</h5>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

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
    const { reviewSent } = this.state;
    return (
      <CustomModal
        showModal={this.props.showModal}
        handleModalClose={this.props.handleModalClose}
        modalCustomStyles={{ background: "#f9f9f9", border: "1px solid #fff" }}
      >
        {reviewSent === "no"
          ? this.renderAppropriateForm()
          : this.renderUniversalLoader()}
      </CustomModal>
    );
  };

  renderUniversalLoader = () => {
    return (
      <UniversalLoader status={this.state.reviewSent}>
        <div style={{ marginTop: "15px" }}>
          <h5>Submitting your review...</h5>
          <div style={{ textAlign: "center", margin: "25px 0 25px 0" }}>
            <img
              src="/static/images/dotsLoader.gif"
              style={{ height: "30px", width: "30px" }}
            />
          </div>
        </div>
        <div style={{ color: "#21bc61", marginTop: "15px" }}>
          <h5 style={{ margin: "20px 0 20px 0" }}>
            Your vote was submitted successfully !
          </h5>
          <h5 style={{ textAlign: "center" }}>
            <i className="fa fa-check"></i>
          </h5>
        </div>
        <div style={{ color: "red" }}>
          <h5 style={{ margin: "20px 0 20px 0" }}>
            Some error occured, please try again later.
          </h5>
          <h5 style={{ textAlign: "center" }}>
            <i className="fa fa-close"></i>
          </h5>
        </div>
      </UniversalLoader>
    );
  };

  render() {
    const {success} = this.props.trustVote.payload || false;
    return (
      <div>
        {this.renderTrustDontTrustModal()}
        {this.renderTrustDontTrustBox()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, trustVote } = state;
  return { auth, trustVote };
};

export default connect(
  mapStateToProps,
  { sendTrustVote, sendTrustDataLater }
)(TrustDontTrust);
