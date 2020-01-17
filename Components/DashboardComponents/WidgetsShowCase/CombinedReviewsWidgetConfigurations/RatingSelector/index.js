import React, { Component } from "react";
import { ratingCountOptions } from "../../../../../utility/constants/ratingCountConstants";
import Select from "react-select";
class RatingSelector extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <h6>Select ratings :</h6>
          <Select
            options={ratingCountOptions}
            value={value}
            onChange={valObj => {
              handleChange("selectedRatingCount", valObj);
            }}
          />
        </div>
      </div>
    );
  }
}

export default RatingSelector;
