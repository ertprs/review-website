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
import Done from "../GetReviewsForms/Done";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { connect } from "react-redux";
import {
  setGetReviewsData,
  sendGetReviews
} from "../../../store/actions/dashboardActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const columns = [
  { title: "Email", field: "email" },
  { title: "Name", field: "name" },
  { title: "Reference number", field: "referenceNumber", type: "numeric" }
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
        }
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
        }
      },
      referenceNumber: {
        element: "input",
        type: "number",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid number",
        placeholder: "Enter reference number",
        validationRules: {
          required: true
        }
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
      senderMail: "",
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
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "replyToEmail"
      }
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
          valid: validate(value, formData[id].validationRules),
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
          }
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
          }
        },
        referenceNumber: {
          element: "input",
          type: "number",
          value: "",
          valid: false,
          touched: false,
          errorMessage: "Enter valid number",
          placeholder: "Enter reference number",
          validationRules: {
            required: true
          }
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
          `}
        </style>
        <div className="row">
          <div className="col-md-12">
            <h3>Type in your customer information</h3>
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

  renderAppropriateStep = () => {
    const { activeStep } = this.state;
    if (activeStep === 0) {
      return (
        <div>
          {this.renderInvitesInfo()}
          <AddInvitesForm
            formData={this.state.addInvitesData}
            handleChange={this.handleChange}
            onAddClick={this.onRowAdd}
            onContinueClick={this.handleContinueClick}
          />
        </div>
      );
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
      <Container style={{ background: "#fff" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <CustomSteppers activeStep={activeStep} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {this.renderAppropriateStep()}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {this.state.tableData.length > 0 && this.state.activeStep === 0
              ? this.renderInvitesTable()
              : null}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(
  null,
  { setGetReviewsData, sendGetReviews }
)(withStyles(styles)(GetReviews));
