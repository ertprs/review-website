import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";

const columns = [
  { title: "Created", field: "created" },
  { title: "Email", field: "email" },
  { title: "Campaign Name", field: "campaign_name" },
  { title: "Status", field: "status" },
  { title: "Reference", field: "reference" }
];

const parseTableData = tableData => {
  let result = tableData.map(data => {
    let status = _get(data, "status", 0);
    status = status === null ? 0 : status;
    let statusInWords = status === 1 ? "Sent" : "Not Sent";
    let reference = _get(data, "reference", "##");
    reference = reference === null ? "##" : reference;
    return { ...data, status: statusInWords, reference };
  });
  return result;
};

class InvitationHistory extends Component {
  render() {
    const { invitations, errroMsg, isLoading, success, token } = this.props;
    return (
      <MaterialTable
        title="Invitation History"
        columns={columns}
        data={query =>
          new Promise((resolve, reject) => {
            let url = `${process.env.BASE_URL}/api/my-business/invitations/history?`;
            url += "perPage=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            axios({
              method: "GET",
              url: url,
              headers: { Authorization: `Bearer ${token}` }
            }).then(result => {
              let tableData = _get(result, "data.invitations", []);
              let parsedTableData = [];
              if (Array.isArray(tableData) && !_isEmpty(tableData)) {
                parsedTableData = parseTableData(tableData);
              }
              resolve({
                data: parsedTableData,
                page: query.page,
                totalCount: result.data.total
              });
            });
          })
        }
      />
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const invitations = _get(dashboardData, "transactionHistory.invitations", []);
  const errroMsg = _get(dashboardData, "transactionHistory.errorMsg", "");
  const isLoading = _get(dashboardData, "transactionHistory.isLoading", false);
  let success = false;
  const token = _get(auth, "logIn.token", "");
  if (invitations) {
    if (Array.isArray(invitations) && !_isEmpty(invitations)) {
      success = true;
    } else {
      success = false;
    }
  }
  return { invitations, errroMsg, isLoading, success, token };
};

export default connect(mapStateToProps)(InvitationHistory);
