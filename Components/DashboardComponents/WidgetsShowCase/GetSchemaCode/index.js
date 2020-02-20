import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import _get from "lodash/get";

import FetchSchemaCode from "./FetchSchemaCode";

const GetSchemaCode = props => {
  const {
    getSchemaCodeData,
    handleChange,
    handleSchemaCodeValueChange
  } = props;
  const value = _get(getSchemaCodeData, "value", "");
  const checked = _get(getSchemaCodeData, "checked", false);
  const label = _get(getSchemaCodeData, "label", "");
  const disabled = _get(getSchemaCodeData, "disabled", false);
  return (
    <div>
      <div style={{ margin: "40px 0 40px 0" }}>
        <div>
          <h6 style={{ marginBottom: "15px" }}>
            Add Schema.org code to your page for better search results
          </h6>
        </div>
        <div style={{ border: "1px solid #d8d8d8", padding: "15px" }}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  value={value}
                  color="secondary"
                  disabled={disabled}
                />
              }
              label={disabled ? "" : label}
            />
          </FormGroup>
          {checked ? (
            <FetchSchemaCode
              handleSchemaCodeValueChange={handleSchemaCodeValueChange}
              {...props}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GetSchemaCode;
