import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../../MaterialComponents/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../../Widgets/Snackbar";
import { resendActivationLink } from "../../../../store/actions/authActions";

class ActivationInfo extends Component {
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
          snackbarMsg: "Mail sent successfully, Please verify your email."
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
    const { isLoading, activation_required, resendActivationLink } = this.props;
    const { showSnackbar, snackbarVariant, snackbarMsg } = this.state;

    return (
      <Grid item xs={12} md={12} lg={12}>
        <SimpleCard>
          <Typography>
            Your account is not activated.&nbsp;
            {activation_required
              ? "Please activate your account to use our features."
              : null}
            &nbsp;&nbsp;
            {isLoading ? (
              <Button size="large" variant="contained" color="primary">
                <CircularProgress size={25} color={"fff"} />
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={resendActivationLink}
                color="primary"
                size="large"
              >
                Activate now
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
  const { auth } = state;
  const activation_required = _get(
    auth,
    "logIn.userProfile.activation_required",
    false
  );
  const isLoading = _get(auth, "resendActivation.isLoading", false);
  const success = _get(auth, "resendActivation.success", undefined);
  const errorMsg = _get(
    auth,
    "resendActivation.errorMsg",
    "Some Error Occurred!"
  );

  return {
    activation_required,
    isLoading,
    success,
    errorMsg
  };
};

export default connect(mapStateToProps, { resendActivationLink })(
  ActivationInfo
);
