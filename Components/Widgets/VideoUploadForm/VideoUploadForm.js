import React from "react";
import { videoUploadFormStyles } from "./videoUploadFormStyles";
import FormField from "../FormField/FormField";

const formFieldStyles = {
  borderRadius: "25px",
  padding: "10px",
  paddingLeft: "25px",
  backgroundClip: "padding-box",
  background: "#fff"
};

class VideoUploadForm extends React.Component {

  componentDidMount(){
    window.scrollTo(0,0);
  }

  renderVideoUploadForm = () => {
    return (
      <div className="container">
      <div className="videoUploadFormContainer">
        <style jsx>{videoUploadFormStyles}</style>
        <h4 className="videoUploadFormHeader">Video upload form</h4>
        <form onSubmit={e => this.props.handleVideoUploadSubmit(e)}>
          <FormField
            {...this.props.formData.videoTitle}
            id="videoTitle"
            handleChange={e => this.props.handleFormDataChange(e, "videoTitle")}
            styles={{ ...formFieldStyles }}
          />

          <FormField
            {...this.props.formData.videoDescription}
            id="videoDescription"
            handleChange={e =>
              this.props.handleFormDataChange(e, "videoDescription")
            }
            styles={{ ...formFieldStyles }}
          />

          <div className="uploadVideoBtnContainer">
            <button type="submit" className="videoUploadBtn">
              Upload <i className="fa fa-upload"></i>
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>{this.renderVideoUploadForm()}</div>
      </div>
    );
  }
}
export default VideoUploadForm;
