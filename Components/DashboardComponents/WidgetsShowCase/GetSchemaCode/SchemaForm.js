import React from "react";
import { renderFormFields } from "../../../../utility/commonFunctions";

const SchemaForm = ({ schemaFormData, handleSchemaFormChange }) => {
  return (
    <div className="mt_30">
      <style jsx>{`
        .mt_30 {
          margin-top: 30px;
        }
      `}</style>
      {renderFormFields(schemaFormData, handleSchemaFormChange)}
    </div>
  );
};

export default SchemaForm;
