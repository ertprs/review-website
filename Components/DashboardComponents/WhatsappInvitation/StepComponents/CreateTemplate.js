import React from "react";
import FormField from "../../../Widgets/FormField/FormField";
import styles from "../styles";

const CreateTemplate = props => {
  const { createTemplate, handleChange } = props;
  return (
    <div>
      <style jsx>{styles}</style>
      <h3>Choose template language:</h3>
      <FormField
        {...createTemplate.templateLanguage}
        handleChange={e => {
          handleChange(e, "createTemplate");
        }}
        styles={{ height: "38px" }}
      />
    </div>
  );
};

export default CreateTemplate;
