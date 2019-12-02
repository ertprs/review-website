import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowLeft from "@material-ui/icons/ArrowLeft";

import { connect } from "react-redux";
import _get from "lodash/get";

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

class ReviewInvitationPlatforms extends Component {
  renderReviewPlatforms = () => {
    const { platforms, handleSliderChange } = this.props;
    let output = [];
    for (let socialId in platforms) {
      output = [
        ...output,
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
                id="standard-read-only-input"
                label="Review platform"
                defaultValue={platforms[socialId].name}
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
                  color: platforms[socialId].hasError ? "#e53935" : "#52af77"
                }}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={platforms[socialId].value}
                value={platforms[socialId].value}
                onChange={(e, val) => {
                  handleSliderChange(e, val, socialId);
                }}
                min={platforms[socialId].min}
                max={platforms[socialId].max}
              />
            </div>
            <div className="col-md-2">
              <div className="row">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  fullWidth
                  value={platforms[socialId].value}
                  // onChange={handleChange("weight")}
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight"
                  }}
                  labelWidth={0}
                />
                <FormHelperText
                  id="filled-weight-helper-text"
                  style={{ textAlign: "center" }}
                >
                  Split
                </FormHelperText>
              </div>
            </div>
          </div>
        </>
      ];
    }
    return output;
  };

  render() {
    const { platforms, handleSliderChange, sumOfAllSplits } = this.props;
    return (
      <div className="container">
        <h5 style={{ marginBottom: "50px" }}>
          Please select the split range for different review platforms, where
          you would like to send your customers to leave reviews :
        </h5>
        <div className="row">
          <div className="col-md-10">
            {Object.keys(platforms).length > 0 ? (
              <>{this.renderReviewPlatforms()}</>
            ) : null}
          </div>
          <div className="col-md-2">
            <div>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                disabled={
                  sumOfAllSplits === 100 ? false : true
                }
                endIcon={<ArrowRight />}
                onClick={this.props.sendToSelectTemplate}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<ArrowLeft />}
            onClick={this.props.handleListItemBackClick}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(ReviewInvitationPlatforms);
