import React, { Component } from "react";
import styles from "../userProfileStyles";
import mapOverArray from "../mapOverArray";
import _get from "lodash/get";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "../../../MaterialComponents/Card";
import EditIcon from "@material-ui/icons/Edit";
import _find from "lodash/find";
import countriesList from "../../../../utility/select2CountryList.json";

class showCompany extends Component {
  companyDetailsData = () => {
    const company = _get(this.props, "userProfile.company", {});
    if (Object.keys(company).length > 0) {
      const name = _get(company, "name", "");
      const reg_number = _get(company, "reg_number", "");
      const tax_number = _get(company, "tax_number", "");
      const legal_address = _get(company, "legal_address", "");
      const actual_address = _get(company, "actual_address", "");
      const description = _get(company, "description", "");
      const country_id = _get(company, "country_id", "");
      let filteredCountry = _find(countriesList, ["value", +country_id]);
      let country = "";
      if (filteredCountry) {
        country = _get(filteredCountry, "label", "");
      }
      const companyDetails = [
        { key: "Name", value: name || "" },
        { key: "Registration Number", value: reg_number || "" },
        { key: "Tax Number", value: tax_number || "" },
        { key: "Legal Address", value: legal_address || "" },
        { key: "Actual Address", value: actual_address || "" },
        { key: "Description", value: description || "" },
        { key: "Country", value: country || "" }
      ];
      return companyDetails;
    }
    return [];
  };

  render() {
    const { handleEditClick } = this.props;
    const companyData = this.companyDetailsData() || [];
    const halfCompanyData = Math.floor(companyData.length / 2);
    const companyDataLeft = companyData.splice(0, halfCompanyData);
    const companyDataRight = companyData.splice(0, companyData.length);
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <Card>
          <div className="cardHeader">
            <h3 className="heading">Company Details</h3>
            <Tooltip title={"Edit"} placement="top-end">
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={handleEditClick}
              />
            </Tooltip>
          </div>
          <div className="row">
            {mapOverArray(companyDataLeft)}
            {mapOverArray(companyDataRight)}
          </div>
        </Card>
      </div>
    );
  }
}

export default showCompany;
