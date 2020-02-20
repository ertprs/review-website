import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import cookie from "js-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import SchemaForm from "./SchemaForm";
import createReqBody from "../../../../utility/createReqBody";
import _get from "lodash/get";
import { getSchemaCodeDashboard } from "../../../../utility/config";
import { isFormValid } from "../../../../utility/commonFunctions";
import { updatedSchemaData } from "../../../../store/actions/authActions";
class FetchSchemaCode extends Component {
  state = {
    schemaCodeData: {
      isLoading: false,
      success: undefined,
      errorMsg: "",
      value: ""
    }
  };

  fetchData = async () => {
    this.setState({ schemaCodeData: { ...schemaCodeData, isLoading: true } });
    const { updatedSchemaData } = this.props;
    const { schemaCodeData } = this.state;
    const { schemaFormData } = this.props;
    const reqBody = createReqBody(schemaFormData);
    const domainId = cookie.get("domainId");
    const token = cookie.get("token");
    const { handleSchemaCodeValueChange } = this.props;
    try {
      const result = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: { ...reqBody },
        url: `${process.env.BASE_URL}${getSchemaCodeDashboard}/${domainId}`
      });
      const success = _get(result, "data.success", false);
      const value = _get(result, "data.node", "");
      const schema = _get(result, "data.schema", {});
      updatedSchemaData(schema);
      this.setState(
        {
          schemaCodeData: {
            isLoading: false,
            success,
            value,
            errorMsg: ""
          }
        },
        () => {
          //! this will send code to GetWidget.js to display
          handleSchemaCodeValueChange(value);
        }
      );
    } catch (error) {
      console.log(error, "err schema");
      const errorMsg = _get(
        error,
        "response.data.message",
        "Some error occurred!"
      );
      this.setState(
        {
          schemaCodeData: {
            isLoading: false,
            success: false,
            value: "",
            errorMsg
          }
        },
        () => {
          //! this will send code to GetWidget.js to display
          handleSchemaCodeValueChange("");
        }
      );
    }
  };

  componentWillUnmount() {
    this.setState(
      {
        schemaCodeData: {
          isLoading: false,
          success: undefined,
          errorMsg: "",
          value: ""
        }
      },
      () => {
        this.props.handleSchemaCodeValueChange("");
      }
    );
  }

  render() {
    const { success, isLoading, value, errorMsg } = _get(
      this.state,
      "schemaCodeData",
      {}
    );
    const { schemaFormData } = this.props;
    return (
      <>
        <style jsx>
          {`
            .loading,
            .success,
            .error {
              font-size: 0.9rem;
              margin-top: 15px;
              text-align: center;
            }
            .success {
              color: green;
            }
            .error {
              color: red;
              text-align: left;
            }
            .circularProgressContainer {
              display: inline-block;
              margin-left: 5px;
            }
          `}
        </style>
        <SchemaForm {...this.props} />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={this.fetchData}
          disabled={!isFormValid(schemaFormData)}
        >
          {isLoading ? (
            <CircularProgress size={25} style={{ color: "#fff" }} />
          ) : (
            "Get Schema Script"
          )}
        </Button>
        <div className="error">{errorMsg}</div>
        <div className="success">
          {success === true
            ? "Schema code was added successfully to the code below!"
            : ""}
        </div>
      </>
    );
  }
}

export default connect(null, { updatedSchemaData })(FetchSchemaCode);
