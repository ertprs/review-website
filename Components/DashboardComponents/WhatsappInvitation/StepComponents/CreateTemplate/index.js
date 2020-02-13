import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isFormValid } from "../../../../../utility/commonFunctions";
import GenerateReviewUrl from "./GenerateReviewUrl";
import TemplateLanguage from "./TemplateLanguage";
import InputFields from "./InputFields";
import MessagePreview from "./WhatsAppMsg";
import styles from "../../styles";
import _get from "lodash/get";
import BackwardIcon from "@material-ui/icons/ArrowBack";
import {
  Card,
  Checkbox,
  Button,
  Grow,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    marginTop: "25px",
    padding: "25px"
  }
});

const CreateTemplate = props => {
  const [openDialog, setDialogOpen] = useState(false);
  const {
    createTemplate,
    handleFormDataChange,
    handleTemplateLanguageChange,
    handlePrev,
    handleSubmit,
    handleCheckboxChange,
    isLoading,
    whatsAppPusherConnected,
    isSessionPresent
  } = props;
  const isLanguageSelected = _get(createTemplate, "templateLanguage.value", "");
  const saveCampaign = _get(createTemplate, "saveCampaign", false);
  const keepMeLoggedIn = _get(createTemplate, "keepMeLoggedIn", false);
  useEffect(() => {
    if (window && props.scrollToTopOfThePage) {
      props.scrollToTopOfThePage();
    }
  }, []);

  const classes = useStyles();
  return (
    <div className="container">
      <style jsx>{styles}</style>
      <div className="btnContainer">
        <Button
          variant="outlined"
          color="primary"
          onClick={handlePrev}
          startIcon={<BackwardIcon />}
          size={"small"}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => setDialogOpen(true)}
        >
          Generate Review Url
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
      <Grow in={isLanguageSelected}>
        <Card className={classes.card}>
          <div className="row">
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
          <div className="checkboxContainer">
            <Checkbox
              color="primary"
              checked={saveCampaign}
              onChange={handleCheckboxChange}
              name="saveCampaign"
            />
            I want to save this campaign
            <Checkbox
              color="primary"
              checked={keepMeLoggedIn}
              onChange={handleCheckboxChange}
              name="keepMeLoggedIn"
            />
            Keep me logged in
          </div>
          <div className="submitBtn">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size={"large"}
              disabled={
                !isFormValid(_get(createTemplate, "inputFields", {})) ||
                whatsAppPusherConnected
              }
            >
              {/* showing loader when any of two api call is in progress or we
              haven't received any broadcast from pusher */}
              {isLoading ? (
                <CircularProgress size={25} color={"#fff"} />
              ) : whatsAppPusherConnected ? (
                // isSessionPresent: if session exists in db of that user
                isSessionPresent ? (
                  "Trying to login using existing session!"
                ) : (
                  "Loading QR code"
                )
              ) : (
                "Start Sending Invitations"
              )}
            </Button>
          </div>
        </Card>
      </Grow>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    whatsAppManualInvitationInit,
    whatsAppManualInvitationCommit,
    whatsAppAutomaticInvitationInit,
    whatsAppAutomaticInvitationCommit
  } = state.dashboardData || {};

  const isLoading =
    _get(whatsAppManualInvitationInit, "isLoading", false) ||
    _get(whatsAppManualInvitationCommit, "isLoading", false) ||
    _get(whatsAppAutomaticInvitationInit, "isLoading", false) ||
    _get(whatsAppAutomaticInvitationCommit, "isLoading", false);

  const isSessionPresent =
    _get(whatsAppManualInvitationInit, "isSessionPresent", false) ||
    _get(whatsAppAutomaticInvitationInit, "isSessionPresent", false);

  return {
    isLoading,
    isSessionPresent
  };
};

export default connect(mapStateToProps)(CreateTemplate);
