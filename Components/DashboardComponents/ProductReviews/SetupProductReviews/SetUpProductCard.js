import React from "react";
import Card from "../../../MaterialComponents/Card";
import PlatformCard from "./PlatformCard";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";

function SetUpProductCard({
  formData,
  handleURLChange,
  handleProductNameChange
}) {
  const platformURLs = _get(formData, "platformURLs", {});
  return (
    <Card>
      <FormField
        {..._get(formData, "productName", {})}
        handleChange={e => {
          handleProductNameChange(e, _get(formData, "id", ""));
        }}
      />
      <div className="row">
        {platformURLs.map(platform => {
          return (
            <div className="col-md-4">
              <PlatformCard
                id={_get(formData, "id", "")}
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
export default SetUpProductCard;
