import React from "react";
import _get from "lodash/get";

const ReviewPlatforms = ({ reviewPlatforms, handlePlatformClick }) => {
  console.log(reviewPlatforms[0].name, "reviewPlatforms");
  return (
    <div className="container">
      {(reviewPlatforms || []).map(platform => {
        return (
          <div
            onClick={() =>
              handlePlatformClick(_get(platform, "social_app_id", 0))
            }
          >
            {_get(platform, "name", "")}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewPlatforms;
