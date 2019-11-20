import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import Avatar from "react-avatar";
import styles from "./userProfileStyles";
import countrieslist from "../../../utility/newCountryList.json";
import validate from "../../../utility/validate";
import UpdateIcon from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import Modal from "../../Widgets/CustomModal/CustomModal";
import ImageUpload from "./imageUpload";
import ShowCompany from "./company/showCompany";
import EditCompany from "./company/editCompany";
import ShowUser from "./user/showUser";
import EditUser from "./user/editUser";
import EditDomain from "./domain/editDomain";
import ShowDomain from "./domain/showDomain";
import Snackbar from "../../Widgets/Snackbar";
import Languages from "../../../utility/languages";

class UserProfile extends Component {
  state = {
    userDetails: {
      name: {
        element: "input",
        value: _get(this.props, "userProfile.name", ""),
        placeholder: "Enter your full name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "name"
      },
      city: {
        element: "input",
        value: _get(this.props, "userProfile.city", ""),
        placeholder: "Enter your city",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "city"
      },
      phone: {
        element: "input",
        value: _get(this.props, "userProfile.phone", ""),
        placeholder: "Enter your phone no.",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "phone"
      },
      address: {
        element: "input",
        value: _get(this.props, "userProfile.address", ""),
        placeholder: "Enter your address",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "address"
      },
      zip: {
        element: "input",
        value: _get(this.props, "userProfile.zip", ""),
        placeholder: "Enter your zip code",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "zip"
      },
      country: {
        element: "select",
        name: "country",
        value: _get(this.props, "userProfile.country", ""),
        options: [...countrieslist],
        placeholder: "Select your country",
        valid: false,
        validationRules: {
          required: true
        },
        touched: false,
        errorMessage: ""
      },
      lang: {
        element: "select",
        name: "lang",
        value: _get(this.props, "userProfile.lang", ""),
        options: [...Languages],
        placeholder: "Select your language",
        valid: false,
        validationRules: {
          required: true
        },
        touched: false,
        errorMessage: ""
      }
    },
    companyDetails: {
      name: {
        element: "input",
        value: _get(this.props, "userProfile.company.name", ""),
        placeholder: "Enter your company name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "name"
      },
      regNumber: {
        element: "input",
        value: _get(this.props, "userProfile.company.reg_number", ""),
        placeholder: "Enter reg number",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "regNumber"
      },
      taxNumber: {
        element: "input",
        value: _get(this.props, "userProfile.company.tax_number", ""),
        placeholder: "Enter tax number",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "taxNumber"
      },
      legalAddress: {
        element: "input",
        value: _get(this.props, "userProfile.company.legal_address", ""),
        placeholder: "Enter legal address",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "legalAddress"
      },
      actualAddress: {
        element: "input",
        value: _get(this.props, "userProfile.company.actual_address", ""),
        placeholder: "Enter actual address",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "actualAddress"
      },
      country: {
        element: "select",
        name: "country",
        value: _get(this.props, "userProfile.company.country_id", ""),
        options: [...countrieslist],
        placeholder: "Select your country",
        valid: false,
        validationRules: {
          required: true
        },
        touched: false,
        errorMessage: ""
      },
      description: {
        element: "textarea",
        value: _get(this.props, "userProfile.company.description", ""),
        placeholder: "Enter description",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "description"
      }
    },
    domainDetails: {
      domain: {
        element: "input",
        value: _get(this.props, "domainName", ""),
        placeholder: "Enter domain name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "domain"
      }
    },
    imageFile: [],
    userDetailsEdit: false,
    companyDetailsEdit: false,
    domainDetailsEdit: false,
    showModal: false
  };

  handleCompanyDetailsChange = e => {
    const { value, name } = e.target;
    const { companyDetails } = this.state;
    this.setState({
      companyDetails: {
        ...companyDetails,
        [name]: {
          ...companyDetails[name],
          value,
          valid: validate(value, companyDetails[name].validationRules),
          touched: true
        }
      }
    });
  };

  handleUserDetailsChange = e => {
    const { value, name } = e.target;
    const { userDetails } = this.state;
    this.setState({
      userDetails: {
        ...userDetails,
        [name]: {
          ...userDetails[name],
          value,
          valid: validate(value, userDetails[name].validationRules),
          touched: true
        }
      }
    });
  };

  handleDomainDetailsChange = e => {
    const { value, name } = e.target;
    const { domainDetails } = this.state;
    this.setState({
      domainDetails: {
        ...domainDetails,
        [name]: {
          ...domainDetails[name],
          value,
          valid: validate(value, domainDetails[name].validationRules),
          touched: true
        }
      }
    });
  };

