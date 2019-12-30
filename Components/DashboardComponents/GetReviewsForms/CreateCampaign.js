import React, { Component } from "react";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import FormField from "../../Widgets/FormField/FormField";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { clearCampaignData } from "../../../store/actions/dashboardActions";
import _get from "lodash/get";
import { connect } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class CreateCampaign extends Component {
  componentDidMount() {
    this.props.scrollToTopOfThePage();
    this.props.clearCampaignData({
      isLoading: false,
      errorMsg: "",
      quotaDetails: _get(this.props.createCampaignData, "quotaDetails", {}),
      success: "undefined"
    });
  }
  render() {
    const {
      formData,
      handleChange,
      isCampaignEditMode,
      navigateToCampaignManagement
    } = this.props;
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
              margin-top: 12px;
            }
            .heading {
              margin-bottom: 20px;
            }
            .goBackButton {
              float: right;
            }
          `}</style>
          {isCampaignEditMode ? (
            <div className="goBackButton">
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={navigateToCampaignManagement}
              >
                Go Back To Campaign History
              </Button>
            </div>
          ) : null}
          <h3 className="heading">Create Campaign Wizard</h3>

          <div className="row">
            <div className="col-md-7">
              <FormField
                {...formData.campaignName}
                handleChange={e => {
                  handleChange(e, "campaignName", "createCampaign");
                }}
                id="campaignName"
                rows="5"
                col="5"
              />
              <FormField
                {...formData.campaignLanguage}
                handleChange={e => {
                  handleChange(e, "campaignLanguage", "createCampaign");
                }}
                id="campaignLanguage"
                rows="5"
                col="5"
                styles={{ height: "38px" }}
              />
              <FormField
                {...formData.senderName}
                handleChange={e => {
                  handleChange(e, "senderName", "createCampaign");
                }}
                id="senderName"
                rows="5"
                col="5"
              />
              <Tooltip
                title={
                  <span style={{ fontSize: "14px" }}>
                    Upgrade to premium to send invitations using your own email
                    domain.
                  </span>
                }
              >
                <FormField
                  {...formData.senderEmail}
                  handleChange={e => {
                    handleChange(e, "senderEmail", "createCampaign");
                  }}
                  id="senderEmail"
                  rows="5"
                  col="5"
                  disabled={true}
                />
              </Tooltip>
              {/* <p className="textnote">
                * Upgrade to premium to send invitations using your own email
                domain.
              </p> */}
              <FormControl
                component="fieldset"
                style={{ marginBottom: "15px", marginTop: "12px" }}
              >
                <FormLabel component="legend" style={{ marginBottom: "15px" }}>
                  Choose your invitation type :{" "}
                </FormLabel>
                <RadioGroup
                  aria-label="campaignInvitationMethod"
                  name="campaignInvitationMethod"
                  value={formData.campaignInvitationMethod.value}
                  onChange={e => {
                    handleChange(
                      e,
                      "campaignInvitationMethod",
                      "createCampaign"
                    );
                  }}
                >
                  {isCampaignEditMode ? null : (
                    <FormControlLabel
                      value="manual"
                      control={<Radio />}
                      label="Manual invitations (by uploading a csv/xls file, copy/pasting, or by entering customers data manually)"
                      style={{ marginBottom: "25px" }}
                    />
                  )}
                  <FormControlLabel
                    value="automatic"
                    control={<Radio />}
                    label="Automatic invitations (API integration, Woocommerce, Wordpress, Magento, shopify, etc"
                  />
                </RadioGroup>
              </FormControl>
              <div style={{ margin: "25px 0 25px 0" }}>
                {!this.props.isCampaignEditMode ? (
                  <span style={{ marginRight: "35px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<ArrowLeft />}
                      onClick={this.props.onBackClick}
                    >
                      Back
                    </Button>
                  </span>
                ) : null}
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

export default connect(mapStateToProps, { clearCampaignData })(CreateCampaign);
