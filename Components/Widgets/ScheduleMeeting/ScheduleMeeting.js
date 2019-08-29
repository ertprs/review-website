import React from "react";
import FormField from "../FormField/FormField";
import {scheduleMeetingStyles} from './scheduleMeetingStyles';
const formFieldStyles = {
  borderRadius: "50px"
};

class ScheduleMeeting extends React.Component {
  render() {
    return (
      <div className="scheduleMeetingContainer">
        <style jsx>
          {scheduleMeetingStyles}
        </style>
        <div className="scheduleMeetingHeader">
          <h5 className="heading">
            Schedule a meeting to discuss how TrustSearch can help your
            organization
          </h5>
        </div>
        <div className="scheduleMeetingFormContainer">
          <form onSubmit={e=> this.props.handleScheduleMeetingSubmit(e)}>
            <FormField
              {...this.props.formData.name}
              id="name"
              handleChange={this.props.handleInputChange}
              styles={{ ...formFieldStyles }}
            />

            <FormField
              {...this.props.formData.email}
              id="email"
              handleChange={this.props.handleInputChange}
              styles={{ ...formFieldStyles }}
            />

            <FormField
              {...this.props.formData.phoneNumber}
              id="phoneNumber"
              handleChange={this.props.handleInputChange}
              styles={{ ...formFieldStyles }}
            />
            <label className="objectiveLabel">Our main objective for TrustSearch is to</label>

            <FormField
              {...this.props.formData.objective}
              id="objective"
              handleChange={this.props.handleInputChange}
              styles={{ ...formFieldStyles }}
            />
            <div className="scheduleMeetingBtnContainer">
              <button type="submit">send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ScheduleMeeting;
