import React, { Component } from "react";
import FormField from "../../../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import { CircularProgress } from "@material-ui/core";
import _get from "lodash/get";

class Generic extends Component {
  renderFormFields = () => {
    let output = [];
    const { formData, handleFormDataChange } = this.props;
    for (let item in formData) {
      output = [
        ...output,
        <div>
          <style jsx>
            {`
              .label {
                font-weight: bold;
                margin-bottom: 5px;
                font-size: 15px;
              }
            `}
          </style>
          <div className="form-group">
            <div className="label">
              <label>{formData[item].labelText}</label>
            </div>
            <FormField
              {...formData[item]}
              handleChange={(e, id) => {
                handleFormDataChange(e, id, "Generic");
              }}
              styles={{
                height: "38px"
              }}
            />
          </div>
        </div>
      ];
    }
    return output;
  };

  render() {
    const { handleSaveAndContinue, isLoading, formData } = this.props;
    let disabled = true;
    disabled =
      !_get(formData, "consumer_secret.value", "") &&
      !_get(formData, "consumer_keys.value", "");
    return (
      <div>
        <div style={{ marginBottom: "25px" }}>
          <h4>Integrate generic api form :</h4>
        </div>
        {this.renderFormFields()}
        <div className="form-group" style={{ textAlign: "right" }}>
          {isLoading ? (
            <Button variant="contained" color="primary">
              <CircularProgress style={{ color: "white" }} size={25} />
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              endIcon={<ArrowRight />}
              onClick={handleSaveAndContinue}
            >
              Save &amp; Continue
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Generic;
