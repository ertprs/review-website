import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../../MaterialComponents/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../../Widgets/Snackbar";
import { upgradeToPremium } from "../../../../store/actions/dashboardActions";

class SubscriptionInfo extends Component {
  state = {
    showSnackbar: false,
    snackbarVariant: "success",
    snackbarMsg: ""
  };

  componentDidUpdate(prevProps, prevState) {
    const { success, errorMsg } = this.props;
    if (success !== prevProps.success) {
      if (success === true) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Request Sent Successfully!."
        });
      } else if (success === false) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: errorMsg
        });
      }
    }
  }

  render() {
    const { isLoading, upgradeToPremium } = this.props;
    const { showSnackbar, snackbarVariant, snackbarMsg } = this.state;

    return (
      <Grid item xs={12} md={12} lg={12}>
        <SimpleCard>
          <Typography>
            You don't have any active subscription. Please subscribe to use our
            features. &nbsp;&nbsp;
            {isLoading ? (
              <Button size="large" variant="contained" color="primary">
                <CircularProgress size={25} color={"fff"} />
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                onClick={upgradeToPremium}
                color="primary"
              >
                Upgrade Now
              </Button>
            )}
          </Typography>
        </SimpleCard>
        <Snackbar
          open={showSnackbar}
          variant={snackbarVariant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={snackbarMsg}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const { upgradePremium } = dashboardData || {};
  const isLoading = _get(upgradePremium, "isLoading", false);
  const success = _get(upgradePremium, "success", undefined);
  const errorMsg = _get(upgradePremium, "errorMsg", "Some Error Occurred!");
  return {
    activation_required,
    isLoading,
    success,
    errorMsg
  };
};

export default connect(mapStateToProps, { upgradeToPremium })(SubscriptionInfo);
