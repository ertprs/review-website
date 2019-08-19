import React from "react";
import {formFieldStyles} from './formFieldStyles';
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
  value
}) => {
  
    switch(element){
        case "textarea": return(
            <div className="formFieldGroup">
            <style jsx>
                {formFieldStyles}
            </style>
            <textarea placeholder={placeholder} value={value} onChange={(e)=>handleChange(e,id)} name={name} className={!valid && touched ? "formField invalidField": "formField"} rows={rows} cols={cols}></textarea>
            </div>
        )
        default : return null;
    }


};

export default FormField;
