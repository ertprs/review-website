import React, { Component } from "react";
import FormField from "../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";


export default class CopyPasteForm extends Component {
  renderHeader = () => {
    return (
      <div>
        <h3>Copy paste from spreadsheet or text editor</h3>
        <p>
          Copy the data from your spreadsheet or text editor and paste it into
          the text box below.
        </p>
        <p>The data must be separated by semicolons or commas.</p>
        <p>
          Please place the columns in the following order: email, name,
          reference number.
        </p>
        <p>You can enter up to 300 people at a time.</p>
      </div>
    );
  };

  renderFormFields = () => {
    const { formData } = this.props;
    let output = [];
    for (let item in formData) {
      output = [
        ...output,
        <FormField
          {...formData[item]}
          handleChange={e => {
            this.props.handleChange(e, item, "copyPasteFormData");
          }}
          onkeyDown={(e, id) => {}}
          id={item}
        />
      ];
    }
    return [...output];
  };

  renderButtons = () => {
    return (
      <div className="col-md-12">
        <style jsx>
          {`
            .btnContainer{
              display:flex;
              justify-content:flex-end;
            }
            .addBtn{
              flex-basis:10%;
            }
            @media screen and (max-width:1140px){
              .addBtn{
                flex-basis:15%;
              }
            }
            @media screen and (max-width:790px){
              .addBtn{
                flex-basis:20%;
              }
            }
            @media screen and (max-width:675px){
              .addBtn{
                flex-basis:25%;
              }
            }
            @media screen and (max-width:525px){
              .addBtn{
                flex-basis:30%;
              }
            }
            @media screen and (max-width:470px){
              .addBtn{
                flex-basis:35%;
              }
            }
            @media screen and (max-width:415px){
              .addBtn{
                flex-basis:50%;
              }
            }
            @media screen and (max-width:369px){
              .btnContainer{
                flex-direction:column;
              }
              .addBtn{
                margin-bottom:15px;
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
              startIcon={<ArrowLeft />}
              onClick={this.props.handleListItemBackClick}
            >
              Back
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              endIcon={<ArrowRight />}
              onClick={this.props.handleParseBtnClick}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderFormFields()}
        {this.renderButtons()}
      </div>
    );
  }
}
