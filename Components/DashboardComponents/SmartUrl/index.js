import React, { Component } from "react";
//? Own imports
import { iconNames } from "../../../utility/constants/socialMediaConstants";
import Snackbar from "../../Widgets/Snackbar";
import Card from "../../MaterialComponents/Card";
//? Library imports
import { connect } from "react-redux";
import Select from "react-select";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _sumBy from "lodash/sumBy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import PlatformSplit from "./PlatformSplit";

class SmartUrl extends Component {
  state = {
    selectedPlatform: "",
    showSnackbar: false,
    variant: "",
    snackbarMsg: "",
    reviewUrl: "",
    reviewPlatformsForSplit: _get(this.props, "reviewPlatformsForSplit", []),
    sumOfAllSplits: 100
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

  render() {
    const {
      dropdownData,
      domainUrlKey,
      overallRating,
      domainName
    } = this.props;
    const { sumOfAllSplits, reviewPlatformsForSplit } = this.state;
    const {
      selectedPlatform,
      showSnackbar,
      variant,
      snackbarMsg,
      reviewUrl
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
            onChange={valObj => {
              let selectedPlatform = _get(valObj, "value", "");
              //? sending overall rating and domain name in case of "show available platforms" in jumping page
              let reviewUrl =
                selectedPlatform === "showAvailablePlatforms"
                  ? `${process.env.DOMAIN_NAME}redirect_to_review_page?domainUrlKey=${domainUrlKey}&&selectedOption=${selectedPlatform}&&overallRating=${overallRating}&&domainName=${domainName}`
                  : `${process.env.DOMAIN_NAME}redirect_to_review_page?domainUrlKey=${domainUrlKey}&&selectedOption=${selectedPlatform}`;
              this.setState({
                selectedPlatform,
                reviewUrl
              });
            }}
          />
        </div>

        {selectedPlatform !== null &&
        selectedPlatform !== undefined &&
        selectedPlatform !== "" ? (
          selectedPlatform === "splitPlatform" ? (
            <PlatformSplit
              reviewPlatforms={reviewPlatformsForSplit || []}
              handleSplitValueChange={this.handleSplitValueChange}
              sumOfAllSplits={sumOfAllSplits || 0}
            />
          ) : (
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
  const { auth } = state;
  const reviewPlatforms = _get(
    auth,
    "logIn.userProfile.business_profile.configured_platforms",
    []
  );
  const domainUrlKey = _get(
    auth,
    "logIn.userProfile.business_profile.domainUrlKey",
    ""
  );
  let dropdownData = [];
  //# Converted "review platforms" array into dropdown data that react-select supports
  if (
    reviewPlatforms &&
    !_isEmpty(reviewPlatforms) &&
    Array.isArray(reviewPlatforms)
  ) {
    dropdownData = reviewPlatforms.map(platform => {
      let temp = {};
      temp.label = _get(platform, "name", "");
      temp.value = _get(platform, "social_app_id", 0);
      return temp;
    });
  }
  //? we are adding 3 more options in dropdown apart from actual review platforms
  dropdownData = [
    ...dropdownData,
    { value: "leastRating", label: "Least rating platform" },
    {
      value: "showAvailablePlatforms",
      label: "Let customer choose the platform"
    },
    { value: "splitPlatform", label: "Split Platform" }
  ];
  //? creating data for split platforms
  let reviewPlatformsForSplit = [];
  if (
    reviewPlatforms &&
    Array.isArray(reviewPlatforms) &&
    !_isEmpty(reviewPlatforms)
  ) {
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
  // Calculating total rating
  const googleRating = _get(state, "dashboardData.reviews.data.rating", 0);
  const facebookRating = _get(
    state,
    "dashboardData.facebookReviews.data.rating",
    0
  );
  const trustpilotRating = _get(
    state,
    "dashboardData.trustpilotReviews.data.rating",
    0
  );
  const trustedshopsRating = _get(
    state,
    "dashboardData.trustedshopsReviews.data.rating",
    0
  );
  const totalRatingOfAllPlatforms =
    (googleRating ? Number(googleRating) : 0) +
    (facebookRating ? Number(facebookRating) : 0) +
    (trustpilotRating ? Number(trustpilotRating) : 0) +
    (trustedshopsRating ? Number(trustedshopsRating) : 0);
  const noOfPlatforms =
    (googleRating ? 1 : 0) +
    (facebookRating ? 1 : 0) +
    (trustpilotRating ? 1 : 0) +
    (trustedshopsRating ? 1 : 0);
  let overallRating = totalRatingOfAllPlatforms / (noOfPlatforms || 1);
  if (overallRating) {
    overallRating = overallRating.toFixed(1);
  }
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

export default connect(mapStateToProps)(SmartUrl);
