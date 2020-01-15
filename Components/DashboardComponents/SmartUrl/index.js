import React, { Component } from "react";
//? Own imports
import Snackbar from "../../Widgets/Snackbar";
import Card from "../../MaterialComponents/Card";
import PlatformSplit from "./PlatformSplit";
import {
  isValidArray,
  calTotalReviewsAndRating
} from "../../../utility/commonFunctions";
//? Library imports
import { connect } from "react-redux";
import Select from "react-select";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _sumBy from "lodash/sumBy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import { postSplitPlatformConfigForSplitPlatform } from "../../../store/actions/dashboardActions";

class SmartUrl extends Component {
  state = {
    selectedPlatform: "",
    showSnackbar: false,
    variant: "",
    snackbarMsg: "",
    reviewUrl: "",
    reviewPlatformsForSplit: _get(this.props, "reviewPlatformsForSplit", []),
    sumOfAllSplits: 100,
    generateUrlLoading: false,
    generateUrlSuccess: undefined
  };

  handleSplitValueChange = (value, index) => {
    const { reviewPlatformsForSplit } = this.state;
    if (Number(value) || value === "" || value === "0" || value === 0) {
      value = value !== "" ? Number(value) : 0;
      let reviewPlatformsCopy = [...reviewPlatformsForSplit];
      reviewPlatformsCopy[index] = { ...reviewPlatformsCopy[index], value };
      const sumOfAllSplits = _sumBy(reviewPlatformsCopy, "value");
      if (sumOfAllSplits > 100) {
        reviewPlatformsCopy[index] = {
          ...reviewPlatformsCopy[index],
          hasError: true
        };
      } else {
        reviewPlatformsCopy = (reviewPlatformsCopy || []).map(platform => {
          return {
            ...platform,
            hasError: false
          };
        });
      }
      this.setState({
        reviewPlatformsForSplit: reviewPlatformsCopy,
        sumOfAllSplits
      });
    }
  };

  handleDropdownChange = selectedObj => {
    const { domainUrlKey, overallRating, domainName } = this.props;
    const selectedPlatform = _get(selectedObj, "value", "");
    const mode = _get(selectedObj, "mode", "");
    //? sending overall rating and domain name in case of "show available platforms" to jumping page
    let reviewUrl =
      selectedPlatform === "showAvailablePlatforms"
        ? `${process.env.DOMAIN_NAME}/redirect_to_review_page?domainUrlKey=${domainUrlKey}&&selectedOption=${selectedPlatform}&&overallRating=${overallRating}&&domainName=${domainName}`
        : `${process.env.DOMAIN_NAME}/redirect_to_review_page?domainUrlKey=${domainUrlKey}&&selectedOption=${selectedPlatform}&&mode=${mode}`;
    this.setState({
      selectedPlatform,
      reviewUrl,
      generateUrlSuccess: false
    });
  };

  handleGenerateReviewUrlClick = () => {
    this.setState({ generateUrlLoading: true });
    const {
      postSplitPlatformConfigForSplitPlatform,
      domainUrlKey
    } = this.props;
    const { reviewPlatformsForSplit } = this.state;
    let percentageSplitToSend = (reviewPlatformsForSplit || []).map(
      platform => {
        return {
          socialAppId: _get(platform, "social_app_id", 0),
          percentShare: _get(platform, "value", 0),
          link: _get(platform, "url", "")
        };
      }
    );
    const reqBody = {
      percentageSplit: [...percentageSplitToSend]
    };
    postSplitPlatformConfigForSplitPlatform(reqBody, domainUrlKey)
      .then(success => {
        if (success) {
          this.setState({
            generateUrlSuccess: success,
            generateUrlLoading: false,
            showSnackbar: true,
            snackbarMsg: "Review Url generated successfully!",
            variant: "success"
          });
        }
      })
      .catch(success => {
        if (!success) {
          this.setState({
            generateUrlLoading: false,
            showSnackbar: true,
            snackbarMsg: "Some error occurred! Please try again!",
            variant: "error"
          });
        }
      });
  };

