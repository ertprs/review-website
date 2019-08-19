import React, { useState } from "react";
import Ratings from "react-ratings-declarative";
import BigLoader from "../Components/Widgets/BigLoader/BigLoader";
import { leaveReviewStyles } from "./Styles/leaveReviewPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";

const handleChangeRating = (newRating, setRating) => {
  setRating(newRating);
};


const isValidFormSubmission = (formData)=>{
  let valid = true;
  let dataToSubmit = {};
  for(let item in formData){
    valid = valid && formData[item].valid;
    dataToSubmit={...dataToSubmit, [item]:formData[item].value}
  }
  return {valid, dataToSubmit};
}

const handleFormSubmit = (formData, rating, setLoading, setSubmitted) => {
  let data = isValidFormSubmission(formData);
  if (data.valid){
    setLoading(true);
    let finalDataToSubmit={...data.dataToSubmit, rating:rating}
    //mimic data post
    console.log(finalDataToSubmit)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  }
};

const handleFormDataChange = (e, id, setFormData, formData) => {
  setFormData({
    ...formData,
    [id]: {
      ...formData[id],
      value: e.target.value,
      valid: validate(e.target.value, formData[id].validationRules),
      touched:true
    }
  });
};

const renderReviewRatings = (rating, setRating) => {
  return (
    <Ratings
      rating={rating}
      widgetRatedColors="#21bc61"
      widgetHoverColors="#21bc61"
      changeRating={newRating => handleChangeRating(newRating, setRating)}
    >
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
    </Ratings>
  );
};

const renderTextReviewForm = (
  rating,
  formData,
  setFormData,
  loading,
  setLoading,
  submitted,
  setSubmitted
) => {
  return rating > 0 ? (
    !loading ? (
      <div>
        <style jsx>{leaveReviewStyles}</style>
        <h6 className="heading">Share your experience</h6>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleFormSubmit(formData, rating, setLoading, setSubmitted);
          }}
        >
          <FormField
            {...formData.review}
            handleChange={(e, id) => {
              handleFormDataChange(e, id, setFormData, formData);
            }}
            id="review"
            rows="5"
            col="5"
          />
          <button className="leaveReviewBtnStyles">
            Leave a review <i className="fa fa-paper-plane" />
          </button>
        </form>
      </div>
    ) : (
      <div>
        <BigLoader styles={{ borderColor: "#21bc61" }} />
      </div>
    )
  ) : null;
};

const LeaveReview = props => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    review: {
      element: "textarea",
      value: "",
      placeholder: "Enter review text",
      errorMessage: "",
      valid: false,
      touched: false,
      validationRules: {
        required: true
      },
      name: "review"
    }
  });
  return (
    <div className="leaveReviewContainer">
      <style jsx>{leaveReviewStyles}</style>
      <div className="container">
        <div className="row">
          {!submitted ? (
            <div className="col-md-8 offset-md-2">
              <div className="leaveReviewHeaderContainer">
                {loading ? (
                  <h3 style={{ position: "relative", marginBottom: "150px" }}>
                    Submitting your review ...
                  </h3>
                ) : (
                  <h3>Share your experience and unlock your gift!</h3>
                )}
              </div>
              <div className="leaveReviewRatingsContainer">
                {!loading ? renderReviewRatings(rating, setRating) : null}
              </div>
              <div className="leaveReviewTextContainer">
                {renderTextReviewForm(
                  rating,
                  formData,
                  setFormData,
                  loading,
                  setLoading,
                  submitted,
                  setSubmitted
                )}
              </div>
            </div>
          ) : (
            <div className="leaveReviewHeaderContainer">
              <h3>
                Review submitted successfully{" "}
                <i
                  className="fa fa-check"
                  style={{ color: "#21bc61", fontSize: "2rem" }}
                />{" "}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LeaveReview;
