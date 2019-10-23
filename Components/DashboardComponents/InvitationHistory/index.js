import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

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

const data = [
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  ),
  createData(
    "art@gmail.com",
    "Delivered",
    "5 mins ago",
    "2mins ago",
    "Service Review Reminder",
    1222
  )
];

class InvitationHistory extends Component {
  render() {
    const { invitations, errroMsg, isLoading, success } = this.props;
    return (
      <MaterialTable
        title="Invitation History"
        columns={columns}
        data={invitations}
      />
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const invitations = _get(dashboardData, "transactionHistory.invitations", []);
  const errroMsg = _get(dashboardData, "transactionHistory.errorMsg", "");
  const isLoading = _get(dashboardData, "transactionHistory.isLoading", false);
  let success = false;
  if (invitations) {
    if (Array.isArray(invitations) && !_isEmpty(invitations)) {
      success = true;
    } else {
      success = false;
    }
  }
  return { invitations, errroMsg, isLoading, success };
};

export default connect(mapStateToProps)(InvitationHistory);
