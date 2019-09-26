import React, { Component } from "react";
import Paper from "../../../Components/MaterialComponents/Paper";
import Card from "../../../Components/MaterialComponents/Card";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import { profilePageHeaderStyles } from "./profilePageHeaderStyles";
import _get from "lodash";

export default class index extends Component {
  state = {
    headerData: {}
  };

  componentDidMount() {
    this.setState({ headerData: { ...this.props.headerData } });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.headerData.domain_name === nextProps.headerData.domain_name &&
      this.props.headerData.is_verified === nextProps.headerData.is_verified &&
      this.props.headerData.rating === nextProps.headerData.rating &&
      this.props.headerData.review_length === nextProps.headerData.review_length
    ) {
      return false;
    }
    return true;
  }

  render() {
    const { headerData } = this.props;
    const ratings = (headerData || {}).rating || 0;
    const domain_name = (headerData || {}).domain_name || "";
    const is_verified = (headerData || {}).is_verified || false;
    const review_length = (headerData || {}).review_length || 0;

    const reviewCardBody = (
      <RatingIndicators
        rating={Number(ratings)}
        typeOfWidget="star"
        widgetRatedColors="#21bc61"
        widgetDimensions="35px"
        widgetSpacings="2px"
      />
    );
    return (
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
                  imgContainerStyles={{
                    maxWidth: "300px",
                    
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
                        <i className="fa fa-share-square-o"></i>{domain_name}
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
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}
