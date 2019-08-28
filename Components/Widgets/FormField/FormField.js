import React from "react";
import { formFieldStyles } from "./formFieldStyles";
const FormField = ({
  element,
  errorMessage,
  handleChange,
  id,
  name,
  placeholder,
  touched,
  valid,
  validationRules,
  rows,
  cols,
  value,
  styles,
  options, 
  type
}) => {
  switch (element) {
    case "textarea":
      return (
        <div className="formFieldGroup">
          <style jsx>{formFieldStyles}</style>
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={e => handleChange(e, id)}
            name={name}
            className={
              !valid && touched ? "formField invalidField" : "formField"
            }
            rows={rows}
            cols={cols}
            style={{ ...styles }}
          ></textarea>
        </div>
      );

    case "input":
      return (
        <div className="formFieldGroup">
          <style jsx>{formFieldStyles}</style>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => handleChange(e, id)}
            name={name}
            className={
              !valid && touched ? "formField invalidField" : "formField"
            }
            style={{ ...styles }}
          />
        </div>
      );

    case "select":
      return (
        <select
          value={value}
          onChange={e => handleChange(e, id)}
          name={name}
          className={!valid && touched ? "formField invalidField" : "formField"}
          style={{ ...styles }}
        >
          {/* {renderSelectOptions(options)} */}
        </select>
      );
    default:
      return null;
  }
};

export default FormField;
