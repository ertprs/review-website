import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CustomSteppers from "../../MaterialComponents/CustomSteppers";
import EditableTable from "../../MaterialComponents/EditableTable";
import validate from "../../../utility/validate";
import Papa from "papaparse";
import { getEmailTemplateData } from "../../../utility/emailTemplates/emailTemplates";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import _get from "lodash/get";
import dynamic from "next/dynamic";
const CreateCampaign = dynamic(
  () => import("../GetReviewsForms/CreateCampaign"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const InvitationWays = dynamic(
  () => import("../GetReviewsForms/InvitationWays"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const Done = dynamic(() => import("../GetReviewsForms/Done"), {
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <p>Loading.....</p>
    </div>
  )
});
const CopyPasteForm = dynamic(
  () => import("../GetReviewsForms/CopyPasteForm"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const UploadCSVForm = dynamic(
  () => import("../GetReviewsForms/UploadCSVForm"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const SenderInfo = dynamic(
  () => import("../GetReviewsForms/SenderInfo/SenderInfo"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const SelectTemplateForm = dynamic(
  () => import("../GetReviewsForms/SelectTemplateForm"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const SendInvitations = dynamic(
  () => import("../GetReviewsForms/SendInvitations"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const AddInvitesForm = dynamic(
  () => import("../../DashboardComponents/GetReviewsForms/AddInvitesForm"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);

const columns = [
  { title: "Email", field: "email" },
  { title: "Name", field: "name" },
  { title: "Reference number", field: "referenceNumber", type: "text" }
];

import {
  createCampaign,
  fetchEmailTemplate,
  setGetReviewsData,
  sendGetReviews,
  clearCampaignData
} from "../../../store/actions/dashboardActions";
import _omit from "lodash/omit";

const styles = theme => ({
  button: {
    marginLeft: "15px"
  }
});

class GetReviews extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
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
        subject: {
          element: "input",
          labelText: "Subject",
          type: "text",
          value: "Email Subject: Leave a review on Entity",
          valid: true,
          touched: true,
          errorMessage: "Enter valid subject",
          placeholder: "",
          validationRules: {
            required: true
          }
        },
        clientName: {
          element: "input",
          type: "text",
          labelText: "Client Name",
          value: "Name",
          valid: true,
          touched: true,
          errorMessage: "Enter valid name",
          placeholder: "Enter client name",
          validationRules: {
            required: true
          }
        },
        entity: {
          element: "input",
          type: "text",
          labelText: "Entity",
          value: this.props.companyName + " " || " ",
          valid: true,
          touched: false,
          errorMessage: "Required",
          placeholder: "Enter entity domain",
          validationRules: {
            required: true
          }
        },
        exampleText: {
          labelText: "Example Text",
          element: "textarea",
          value: "",
          valid: true,
          touched: false,
          errorMessage: "Required",
          placeholder: "some text",
          validationRules: {
            required: true
          },
          name: "textbox",
          rows: "5"
        },
        leaveReviewText: {
          labelText: "Leave review text",
          element: "input",
          type: "text",
          value: "",
          valid: true,
          touched: false,
          errorMessage: "Required",
          placeholder: "Please leave a review here",
          validationRules: {
            required: true
          }
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
      },
      uploadCSVFormData: {
        csvFile: {
          filename: "",
          size: 0,
          uploadProgress: 0
        },
        parseErrors: []
      },
      createCampaign: {
        campaignName: {
          element: "input",
          value: "",
          placeholder: "Enter campaign name",
          errorMessage: "",
          valid: false,
          touched: false,
          validationRules: {
            required: true,
            minLength: 4
          },
          name: "campaignName"
        },
        campaignLanguage: {
          element: "select",
          value: "",
          options: _get(this.props, "campaignLanguage", [
            { name: "English", value: "d-be60fd9faf074996b23625429aa1dffd" }
          ]),
          placeholder: "Select your campaign language",
          errorMessage: "",
          valid: false,
          touched: false,
          validationRules: {
            required: true
          },
          name: "campaignLanguage"
        },
        senderName: {
          element: "input",
          value: "",
          placeholder: "Enter sender's name",
          errorMessage: "",
          valid: false,
          touched: false,
          validationRules: {
            required: true,
            minLength: 5
          }
        },
        senderEmail: {
          element: "input",
          value: "noreply@thetrustsearch.com",
          placeholder: "Enter sender's email",
          errorMessage: "",
          valid: true,
          touched: true,
          validationRules: {
            required: true,
            isEmail: true
          },
          name: "senderEmail"
        },
        campaignInvitationMethod: {
          valid: false,
          value: "",
          validationRules: {
            required: true
          }
        }
        // replyToEmail: {
        //   element: "select",
        //   value: "",
        //   placeholder: "email@gmail.com",
        //   errorMessage: "",
        //   options: [{ name: "arturs@gmail.com", value: "arturs@gmail.com" }],
        //   valid: true,
        //   touched: false,
        //   validationRules: {
        //     required: false
        //     // isEmail: true
        //   }
        // }
      }
    };

    this.steps = {
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
          templateId={_get(
            this.state,
            "createCampaign.campaignLanguage.value",
            ""
          )}
        />
      ),

      4: <SendInvitations />,
      5: <Done changeStepToRender={this.props.changeStepToRender} />
    };
  }

  parseFileData = async () => {
    const { uploadCSVFormData } = this.state;
    const file = _get(uploadCSVFormData, "csvFile.file", "");
    let valid = true;
    let errorObj = [];
    let tempObj = [];
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: parsedData => {
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
            return {
              email: email,
              name: name,
              referenceNumber: referenceNumber
            };
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
            getReviewsActiveSubStep: 3
          });
        } else {
          this.setState({
            uploadCSVFormData: {
              ...this.state.uploadCSVFormData,
              parseErrors: [...tempObj, ...errorObj]
            }
          });
        }
      }
    });
  };

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
        getReviewsActiveSubStep: 3
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

  handleNext = isTestEmail => {
    const { activeStep } = this.state;
    const { success } = this.props;
    if (activeStep === 2) {
      this.createCampaignHandler();
    } else if (isTestEmail === "isTestEmail") {
      this.createCampaignHandler("sendTest");
    } else {
      if (activeStep <= columns.length) {
        this.setState(prevState => {
          return { activeStep: prevState.activeStep + 1 };
        });
      }
      const { setGetReviewsData } = this.props;
      setGetReviewsData(this.state);
    }
  };

  createCampaignHandler = sendTest => {
    const { createCampaign } = this.props;
    const { selectTemplateData, tableData } = this.state;
    const campaign = _get(this.state, "createCampaign", {});
    const campaignName = _get(campaign, "campaignName.value", "");
    const senderName = _get(campaign, "senderName.value", "");
    const senderEmail = _get(campaign, "senderEmail.value", "");
    const clientName = _get(selectTemplateData, "clientName.value", "");
    const Entity = _get(selectTemplateData, "entity.value", "");
    const exampleText = _get(selectTemplateData, "exampleText.value");
    const leaveReviewText = _get(selectTemplateData, "leaveReviewText.value");
    // const subject = _get(selectTemplateData, "subject.value", "");

    let omittedTableData = tableData.map(data => {
      return _omit(data, ["tableData"]);
    });
    let data = {
      campaign: {
        name: campaignName,
        senderName: senderName,
        senderEmail: senderEmail
      },
      invites: [...omittedTableData],
      template: {
        id: _get(
          this.state,
          "createCampaign.campaignLanguage.value",
          "d-be60fd9faf074996b23625429aa1dffd"
        ),
        // subject,
        vars: {
          clientName,
          Entity,
          exampleText,
          leaveReviewText
        }
      }
    };
    if (sendTest === "sendTest") {
      data = {
        ...data,
        test: true
      };
    }
    createCampaign(data);
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
    const { fetchEmailTemplate } = this.props;
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
    } else if (id === "campaignLanguage") {
      fetchEmailTemplate(value);
      this.setState(
        {
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
        },
        //new callback for selectTemplate data
        () => {
          this.setState({
            selectTemplateData: {
              ...this.state.selectTemplateData,
              exampleText: {
                ...this.state.selectTemplateData.exampleText,
                value: getEmailTemplateData(
                  this.state.createCampaign.campaignLanguage.value,
                  "exampleText",
                  _get(this.props, "companyName", "")
                )
              },
              leaveReviewText: {
                ...this.state.selectTemplateData.leaveReviewText,
                value: getEmailTemplateData(
                  this.state.createCampaign.campaignLanguage.value,
                  "leaveReviewText",
                  _get(this.props, "companyName", "")
                )
              }
            }
          });
        } //new callback end
      );
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
    this.setState({ getReviewsActiveSubStep: 0 });
  };

  renderAppropriateStep = () => {
    const { activeStep, getReviewsActiveSubStep } = this.state;
    if (activeStep === 0) {
      if (getReviewsActiveSubStep === -1) {
        return (
          <CreateCampaign
            handleListItemClick={this.handleListItemClick}
            formData={this.state.createCampaign}
            handleChange={this.handleChange}
            onContinueClick={() => {
              this.setState({ getReviewsActiveSubStep: 0 });
            }}
          />
        );
      } else if (getReviewsActiveSubStep === 0) {
        return (
          <InvitationWays
            sendToSelectTemplate={() => {
              this.setState({ activeStep: 1 });
            }}
            handleListItemClick={this.handleListItemClick}
            onBackClick={() => {
              this.setState({ getReviewsActiveSubStep: -1 });
            }}
            onContinueClick={() => {
              this.setState({ getReviewsActiveSubStep: 3 });
            }}
            invitationWayToRender={
              this.state.createCampaign.campaignInvitationMethod.value
            }
          />
        );
      } else if (getReviewsActiveSubStep === 1) {
        return (
          <UploadCSVForm
            handleListItemBackClick={this.handleListItemBackClick}
            ref={this.fileInput}
            handleChange={this.handleChange}
            formData={this.state.uploadCSVFormData}
          />
        );
      } else if (getReviewsActiveSubStep === 2) {
        return (
          <CopyPasteForm
            formData={this.state.copyPasteFormData}
            handleChange={this.handleChange}
            handleParseBtnClick={this.handleParseBtnClick}
            handleListItemBackClick={this.handleListItemBackClick}
          />
        );
      } else if (getReviewsActiveSubStep === 3) {
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
    // if (activeStep === 1) {
    //   return (
    //     <SenderInfo
    //       formData={this.state.senderInfoData}
    //       handleChange={this.handleChange}
    //       handleRadioChange={this.handleRadioChange}
    //       handleNext={this.handleNext}
    //       handleBack={this.handleBack}
    //     />
    //   );
    // }
    if (activeStep === 1) {
      return (
        <SelectTemplateForm
          formData={this.state.selectTemplateData}
          handleChange={this.handleChange}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          templateId={_get(
            this.state,
            "createCampaign.campaignLanguage.value",
            ""
          )}
        />
      );
    }
    if (activeStep === 2) {
      return (
        <SendInvitations
          handleNext={this.handleNext}
          handleBack={this.handleBack}
        />
      );
    }
    if (activeStep === 3) {
      return (
        <Done
          changeStepToRender={this.props.changeStepToRender}
          handleInviteMoreClick={() => {
            this.setState({ activeStep: 0, getReviewsActiveSubStep: -1 });
          }}
        />
      );
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const { activeStep } = this.state;
    const { success, setGetReviewsData } = this.props;
    console.log(activeStep, success, "COMPONENT_DID_UPDATE");
    if (this.props !== prevProps) {
      if (activeStep === 2) {
        if (success === true) {
          if (activeStep <= columns.length) {
            setGetReviewsData({});
            this.setState(prevState => {
              return { activeStep: prevState.activeStep + 1 };
            });
          }
        }
      }
    }
  }

  render() {
    const { activeStep } = this.state;
    // console.log(this.props.changeStepToRender, "this.props.changeStepToRender");
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
              this.state.getReviewsActiveSubStep === 3
                ? this.renderInvitesTable()
                : null}
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const companyName = _get(
    auth,
    "logIn.userProfile.company.name",
    "companyName"
  );
  const { createCampaign } = dashboardData;
  const selectedEmailLanguage = _get(
    dashboardData,
    "emailTemplate.template.id",
    ""
  );
  const success = _get(createCampaign, "success", "undefined");
  const { parsedCampaignLanguage } = state.dashboardData;
  let campaignLanguage = parsedCampaignLanguage || [
    { name: "English", value: "d-be60fd9faf074996b23625429aa1dffd" }
  ];
  const createCampaignData = _get(dashboardData, "createCampaign", {});
  return {
    success,
    campaignLanguage,
    companyName,
    dashboardData,
    selectedEmailLanguage,
    createCampaignData
  };
};

export default connect(mapStateToProps, {
  setGetReviewsData,
  sendGetReviews,
  createCampaign,
  fetchEmailTemplate,
  clearCampaignData
})(withStyles(styles)(GetReviews));
