import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const { showModal, handleModalClose, saveAndContinue } = props;

  return (
    <div>
      <Dialog
        onClose={handleModalClose}
        aria-labelledby="customized-dialog-title"
        open={showModal}
        disableBackdropClick={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleModalClose}>
          <div style={{margin:"20px"}}>
          Please note down the following data before continuing to gain access to your account :
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            {props.children}
          </Typography>
        </DialogContent>
        <DialogActions style={{margin:"15px 0 15px 0"}}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            endIcon={<ArrowRight />}
            onClick={saveAndContinue}
            autoFocus
          >
            Click here to continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
