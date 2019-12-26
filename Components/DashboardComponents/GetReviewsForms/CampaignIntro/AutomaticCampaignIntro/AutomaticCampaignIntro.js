import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowRight from "@material-ui/icons/ArrowRight";

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
});

function getSteps() {
  return [
    "Create campaign wizard",
    "Choose Automatic method to add customers to invite",
    "Select platform split",
    "Create your invitation email",
    "Invitation Preview"
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each review campaign that you create, in the first step you need to enter the campaign name, select your campaign language(English/Latvia.., etc), enter the sender name and select your invitation type (automatic or Automatic).`;
    case 1:
      return "Choose any one of the available automatic invitation platforms (BCC/Magento/TrustSearch API/WooCommmerce";
    case 2:
      return `Try out different review platforms, to see what brings in the most customers.
              In this step you can select the percentage of reviewers you want to send to different platforms (eg: trustpilot, google, trustedshops, facebook,.. etc) and if you want to send your reviewers to only a single platform that option is also available.`;

    case 3:
      return `Use our optimized invitation email template or customize it to fit your brand. You can modify the dotted bordered text in the template to fit your brand needs`;
    case 4:
      return `The last step is to review your invitation, and if you feel everything is good and you are ready to go, just click on the send invitations and you are done and if you feel if something went wrong you may go back and edit the campaign and then continue.`;
    default:
      return "Unknown step";
  }
}

class AutomaticCampaignIntro extends Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => {
      return { activeStep: prevState.activeStep + 1 };
    });
  };

  handleBack = () => {
    this.setState(prevState => {
      return { activeStep: prevState.activeStep - 1 };
    });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <div className="AutomaticInfoContainer">
        <style jsx>
          {`
            .header {
              text-align: left;
            }
            .subHeader {
              margin: 15px 0 15px 0;
            }
          `}
        </style>
        <div className="header">
          <h4>Automatic Invitations</h4>
        </div>
        <div className="subHeader">
          <h6>
            Invite customers via automatic integrations:
          </h6>
        </div>
        <div className="list">
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  The overview is complete - you may continue to create
                  campaigns now!
                </Typography>
                <div style={{margin:"10px 0 10px 0"}}>
                  <Button onClick={this.handleReset} className={classes.button} color="secondary">
                    Re-visit overview
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    endIcon={<ArrowRight />}
                    className={classes.button}
                    onClick={this.props.handleCampaignCreationClick}
                  >
                    Create a campaign
                  </Button>
                </div>
              </Paper>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AutomaticCampaignIntro);
