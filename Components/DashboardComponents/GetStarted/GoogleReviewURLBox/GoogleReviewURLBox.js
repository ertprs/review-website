import React, { Component } from "react";
import PlacesAutoComplete from "../../../Widgets/PlacesAutoComplete/PlacesAutoComplete";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import _get from "lodash/get";
import IconButton from "@material-ui/core/IconButton";
import FormField from "../../../Widgets/FormField/FormField";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import validate from "../../../../utility/validate";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class GoogleReviewURLBox extends Component {
  state = {
    placeNameEditMode: false,
    placeName: {
      element: "input",
      type: "text",
      id: "placeName",
      value: "",
      valid: false,
      touched: false,
      validationRules: {
        required: true
      },
      placeholder: "Enter place name/identifier",
      errorMessage: " Please enter a valid place name",
      name: "placeName"
    }
  };

  handleAddressSelect = reqBody => {
    const formDataItemKey = _get(this.props, "formDataItemKey", "");
    this.props.handleAddressSelect({ ...reqBody, formDataItemKey });
  };

  handlePlaceNameChange = () => {
    const formDataItemKey = _get(this.props, "formDataItemKey", "");
    const newPlaceName = _get(this.state, "placeName.value", "");
    if (newPlaceName && formDataItemKey) {
      this.props.handleGooglePlaceNameChange(newPlaceName, formDataItemKey);
      this.togglePlaceNameEditMode();
    }
  };

  togglePlaceNameEditMode = () => {
    this.setState(prevState => {
      return { ...prevState, placeNameEditMode: !prevState.placeNameEditMode };
    });
  };

  renderSetPrimaryBtn = () => {
    const formData = _get(this.props, "formData", {});
    const formDataItemKey = _get(this.props, "formDataItemKey", "");
    const formDataItem = _get(formData, formDataItemKey, {});
    const selectedAddress = _get(formDataItem, "identity_data.address", "");
    const { handleSetAsPrimaryModalVisibilityToggle } = this.props;
    return selectedAddress ? (
      <Button
        size="small"
        variant="contained"
        color="secondary"
        endIcon={<VpnKeyOutlinedIcon />}
        onClick={() => {
          handleSetAsPrimaryModalVisibilityToggle(formDataItemKey);
        }}
      >
        Set as primary location
      </Button>
    ) : null;
  };

  render() {
    const formData = _get(this.props, "formData", {});
    const formDataItemKey = _get(this.props, "formDataItemKey", "");
    const formDataItem = _get(formData, formDataItemKey, {});
    const selectedAddress = _get(formDataItem, "identity_data.address", "");
    const isPrimary = _get(formDataItem, "primary", "");
    const selectedGoogleReviewUrl = _get(formDataItem, "value", "");
    const title = _get(formDataItem, "title", "");
    const profile_name = _get(formDataItem, "profile_name", "");
    const isTemporary = _get(formDataItem, "isTemporary", false);
    const name = _get(formDataItem, "name", "");
    const placeNameEditMode = _get(this.state, "placeNameEditMode", false);
    const placeName = _get(this.state, "placeName", {});
    return (
      <Paper>
        <style jsx>
          {`
            .getStartedBox {
              padding: 25px;
            }
            .getStartedBoxHeader {
              margin-bottom: 15px;
            }
            .getStartedBoxContainerInner {
              display: flex;
            }
            .getStartedBoxContainerInner div:first-child {
              flex-basis: 100%;
            }
            // .getStartedBoxContainerInner div:last-child {
            //   flex-basis: 75%;
            // }

            .getStartedBoxImgContainer {
              max-width: 250px;
              height: auto;
            }
            .getStartedBoxImgContainer img {
              max-width: 100%;
              height: auto;
            }
            .placeAutoCompleteContainer {
              margin-bottom: 25px;
            }
            .bold {
              font-weight: bold;
            }
            .selectedGoogleReviewUrl {
              word-break: break-all;
            }
            .getStartedBoxHeaderContainer {
              display: flex;
            }

            .getStartedBoxHeaderContainer div:first-child {
              flex-basis: 80%;
            }

            .getStartedBoxHeaderContainer div:last-child {
              flex-basis: 20%;
              text-align: right;
            }

            .changePlaceNameLink {
              font-size: 12px;
              color: blue;
              text-decoration: underline;
              display: inline-block;
              margin-left: 10px;
            }

            .changePlaceNameLink:hover {
              cursor: pointer;
            }

            .primaryTextContainer {
              color: #235d57;
              margin-top: 18px;
            }

            @media screen and (max-width: 720px) {
              .getStartedBoxImgContainer {
                display: none;
              }
              .getStartedBoxHeader h4 {
                font-size: 1.1rem;
                margin-bottom: 35px;
              }
            }
          `}
        </style>
        <div className="getStartedBox">
          <div className="getStartedBoxHeaderContainer">
            <div>
              <h6>
                {placeNameEditMode ? (
                  <FormField
                    {...placeName}
                    handleChange={e => {
                      this.setState({
                        placeName: {
                          ...placeName,
                          value: e.target.value,
                          touched: true,
                          valid: validate(
                            e.target.value,
                            placeName.validationRules
                          )
                        }
                      });
                    }}
                  />
                ) : profile_name ? (
                  profile_name
                ) : name ? (
                  name
                ) : (
                  title
                )}
                {placeNameEditMode ? (
                  <>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      disabled={!placeName.valid}
                      onClick={this.handlePlaceNameChange}
                    >
                      Save changed name
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "9px" }}
                      onClick={this.togglePlaceNameEditMode}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <span
                    className="changePlaceNameLink"
                    onClick={this.togglePlaceNameEditMode}
                  >
                    Change place name
                  </span>
                )}
              </h6>
            </div>
            {isTemporary ? (
              <div>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    this.setState({ placeNameEditMode: false });
                    this.props.handleRemoveTemporaryCard(formDataItemKey);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ) : (
              <div>
                <Tooltip title="This platform is already configured, but you are allowed to edit the platform URL and save changes">
                  <InfoIcon />
                </Tooltip>
              </div>
            )}
          </div>
          <div className="getStartedBoxContainerInner">
            <div className="getStartedBoxAutoComplete">
              <>
                {placeNameEditMode ? null : (
                  <div className="placeAutoCompleteContainer">
                    <PlacesAutoComplete
                      handleAddressSelect={this.handleAddressSelect}
                    />
                  </div>
                )}
                {selectedAddress ? (
                  <div className="row" style={{ marginBottom: "8px" }}>
                    <div className="col-md-6">
                      <div className="bold">Selected Address:</div>
                    </div>
                    <div className="col-md-6">{selectedAddress}</div>
                  </div>
                ) : null}
                {selectedGoogleReviewUrl ? (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="bold">Selected Review URL :</div>
                    </div>
                    <div className="col-md-6">
                      <div className="selectedGoogleReviewUrl">
                        <a href={selectedGoogleReviewUrl} target="_blank">
                          {selectedGoogleReviewUrl}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            </div>
          </div>
          <div>
            {isPrimary ? (
              <div className="primaryTextContainer">
                <Tooltip title="Primary location">
                  <VpnKeyOutlinedIcon color="secondary" />
                </Tooltip>{" "}
                <span style={{ display: "inline-block", marginLeft: "8px" }}>
                  You are using this location as primary
                </span>
              </div>
            ) : (
              this.renderSetPrimaryBtn(isPrimary)
            )}
          </div>
          <div style={{ marginTop: "5px" }}>
            {_get(formData[formDataItemKey], "has_review_aggregator", 0) ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={_get(
                      formData[formDataItemKey],
                      "show_in_widget",
                      0
                    )}
                    onChange={() => {
                      this.props.handleShowInWidgetCheckboxChange(
                        formDataItemKey
                      );
                    }}
                    value={_get(formData[formDataItemKey], "show_in_widget", 0)}
                  />
                }
                label="Show this profile in widgets"
              />
            ) : null}
          </div>
        </div>
      </Paper>
    );
  }
}

export default GoogleReviewURLBox;
