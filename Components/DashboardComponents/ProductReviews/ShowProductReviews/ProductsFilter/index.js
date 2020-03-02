import React, { useEffect } from "react";
import _get from "lodash/get";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { isValidArray } from "../../../../../utility/commonFunctions";

const Select = dynamic(() => import("react-select"), {
  ssr: false
});

const generateOptionsFromProducts = products => {
  let options = [];
  if (isValidArray(products)) {
    for (let product of products) {
      let productId = _get(product, "_id", "");
      let productName = _get(product, "name", "");
      if (productId && productName) {
        options = [...options, { value: productId, label: productName }];
      }
    }
    return options;
  }
};

const ProductsFilter = props => {
  //Extracted in mapStateToProps
  const products = _get(props, "products", []);
  const { handleSelectedProductChange, selectedProduct } = props;

  useEffect(() => {
    handleSelectedProductChange(
      (generateOptionsFromProducts(products) || [])[0] || []
    );
  }, [products]);

  return (
    <div>
      <div
        style={{ textAlign: "left", margin: "0 0 7px 0", fontWeight: "bold" }}
      >
        Select a product :
      </div>
      <Select
        isLoading={products.length === 0 ? true : false}
        loadingMessage={() => {
          return "Fetching available products...";
        }}
        name="products"
        options={generateOptionsFromProducts(products)}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={obj => {
          handleSelectedProductChange(obj);
        }}
        value={selectedProduct}
        placeholder="Select a product to see reviews"
      />
    </div>
  );
};

const mapStateToProps = state => {
  const products = _get(state, "dashboardData.products.data", []);
  return { products };
};

export default connect(mapStateToProps)(ProductsFilter);
