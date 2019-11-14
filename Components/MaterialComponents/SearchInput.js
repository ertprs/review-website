import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxShadow:"0px 2px 4px #b2b2b2",
    borderRadius:"50px"
  },
  input: {
    marginLeft: theme.spacing(5),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={props.value}
        onChange={(e)=> props.onchange(e)}
        placeholder="domain.com"
        onKeyDown={props.onkeyDown}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={props.onsubmit}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
