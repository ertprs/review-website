import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import ManualInvitation from "./ManualInvitation";
import AutomaticInvitation from "./AutomaticInvitation";

export default class InvitationWays extends Component {
  render() {
    const { invitationWayToRender } = this.props;
    return (
      <div className="container">
        <style jsx>{`
          .buttonContainer {
            margin-top: 5%;
            width: 20%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
        <div className="row">
          {invitationWayToRender === "automatic" ? (
            <>
              <div className="col-md-12">
                <AutomaticInvitation {...this.props} />
              </div>
            </>
          ) : (
            <div className="col-md-12">
              <ManualInvitation {...this.props} />
            </div>
          )}
        </div>
        <div className="buttonContainer">
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<KeyboardArrowLeft />}
              onClick={this.props.onBackClick}
              size="small"
            >
              Back
            </Button>
          </div>
          <div>
            {invitationWayToRender !== "automatic" ? (
              <Button
                variant="contained"
                color="primary"
                endIcon={<KeyboardArrowRight />}
                onClick={this.props.onContinueClick}
                size="small"
              >
                Continue
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
