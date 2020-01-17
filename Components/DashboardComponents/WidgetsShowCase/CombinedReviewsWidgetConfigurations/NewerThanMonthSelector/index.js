import React, { Component } from "react";
import Select from "react-select";
import { newerThanMonthsOptions } from "../../../../../utility/constants/newerThanMonthsConstants";

class NewerThanMonthSelector extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <h6>Select newer than months :</h6>
          <Select
            options={newerThanMonthsOptions}
            value={value}
            onChange={valObj => {
              handleChange("selectedNewerThanMonths", valObj);
            }}
          />
        </div>
      </div>
    );
  }
}
export default NewerThanMonthSelector;
