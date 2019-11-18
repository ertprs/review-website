import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";
import ManulaInvitation from "./ManualInvitation";
import AutomaticInvitation from "./AutomaticInvitation";
import NeedDeveloperSupport from "../../../Widgets/NeedDeveloperSupport/NeedDeveloperSupport";

export default class InvitationWays extends Component {
  render() {
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
          <div className="col-md-6">
            <ManulaInvitation {...this.props} />
          </div>
          <div className="col-md-6">
            <AutomaticInvitation {...this.props} />
          </div>
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
            <Button
              variant="contained"
              color="primary"
              endIcon={<KeyboardArrowRight />}
              onClick={this.props.onContinueClick}
              size="small"
            >
              Continue
            </Button>
          </div>
        </div>
        <NeedDeveloperSupport />
      </div>
    );
  }
}
