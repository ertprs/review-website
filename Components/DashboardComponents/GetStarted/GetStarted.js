import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import PlacesAutoComplete from "../../../Components/Widgets/PlacesAutoComplete/PlacesAutoComplete";
import stringHelpers from "../../../utility/stringHelpers";
import Snackbar from "../../Widgets/Snackbar";
import { connect } from "react-redux";
import _get from "lodash/get";

class GetStarted extends Component {
  state = {
    alreadySelected: false,
    showSnackbar: false,
    variant: "success",
    snackbarMsg: ""
  };

  renderGetStartedHeader = () => {
    return (
      <div>
        <style jsx>{`
          .getStartedHeader {
            margin: 20px 0 25px 0;
          }
          .getStartedSubHeader {
            margin-bottom: 25px;
          }
        `}</style>
        <h3 className="getStartedHeader">
          <span style={{ textTransform: "capitalize" }}>
            {stringHelpers("getTimeGreeting")}
          </span>{" "}
          Arturs,
        </h3>
        <h6 className="getStartedSubHeader">
          This is your personal setup guide. Let’s get you up and running so you
          can get more reviews and build trust.
        </h6>
      </div>
    );
  };

  renderBusinessDetails = () => {
    return (
      <div className="businessDetailsContainer">
        <style jsx>
          {`
            .bold {
              font-weight: bold;
            }
            .businessDetailsContainer {
              margin-left: 25px;
            }
            .businessDetailsFlexItem {
              display: flex;
              margin-bottom: 10px;
            }
            .businessDetailsFlexItem div {
              flex-basis: 40%;
            }
          `}
        </style>
        <div className="businessDetailsFlexItem">
          <div className="bold">Domain :</div>
          <div>
            <a href="https://www.swiss-qube.com">https://www.swiss-qube.com</a>
          </div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Company Name :</div>
          <div>Swiss Qube</div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Address :</div>
          <div>Baarermattstrasse 6, 6300 Zug, Switzerland</div>
        </div>
      </div>
    );
  };

  renderGetStartedBox = () => {
    return (
      <Paper>
        <style jsx>
          {`
            .getStartedBox {
              padding: 25px;
            }
            .getStartedBoxHeader {
              margin-bottom: 55px;
            }
            .getStartedBoxContainerInner {
              display: flex;
            }
            .getStartedBoxContainerInner div:first-child {
              flex-basis: 25%;
            }
            .getStartedBoxContainerInner div:last-child {
              flex-basis: 75%;
            }

            .getStartedBoxImgContainer {
              max-width: 250px;
              height: auto;
            }
            .getStartedBoxImgContainer img {
              max-width: 100%;
              height: auto;
            }
          `}
        </style>
        <div className="getStartedBox">
          <div className="getStartedBoxHeader">
            <h4>
              {this.state.alreadySelected
                ? "Your business details"
                : "Please locate your Business"}
            </h4>
          </div>
          <div className="getStartedBoxContainerInner">
            <div className="getStartedBoxImgContainer">
              <img
                src={`/static/images/${
                  this.state.alreadySelected
                    ? "googleMyBusiness.jpg"
                    : "locate.png"
                }`}
              />
            </div>
            <div className="getStartedBoxAutoComplete">
              {!this.state.alreadySelected ? (
                <PlacesAutoComplete />
              ) : (
                this.renderBusinessDetails()
              )}
            </div>
          </div>
        </div>
      </Paper>
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({
        showSnackbar: true,
        variant: "success",
        snackbarMsg: "Data located successfully!"
      });
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {this.renderGetStartedHeader()}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {this.renderGetStartedBox()}
            </Grid>
          </Grid>
        </Container>
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData } = state;
  const success = _get(dashboardData, "locatePlace.success", false);
  return { success };
};

export default connect(mapStateToProps)(GetStarted);
