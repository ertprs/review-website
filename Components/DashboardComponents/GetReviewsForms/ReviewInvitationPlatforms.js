import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import { connect } from "react-redux";
import _get from "lodash/get";

const styles = theme => ({
  label: {
    textTransform: "capitalize"
  }
});

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
  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }
  renderReviewPlatformSliders = () => {
    const { platforms, handleSliderChange, sumOfAllSplits } = this.props;
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
                // id="standard-read-only-input"
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
                  style={{ width: "45%" }}
                  value={platforms[socialId].value}
                  onChange={e => {
                    handleSliderChange(e, e.target.value, socialId);
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
                  Split
                </FormHelperText>
              </div>
            </div>
          </div>
        </>
      ];
    }
    return [
      ...output,
      <div className="row">
        <div className="col-md-3 offset-md-8">
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
    ];
  };

  renderReviewPlatformRadioBtns = () => {
    const {
      platforms,
      handleReviewPlatformRadioBtnChange,
      reviewInvitationPlatformsData,
      classes
    } = this.props;
    const selectedSinglePlatform = _get(
      reviewInvitationPlatformsData,
      "selectedSinglePlatform",
      ""
    );
    let output = [];
    for (let socialId in platforms) {
      const data = platforms[socialId];
      output = [
        ...output,
        <FormControlLabel
          classes={{
            label: classes.label
          }}
          value={Number(socialId)}
          control={<Radio style={{ color: "#3a559f" }} />}
          label={data.name}
          style={{ width: "30%" }}
        />
      ];
    }
    return [
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={selectedSinglePlatform}
        onChange={handleReviewPlatformRadioBtnChange}
      >
        {[...output]}
      </RadioGroup>
    ];
  };

  renderAppropriateFormControls = () => {
    const { platforms, reviewInvitationPlatformsData } = this.props;
    const selectedWay = _get(reviewInvitationPlatformsData, "selectedWay", []);
    if (selectedWay === 0) {
      return (
        <>
          <h6>Please choose the platform from below :</h6>
          {this.renderReviewPlatformRadioBtns()}
        </>
      );
    } else if (Object.keys(platforms).length > 1 && selectedWay === 1) {
      return <>{this.renderReviewPlatformSliders()}</>;
    } else if (Object.keys(platforms).length === 1 && selectedWay === 1) {
      return (
        <div>
          <h6>
            You currently have only one review platform setup, please setup
            second one to use this feature.
          </h6>
        </div>
      );
    }
  };

  renderExpansionPanels = () => {
    const { sumOfAllSplits } = this.props;
    const {
      reviewInvitationPlatformsData,
      handleReviewPlatformsExpansionChange
    } = this.props;
    const selectionWays = _get(
      reviewInvitationPlatformsData,
      "selectionWays",
      []
    );
    const selectedWay = _get(reviewInvitationPlatformsData, "selectedWay", []);
    const selectedSinglePlatform = _get(
      reviewInvitationPlatformsData,
      "selectedSinglePlatform",
      ""
    );
    let continueBtnDisabled = true;
    if (selectedWay === 0) {
      if (selectedSinglePlatform !== "") {
        continueBtnDisabled = false;
      }
    } else if (selectedWay === 1) {
      if (sumOfAllSplits === 100) {
        continueBtnDisabled = false;
      }
    }
    const output = (selectionWays || []).map((item, index) => {
      return (
        <ExpansionPanel
          expanded={item.id === selectedWay}
          onChange={e => {
            handleReviewPlatformsExpansionChange(item.id);
          }}
        >
          <ExpansionPanelSummary
            onClick={e => {}}
            // expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="integration-platforms"
            id="integration-platforms"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              control={<Radio />}
              label={item.label}
              value={item.id}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ width: "100%" }}>
            <div className="row" style={{ width: "100%" }}>
              <div className="col-md-12">
                {this.renderAppropriateFormControls()}
              </div>
              <div className="col-md-12">
                <div style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disabled={continueBtnDisabled}
                    endIcon={<ArrowRight />}
                    onClick={this.props.sendToSelectTemplate}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
    return output;
  };

  render() {
    const {
      platforms,
      handleSliderChange,
      sumOfAllSplits,
      reviewInvitationPlatformsData,
      handleReviewPlatformsExpansionChange
    } = this.props;
    const selectedWay = _get(reviewInvitationPlatformsData, "selectedWay", "");
    return (
      <div className="container">
        <h5 style={{ marginBottom: "50px" }}>
          Please select the split range for different review platforms, where
          you would like to send your customers to leave reviews :
        </h5>
        <RadioGroup
          aria-label="typesOfinvitation"
          name="typesOfinvitation"
          value={selectedWay}
          onChange={e => {
            let value = _get(e, "target.value", -1);
            handleReviewPlatformsExpansionChange(Number(value));
          }}
        >
          {this.renderExpansionPanels()}
        </RadioGroup>
        <div style={{ marginTop: "50px" }}>
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

export default connect(mapStateToProps)(
  withStyles(styles)(ReviewInvitationPlatforms)
);
