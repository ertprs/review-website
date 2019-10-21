import React, { Component } from "react";
import { Button } from "@material-ui/core";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FormField from "../../Widgets/FormField/FormField";

class CreateCampaign extends Component {
  render() {
    const { formData } = this.props;
    let valid = true;
    for (let item in formData) {
      valid = valid && formData[item].valid;
    }
    return (
      <>
        <div className="container">
          <style jsx>{``}</style>
          <div className="row">
            <div className="col-md-7">
              <FormField
                {...formData.campaignName}
                handleChange={e => {
                  this.props.handleChange(e, "campaignName", "createCampaign");
                }}
                id="campaignName"
                rows="5"
                col="5"
              />
              <FormField
                {...formData.campaignLanguage}
                handleChange={e => {
                  this.props.handleChange(
                    e,
                    "campaignLanguage",
                    "createCampaign"
                  );
                }}
                id="campaignLanguage"
                rows="5"
                col="5"
                styles={{ height: "38px" }}
              />
              <FormField
                {...formData.senderName}
                handleChange={e => {
                  this.props.handleChange(e, "senderName", "createCampaign");
                }}
                id="senderName"
                rows="5"
                col="5"
              />
              <FormField
                {...formData.senderEmail}
                handleChange={e => {
                  this.props.handleChange(e, "senderEmail", "createCampaign");
                }}
                id="senderEmail"
                rows="5"
                col="5"
              />
            </div>
            <div className="col-md-2">
              <Button
                variant="contained"
                color="primary"
                size="small"
                endIcon={<ArrowRight />}
                onClick={this.props.handleNext}
                disabled={!valid}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateCampaign;
