import React, { Component } from "react";
import Select from "react-select";
import { maxReviewsOptions } from "../../../../../utility/constants/maxReviewsConstants";

class MaxReviewsSelector extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <h6>Select maximum available reviews you want to display :</h6>
          <Select
            options={maxReviewsOptions}
            value={value}
            onChange={valObj => {
              handleChange("selectedMaxReviews", valObj);
            }}
          />
          <div style={{ marginBottom: "12px" }}>
            <small>
              Note : Selecting the count above only ensures that you get at most
              selected count reviews per platform but the actual count may vary
              depending upon the availability on that particular review platform
              and the number of text reviews available.
            </small>
          </div>
        </div>
      </div>
    );
  }
}
export default MaxReviewsSelector;
