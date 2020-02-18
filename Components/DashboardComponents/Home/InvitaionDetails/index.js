import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../../MaterialComponents/Card";
import Title from "../../../MaterialComponents/Title";
import _get from "lodash/get";

const InvitationDetails = props => {
  const { created, sent } = props;
  return (
    <Grid item xs={12} md={4} lg={4}>
      <style jsx>{`
        .header {
          margin-bottom: 24px;
        }
        .fadedHeader {
          font-weight: lighter;
          color: #555;
        }
        .container {
          margin: 25px 0;
          border-bottom: 1px solid #999;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
      <SimpleCard style={{ height: "298px" }}>
        <div className="header">
          <Title>
            <h5>Invitations Summary</h5>
          </Title>
          <span>You can send unlimited invitations to your customers.</span>
        </div>
        <div className="body">
          <div className="container">
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Total Invitations Created:
            </p>
            <h1>{created}</h1>
          </div>
          <div className="container">
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Total Invitations Sent :{" "}
            </p>
            <h1>{sent}</h1>
          </div>
        </div>
      </SimpleCard>
    </Grid>
  );
};

const mapStateToProps = state => {
  const { auth } = state || {};
  const quotaDetails = _get(
    auth,
    "logIn.userProfile.subscription.quota_details",
    {}
  );
  const created = _get(quotaDetails, "invitations.created", 0);
  const sent = _get(quotaDetails, "invitations.sent", 0);
  return {
    created,
    sent
  };
};

export default connect(mapStateToProps)(InvitationDetails);
