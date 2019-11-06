import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "rgb(245, 249, 249)"
  },
  dialogContainer: {
    overflowY: "hidden"
  }
}));

const UnicornLoader = () => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <style jsx>{`
        .title {
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          display: block;
          margin-bottom: 12px;
        }

        .subTitle {
          text-align: center;
          font-size: 22px;
        }

        @media screen and (max-width: 767px) {
          .title {
            font-size: 30px;
            margin-bottom: 12px;
          }
          .subTitle {
            text-align: center;
            font-size: 18px;
          }
        }

        @media screen and (max-width: 467px) {
          .title {
            font-size: 28px;
            margin-bottom: 8px;
          }
          .subTitle {
            text-align: center;
            font-size: 16px;
          }
        }
      `}</style>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        disablePortal={true}
        className={classes.dialogContainer}
      >
        <DialogContent className={classes.root}>
          <div>
            <div className="textContainer">
              <span className="title">Great done! </span>
              <span className="subTitle">
                You entered a new domain for our database. Please wait a moment
                while we gather data around the web.
              </span>
            </div>
            <div style={{ maxWidth: "450px", maxHeight: "450px" }}>
              <img
                src="/static/images/unicorn_running.gif"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnicornLoader;
