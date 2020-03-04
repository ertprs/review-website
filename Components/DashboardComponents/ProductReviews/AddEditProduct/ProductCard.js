import React from "react";
import Card from "../../../MaterialComponents/Card";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/CancelOutlined";
import PlatformCard from "./PlatformCard";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";

function AddProductCard({
  index,
  product,
  handleURLChange,
  handleProductNameChange,
  addMorePlatform,
  removeProduct,
  removePlatform
}) {
  const platformURLs = _get(product, "platformURLs", []);
  return (
    <Card>
      {index === 0 ? null : (
        <div style={{ textAlign: "right" }}>
          <IconButton onClick={() => removeProduct(_get(product, "id", ""))}>
            <RemoveIcon />
          </IconButton>
        </div>
      )}
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
                removePlatform={removePlatform}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
export default AddProductCard;
