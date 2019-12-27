import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Done = ({ changeStepToRender, handleInviteMoreClick }) => {
  const classes = useStyles();
  return (
    <>
      <style jsx>
        {`
          .mainHeading {
            font-weight: 100;
            font-size: 30px;
            margin-bottom: 20px;
          }
          .mainText {
            font-size: 18px;
            margin-bottom: 30px;
          }
          @media screen and (max-width: 647px) {
            .inviteBtn {
              margin-top: 10px;
              display: block;
            }
          }
        `}
      </style>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-2">
            <h1 className="mainHeading">
              The invitation sending process has begun!
            </h1>
            <p className="mainText">
              Follow the progress of your invitations in Invitation History.
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => changeStepToRender(5)}
              className={classes.button}
            >
              Go to Invitation History
            </Button>
            <span className="inviteBtn">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleInviteMoreClick}
                className={classes.button}
              >
                Invite more customers
              </Button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Done;
