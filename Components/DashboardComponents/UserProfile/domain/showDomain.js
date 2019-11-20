import React from "react";
import Card from "../../../MaterialComponents/Card";
import styles from "../userProfileStyles";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

function showDomain({ domainName, handleEditClick }) {
  return (
    <div className="mt-50">
      <style jsx>{styles}</style>
      <Card>
        <div className="cardHeader">
          <h3 className="heading">Domain Details</h3>
          <Tooltip title={"Edit"} placement="top-end">
            <EditIcon style={{ cursor: "pointer" }} onClick={handleEditClick} />
          </Tooltip>
        </div>
        <div className="row">
          <div className="col-md-3 textBold">
            <p>Domain Name</p>
          </div>
          <div className="col-md-3">
            <p className="value">{domainName}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default showDomain;
