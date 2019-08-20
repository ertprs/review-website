import React, { useState } from "react";
import SocialIconBox from "../SocialIconBox/SocialIconBox";
import ToolTip from "../ToolTip/ToolTip";
import AmpImgWrapper from "../../AmpWrappers/AmpImgWrapper";
import Head from "next/head";
import uuid from 'uuid/v1';
import * as AmpHelpers from "react-amphtml/helpers";
import * as Amp from "react-amphtml";

export const config = { amp: "hybrid" };

const renderTrafficGridItems = (
  props,
  showAlexaGraph,
  setAlexaGraphVisibility
) => {
  const { trafficData } = props;
  const icons = {
    alexa_pageviews: { name: "bolt", color: "#29B6F6" },
    bounce_rate: { name: "chain-broken", color: "#FF7043" },
    daily_pageviews: { name: "eye", color: "#ec407a" },
    daily_unique_visitors: { name: "pie-chart", color: "#ff7043" },
    monthly_unique_visitors: { name: "calendar", color: "#009688" },
    pages_per_visit: { name: "bullseye", color: "#5c6bc0" }
  };

  let output = [];
  for (let item in trafficData) {
    if (item !== "alexa_search_traffic") {
      if (item === "alexa_pageviews") {
        output = [
          ...output,
          <div
            className="col-md-6 col-sm-6"
            style={{ marginBottom: "2%", textTransform: "capitalize" }}
            key={uuid()}
          >
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
                    onMouseEnter={e => setAlexaGraphVisibility(true)}
                    onMouseLeave={e => {
                      setAlexaGraphVisibility(false);
                    }}
                    style={{ cursor: "pointer" }}
                    {...props}
                    role="button"
                    tabindex="1"
                  >
                    <SocialIconBox
                      iconName={icons[item].name}
                      caption={item.split("_").join(" ")}
                      followersCount={trafficData[item]}
                      iconStyles={{ color: icons[item].color }}
                    />
                  </div>
                )}
              </AmpHelpers.Action>
            }
           {trafficData[item]!=="N/A" ?  <ToolTip visible={showAlexaGraph} styles={{}}>
              <div style={{ height: "auto", width: "260px" }}>
                <AmpImgWrapper
                  useImgLoader={true}
                  loaderStyles={{
                    textAlign: "center",
                    height: "auto",
                    width: "260px"
                  }}
                  src={trafficData["alexa_search_traffic"]}
                  alt="alexa graph"
                  height="110.28px"
                  width="250px"
                  layout="responsive"
                  imgContainerStyles={{ width: "250px", height: "110.28px" }}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </ToolTip> : ""}
          </div>
        ];
      } else {
        output = [
          ...output,
          <div
            className="col-md-6 col-sm-6"
            style={{ marginBottom: "2%", textTransform: "capitalize" }}
            key={uuid()}
          >
            <SocialIconBox
              iconName={icons[item].name}
              caption={item.split("_").join(" ")}
              followersCount={trafficData[item]}
              iconStyles={{ color: icons[item].color }}
            />
          </div>
        ];
      }
    }
  }

  return output;
};

const TrafficGrid = props => {
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
          {renderTrafficGridItems(
            props,
            showAlexaGraph,
            setAlexaGraphVisibility
          )}
        </div>
      </div>
    </>
  );
};

export default TrafficGrid;
