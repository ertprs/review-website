import React from "react";
import SocialIconBox from "../SocialIconBox/SocialIconBox";
import uuid from "uuid/v1";
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
  console.log(socialData);
  let output = [];
  for (let item in socialData) {
    if (socialData[item].verified) {
      output = [
        ...output,
        <div
          className="col-md-6 col-sm-6"
          style={{ marginBottom: "2%" }}
          key={uuid()}
        >
          <a href={`${socialData[item].profile_url}`} target="_blank" style={{textDecoration:"none", color:"#000"}}>
            <SocialIconBox
              iconName={icons[item].name}
              caption="followers"
              followersCount={
                socialData[item].followers ? socialData[item].followers : "N/A"
              }
              iconStyles={{ color: icons[item].color }}
            />
          </a>
        </div>
      ];
    }
  }

  return output.length > 0 ? output : null;
};

const SocialMediaGrid = ({ socialData }) => {
  return (
    <div>
      <div className="row">{renderSocialMediaItems(socialData)}</div>
    </div>
  );
};

export default SocialMediaGrid;
