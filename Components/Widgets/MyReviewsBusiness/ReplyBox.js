import React, { Component } from "react";
import { reviewListStyles } from "./myReviewsStyles";
import FormField from "../FormField/FormField";
import validate from "../../../utility/validate";

class ReplyBox extends Component {
  state = {
    formData: {
      replyText: {
        element: "textarea",
        value: "",
        placeholder: "Enter your reply",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 10
        },
        name: "replyText"
      }
    }
  };

  handleChange = (event, id) => {
    const { value } = event.target;
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
      <div className="replyCard">
        <style jsx> {reviewListStyles}</style>
        <div className="row">
          <div className="col-md-3">
            <div className="companyName">
              <p>Cunami</p>
            </div>
          </div>
          <div className="col-md-6 replyInputBox">
            <FormField
              {...formData.replyText}
              handleChange={this.handleChange}
              type="text"
              id="replyText"
              rows="5"
              col="5"
            />
            <button disabled={false} className="postReplyButton">
              <i className="fa fa-pencil postReplyIcon"></i>
              Post Reply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReplyBox;
