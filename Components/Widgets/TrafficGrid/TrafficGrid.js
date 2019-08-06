import React, { useState } from "react";
import SocialIconBox from "../SocialIconBox/SocialIconBox";
import ToolTip from "../ToolTip/ToolTip";
import AmpImgWrapper from "../../AmpWrappers/AmpImgWrapper";
import Head from "next/head";
import * as AmpHelpers from "react-amphtml/helpers";
import * as Amp from "react-amphtml";

export const config = { amp: "hybrid" };

const TrafficGrid = props => {
  //TODO: GET SOCIAL DETAILS AS AN ARRAY AND LOOP
  const [showAlexaGraph, setAlexaGraphVisibility] = useState(false);
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
      </Head>
      <div>
        <Amp.AmpState specName="amp-state" id="showAlexaGraph">
          {{ show: true }}
        </Amp.AmpState>
        <div className="row">
          <div className="col-md-6">
            <SocialIconBox
              iconName="pie-chart"
              caption="Daily unique visitors"
              followersCount="790,672"
              iconStyles={{ color: "#ff7043" }}
            />
          </div>
          <div className="col-md-6">
            <SocialIconBox
              iconName="calendar"
              caption="Monthly unique visitors"
              followersCount="23,720,160"
              iconStyles={{ color: "#009688" }}
            />
          </div>
        </div>

        <div className="row" style={{ marginTop: "4%" }}>
          <div className="col-md-6">
            <SocialIconBox
              iconName="bullseye"
              caption="Pages per visit"
              followersCount="3.70"
              iconStyles={{ color: "#5c6bc0" }}
            />
          </div>
          <div className="col-md-6">
            <SocialIconBox
              iconName="chain-broken"
              caption="Bounce rate"
              followersCount="29.72%"
              iconStyles={{ color: "#FF7043" }}
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: "6%" }}>
          <div className="col-md-6">
            <SocialIconBox
              iconName="eye"
              caption="Daily page views"
              followersCount="2,925,487"
              iconStyles={{ color: "#ec407a" }}
            />
          </div>
          <div className="col-md-6">
            {
              <AmpHelpers.Action
                events={{
                  tap: [
                    "AMP.setState({ showAlexaGraph: { show: !showAlexaGraph.show } })"
                  ]
                }}
              >
                {props => (
                  <div
                    onMouseEnter={e => setAlexaGraphVisibility(!showAlexaGraph)}
                    onMouseLeave={e => {
                      setAlexaGraphVisibility(!showAlexaGraph);
                    }}
                    style={{ cursor: "pointer" }}
                    {...props}
                  >
                    <SocialIconBox
                      iconName="bolt"
                      caption="Alexa page views"
                      followersCount="1,323"
                      iconStyles={{ color: "#29B6F6" }}
                    />
                  </div>
                )}
              </AmpHelpers.Action>
            }
            <ToolTip visible={showAlexaGraph}>
              {/* AMP image wrapper */}
              <div style={{ height: "auto", width: "300px" }}>
                <AmpImgWrapper
                  useImgLoader={true}
                  src={`https://traffic.alexa.com/graph?w=308&h=201&o=f&c=1&y=t&b=ffffff&n=666666&r=6m&u=snapdeal.com`}
                  alt="alexa graph"
                  height="132.34px"
                  width="300px"
                  layout="responsive"
                  imgContainerStyles={{ width: "300px", height: "132.34px" }}
                  style={{ maxWidth: "100%", maxheight: "100%" }}
                />
              </div>
            </ToolTip>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrafficGrid;
