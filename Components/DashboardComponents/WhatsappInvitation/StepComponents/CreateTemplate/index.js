import React, { useState } from "react";
import GenerateReviewUrl from "./GenerateReviewUrl";
import InputFields from "./InputFields";
import MessagePreview from "./WhatsAppMsg";
import FormField from "../../../../Widgets/FormField/FormField";
import styles from "../../styles";
import Button from "@material-ui/core/Button";
import _get from "lodash/get";

const CreateTemplate = props => {
  const [openDialog, setDialogOpen] = useState(false);
  const {
    createTemplate,
    handleFormDataChange,
    handleTemplateLanguageChange
  } = props;
  return (
    <div className="container">
      <style jsx>{styles}</style>
      <div className="alignRight">
        <Button
          variant="text"
          color="primary"
          size="medium"
          onClick={() => setDialogOpen(true)}
        >
          Generate Smart Url
        </Button>
      </div>
      <h3>Choose template language:</h3>
      <FormField
        {..._get(createTemplate, "templateLanguage", {})}
        handleChange={handleTemplateLanguageChange}
        styles={{ height: "38px" }}
      />
      <GenerateReviewUrl
        open={openDialog}
        handleClose={() => setDialogOpen(false)}
      />
      <div className="row">
        <div className="col-md-6">
          <InputFields
            formData={_get(createTemplate, "inputFields", {})}
            handleChange={handleFormDataChange}
          />
        </div>
        <div className="col-md-6">
          <MessagePreview formData={_get(createTemplate, "inputFields", {})} />
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
