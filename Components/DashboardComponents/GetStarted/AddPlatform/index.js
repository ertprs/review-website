import React, { Component } from "react";
import FormField from "../../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import validate from "../../../../utility/validate";
import { connect } from "react-redux";
import { addReviewPlatform } from "../../../../store/actions/dashboardActions";
import createReqBody from "../../../../utility/createReqBody";
import Snackbar from "../../../Widgets/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import _get from "lodash/get";

class AddPlatform extends Component {
  state = {
    showSnackbar: false,
    variant: "",
    snackbarMsg: "",
    formData: {
      platform_name: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        labelText: "Platform name",
        errorMessage: "Enter platform name",
        placeholder: "Enter platform name",
        validationRules: {
          required: true,
          minLength: 3
        },
        id: "platform_name"
      },
      url: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        labelText: "Platform URL",
        errorMessage: "Enter platform URL",
        placeholder: "Enter platform URL",
        validationRules: {
          required: true,
          isDomain: true
        },
        id: "url"
      }
    }
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const addReviewPlatformData = _get(this.props, "addReviewPlatformData", {});
  //   const success = _get(addReviewPlatformData, "success", undefined);
  //   const loading = _get(addReviewPlatformData, "isLoading", false);
  //   const errorMsg = _get(addReviewPlatformData, "errorMsg", "");
  //   console.log(loading, prevProps.loading);
  //   if (loading !== prevProps.loading && success !== prevProps.success) {
  //     console.log("ander aaaya");
  //     // if (success === true && loading === false) {
  //     //   this.setState({
  //     //     showSnackbar: true,
  //     //     variant: "success",
  //     //     snackbarMsg: "Platform added successfully!"
  //     //   });
  //     // } else if (success === false && loading === false) {
  //     //   this.setState({
  //     //     showSnackbar: true,
  //     //     variant: "error",
  //     //     snackbarMsg: errorMsg
  //     //   });
  //     // }
  //   }
  // }

  handleFormDataChange = (e, id) => {
    const { formData } = this.state;
    const { value } = e.target;
    this.setState({
      formData: {
        ...formData,
        [id]: {
          ...formData[id],
          value: value,
          touched: true,
          valid: validate(value, formData[id].validationRules)
        }
      }
    });
  };

  renderFormFields = () => {
    const { formData } = this.state;
    let output = [];
    for (let item in formData) {
      output = [
        ...output,
        <div>
          <style jsx>
            {`
              .label {
                font-weight: bold;
                margin-bottom: 5px;
                font-size: 15px;
              }
            `}
          </style>
          <div className="form-group">
            <div className="label">
              <label>{formData[item].labelText}</label>
            </div>
            <FormField
              {...formData[item]}
              handleChange={(e, id) => {
                this.handleFormDataChange(e, id);
              }}
              styles={{
                height: "38px"
              }}
            />
          </div>
        </div>
      ];
    }
    return output;
  };

  handlePlatformAddition = () => {
    const { formData } = this.state;
    const reqBody = createReqBody(formData);
    this.props.addReviewPlatform(reqBody);
  };

  render() {
    const { showSnackbar, variant, snackbarMsg } = this.state;
    const loading = _get(this.props.addReviewPlatformData, "isLoading", false);
    return (
      <div>
        {this.renderFormFields()}
        {loading ? (
          <Button color="primary" variant="contained">
            <CircularProgress />
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            endIcon={<Add />}
            onClick={this.handlePlatformAddition}
          >
            Add
          </Button>
        )}
        {/* <Snackbar
          open={showSnackbar}
          variant={variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={snackbarMsg}
        /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const addReviewPlatformData = _get(
    state,
    "dashboardData.addReviewPlatformData",
    {}
  );
  return { addReviewPlatformData };
};
export default connect(mapStateToProps, { addReviewPlatform })(AddPlatform);
