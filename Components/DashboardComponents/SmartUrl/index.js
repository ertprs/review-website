import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { iconNames } from "../../../utility/constants/socialMediaConstants";
import { getSmartUrl } from "../../../store/actions/dashboardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const SmartUrl = props => {
  const {
    dropdownData,
    smartUrlSuccess,
    smartUrlLoading,
    smartUrl,
    getSmartUrl
  } = props;
  return (
    <div>
      <style jsx>{`
        .loader {
          text-align: "center";
        }
        .url {
          font-size: 16px;
          font-weight: bold;
          margin: 12px 0px;
        }
      `}</style>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        name="social-platforms"
        placeholder="Select platform"
        options={dropdownData}
        onChange={valObj => {
          let platformId = _get(valObj, "value", "");
          getSmartUrl(platformId);
        }}
      />
      {}
      {smartUrlLoading ? (
        <div>
          <CircularProgress size={20} />
        </div>
      ) : smartUrlSuccess && smartUrl ? (
        <span className="url">Review URL: {smartUrl}</span>
      ) : (
        <span>Url not found.</span>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const socialPlatforms = _get(
    state,
    "auth.logIn.userProfile.business_profile.social",
    []
  );
  const smartUrlSuccess = _get(
    state,
    "dashboardData.smartUrl.success",
    undefined
  );
  const smartUrlLoading = _get(
    state,
    "dashboardData.smartUrl.isLoading",
    false
  );
  const smartUrl = _get(state, "dashboardData.smartUrl.url", "false");
  let dropdownData = [];
  if (!_isEmpty(socialPlatforms) && Array.isArray(socialPlatforms)) {
    dropdownData = socialPlatforms.map(platform => {
      const social_app_id = _get(platform, "social_media_app_id", "");
      let label = "";
      if (iconNames.hasOwnProperty(social_app_id)) {
        let obj = iconNames[social_app_id];
        label = _get(obj, "displayName", "");
      }
      let temp = {};
      temp.label = label;
      temp.value = social_app_id;
      return temp;
    });
  }
  console.log(dropdownData, "dropdownData");
  return { dropdownData, smartUrlSuccess, smartUrlLoading, smartUrl };
};

export default connect(mapStateToProps, { getSmartUrl })(SmartUrl);
