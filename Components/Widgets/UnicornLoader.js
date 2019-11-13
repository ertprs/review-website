import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
const ReactCountdownClock = dynamic(() => import("react-countdown-clock"), {
  ssr: false
});

const useStyles = makeStyles(theme => ({
  dialogContent: {
    backgroundColor: "rgb(245, 249, 249)"
  },
  root: {
    background: "rgba(0, 0, 0, 0.6)",
    boxShadow: "none"
  },
  paper: {
    background: "rgba(0, 0, 0, 0.6)",
    boxShadow: "none"
  }
}));

const UnicornLoader = () => {
  const [open, setOpen] = React.useState(true);
  const [clockVisible, setClockVisible] = React.useState(true);
  const theme = useTheme();
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

        .timer {
          float: right;
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

        @media screen and (max-width: 320px) {
          .title {
            text-align: left;
            font-size: 22px;
            margin-bottom: 8px;
          }
          .subTitle {
            text-align: center;
            font-size: 12px;
          }
        }
      `}</style>
      <Dialog
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }}
        PaperProps={{
          classes: {
            root: classes.paper
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        disablePortal={true}
      >
        <DialogContent className={classes.dialogContent}>
          <div>
            {clockVisible ? (
              <div className="timer">
                <ReactCountdownClock
                  weight={5}
                  seconds={60}
                  color="#21bc61"
                  alpha={0.7}
                  size={50}
                  onComplete={() => {
                    setClockVisible(false);
                  }}
                />
              </div>
            ) : null}
            <div>
              <span className="title">Well done! </span>
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