  renderAvatar = () => {
    const { userProfile } = this.props;
    const { imageFile } = this.state;
    const name = _get(userProfile, "name", "");

    return (
      <>
        <div className="avatarContainer mt-50">
          <style jsx>{styles}</style>
          <div className="row">
            <div className="col-md-12">
              <Avatar
                style={{ marginRight: "20px" }}
                name={name || "Not Found"}
                size="150"
                round={true}
              />
            </div>
          </div>
          {/* <div className="row mt-20">
            <div className="col-md-12">
              <Button
                onClick={() => {
                  this.setState({ showModal: true });
                }}
                startIcon={<UpdateIcon />}
              >
                Update Avatar
              </Button>
            </div>
          </div> */}
        </div>
      </>
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      successCompany,
      errorMsgCompany,
      successUser,
      errorMsgUser,
      successDomain,
      errorMsgDomain
    } = this.props;
    if (this.props !== prevProps) {
      if (
        successCompany === true ||
        successUser === true ||
        successDomain === true
      ) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Data Updated Successfully!"
        });
      } else if (
        successCompany === false ||
        successUser === false ||
        successDomain === false
      ) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: errorMsgCompany || errorMsgUser || errorMsgDomain
        });
      }
    }
  }

  render() {
    const {
      userDetailsEdit,
      companyDetailsEdit,
      domainDetailsEdit,
      showModal,
      companyDetails,
      userDetails,
      domainDetails,
      showSnackbar,
      variant,
      snackbarMsg
    } = this.state;
    const { userProfile, domainName } = this.props;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3">{this.renderAvatar()}</div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12">
                  {domainDetailsEdit ? (
                    <EditDomain
                      domainDetails={domainDetails || {}}
                      handleChange={this.handleDomainDetailsChange}
                      closeEditMode={() => {
                        this.setState({ domainDetailsEdit: false });
                      }}
                    />
                  ) : (
                    <ShowDomain
                      domainName={domainName}
                      handleEditClick={() => {
                        this.setState({ domainDetailsEdit: true });
                      }}
                    />
                  )}
                </div>
                <div className="col-md-12">
                  {userDetailsEdit ? (
                    <EditUser
                      userDetails={userDetails || {}}
                      handleChange={this.handleUserDetailsChange}
                      closeEditMode={() => {
                        this.setState({ userDetailsEdit: false });
                      }}
                    />
                  ) : (
                    <ShowUser
                      userProfile={userProfile || {}}
                      handleEditClick={() => {
                        this.setState({ userDetailsEdit: true });
                      }}
                    />
                  )}
                </div>
                <div className="col-md-12">
                  {companyDetailsEdit ? (
                    <EditCompany
                      companyDetails={companyDetails}
                      handleChange={this.handleCompanyDetailsChange}
                      closeEditMode={() => {
                        this.setState({ companyDetailsEdit: false });
                      }}
                      handleSaveClick={() => {
                        this.setState({ companyDetailsEdit: false });
                      }}
                      handleCancelClick={() => {
                        this.setState({ companyDetailsEdit: false });
                      }}
                    />
                  ) : (
                    <ShowCompany
                      userProfile={userProfile || {}}
                      handleEditClick={() => {
                        this.setState({ companyDetailsEdit: true });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          showModal={showModal}
          handleModalClose={() => {
            this.setState({ showModal: false });
          }}
          modalCustomStyles={{
            background: "#f9f9f9",
            border: "1px solid #fff"
          }}
        >
          <ImageUpload
            onUpload={imageFile => {
              this.setState({ imageFile, showModal: false });
            }}
          />
        </Modal>
        <Snackbar
          open={showSnackbar}
          variant={variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={snackbarMsg}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { userProfile } = state.auth.logIn || {};
  const domainName = _get(userProfile, "business_profile.domain", "");

  const companyDetails = _get(state, "dashboardData.companyDetails", {});
  const isLoadingCompany = _get(companyDetails, "isLoading", false);
  const successCompany = _get(companyDetails, "success", "undefined");
  const errorMsgCompany = _get(companyDetails, "errorMsg", "");

  const userDetails = _get(state, "dashboardData.userDetails", {});
  const isLoadingUser = _get(userDetails, "isLoading", false);
  const successUser = _get(userDetails, "success", "undefined");
  const errorMsgUser = _get(userDetails, "errorMsg", "");

  const domainDetails = _get(state, "dashboardData.domainDetails", {});
  const isLoadingDomain = _get(domainDetails, "isLoading", false);
  const successDomain = _get(domainDetails, "success", "undefined");
  const errorMsgDomain = _get(domainDetails, "errorMsg", "");

  return {
    userProfile,
    isLoadingCompany,
    successCompany,
    errorMsgCompany,
    isLoadingUser,
    successUser,
    errorMsgUser,
    isLoadingDomain,
    successDomain,
    errorMsgDomain,
    domainName
  };
};

export default connect(mapStateToProps)(UserProfile);
