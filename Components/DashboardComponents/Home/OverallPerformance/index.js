import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import Title from "../../../MaterialComponents/Title";
import SimpleCard from "../../../MaterialComponents/Card";
import Grid from "@material-ui/core/Grid";
import StarRatings from "react-star-ratings";
import { ratingColor, ratingType } from "../../../../utility/ratingTypeColor";
import { calTotalReviewsAndRating } from "../../../../utility/commonFunctions";

class OverallPerformanceCard extends Component {
  render() {
    const { totalReviews, overallRating } = this.props;
    return (
      <>
        <Grid item xs={12} md={4} lg={4}>
          <style jsx>{`
            .header {
              margin-bottom: 30px;
            }
            .body {
              margin-bottom: 30px;
            }
            .bodyHeader {
              margin-left: 4px;
            }
            .ratingsContainer {
              margin: 10px 0 10px 0;
            }
            .bodyFooter {
              margin-left: 4px;
            }
            .footer {
              border: 1px solid #d8d8d8;
              padding: 10px;
            }
            .trustScore {
              font-size: 1.5rem;
              font-weight: lighter;
            }
          `}</style>
          <SimpleCard style={{ height: "298px" }}>
            <div className="header">
              <Title>
                <h5>Overall performance</h5>
              </Title>
            </div>
            <div className="body">
              <div className="bodyHeader">
                <h4>{ratingType[Math.round(overallRating)]}</h4>
              </div>
              <div className="ratingsContainer">
                <StarRatings
                  rating={Number(overallRating)}
                  starRatedColor={
                    ratingColor[Math.round(Number(overallRating)) || 0]
                  }
                  starDimension="30px"
                  starSpacing="0.5px"
                  numberOfStars={5}
                  name="rating"
                />
              </div>
              <div className="bodyFooter">
                <div>Based on {totalReviews} reviews</div>
              </div>
            </div>
            <div className="footer">
              <div>TrustSearch score</div>
              <div className="trustScore">
                <span style={{ fontWeight: "400" }}>{overallRating}</span> out
                of 5
              </div>
            </div>
          </SimpleCard>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const reviews = _get(dashboardData, "reviews", {});
  const result = calTotalReviewsAndRating(reviews);
  const totalReviews = _get(result, "totalReviews", 0);
  const overallRating = _get(result, "overallRating", 0);
  return {
    totalReviews,
    overallRating
  };
};

export default connect(mapStateToProps)(OverallPerformanceCard);
