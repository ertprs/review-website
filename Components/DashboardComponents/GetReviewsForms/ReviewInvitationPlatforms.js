import React, { Component } from "react";
import _get from "lodash/get";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import _omit from "lodash/omit";

class ReviewInvitationPlatforms extends Component {
  state = {
    platforms: {
      0: {
        name: "Google",
        selected: false,
        value: "",
        imageLogo: "googleIcon.png",
        hasError: false
      },
      1: {
        name: "Facebook",
        selected: false,
        value: "",
        imageLogo: "facebookIcon.png",
        hasError: false
      },
      18: {
        name: "Trustpilot",
        selected: false,
        value: "",
        imageLogo: "trustpilotIcon.png",
        hasError: false
      },
      19: {
        name: "TrustedShops",
        selected: false,
        value: "",
        imageLogo: "trustedShopLogo.jpg",
        hasError: false
      }
    },
    selectedPlatforms: {},
    showErrorMessage: false
  };

  handlePlatformCardClicked = cardId => {
    const { platforms, selectedPlatforms } = this.state;
    if (!platforms[cardId].selected) {
      this.setState({
        platforms: {
          ...platforms,
          [cardId]: {
            ...platforms[cardId],
            selected: !platforms[cardId].selected
          }
        },
        selectedPlatforms: {
          ...selectedPlatforms,
          [cardId]: { ...platforms[cardId] }
        }
      });
    } else {
      this.setState({
        platforms: {
          ...platforms,
          [cardId]: {
            ...platforms[cardId],
            selected: !platforms[cardId].selected
          }
        },
        selectedPlatforms: _omit(selectedPlatforms, [cardId])
      });
    }
  };

  areValidEntries = () => {
    let { selectedPlatforms } = this.state;
    let selectedPlatformsCopy = selectedPlatforms;
    let valid = true;
    let sum = 0;
    if (selectedPlatforms && Object.keys(selectedPlatforms).length > 0) {
      for (let item in selectedPlatforms) {
        valid =
          valid &&
          selectedPlatforms[item].value !== "" &&
          selectedPlatforms[item].value > 0 &&
          selectedPlatforms[item].value <= 100;
        if (!valid) {
          selectedPlatformsCopy = {...selectedPlatformsCopy, [item]:{...selectedPlatformsCopy[item], hasError:true}}
        }
        if (valid) {
          selectedPlatformsCopy = {...selectedPlatformsCopy, [item]:{...selectedPlatformsCopy[item], hasError:false}}
        }
        if (selectedPlatforms[item].value !== "") {
          sum = sum + selectedPlatforms[item].value;
        }
      }
      this.setState({selectedPlatforms: {...selectedPlatformsCopy}})
      return valid && sum >= 0 && sum <= 100;
    } else {
      return false;
    }
  };

  handleContinueClick = () => {
    if (this.areValidEntries()) {
      //hide error message and continue
    } else {
    }
  };

  handleInputChange = (e, id) => {
    const { platforms, selectedPlatforms } = this.state;
    if (Number(e.target.value)) {
      this.setState({
        platforms: {
          ...platforms,
          [id]: { ...platforms[id], value: Number(e.target.value) }
        },
        selectedPlatforms: {
          ...selectedPlatforms,
          [id]: { ...selectedPlatforms[id], value: Number(e.target.value) }
        }
      });
    } else {
      this.setState({
        platforms: {
          ...platforms,
          [id]: { ...platforms[id], value: "" }
        },
        selectedPlatforms: {
          ...selectedPlatforms,
          [id]: { ...selectedPlatforms[id], value: "" }
        }
      });
    }
  };

  renderReviewInvitationPlatformCard = () => {
    let output = [];
    const { platforms } = this.state;
    for (let item in platforms) {
      output = [
        ...output,
        <div className="col-md-6" style={{ marginBottom: "30px" }}>
          <div
            className={
              platforms[item].selected
                ? "reviewInvitationCardContainer selected"
                : "reviewInvitationCardContainer"
            }
          >
            <style jsx>
              {`
                .selected {
                }
                .reviewInvitationCardContainer {
                  box-shadow: 0px 2px 4px #d8d8d8;
                  padding: 15px;
                  transition: all 0.4s;
                }
                .reviewInvitationCardImgContainer {
                  max-width: 50px;
                  max-height: 50px;
                  margin: 0px auto 8px auto;
                }
                .reviewInvitationCardImgContainer img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 50%;
                }
                .imageLabel {
                  text-align: center;
                  margin: 15px 0 10px 0;
                  font-weight: bold;
                  font-size: 20px;
                }
                .reviewInvitationCardText {
                  text-align: center;
                  margin-top: 15px;
                }
                .reviewInvitationCardInput {
                  text-align: center;
                  width: 90%;
                  margin: 15px auto 20px auto;
                }
              `}
            </style>
            <Checkbox
              checked={platforms[item].selected}
              onChange={() => {
                this.handlePlatformCardClicked(item);
              }}
              value={platforms[item].name}
            />
            <div className="reviewInvitationCardImgContainer">
              <img src={`/static/images/${platforms[item].imageLogo}`} />
            </div>
            <div className="imageLabel">{platforms[item].name}</div>
            {platforms[item].selected ? (
              <div className="reviewInvitationCardContentContainer">
                <div className="reviewInvitationCardInput">
                  <Input
                    label="Percentage of users to be sent"
                    type="number"
                    fullWidth={true}
                    error={this.state.selectedPlatforms[item].hasError}
                    onChange={e => {
                      this.handleInputChange(e, item);
                    }}
                    value={platforms[item].value}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Percentage of users to be sent to {platforms[item].name} to
                    leave review
                  </FormHelperText>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ];
    }
    return output;
  };
  render() {
    const { showErrorMessage } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row" style={{ marginBottom: "25px" }}>
            <div className="col-md-12">
              <h5>
                Please select the platforms, where you would like to send your
                customers to leave reviews :
              </h5>
            </div>
          </div>
          <div className="row">{this.renderReviewInvitationPlatformCard()}</div>
          <div className="row">
            <div className="col-md-12">
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowRight />}
                  onClick={this.handleContinueClick}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewInvitationPlatforms;
