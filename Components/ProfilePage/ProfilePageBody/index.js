import React, { Component } from "react";
import ProfilePageBodyRight from '../ProfilePageBodyRight/ProfilePageBodyRight';
import ProfilePageBodyLeft from './ProfilePageBodyLeft';
export default class ProfilePageBody extends Component {
  render() {
    return (
      <div style={{ background: "#f5f5f5" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7" style={{marginTop:"50px"}}>
                <ProfilePageBodyLeft />
            </div>
            <div className="col-md-5" style={{marginTop:"50px"}}>
                <ProfilePageBodyRight />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
