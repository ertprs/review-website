import React, { Component } from "react";
import Paper from "../../../Components/MaterialComponents/Paper";
import Card from "../../../Components/MaterialComponents/Card";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import { profilePageHeaderStyles } from "./profilePageHeaderStyles";
import _get from "lodash";
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
    const { domainProfileData, isLoading } = this.props;
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
    console.log(screenshotUrl, "screenshotUrl");
    const reviewCardBody = (
      <RatingIndicators
        rating={Number(ratings)}
        typeOfWidget="star"
        widgetRatedColors="#21bc61"
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
                  image={`https://api.screenshotlayer.com/api/capture?access_key=1ed89e56fa17fe2bd7cc86f2a0e6a209&url=https://www.${parsed_domain_name}&viewport=1440x900&width=250&random=${Math.floor(
                    Math.random() * 10 + 1
                  )}`}
                  fallbackImage={screenshotUrl}
                  // image={`http://localhost:3000/upload?domain=https://www.${domain_name}/`}
                  imgContainerStyles={{
                    maxWidth: "300px"
                  }}
                  title={parsed_domain_name}
                  subTitle={
                    <>
                      <span>Reviews {review_length}</span>
                      <span style={{ marginLeft: "5px" }}>• Average</span>
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
                            style={{ color: "green", fontSize: "20px" }}
                          ></i>

                          <span className="claimed" style={{ color: "green" }}>
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
  const { profileData } = state;
  const { domainProfileData, isLoading } = profileData;
  return { domainProfileData, isLoading };
};

export default connect(mapStateToProps)(ProfilePageHeader);
