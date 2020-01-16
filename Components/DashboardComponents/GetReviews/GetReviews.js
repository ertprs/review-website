import React, { Component } from "react";
//? Own component imports
import CustomSteppers from "../../MaterialComponents/CustomSteppers";
import EditableTable from "../../MaterialComponents/EditableTable";
import validate from "../../../utility/validate";
import { getEmailTemplateData } from "../../../utility/emailTemplates/emailTemplates";
import { isFifteenMinuteDiff } from "../../../utility/commonFunctions";
import UploadCSVForm from "../GetReviewsForms/UploadCSVForm";
//? Library imports
import { Grid, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { sumBy, filter, isEmpty, findIndex, find, get, unionBy } from "lodash";
import Papa from "papaparse";
import moment from "moment";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { isValidArray } from "../../../utility/commonFunctions";
const CreateCampaign = dynamic(
  () => import("../GetReviewsForms/CreateCampaign"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const CampaignIntro = dynamic(
  () => import("../GetReviewsForms/CampaignIntro/CampaignIntro"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const CampaignScheduleAutomatic = dynamic(
  () => import("../GetReviewsForms/CampaignScheduleAutomatic"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const InvitationWays = dynamic(
  () => import("../GetReviewsForms/InvitationWays"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const Done = dynamic(() => import("../GetReviewsForms/Done"), {
  loading: () => (
    <div className="dynamicImport">
      <p>Loading.....</p>
    </div>
  )
});
const CopyPasteForm = dynamic(
  () => import("../GetReviewsForms/CopyPasteForm"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const SenderInfo = dynamic(
  () => import("../GetReviewsForms/SenderInfo/SenderInfo"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const SelectTemplateForm = dynamic(
  () => import("../GetReviewsForms/SelectTemplateForm"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const SendInvitations = dynamic(
  () => import("../GetReviewsForms/SendInvitations"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const AddInvitesForm = dynamic(
  () => import("../../DashboardComponents/GetReviewsForms/AddInvitesForm"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const ReviewInvitationPlatforms = dynamic(
  () => import("../GetReviewsForms/ReviewInvitationPlatforms"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);

const CampaignSchedule = dynamic(
  () => import("../GetReviewsForms/CampaignSchedule"),
  {
    loading: () => (
      <div className="dynamicImport">
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
        platforms: [],
        sumOfAllSplits: 0,
        selectionWays: [
          { id: 0, label: "Use only one review platform" },
          { id: 1, label: "Use multiple review platforms" }
        ],
        selectedWay: get(this.props, "selectedWay", -1),
        selectedSinglePlatform: get(this.props, "selectedSinglePlatform", "")
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
          value: get(
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
            get(
              this.props,
              "selectedCampaignData.campaign_structure.template_vars.Entity",
              ""
            ) || get(this.props, "companyName", " ") + " ",
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
          value: get(
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
          value: get(
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
          value: get(this.props, "selectedCampaignData.name", ""),
          placeholder: "Enter campaign name",
          errorMessage: "",
          valid: get(this.props, "selectedCampaignData.name", "")
            ? true
            : false,
          touched: false,
          validationRules: {
            required: true,
            minLength: 4
          },
          name: "campaignName"
        },
        campaignLanguage: {
          element: "select",
          value: get(this.props, "selectedCampaignData.template_id", ""),
          code: "",
          options: get(this.props, "campaignLanguage", []),
          placeholder: "Select your campaign language",
          errorMessage: "",
          valid: get(this.props, "selectedCampaignData.template_id", "")
            ? true
            : false,
          touched: false,
          validationRules: {
            required: true
          },
          name: "campaignLanguage"
        },
        senderName: {
          element: "input",
          value: get(
            this.props,
            "selectedCampaignData.campaign_structure.senderName",
            ""
          ),
          placeholder: "Enter sender's name",
          errorMessage: "",
          valid: get(
            this.props,
            "selectedCampaignData.campaign_structure.senderName",
            ""
          )
            ? true
            : false,
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
          valid: (get(this.props, "isCampaignEditMode", false)
          ? "automatic"
          : "")
            ? true
            : false,
          value: get(this.props, "isCampaignEditMode", false)
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
      campaignScheduleAutomatic: {
        value: "",
        valid: false,
        validationRules: {
          required: true
        }
      },
      selectedPlatform: get(this.props, "selectedCampaignData.type_id", "")
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
          templateId={get(
            this.state,
            "createCampaign.campaignLanguage.value",
            ""
          )}
        />
      ),

      4: (
        <x
          formData={this.state.selectTemplateData}
          templateId={get(
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
          formattedDate: moment(new Date(date)).format(),
          isValid: valid,
          touched: true
        }
      });
    }
    console.log(isFifteenMinuteDiff(date), "valid");
    console.log(moment(new Date(date)).format(), "date_with_timestamp");
  };

  parseFileData = async () => {
    const { uploadCSVFormData } = this.state;
    const file = get(uploadCSVFormData, "csvFile.file", "");
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
    const platforms = get(reviewInvitationPlatformsData, "platforms", []);
    //? here selectedWay = 0 means single platform and 1 means multiple platform
    const selectedWay = get(reviewInvitationPlatformsData, "selectedWay", "");
    const selectedSinglePlatform = get(
      reviewInvitationPlatformsData,
      "selectedSinglePlatform",
      0
    );
    if (selectedWay === 0) {
      const selectedSinglePlatformData =
        find(platforms, ["social_media_app_id", selectedSinglePlatform]) ||
        find(platforms, ["social_app_id", selectedSinglePlatform]);
      let percentShare = 0;
      let socialAppId = 0;
      let link = "";
      if (selectedSinglePlatformData) {
        return [
          {
            percentShare: 100,
            socialAppId: selectedSinglePlatform,
            link: get(selectedSinglePlatformData, "url", "")
          }
        ];
      }
    } else if (selectedWay === 1) {
      let platformsArrayWhoseValueIsGreaterThanZero = filter(
        platforms,
        platform => {
          return platform.value > 0;
        }
      );
      let splitPercentage = (
        platformsArrayWhoseValueIsGreaterThanZero || 0
      ).map(platform => {
        return {
          socialAppId:
            get(platform, "social_media_app_id", 0) ||
            get(platform, "social_app_id", 0),
          percentShare: get(platform, "value", ""),
          link: get(platform, "url", "")
        };
      });

      return [...splitPercentage];
    }
    return [];
  };

  createCampaignHandler = sendTest => {
    const {
      createCampaign,
      ecommerceIntegrations,
      isCampaignEditMode,
      selectedCampaignData
    } = this.props;
    const {
      selectTemplateData,
      tableData,
      selectedPlatform,
      campaignSchedule,
      campaignScheduleAutomatic
    } = this.state;
    const campaign = get(this.state, "createCampaign", {});
    const campaignName = get(campaign, "campaignName.value", "");
    const senderName = get(campaign, "senderName.value", "");
    const senderEmail = get(campaign, "senderEmail.value", "");
    const clientName = get(selectTemplateData, "clientName.value", "");
    const Entity = get(selectTemplateData, "entity.value", "");
    const exampleText = get(selectTemplateData, "exampleText.value");
    const leaveReviewText = get(selectTemplateData, "leaveReviewText.value");
    const percentageSplit = this.generatePercentageSplitData();
    const selectedDate = get(campaignSchedule, "selectedDate", "");
    const formattedDate = get(campaignSchedule, "formattedDate", "");
    const sendAfterMinutes = get(campaignScheduleAutomatic, "value", "");
    const subject = get(selectTemplateData, "subject.value", "");
    let omittedTableData = tableData.map(data => {
      return _omit(data, ["tableData"]);
    });
    let shopId = "";
    if (ecommerceIntegrations) {
      if (
        Array.isArray(ecommerceIntegrations) &&
        !isEmpty(ecommerceIntegrations)
      ) {
        let foundPlatform = find(ecommerceIntegrations, [
          "type_id",
          selectedPlatform
        ]);
        if (foundPlatform) {
          shopId = get(foundPlatform, "id", "");
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
        id: get(
          this.state,
          "createCampaign.campaignLanguage.value",
          "d-be60fd9faf074996b23625429aa1dffd"
        ),
        vars: {
          clientName,
          Entity,
          exampleText,
          leaveReviewText,
          subject
        }
      }
    };
    if (selectedDate && formattedDate) {
      data = {
        ...data,
        campaign: { ...data.campaign, startAt: formattedDate }
      };
    }
    if (get(campaign, "campaignInvitationMethod.value", "") === "automatic") {
      data = {
        ...data,
        shop: shopId
      };
    }
    if (
      get(campaign, "campaignInvitationMethod.value", "") === "automatic" &&
      sendAfterMinutes
    ) {
      data = {
        ...data,
        campaign: { ...data.campaign, sendAfterMinutes: sendAfterMinutes }
      };
    }
    if (sendTest === "sendTest") {
      data = {
        ...data,
        test: true
      };
    }
    if (isCampaignEditMode) {
      let id = get(selectedCampaignData, "id", "");
      data = {
        ...data,
        campaign: {
          ...data.campaign,
          id
        }
      };
    }
    createCampaign(data);
  };

  handleBack = () => {
    const { activeStep, createCampaign } = this.state;
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
      // fetchEmailTemplate(value);
      const selectedCampaignLang = filter(
        get(this.props, "campaignLanguage", []),
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
                  get(this.state, "createCampaign.campaignLanguage.value", ""),
                  "exampleText",
                  get(this.props, "companyName", "")
                )
              },
              leaveReviewText: {
                ...get(this.state, "selectTemplateData.leaveReviewText", ""),
                value: getEmailTemplateData(
                  get(this.state, "createCampaign.campaignLanguage.value", ""),
                  "leaveReviewText",
                  get(this.props, "companyName", "")
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
    const { isCampaignEditMode } = this.props;
    const selectedInvitationMethod = get(
      createCampaign,
      "campaignInvitationMethod.value",
      ""
    );
    if (activeStep === 0) {
      if (getReviewsActiveSubStep === -2) {
        if (isCampaignEditMode) {
          this.setState({ getReviewsActiveSubStep: -1 });
        }
        return (
          <CampaignIntro
            handleCampaignCreationClick={() => {
              this.setState({ getReviewsActiveSubStep: -1 });
            }}
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
          />
        );
      } else if (getReviewsActiveSubStep === -1) {
        return (
          <CreateCampaign
            handleListItemClick={this.handleListItemClick}
            formData={this.state.createCampaign}
            handleChange={this.handleChange}
            onContinueClick={() => {
              this.setState({ getReviewsActiveSubStep: 0 });
            }}
            isCampaignEditMode={get(this.props, "isCampaignEditMode", false)}
            onBackClick={() => {
              this.setState({ getReviewsActiveSubStep: -2 });
            }}
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
            navigateToCampaignManagement={() =>
              this.props.navigateToCampaignManagement()
            }
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
            invitationWayToRender={get(
              this.state,
              "createCampaign.campaignInvitationMethod.value",
              ""
            )}
            setSelectedPlatform={selectedPlatform => {
              this.setState({ selectedPlatform });
            }}
            selectedPlatform={get(this.state, "selectedPlatform", "")}
            campaignLanguage={get(
              this.state,
              "createCampaign.campaignLanguage.code",
              "en"
            )}
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
            navigateToCampaignManagement={() =>
              this.props.navigateToCampaignManagement()
            }
            isCampaignEditMode={get(this.props, "isCampaignEditMode", false)}
          />
        );
      } else if (getReviewsActiveSubStep === 1) {
        return (
          <UploadCSVForm
            handleListItemBackClick={this.handleListItemBackClick}
            ref={this.fileInput}
            handleChange={this.handleChange}
            formData={this.state.uploadCSVFormData}
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
          />
        );
      } else if (getReviewsActiveSubStep === 2) {
        return (
          <CopyPasteForm
            formData={this.state.copyPasteFormData}
            handleChange={this.handleChange}
            handleParseBtnClick={this.handleParseBtnClick}
            handleListItemBackClick={this.handleListItemBackClick}
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
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
              tableData={get(this.state, "tableData", [])}
              handleListItemBackClick={this.handleListItemBackClick}
              scrollToTopOfThePage={this.props.scrollToTopOfThePage}
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
              sumOfAllSplits={get(
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
              scrollToTopOfThePage={this.props.scrollToTopOfThePage}
              navigateToCampaignManagement={() =>
                this.props.navigateToCampaignManagement()
              }
              isCampaignEditMode={get(this.props, "isCampaignEditMode", false)}
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
          templateId={get(
            this.state,
            "createCampaign.campaignLanguage.value",
            ""
          )}
          scrollToTopOfThePage={this.props.scrollToTopOfThePage}
          navigateToCampaignManagement={() =>
            this.props.navigateToCampaignManagement()
          }
          isCampaignEditMode={get(this.props, "isCampaignEditMode", false)}
        />
      );
    }
    if (activeStep === 2) {
      if (selectedInvitationMethod === "automatic") {
        return (
          <CampaignScheduleAutomatic
            handleNext={this.handleNext}
            handleBack={this.handleBack}
            campaignScheduleAutomaticData={this.state.campaignScheduleAutomatic}
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
            handleChange={val => {
              this.setState({
                campaignScheduleAutomatic: {
                  ...this.state.campaignScheduleAutomatic,
                  value: val,
                  valid: validate(
                    val,
                    this.state.campaignScheduleAutomatic.validationRules
                  )
                }
              });
            }}
          />
        );
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
            scrollToTopOfThePage={this.props.scrollToTopOfThePage}
          />
        );
      }
    }
    if (activeStep === 3) {
      return (
        <SendInvitations
          formData={this.state.selectTemplateData}
          templateId={get(
            this.state,
            "createCampaign.campaignLanguage.value",
            ""
          )}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          scrollToTopOfThePage={this.props.scrollToTopOfThePage}
          navigateToCampaignManagement={() =>
            this.props.navigateToCampaignManagement()
          }
          isCampaignEditMode={get(this.props, "isCampaignEditMode", false)}
        />
      );
    }
    if (activeStep === 4) {
      return (
        <Done
          changeStepToRender={this.props.changeStepToRender}
          scrollToTopOfThePage={this.props.scrollToTopOfThePage}
          handleInviteMoreClick={() => {
            this.setState({
              activeStep: 0,
              getReviewsActiveSubStep: -2,
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
                  options: get(this.props, "campaignLanguage", [
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
              },
              campaignSchedule: {
                selectedDate: null,
                formattedDate: "",
                isValid: false,
                touched: false,
                errorMessage:
                  "Scheduled time must be atleast 15 minutes or more from now (current time - in 24hrs format), if you want to send campaigns immediately, please choose the first option."
              },
              campaignScheduleAutomatic: {
                value: "",
                valid: false,
                validationRules: {
                  required: true
                }
              }
            });
          }}
        />
      );
    }
  };

  componentDidMount() {
    //Setting dynamic state on MOUNTING for ReviewInvitationPlatform
    this.props.scrollToTopOfThePage();
    const { configuredReviewPlatforms, percentageSplit } = this.props;
    let configuredReviewPlatformsCopy = [];
    //! In edit mode we will get percentageSplit for review invitation platforms else we'll initialize percentage split by dividing with no of platforms
    if (isValidArray(percentageSplit)) {
      configuredReviewPlatformsCopy = (configuredReviewPlatforms || []).map(
        platform => {
          let foundPlatform =
            find(percentageSplit, [
              "socialAppId",
              get(platform, "social_media_app_id", 0)
            ]) ||
            find(percentageSplit, [
              "socialAppId",
              get(platform, "social_app_id", 0)
            ]);
          return {
            ...platform,
            value: get(foundPlatform, "percentShare", 0)
          };
        }
      );
    } else if (isValidArray(configuredReviewPlatforms)) {
      const noOfPlatforms = (configuredReviewPlatforms || []).length;
      let platformInitialValue = Math.floor(100 / noOfPlatforms);
      const sumOfAllPlatforms = platformInitialValue * noOfPlatforms;
      configuredReviewPlatformsCopy = (configuredReviewPlatforms || []).map(
        platform => {
          return {
            ...platform,
            value: platformInitialValue,
            hasError: false,
            min: 0,
            max: 100
          };
        }
      );
      if (sumOfAllPlatforms < 100) {
        configuredReviewPlatformsCopy[0] = {
          ...configuredReviewPlatformsCopy[0],
          value:
            configuredReviewPlatformsCopy[0].value + (100 - sumOfAllPlatforms)
        };
      }
    }
    this.setState({
      reviewInvitationPlatformsData: {
        ...this.state.reviewInvitationPlatformsData,
        platforms: configuredReviewPlatformsCopy,
        sumOfAllSplits: 100
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
  handleSliderChange = (value, index) => {
    const { reviewInvitationPlatformsData } = this.state;
    if (Number(value) || value === "" || value === "0" || value === 0) {
      value = value !== "" ? Number(value) : 0;
      let uniqueReviewPlatformsCopy = get(
        reviewInvitationPlatformsData,
        "platforms",
        []
      );
      uniqueReviewPlatformsCopy[index] = {
        ...uniqueReviewPlatformsCopy[index],
        value
      };
      const sumOfAllSplits = sumBy(uniqueReviewPlatformsCopy, "value");
      if (sumOfAllSplits > 100) {
        uniqueReviewPlatformsCopy[index] = {
          ...uniqueReviewPlatformsCopy[index],
          hasError: true
        };
      } else {
        uniqueReviewPlatformsCopy = (uniqueReviewPlatformsCopy || []).map(
          platform => {
            return {
              ...platform,
              hasError: false
            };
          }
        );
      }
      this.setState({
        reviewInvitationPlatformsData: {
          ...this.state.reviewInvitationPlatformsData,
          platforms: uniqueReviewPlatformsCopy,
          sumOfAllSplits
        }
      });
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
  const companyName = get(
    auth,
    "logIn.userProfile.company.name",
    "companyName"
  );
  const ecommerceIntegrations = get(
    auth,
    "logIn.userProfile.business_profile.integrations.ecommerce",
    []
  );
  const configuredReviewPlatforms = get(
    auth,
    "logIn.userProfile.business_profile.configured_platforms",
    []
  );
  const campaignLanguage = get(dashboardData, "parsedCampaignLanguage", [
    {
      name: "English",
      value: "d-be60fd9faf074996b23625429aa1dffd",
      code: "en"
    }
  ]);

  const selectedEmailLanguage = get(
    dashboardData,
    "emailTemplate.template.id",
    ""
  );
  const success = get(dashboardData, "createCampaign.success", "undefined");
  const createCampaignData = get(dashboardData, "createCampaign", {});
  const selectedCampaignData = get(dashboardData, "selectedCampaignData", {});
  const isCampaignEditMode = get(dashboardData, "isCampaignEditMode", false);
  let percentageSplit = get(
    selectedCampaignData,
    "campaign_structure.percentageSplit",
    []
  );
  const selectedWay = percentageSplit.length > 1 ? 1 : 0;
  let selectedSinglePlatform = "";
  if (percentageSplit.length > 0) {
    selectedSinglePlatform = percentageSplit[0].socialAppId;
  }
  return {
    success,
    campaignLanguage,
    companyName,
    dashboardData,
    selectedEmailLanguage,
    createCampaignData,
    ecommerceIntegrations,
    selectedCampaignData,
    selectedWay,
    selectedSinglePlatform,
    isCampaignEditMode,
    configuredReviewPlatforms
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
