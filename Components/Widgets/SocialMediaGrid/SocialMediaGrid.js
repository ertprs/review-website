import React from "react";
import SocialIconBox from "../SocialIconBox/SocialIconBox";
const SocialMediaGrid = props => {
  //TODO: GET SOCIAL DETAILS AS AN ARRAY AND LOOP
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
          <SocialIconBox
            iconName="facebook"
            caption="followers"
            followersCount="7277704"
            iconStyles={{ color: "#3C5A99" }}
          />
        </div>
        <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
          <SocialIconBox
            iconName="twitter"
            caption="followers"
            followersCount="884173"
            iconStyles={{ color: "#38A1F3" }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
          <SocialIconBox
            iconName="pinterest"
            caption="followers"
            followersCount="N/A"
            iconStyles={{ color: "#c8232c" }}
          />
        </div>
        <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
          <SocialIconBox
            iconName="youtube"
            caption="followers"
            followersCount="N/A"
            iconStyles={{ color: "#ff0000" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
          <SocialIconBox
            iconName="medium"
            caption="followers"
            followersCount="N/A"
            iconStyles={{ color: "#00ab6c" }}
          />
        </div>
        <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
          <SocialIconBox
            iconName="linkedin"
            caption="followers"
            followersCount="N/A"
            iconStyles={{ color: "#0077B5" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGrid;
