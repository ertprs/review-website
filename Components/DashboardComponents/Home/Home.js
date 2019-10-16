import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../MaterialComponents/Card";
import StarRatings from "react-star-ratings";
import Title from "../../MaterialComponents/Title";
import { connect } from "react-redux";
import _get from "lodash/get";
class Home extends Component {
  renderOverviewCard = () => {
    const { reviewsData } = this.props;
    const rating = _get(reviewsData, "rating", 0);
    const total = _get(reviewsData, "total", 0);
    return (
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
        <SimpleCard style={{height:"298px"}}>
          <div className="header">
            <Title>
              <h5>Overall performance</h5>
            </Title>
          </div>
          <div className="body">
            <div className="bodyHeader">
              <h4>Average</h4>
            </div>
            <div className="ratingsContainer">
              <StarRatings
                rating={Number(rating)}
                starRatedColor="#21bc61"
                starDimension="30px"
                starSpacing="0.5px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="bodyFooter">
              <div>Based on {total} reviews</div>
            </div>
          </div>
          <div className="footer">
            <div>Trustsearch score</div>
            <div className="trustScore">
              <span style={{ fontWeight: "400" }}>{rating}</span> out of 5
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderReviewSnippets = topThreeReviews => {
    return topThreeReviews.map(item => {
      let reviewText = "";
      if (item.hasOwnProperty("text")) {
        if (item.text) {
          if (item.text.length > 26) {
            reviewText = _get(item, "text", "").substring(0, 26) + "...";
          } else {
            reviewText = _get(item, "text", "");
          }
        }
      }
      return (
        <div className="reviewSnippetContainer">
          <style jsx>
            {`
              .reviewSnippetContainer {
                margin-bottom: 25px;
              }
              .reviewBody {
                display: flex;
                justify-content: space-between;
              }
              .reviewBodyText {
                margin-top: 1.5px;
                color: #999;
                font-size: 0.8rem;
              }
            `}
          </style>
          <div className="reviewText">{reviewText}</div>
          <div className="reviewBody">
            <div>
              <StarRatings
                rating={item.rating}
                starRatedColor="#21bc61"
                starDimension="17px"
                starSpacing="0.5px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="reviewBodyText">{item.name}</div>
          </div>
        </div>
      );
    });
  };

  renderRecentReviewsCard = () => {
    const { reviewsData } = this.props;
    const reviews = _get(reviewsData, "reviews", []);
    const topThreeReviews = reviews.length > 3 ? reviews.slice(0, 3) : reviews;
    return (
      <Grid item xs={12} md={4} lg={4}>
        <style jsx>{`
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
          }
          .fadedHeader {
            font-weight: lighter;
            color: #555;
          }
        `}</style>
        <SimpleCard style={{height:"298px"}}>
          <div className="header">
            <Title>
              <h5>Latest reviews</h5>
            </Title>
            <div className="fadedHeader">(Top 3 )</div>
          </div>
          <div className="body">
            <div>
              {topThreeReviews.length > 0
                ? this.renderReviewSnippets(topThreeReviews)
                : "No reviews found !"}
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderInvitationsCard = () => {
    const { quotaDetails } = this.props;
    const total = _get(quotaDetails, "invitations.total", 0);
    const remaining = _get(quotaDetails, "invitations.remaining", 0);
    return (
      <Grid item xs={12} md={4} lg={4}>
        <style jsx>{`
          .header {
            margin-bottom: 24px;
          }
          .fadedHeader {
            font-weight: lighter;
            color: #555;
          }
        `}</style>
        <SimpleCard style={{height:"298px"}}>
          <div className="header">
            <Title>
              <h5>Invitations Summary</h5>
            </Title>
          </div>
          <div className="body">
            <div
              style={{ marginBottom: "21px", borderBottom: "1px solid #999" }}
            >
              <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Invitations sent :{" "}
              </p>
              <h1 style={{ textAlign: "right" }}>{total}</h1>
            </div>
            <div style={{ borderBottom: "1px solid #999" }}>
              <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Invitations Left :{" "}
              </p>
              <h1 style={{ textAlign: "right" }}>{remaining}</h1>
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  render() {
    return (
      <Grid container spacing={3}>
        {this.renderOverviewCard()}
        {this.renderRecentReviewsCard()}
        {this.renderInvitationsCard()}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const reviewsData = _get(dashboardData, "reviewsData", {});
  const quotaDetails = _get(
    auth,
    "logIn.userProfile.subscription.quota_details"
  );
  return { reviewsData, quotaDetails };
};

export default connect(mapStateToProps)(Home);
