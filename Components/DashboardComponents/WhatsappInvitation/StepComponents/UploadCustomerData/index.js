import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import _get from "lodash/get";
import Papa from "papaparse";

import UploadFile from "./UploadFile";
import CopyPasteData from "./CopyPasteData";
import validate from "../../../../../utility/validate";

class UploadCustomerData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWay: "",
      uploadFileData: {
        csvFile: {
          filename: "",
          size: 0,
          uploadProgress: 0
        },
        parseErrors: []
      },
      copyPasteFormData: {
        textbox: {
          element: "textarea",
          readOnly: false,
          value: "",
          valid: false,
          touched: false,
          errorMessage: "Enter valid records",
          placeholder: "John Doe, 234567890, +371",
          validationRules: {
            required: true
          },
          rows: 10,
          cols: 10,
          name: "textbox"
        },
        parseErrors: []
      }
    };
    this.fileInput = React.createRef();
  }

  //!handle file upload change
  handleChange = (e, id, dataType) => {
    const { value } = e.target;
    const formData = this.state[dataType];
    if (id === "csvFile") {
      if (this.fileInput.current.files.length === 1) {
        const file = this.fileInput.current.files[0];
        const ext = file.name.match(/\.([^\.]+)$/)[1];
        const size = file.size;
        if (ext === "csv") {
          this.setState(
            {
              [dataType]: {
                ...formData,
                [id]: {
                  ...formData[id],
                  filename: this.fileInput.current.files[0].name,
                  size: size,
                  file: file,
                  errors: {}
                }
              }
            },
            () => {
              this.parseFileData();
            }
          );
        }
      }
    } else {
      this.setState({
        [dataType]: {
          ...formData,
          [id]: {
            ...formData[id],
            value: value,
            valid:
              id !== "referenceNumber"
                ? validate(value, formData[id].validationRules)
                : true,
            touched: true
          }
        }
      });
    }
  };

  //!handle parsing of text area
  handleParseBtnClick = async () => {
    const { copyPasteFormData } = this.state;
    const parsedData = Papa.parse(copyPasteFormData.textbox.value, {
      skipEmptyLines: true
    });
    let valid = true;
    let errorObj = [];
    let tempObj = [];
    //check if data is not empty
    const newTableData = parsedData.data.map((item, index) => {
      if (item.length === 3) {
        const name = item[0].trim() || "";
        const phone = item[1].trim() || "";
        const countryCode = item[2].trim() || "";
        if (
          name.trim() === "" ||
          phone.trim() === "" ||
          countryCode.trim() === "" ||
          !validate(phone.trim(), { isPhoneNumber: true }) ||
          !validate(countryCode.trim(), { isCountryCode: true })
        ) {
          valid = false;
          errorObj = [
            ...errorObj,
            {
              index: index,
              name: name.trim() || "",
              phone: phone.trim() || "",
              countryCode: countryCode.trim() || ""
            }
          ];
        }
        return {
          name: name.trim() || "",
          phone: phone.trim() || "",
          countryCode: countryCode.trim() || ""
        };
      } else {
        valid = false;
        const name = item[0] || "";
        const phone = item[1] || "";
        const countryCode = item[2] || "";
        tempObj = [
          ...tempObj,
          {
            index: index,
            name: name.trim() || "",
            phone: phone.trim() || "",
            countryCode: countryCode.trim() || ""
          }
        ];
        return {};
      }
    });
    if (newTableData.length > 0 && valid) {
      this.props.setUploadCustomerData(newTableData);
      this.setState({
        tableData: [...newTableData],
        copyPasteFormData: {
          ...this.state.copyPasteFormData,
          parseErrors: [...tempObj, ...errorObj]
        }
      });
    } else {
      this.props.setUploadCustomerData([]);
      this.setState({
        copyPasteFormData: {
          ...this.state.copyPasteFormData,
          parseErrors: [...tempObj, ...errorObj]
        }
      });
    }
  };

  //!Parse file data after uploading
  parseFileData = async () => {
    const { uploadFileData } = this.state;
    const file = _get(uploadFileData, "csvFile.file", "");
    let valid = true;
    let errorObj = [];
    let tempObj = [];
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: parsedData => {
        const newTableData = parsedData.data.map((item, index) => {
          if (item.length === 3) {
            const name = item[0].trim() || "";
            const phone = item[1].trim() || "";
            const countryCode = item[2].trim() || "";
            if (
              name.trim() === "" ||
              phone.trim() === "" ||
              countryCode.trim() === "" ||
              !validate(phone.trim(), { isPhoneNumber: true }) ||
              !validate(countryCode.trim(), { isCountryCode: true })
            ) {
              valid = false;
              errorObj = [
                ...errorObj,
                {
                  index: index,
                  name: name.trim() || "",
                  phone: phone.trim() || "",
                  countryCode: countryCode.trim() || ""
                }
              ];
            }
            return {
              name: name.trim() || "",
              phone: phone.trim() || "",
              countryCode: countryCode.trim() || ""
            };
          } else {
            valid = false;
            const name = item[0] || "";
            const phone = item[1] || "";
            const countryCode = item[2] || "";
            tempObj = [
              ...tempObj,
              {
                index: index,
                name: name.trim() || "",
                phone: phone.trim() || "",
                countryCode: countryCode.trim() || ""
              }
            ];
            return {};
          }
        });
        if (newTableData.length > 0 && valid) {
          this.props.setUploadCustomerData(newTableData);
          this.setState({
            tableData: [...newTableData]
          });
        } else {
          this.props.setUploadCustomerData([]);
          this.setState({
            uploadFileData: {
              ...this.state.uploadFileData,
              parseErrors: [...tempObj, ...errorObj]
            }
          });
        }
      }
    });
  };

  renderExpansionPanel = () => {
    const selectedWay = _get(this.state, "selectedWay", "");
    return (
      <RadioGroup
        aria-label="uploadWay"
        name="uploadWay"
        value={selectedWay}
        onChange={this.handleRadioChange}
      >
        <ExpansionPanel
          style={{ marginBottom: "15px" }}
          expanded={"uploadFile" === selectedWay}
          onChange={e => {
            this.setState({ selectedWay: "uploadFile" });
            this.props.setUploadCustomerData([]);
          }}
        >
          <ExpansionPanelSummary
            onClick={e => {}}
            // expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="integration-platforms"
            id="integration-platforms"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              control={<Radio />}
              label="Upload a file"
              value={"uploadFile"}
              onClick={e => {
                this.setState({ selectedWay: "uploadFile" });
                this.props.setUploadCustomerData([]);
              }}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ width: "100%" }}>
            <UploadFile
              ref={this.fileInput}
              handleChange={this.handleChange}
              formData={this.state.uploadFileData}
              setUploadCustomerData={this.props.setUploadCustomerData}
            />{" "}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          style={{ marginBottom: "15px" }}
          expanded={"copyPaste" === selectedWay}
          onChange={e => {
            this.setState({ selectedWay: "copyPaste" });
            this.props.setUploadCustomerData([]);
          }}
        >
          <ExpansionPanelSummary
            onClick={e => {}}
            // expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="integration-platforms"
            id="integration-platforms"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              control={<Radio />}
              label="Copy and paste data"
              value={"copyPaste"}
              onClick={e => {
                this.setState({ selectedWay: "copyPaste" });
                this.props.setUploadCustomerData([]);
              }}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ width: "100%" }}>
            <CopyPasteData
              formData={this.state.copyPasteFormData}
              handleChange={this.handleChange}
              handleParseBtnClick={this.handleParseBtnClick}
              setUploadCustomerData={this.props.setUploadCustomerData}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </RadioGroup>
    );
  };

  render() {
    return (
      <>
        <style jsx>
          {`
            .header {
              margin-bottom: 25px;
            }
          `}
        </style>
        <div className="header">
          <h5>
            Please choose any of the customer data submission methods from below
            :
          </h5>
        </div>
        {this.renderExpansionPanel()}
      </>
    );
  }
}

export default UploadCustomerData;
