import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import _get from "lodash/get";
function PremiumBrandingToggle(props) {
  const { premiumBrandingToggleData, handleChange } = props;
  const value = _get(premiumBrandingToggleData, "value", "");
  const checked = _get(premiumBrandingToggleData, "checked", false);
  const label = _get(premiumBrandingToggleData, "label", "");
  const disabled = _get(premiumBrandingToggleData, "disabled", false);
  return (
    <div>
      <div style={{ margin: "40px 0 40px 0" }}>
        <div>
          <h6 style={{ marginBottom: "15px" }}>
            Use widgets with or without branding{" "}
            <small>
              (* This feature is available only for our premium customers)
            </small>
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
                  ? "Turn on the switch to see widgets without branding"
                  : label
              }
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default PremiumBrandingToggle;
