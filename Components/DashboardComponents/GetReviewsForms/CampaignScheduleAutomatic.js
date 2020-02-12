import React, { Component } from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button/Button";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import automaticScheduleList from "../../../utility/automaticScheduleList.json";
import _get from "lodash/get";
class CampaignScheduleAutomatic extends Component {
  componentDidMount() {
    this.props.handleChange("");
  }
  render() {
    //? showSaveBtn, captionText is used when we use this component inside whatsApp automatic component.
    const {
      campaignScheduleAutomaticData,
      showSaveBtn,
      captionText
    } = this.props;
    const isValid = _get(campaignScheduleAutomaticData, "valid", false);
    const value = _get(campaignScheduleAutomaticData, "value", "");
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Schedule your automatic invitation</h2>
            <div>
              <div style={{ margin: "20px 0 20px 0" }}>
                <h6>
                  Please select from below the schedule for your automatic
                  invitations :
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="automatic-schedule-list"
              placeholder="Select schedule time..."
              options={automaticScheduleList}
              onChange={valObj => {
                const value = _get(valObj, "value", "");
                this.props.handleChange(value.toString());
              }}
            />
          </div>
          {/* Used in automatic whatsApp invitations */}
          {captionText ? (
            <div
              className="col-md-12"
              style={{ marginTop: "8px", color: "green" }}
            >
              <small>{captionText}</small>
            </div>
          ) : null}
          {/* Used in automatic whatsApp invitations */}
          {showSaveBtn ? (
            <div className="col-md-12">
              <div style={{ marginTop: "45px" }}>
                <span style={{ marginRight: "25px" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      this.props.handleChange("0");
                      this.props.handleClose();
                    }}
                  >
                    Cancel
                  </Button>
                </span>
                <span>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    endIcon={<CheckIcon />}
                    onClick={this.props.handleSave}
                    disabled={!isValid}
                  >
                    Save
                  </Button>
                </span>
              </div>
            </div>
          ) : (
            <div className="col-md-12">
              <div style={{ marginTop: "45px" }}>
                <span style={{ marginRight: "25px" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    endIcon={<CheckIcon />}
                    onClick={this.props.handleBack}
                  >
                    Back
                  </Button>
                </span>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  endIcon={<ArrowRight />}
                  onClick={this.props.handleNext}
                  disabled={!isValid}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default CampaignScheduleAutomatic;
