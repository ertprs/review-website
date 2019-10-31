import React, { Component } from "react";
import Card from "../../MaterialComponents/Card";
import Button from "@material-ui/core/Button/Button";
import ArrowIconRight from "@material-ui/icons/ArrowForward";
import Router from "next/router";

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
              .widgetImgContainerSmall {
                max-height: 150px;
                width: auto;
                display: none;
              }
              .widgetImgContainerSmall img {
                max-width: 100%;
                height: auto;
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
              @media screen and (max-width: 991px) {
                .widgetImgContainer {
                  display: none;
                }
                .widgetHeader h3 {
                  font-size: 1.2rem;
                }

                .widgetImgContainerSmall {
                  display: block;
                }
                .widgetDescriptionHeader {
                    margin:25px 0 25px 0;
                }
              }
            `}
          </style>
          <div className="widgetHeader">
            <h3>Customer feedback bar on your homepage.</h3>
          </div>
          <div className="widgetImgContainer">
            <img src="/static/images/carouselDemo.png" />
          </div>
          <div className="widgetImgContainerSmall">
            <img src="/static/images/carousel.png" style={{maxWidth:"100%", height:"auto"}}/>
          </div>
          <div className="widgetDescription">
            <div className="widgetDescriptionHeader">
              <h5 style={{ textAlign: "center" }}>Is this your domain ?</h5>
            </div>
            <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
              Claim the ownership of your domain or Sign In (if already claimed)
              to get access to your feedback bar.
            </p>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowIconRight />}
                onClick={()=>{
                    Router.push("/login#business")
                }}
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
