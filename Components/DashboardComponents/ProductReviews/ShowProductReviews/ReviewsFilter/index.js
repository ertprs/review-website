import React from "react";
import dynamic from "next/dynamic";
import _get from "lodash/get";
const Select = dynamic(() => import("react-select"), {
  ssr: false
});

const ReviewsFilter = props => {
  //Extracted in mapStateToProps
  const availableProductPlatforms = _get(
    props,
    "availableProductPlatforms",
    []
  );
  const { handleProductPlatformsChange, selectedProductPlatforms } = props;
  return (
    <div>
      <Select
        isMulti
        isLoading={availableProductPlatforms.length === 0 ? true : false}
        loadingMessage={() => {
          return "Fetching available platforms...";
        }}
        name="product platforms"
        options={availableProductPlatforms}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={arr => {
          handleProductPlatformsChange(arr);
        }}
        value={selectedProductPlatforms}
        placeholder="Filter by review platforms"
      />
    </div>
  );
};

export default ReviewsFilter;
