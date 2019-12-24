import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import {
  changeCampaignStatus,
  setCampaignEditMode
} from "../../../store/actions/dashboardActions";
import Snackbar from "../../../Components/Widgets/Snackbar";

const campaignStatus = {
  1: "Active",
  2: "Closed",
  3: "Scheduled"
};

const campaignType = {
  0: "Manual",
  1: "Automatic"
};

const columns = [
  { title: "Name", field: "name" },
  { title: "Sender Name", field: "sender_name" },
  { title: "Created At", field: "created_at" },
  { title: "Updated At", field: "updated_at" },
  { title: "Campaign Type", field: "campaign_type" },
  { title: "Status", field: "status" }
];

class CampaignManagement extends Component {
  state = {
    deactivate: {
      icon: "toggle_on",
      disabled: false
    },
    showSnackbar: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { campaignStatusIsLoading, campaignStatusSuccess } = this.props;
    if (campaignStatusSuccess !== prevProps.campaignStatusSuccess) {
      if (campaignStatusSuccess) {
        this.setState({
          deactivate: {
            ...this.state.deactivate,
            disabled: true,
            icon: "toggle_off"
          },
          showSnackbar: true
        });
      }
    }
  }

  render() {
    const {
      parsedCampaignList,
      changeCampaignStatus,
      navigateToCreateCampaign,
      setCampaignEditMode
    } = this.props;
    const { deactivate, showSnackbar } = this.state;
    return (
      <>
        <MaterialTable
          title="Campaigns History"
          columns={columns}
          data={parsedCampaignList}
          disabled={_get(deactivate, "disabled", "false")}
          actions={[
            {
              iconProps: { color: "secondary", fontSize: "medium" },
              icon: _get(this.state, "deactivate.icon", "save"),
              tooltip: "Close Campaign",
              onClick: (event, rowData) => {
                let id = _get(rowData, "id", "");
                changeCampaignStatus(id);
              }
            },
            {
              iconProps: { color: "secondary", fontSize: "medium" },
              icon: "edit",
              tooltip: "Update Campaign",
              onClick: (event, rowData) => {
                setCampaignEditMode(rowData, true);
                navigateToCreateCampaign();
              }
            }
          ]}
        />
        <Snackbar
          variant="success"
          message="Campaign Deactivated Successfully!"
          open={showSnackbar}
          handleClose={() => {
            this.setState({ showSnackbar: false });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const { changeCampaignStatus } = dashboardData;
  const campaignsList = _get(dashboardData, "campaignsData.data", []);
  let parsedCampaignList = [];
  let campaignStatusIsLoading = _get(changeCampaignStatus, "isLoading", false);
  let campaignStatusSuccess = _get(changeCampaignStatus, "success", undefined);

  //! created the array with keys that material table expects.
  if (Array.isArray(campaignsList) && !_isEmpty(campaignsList)) {
    parsedCampaignList = campaignsList.map(campaign => {
      const { status, is_automatic, campaign_structure } = campaign || {};
      let statusInString = "--";
      let campaign_type = "--";
      if (campaignStatus.hasOwnProperty(status)) {
        statusInString = campaignStatus[status];
      }
      if (campaignType.hasOwnProperty(is_automatic)) {
        campaign_type = campaignType[is_automatic];
      }
      let senderName = _get(campaign_structure, "senderName", "");
      return {
        ...campaign,
        status: statusInString,
        campaign_type,
        sender_name: senderName
      };
    });
  }

  return {
    parsedCampaignList,
    campaignStatusIsLoading,
    campaignStatusSuccess
  };
};

export default connect(mapStateToProps, {
  changeCampaignStatus,
  setCampaignEditMode
})(CampaignManagement);
