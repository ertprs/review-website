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
        </div>
      </div>
    );
  }
}
export default MaxReviewsSelector;
