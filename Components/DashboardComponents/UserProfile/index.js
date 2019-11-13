import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import Avatar from "react-avatar";
import styles from "./userProfileStyles";
import Card from "../../MaterialComponents/Card";

class UserProfile extends Component {
  renderAvatar = () => {
    const { userProfile } = this.props;
    const { name } = userProfile;
    return (
      <div className="avatarContainer mt-50">
        <style jsx>{styles}</style>
        <Avatar
          style={{ marginRight: "20px" }}
          name={name || "Not Found"}
          size="150"
          round={true}
        />
      </div>
    );
  };

  createProfileData = () => {
    const { userProfile } = this.props;
    const { name, email, zip, surname, lang, address, city, phone, country } =
      userProfile || {};
    const profileData = [
      { key: "Name", value: name },
      { key: "Email", value: email },
      { key: "Phone", value: "575757575875" },
      { key: "Address", value: "Arjunganj" },
      { key: "City", value: "Lucknow" },
      { key: "Country", value: "India" },
      { key: "Zip", value: "226002" },
      { key: "Language", value: "English" }
    ];
    return profileData;
  };

  renderProfileDetails = () => {
    const profileData = this.createProfileData();
    let halfProductData = Math.floor(profileData.length / 2);
    let profileDataLeft = profileData.splice(0, halfProductData);
    let profileDataRight = profileData.splice(0, profileData.length);
    return (
      <div className="mt-50">
        <style jsx>{styles}</style>
        <Card>
          <h3 className="heading">User Details</h3>
          <div className="row">
            {profileDataLeft.map(data => {
              if (data.value || "") {
                return (
                  <>
                    <div className="col-md-3 textBold">
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
            })}
            {profileDataRight.map(data => {
              if (data.value || "") {
                return (
                  <>
                    <div className="col-md-3 textBold">
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
            })}
          </div>
        </Card>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">{this.renderAvatar()}</div>
          <div className="col-md-8">{this.renderProfileDetails()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userProfile } = state.auth.logIn || {};
  return { userProfile };
};

export default connect(mapStateToProps)(UserProfile);
