import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import Card from "../../../../../MaterialComponents/Card";

const ProductManagementTopBar = () => {
  return (
    <Card>
      <div style={{ textAlign: "right" }}>
        <Button color="primary" variant="contained" startIcon={<AddIcon />}>
          Add a new product
        </Button>
      </div>
    </Card>
  );
};

export default ProductManagementTopBar;
