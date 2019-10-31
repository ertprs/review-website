import React, { Component } from "react";
import Card from "../../MaterialComponents/Card";
import Button from "@material-ui/core/Button/Button";
import ArrowIconRight from "@material-ui/icons/ArrowForward";

export default class ProfilePageFooter extends Component {
  render() {
    return (
      <div>
        <Card>
          <style jsx>
            {`
              .widgetImgContainer {
                max-height: 150px;
                width: auto;
              }
              .widgetImgContainer img {
                max-width: 100%;
                height: auto;
              }
              .widgetHeader {
                text-align: center;
                margin: 20px 0 20px 0;
              }
              .widgetDescription {
                margin-top: 35px;
              }
              .widgetDescriptionList {
                display: flex;
                flex: 1;
              }
            `}
          </style>
          <div className="widgetHeader">
            <h3>Customer feedback bar on your homepage.</h3>
          </div>
          <div className="widgetImgContainer">
            <img src="/static/images/carouselDemo.png" />
          </div>
          <div className="widgetDescription">
            <h5 style={{ textAlign: "center" }}>Is this your domain ?</h5>
            <p style={{ textAlign: "center", fontSize:"0.9rem" }}>
              Claim the ownership of your domain or Sign In (if already claimed)
              to get access to your feedback bar.
            </p>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowIconRight />}
              >
                Click here to proceed
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
