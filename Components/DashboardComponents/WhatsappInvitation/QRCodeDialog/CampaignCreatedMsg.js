import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import CheckSign from "@material-ui/icons/CloudDoneRounded";
import ErrorSign from "@material-ui/icons/Error";
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
            height: 80vh;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .centerText {
            text-align: center;
          }
        `}
      </style>
      <div className="campaignStartedContainer">
        <div>
          {createCampaignIsLoading ? (
            <div className="centerText">
              <div className="centerText">
                <CircularProgress />
              </div>
              <h3>Creating your campaign</h3>
            </div>
          ) : createCampaignSuccess ? (
            <div className="centerText">
              <CheckSign
                style={{ height: "6em", width: "6em", color: "green" }}
              />
              <h1 style={{ color: "green" }}>Campaign created successfully!</h1>
            </div>
          ) : (
            <div className="centerText">
              <ErrorSign
                style={{ height: "6em", width: "6em", color: "red" }}
              />
              <h3 style={{ color: "red" }}>{createCampaignErrorMsg}</h3>
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
    "Some error ocurred! Please try again."
  );
  return {
    createCampaignIsLoading,
    createCampaignSuccess,
    createCampaignErrorMsg
  };
};

export default connect(mapStateToProps, {})(CreateCampaign);
