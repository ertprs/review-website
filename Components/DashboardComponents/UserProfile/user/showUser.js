import React from "react";
import styles from "../userProfileStyles";
import Tooltip from "@material-ui/core/Tooltip";
import mapOverArray from "../mapOverArray";
import Card from "../../../MaterialComponents/Card";
import EditIcon from "@material-ui/icons/Edit";
import _get from "lodash/get";
import _find from "lodash/find";
import countriesList from "../../../../utility/select2CountryList.json";
import Languages from "../../../../utility/languages";
import timezoneList from "../../../../utility/timezone.json";
import moment from "moment";
import "moment-timezone";

const userDetailsData = userProfile => {
  const { name, city, phone, address, country, lang, zip, timezone } =
    userProfile || {};

  let filteredLang = _find(Languages, ["value", lang]);
  let language = "";
  if (filteredLang) {
    language = _get(filteredLang, "name", "");
  }

  let filteredCountry = _find(countriesList, ["value", +country]);
  let countryName = "";
  if (filteredCountry) {
    countryName = _get(filteredCountry, "label", "");
  }

  let filteredTimezone = _find(timezoneList, ["value", timezone]);
  let timezoneName = "";
  if (filteredTimezone) {
    timezoneName = _get(filteredTimezone, "label", "");
  }
  let localTimezone = moment.tz.guess();
  const userDetails = [
    { key: "Name", value: name || "" },
    { key: "City", value: city || "" },
    { key: "Phone", value: phone || "" },
    { key: "Address", value: address || "" },
    { key: "Country", value: countryName || "" },
    { key: "Language", value: language || "" },
    { key: "Zipcode", value: zip || "" },
    { key: "Timezone", value: timezoneName || "" },
    { key: "Local Timezone", value: localTimezone }
  ];
  return userDetails;
};

export default function showUser({ handleEditClick, userProfile }) {
  const userData = userDetailsData(userProfile) || [];
  let halfUserData = Math.floor(userData.length / 2);
  let userDataLeft = userData.splice(0, halfUserData);
  let userDataRight = userData.splice(0, userData.length);
  return (
    <div className="mt-50">
      <style jsx>{styles}</style>
      <Card>
        <div className="cardHeader">
          <h3 className="heading">User Details</h3>
          <Tooltip title={"Edit"} placement="top-end">
            <EditIcon style={{ cursor: "pointer" }} onClick={handleEditClick} />
          </Tooltip>
        </div>
        <div className="row">
          {mapOverArray(userDataLeft)}
          {mapOverArray(userDataRight)}
        </div>
      </Card>
    </div>
  );
}
