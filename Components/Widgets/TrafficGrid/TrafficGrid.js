import React from "react";
import SocialIconBox from "../SocialIconBox/SocialIconBox";
const TrafficGrid = props => {
  //TODO: GET SOCIAL DETAILS AS AN ARRAY AND LOOP
  return (
    <div>
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
          <SocialIconBox
            iconName="bolt"
            caption="Alexa page views"
            followersCount="1,323"
            iconStyles={{ color: "#29B6F6" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TrafficGrid;
