import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../MaterialComponents/Card";
import StarRatings from "react-star-ratings";
import Title from "../../MaterialComponents/Title";
export default class Home extends Component {
  renderOverviewCard = () => {
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
        <SimpleCard>
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
                rating={4.3}
                starRatedColor="#21bc61"
                starDimension="30px"
                starSpacing="0.5px"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="bodyFooter">
              <div>Based on 17 reviews</div>
            </div>
          </div>
          <div className="footer">
            <div>Trustsearch score</div>
            <div className="trustScore">
              <span style={{ fontWeight: "400" }}>4.3</span> out of 5
            </div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderReviewSnippet = () => {
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
        <div className="reviewText">"Great service ever used by...</div>
        <div className="reviewBody">
          <div>
            <StarRatings
              rating={4}
              starRatedColor="#21bc61"
              starDimension="17px"
              starSpacing="0.5px"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <div className="reviewBodyText">By Patrick Weiss</div>
        </div>
      </div>
    );
  };

  renderRecentReviewsCard = () => {
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
        <SimpleCard>
          <div className="header">
            <Title>
              <h5>Latest reviews</h5>
            </Title>
            <div className="fadedHeader">(Top 3 )</div>
          </div>
          <div className="body">
            <div>{this.renderReviewSnippet()}</div>
            <div>{this.renderReviewSnippet()}</div>
            <div>{this.renderReviewSnippet()}</div>
          </div>
        </SimpleCard>
      </Grid>
    );
  };

  renderInvitationsCard = () => {
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
        <SimpleCard>
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
              <h1 style={{ textAlign: "right" }}>56</h1>
            </div>
            <div style={{ borderBottom: "1px solid #999" }}>
              <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
                Invitations Left :{" "}
              </p>
              <h1 style={{ textAlign: "right" }}>44</h1>
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
