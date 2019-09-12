import React from "react";
import Router from "next/router";
import VideoUploadForm from "../Components/Widgets/VideoUploadForm/VideoUploadForm";
import { newLeaveReviewPageStyles } from "../Components/Styles/newLeaveReviewPageStyles";
import Ratings from "react-ratings-declarative";
import ReviewCard from "../Components/Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../Components/Widgets/RatingIndicators/RatingIndicators";
import FormField from "../Components/Widgets/FormField/FormField";
import UniversalLoader from "../Components/Widgets/UniversalLoader/UniversalLoader";
import Footer from "../Components/Footer/Footer";
import validate from "../utility/validate";
import tus from "tus-js-client";
import axios from "axios";

class NewLeaveReview extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      reviewSent: "no",
      videoUploaded: "no",
      videoDataSent: "no",
      ratings: {
        mainRating: 0
      },
      reviewSubmitted: false,
      errors: {},
      agreement: "no",
      videoReview: "no",
      videoFile: {
        errors: {},
        filename: "",
        size: 0,
        uploadProgress: 0
      },
      formData: {
        review: {
          element: "textarea",
          value: "",
          placeholder:
            "Tell us what you think about this product. Use at least 25 characters.",
          errorMessage: "",
          valid: false,
          touched: false,
          validationRules: {
            required: true,
            minLength: 25
          },
          name: "review"
        },
        videoTitle: {
          element: "input",
          type: "text",
          value: "",
          placeholder: "Video Title",
          errorMessage: "* required, at most 128 chars",
          valid: false,
          touched: false,
          validationRules: {
            required: true,
            maxLength: 128
          },
          name: "videoTitle"
        },
        videoDescription: {
          element: "input",
          type: "text",
          value: "",
          placeholder: "Video description",
          errorMessage: "* required, at most 5000 characters",
          valid: false,
          touched: false,
          validationRules: {
            required: true,
            maxLength: 5000
          },
          name: "videoDescription"
        }
      }
    };
  }

  handleRatingChange = (id, newRating) => {
    const { ratings } = this.state;
    this.setState({ ratings: { ...ratings, [id]: newRating } });
  };

  handleFormDataChange = (e, id) => {
    const { formData, videoFile } = this.state;
    if (id === "videoFile") {
      let errors = {};
      if (this.fileInput.current.files.length === 1) {
        const file = this.fileInput.current.files[0];
        const ext = file.name.match(/\.([^\.]+)$/)[1];
        const size = file.size;
        switch (ext) {
          case "mp4" || "flv" || "quicktime" || "m4v" || "mpeg":
            errors = { ...errors };
            break;
          default:
            errors = {
              ...errors,
              invalidFormat:
                "Please select between any one of these formats(mp4/flv/quicktime/m4v/mpeg)"
            };
        }
        if (size > 524288000) {
          errors = { ...errors, sizeLimit: "maximum size limit is 500mb" };
        }
        this.setState({
          videoFile: {
            ...videoFile,
            filename: this.fileInput.current.files[0].name,
            size: size,
            file: file,
            errors: { ...errors }
          }
        });
      } else {
        errors = { ...errors, required: "please select a video file" };
      }
    } else {
      this.setState({
        formData: {
          ...formData,
          [id]: {
            ...formData[id],
            value: e.target.value,
            valid: validate(e.target.value, formData[id].validationRules),
            touched: true
          }
        }
      });
    }
  };

  validateAllFields = () => {
    const { formData } = this.state;
    const { agreement } = this.state;
    const { ratings } = this.state;
    let errorObj = {};
    let validRatings = true;
    let validFormData = true;
    for (let rating in ratings) {
      //ToDo: change and check for strings
      validRatings = validRatings && ratings[rating] > 0;
    }
    validFormData = validFormData && formData.review.valid;
    if (!validRatings) {
      //true means key is not valid
      errorObj = { ...errorObj, ratings: true };
    }
    if (!validFormData) {
      errorObj = { ...errorObj, review: true };
    }
    if (agreement === "no") {
      errorObj = { ...errorObj, agreement: true };
    }

    return errorObj;
  };

  handleFormSubmit = () => {
    //validating before submitting
    const errors = this.validateAllFields();
    const { formData } = this.state;
    const { ratings } = this.state;
    if (Object.keys(errors).length === 0) {
      //mimic data post
      const dataToSubmit = {
        ...ratings,
        review: formData.review.value,
        agreement: true
      };
      //clear form data
      this.setState(
        { reviewSubmitted: true, reviewSent: "in-progress" },
        () => {
          //axios post dataToSubmit
          setTimeout(() => {
            this.setState({ reviewSent: "success" });
            if (this.state.videoReview === "no") {
              setTimeout(() => {
                Router.push("/reviews/google.com");
              }, 2000);
            }
          }, 3000);
        }
      );
    } else {
      this.setState({ errors: { ...errors } });
    }
  };

  renderReviewHeader = () => {
    return (
      <div className="reviewHeader">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="reviewHeaderLogoContainer">
          <img
            src="/static/business/index/images/gradientLogo.png"
            className="reviewHeaderLogoImage"
          />
        </div>
      </div>
    );
  };

  renderReviewHeroSection = () => {
    return (
      <div className="reviewHeroContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="reviewHeroHeading">
          <h3>Review your recent purchase</h3>
        </div>
        <div className="reviewHeroSubheading">
          <h6>Your feedback helps others make good choices</h6>
        </div>
      </div>
    );
  };

  renderMainReviewSection = () => {
    return (
      <div className="mainReviewSection">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="mainReviewImageContainer">
          <img src="/static/images/capture.png" />
        </div>
        <div className="mainReviewHeading">
          <h4>Google.com</h4>
        </div>
        <div className="mainReviewRatingsContainer">
          <Ratings
            rating={this.state.ratings.mainRating}
            widgetRatedColors="#21bc61"
            widgetHoverColors="#21bc61"
            widgetDimensions="40px"
            widgetSpacings="2px"
            changeRating={newRating => {
              this.handleRatingChange("mainRating", newRating);
            }}
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </div>
        <div className="mainReviewRatingsCaption">
          How would you rate this product?
        </div>
      </div>
    );
  };

  renderFinalReviewSection = () => {
    const reviewCardBody = (
      <RatingIndicators
        rating={this.state.ratings.mainRating}
        typeOfWidget="star"
        widgetRatedColors="#21bc61"
        widgetDimensions="35px"
        widgetSpacings="2px"
      />
    );
    return (
      <div className="finalReviewSection">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="finalReviewSectionHeader">
          <ReviewCard
            variant="productCard"
            image="/static/images/capture.png"
            title="Google.com"
            body={reviewCardBody}
          />
        </div>
        <div className="finalReviewSectionBody">
          {this.renderRateProductAttributes()}
          {this.renderReviewTextBox()}
          {this.renderCheckBoxAndBtn()}
        </div>
      </div>
    );
  };

  renderRateProductAttributes = () => {
    const { errors } = this.state;
    return (
      <div className="rateProdAttrContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="rateProdAttrHeader">
          <h5 style={{ marginTop: "3%" }}>Rate this product's attributes</h5>
          {/* ToDo: replace with dynamic key, value pairs- create dynamic keys and values in the ratings state */}
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="rateProdAttrBody">
              <div className="rateProdAttrBodyHeader">
                {/* change with dynamic key */}
                <h6>Quality</h6>
                {/* Change with dynamic state key and value */}
                <RatingIndicators
                  rating={this.state.ratings.quality || 0}
                  typeOfWidget="star"
                  widgetRatedColors="#21bc61"
                  widgetHoverColors="#21bc61"
                  widgetDimensions="22px"
                  widgetSpacings="1px"
                  changeRating={newRating => {
                    this.handleRatingChange("quality", newRating);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="rateProdAttrBody">
              <div className="rateProdAttrBodyHeader">
                {/* change with dynamic key */}
                <h6>Value</h6>
                {/* Change with dynamic state key and value */}
                <RatingIndicators
                  rating={this.state.ratings.value || 0}
                  typeOfWidget="star"
                  widgetRatedColors="#21bc61"
                  widgetHoverColors="#21bc61"
                  widgetDimensions="22px"
                  widgetSpacings="1px"
                  changeRating={newRating => {
                    this.handleRatingChange("value", newRating);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rateProdAttrError">
          {errors["ratings"] ? (
            <span>Please rate all the attributes</span>
          ) : null}
        </div>
      </div>
    );
  };

  renderReviewTextBox = () => {
    const { errors } = this.state;
    return (
      <div className="reviewTextBoxContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="reviewTextBoxHeader">
          <h5>Write review</h5>
        </div>
        <FormField
          {...this.state.formData.review}
          handleChange={(e, id) => {
            this.handleFormDataChange(e, id);
          }}
          id="review"
          rows="5"
          col="5"
          styles={{}}
        />
        <div className="reviewError">
          {(errors["review"] && !this.state.formData.review.valid) ||
          (!this.state.formData.review.valid &&
            this.state.formData.review.touched) ? (
            <span>Atleast 25 characters</span>
          ) : null}
        </div>
      </div>
    );
  };

  handleCheckBoxChange = (e, id) => {
    this.setState({ [id]: e.target.value === "yes" ? "no" : "yes" });
  };

  renderCheckBox = ({ id, text, error }) => {
    const checkBoxVal = this.state[id];
    const { errors } = this.state;
    return (
      <>
        <style jsx>{newLeaveReviewPageStyles}</style>
        <label style={{ verticalAlign: "middle" }}>
          <input
            type="checkbox"
            onChange={e => this.handleCheckBoxChange(e, id)}
            style={{
              height: "1.01rem",
              width: "1.01rem",
              verticalAlign: "middle"
            }}
            value={checkBoxVal}
            checked={checkBoxVal === "yes" ? true : false}
          />{" "}
          {id === "agreement" ? (
            <span>
              I accept the <a href="/">Terms &amp; conditions</a> and{" "}
              <a href="/">Privacy Policy.</a>
            </span>
          ) : (
            text
          )}
        </label>
        <div className="checkBoxError">
          {errors[id] && this.state[id] !== "yes" ? <span>{error}</span> : null}
        </div>
      </>
    );
  };

  renderSubmitBtn = () => {
    const { reviewSubmitted } = this.state;
    return (
      <>
        <style jsx>{newLeaveReviewPageStyles}</style>
        {reviewSubmitted ? (
          this.renderUniversalLoader()
        ) : (
          <button className="reviewSubmitBtn" onClick={this.handleFormSubmit}>
            Submit your review
          </button>
        )}
      </>
    );
  };

  renderCheckBoxAndBtn = () => {
    const agreement = {
      id: "agreement",
      text: "",
      error: "Please accept terms & conditions"
    };

    const videoReview = {
      id: "videoReview",
      text: "I also want to upload a video review.",
      error: ""
    };
    return (
      <div className="checkBoxAndBtnContainer">
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="checkBoxContainer">
                {this.renderCheckBox(agreement)}
              </div>
            </div>
            <div className="col-md-6">
              <div className="checkBoxContainer">
                {this.renderCheckBox(videoReview)}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <div className="submitBtnContainer">{this.renderSubmitBtn()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderUniversalLoader = () => {
    return (
      <UniversalLoader status={this.state.reviewSent}>
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
        <div style={{ textAlign: "left", color: "#21bc61" }}>
          Thank you for your review - we will contact with you soon{" "}
          <i className="fa fa-check"></i>
        </div>
        {/* third child for error state */}
        <div style={{ textAlign: "left", color: "red" }}>
          Some error occured, please try again later{" "}
          <i className="fa fa-close"></i>
        </div>
      </UniversalLoader>
    );
  };

  handleVideoUploadSubmit = e => {
    e.preventDefault();
    let { formData, videoFile } = this.state;
    let newFormData = {};
    let dataToSubmit = {};
    let valid = true;
    for (let item in formData) {
      if (item !== "review") {
        valid = valid && formData[item].valid;
        if (valid) {
          dataToSubmit = { ...dataToSubmit, [item]: formData[item].value };
          newFormData = { ...newFormData, [item]: { ...formData[item] } };
        } else {
          newFormData = {
            ...newFormData,
            [item]: { ...formData[item], touched: true }
          };
        }
      }
    }
    if (
      valid &&
      Object.keys(videoFile.errors).length === 0 &&
      videoFile.size > 0
    ) {
      // alert(JSON.stringify(dataToSubmit));
      //axios post request
      //reviewUploadUrl
      this.setState({ videoDataSent: "in-progress" }, () => {
        axios
          .post("https://jsonplaceholder.typicode.com/posts", {
            name: dataToSubmit.videoTitle,
            description: dataToSubmit.videoDescription,
            size: videoFile.size
          })
          .then(res => {
            console.log(res);
            this.setState({ videoDataSent: "success" }, () => {
              // let res = res.data;

              //res.url below replace

              var upload = new tus.Upload(this.state.videoFile.file, {
                endpoint: "http://localhost:3000/static/uploads",
                retryDelays: [0, 3000, 5000, 10000, 20000],
                metadata: {},
                onError: error => {
                  this.setState({ videoUploaded: "error" });
                  console.log("Failed because: " + error);
                },
                onProgress: (bytesUploaded, bytesTotal) => {
                  var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(
                    2
                  );
                  // setState for videoProgress
                  console.log(bytesUploaded, bytesTotal, percentage + "%");
                },
                onSuccess: () => {
                  console.log(
                    "Video might take some time to process on Vimeo."
                  );
                  this.setState({ videoUploaded: "success" });
                }
              });
              upload.start();
              /////////////////////
            });
          })
          .catch(err => {
            console.error(err);
            this.setState({ videoDataSent: "error" });
          });
      });

      //submit video also
    } else {
      if (videoFile.filename === "") {
        this.setState({
          formData: { ...newFormData },
          videoFile: {
            ...videoFile,
            errors: {
              ...videoFile.errors,
              required: "* please select a video file"
            }
          }
        });
      } else {
        this.setState({ formData: { ...newFormData } });
      }
    }
  };

  renderVideoReviewUpload = () => {
    const {
      formData,
      errors,
      videoFile,
      videoDataSent,
      videoUploaded
    } = this.state;
    return (
      <div>
        {this.renderUniversalLoader()}
        <style jsx>{newLeaveReviewPageStyles}</style>
        {videoUploaded === "no" ? (
          <VideoUploadForm
            formData={{ ...formData }}
            handleFormDataChange={this.handleFormDataChange}
            handleVideoUploadSubmit={this.handleVideoUploadSubmit}
            errors={errors}
            ref={this.fileInput}
            videoFile={videoFile}
            videoDataSent={videoDataSent}
          />
        ) : (
          <UniversalLoader status={videoUploaded}>
            <div></div>
            <div style={{ color: "green", marginTop:"50px", height:"50vh" }}>
              Video was uploaded successfully
            </div>
            <div style={{ color: "red", marginTop:"50px", height:"50vh" }}>
              Some error occured while uploading video review, please try again
              later
            </div>
          </UniversalLoader>
        )}
      </div>
    );
  };

  render() {
    const { mainRating } = this.state.ratings;
    const { reviewSent, videoReview } = this.state;
    return (
      <div style={{ background: "#f5f5f5" }}>
        <style jsx>{newLeaveReviewPageStyles}</style>
        <div className="container">
          {this.renderReviewHeader()}
          {this.renderReviewHeroSection()}
          <div className="reviewContainerInner">
            {reviewSent !== "success" || videoReview !== "yes"
              ? mainRating > 0
                ? this.renderFinalReviewSection()
                : this.renderMainReviewSection()
              : this.renderVideoReviewUpload()}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default NewLeaveReview;
