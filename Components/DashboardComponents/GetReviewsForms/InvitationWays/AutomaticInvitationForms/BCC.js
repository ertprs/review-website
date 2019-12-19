import React, { Component } from "react";
import FormField from "../../../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import { CircularProgress } from "@material-ui/core";
import _get from "lodash/get";
import { areFieldsTouched } from "../../../../../utility/commonFunctions";

class BCC extends Component {
  renderFormFields = () => {
    let output = [];
    const { formData, handleFormDataChange } = this.props;
    for (let item in formData) {
      if (item === "bccSender") {
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
                  handleFormDataChange(e, id, "BCC");
                }}
                styles={{
                  height: "38px"
                }}
              />
            </div>
          </div>
        ];
      }
    }
    return output;
  };

  handleSave = () => {
    const {
      handleSaveAndContinue,
      type,
      formData,
      campaignLanguage,
      domainName
    } = this.props;
    let reqBody = {
      type,
      name: `${domainName}-${type}`,
      bccSender: _get(formData, "bccSender.value", ""),
      locale: campaignLanguage || "en"
    };
    handleSaveAndContinue(reqBody);
  };

  render() {
    const { isLoading, formData, sendToSelectPlatformSplit } = this.props;
    let disabled = !_get(formData, "bccSender.value", "");
    return (
      <div>
        <div style={{ marginBottom: "25px" }}>
          <h4>Integrate BCC form :</h4>
        </div>
        {this.renderFormFields()}
        <div className="form-group" style={{ textAlign: "right" }}>
          {areFieldsTouched(formData) ? (
            isLoading ? (
              <Button variant="contained" color="primary">
                <CircularProgress style={{ color: "white" }} size={25} />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
                disabled={disabled}
              >
                Save
              </Button>
            )
          ) : (
            <Button
              disabled={disabled}
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              onClick={sendToSelectPlatformSplit}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default BCC;
