import React, { useState } from "react";
import GenerateReviewUrl from "./GenerateReviewUrl";
import FormField from "../../../../Widgets/FormField/FormField";
import styles from "../../styles";
import Button from "@material-ui/core/Button";

const CreateTemplate = props => {
  const [openDialog, setDialogOpen] = useState(false);
  const { createTemplate, handleChange } = props;
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
        {...createTemplate.templateLanguage}
        handleChange={e => {
          handleChange(e, "createTemplate");
        }}
        styles={{ height: "38px" }}
      />
      <GenerateReviewUrl
        open={openDialog}
        handleClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default CreateTemplate;
