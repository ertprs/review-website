import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import Slide from "@material-ui/core/Slide";
import _get from "lodash/get";
import { connect } from "react-redux";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SetAsPrimaryModal extends React.Component {
  //!Generic method can be used for all social media platforms
  getSocialMediaPlatformName = () => {
    const reviewPlatforms = _get(this.props, "reviewPlatforms", {});
    const selectedSetAsPrimaryFormDataObject = _get(
      this.props,
      "selectedSetAsPrimaryFormDataObject",
      {}
    );
    const selectedPlatformSocialMediaId = _get(
      selectedSetAsPrimaryFormDataObject,
      "social_media_app_id",
      ""
    );
    const platformName = _get(
      reviewPlatforms,
      selectedPlatformSocialMediaId,
      ""
    );
    return platformName;
  };

  //!Generic method can be used for all social media platforms
  getCurrentlyUsedPrimaryLocation = () => {
    const formData = _get(this.props, "formData", {});
    const selectedSetAsPrimaryFormDataObject = _get(
      this.props,
      "selectedSetAsPrimaryFormDataObject",
      {}
    );
    const selectedPlatformSocialMediaId = _get(
      selectedSetAsPrimaryFormDataObject,
      "social_media_app_id",
      ""
    );
    let primaryObjInUse = {};
    let primaryObjFound = false;
    for (let item in formData) {
      if (formData[item] && formData.hasOwnProperty(item)) {
        let formDataItem = formData[item];
        let social_media_app_id = _get(formDataItem, "social_media_app_id", "");
        if (social_media_app_id === selectedPlatformSocialMediaId) {
          let primary = _get(formDataItem, "primary", 0);
          if (primary === 1) {
            primaryObjFound = true;
            primaryObjInUse = { ...formData[item] };
            return primaryObjInUse;
          }
        }
      }
    }
  };

  //!Save and cancel button

  renderSaveBtn = () => {
    return (
      <>
        <div className="col-sm-2">
          <Button
            color="primary"
            size="medium"
            variant="contained"
            endIcon={<CloseIcon />}
            onClick={this.props.handleClose}
          >
            Close
          </Button>
        </div>
        <div className="col-sm-2">
          <Button
            color="primary"
            size="medium"
            variant="contained"
            endIcon={<CheckIcon />}
            onClick={() => {
              this.props.handleClose();
              this.props.handlePrimaryLocationChange(
                this.props.selectedSetAsPrimaryFormDataObject
              );
            }}
          >
            Confirm
          </Button>
        </div>
      </>
    );
  };

  //!Generic method can be used for all social media platforms, BUT currently containing the logic for google only
  renderCurrentPrimaryLocation = () => {
    const currentlyUsedLocationObj =
      this.getCurrentlyUsedPrimaryLocation() || {};
    if (
      currentlyUsedLocationObj &&
      Object.keys(currentlyUsedLocationObj).length > 0
    ) {
      let social_media_app_id = _get(
        currentlyUsedLocationObj,
        "social_media_app_id",
        ""
      );
      //logic for google
      if (social_media_app_id === 22) {
        let identityData = _get(currentlyUsedLocationObj, "identity_data", {});
        let address = _get(identityData, "address", "");
        let directReviewURL = _get(identityData, "directReviewUrl", "");
        let name = _get(currentlyUsedLocationObj, "name", "");
        return (
          <div style={{ margin: "10px 0 0 0" }}>
            <div className="container">
              <div style={{ margin: "45px 0 45px 0", textAlign: "center" }}>
                <h4>
                  You are opting to change your primary location from below :
                </h4>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <h6>Place name / identifier:</h6>
                  {name}{" "}
                  <Tooltip title="Currently set primary location">
                    <VpnKeyOutlinedIcon color="secondary" />
                  </Tooltip>
                </div>
                <div className="col-md-4">
                  <h6>Review URL</h6>
                  <a
                    href={directReviewURL}
                    target="_blank"
                    style={{ wordBreak: "break-all" }}
                  >
                    {directReviewURL}
                  </a>
                </div>
                <div className="col-md-4">
                  <h6>Address: </h6>
                  {address}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  //!Generic method can be used for all social media platforms, BUT currently containing the logic for google only
  renderNewPrimaryLocation = () => {
    const selectedSetAsPrimaryFormDataObject = _get(
      this.props,
      "selectedSetAsPrimaryFormDataObject",
      {}
    );

    const social_media_app_id = _get(
      selectedSetAsPrimaryFormDataObject,
      "social_media_app_id",
      ""
    );

    //!Logic for google
    if (social_media_app_id === 22) {
      let identityData = _get(
        selectedSetAsPrimaryFormDataObject,
        "identity_data",
        {}
      );
      let address = _get(identityData, "address", "");
      let directReviewURL = _get(identityData, "directReviewUrl", "");
      let name = _get(selectedSetAsPrimaryFormDataObject, "name", "");
      return (
        <div style={{ margin: "10px 0 0 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", margin: "35px 0 35px 0" }}>
              <h4>To new primary location :</h4>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h6>Place name / identifier:</h6>
                {name}
              </div>
              <div className="col-md-4">
                <h6>Review URL</h6>
                <a
                  href={directReviewURL}
                  target="_blank"
                  style={{ wordBreak: "break-all" }}
                >
                  {directReviewURL}
                </a>
              </div>
              <div className="col-md-4">
                <h6>Address:</h6>
                {address}
              </div>
            </div>
            <div className="row" style={{ marginTop: "35px" }}>
              {this.renderSaveBtn()}
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    const { classes, open, handleClose } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {this.getSocialMediaPlatformName()}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          {this.renderCurrentPrimaryLocation()}
          {this.renderNewPrimaryLocation()}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const dashboardData = _get(state, "dashboardData", {});
  const reviewPlatforms = _get(dashboardData, "review_platforms.data", {});

  return { reviewPlatforms };
};

export default connect(mapStateToProps)(withStyles(styles)(SetAsPrimaryModal));
