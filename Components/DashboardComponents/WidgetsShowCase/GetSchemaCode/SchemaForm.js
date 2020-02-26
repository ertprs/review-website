import React from "react";
import { renderFormFields } from "../../../../utility/commonFunctions";

const SchemaForm = ({ schemaFormData, handleSchemaFormChange }) => {
  let order = ["name", "profileUrl", "imageUrl", "address"];
  return (
    <div className="mt_30">
      <style jsx>{`
        .mt_30 {
          margin-top: 30px;
        }
      `}</style>
      {renderFormFields(schemaFormData, handleSchemaFormChange, order)}
    </div>
  );
};

export default SchemaForm;
