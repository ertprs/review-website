import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import { convertToTimeStamp } from "../../../utility/commonFunctions";
import cookie from "js-cookie";

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
    let created = _get(data, "created", "");
    //? This will convert date according to timezone
    const timezone = _get(this.props, "timezone", "");
    const unixTimestamp = convertToTimeStamp(created);
    created = (
      <Moment unix tz={timezone} format="DD/MM/YYYY HH:mm">
        {unixTimestamp}
      </Moment>
    );
    return { ...data, status: statusInWords, reference, created };
  });
  return result;
};

class InvitationHistory extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }
  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }
  render() {
    const { token } = this.props;
    return (
      <MaterialTable
        title="Invitation History"
        columns={columns}
        options={{
          search: false
        }}
        tableRef={this.tableRef}
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
            let url = `${process.env.BASE_URL}/api/my-business/invitations/history?`;
            url += "perPage=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            axios({
              method: "GET",
              url: url,
              headers: { Authorization: `Bearer ${cookie.get("token")}` }
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
  const { auth } = state;
  const timezone = _get(auth, "logIn.userProfile.timezone", "");
  return { timezone };
};

export default connect(mapStateToProps)(InvitationHistory);
