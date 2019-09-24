import React, { Component } from "react";

export default class ProfilePageBody extends Component {
  render() {
    return (
      <div style={{ background: "#f5f5f5" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
                Left
            </div>
            <div className="col-md-5">
                Right
            </div>
          </div>
        </div>
      </div>
    );
  }
}
