import React from "react";
import FormField from "../FormField/FormField";
import UniversalLoader from "../UniversalLoader/UniversalLoader";
import { scheduleMeetingStyles } from "./scheduleMeetingStyles";
const formFieldStyles = {
  borderRadius: "25px",
  padding: "10px",
  paddingLeft: "25px",
  backgroundClip: "padding-box",
  background: "#fff"
};

class ScheduleMeeting extends React.Component {
  renderMeetingForm = () => {
    return (
      <div className="scheduleMeetingFormContainer">
        <style jsx>{scheduleMeetingStyles}</style>
        <form onSubmit={e => this.props.handleScheduleMeetingSubmit(e)}>
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
          <label className="objectiveLabel">
            Our main objective for TrustSearch is to
          </label>

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
    );
  };

  render() {
    return (
      <div className="scheduleMeetingContainer">
        <style jsx>{scheduleMeetingStyles}</style>
        <div className="scheduleMeetingHeader">
          <h5 className="heading">
            Schedule a meeting to discuss how TrustSearch can help your
            organization
          </h5>
        </div>
        {this.props.meetingScheduled === "no" ? (
          this.renderMeetingForm()
        ) : (
          <UniversalLoader status={this.props.meetingScheduled}>
            {/* First child for loading state */}
            <div style={{ textAlign: "center" }}>
              <div style={{height:"32px", width:"32px", textAlign:"center", margin:"0 auto"}}>
                  <img src="/static/images/dotsLoader.gif" style={{maxWidth:"100%", height:"auto"}}/>
              </div>
            </div>
            {/* Second child for success state */}
            <div style={{ textAlign: "center", color:"#21bc61"}}>
              Meeting scheduled successfully <i className="fa fa-check"></i>
            </div>
            {/* third child for error state */}
            <div style={{ textAlign: "center", color:"red"}}>
              Some error occured, please try again later{" "}
              <i className="fa fa-close"></i>
            </div>
          </UniversalLoader>
        )}
      </div>
    );
  }
}

export default ScheduleMeeting;
