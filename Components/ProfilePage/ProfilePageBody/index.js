import React, { Component } from "react";
import ProfilePageBodyRight from "../ProfilePageBodyRight/ProfilePageBodyRight";
import ProfilePageBodyLeft from "./ProfilePageBodyLeft";
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
              <ProfilePageBodyLeft {...this.props} />
            </div>
            <div className="col-md-4 profilePageBodyRightContainer">
              <ProfilePageBodyRight
                analyzeReports={this.props.analyzeReports}
                trafficReports={this.props.trafficReports}
                socialMediaStats={this.props.socialMediaStats}
                isMounted={this.props.isMounted}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
