import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import CustomSteppers from "../../MaterialComponents/CustomSteppers";
import EditableTable from "../../MaterialComponents/EditableTable";
import AddInvitesForm from "../../DashboardComponents/GetReviewsForms/AddInvitesForm";
import validate from "../../../utility/validate";
import SendInvitations from "../GetReviewsForms/SendInvitations";
import SelectTemplateForm from "../GetReviewsForms/SelectTemplateForm";
import SenderInfo from "../GetReviewsForms/SenderInfo/SenderInfo";
import GetReviewsHome from "../GetReviewsForms/GetReviewsHome";
import Done from "../GetReviewsForms/Done";
import Papa from "papaparse";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { connect } from "react-redux";
import {
  setGetReviewsData,
  sendGetReviews
} from "../../../store/actions/dashboardActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import _get from "lodash/get";
import CopyPasteForm from "../GetReviewsForms/CopyPasteForm";
import UploadCSVForm from "../GetReviewsForms/UploadCSVForm";
const columns = [
  { title: "Email", field: "email" },
  { title: "Name", field: "name" },
  { title: "Reference number", field: "referenceNumber", type: "text" }
];

const styles = theme => ({
  button: {
    marginLeft: "15px"
  }
});

class GetReviews extends Component {
  state = {
    activeStep: 0,
    tableData: [],
    getReviewsActiveSubStep: -1,
    addInvitesData: {
      email: {
        element: "input",
        type: "email",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid email address",
        placeholder: "Enter customer email",
        validationRules: {
          required: true,
          isEmail: true
        },
        label: "Email"
      },
      name: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid name",
        placeholder: "Enter customer name",
        validationRules: {
          required: true
        },
        label: "Customer name"
      },
      referenceNumber: {
        element: "input",
        type: "text",
        value: "",
        valid: true,
        touched: false,
        errorMessage: "Enter valid data",
        placeholder: "Enter reference number",
        validationRules: {
          required: false
        },
        label: "Reference number"
      }
    },
    selectTemplateData: {
      clientName: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid name",
        placeholder: "Enter client name",
        validationRules: {
          required: true
        }
      },
      entity: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid entity",
        placeholder: "Enter entity domain",
        validationRules: {
          required: true
        }
      }
    },
    senderInfoData: {
      // senderMail: "",
      senderName: {
        element: "input",
        value: "",
        placeholder: "Enter sender's name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 3
        },
        name: "senderName"
      },
      replyToEmail: {
        element: "select",
        value: "",
        placeholder: "email@gmail.com",
        errorMessage: "",
        options: [{ name: "arturs@gmail.com", value: "arturs@gmail.com" }],
        valid: true,
        touched: false,
        validationRules: {
          required: false
          // isEmail: true
        },
        name: "replyToEmail"
      }
    },
    copyPasteFormData: {
      textbox: {
        element: "textarea",
        readOnly: false,
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid records",
        placeholder: "example@gmail.com, Peter Jones, 1234567890",
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

  steps = {
    1: (
      <div>
        {/* {this.renderInvitesInfo()} */}
        <AddInvitesForm
          formData={this.state.addInvitesData}
          handleChange={this.handleChange}
          onAddClick={this.onRowAdd}
          onContinueClick={this.handleContinueClick}
        />
      </div>
    ),
    2: (
      <SenderInfo
        formData={this.state.senderInfoData}
        handleChange={this.handleChange}
        handleRadioChange={this.handleRadioChange}
      />
    ),

    3: (
      <SelectTemplateForm
        formData={this.state.selectTemplateData}
        handleChange={this.handleChange}
      />
    ),

    4: <SendInvitations />,
    5: <Done />
  };

  handleParseBtnClick = () => {
    const { copyPasteFormData } = this.state;
    const parsedData = Papa.parse(copyPasteFormData.textbox.value, {
      skipEmptyLines: true
    });
    let valid = true;
    let errorObj = [];
    let tempObj = [];
    //check if data is not empty
    console.log(parsedData);
    const newTableData = parsedData.data.map((item, index) => {
      if (item.length >= 2) {
        const email = item[0] || "";
        const name = item[1] || "";
        const referenceNumber = item[2] || "";
        if (
          email.trim() === "" ||
          name.trim() === "" ||
          !validate(email.trim(), { isEmail: true })
        ) {
          valid = false;
          errorObj = [
            ...errorObj,
            {
              index: index,
              email: email,
              name: name,
              referenceNumber: referenceNumber
            }
          ];
        }
        return { email: email, name: name, referenceNumber: referenceNumber };
      } else {
        valid = false;
        const email = item[0] || "";
        const name = item[1] || "";
        const referenceNumber = item[2] || "";
        tempObj = [
          ...tempObj,
          {
            index: index,
            email: email || "",
            name: name || "",
            referenceNumber: referenceNumber || ""
          }
        ];
        return {};
      }
    });
    if (newTableData.length > 0 && valid) {
      this.setState({
        tableData: [...newTableData],
        getReviewsActiveSubStep: 2
      });
    } else {
      this.setState({
        copyPasteFormData: {
          ...this.state.copyPasteFormData,
          parseErrors: [...tempObj, ...errorObj]
        }
      });
    }
  };

  handleNext = () => {
    const { activeStep } = this.state;
    if (activeStep <= columns.length) {
      this.setState(prevState => {
        return { activeStep: prevState.activeStep + 1 };
      });
    }
    const { setGetReviewsData } = this.props;
    setGetReviewsData(this.state);
  };

  handleBack = () => {
    const { activeStep } = this.state;
    if (activeStep > 0) {
      this.setState(prevState => {
        return { activeStep: prevState.activeStep - 1 };
      });
    }
  };

  handleRadioChange = event => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      senderInfoData: { ...this.state.senderInfoData, senderMail: value }
    });
  };

  handleChange = (e, id, dataType) => {
    const { value } = e.target;
    const formData = this.state[dataType];

    this.setState({
      [dataType]: {
        ...formData,
        [id]: {
          ...formData[id],
          value: value,
          valid: id!=="referenceNumber" ? validate(value, formData[id].validationRules) : true,
          touched: true
        }
      }
    });
  };

  emptyFormFields = () => {
    const initFormState = {
      addInvitesData: {
        email: {
          element: "input",
          type: "email",
          value: "",
          valid: false,
          touched: false,
          errorMessage: "Enter valid email address",
          placeholder: "Enter customer email",
          validationRules: {
            required: true,
            isEmail: true
          },
          label: "Email"
        },
        name: {
          element: "input",
          type: "text",
          value: "",
          valid: false,
          touched: false,
          errorMessage: "Enter valid name",
          placeholder: "Enter customer name",
          validationRules: {
            required: true
          },
          label: "Customer name"
        },
        referenceNumber: {
          element: "input",
          type: "text",
          value: "",
          valid: true,
          touched: false,
          errorMessage: "Enter valid data",
          placeholder: "Enter reference number",
          validationRules: {
            required: false
          },
          label: "Reference number"
        }
      }
    };
    this.setState({ ...this.state, ...initFormState });
  };

  renderInvitesTable = () => {
    return (
      <EditableTable
        title="Added invites"
        columns={columns}
        data={this.state.tableData}
        onRowAdd={this.onRowAdd}
        onRowUpdate={this.onRowUpdate}
        onRowDelete={this.onRowDelete}
      />
    );
  };

  onRowAdd = newData => {
    const data = [...this.state.tableData];
    data.push(newData);
    this.setState({ tableData: [...data] }, () => {
      this.emptyFormFields();
    });
  };

  onRowUpdate = (newData, oldData) => {
    const data = [...this.state.tableData];
    data[data.indexOf(oldData)] = newData;
    this.setState({ tableData: [...data] });
  };

  onRowDelete = oldData => {
    const data = [...this.state.tableData];
    data.splice(data.indexOf(oldData), 1);
    this.setState({ tableData: [...data] });
  };

  renderInvitesInfo = () => {
    return (
      <div className="container">
        <style jsx>
          {`
            .invitesInfoBody {
              margin-top: 15px;
              margin-left: 3.5px;
              line-height: 1.8;
              margin-bottom: 25px;
            }
            @media only screen and (max-width: 424px) {
              .inviteHeader {
                font-size: 1.3rem;
              }
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-12">
            <h3 className="inviteHeader">Type in your customer information</h3>
            <p className="invitesInfoBody">
              Add your customers one by one. Simply type in the relevant
              information: names, email addresses and reference numbers, and
              when you're all set, hit the 'Continue' button. Note that you can
              enter up to 100 invitations.
            </p>
          </div>
        </div>
      </div>
    );
  };

  handleContinueClick = () => {
    const { tableData } = this.state;
    if (tableData.length > 0) {
      this.handleNext();
    }
  };

  //for moving forward getReviewsActiveSubStep
  handleListItemClick = index => {
    this.setState({ getReviewsActiveSubStep: index });
  };

  //for moving backward getReviewsActiveSubStep to getHomeReviews
  handleListItemBackClick = () => {
    this.setState({ getReviewsActiveSubStep: -1 });
  };

  renderAppropriateStep = () => {
    const { activeStep, getReviewsActiveSubStep } = this.state;
    if (activeStep === 0) {
      if (getReviewsActiveSubStep === -1) {
        return (
          <GetReviewsHome handleListItemClick={this.handleListItemClick} />
        );
      } else if (getReviewsActiveSubStep === 0) {
        return (
          <UploadCSVForm
            handleListItemBackClick={this.handleListItemBackClick}
          />
        );
      } else if (getReviewsActiveSubStep === 1) {
        return (
          <CopyPasteForm
            formData={this.state.copyPasteFormData}
            handleChange={this.handleChange}
            handleParseBtnClick={this.handleParseBtnClick}
            handleListItemBackClick={this.handleListItemBackClick}
          />
        );
      } else if (getReviewsActiveSubStep === 2) {
        return (
          <>
            {this.renderInvitesInfo()}
            <AddInvitesForm
              formData={this.state.addInvitesData}
              handleChange={this.handleChange}
              onAddClick={this.onRowAdd}
              onContinueClick={this.handleContinueClick}
              tableData={_get(this.state, "tableData", [])}
              handleListItemBackClick={this.handleListItemBackClick}
            />
          </>
        );
      }
      // return (
      //   <div>
      //     {/* {this.renderInvitesInfo()}
      //     <AddInvitesForm
      //       formData={this.state.addInvitesData}
      //       handleChange={this.handleChange}
      //       onAddClick={this.onRowAdd}
      //       onContinueClick={this.handleContinueClick}
      //       tableData={_get(this.state, "tableData", [])}
      //     /> */}
      //     {/* <CopyPasteForm
      //       formData={this.state.copyPasteFormData}
      //       handleChange={this.handleChange}
      //       handleParseBtnClick={this.handleParseBtnClick}
      //     /> */}
      //     <GetReviewsHome />
      //   </div>
      // );
    }
    if (activeStep === 1) {
      return (
        <SenderInfo
          formData={this.state.senderInfoData}
          handleChange={this.handleChange}
          handleRadioChange={this.handleRadioChange}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
        />
      );
    }
    if (activeStep === 2) {
      return (
        <SelectTemplateForm
          formData={this.state.selectTemplateData}
          handleChange={this.handleChange}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
        />
      );
    }
    if (activeStep === 3) {
      return (
        <SendInvitations
          handleNext={this.handleNext}
          handleBack={this.handleBack}
        />
      );
    }
    if (activeStep === 4) {
      return <Done />;
    }
  };

  render() {
    const { activeStep } = this.state;
    return (
      <>
        <style jsx>
          {`
            .customStepper {
              display: none;
            }
          `}
        </style>
        <Container style={{ background: "#fff" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <div className="customStepper">
                <CustomSteppers activeStep={activeStep} />
              </div>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {this.renderAppropriateStep()}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {this.state.tableData.length > 0 &&
              this.state.activeStep === 0 &&
              this.state.getReviewsActiveSubStep === 2
                ? this.renderInvitesTable()
                : null}
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default connect(
  null,
  { setGetReviewsData, sendGetReviews }
)(withStyles(styles)(GetReviews));
