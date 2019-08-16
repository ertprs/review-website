import React from "react";
import SocialIconBox from "../SocialIconBox/SocialIconBox";

const icons = {
  1: { name: "facebook", color: "#3C5A99" },
  2: { name: "youtube", color: "#ff0000" },
  3: { name: "instagram", color: "#F77737" },
  4: { name: "qzone", color: "" },
  5: { name: "weibo", color: "#df2029" },
  6: { name: "twitter", color: "#38A1F3" },
  7: { name: "reddit", color: "#FF5700" },
  8: { name: "pinterest", color: "#c8232c" },
  9: { name: "ask.fm", color: "" },
  10: { name: "tumblr", color: "#34526f" },
  11: { name: "flickr", color: "#ff0084" },
  12: { name: "google-plus", color: "#CC3333" },
  13: { name: "linkedin", color: "#0077B5" },
  14: { name: "vk", color: "#4c75a3" },
  15: { name: "odnoklassniki", color: "#ed812b" },
  16: { name: "meetup", color: "#e51937" },
  17: { name: "medium", color: "#00ab6c" }
};

const renderSocialMediaItems = socialData => {
  //check for verified true
  let output = [];
  for (let item in socialData) {
    // if(socialData[item].verified){
      output = [
        ...output,
        <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
          <SocialIconBox
            iconName={icons[item].name}
            caption="followers"
            followersCount={socialData[item].followers ? socialData[item].followers : "N/A"}
            iconStyles={{ color: icons[item].color }}
          />
        </div>
      ];
    // }
  }

  return output.length > 0 ? output: <div className ="col-md-12"><h6  style={{textAlign:"center", fontWeight:"400"}}>No social media record found :(</h6></div>;
};

const SocialMediaGrid = ({ socialData }) => {
  return (
    <div>
      <div className="row">
        {renderSocialMediaItems(socialData)}
        {/* <div className="col-md-6 col-sm-6" style={{ marginBottom: "2%" }}>
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
        </div> */}
      </div>
    </div>
  );
};

export default SocialMediaGrid;
