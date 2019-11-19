import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import Avatar from "react-avatar";
import styles from "./userProfileStyles";
import Card from "../../MaterialComponents/Card";
import countrieslist from "../../../utility/newCountryList.json";
import FormField from "../../Widgets/FormField/FormField";
import validate from "../../../utility/validate";
import SaveIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/CloseRounded";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import UpdateIcon from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import Modal from "../../Widgets/CustomModal/CustomModal";
import ImageUpload from "./imageUpload";

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
      email: {
        element: "input",
        value: _get(this.props, "userProfile.email", ""),
        placeholder: "username@email.com",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "email"
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
      reg_number: {
        element: "input",
        value: _get(this.props, "userProfile.company.reg_number", ""),
        placeholder: "Enter tax number",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          minLength: 5
        },
        name: "reg_number"
      },
      tax_number: {
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
        name: "tax_number"
      },
      legal_address: {
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
        name: "legal_address"
      },
      actual_address: {
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
        name: "actual_address"
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
    imageFile: [],
    userDetailsEdit: false,
    companyDetailsEdit: false,
    showModal: false
  };

  handleChange = (e, id) => {
    const { value } = e.target;
    const { formData } = this.state;
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

  renderAvatar = () => {
    const { userProfile } = this.props;
    const { imageFile } = this.state;
    const { name } = userProfile;

    return (
      <>
        <div className="avatarContainer mt-50">
          <style jsx>{styles}</style>
          <div className="row">
            <div className="col-md-12">
              {imageFile.length > 0 ? (
                <img src={imageFile[0].path} />
              ) : (
                <Avatar
                  style={{ marginRight: "20px" }}
                  name={name || "Not Found"}
                  size="150"
                  round={true}
                />
              )}
            </div>
          </div>
          <div className="row mt-20">
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
          </div>
        </div>
      </>
    );
  };

  mapOverArray = array => {
    return array.map(data => {
      if (data.value || "") {
        return (
          <>
            <div className="col-md-3 textBold">
              <style jsx>{styles}</style>
              <p>{data.key}</p>
            </div>
            <div className="col-md-3">
              <p className="value">{data.value}</p>
            </div>
          </>
        );
      } else {
        return null;
      }
    });
  };

  userDetailsData = () => {
    const { userProfile } = this.props;
    const { name, email, phone, country } = userProfile || {};
    const userDetails = [
      { key: "Name", value: name },
      { key: "Email", value: email },
      { key: "Phone", value: "575757575875" },
      { key: "Country", value: "India" }
    ];
    return userDetails;
  };

  renderUserDetails = () => {
    const userData = this.userDetailsData();
    let halfUserData = Math.floor(userData.length / 2);
    let userDataLeft = userData.splice(0, halfUserData);
    let userDataRight = userData.splice(0, userData.length);
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <Card>
          <div className="cardHeader">
            <h3 className="heading">User Details</h3>
            <Tooltip title={"Edit"} placement="top-end">
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setState({ userDetailsEdit: true });
                }}
              />
            </Tooltip>
          </div>
          <div className="row">
            {this.mapOverArray(userDataLeft)}
            {this.mapOverArray(userDataRight)}
          </div>
        </Card>
      </div>
    );
  };

  renderUserDetailsEdit = () => {
    const { userDetails } = this.state;
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <Card>
          <div className="cardHeader">
            <h3 className="heading">Edit User Details</h3>
            <div>
              <Tooltip title={"Cancel"} placement="top">
                <CancelIcon
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ userDetailsEdit: false });
                  }}
                />
              </Tooltip>
              <Tooltip title={"Save"} placement="top">
                <SaveIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ userDetailsEdit: false });
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <>
            <div className="row">
              <div className="col-md-6">
                <FormField
                  {...userDetails.name}
                  handleChange={this.handleChange}
                  id="name"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)"
                  }}
                />
              </div>
              <div className="col-md-6">
                <FormField
                  {...userDetails.email}
                  handleChange={this.handleChange}
                  id="email"
                  disabled
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)"
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormField
                  {...userDetails.phone}
                  handleChange={this.handleChange}
                  onkeyDown={this.handleKeyDown}
                  id="phone"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)"
                  }}
                />
              </div>
              <div className="col-md-6">
                <FormField
                  {...userDetails.country}
                  handleChange={this.handleChange}
                  id="country"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)",
                    height: "38px"
                  }}
                />
              </div>
            </div>
          </>
        </Card>
      </div>
    );
  };

  companyDetailsData = () => {
    const { company } = this.props.userProfile || {};

    const {
      name,
      reg_number,
      tax_number,
      legal_address,
      actual_address,
      description,
      country
    } = company || {};
    const companyDetails = [
      { key: "Name", value: name },
      { key: "Registration Number", value: "email" },
      { key: "Tax Number", value: "575757575875" },
      { key: "Legal Address", value: "Arjunganj" },
      { key: "Actual Address", value: "Lucknow" },
      { key: "Description", value: "226002" },
      { key: "Country", value: "India" }
    ];
    return companyDetails;
  };

  renderCompanyDetails = () => {
    const companyData = this.companyDetailsData();
    let halfCompanyData = Math.floor(companyData.length / 2);
    let companyDataLeft = companyData.splice(0, halfCompanyData);
    let companyDataRight = companyData.splice(0, companyData.length);
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <div className="cardHeader">
          <h3 className="heading">Company Details</h3>
          <Tooltip title={"Edit"} placement="top-end">
            <EditIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.setState({ companyDetailsEdit: true });
              }}
            />
          </Tooltip>
        </div>
        <Card>
          <div className="row">
            {this.mapOverArray(companyDataLeft)}
            {this.mapOverArray(companyDataRight)}
          </div>
        </Card>
      </div>
    );
  };

  renderCompanyDetailsEdit = () => {
    const { companyDetails } = this.state;
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <Card>
          <div className="cardHeader">
            <h3 className="heading">Edit Company Details</h3>
            <div>
              <Tooltip title={"Cancel"} placement="top">
                <CancelIcon
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ companyDetailsEdit: false });
                  }}
                />
              </Tooltip>
              <Tooltip title={"Save"} placement="top">
                <SaveIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.setState({ companyDetailsEdit: false });
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <>
            <div className="row">
              <div className="col-md-6">
                <FormField
                  {...companyDetails.name}
                  handleChange={this.handleChange}
                  id="name"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#ced4da"
                  }}
                />
              </div>
              <div className="col-md-6">
                <FormField
                  {...companyDetails.reg_number}
                  handleChange={this.handleChange}
                  id="email"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#ced4da"
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormField
                  {...companyDetails.tax_number}
                  handleChange={this.handleChange}
                  onkeyDown={this.handleKeyDown}
                  id="phone"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#ced4da"
                  }}
                />
              </div>
              <div className="col-md-6">
                <FormField
                  {...companyDetails.legal_address}
                  handleChange={this.handleChange}
                  id="country"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "#ced4da",
                    height: "38px"
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormField
                  {...companyDetails.actual_address}
                  handleChange={this.handleChange}
                  onkeyDown={this.handleKeyDown}
                  id="phone"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)"
                  }}
                />
              </div>
              <div className="col-md-6">
                <FormField
                  {...companyDetails.description}
                  handleChange={this.handleChange}
                  id="country"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)",
                    height: "38px"
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormField
                  {...companyDetails.country}
                  handleChange={this.handleChange}
                  id="country"
                  styles={{
                    borderWidth: "0px 0px 1px 0px",
                    borderStyle: "solid",
                    borderColor: "rgb(206, 212, 218)",
                    height: "38px"
                  }}
                />
              </div>
            </div>
          </>
        </Card>
      </div>
    );
  };

  render() {
    const { userDetailsEdit, companyDetailsEdit, showModal } = this.state;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-4">{this.renderAvatar()}</div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  {userDetailsEdit
                    ? this.renderUserDetailsEdit()
                    : this.renderUserDetails()}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {companyDetailsEdit
                    ? this.renderCompanyDetailsEdit()
                    : this.renderCompanyDetails()}
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
      </>
    );
  }
}

const mapStateToProps = state => {
  const { userProfile } = state.auth.logIn || {};
  return { userProfile };
};

export default connect(mapStateToProps)(UserProfile);
