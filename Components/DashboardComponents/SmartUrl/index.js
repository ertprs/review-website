import React, { Component } from "react";
//? Own imports
import { iconNames } from "../../../utility/constants/socialMediaConstants";
import { getSmartUrl } from "../../../store/actions/dashboardActions";
import Snackbar from "../../Widgets/Snackbar";
import Card from "../../MaterialComponents/Card";
//? Library imports
import { connect } from "react-redux";
import Select from "react-select";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";

class SmartUrl extends Component {
  state = {
    selectedPlatform: "",
    showSnackbar: false,
    variant: "",
    snackbarMsg: ""
  };

  render() {
    const {
      dropdownData,
      smartUrlSuccess,
      smartUrlLoading,
      smartUrl,
      getSmartUrl
    } = this.props;
    const { selectedPlatform, showSnackbar, variant, snackbarMsg } = this.state;
    return (
      <div>
        <style jsx>{`
          .loader {
            text-align: "center";
          }
          .mtb_20 {
            margin: 20px 0px;
          }
          .url {
            font-size: 16px;
            font-weight: bold;
            margin: 12px 0px;
          }
          .urlText {
            font-size: "14px";
          }
        `}</style>
        <h3> Generate Review URL</h3>
        <span>
          Select any one of the review platform from drop down below to fetch
          smart link review URL for that particular platform. If you want to
          select the review platform on which your domain has the least rating
          please select the "Select automatically" option.
        </span>
        <div className="mtb_20">
          <Select
            isClearable={true}
            isSearchable={true}
            name="social-platforms"
            placeholder="Select platform"
            options={dropdownData}
            onChange={valObj => {
              let platformId = _get(valObj, "value", "");
              this.setState({ selectedPlatform: platformId });
              if (platformId) {
                getSmartUrl(platformId);
              }
            }}
          />
        </div>

        {selectedPlatform ? (
          smartUrlLoading ? (
            <Card
              style={{
                marginTop: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <CircularProgress />
            </Card>
          ) : smartUrlSuccess && smartUrl ? (
            <Card
              style={{
                marginTop: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <span className="urlText">
                Here is your review URL. Please copy and paste this URL in your
                emails sent to customers to leave reviews.
              </span>
              <div className="url">
                <span>{smartUrl}</span>
                <CopyToClipboard
                  text={smartUrl}
                  onCopy={() =>
                    this.setState({
                      showSnackbar: true,
                      variant: "success",
                      snackbarMsg: "Url Copied to clipboard"
                    })
                  }
                >
                  <IconButton aria-label="copy">
                    <CopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </div>
            </Card>
          ) : (
            <span>Url not found.</span>
          )
        ) : null}
        <Snackbar
          open={showSnackbar}
          variant={variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={snackbarMsg}
        />
      </div>
    );
  }
}

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
  //# Converted socialplatforms array into dropdowndata that react-select supports
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
  dropdownData = [
    ...dropdownData,
    { value: "automatic", label: "Select automatically" }
  ];
  return { dropdownData, smartUrlSuccess, smartUrlLoading, smartUrl };
};

export default connect(mapStateToProps, { getSmartUrl })(SmartUrl);
