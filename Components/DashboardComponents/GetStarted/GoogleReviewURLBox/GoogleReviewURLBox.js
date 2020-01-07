import React, { Component } from "react";
import PlacesAutoComplete from "../../../Widgets/PlacesAutoComplete/PlacesAutoComplete";
import Paper from "@material-ui/core/Paper";
import _get from "lodash/get";

class GoogleReviewURLBox extends Component {
  handleAddressSelect = reqBody => {
    const formDataItemKey = _get(this.props, "formDataItemKey", "");
    this.props.handleAddressSelect({ ...reqBody, formDataItemKey });
  };

  render() {
    const formData = _get(this.props, "formData", {});
    const formDataItemKey = _get(this.props, "formDataItemKey", "");
    const formDataItem = _get(formData, formDataItemKey, {});
    const selectedAddress = _get(formDataItem, "extraPayload.address", "");
    const selectedGoogleReviewUrl = _get(formDataItem, "value", "");
    const title = _get(formDataItem, "title", "");
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
          <div className="getStartedBoxHeader">
            <h6>{title}</h6>
          </div>
          <div className="getStartedBoxContainerInner">
            <div className="getStartedBoxAutoComplete">
              <>
                <div className="placeAutoCompleteContainer">
                  <PlacesAutoComplete
                    handleAddressSelect={this.handleAddressSelect}
                  />
                </div>
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
                {/* {this.renderSelectedAddress()}
                {this.renderDirectReviewUrl()} */}
                {/* {this.renderContinueBtn()} */}
              </>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default GoogleReviewURLBox;
