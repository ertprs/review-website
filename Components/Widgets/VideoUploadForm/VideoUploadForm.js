import React from "react";
import { videoUploadFormStyles } from "./videoUploadFormStyles";
import FormField from "../FormField/FormField";
import UniversalLoader from "../UniversalLoader/UniversalLoader";
import uuid from "uuid/v1";

const formFieldStyles = {
  borderRadius: "25px",
  padding: "10px",
  paddingLeft: "25px",
  backgroundClip: "padding-box",
  background: "#fff"
};

class VideoUploadForm extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderErrorsList = errors => {
    let errorsList = [];
    for (let error in errors) {
      errorsList = [
        ...errorsList,
        <div style={{ color: "red", fontSize: "0.9rem" }} key={uuid()}>
          {errors[error]}
        </div>
      ];
    }
    return errorsList;
  };

  renderVideoUploadForm = () => {
    const { videoFile, videoDataSent } = this.props;
    return (
      <div className="">
        <div className="videoUploadFormContainer">
          <style jsx>{videoUploadFormStyles}</style>
          {videoDataSent==="success" ? null : <h4 className="videoUploadFormHeader">Video upload form</h4>}
          {videoDataSent === "no" ? (
            <form onSubmit={e => this.props.handleVideoUploadSubmit(e)}>
              <FormField
                {...this.props.formData.videoTitle}
                id="videoTitle"
                handleChange={e =>
                  this.props.handleFormDataChange(e, "videoTitle")
                }
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

              {/* File Upload */}
              <div>
                <label className="video-file-upload">
                  <span>Choose a file to upload..</span>{" "}
                  <i className="fa fa-hand-o-up"></i>
                  <input
                    type="file"
                    accept="video/mp4,video/x-flv,video/quicktime,video/x-m4v,video/mpeg"
                    ref={this.props.innerRef}
                    onChange={e => {
                      this.props.handleFormDataChange(e, "videoFile");
                    }}
                  />
                </label>
                <div>
                  {Object.keys(videoFile.errors).length > 0 ? (
                    this.renderErrorsList(videoFile.errors)
                  ) : (
                    <div style={{ color: "#21bc61", marginTop: "10px" }}>
                      Selected file: {videoFile.filename || "none"}
                    </div>
                  )}
                </div>
              </div>

              <div className="uploadVideoBtnContainer">
                <button type="submit" className="videoUploadBtn">
                  <span>Upload </span> <i className="fa fa-upload"></i>
                </button>
              </div>
            </form>
          ) : (
            this.renderUniversalLoader()
          )}
        </div>
      </div>
    );
  };

  renderUniversalLoader = () => {
    return (
      <UniversalLoader status={this.props.videoDataSent}>
        {/* First child for loading state */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: "32px",
              width: "32px",
              textAlign: "center",
              margin: "0 auto"
            }}
          >
            <img
              src="/static/images/dotsLoader.gif"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
        {/* Second child for success state */}
        <div style={{ textAlign: "left", color: "#21bc61", height: "50vh" }}>
          <h4>Processing video ...
          <span
            style={{
              height: "32px",
              width: "32px",
              textAlign: "center",
              display:"inline-block"
            }}
          >
            <img
              src="/static/images/dotsLoader.gif"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </span>
          </h4>
        </div>
        {/* third child for error state */}
        <div style={{ textAlign: "left", color: "red" }}>
          Some error occured, please try again later{" "}
          <i className="fa fa-close"></i>
        </div>
      </UniversalLoader>
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
export default React.forwardRef((props, ref) => (
  <VideoUploadForm innerRef={ref} {...props} />
));
