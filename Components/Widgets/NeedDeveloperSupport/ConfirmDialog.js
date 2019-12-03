import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const ConfirmDialog = props => {
  const { sendRequestForInstallation, closeDialog, isLoading } = props;
  return (
    <div>
      <h3>Do you want to request installation?</h3>
      <p>Our developer will help you in installing the platform.</p>
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ marginRight: "10px" }}
          variant="contained"
          color="secondary"
          onClick={closeDialog}
        >
          No
        </Button>
        {isLoading ? (
          <Button variant="contained" color="primary">
            <CircularProgress size={25} color={"#fff"} />
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={sendRequestForInstallation}
          >
            Yes
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfirmDialog;
