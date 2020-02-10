import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import _get from "lodash/get";
import axios from "axios";

import GetSchemaCodeLoading from "./GetSchemaCodeLoading";
import GetSchemaCodeSuccess from "./GetSchemaCodeSuccess";
import GetSchemaCodeFailure from "./GetSchemaCodeFailure";
import GetSchemaCodeInput from "./GetSchemaCodeInput";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class GetSchemaCodeDialog extends React.Component {
  state = {
    schemaCodeData: {
      isLoading: false,
      success: null,
      errorMsg: "",
      data: {}
    },
    dataSubmitted: false,
    formData: {
      selectedPlatform: {
        value: "",
        valid: false
      }
    }
  };
  componentDidMount() {
    this.fetchSchemaCode();
  }

  //!use actual endpoint below
  fetchSchemaCode = async () => {
    try {
      this.setState({
        schemaCodeData: { ...this.schemaCodeData, isLoading: true }
      });
      const res = await axios({
        method: "GET",
        headers: {},
        data,
        url
      });
      const success = _get(res, "data.success", false);
      const schemaCodeData = _get(res, "data.data", {});
      this.setState({
        schemaCodeData: {
          isLoading: false,
          success,
          errorMsg: "",
          data: { ...schemaCodeData }
        }
      });
    } catch (err) {
      console.log(err);
      this.setState({
        schemaCodeData: {
          isLoading: false,
          success: false,
          errorMsg: _get(err, "response.data.message", "Some error ocurred"),
          data: {}
        }
      });
    }
  };

  //!To handle Submission of platform and business type
  handleDataSubmit = () => {
    //set dataSubmitted to true on success
    this.setState({ dataSubmitted: true });
  };

  //! The switch works on the basis of isLoading and success
  //Changes to accommodate - selection of platforms and business type
  renderActiveComponent = () => {
    const { schemaCodeData, dataSubmitted } = this.state;
    const isLoading = _get(schemaCodeData, "isLoading", false);
    const success = _get(schemaCodeData, "success", false);
    switch (isLoading) {
      case true:
        return <GetSchemaCodeLoading />;
      case false:
        return !dataSubmitted ? (
          <GetSchemaCodeInput handleSubmit={this.handleDataSubmit} />
        ) : success ? (
          <GetSchemaCodeSuccess schemaCodeData={schemaCodeData} />
        ) : (
          <GetSchemaCodeFailure />
        );
      default:
        return null;
    }
  };

  render() {
    const { classes } = this.props;
    const { open, handleClose } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Get your schema code
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ margin: "50px" }}>{this.renderActiveComponent()}</div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(GetSchemaCodeDialog);
