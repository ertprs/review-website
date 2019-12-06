import React, { Component } from "react";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import CustomModal from "../../Widgets/CustomModal/CustomModal";
import ConfirmDialog from "./ConfirmDialog";
import Snackbar from "../../Widgets/Snackbar";
import { requestInstallation } from "../../../store/actions/dashboardActions";
import { connect } from "react-redux";
import _get from "lodash/get";

const styles = theme => ({
  paperContainer: {
    padding: "30px",
    paddingLeft: "35px"
  }
});

class NeedDeveloperSupport extends Component {
  state = {
    showModal: false,
    showSnackbar: false,
    variant: "",
    snackbarMsg: ""
  };

  sendRequestForInstallation = () => {
    const { requestInstallation, userName, userEmail, userPhone } = this.props;
    const data = {
      email: userEmail || "",
      name: userName || "",
      type: "some_random_form",
      objective: "get things done now",
      phone: userPhone || "123456789",
      websiteOwner: true
    };
    requestInstallation(data);
  };

  componentDidUpdate(prevProps, prevState) {
    const { requestInstallationSuccess } = this.props;
    if (requestInstallationSuccess !== prevProps.requestInstallationSuccess) {
      if (requestInstallationSuccess === true) {
        this.setState({
          variant: "success",
          snackbarMsg: "Installation request sent successfully!",
          showSnackbar: true,
          showModal: false
        });
      } else if (requestInstallationSuccess === false) {
        this.setState({
          variant: "error",
          snackbarMsg: "Some error occured!",
          showSnackbar: true
        });
        showModal: false;
      }
    }
  }

  render() {
    const { showModal, showSnackbar, variant, snackbarMsg } = this.state;
    const { classes, requestInstallationLoading } = this.props;
    return (
      <Paper className={classes.paperContainer}>
        <div className="nDSContainer">
          <style jsx>
            {`
              .nDSHeader {
                margin-bottom: 15px;
              }
              .nDSHeader h2 {
                font-weight: bolder;
              }
              .nDSSubheader {
                margin-bottom: 24px;
              }
              .nDSList ul {
                padding-inline-start: 20px;
                list-style-type: none;
                list-style-image: url("/static/images/check_circle.png");
              }
              .nDSList ul li {
                margin: 15px 0 15px 0px;
                font-size: 1.1rem;
              }
              .nDSLastListItem > div {
                display: flex;
                flex: 1;
              }
              // .nDSLastListItem > div > div {
              //   flex-basis: 50%;
              // }
              .nDSRequestBtnContainer {
                text-align: center;
              }
            `}
          </style>
          <div className="nDSHeader">
            <h3>Need Developer Support?</h3>
          </div>
          <div className="nDSSubheader">
            <h6>
              We have a team of developers to support any installation and
              custom developments.
            </h6>
          </div>
          <div className="nDSList">
            <ul>
              <li>Integration with your Ecommerce platform</li>
              <li>Design &amp; development of custom widgets</li>
              <li className="nDSLastListItem">
                <div>
                  <div>
                    Design of custom review templates which match your branding
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                this.setState({ showModal: true });
              }}
              variant="contained"
              color="primary"
              size="medium"
            >
              Request Installation
            </Button>
          </div>
        </div>
        <CustomModal
          showModal={showModal}
          handleModalClose={() => {
            this.setState({ showModal: false });
          }}
          modalCustomStyles={{ width: "40%" }}
        >
          <ConfirmDialog
            closeDialog={() => this.setState({ showModal: false })}
            sendRequestForInstallation={this.sendRequestForInstallation}
            isLoading={requestInstallationLoading}
          />
        </CustomModal>
        <Snackbar
          open={showSnackbar}
          variant={variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={snackbarMsg}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  const { auth, dashboardData } = state;
  const userName = _get(auth, "logIn.userProfile.name", "");
  const userEmail = _get(auth, "logIn.userProfile.email", "");
  const userPhone = _get(auth, "logIn.userProfile.phone", "");
  const requestInstallationSuccess = _get(
    dashboardData,
    "requestInstallation.success",
    undefined
  );
  const requestInstallationLoading = _get(
    dashboardData,
    "requestInstallation.isLoading",
    false
  );
  return {
    userName,
    userEmail,
    userPhone,
    requestInstallationSuccess,
    requestInstallationLoading
  };
};

export default connect(mapStateToProps, { requestInstallation })(
  withStyles(styles)(NeedDeveloperSupport)
);
