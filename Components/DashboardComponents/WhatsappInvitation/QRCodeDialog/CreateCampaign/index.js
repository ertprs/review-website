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
        <>
          <h3>Creating your campaign</h3>
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        </>
      ) : createCampaignSuccess ? (
        <h3>Campaign created successfully</h3>
      ) : (
        <h3>{createCampaignErrorMsg}</h3>
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
