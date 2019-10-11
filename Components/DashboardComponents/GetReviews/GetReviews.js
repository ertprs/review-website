import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import CustomSteppers from "../../MaterialComponents/CustomSteppers";
import EditableTable from "../../MaterialComponents/EditableTable";
import AddInvitesForm from "../../DashboardComponents/GetReviewsForms/AddInvitesForm";
import validate from "../../../utility/validate";
import SendInvitations from '../GetReviewsForms/SendInvitations';

const columns = [
  { title: "Email", field: "email" },
  { title: "Name", field: "name" },
  { title: "Reference number", field: "referenceNumber", type: "numeric" }
];

export default class GetReviews extends Component {
  state = {
    activeStep: 0,
    tableData: [],
    formData: {
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

  handleNext = () => {
    const { activeStep } = this.state;
    if (activeStep <= columns.length) {
      this.setState(prevState => {
        return { activeStep: prevState.activeStep + 1 };
      });
    }
  };

  handleBack = () => {
    const { activeStep } = this.state;
    if (activeStep > 0) {
      this.setState(prevState => {
        return { activeStep: prevState.activeStep - 1 };
      });
    }
  };

  handleChange = (e, id) => {
    const { value } = e.target;
    const { formData, errorMsg } = this.state;

    this.setState({
      formData: {
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
    };
    this.setState({ ...this.state, formData: { ...initFormState } });
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

  handleContinueClick = ()=>{
    const {tableData} = this.state;
    if(tableData.length > 0){
      this.handleNext()
    }
  }

  render() {
    const {activeStep} = this.state
    return (
      <Container style={{ background: "#fff" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <CustomSteppers activeStep={activeStep}/>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {/* {this.renderInvitesInfo()} */}
            {/* <AddInvitesForm
              formData={this.state.formData}
              handleChange={this.handleChange}
              onAddClick={this.onRowAdd}
              onContinueClick={this.handleContinueClick}
            /> */}
            <SendInvitations />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {this.state.tableData.length > 0 ? this.renderInvitesTable() : null}
          </Grid>
        </Grid>
      </Container>
    );
  }
}
