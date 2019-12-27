import React, { Component } from "react";
//! Own components
import {
  changeCampaignStatus,
  setCampaignEditMode
} from "../../../store/actions/dashboardActions";
import Snackbar from "../../../Components/Widgets/Snackbar";
//! axios
import axios from "axios";
//! Material imports
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//! Lodash imports
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _find from "lodash/find";
//!Api import
import { campaignHistoryApi } from "../../../utility/config";
//! Connect import
import { connect } from "react-redux";

const campaignStatus = {
  1: "Active",
  2: "Closed",
  3: "Scheduled"
};

const campaignType = {
  0: "Manual",
  1: "Automatic"
};

class CampaignManagement extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  state = {
    showSnackbar: false,
    snackbarVariant: "",
    snackbarMessage: "",
    actionType: ""
  };

  componentDidMount() {
    // this.props.scrollToTopOfThePage();
  }

  handleEditClick = rowData => {
    const { setCampaignEditMode, navigateToCreateCampaign } = this.props;
    let selectedCampaign = _get(rowData, "originalData", {});
    setCampaignEditMode(selectedCampaign, true);
    navigateToCreateCampaign();
  };

  tableColumns = [
    { title: "Name", field: "name" },
    { title: "Created At", field: "created_at" },
    { title: "Updated At", field: "updated_at" },
    { title: "Campaign Type", field: "campaign_type" },
    { title: "Status", field: "status" },
    {
      title: "Change Status",
      field: "actionOnStatus",
      render: rowData => {
        const { id, actionOnStatus } = rowData;
        let btnColor = "#4CAF50";
        if (actionOnStatus === "Deactivate") {
          btnColor = "#FF5722";
        }
        return (
          <>
            {actionOnStatus.length > 2 ? (
              this.props.campaignStatusIsLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: `${btnColor}` }}
                  onClick={() => {
                    this.setState(
                      {
                        actionType: rowData.actionOnStatus
                      },
                      () => {
                        this.props.changeCampaignStatus(
                          id,
                          actionOnStatus.charAt(0).toLowerCase() +
                            actionOnStatus.slice(1)
                        );
                      }
                    );
                  }}
                >
                  {rowData.actionOnStatus}
                </Button>
              )
            ) : (
              "No Action Found"
            )}
          </>
        );
      }
    },
    {
      title: "Edit",
      field: "is_automatic",
      render: rowData => {
        const { is_automatic } = rowData;
        return (
          <>
            <Tooltip
              title={<span style={{ fontSize: "14px" }}>Edit Campaign</span>}
            >
              <IconButton
                onClick={() => this.handleEditClick(rowData)}
                disabled={is_automatic !== 1}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  componentDidUpdate(prevProps, prevState) {
    const { campaignStatusSuccess, campaignStatusIsLoading } = this.props;
    const { actionType } = this.state;
    if (campaignStatusSuccess !== prevProps.campaignStatusSuccess) {
      this.tableRef.current.onQueryChange();
      if (campaignStatusSuccess === true && campaignStatusIsLoading === false) {
        this.setState({
          showSnackbar: true,
          snackbarVariant: "success",
          snackbarMessage: `Campaign ${actionType}d Successfully!`
        });
      } else if (
        campaignStatusSuccess === false &&
        campaignStatusIsLoading === false
      ) {
        this.setState({
          showSnackbar: true,
          snackbarVariant: "error",
          snackbarMessage: `Some Error Occurred!`
        });
      }
    }
  }

  render() {
    const { showSnackbar, snackbarMessage, snackbarVariant } = this.state;
    return (
      <>
        <MaterialTable
          title="Campaigns History"
          options={{
            search: false
          }}
          tableRef={this.tableRef}
          columns={this.tableColumns}
          actions={[
            {
              icon: "refresh",
              tooltip: "Refresh Data",
              isFreeAction: true,
              onClick: () =>
                this.tableRef.current && this.tableRef.current.onQueryChange()
            }
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let token = localStorage.getItem("token");
              let url = `${process.env.BASE_URL}${campaignHistoryApi}?`;
              url += "perPage=" + query.pageSize;
              url += "&page=" + (query.page + 1);
              axios({
                method: "GET",
                url,
                headers: { Authorization: `Bearer ${token}` }
              }).then(result => {
                let tableData = [];
                let campaignsList = _get(result, "data.campaigns", []);
                let parsedCampaignsList = [];
                if (Array.isArray(campaignsList) && !_isEmpty(campaignsList)) {
                  parsedCampaignsList = campaignsList.map(campaign => {
                    let parsedCampaignStructure = JSON.parse(
                      _get(campaign, "campaign_structure", {})
                    );
                    return {
                      ...campaign,
                      campaign_structure: { ...parsedCampaignStructure }
                    };
                  });
                  if (
                    Array.isArray(parsedCampaignsList) &&
                    !_isEmpty(parsedCampaignsList)
                  ) {
                    tableData = parsedCampaignsList.map(campaign => {
                      const {
                        id,
                        name,
                        created_at,
                        updated_at,
                        status,
                        is_automatic,
                        campaign_structure
                      } = campaign || {};

                      let statusInString = "--";
                      let campaign_type = "--";

                      if (campaignStatus.hasOwnProperty(status)) {
                        statusInString = campaignStatus[status];
                      }
                      if (campaignType.hasOwnProperty(is_automatic)) {
                        campaign_type = campaignType[is_automatic];
                      }

                      let sender_name = _get(
                        campaign_structure,
                        "senderName",
                        ""
                      );
                      let actionOnStatus =
                        statusInString === "Active" ||
                        statusInString === "Scheduled"
                          ? "Deactivate"
                          : "Activate";

                      return {
                        id,
                        name,
                        sender_name,
                        created_at,
                        updated_at,
                        status: statusInString,
                        campaign_type,
                        sender_name,
                        actionOnStatus,
                        is_automatic,
                        originalData: { ...campaign }
                      };
                    });
                  }
                }
                resolve({
                  data: tableData,
                  page: _get(query, "page", 1),
                  totalCount: _get(result, "data.total", 0)
                });
              });
            })
          }
        />
        <Snackbar
          variant={snackbarVariant}
          message={snackbarMessage}
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
  const { changeCampaignStatus } = state.dashboardData;
  let campaignStatusIsLoading = _get(changeCampaignStatus, "isLoading", false);
  let campaignStatusSuccess = _get(changeCampaignStatus, "success", undefined);

  return {
    campaignStatusIsLoading,
    campaignStatusSuccess
  };
};

export default connect(mapStateToProps, {
  changeCampaignStatus,
  setCampaignEditMode
})(CampaignManagement);
