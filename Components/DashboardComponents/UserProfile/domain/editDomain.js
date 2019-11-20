import React, { Component } from "react";
import styles from "../userProfileStyles";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/CloseRounded";
import FormField from "../../../Widgets/FormField/FormField";
import Card from "../../../MaterialComponents/Card";
import {
  updateDomainDetails,
  emptyDomainDetails
} from "../../../../store/actions/dashboardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import _get from "lodash/get";

class editDomain extends Component {
  handleSaveClick = () => {
    const { domainDetails, updateDomainDetails } = this.props;
    const reqBody = {
      fullName: _get(domainDetails, "domain.value", "")
    };
    updateDomainDetails(reqBody);
  };

  componentDidUpdate(prevProps, prevState) {
    const { success, closeEditMode, emptyDomainDetails } = this.props;
    if (this.props !== prevProps) {
      if (success === true || success === false) {
        closeEditMode();
        emptyDomainDetails();
      }
    }
  }
  render() {
    const {
      closeEditMode,
      isLoading,
      domainDetails,
      handleChange
    } = this.props;
    console.log(isLoading, "isLoading");
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <Card>
          <div className="cardHeader">
            <h3 className="heading">Edit Domain Details</h3>
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
            <div className="row">
              <div className="col-md-6">
                <FormField
                  {...domainDetails.domain}
                  handleChange={handleChange}
                  id="domain"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)",
                    height: "38px"
                  }}
                />
              </div>
            </div>
          </>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const domainDetails = _get(state, "dashboardData.domainDetails", {});
  const isLoading = _get(domainDetails, "isLoading", false);
  const success = _get(domainDetails, "success", "undefined");
  const errorMsg = _get(domainDetails, "errorMsg", "");
  return { isLoading, success, errorMsg };
};

export default connect(mapStateToProps, {
  updateDomainDetails,
  emptyDomainDetails
})(editDomain);
