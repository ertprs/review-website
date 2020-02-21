import React, { Component } from "react";
import _get from "lodash/get";
import _find from "lodash/find";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false
});

class AvailableProductPlatforms extends Component {
  render() {
    //Extracted in mapStateToProps
    const availableProductPlatforms = _get(
      this.props,
      "availableProductPlatforms",
      []
    );
    const {
      handleProductPlatformsChange,
      selectedProductPlatforms
    } = this.props;
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
          placeholder="Select multiple product review platforms"
        />
      </div>
    );
  }
}

export default AvailableProductPlatforms;
