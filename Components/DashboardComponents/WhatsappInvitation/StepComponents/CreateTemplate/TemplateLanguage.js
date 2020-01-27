import React from "react";
import FormField from "../../../../Widgets/FormField/FormField";
import _get from "lodash/get";

export default function TemplateLanguage(props) {
  const { handleTemplateLanguageChange, createTemplate } = props;
  return (
    <>
      <h3>Choose template language:</h3>
      <FormField
        {..._get(createTemplate, "templateLanguage", {})}
        handleChange={handleTemplateLanguageChange}
        styles={{ height: "38px" }}
      />
    </>
  );
}
