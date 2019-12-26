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
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";
import _filter from "lodash/filter";
import { iconNames } from "../../../utility/constants/socialMediaConstants";
import UploadCSVForm from "../GetReviewsForms/UploadCSVForm";
import { isFifteenMinuteDiff } from "../../../utility/commonFunctions";
import moment from "moment";
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

const CampaignIntro = dynamic(
  () => import("../GetReviewsForms/CampaignIntro/CampaignIntro"),
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

const ReviewInvitationPlatforms = dynamic(
  () => import("../GetReviewsForms/ReviewInvitationPlatforms"),
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

const CampaignSchedule = dynamic(
  () => import("../GetReviewsForms/CampaignSchedule"),
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
  clearCampaignData,
  setCampaignEditMode
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
      getReviewsActiveSubStep: -2,
      tableData: [],
      reviewInvitationPlatformsData: {
        platforms: {},
        sumOfAllSplits: 0,
        selectionWays: [
          { id: 0, label: "Use only one review platform" },
          { id: 1, label: "Use multiple review platforms" }
        ],
        selectedWay: _get(this.props, "selectedWay", -1),
        selectedSinglePlatform: _get(this.props, "selectedSinglePlatform", "")
      },
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
          value: "Leave a review on Entity",
          valid: true,
          touched: true,
          // errorMessage: "Enter valid subject",
          placeholder: "Enter subject",
          validationRules: {
            required: true
          }
        },
        clientName: {
          element: "input",
          type: "text",
          labelText: "Client Name",
          value: _get(
            this.props,
            "selectedCampaignData.campaign_structure.template_vars.clientName",
            "Name"
          ),
          valid: true,
          touched: true,
          // errorMessage: "Enter valid name",
          placeholder: "Enter client name",
          validationRules: {
            required: true
          }
        },
        entity: {
          element: "input",
          type: "text",
          labelText: "Entity",
          value:
            _get(
              this.props,
              "selectedCampaignData.campaign_structure.template_vars.Entity",
              ""
            ) || _get(this.props, "companyName", " ") + " ",
          valid: true,
          touched: false,
          // errorMessage: "Required",
          placeholder: "Enter entity domain",
          validationRules: {
            required: true
          }
        },
        exampleText: {
          labelText: "Example Text",
          element: "textarea",
          value: _get(
            this.props,
            "selectedCampaignData.campaign_structure.template_vars.exampleText",
            " "
          ),
          valid: true,
          touched: false,
          // errorMessage: "Required",
          placeholder: "Enter template body",
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
          value: _get(
            this.props,
            "selectedCampaignData.campaign_structure.template_vars.leaveReviewText",
            " "
          ),
          valid: true,
          touched: false,
          // errorMessage: "Required",
          placeholder: "Enter leave review text",
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
          value: _get(this.props, "selectedCampaignData.name", ""),
          placeholder: "Enter campaign name",
          errorMessage: "",
          valid: true,
          touched: true,
          validationRules: {
            required: true,
            minLength: 4
          },
          name: "campaignName"
        },
        campaignLanguage: {
          element: "select",
          value: _get(this.props, "selectedCampaignData.template_id", ""),
          code: "",
          options: _get(this.props, "campaignLanguage", []),
          placeholder: "Select your campaign language",
          errorMessage: "",
          valid: true,
          touched: true,
          validationRules: {
            required: true
          },
          name: "campaignLanguage"
        },
        senderName: {
          element: "input",
          value: _get(
            this.props,
            "selectedCampaignData.campaign_structure.senderName",
            ""
          ),
          placeholder: "Enter sender's name",
          errorMessage: "",
          valid: true,
          touched: true,
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
          valid: true,
          value: _get(this.props, "isCampaignEditMode", false)
            ? "automatic"
            : "",
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
      },
      campaignSchedule: {
        selectedDate: null,
        formattedDate: "",
        isValid: false,
        touched: false,
        errorMessage:
          "Scheduled time must be atleast 15 minutes or more from now (current time - in 24hrs format), if you want to send campaigns immediately, please choose the first option."
      },
      selectedPlatform: _get(this.props, "selectedCampaignData.type_id", "")
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

      4: (
        <SendInvitations
          formData={this.state.selectTemplateData}
          templateId={_get(
            this.state,
            "createCampaign.campaignLanguage.value",
            ""
          )}
        />
      ),
      5: <Done changeStepToRender={this.props.changeStepToRender} />
    };
  }

  handleCampaignScheduleDateChange = (date, init = false) => {
    const valid = isFifteenMinuteDiff(date);
    if (init) {
      this.setState({
        campaignSchedule: {
          ...this.state.campaignSchedule,
          selectedDate: date,
          formattedDate: "",
          isValid: valid,
          touched: false
        }
      });
    } else {
      this.setState({
        campaignSchedule: {
          ...this.state.campaignSchedule,
          selectedDate: date,
          formattedDate: moment(new Date(date)).format("DD-MM-YYYY, HH:mm:ss"),
          isValid: valid,
          touched: true
        }
      });
    }
    console.log(isFifteenMinuteDiff(date), "valid");
  };

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
    if (activeStep === 3) {
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

  generatePercentageSplitData = () => {
    const { reviewInvitationPlatformsData } = this.state;
    const platforms = _get(reviewInvitationPlatformsData, "platforms", {});
    const selectedWay = _get(reviewInvitationPlatformsData, "selectedWay", {});
    const selectedSinglePlatform = _get(
      reviewInvitationPlatformsData,
      "selectedSinglePlatform",
      ""
    );
    let percentageSplit = [];
    if (selectedWay === 0) {
      const selectedSinglePlatformData = platforms[selectedSinglePlatform];
      let percentShare = 100;
      let socialAppId = selectedSinglePlatform;
      let link = _get(selectedSinglePlatformData, "url", "");
      percentageSplit = [
        ...percentageSplit,
        { socialAppId, percentShare, link }
      ];
      return percentageSplit;
    } else if (selectedWay === 1) {
      for (let item in platforms) {
        let data = platforms[item];
        let percentShare = _get(data, "value", "");
        let socialAppId = item;
        let link = _get(data, "url", "");
        percentageSplit = [
          ...percentageSplit,
          { socialAppId, percentShare, link }
        ];
      }
      return percentageSplit;
    }
    return [];
  };

  createCampaignHandler = sendTest => {
    const { createCampaign, ecommerceIntegrations } = this.props;
    const {
      selectTemplateData,
      tableData,
      selectedPlatform,
      campaignSchedule
    } = this.state;
    const campaign = _get(this.state, "createCampaign", {});
    const campaignName = _get(campaign, "campaignName.value", "");
    const senderName = _get(campaign, "senderName.value", "");
    const senderEmail = _get(campaign, "senderEmail.value", "");
    const clientName = _get(selectTemplateData, "clientName.value", "");
    const Entity = _get(selectTemplateData, "entity.value", "");
    const exampleText = _get(selectTemplateData, "exampleText.value");
    const leaveReviewText = _get(selectTemplateData, "leaveReviewText.value");
    const percentageSplit = this.generatePercentageSplitData();
    const selectedDate = _get(campaignSchedule, "selectedDate", "");
    const formattedDate = _get(campaignSchedule, "formattedDate", "");
    // const subject = _get(selectTemplateData, "subject.value", "");
    let omittedTableData = tableData.map(data => {
      return _omit(data, ["tableData"]);
    });
    let shopId = "";
    if (ecommerceIntegrations) {
      if (
        Array.isArray(ecommerceIntegrations) &&
        !_isEmpty(ecommerceIntegrations)
      ) {
        let foundPlatform = _find(ecommerceIntegrations, [
          "type_id",
          selectedPlatform
        ]);
        if (foundPlatform) {
          shopId = _get(foundPlatform, "id", "");
        }
      }
    }
    let data = {
      campaign: {
        name: campaignName,
        senderName: senderName,
        senderEmail: senderEmail
      },
      invites: [...omittedTableData],
      percentageSplit: [...percentageSplit],
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
    if (selectedDate && formattedDate) {
      data = {
        ...data,
        campaign: { ...data.campaign, startAt: formattedDate }
      };
    }
    if (_get(campaign, "campaignInvitationMethod.value", "") === "automatic") {
      data = {
        ...data,
        shop: shopId
      };
    }
    if (sendTest === "sendTest") {
      data = {
        ...data,
        test: true
      };
    }
    createCampaign(data);
  };

  handleBack = () => {
    const { activeStep, createCampaign } = this.state;
    const selectedInvitationWay = _get(
      createCampaign,
      "campaignInvitationMethod.value",
      ""
    );
    if (activeStep > 0) {
      if (selectedInvitationWay === "automatic" && activeStep === 3) {
        this.setState(prevState => {
          return { activeStep: prevState.activeStep - 2 };
        });
      } else {
        this.setState(prevState => {
          return { activeStep: prevState.activeStep - 1 };
        });
      }
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
      const selectedCampaignLang = _filter(
        _get(this.props, "campaignLanguage", []),
        ["value", value]
      );
      const selectedCampaignLangCode = selectedCampaignLang.code || "";
      this.setState(
        {
          [dataType]: {
            ...formData,
            [id]: {
              ...formData[id],
              value,
              code: selectedCampaignLangCode,
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
                  _get(this.state, "createCampaign.campaignLanguage.value", ""),
                  "exampleText",
                  _get(this.props, "companyName", "")
                )
              },
              leaveReviewText: {
                ..._get(this.state, "selectTemplateData.leaveReviewText", ""),
                value: getEmailTemplateData(
                  _get(this.state, "createCampaign.campaignLanguage.value", ""),
                  "leaveReviewText",
                  _get(this.props, "companyName", "")
                )
              }
            }
          });
        }
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
      // this.handleNext();
      this.setState({ getReviewsActiveSubStep: 4 });
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

  //to handle ReviewInvitationPlatform change
  handleReviewPlatformsExpansionChange = selectedItemId => {
    const { reviewInvitationPlatformsData } = this.state;
    this.setState({
      reviewInvitationPlatformsData: {
        ...reviewInvitationPlatformsData,
        selectedWay: selectedItemId
      }
    });
  };

  //to handle ReviewInvitationPlatformRadioBtn change
  handleReviewPlatformRadioBtnChange = e => {
    const { reviewInvitationPlatformsData } = this.state;
    this.setState({
      reviewInvitationPlatformsData: {
        ...reviewInvitationPlatformsData,
        selectedSinglePlatform: Number(e.target.value)
      }
    });
  };

  renderAppropriateStep = () => {
    const { activeStep, getReviewsActiveSubStep, createCampaign } = this.state;
    const selectedInvitationMethod = _get(
      createCampaign,
      "campaignInvitationMethod.value",
      ""
    );
    if (activeStep === 0) {
      if(getReviewsActiveSubStep === -2){
        return(
          <CampaignIntro handleCampaignCreationClick = {()=>{
            this.setState({getReviewsActiveSubStep:-1})
          }}/>
        )
      }
      else if (getReviewsActiveSubStep === -1) {
        return (
          <CreateCampaign
            handleListItemClick={this.handleListItemClick}
            formData={this.state.createCampaign}
            handleChange={this.handleChange}
            onContinueClick={() => {
              this.setState({ getReviewsActiveSubStep: 0 });
            }}
            isCampaignEditMode={_get(this.props, "isCampaignEditMode", false)}
            onBackClick={()=>{
              this.setState({getReviewsActiveSubStep:-2})
            }}
          />
        );
      } else if (getReviewsActiveSubStep === 0) {
        return (
          <InvitationWays
            sendToSelectPlatformSplit={() => {
              this.setState({ getReviewsActiveSubStep: 4 });
            }}
            handleListItemClick={this.handleListItemClick}
            onBackClick={() => {
              this.setState({ getReviewsActiveSubStep: -1 });
            }}
            onContinueClick={() => {
              this.setState({ getReviewsActiveSubStep: 3 });
            }}
            invitationWayToRender={_get(
              this.state,
              "createCampaign.campaignInvitationMethod.value",
              ""
            )}
            setSelectedPlatform={selectedPlatform => {
              this.setState({ selectedPlatform });
            }}
            selectedPlatform={_get(this.state, "selectedPlatform", "")}
            campaignLanguage={_get(
              this.state,
              "createCampaign.campaignLanguage.code",
              "en"
            )}
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
      } else if (getReviewsActiveSubStep === 4) {
        return Object.keys(this.state.reviewInvitationPlatformsData.platforms)
          .length > 0 ? (
          <>
            <ReviewInvitationPlatforms
              platforms={this.state.reviewInvitationPlatformsData.platforms}
              reviewInvitationPlatformsData={
                this.state.reviewInvitationPlatformsData
              }
              sumOfAllSplits={_get(
                this.state,
                "reviewInvitationPlatformsData.sumOfAllSplits",
                0
              )}
              handleSliderChange={this.handleSliderChange}
              sendToSelectTemplate={() => {
                this.setState({ activeStep: 1 });
              }}
              handleListItemBackClick={this.handleListItemBackClick}
              handleReviewPlatformsExpansionChange={
                this.handleReviewPlatformsExpansionChange
              }
              handleReviewPlatformRadioBtnChange={
                this.handleReviewPlatformRadioBtnChange
              }
            />
          </>
        ) : null;
      }
    }
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
      if (selectedInvitationMethod === "automatic") {
        this.handleNext();
      } else {
        return (
          <CampaignSchedule
            selectedDate={this.state.campaignSchedule.selectedDate}
            handleCampaignScheduleDateChange={
              this.handleCampaignScheduleDateChange
            }
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            isValid={this.state.campaignSchedule.isValid}
            errorMessage={this.state.campaignSchedule.errorMessage}
            touched={this.state.campaignSchedule.touched}
          />
        );
      }
    }
    if (activeStep === 3) {
      return (
        <SendInvitations
          formData={this.state.selectTemplateData}
          templateId={_get(
            this.state,
            "createCampaign.campaignLanguage.value",
            ""
          )}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
        />
      );
    }
    if (activeStep === 4) {
      return (
        <Done
          changeStepToRender={this.props.changeStepToRender}
          handleInviteMoreClick={() => {
            this.setState({
              activeStep: 0,
              getReviewsActiveSubStep: -1,
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
                  value: "Leave a review on Entity ",
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
                    {
                      name: "English",
                      value: "d-be60fd9faf074996b23625429aa1dffd"
                    }
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
            });
          }}
        />
      );
    }
  };

  componentDidMount() {
    //Setting dynamic state on MOUNTING for ReviewInvitationPlatform
    const social = _get(this.props, "social", []);
    const googleDirectReviewURL = _get(this.props, "googleDirectReviewURL", "");
    const { reviewInvitationPlatformsData } = this.state;
    let initValueForSliders = 0;
    let countOfPlatforms = 0;
    if (googleDirectReviewURL) {
      countOfPlatforms += 1;
    }
    let platforms = {};
    let percentageSplit = _get(
      this.props,
      "selectedCampaignData.campaign_structure.percentageSplit",
      []
    );
    if (social && Array.isArray(social)) {
      if (social.length > 0) {
        initValueForSliders = Math.floor(
          100 / (countOfPlatforms + social.length)
        );
        social.forEach(item => {
          const social_media_app_id = _get(item, "social_media_app_id", "");
          const url = _get(item, "url", "");
          if (social_media_app_id) {
            platforms = {
              ...platforms,
              [Number(social_media_app_id)]: {
                name: iconNames[Number(social_media_app_id)].name,
                social_media_app_id,
                url,
                value: initValueForSliders,
                hasError: false,
                min: 0,
                max: 100
              }
            };
          }
        });
      }
    }
    if (googleDirectReviewURL) {
      platforms = {
        ...platforms,
        0: {
          name: iconNames[0].name,
          social_media_app_id: 0,
          url: googleDirectReviewURL,
          value: initValueForSliders,
          hasError: false,
          min: 0,
          max: 100
        }
      };
    }
    let sumOfValueOfAllPlatforms = 0;
    for (let platform in platforms) {
      sumOfValueOfAllPlatforms += platforms[platform].value;
    }
    if (sumOfValueOfAllPlatforms < 100) {
      if (platforms && !_isEmpty(platforms)) {
        let keysArrayOfPlatforms = Object.keys(platforms);
        let firstItem = platforms[keysArrayOfPlatforms[0]];
        firstItem.value += 100 - Number(sumOfValueOfAllPlatforms || 0);
      }
    }
    if (Array.isArray(percentageSplit) && !_isEmpty(percentageSplit)) {
      for (let platform in platforms) {
        let social_app_id = platforms[platform].social_media_app_id || "";
        let foundPlatform = _find(percentageSplit, [
          "socialAppId",
          social_app_id
        ]);
        if (foundPlatform) {
          platforms[platform] = {
            ...platforms[platform],
            value: _get(foundPlatform, "percentShare", 0),
            url: _get(foundPlatform, "link", "")
          };
        }
      }
    }
    this.setState({
      reviewInvitationPlatformsData: {
        ...reviewInvitationPlatformsData,
        platforms,
        sumOfAllSplits: 100
        // sumOfAllSplits: (countOfPlatforms + social.length) * initValueForSliders
      }
    });
  }

  componentWillUnmount() {
    this.props.setCampaignEditMode({}, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeStep } = this.state;
    const { success, setGetReviewsData } = this.props;
    if (this.props !== prevProps) {
      if (activeStep === 3) {
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

  //Fired on ReviewInvitationPlatforms Slider change event
  handleSliderChange = (e, val, id) => {
    const { reviewInvitationPlatformsData } = this.state;
    const { platforms } = reviewInvitationPlatformsData;
    if (Number(val) || val === "" || val === "0" || val === 0) {
      val = val !== "" ? Number(val) : 0;
      this.setState(
        {
          reviewInvitationPlatformsData: {
            ...reviewInvitationPlatformsData,
            platforms: {
              ...platforms,
              [id]: { ...platforms[id], value: val }
            }
          }
        },
        () => {
          let sumOfAllSplits = 0;
          const platforms = _get(
            this.state,
            "reviewInvitationPlatformsData.platforms",
            {}
          );
          let platformsCopy = { ...platforms };
          for (let item in platforms) {
            if (platforms[item].value !== "") {
              sumOfAllSplits = sumOfAllSplits + platforms[item].value;
              if (sumOfAllSplits > 100) {
                if (platforms[item].value) {
                  platformsCopy = {
                    ...platformsCopy,
                    [item]: { ...platformsCopy[item], hasError: true }
                  };
                }
              } else if (sumOfAllSplits <= 100) {
                platformsCopy = {
                  ...platformsCopy,
                  [item]: { ...platformsCopy[item], hasError: false }
                };
              }
            }
            this.setState({
              reviewInvitationPlatformsData: {
                ...reviewInvitationPlatformsData,
                sumOfAllSplits,
                platforms: { ...platformsCopy }
              }
            });
          }
        }
      );
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
  const campaignLanguage = _get(dashboardData, "parsedCampaignLanguage", [
    {
      name: "English",
      value: "d-be60fd9faf074996b23625429aa1dffd",
      code: "en"
    }
  ]);
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
  const createCampaignData = _get(dashboardData, "createCampaign", {});
  const ecommerceIntegrations = _get(
    auth,
    "logIn.userProfile.business_profile.integrations.ecommerce",
    []
  );
  const social = _get(auth, "logIn.userProfile.business_profile.social", []);
  const googleDirectReviewURL = _get(
    auth,
    "logIn.userProfile.business_profile.google_places.directReviewUrl",
    ""
  );
  const selectedCampaignData = _get(dashboardData, "selectedCampaignData", {});
  const isCampaignEditMode = _get(dashboardData, "isCampaignEditMode", false);
  let percentageSplit = _get(
    selectedCampaignData,
    "campaign_structure.percentageSplit",
    []
  );
  const selectedWay = percentageSplit.length > 1 ? 1 : 0;
  let selectedSinglePlatform = 1;
  // if (selectedWay === 0) {
  //   selectedSinglePlatform = percentageSplit[0].socialAppId;
  // }
  return {
    success,
    campaignLanguage,
    companyName,
    dashboardData,
    selectedEmailLanguage,
    createCampaignData,
    ecommerceIntegrations,
    social,
    googleDirectReviewURL,
    selectedCampaignData,
    isCampaignEditMode,
    selectedWay,
    selectedSinglePlatform
  };
};

export default connect(mapStateToProps, {
  setGetReviewsData,
  sendGetReviews,
  createCampaign,
  fetchEmailTemplate,
  clearCampaignData,
  setCampaignEditMode
})(withStyles(styles)(GetReviews));
