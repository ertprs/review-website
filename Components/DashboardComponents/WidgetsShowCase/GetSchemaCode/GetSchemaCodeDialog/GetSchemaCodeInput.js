import React from "react";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { connect } from "react-redux";

const GetSchemaCodeInput = props => {
  const { handleSubmit } = props;
  return (
    <div>
      {/* <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        name="automatic-schedule-list"
        placeholder="Select schedule time..."
        options={automaticScheduleList}
        onChange={valObj => {
          const value = _get(valObj, "value", "");
          this.props.handleChange(value.toString());
        }}
      /> */}
      <h5>TO DO: Select for available platforms with reviews</h5>
      <h5>TO DO: Select for business type</h5>
      <Button onClick={handleSubmit} color="primary" variant="contained">
        Send data
      </Button>
    </div>
  );
};

const mapStateToProps = () => {};

export default connect(mapStateToProps)(GetSchemaCodeInput);
