import React, { Component } from "react";
import Paper from "../../../Components/MaterialComponents/Paper";
import Card from "../../../Components/MaterialComponents/Card";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import { profilePageHeaderStyles } from "./profilePageHeaderStyles";
import _get from "lodash/get";
import { connect } from "react-redux";
import Placeholder from "./headerPlaceholder";
import CustomModal from "../../Widgets/CustomModal/CustomModal";
import ReportDomainModal from "../../ReportDomainModal";
import VerifiedIcon from "@material-ui/icons/VerifiedUser";
import UnVerifiedIcon from "@material-ui/icons/NotInterested";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

class ProfilePageHeader extends Component {
  state = {
    headerData: {},
    imageSrc: "",
    showReportDomainModal: false
  };

  render() {
    const {
      domainProfileData,
      isLoading,
      googleRating,
      trustPilotRating,
      watchdogRating,
      reviewsCount
    } = this.props;

    const { showReportDomainModal } = this.state;
    const headerData = ((domainProfileData || {}).headerData || {}).data || {};
    const ratings = (headerData || {}).rating || 0;
    const domain_name = (headerData || {}).domain_name || "";
    const is_verified = (headerData || {}).is_verified || false;
    const screenshotUrl = (headerData || {}).screenshot || "";
    const review_length = (headerData || {}).review_length || 0;
    const willCome = (headerData || {}).willCome || false;
    let parsed_domain_name = domain_name.replace(/https:\/\//gim, "");
    parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
    let domainRating = 0;
    if (googleRating && Number(googleRating) > 0) {
      domainRating = Number(googleRating);
    } else if (trustPilotRating && Number(trustPilotRating) > 0) {
      domainRating = trustPilotRating;
    } else if (watchdogRating && Number(watchdogRating) > 0) {
      domainRating = watchdogRating;
    }

    let ratingType = {
      0: "",
      1: "Poor",
      2: "Bad",
      3: "Average",
      4: "Great",
      5: "Excellent"
    };

    let ratingColor = {
      0: "grey",
      1: "#FF432F",
      2: "#FF8622",
      3: "#FFCE00",
      4: "#73CF11",
      5: "#21bc61"
    };

    const reviewCardBody = (
      <RatingIndicators
        rating={Number(domainRating)}
        typeOfWidget="star"
        widgetRatedColors={ratingColor[Math.round(Number(domainRating))]}
        widgetDimensions="35px"
        widgetSpacings="2px"
      />
    );
    return isLoading ? (
      <div className="row">
        <div className="col-md-12">
          <Placeholder />
        </div>
      </div>
    ) : (
      <Paper paperStyles={{ padding: "5px 0 5px 0" }}>
        <div className="profilePageHeaderContainer">
          <style jsx>{profilePageHeaderStyles}</style>
          <div className="container ">
            <div className="row">
              <div className="col-md-8" style={{ marginTop: "25px" }}>
                <ReviewCard
                  variant="profileHeaderCard"
                  fallbackImage={`https://api.screenshotlayer.com/api/capture?access_key=1ed89e56fa17fe2bd7cc86f2a0e6a209&url=https://www.${parsed_domain_name}&viewport=1440x900&width=250&random=${Math.floor(
                    Math.random() * 10 + 1
                  )}`}
                  image={screenshotUrl}
                  // image={`http://localhost:3000/upload?domain=https://www.${domain_name}/`}
                  imgContainerStyles={{
                    maxWidth: "300px"
                  }}
                  title={parsed_domain_name}
                  subTitle={
                    <>
                      <span>
                        {reviewsCount ? `Reviews ${reviewsCount || 0} ` : null}
                      </span>
                      <span style={{ marginLeft: "5px" }}>
                        {domainRating
                          ? `• ${ratingType[Math.round(Number(domainRating))]}`
                          : null}
                      </span>
                    </>
                  }
                  body={reviewCardBody}
                  subTitleStyles={{
                    fontSize: "1.0rem",
                    marginBottom: "5px"
                  }}
                />
              </div>
              <div className="col-md-4 headerRight">
                <div className="headerCard">
                  <Card>
                    <Link
                      activeClass="active"
                      className="writeReview"
                      to="writeReview"
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-50}
                    >
                      <div
                        onClick={this.props.onTrustClick}
                        className="companyLink"
                        style={{ marginBottom: "14px" }}
                      >
                        <div className="companyClaimStatus">
                          <i
                            className="fa fa-thumbs-up"
                            style={{ color: "#21BC61", fontSize: "20px" }}
                          ></i>

                          <span
                            className="claimed"
                            style={{ color: "#21BC61" }}
                          >
                            I trust this domain.
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="claimed">
                      {is_verified ? (
                        <Tooltip
                          title={
                            <React.Fragment>
                              <h6>This company has a trustsearch account.</h6>
                            </React.Fragment>
                          }
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ alignSelf: "center" }}>
                              <VerifiedIcon
                                style={{ color: "green", fontSize: "20px" }}
                              />
                            </div>
                            <div
                              style={{
                                fontSize: "17px",
                                fontWeight: "bold",
                                color: "#555",
                                marginLeft: "5px",
                                alignSelf: "center",
                                letterSpacing: "1px"
                              }}
                            >
                              Verified
                            </div>
                          </div>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title={
                            <React.Fragment>
                              <h6>
                                This company does not have a trustsearch
                                account.
                              </h6>
                            </React.Fragment>
                          }
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ alignSelf: "center" }}>
                              <UnVerifiedIcon
                                style={{ color: "red", fontSize: "20px" }}
                              />
                            </div>
                            <div
                              style={{
                                fontSize: "17px",
                                fontWeight: "bold",
                                color: "#555",
                                marginLeft: "5px",
                                alignSelf: "flex-end",
                                letterSpacing: "1px"
                              }}
                            >
                              Unverified
                            </div>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </Card>
                </div>
                <div
                  className="headerCard"
                  onClick={() => this.setState({ showReportDomainModal: true })}
                >
                  <Card>
                    <div className="companyClaimStatus">
                      {is_verified ? (
                        <i
                          className="fa fa-check-circle"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-warning"
                          style={{ color: "#fcaf16" }}
                        ></i>
                      )}
                      <span className="claimed">
                        {/* {is_verified ? "Verified" : "Unverified"} */}
                        Report this domain
                      </span>
                    </div>
                    <div>
                      {/* {is_verified
                        ? "This company has a Trustsearch account but we have no records of them asking their customers for reviews."
                        : "This company does not have a Trustsearch account"} */}
                      If you think that this domain fraudulent. Please report
                      this domain.
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomModal
          showModal={showReportDomainModal}
          handleModalClose={() => {
            this.setState({ showReportDomainModal: false });
          }}
          modalCustomStyles={{ width: "70%" }}
          shouldCloseOnOverlayClick={false}
        >
          <ReportDomainModal
            closeModal={() => this.setState({ showReportDomainModal: false })}
          />
        </CustomModal>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  const { profileData, googleReviews, aggregateData } = state;
  const { domainProfileData, isLoading } = profileData;
  const googleRating = _get(googleReviews, "reviews.data.rating", 0);
  const trustPilotRating = _get(aggregateData, "18.data.rating", 0);
  const watchdogRating = _get(
    profileData,
    "domainProfileData.watchdogRating",
    0
  );
  const googleReviewsData = _get(googleReviews, "reviews.data.reviews", []);
  const wotReviews = _get(domainProfileData, "wotReviews.data", []);
  const trustsearchReviews = _get(domainProfileData, "domainReviews.data", []);

  let reviewsCount = 0;
  if (googleReviewsData) {
    if (Array.isArray(googleReviewsData)) {
      if (googleReviewsData.length > 0) {
        reviewsCount = reviewsCount + googleReviewsData.length;
      }
    }
  }

  if (wotReviews) {
    if (Array.isArray(wotReviews)) {
      if (wotReviews.length > 0) {
        reviewsCount = reviewsCount + wotReviews.length;
      }
    }
  }

  if (trustsearchReviews) {
    if (Array.isArray(trustsearchReviews)) {
      if (trustsearchReviews.length > 0) {
        reviewsCount = reviewsCount + trustsearchReviews.length;
      }
    }
  }
  return {
    domainProfileData,
    isLoading,
    googleRating,
    trustPilotRating,
    watchdogRating,
    googleReviews,
    reviewsCount
  };
};

export default connect(mapStateToProps)(ProfilePageHeader);
