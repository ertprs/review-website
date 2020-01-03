import React, { Component } from "react";
import CalenderIcon from "@material-ui/icons/CalendarToday";
import { IconButton, InputAdornment } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import _get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import { isFifteenMinuteDiff } from "../../../utility/commonFunctions";
const styles = {
  MuiInputBase: {
    width: "100%"
  }
};

const scheduleWays = [
  { id: 1, label: "Immediately" },
  { id: 2, label: "Schedule for sometime later" }
];

class CampaignSchedule extends Component {
  state = {
    selectedWay: ""
  };

  handleExpansionPanelChange = id => {
    if (id !== 2) {
      this.props.handleCampaignScheduleDateChange(null, true);
    }
    this.setState({ selectedWay: id });
  };

  renderAppropriateFormControl = () => {
    const { selectedWay } = this.state;
    const appropriateForm = {
      1: { id: 1, component: this.renderImmediatelyMsg },
      2: { id: 2, component: this.renderDateTimePicker }
    };
    const appropriateFormControl = _get(appropriateForm, selectedWay, "");
    if (appropriateFormControl) {
      return appropriateFormControl.component;
    }
  };

  renderImmediatelyMsg = () => {
    return (
      <div>
        <h6>
          Start sending your invitations immediately, click on the continue
          button below to proceed.
        </h6>
        <div style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              this.props.handleNext();
            }}
            endIcon={<ArrowRight />}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  };

  renderDateTimePicker = () => {
    const { classes } = this.props;
    const { selectedWay } = this.state;
    return (
      <>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            className={classes.MuiInputBase}
            ampm={false}
            label="Schedule time"
            inputVariant="outlined"
            value={this.props.selectedDate}
            onChange={this.props.handleCampaignScheduleDateChange}
            disablePast
            clearable
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <CalenderIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            format="DD MM YYYY, HH:mm:ss"
          />
        </MuiPickersUtilsProvider>
        {!this.props.isValid && this.props.touched ? (
          <div style={{ color: "red", marginTop: "8px" }}>
            * {this.props.errorMessage}
          </div>
        ) : null}
        <div style={{ marginTop: "25px" }}>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                // on click of continue also check for 15 minutes from now
                if (isFifteenMinuteDiff(this.props.selectedDate)) {
                  this.props.handleNext();
                } else {
                  this.props.handleCampaignScheduleDateChange(
                    this.props.selectedDate
                  );
                }
              }}
              endIcon={<ArrowRight />}
              disabled={!this.props.isValid}
            >
              Continue
            </Button>
          </div>
        </div>
      </>
    );
  };

  renderExpansionPanels = () => {
    const { selectedWay } = this.state;
    return scheduleWays.map((item, index) => {
      return (
        <ExpansionPanel
          expanded={item.id === selectedWay}
          onChange={e => {
            this.handleExpansionPanelChange(item.id);
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
                {this.renderAppropriateFormControl()
                  ? this.renderAppropriateFormControl()()
                  : null}
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  renderActionButtons = () => {
    return (
      <>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            this.props.handleBack();
          }}
          startIcon={<ArrowLeft />}
        >
          Back
        </Button>
      </>
    );
  };

  componentDidMount() {
    this.props.scrollToTopOfThePage();
    this.props.handleCampaignScheduleDateChange(null, true);
  }

  render() {
    const { classes } = this.props;
    const { selectedWay } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Schedule your invitations</h2>
            <h6 style={{ marginTop: "25px", marginBottom: "20px" }}>
              Please select from below, whether you want to send your campaigns
              immediatly or schedule for some time later.
            </h6>
            <RadioGroup
              aria-label="campaignSchedule"
              name="campaignSchedule"
              value={selectedWay}
              onChange={e => {
                let value = _get(e, "target.value", -1);
                this.handleExpansionPanelChange(Number(value));
              }}
            >
              {this.renderExpansionPanels()}
            </RadioGroup>
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>{this.renderActionButtons()}</div>
      </div>
    );
  }
}

export default withStyles(styles)(CampaignSchedule);
