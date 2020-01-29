import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelList from "./ExpansionPanelList";
import _get from "lodash/get";
import _filter from "lodash/filter";
import { isValidArray } from "../../../../../utility/commonFunctions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

function Expansion(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const result = _get(props, "result", {});
  const failed = _get(result, "failed", 0);
  const success = _get(result, "success", 0);
  const successArray = _filter(_get(result, "result", []), ["status", true]);
  const failedArray = _filter(_get(result, "result", []), ["status", false]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ padding: "25px" }}>
      <div className="row">
        <div className="col-md-6">
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            disabled={!isValidArray(successArray)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                Sent successfully :
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {success}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.root}>
                <ExpansionPanelList data={successArray || []} />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className="col-md-6">
          <ExpansionPanel
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            disabled={!isValidArray(failedArray)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>Not Sent :</Typography>
              <Typography className={classes.secondaryHeading}>
                {failed}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.root}>
                <ExpansionPanelList data={failedArray || []} />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    </div>
  );
}

export default Expansion;
