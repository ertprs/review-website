import React from "react";
import Card from "../../../MaterialComponents/Card";
import PlatformCard from "./PlatformCard";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";

function AddProductCard({
  product,
  handleURLChange,
  handleProductNameChange,
  addMorePlatform
}) {
  const platformURLs = _get(product, "platformURLs", []);
  return (
    <Card>
      <div style={{ marginBottom: "10px" }}>
        <FormField
          {..._get(product, "productName", {})}
          handleChange={e => {
            handleProductNameChange(e, _get(product, "id", ""));
          }}
        />
      </div>
      <div className="row">
        {(platformURLs || []).map(platform => {
          return (
            <div className="col-md-4">
              <PlatformCard
                productId={_get(product, "id", "")}
                platform={platform || {}}
                handleURLChange={handleURLChange}
                addMorePlatform={addMorePlatform}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
export default AddProductCard;
