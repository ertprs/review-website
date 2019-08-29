import React, { useState } from "react";
import Router from "next/router";
import Ratings from "react-ratings-declarative";
import BigLoader from "../Components/Widgets/BigLoader/BigLoader";
import { leaveReviewStyles } from "../Components/Styles/leaveReviewPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import Layout from "../hoc/layout/layout";
import validate from "../utility/validate";
import axios from "axios";

const handleChangeRating = (newRating, setRating) => {
  setRating(newRating);
};

const isValidFormSubmission = formData => {
  let valid = true;
  let dataToSubmit = {};
  for (let item in formData) {
    valid = valid && formData[item].valid;
    dataToSubmit = { ...dataToSubmit, [item]: formData[item].value.trim() };
  }
  return { valid, dataToSubmit };
};

const handleFormSubmit = (
  formData,
  rating,
  setLoading,
  setSubmitted,
  queryData
) => {
  let data = isValidFormSubmission(formData);
  if (data.valid) {
    setLoading(true);
    let finalDataToSubmit = { ...data.dataToSubmit, rating: rating };
    axios
      .post(
        "https://search-api-dev.cryptopolice.com/api/save-order-data-application",
        {
          report_category_id: 8,
          token: queryData.token,
          campaign_processing_id: queryData.campaignProcessingId,
          domain_name: queryData.domain_name,
          data: {
            review_rate: finalDataToSubmit.rating,
            review_text: finalDataToSubmit.review.trim()
          }
        }
      )
      .then(res => {
        console.log(res);
        setLoading(false);
        setSubmitted("yes");
        setTimeout(()=>{
          Router.push(`/reviews/${queryData.domain_name}`)
        }, 6000)
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setSubmitted("error");
        setTimeout(()=>{
          Router.push(`/reviews/${queryData.domain_name}`)
        }, 6000)
      });
  }
};

const handleFormDataChange = (e, id, setFormData, formData) => {
  setFormData({
    ...formData,
    [id]: {
      ...formData[id],
      value: e.target.value,
      valid: validate(e.target.value, formData[id].validationRules),
      touched: true
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
  setSubmitted,
  campaignProcessingId,
  domain_name,
  token
) => {
  return rating > 0 ? (
    !loading ? (
      <div>
        <style jsx>{leaveReviewStyles}</style>
        <h6 className="heading">Share your experience</h6>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleFormSubmit(formData, rating, setLoading, setSubmitted, {
              campaignProcessingId,
              domain_name,
              token
            });
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
  const [submitted, setSubmitted] = useState("no");
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
    <Layout>
      <div className="leaveReviewContainer">
        <style jsx>{leaveReviewStyles}</style>
        <div className="container">
          <div className="row">
            {submitted === "no" ? (
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
                    setSubmitted,
                    props.campaignProcessingId,
                    props.domain_name,
                    props.token
                  )}
                </div>
              </div>
            ) : (
              <div className="leaveReviewHeaderContainer">
                {submitted !== "error" ? (
                  <h4>
                    Thank you for your review, it was submitted successfully{" "}
                    <i
                      className="fa fa-check"
                      style={{ color: "#21bc61", fontSize: "2rem" }}
                    />{" "}
                  </h4>
                ) : (
                  <h4>
                    Some error occured, please try again later{" "}
                    <i
                      className="fa fa-close"
                      style={{ color: "red", fontSize: "2rem" }}
                    />{" "}
                  </h4>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

LeaveReview.getInitialProps = async ctx => {
  const { query } = ctx;
  const campaignProcessingId = query.campaignProcessingId || "";
  const domain_name = query.domain_name || "";
  const token = query.token || "";
  if (
    campaignProcessingId.trim() === "" ||
    domain_name.trim === "" ||
    token.trim() === ""
  ) {
    if (ctx && ctx.req) {
      console.log("server side");
      ctx.res.writeHead(302, { Location: `/` });
      ctx.res.end();
    } else {
      console.log("client side");
      Router.push(`/`);
    }
  }
  return { campaignProcessingId, domain_name, token };
};
export default LeaveReview;
