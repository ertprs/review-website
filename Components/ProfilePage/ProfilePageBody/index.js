import React, { Component } from "react";
import ProfilePageBodyRight from "../ProfilePageBodyRight/ProfilePageBodyRight";
import ProfilePageBodyLeft from "./ProfilePageBodyLeft";
import { Element } from "react-scroll";
import ProfilePageFooter from "../ProfilePageFooter/ProfilePageFooter";
export default class ProfilePageBody extends Component {
  render() {
    return (
      <div style={{ background: "#f5f5f5" }}>
        <style jsx>
          {`
            .profilePageBodyLeftContainer {
              margin-top: 50px;
            }
            .customContainer {
              max-width: 90%;
              margin: 0 auto;
            }

            .profilePageBodyRightContainer {
              margin-top: 50px;
            }
            @media screen and (max-width: 767px) {
              .profilePageBodyRightContainer {
                margin-top: 0;
              }
            }
          `}
        </style>
        <div className="container">
          <div className="row">
            <div className="col-md-8 profilePageBodyLeftContainer">
              <Element name="reviews" className="reviews">
                <ProfilePageBodyLeft {...this.props} />
                <div style={{ marginBottom: "35px" }}>
                  <ProfilePageFooter />
                </div>
              </Element>
            </div>
            <div className="col-md-4 profilePageBodyRightContainer">
              <Element name="analyzeReports" className="analyzeReports">
                <ProfilePageBodyRight
                  analyzeReports={this.props.analyzeReports}
                  trafficReports={this.props.trafficReports}
                  socialMediaStats={this.props.socialMediaStats}
                  isMounted={this.props.isMounted}
                  domainReviews={this.props.domainReviews}
                />
              </Element>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
