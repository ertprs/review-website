import React from "react";
import { productReviewStyles } from "../Components/Styles/productReviewStyles";
import ProductReviewStepOne from "../Components/ProductReviewSteps/ProductReviewStepOne/ProductReviewStepOne";
import ProductReviewStepTwo from "../Components/ProductReviewSteps/ProductReviewStepTwo/ProductReviewStepTwo";
import ThankYou from "../Components/ThankYou/ThankYou";
import { baseURL } from "../utility/config";
import Footer from "../Components/Footer/Footer";
import validate from "../utility/validate";
import axios from "axios";
import tus from "tus-js-client";

class ProductReview extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      step: 0,
      ratings: {
        mainRating: 0
      },
      products: [],
      reviewFormSubmissionErrors: {},
      selectedProducts: {},
      productsTagged: [],
      productsAlreadyTagged: [],
      selectedProductKeys: [],
      videoDataSent: "no",
      videoUploaded: "no",
      showVideoForm: "no",
      reviewBtnClicked: false,
      reviewSent: "no",
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
      },
      videoFile: {
        errors: {},
        filename: "",
        size: 0,
        uploadProgress: 0
      }
    };
  }

  goToNextStep = () => {
    const { step, selectedProductKeys } = this.state;
    const initState = {
      ratings: {
        mainRating: 0
      },
      reviewFormSubmissionErrors: {},
      videoDataSent: "no",
      videoUploaded: "no",
      showVideoForm: "no",
      reviewBtnClicked: false,
      reviewSent: "no",
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
      },
      videoFile: {
        errors: {},
        filename: "",
        size: 0,
        uploadProgress: 0
      }
    };
    if (step <= selectedProductKeys.length) {
      //refresh the state and move to next step
      this.setState(currentState => {
        return {
          ...initState,
          step: currentState.step + 1,
          productsTagged: [],
          productsAlreadyTagged: [...currentState.productsAlreadyTagged]
        };
      });
    }
  };

  handleRatingChange = (id, newRating) => {
    const { ratings } = this.state;
    this.setState({ ratings: { ...ratings, [id]: newRating } });
  };

  handleProductTagsChanged = data => {
    const { productsTagged, productsAlreadyTagged,step } = this.state;
    if (data) {
      this.setState({ productsTagged: [...data]});
    } else {
      this.setState({
        productsTagged: []
      });
    }
  };

  componentDidMount() {
    axios
      .get(`${baseURL}/api/get-order-data`)
      .then(res => {
        const products = res.data.products;
        console.log(res);
        this.setState({ products: [...products] });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleProductSelection = (item, operation) => {
    const { selectedProducts } = this.state;
    if (operation) {
      this.setState(
        { selectedProducts: { ...selectedProducts, [item.id]: item } },
        () => {
          this.setState({
            maxSteps: Object.keys(this.state.selectedProducts).length,
            selectedProductKeys: Object.keys(this.state.selectedProducts)
          });
        }
      );
    } else {
      let selectedProductsCopy = { ...selectedProducts };
      delete selectedProductsCopy[item.id];
      this.setState({ selectedProducts: { ...selectedProductsCopy } }, () => {
        this.setState({
          maxSteps: Object.keys(this.state.selectedProducts).length,
          selectedProductKeys: Object.keys(this.state.selectedProducts)
        });
      });
    }
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
    return errorObj;
  };

  handleReviewFormSubmit = e => {
    e.preventDefault();
    //validating before submitting
    const reviewFormSubmissionErrors = this.validateAllFields();
    const { formData } = this.state;
    const { ratings } = this.state;
    if (Object.keys(reviewFormSubmissionErrors).length === 0) {
      //mimic data post
      const dataToSubmit = {
        ...ratings,
        review: formData.review.value
      };
      console.log(dataToSubmit);
      //clear form data on clicking next
      this.setState(
        { reviewBtnClicked: true, reviewSent: "in-progress" },
        () => {
          //axios post dataToSubmit
          setTimeout(() => {
            this.setState({ reviewSent: "success" });
            if (this.state.videoReview === "no") {
              // setTimeout(() => {
              //   Router.push("/reviews/google.com");
              // }, 2000);
            }
          }, 3000);
        }
      );
    } else {
      this.setState({
        reviewFormSubmissionErrors: { ...reviewFormSubmissionErrors }
      });
    }
  };

  handleVideoUploadSubmit = e => {
    e.preventDefault();
    let { formData, videoFile, productsTagged } = this.state;
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
        console.log({ ...dataToSubmit, productsTagged });
        axios
          .post("https://jsonplaceholder.typicode.com/posts", {
            name: dataToSubmit.videoTitle,
            description: dataToSubmit.videoDescription,
            size: videoFile.size,
            productsTagged: productsTagged
          })
          .then(res => {
            console.log(res);
            this.setState({ videoDataSent: "success", productsAlreadyTagged:[...this.state.productsAlreadyTagged,...this.state.productsTagged] }, () => {
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

  handleCheckBoxChange = (e, id) => {
    this.setState({ [id]: e.target.value === "yes" ? "no" : "yes" });
  };

  renderReviewHeader = () => {
    return (
      <div className="reviewHeader">
        <style jsx>{productReviewStyles}</style>
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
        <style jsx>{productReviewStyles}</style>
        <div className="reviewHeroHeading">
          <h3>Review your recent purchase</h3>
        </div>
        <div className="reviewHeroSubheading">
          <h6>Your feedback helps others make good choices</h6>
        </div>
      </div>
    );
  };

  renderAppropiateStep = () => {
    const {
      products,
      selectedProducts,
      selectedProductKeys,
      productsTagged,
      productsAlreadyTagged,
      step
    } = this.state;
    const productToRate = selectedProducts[selectedProductKeys[step - 1]];
    if (step === 0) {
      return (
        <ProductReviewStepOne
          products={products}
          handleProductSelection={this.handleProductSelection}
          selectedProducts={selectedProducts}
          goToNextStep={this.goToNextStep}
        />
      );
    } else if(step<=this.state.selectedProductKeys.length) {
      return (
        <ProductReviewStepTwo
          productToRate={productToRate}
          selectedProductKeys={selectedProductKeys}
          selectedProducts={selectedProducts}
          productsTagged={productsTagged}
          productsAlreadyTagged={productsAlreadyTagged}
          step={step}
          goToNextStep={this.goToNextStep}
          handleRatingChange={this.handleRatingChange}
          ratings={this.state.ratings}
          formData={this.state.formData}
          handleFormDataChange={this.handleFormDataChange}
          handleReviewFormSubmit={this.handleReviewFormSubmit}
          showVideoForm={this.state.showVideoForm}
          reviewBtnClicked={this.state.reviewBtnClicked}
          reviewFormSubmissionErrors={this.state.reviewFormSubmissionErrors}
          reviewSent={this.state.reviewSent}
          videoFile={this.state.videoFile}
          handleProductTagsChanged={this.handleProductTagsChanged}
          videoDataSent={this.state.videoDataSent}
          ref={this.fileInput}
          handleVideoUploadSubmit={this.handleVideoUploadSubmit}
          handleCheckBoxChange={this.handleCheckBoxChange}
          videoUploaded={this.state.videoUploaded}
        />
      );
    }
    else{
      return(<ThankYou />)
    }
  };

  render() {
    return (
      <div style={{ background: "#f5f5f5" }}>
        <div className="container">
          <style jsx>{productReviewStyles}</style>
          {this.renderReviewHeader()}
          {this.renderReviewHeroSection()}
          <div className="reviewContainerInner">
            {this.renderAppropiateStep()}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ProductReview;
