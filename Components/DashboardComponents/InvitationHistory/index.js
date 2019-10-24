import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from 'axios';

const columns = [
  { title: "Id", field: "id" },
  { title: "Email", field: "email" },
  { title: "Campaign Name", field: "campaign_name" },
  { title: "Status", field: "status" },
  { title: "Created", field: "created" },
  { title: "Reference", field: "reference" }
];

function createData(
  customerEmail,
  status,
  created,
  sent,
  type,
  referenceNumber
) {
  return { customerEmail, status, created, sent, type, referenceNumber };
}

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
            })
            .then(result => {
                resolve({
                  data: result.data.invitations,
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
  const token = _get(auth, "logIn.token", "")
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
