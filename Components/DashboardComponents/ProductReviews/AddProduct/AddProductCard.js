import React from "react";
import Card from "../../../MaterialComponents/Card";
import PlatformCard from "./PlatformCard";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";

function AddProductCard({
  formData,
  handleURLChange,
  handleProductNameChange
}) {
  const platformURLs = _get(formData, "platformURLs", {});
  return (
    <Card>
      <div style={{ marginBottom: "10px" }}>
        <FormField
          {..._get(formData, "productName", {})}
          handleChange={e => {
            handleProductNameChange(e, _get(formData, "id", ""));
          }}
        />
      </div>
      <div className="row">
        {(platformURLs || []).map(platform => {
          return (
            <div className="col-md-4">
              <PlatformCard
                productId={_get(formData, "id", "")}
                formData={platform || {}}
                handleURLChange={handleURLChange}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
export default AddProductCard;
