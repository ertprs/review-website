import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import _get from "lodash/get";
const BackgroundColorToggler = props => {
  const { backgroundColorTogglerData, handleChange } = props;
  const value = _get(backgroundColorTogglerData, "value", "");
  const checked = _get(backgroundColorTogglerData, "checked", false);
  const label = _get(backgroundColorTogglerData, "label", "");
  const disabled = _get(backgroundColorTogglerData, "disabled", false);
  return (
    <div>
      <div style={{ margin: "40px 0 40px 0" }}>
        <div>
          <h6 style={{ marginBottom: "15px" }}>
            Use widgets with white or transparent background{" "}
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
              label={
                disabled
                  ? "Turn on the switch to see widgets with white background"
                  : label
              }
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default BackgroundColorToggler;
