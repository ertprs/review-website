import React from "react";
import TopBar from "./TopBar";
import ProductTable from "./ProductsTable";

export default function ProductList(props) {
  return (
    <>
      <TopBar {...props} />
      <ProductTable {...props} />
    </>
  );
}
