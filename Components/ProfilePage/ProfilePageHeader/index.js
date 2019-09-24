import React, { Component } from "react";
import Paper from "../../../Components/MaterialComponents/Paper";
import Card from "../../../Components/MaterialComponents/Card";
import ReviewCard from "../../Widgets/ReviewCard/ReviewCard";
import RatingIndicators from "../../Widgets/RatingIndicators/RatingIndicators";
import { profilePageHeaderStyles } from "./profilePageHeaderStyles";
export default class index extends Component {
  render() {
    const reviewCardBody = (
      <RatingIndicators
        rating={4}
        typeOfWidget="star"
        widgetRatedColors="#21bc61"
        widgetDimensions="35px"
        widgetSpacings="2px"
      />
    );
    return (
      <Paper>
        <div className="profilePageHeaderContainer">
          <style jsx>{profilePageHeaderStyles}</style>
          <div className="container">
            <div className="row">
              <div
                className="col-md-8" style={{marginTop:"25px"}}
              >
                <ReviewCard
                  variant="profileHeaderCard"
                  image="/static/images/capture.png"
                  imgContainerStyles={{maxWidth:"300px", marginRight:"30px"}}
                  title="Google"
                  subTitle={
                    <>
                      <span>Reviews 8,202</span>
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
              <div className="col-md-4">
                <div className="headerCard">
                  <Card>
                    <div className="companyLink">
                      <a href="https://www.google.com" target="_blank">
                        <i className="fa fa-share-square-o"></i>www.google.com
                      </a>
                    </div>
                    <div>Visit this website</div>
                  </Card>
                </div>
                <div className="headerCard">
                  <Card>
                    <div className="companyClaimStatus">
                      <i className="fa fa-check-circle"></i>
                      <span className="claimed">Claimed</span>
                    </div>
                    <div>
                      This company has a Trust Search account but we have no
                      records of them asking their customers for reviews.
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
