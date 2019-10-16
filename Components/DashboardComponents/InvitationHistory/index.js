import React, { Component } from "react";
import MaterialTable from "material-table";

const columns = [
  { title: "Customer Email", field: "customerEmail" },
  { title: "Status", field: "status" },
  { title: "Created", field: "created" },
  { title: "Sent", field: "sent" },
  { title: "Type", field: "type" },
  { title: "Reference Number", field: "referenceNumber" }
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
    return (
      <MaterialTable title="Invitation History" columns={columns} data={data} />
    );
  }
}

export default InvitationHistory;
