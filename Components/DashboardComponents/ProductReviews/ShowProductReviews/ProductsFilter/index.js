import React from "react";
import _get from "lodash/get";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false
});

const ProductsFilter = props => {
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
          return "Fetching available products...";
        }}
        name="products"
        options={availableProductPlatforms}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={arr => {
          handleProductPlatformsChange(arr);
        }}
        value={selectedProductPlatforms}
        placeholder="Filter by products"
      />
    </div>
  );
};

export default ProductsFilter;
