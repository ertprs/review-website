import React, { Component } from "react";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FormField from "../../Widgets/FormField/FormField";
import Tooltip from "@material-ui/core/Tooltip";
import { clearCampaignData } from "../../../store/actions/dashboardActions";
import _get from "lodash/get";
import {connect} from 'react-redux';

class CreateCampaign extends Component {
  componentDidMount() {
    this.props.clearCampaignData({
      isLoading: false,
      errorMsg: "",
      quotaDetails: _get(this.props.createCampaignData, "quotaDetails", {}),
      success: false
    });
  }
  render() {
    const { formData } = this.props;
    let valid = true;
    for (let item in formData) {
      valid = valid && formData[item].valid;
    }
    return (
      <>
        <div className="container">
          <style jsx>{`
            .textnote {
              color: grey;
              font-size: 16px;
            }
            .heading {
              margin-bottom: 20px;
            }
          `}</style>
          <h3 className="heading">Create Campaign Wizard</h3>
          <div className="row">
            <div className="col-md-7">
              <FormField
                {...formData.campaignName}
                handleChange={e => {
                  this.props.handleChange(e, "campaignName", "createCampaign");
                }}
                id="campaignName"
                rows="5"
                col="5"
              />
              <FormField
                {...formData.campaignLanguage}
                handleChange={e => {
                  this.props.handleChange(
                    e,
                    "campaignLanguage",
                    "createCampaign"
                  );
                }}
                id="campaignLanguage"
                rows="5"
                col="5"
                styles={{ height: "38px" }}
              />
              <FormField
                {...formData.senderName}
                handleChange={e => {
                  this.props.handleChange(e, "senderName", "createCampaign");
                }}
                id="senderName"
                rows="5"
                col="5"
              />
              <Tooltip
                title="Upgrade to premium to send inviatations using your own email
                domain."
              >
                <FormField
                  {...formData.senderEmail}
                  handleChange={e => {
                    this.props.handleChange(e, "senderEmail", "createCampaign");
                  }}
                  id="senderEmail"
                  rows="5"
                  col="5"
                  disabled={true}
                />
              </Tooltip>
              <p className="textnote">
                * Upgrade to premium to send inviatations using your own email
                domain.
              </p>
              <Button
                variant="contained"
                color="primary"
                size="small"
                endIcon={<ArrowRight />}
                onClick={this.props.onContinueClick}
                disabled={!valid}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { dashboardData } = state;
  const createCampaign = _get(dashboardData, "createCampaign", {});
  return { createCampaignData: { ...createCampaign } };
};

export default connect(
  mapStateToProps,
  { clearCampaignData }
)(CreateCampaign);
