import React from "react";
import { renderFormFields } from "../../../../../utility/commonFunctions";

const InputFields = ({ formData, handleChange }) => {
  let order = ["salutation", "message", "reviewUrl"];
  return <>{renderFormFields(formData, handleChange, order)}</>;
};

export default InputFields;
