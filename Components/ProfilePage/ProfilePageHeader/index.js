import React, { Component } from "react";
import { connect } from "react-redux";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import CustomModal from "../../Widgets/CustomModal/CustomModal";
import ReportDomainModal from "../../ReportDomainModal";
import { profilePageHeaderStyles } from "./profilePageHeaderStyles";
import { ratingType, ratingColor } from "../../../utility/ratingTypeColor";
import { removeSubDomain } from "../../../utility/commonFunctions";
import Placeholder from "./headerPlaceholder";
import Paper from "../../../Components/MaterialComponents/Paper";
import Card from "../../../Components/MaterialComponents/Card";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import VerifiedIcon from "@material-ui/icons/VerifiedUser";
import UnVerifiedIcon from "@material-ui/icons/NotInterested";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-scroll";
import _get from "lodash/get";

class ProfilePageHeader extends Component {
  state = {
    showReportDomainModal: false
  };

  render() {
    const {
      domainProfileData,
      isLoading,
      totalReviews,
      averageRating,
      onTrustClick
    } = this.props;

    const { showReportDomainModal } = this.state;
    const headerData = ((domainProfileData || {}).headerData || {}).data || {};
    const domain_name = (headerData || {}).domain_name || "";
    const is_verified = (headerData || {}).is_verified || false;
    const screenshotUrl = (headerData || {}).screenshot || "";
    let parsed_domain_name = removeSubDomain(domain_name);
    const reviewCardBody = (
      <RatingIndicators
        rating={Number(averageRating)}
        typeOfWidget="star"
        widgetRatedColors={ratingColor[Math.round(Number(averageRating)) || 0]}
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
                  imgContainerStyles={{
                    maxWidth: "300px"
                  }}
                  title={parsed_domain_name}
                  subTitle={
                    <>
                      <span>
                        {totalReviews
                          ? `Reviews ${totalReviews || 0} `
                          : "Reviews 0"}
                      </span>
                      <span style={{ marginLeft: "5px" }}>
                        {averageRating
                          ? `• ${ratingType[Math.round(Number(averageRating))]}`
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
                        onClick={onTrustClick}
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
                      <Tooltip
                        title={
                          <React.Fragment>
                            <h6>
                              {is_verified
                                ? "This company has a trustsearch account."
                                : "This company does not have a trustsearch account."}
                            </h6>
                          </React.Fragment>
                        }
                      >
                        <div style={{ display: "flex" }}>
                          <div style={{ alignSelf: "center" }}>
                            {is_verified ? (
                              <VerifiedIcon
                                style={{ color: "green", fontSize: "20px" }}
                              />
                            ) : (
                              <UnVerifiedIcon
                                style={{ color: "red", fontSize: "20px" }}
                              />
                            )}
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
                            {is_verified ? "Verified" : "Unverified"}
                          </div>
                        </div>
                      </Tooltip>
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
                      <span className="claimed">Report this domain</span>
                    </div>
                    <div>
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
          // shouldCloseOnOverlayClick={false}
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
  const { domainProfileData, isLoading } = state.profileData || {};
  const totalReviews = _get(
    domainProfileData,
    "overallRatingAndReviews.totalReviews",
    0
  );
  const averageRating = _get(
    domainProfileData,
    "overallRatingAndReviews.averageRating",
    0
  );

  return {
    domainProfileData,
    isLoading,
    totalReviews,
    averageRating
  };
};

export default connect(mapStateToProps)(ProfilePageHeader);
