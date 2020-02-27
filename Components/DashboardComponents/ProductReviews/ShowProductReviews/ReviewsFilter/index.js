import React from "react";
import dynamic from "next/dynamic";
import _get from "lodash/get";
import { connect } from "react-redux";

import { isValidArray } from "../../../../../utility/commonFunctions";

const Select = dynamic(() => import("react-select"), {
  ssr: false
});

const generateOptionsFromPlatforms = productReviewsPlatforms => {
  let options = [];
  if (isValidArray(productReviewsPlatforms)) {
    for (let platform of productReviewsPlatforms) {
      let platformId = _get(platform, "_id", "");
      let platformName = _get(platform, "name", "");
      if (platformId && platformName) {
        options = [...options, { value: platformId, label: platformName }];
      }
    }
    return [{ value: "", label: "All platforms" }, ...options];
  }
};

const ReviewsFilter = props => {
  //Extracted in mapStateToProps
  const productReviewsPlatforms = _get(props, "productReviewsPlatforms", []);
  const { handleSelectedProductPlatformChange } = props;
  return (
    <div>
      <Select
        isLoading={productReviewsPlatforms.length === 0 ? true : false}
        loadingMessage={() => {
          return "Fetching available platforms...";
        }}
        name="product platforms"
        options={generateOptionsFromPlatforms(productReviewsPlatforms)}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={obj => {
          handleSelectedProductPlatformChange(obj);
        }}
        placeholder="Filter by review platforms"
      />
    </div>
  );
};

const mapStateToProps = state => {
  const productReviewsPlatforms = _get(
    state,
    "dashboardData.productReviewsPlatforms.platforms",
    []
  );
  return { productReviewsPlatforms };
};

export default connect(mapStateToProps)(ReviewsFilter);
