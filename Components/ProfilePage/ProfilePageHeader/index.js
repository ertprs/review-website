import React, { Component } from "react";
import Paper from "../../../Components/MaterialComponents/Paper";
import Card from "../../../Components/MaterialComponents/Card";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import { profilePageHeaderStyles } from "./profilePageHeaderStyles";
import _get from "lodash";
import { connect } from "react-redux";
import Placeholder from "./headerPlaceholder";
import axios from "axios";
class ProfilePageHeader extends Component {
  state = {
    headerData: {},
    imageSrc: ""
  };

  componentDidMount() {
    // this.setState({ headerData: { ...this.props.headerData } });
    axios
      .get("http://localhost:8080/screenshot?domain=https://www.sbilife.co.in/")
      .then(result => {
        console.log("result", "result");
        this.setState({ imageSrc: result.data });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.props.headerData.domain_name === nextProps.headerData.domain_name &&
  //     this.props.headerData.is_verified === nextProps.headerData.is_verified &&
  //     this.props.headerData.rating === nextProps.headerData.rating &&
  //     this.props.headerData.review_length === nextProps.headerData.review_length
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { domainProfileData, isLoading } = this.props;
    const headerData = ((domainProfileData || {}).headerData || {}).data || {};
    const ratings = (headerData || {}).rating || 0;
    const domain_name = (headerData || {}).domain_name || "";
    const is_verified = (headerData || {}).is_verified || false;
    const review_length = (headerData || {}).review_length || 0;
    const willCome = (headerData || {}).willCome || false;

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
                  image={`https://api.screenshotlayer.com/api/capture?access_key=1ed89e56fa17fe2bd7cc86f2a0e6a209&url=https://www.${domain_name}&viewport=1440x900&width=250&random=${Math.floor(
                    Math.random() * 10 + 1
                  )}`}
                  // image={`http://localhost:3000/upload?domain=https://www.${domain_name}/`}
                  imgContainerStyles={{
                    maxWidth: "300px"
                  }}
                  title={domain_name}
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
                    <div className="companyLink">
                      <a href={`https://www.${domain_name}`} target="_blank">
                        <i className="fa fa-share-square-o"></i>
                        {domain_name}
                      </a>
                    </div>
                    <div>Visit this website</div>
                  </Card>
                </div>
                <div className="headerCard">
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
                        {is_verified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                    <div>
                      {is_verified
                        ? "This company has a Trust Search account but we have no records of them asking their customers for reviews."
                        : "This company does not have a Trust Search account"}
                    </div>
                  </Card>
                </div>
              </div>
              <img src={this.state.imageSrc} />
            </div>
          </div>
        </div>
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
