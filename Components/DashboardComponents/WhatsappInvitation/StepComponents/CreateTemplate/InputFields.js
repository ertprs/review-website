import React from "react";
import { renderFormFields } from "../../../../../utility/commonFunctions";

const InputFields = ({ formData, handleChange }) => {
  return <>{renderFormFields(formData, handleChange)}</>;
};

export default InputFields;
