import React, { Component } from "react";
import FormField from "../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import uuid from "uuid/v1";
import validate from "../../../utility/validate";

export default class CopyPasteForm extends Component {
  componentDidMount() {
    this.props.scrollToTopOfThePage();
  }
  renderHeader = () => {
    return (
      <div>
        <h3 style={{ marginBottom: "1.5rem" }}>
          Copy paste from spreadsheet or text editor
        </h3>
        <p>
          Copy the data from your spreadsheet or text editor and paste it into
          the text box below.
        </p>
        <p>The data must be separated by semicolons or commas.</p>
        <p>
          Please place the columns in the following order:{" "}
          <span style={{ fontWeight: "bold" }}>
            email, name, reference number
          </span>
          .
        </p>
      </div>
    );
  };

  renderFormFields = () => {
    const { formData } = this.props;
    let formDataKeys = Object.keys(formData).sort();
    return (formDataKeys || []).map(item => (
      <FormField
        {...formData[item]}
        handleChange={e => {
          this.props.handleChange(e, item, "copyPasteFormData");
        }}
        onkeyDown={(e, id) => {}}
        id={item}
      />
    ));
  };

  renderButtons = () => {
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

  renderErrors = () => {
    const { parseErrors } = this.props.formData;
    return parseErrors.length > 0
      ? parseErrors.map(item => {
          return (
            <div key={uuid()}>
              <style jsx>
                {`
                  .bold {
                    font-weight: bold;
                  }
                  .red {
                    color: red;
                  }
                  .green {
                    color: green;
                  }
                `}
              </style>
              <p>
                <div>
                  Line no:{" "}
                  <span className="bold">{Number(item.index) + 1}</span>
                </div>
                <div>
                  {item.name.trim() === "" ? (
                    <span className="red">
                      Name: empty <small>(required)</small>
                    </span>
                  ) : null}
                </div>
                <div>
                  {item.email.trim() === "" ? (
                    <span className="red">
                      Email: empty <small>(required)</small>
                    </span>
                  ) : (
                    <span>
                      {validate(item.email, { isEmail: true }) ? null : (
                        <span className="red">Email :Invalid email</span>
                      )}
                    </span>
                  )}
                </div>
              </p>
            </div>
          );
        })
      : null;
  };

  render() {
    const { parseErrors } = this.props.formData;
    return (
      <div>
        {this.renderHeader()}
        {parseErrors.length > 0 ? (
          <h5 style={{ color: "red" }}>Errors in CSV, please fix -</h5>
        ) : null}
        {this.renderErrors()}
        {this.renderFormFields()}
        {this.renderButtons()}
      </div>
    );
  }
}
