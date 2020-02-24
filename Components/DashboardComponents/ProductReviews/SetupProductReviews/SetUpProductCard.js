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

      {platformURLs.map(platform => {
        return (
          <PlatformCard
            id={_get(formData, "id", "")}
            formData={platform || {}}
            handleURLChange={handleURLChange}
          />
        );
      })}
    </Card>
  );
}
export default SetUpProductCard;
