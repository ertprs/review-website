import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import "moment-timezone";
import { utcToTimezone } from "../../../utility/commonFunctions";
import cookie from "js-cookie";

const columns = [
  { title: "Campaign Name", field: "campaign_name" },
  { title: "Created", field: "created" },
  { title: "Email/Phone", field: "contactDetails" },
  { title: "Status", field: "status" },
  { title: "Reference", field: "reference" }
];

const parseTableData = (tableData, timezone) => {
  let result = tableData.map(data => {
    let status = _get(data, "status", 0);
    status = status === null ? 0 : status;
    let campaign_type = _get(data, "campaign_type", 0);
    let statusInWords = status === 1 ? "Sent" : "Not Sent";
    let reference = _get(data, "reference", "##");
    reference = reference === null ? "##" : reference;
    let created = _get(data, "created", "");
    created = utcToTimezone(created, timezone);
    let campaign_name = _get(data, "campaign_name", "");
    campaign_name = campaign_type === 2 ? "WhatsApp" : campaign_name;
    let email = _get(data, "email", "--");
    let phoneNo = _get(data, "phone", "--");
    //? campaignType 1 means email campaigns
    let contactDetails = campaign_type === 1 ? email : phoneNo;
    return {
      ...data,
      status: statusInWords,
      reference,
      created,
      campaign_name,
      contactDetails
    };
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
    const { timezone } = this.props;
    return (
      <MaterialTable
        title="Invitation History"
        columns={columns}
        options={{
          search: false,
          pageSize: 10,
          pageSizeOptions: [5, 10, 15, 20, 25, 30]
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
                parsedTableData = parseTableData(tableData, timezone);
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
