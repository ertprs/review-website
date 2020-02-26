import React, { Component } from "react";
import FormField from "../../../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import { CircularProgress } from "@material-ui/core";
import _get from "lodash/get";
import { areFieldsTouched } from "../../../../../utility/commonFunctions";
import Link from "next/link";

class Generic extends Component {
  renderFormFields = () => {
    const { formData, handleFormDataChange } = this.props;
    let formDataKeys = Object.keys(formData).sort();
    return (formDataKeys || []).map(item => (
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
              handleFormDataChange(e, id, "TrustSearch_API");
            }}
            styles={{
              height: "38px"
            }}
          />
        </div>
      </div>
    ));
  };

  handleSave = () => {
    const { handleSaveAndContinue, type, formData } = this.props;
    let reqBody = {
      type,
      name: _get(formData, "shopName.value", ""),
      locale: _get(formData, "locale.value", "")
    };
    handleSaveAndContinue(reqBody);
  };

  render() {
    const { isLoading, formData, sendToSelectPlatformSplit } = this.props;
    let disabled = false;
    disabled =
      !_get(formData, "name.value", "") && !_get(formData, "locale.value", "");
    return (
      <div>
        <div style={{ marginBottom: "25px" }}>
          <h4>Integrate TrustSearch api form : </h4>
          <Link href="/TrustSearc_API_integrationDocumentation">
            <a target="_blank">Documentation</a>
          </Link>
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
                disabled={disabled}
                onClick={this.handleSave}
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

export default Generic;
