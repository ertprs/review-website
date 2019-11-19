import React, { Component } from "react";
import styles from "../userProfileStyles";
import mapOverArray from "../mapOverArray";
import _get from "lodash/get";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "../../../MaterialComponents/Card";
import EditIcon from "@material-ui/icons/Edit";
import _find from "lodash/find";
import countrieslist from "../../../../utility/newCountryList.json";

class showCompany extends Component {
  companyDetailsData = () => {
    const { company } = _get(this.props, "userProfile", {});
    const {
      name,
      reg_number,
      tax_number,
      legal_address,
      actual_address,
      description,
      country_id
    } = company || {};
    let filteredCountry = _find(countrieslist, ["value", Number(country_id)]);
    console.log(filteredCountry, "filteredCountry");
    let countryName = filteredCountry.name;
    const companyDetails = [
      { key: "Name", value: name },
      { key: "Registration Number", value: reg_number },
      { key: "Tax Number", value: tax_number },
      { key: "Legal Address", value: legal_address },
      { key: "Actual Address", value: actual_address },
      { key: "Description", value: description },
      { key: "Country", value: countryName }
    ];
    return companyDetails;
  };

  render() {
    const { handleEditClick } = this.props;
    const companyData = this.companyDetailsData();
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
