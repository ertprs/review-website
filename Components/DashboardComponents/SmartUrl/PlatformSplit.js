import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles";
import _get from "lodash/get";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const PrettoSlider = withStyles({
  root: {
    // color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 10,
    borderRadius: 4
  },
  rail: {
    height: 10,
    borderRadius: 4
  }
})(Slider);

const PlatformSplit = ({
  reviewPlatforms,
  handleSplitValueChange,
  sumOfAllSplits,
  handleGenerateReviewUrlClick,
  isLoading
}) => {
  return (
    <div>
      {(reviewPlatforms || []).map((platform, index) => {
        return (
          <>
            <style jsx>{`
              .sliderContainer {
                display: flex;
                flex: 1;
                align-items: center;
              }
            `}</style>
            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col-md-3">
                <TextField
                  defaultValue={_get(platform, "name", "")}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </div>
              <div className="col-md-6 sliderContainer">
                <PrettoSlider
                  style={{
                    color: _get(platform, "hasError", false)
                      ? "#e53935"
                      : "#52af77"
                  }}
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={_get(platform, "value", 0)}
                  value={_get(platform, "value", 0)}
                  onChange={(e, val) => {
                    handleSplitValueChange(val, index);
                  }}
                  min={_get(platform, "min", 0)}
                  max={_get(platform, "max", 0)}
                />
              </div>
              <div className="col-md-2">
                <div className="row">
                  <OutlinedInput
                    style={{ width: "45%" }}
                    value={_get(platform, "value", 0)}
                    onChange={e => {
                      handleSplitValueChange(_get(e, "target.value", 0), index);
                    }}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    labelWidth={0}
                  />
                  <FormHelperText
                    id="filled-weight-helper-text"
                    style={{ width: "100%", marginLeft: "2px" }}
                  >
                    Split Percentage
                  </FormHelperText>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <div className="row">
        <div className="col-md-8">
          {isLoading ? (
            <Button variant="contained" color="primary">
              <CircularProgress style={{ color: "#fff" }} size={20} />
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={sumOfAllSplits !== 100}
              onClick={handleGenerateReviewUrlClick}
            >
              Generate Review Url
            </Button>
          )}
        </div>
        <div className="col-md-3">
          <div style={{ textAlign: "center" }}>
            <h5>
              Total :{" "}
              {sumOfAllSplits === 100 ? (
                <span style={{ color: "green" }}>{sumOfAllSplits}</span>
              ) : (
                <span style={{ color: "red" }}>{sumOfAllSplits}</span>
              )}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSplit;
