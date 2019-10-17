import React, { Component } from "react";
import FormField from "../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import _isEmpty from "lodash/isEmpty";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

export default class AddInvitesForm extends Component {
  renderButtons = valid => {
    return (
      <div className="col-md-12">
        <style jsx>
          {`
            .btnContainer {
              display: flex;
              justify-content: flex-end;
            }
            .addBtn {
              flex-basis: 10%;
            }
            @media screen and (max-width: 1140px) {
              .addBtn {
                flex-basis: 15%;
              }
            }
            @media screen and (max-width: 790px) {
              .addBtn {
                flex-basis: 20%;
              }
            }
            @media screen and (max-width: 675px) {
              .addBtn {
                flex-basis: 25%;
              }
            }
            @media screen and (max-width: 525px) {
              .addBtn {
                flex-basis: 30%;
              }
            }
            @media screen and (max-width: 470px) {
              .addBtn {
                flex-basis: 35%;
              }
            }
            @media screen and (max-width: 415px) {
              .addBtn {
                flex-basis: 50%;
              }
            }
            @media screen and (max-width: 369px) {
              .btnContainer {
                flex-direction: column;
              }
              .addBtn {
                margin-bottom: 15px;
              }
            }
          `}
        </style>
        <div className="btnContainer">
          <div className="addBtn">
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={this.handleAddBtnClick}
              disabled={!valid}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  };

  handleAddBtnClick = () => {
    let dataToSubmit = {};
    const { formData } = this.props;
    let valid = true;
    for (let item in formData) {
      valid = valid && formData[item].valid;
      dataToSubmit = { ...dataToSubmit, [item]: formData[item].value };
    }
    if (valid) {
      this.props.onAddClick({ ...dataToSubmit });
    }
  };

  renderFormFields = valid => {
    const { formData, tableData } = this.props;
    let output = [];
    for (let item in formData) {
      output = [
        ...output,
        <div className="col-md-4">
          <h6>
            {formData[item].label}{" "}
            {formData[item].label.trim() !== "Reference number" ? (
              <sup style={{ color: "red" }}>*</sup>
            ) : (
              ""
            )}
          </h6>
          <FormField
            {...formData[item]}
            id={item}
            handleChange={e => {
              this.props.handleChange(e, item, "addInvitesData");
            }}
          />
        </div>
      ];
    }
    return [...output];
  };
  render() {
    const { formData } = this.props;
    let valid = true;
    for (let item in formData) {
      valid = valid && formData[item].valid;
    }
    return (
      <div className="container">
        <style jsx>
          {`
            .red {
              color: red;
            }
          `}
        </style>
        <div style={{textAlign:"right", marginBottom:"35px"}}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<ArrowRight />}
              onClick={this.props.onContinueClick}
              disabled={_isEmpty(this.props.tableData)}
            >
              Continue
            </Button>
          </div>
        <div className="row">{this.renderFormFields(valid)}</div>
        <div className="row">{this.renderButtons(valid)}</div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<ArrowLeft />}
          onClick={this.props.handleListItemBackClick}
        >
          Back
        </Button>
      </div>
    );
  }
}
