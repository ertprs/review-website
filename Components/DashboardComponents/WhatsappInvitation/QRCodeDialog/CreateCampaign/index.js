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
    <div className="container">
      <style jsx>
        {`
          .campaignStartedContainer {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .imageContainer {
            max-width: 400px;
            height: auto;
          }
          .imageContainer img {
            max-width: 100%;
            height: auto;
          }
        `}
      </style>
      <div className="campaignStartedContainer">
        <div className="imageContainer">
          <img src="/static/images/check-mark-animated.gif" />
        </div>
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
              <h3>Campaign created successfully!</h3>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "45px" }}>
              <h3>{createCampaignErrorMsg}</h3>
            </div>
          )}
        </div>
      </div>
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
    "whatsAppAutomaticCreateCampaign.errorMsg",
    "Some error ocurred !"
  );
  return {
    createCampaignIsLoading,
    createCampaignSuccess,
    createCampaignErrorMsg
  };
};

export default connect(mapStateToProps, {})(CreateCampaign);
