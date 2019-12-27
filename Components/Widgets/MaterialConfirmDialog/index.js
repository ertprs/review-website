import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  handleClose,
  dialogTitle,
  dialogBodyText,
  cancelText,
  okText,
  handleSubmit,
  isLoading
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        disableBackdropClick={true}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {dialogTitle ? dialogTitle : "Are you sure you want to continue?"}
        </DialogTitle>
        {dialogBodyText ? (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {dialogBodyText}
            </DialogContentText>
          </DialogContent>
        ) : null}

        <DialogActions>
          {isLoading ? (
            <div style={{ marginRight: "10px" }}>
              <CircularProgress size={25} />
            </div>
          ) : (
            <>
              <Button onClick={handleClose} color="primary">
                {cancelText ? cancelText : "Cancel"}
              </Button>
              <Button onClick={handleSubmit} color="primary">
                {okText ? okText : "OK"}
              </Button>{" "}
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
