import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import _get from "lodash/get";

const CreateCampaign = props => {
  const {
    createCampaignIsLoading,
    createCampaignSuccess,
    createCampaignErrorMsg
  } = props;

  return (
    <div>
      {createCampaignIsLoading ? (
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <h3>Creating your campaign</h3>
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        </div>
      ) : createCampaignSuccess ? (
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <h3>Campaign created successfully</h3>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <h3>{createCampaignErrorMsg}</h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { dashboardData } = state;
  const createCampaignIsLoading = _get(
    dashboardData,
    "whatsAppAutomaticCreateCampaign.isLoading",
    false
  );
  const createCampaignSuccess = _get(
    dashboardData,
    "whatsAppAutomaticCreateCampaign.success",
    null
  );
  const createCampaignErrorMsg = _get(
    dashboardData,
    "whatsAppAutomaticCreateCampaign.errorMessage",
    "Some error ocurred !"
  );
  return {
    createCampaignIsLoading,
    createCampaignSuccess,
    createCampaignErrorMsg
  };
};

export default connect(mapStateToProps, {})(CreateCampaign);
