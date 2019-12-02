import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 10,
    borderRadius: 4
  },
  rail: {
    height: 10,
    borderRadius: 4
  }
})(Slider);

class ReviewInvitationPlatforms extends Component {
  render() {
    return (
      <div className="container">
        <style jsx>{`
          .sliderContainer {
            display: flex;
            flex-basis: 100%;
            align-items: center;
          }
        `}</style>
        <div className="row" style={{ marginTop: "50px" }}>
          <div className="col-md-3">
            <TextField
              id="standard-read-only-input"
              label="Review platform"
              defaultValue="Google"
              margin="normal"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div className="col-md-6 sliderContainer">
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={20}
            />
          </div>
          <div className="col-md-3">
            <TextField
              id="standard-read-only-input"
              label="Split"
              defaultValue="30"
              margin="normal"
              variant="outlined"
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewInvitationPlatforms;
