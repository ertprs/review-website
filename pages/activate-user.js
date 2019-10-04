import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { activateUserApi } from "../utility/config";
import Router from "next/router";
import Layout from "../hoc/layout/layout";
import { activateUser } from "../store/actions/authActions";
import { connect } from "react-redux";
import {
  ACTIVATE_USER_INIT,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE
} from "../store/actions/actionTypes";
import CircularProgress from "@material-ui/core/CircularProgress";

class ActivateUser extends Component {
  componentDidMount(prevProps, prevState) {
    const { type, success } = this.props;
    const { activateUser } = this.props;
    const url = window.location.href;
    if (type === ACTIVATE_USER_SUCCESS || type === ACTIVATE_USER_FAILURE) {
      return;
    } else {
      activateUser(url, activateUserApi);
    }
  }

  onLoginClick = () => {
    Router.push("/login");
  };

  showData = () => {
    const { type, success } = this.props;
    let data;

    if (type === ACTIVATE_USER_INIT) {
      data = (
        <div className="card">
          <style jsx> {authenticationPageStyles} </style>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress size={30} color="secondary" />
          </div>
        </div>
      );
    }

    if (!success) {
      data = (
        <div className="card">
          <style jsx> {authenticationPageStyles} </style>
          <div className="cardHeading">
            <h2 style={{ color: "red" }}>Something went wrong!</h2>
          </div>
          <button className="registerBtn" onClick={this.onLoginClick}>
            Go to Login
          </button>
        </div>
      );
    }

    if (type === ACTIVATE_USER_SUCCESS && success) {
      data = (
        <div className="card">
          <style jsx> {authenticationPageStyles} </style>
          <div className="cardHeading">
            <h2 style={{ color: "green" }}>
              {" "}
              Account activated successfully!{" "}
            </h2>{" "}
          </div>
          <button className="registerBtn" onClick={this.onLoginClick}>
            Go to Login
          </button>
        </div>
      );
    }
    return data;
  };

  render() {
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>
              {this.showData()}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const { activateUserTemp } = auth;
  const type = _get(auth, "type", "");
  const success = _get(activateUserTemp, "success", false);
  return { type, success };
};

export default connect(
  mapStateToProps,
  { activateUser }
)(ActivateUser);