  render() {
    const { dropdownData } = this.props;
    const {
      sumOfAllSplits,
      reviewPlatformsForSplit,
      selectedPlatform,
      showSnackbar,
      variant,
      snackbarMsg,
      generateUrlLoading,
      reviewUrl,
      generateUrlSuccess
    } = this.state;
    return (
      <div>
        <style jsx>{`
          .loader {
            text-align: "center";
          }
          .mb_10 {
            margin-bottom: 10px;
          }
          .mtb_20 {
            margin: 20px 0px;
          }
          .url {
            font-size: 16px;
            font-weight: bold;
            margin: 12px 0px;
            word-break: break-all;
          }
          .urlText {
            font-size: "14px";
          }
          .copyToClipboardIcon {
            display: flex;
            justify-content: center;
            align-content: center;
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
            className="basic-multi-select"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="social-platforms"
            placeholder="Select review platform"
            options={dropdownData}
            onChange={this.handleDropdownChange}
          />
        </div>
        {selectedPlatform === "splitPlatform" && !generateUrlSuccess ? (
          <PlatformSplit
            reviewPlatforms={reviewPlatformsForSplit || []}
            sumOfAllSplits={sumOfAllSplits || 0}
            handleSplitValueChange={this.handleSplitValueChange}
            handleGenerateReviewUrlClick={this.handleGenerateReviewUrlClick}
            isLoading={generateUrlLoading}
          />
        ) : null}
        {(selectedPlatform && selectedPlatform !== "splitPlatform") ||
        (selectedPlatform === "splitPlatform" && generateUrlSuccess) ? (
          <Card
            style={{
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <div className="col-md-11">
                <div className="mb_10">
                  <span className="urlText">
                    Here is your review URL. Please copy and paste this URL in
                    your emails sent to customers to leave reviews:
                  </span>
                </div>
                <span className="url">{reviewUrl}</span>
              </div>
              <div className="col-md-1 copyToClipboardIcon">
                <CopyToClipboard
                  text={reviewUrl}
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
            </div>
          </Card>
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
  const { auth, dashboardData } = state;
  const reviewPlatforms = _get(
    auth,
    "logIn.userProfile.business_profile.configured_platforms",
    []
  );
  const reviews = _get(dashboardData, "reviews", {});
  const domainUrlKey = _get(
    auth,
    "logIn.userProfile.business_profile.domainUrlKey",
    ""
  );
  let dropdownData = [];
  //# Converted "review platforms" array into dropdown data that react-select supports
  if (isValidArray(reviewPlatforms)) {
    dropdownData = reviewPlatforms.map(platform => {
      let temp = {};
      temp.label = _get(platform, "name", "");
      temp.value =
        _get(platform, "social_media_app_id", 0) ||
        _get(platform, "social_app_id", 0);
      return temp;
    });
  }
  //? we are adding 3 more options in dropdown apart from actual review platforms
  //! These mode will be sent to the navigate api in jumping page to generate review url. They are according to backend.
  dropdownData = [
    ...dropdownData,
    { value: "splitPlatform", label: "Split Platform", mode: 1 },
    { value: "leastRating", label: "Least rating platform", mode: 2 },
    {
      value: "showAvailablePlatforms",
      label: "Let customer choose the platform"
    }
  ];
  //? creating data for split platforms
  let reviewPlatformsForSplit = [];
  if (isValidArray(reviewPlatforms)) {
    const noOfPlatforms = (reviewPlatforms || []).length;
    let platformInitialValue = Math.floor(100 / noOfPlatforms);
    const sumOfAllPlatforms = platformInitialValue * noOfPlatforms;
    reviewPlatformsForSplit = (reviewPlatforms || []).map(platform => {
      return {
        ...platform,
        value: platformInitialValue,
        hasError: false,
        min: 0,
        max: 100
      };
    });
    if (sumOfAllPlatforms < 100) {
      reviewPlatformsForSplit[0] = {
        ...reviewPlatformsForSplit[0],
        value: reviewPlatformsForSplit[0].value + (100 - sumOfAllPlatforms)
      };
    }
  }
  const result = calTotalReviewsAndRating(reviews);
  const overallRating = _get(result, "overallRating", 0);
  const domainName = _get(
    state,
    "auth.logIn.userProfile.business_profile.domain",
    ""
  );
  return {
    dropdownData,
    domainUrlKey,
    reviewPlatformsForSplit,
    overallRating,
    domainName
  };
};

export default connect(mapStateToProps, {
  postSplitPlatformConfigForSplitPlatform
})(SmartUrl);
