import React, { Component } from "react";
import styles from "../userProfileStyles";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/CloseRounded";
import FormField from "../../../Widgets/FormField/FormField";
import Card from "../../../MaterialComponents/Card";
import createReqBody from "../../../../utility/createReqBody";
import {
  updateUserDetails,
  emptyUserDetails
} from "../../../../store/actions/dashboardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import _get from "lodash/get";

class editUser extends Component {
  handleSaveClick = () => {
    const { userDetails, updateUserDetails } = this.props;
    const reqBody = createReqBody(userDetails);
    updateUserDetails(reqBody);
  };

  componentDidUpdate(prevProps, prevState) {
    const { success, closeEditMode, emptyUserDetails } = this.props;
    if (this.props !== prevProps) {
      if (success === true || success === false) {
        closeEditMode();
        emptyUserDetails();
      }
    }
  }

  renderFormFields = () => {
    const { userDetails, handleChange } = this.props;
    let formFields = [];
    for (let formField in userDetails) {
      formFields = [
        ...formFields,
        <div className="col-md-6">
          <FormField
            {...userDetails[formField]}
            handleChange={handleChange}
            id={formField}
            styles={{
              borderWidth: "0px 0px 1px 0px",
              borderStyle: "solid",
              borderColor: "rgb(206, 212, 218)",
              height: "38px"
            }}
          />
        </div>
      ];
    }
    return [...formFields];
  };

  render() {
    const { closeEditMode, isLoading } = this.props;
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <Card>
          <div className="cardHeader">
            <h3 className="heading">Edit User Details</h3>
            <div>
              <Tooltip title={"Cancel"} placement="top">
                <CancelIcon
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={closeEditMode}
                />
              </Tooltip>
              <Tooltip title={"Save"} placement="top">
                {isLoading ? (
                  <CircularProgress color="primary" size={20} />
                ) : (
                  <SaveIcon
                    style={{ cursor: "pointer" }}
                    onClick={this.handleSaveClick}
                  />
                )}
              </Tooltip>
            </div>
          </div>
          <>
            <div className="row">{this.renderFormFields()}</div>
          </>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const userDetails = _get(state, "dashboardData.userDetails", {});
  const isLoading = _get(userDetails, "isLoading", false);
  const success = _get(userDetails, "success", "undefined");
  const errorMsg = _get(userDetails, "errorMsg", "");
  return { isLoading, success, errorMsg };
};

export default connect(mapStateToProps, {
  updateUserDetails,
  emptyUserDetails
})(editUser);
