import React, { Component } from "react";
import FormField from "../../../Components/Widgets/FormField/FormField";
import validate from "../../../utility/validate";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Modal from "../../Widgets/CustomModal/CustomModal";
import VerifyEmailModal from "./VerifyEmailModal";

class SetupForm extends Component {
  state = {
    formData: {
      senderName: {
        element: "input",
        value: "",
        placeholder: "Enter sender's name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        name: "senderName"
      },
      replyToEmail: {
        element: "select",
        value: "",
        placeholder: "email@gmail.com",
        errorMessage: "",
        options: [{ name: "arturs@gmail.com", value: "arturs@gmail.com" }],
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "replyToEmail"
      }
    },
    senderMail: "",
    showModal: true
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

  handleRadioChange = event => {
    const { value } = event.target;
    this.setState({ senderMail: value });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { formData, senderMail } = this.state;
    return (
      <>
        <div className="container">
          <style jsx>
            {`
              .mainHeading {
                font-weight: 100;
                font-size: 28px;
                letter-spacing: 0.5px;
                margin-bottom: 15px;
              }

              .mainContent {
                font-size: 16px;
              }

              .formText {
                margin-top: 30px;
                font-size: 18px;
              }

              .asterisk {
                color: red;
                margin-left: 10px;
              }
            `}
          </style>
          <div className="row">
            <div className="col-md-7">
              <h1 className="mainHeading">Sender Information</h1>
              <span className="mainContent">
                Set up your Sender Name and Sender Email - they appear in your
                customers’ inboxes when they receive your email invitation. The
                Reply-to Email is the address you’d like your customers to use
                when replying to your email.{" "}
                <span>
                  <a href="#">Need more info?</a>
                </span>
              </span>
              <p className="formText">
                <b>Sender's Name:</b>
                <span className="asterisk">*</span>
              </p>
              <FormField
                {...formData.senderName}
                handleChange={this.handleChange}
                id="senderName"
                rows="5"
                col="5"
              />
              <p className="formText">
                <b>Reply-to Email:</b>
              </p>
              <FormField
                {...formData.replyToEmail}
                handleChange={this.handleChange}
                id="replyToEmail"
                rows="5"
                col="5"
                styles={{ height: "38px" }}
              />
              <a href="#" onClick={() => this.setState({ showModal: true })}>
                Add another Reply-to Email
              </a>
              <p className="formText">
                <b>Sender Email:</b>
              </p>
              <RadioGroup
                aria-label="gender"
                name="senderEmail"
                value={senderMail}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="non-technical"
                  control={<Radio />}
                  label="Send from noreply.invitations@trustsearchmail.com (no further setup required)"
                />
                <FormControlLabel
                  value="technical"
                  control={<Radio />}
                  label="Send email using your own email domain for the Sender Address (requires technical knowledge to set up)"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
        <Modal
          showModal={this.state.showModal}
          handleModalClose={this.handleModalClose}
          modalCustomStyles={{
            background: "#f9f9f9",
            border: "1px solid #fff"
          }}
        >
          <VerifyEmailModal />
        </Modal>
      </>
    );
  }
}

export default SetupForm;
