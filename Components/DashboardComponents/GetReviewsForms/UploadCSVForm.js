import React, { Component } from "react";
import Button from "@material-ui/core/Button/Button";
import _get from "lodash/get";
import uuid from "uuid/v1";
import validate from "../../../utility/validate";
import Link from "next/link";

class UploadCSVForm extends Component {
  renderHeader = () => {
    return (
      <div>
        <h3 style={{ marginBottom: "1.5rem" }}>
          Upload a file with customer data
        </h3>
        <h5 style={{ fontWeight: "lighter" }}>
          Upload a CSV file containing the data of customers you’d like to
          invite. The columns in the CSV file should contain: customer email,
          customer name and reference number.
        </h5>
        <Link href="/static/user_invite_sample.csv">
          <a>Download Sample File</a>
        </Link>
      </div>
    );
  };

  renderFileUpload = () => {
    const { formData } = this.props;
    const fileSize = _get(formData, "csvFile.size", 0);
    return (
      <div className="fileUploadContainer">
        <style jsx>
          {`
            input[type="file"] {
              display: none;
            }
            .file-upload {
              border: 1px solid #1d5b8f;
              margin-top: 20px;
              background: #1d5b8f;
              color: #fff;
              display: inline-block;
              padding: 6px 12px;
              cursor: pointer;
              transition: all 0.4s;
            }
            .fileUploadContainer {
              margin-bottom: 45px;
            }
          `}
        </style>
        <label className="file-upload">
          <span>Choose {fileSize > 0 ? "another" : "a"} file to upload..</span>{" "}
          <i className="fa fa-hand-o-up"></i>
          <input
            type="file"
            accept=".csv"
            ref={this.props.innerRef}
            onChange={e => {
              this.props.handleChange(e, "csvFile", "uploadCSVFormData");
            }}
          />
        </label>
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

  renderFilePreview = () => {
    const { formData } = this.props;
    const fileSize = _get(formData, "csvFile.size", 0);
    const fileName = _get(formData, "csvFile.filename", 0);
    return fileSize > 0 ? (
      <div className="filePreviewContainer">
        <style jsx>{`
          .filePreviewContainer {
            background: #f1f1f1;
            padding: 15px;
          }
        `}</style>
        <div className="fileName">
          <h3>{fileName}</h3>
        </div>
        <div className="fileSize">(File size: {fileSize} bytes)</div>
        <div className="errorsList">
          {this.props.formData.parseErrors.length > 0 ? (
            <h4 style={{ color: "red", marginTop: "35px" }}>
              Errors in you CSV file:{" "}
            </h4>
          ) : null}
          {this.renderErrors()}
        </div>
      </div>
    ) : (
      ""
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderFilePreview()}
        {this.renderFileUpload()}
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.handleListItemBackClick}
        >
          Back
        </Button>
      </div>
    );
  }
}
export default React.forwardRef((props, ref) => (
  <UploadCSVForm innerRef={ref} {...props} />
));
