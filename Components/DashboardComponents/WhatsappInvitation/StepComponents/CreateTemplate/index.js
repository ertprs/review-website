import React, { useState } from "react";
import GenerateReviewUrl from "./GenerateReviewUrl";
import TemplateLanguage from "./TemplateLanguage";
import InputFields from "./InputFields";
import MessagePreview from "./WhatsAppMsg";
import styles from "../../styles";
import Button from "@material-ui/core/Button";
import ForwardIcon from "@material-ui/icons/ArrowRightAlt";
import BackwardIcon from "@material-ui/icons/ArrowBack";
import _get from "lodash/get";

const CreateTemplate = props => {
  const [openDialog, setDialogOpen] = useState(false);
  const {
    createTemplate,
    handleFormDataChange,
    handleTemplateLanguageChange,
    handlePrev,
    handleSubmit
  } = props;
  const isLanguageSelected = _get(createTemplate, "templateLanguage.value", "");

  const areValidInputFields = ()=>{
    let valid = true;
    const formData=_get(createTemplate, "inputFields", {});
    for(let item in formData){
      let formDataObject = formData[item] || {};
      valid = valid && _get(formDataObject, "valid", false);
    }
    return valid
  }
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
      <TemplateLanguage
        handleTemplateLanguageChange={handleTemplateLanguageChange}
        createTemplate={createTemplate || {}}
      />
      <GenerateReviewUrl
        open={openDialog}
        handleClose={() => setDialogOpen(false)}
      />
      {isLanguageSelected ? (
        <>
          <div className="row templateContainer">
            <div className="col-md-6">
              <InputFields
                formData={_get(createTemplate, "inputFields", {})}
                handleChange={handleFormDataChange}
              />
              <span
                onClick={() => setDialogOpen(true)}
                className="generateURLSpan"
              >
                If you don't have a review url, click here to generate
              </span>
            </div>
            <div className="col-md-6">
              <MessagePreview
                formData={_get(createTemplate, "inputFields", {})}
              />
            </div>
          </div>
          <div className="submitBtn">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size={"large"}
              disabled={!areValidInputFields()}
            >
              Submit
            </Button>
          </div>
        </>
      ) : null}
      <div style={{ marginTop: "50px", textAlign: "left" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.handlePrev}
          size={"small"}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default CreateTemplate;
