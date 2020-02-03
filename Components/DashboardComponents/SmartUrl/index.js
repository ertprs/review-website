import React, { Component } from "react";
//? Own imports
import Snackbar from "../../Widgets/Snackbar";
import Card from "../../MaterialComponents/Card";
import PlatformSplit from "./PlatformSplit";
import UrlHitCount from "./UrlHitCount";
import {
  isValidArray,
  calTotalReviewsAndRating
} from "../../../utility/commonFunctions";
import {
  postSplitPlatformConfigForSplitPlatform,
  getShortReviewUrl
} from "../../../store/actions/dashboardActions";
//? Library imports
import { connect } from "react-redux";
import Select from "react-select";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _sumBy from "lodash/sumBy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

class SmartUrl extends Component {
  state = {
    selectedPlatform: "",
    showSnackbar: false,
    variant: "",
    snackbarMsg: "",
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
    const {
      domainUrlKey,
      overallRating,
      domainName,
      getShortReviewUrl
    } = this.props;
    const selectedPlatform = _get(selectedObj, "value", "");
    const mode = _get(selectedObj, "mode", "");
    //? sending overall rating and domain name in case of "show available platforms" to jumping page
    let reviewUrl =
      selectedPlatform === "showPlatforms"
        ? `${process.env.DOMAIN_NAME}/redirect?domainUrlKey=${domainUrlKey}&&selected=${selectedPlatform}&&rating=${overallRating}&&domain=${domainName}`
        : `${process.env.DOMAIN_NAME}/redirect?domainUrlKey=${domainUrlKey}&&selected=${selectedPlatform}&&mode=${mode}`;
    getShortReviewUrl({ url: reviewUrl });
    this.setState({
      selectedPlatform,
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
          socialAppId:
            _get(platform, "social_app_id", 0) ||
            _get(platform, "social_media_app_id", 0),
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
    const { dropdownData, shortReviewUrl, viaWhatsApp } = this.props;
    const reviewUrl = _get(shortReviewUrl, "url", "");
    const reviewUrlLoading = _get(shortReviewUrl, "isLoading", false);
    const reviewUrlSuccess = _get(shortReviewUrl, "success", false);
    const reviewUrlErrorMsg = _get(
      shortReviewUrl,
      "errorMsg",
      "Unable to generate review Url!"
    );
    const {
      sumOfAllSplits,
      reviewPlatformsForSplit,
      selectedPlatform,
      showSnackbar,
      variant,
      snackbarMsg,
      generateUrlLoading,
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
            display: flex;
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
        {viaWhatsApp ? null : (
          <>
            <UrlHitCount />
            <h3> Generate Review URL</h3>
          </>
        )}
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
            {reviewUrlLoading ? (
              <div>
                <CircularProgress color="secondary" />
              </div>
            ) : reviewUrlSuccess ? (
              <>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb_10">
                      <span className="urlText">
                        Here is your review URL. Please copy and paste this URL
                        in your emails sent to customers to leave reviews:
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <span className="url">{reviewUrl}</span>
                  </div>
                  <div className="col-md-3">
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
              </>
            ) : (
              <div style={{ color: "red" }}>{reviewUrlErrorMsg}</div>
            )}
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
      value: "showPlatforms",
      label: "Let customer choose the platform"
    }
  ];
  //? creating data for split platforms
  let reviewPlatformsForSplit = [];
  if (isValidArray(reviewPlatforms)) {
    let noOfPlatforms = (reviewPlatforms || []).length;
    noOfPlatforms = noOfPlatforms > 10 ? 10 : noOfPlatforms;
    let remainder = 100 % (noOfPlatforms * 10);
    let quotient = Math.floor(100 / (noOfPlatforms * 10));

    reviewPlatformsForSplit = (reviewPlatforms || []).map((platform, index) => {
      let tempObj =
        index < 10
          ? {
              ...platform,
              value: quotient * 10,
              hasError: false,
              min: 0,
              max: 100
            }
          : {
              ...platform,
              value: 0,
              hasError: false,
              min: 0,
              max: 100
            };
      return tempObj;
    });
    if (remainder > 0) {
      if (noOfPlatforms - 1 >= 0) {
        reviewPlatformsForSplit[noOfPlatforms - 1] = {
          ...reviewPlatformsForSplit[noOfPlatforms - 1],
          value: reviewPlatformsForSplit[noOfPlatforms - 1].value + remainder
        };
      }
    }
  }
  const result = calTotalReviewsAndRating(reviews);
  const overallRating = _get(result, "overallRating", 0);
  const domainName = _get(
    state,
    "auth.logIn.userProfile.business_profile.domain",
    ""
  );

  const shortReviewUrl = _get(dashboardData, "shortReviewUrl", {});
  return {
    dropdownData,
    domainUrlKey,
    reviewPlatformsForSplit,
    overallRating,
    domainName,
    shortReviewUrl
  };
};

export default connect(mapStateToProps, {
  postSplitPlatformConfigForSplitPlatform,
  getShortReviewUrl
})(SmartUrl);
