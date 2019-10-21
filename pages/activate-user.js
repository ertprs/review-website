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
import PageLoader from "../Components/Widgets/PageLoader";
import axios from "axios";
import { setUserActivated } from "../store/actions/authActions";
class ActivateUser extends Component {
  componentDidMount() {
    const { success, setUserActivated, type } = this.props;
    if (type !== "SET_USER_ACTIVATED") {
      setUserActivated(success);
      return;
    } else return;
  }

  onLoginClick = () => {
    Router.push("/login");
  };

  showData = () => {
    const { type, success } = this.props;
    console.log(success, "success inside render");
    let data;

    // if (type === ACTIVATE_USER_INIT) {
    //   data = (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center"
    //       }}
    //     >
    //       <CircularProgress size={30} color="secondary" />
    //     </div>
    //   );
    // }

    // if (
    //   !success &&
    //   (type === ACTIVATE_USER_SUCCESS || type === ACTIVATE_USER_FAILURE)
    // ) {
    //   data = (
    //     <>
    //       <div className="cardHeading">
    //         <style jsx> {authenticationPageStyles} </style>

    //         <h2 style={{ color: "#f9821b" }}>
    //           Your account is already activated!
    //         </h2>
    //       </div>
    //       <button className="registerBtn" onClick={this.onLoginClick}>
    //         Go to Login
    //       </button>
    //     </>
    //   );
    // }

    // if (type === ACTIVATE_USER_SUCCESS && success) {
    //   data = (
    //     <>
    //       <div className="cardHeading">
    //         <style jsx> {authenticationPageStyles} </style>
    //         <h2 style={{ color: "green" }}>
    //           {" "}
    //           Your account has been activated successfully!{" "}
    //         </h2>{" "}
    //       </div>
    //       <button className="registerBtn" onClick={this.onLoginClick}>
    //         Go to Login
    //       </button>
    //     </>
    //   );
    // }

    if (success === true) {
      data = (
        <>
          <div className="cardHeading">
            <style jsx> {authenticationPageStyles} </style>
            <h2 style={{ color: "green" }}>
              {" "}
              Your account has been activated successfully!{" "}
            </h2>{" "}
          </div>
          <button className="registerBtn" onClick={this.onLoginClick}>
            Go to Login
          </button>
        </>
      );
    } else if (success === false) {
      data = (
        <>
          <div className="cardHeading">
            <style jsx> {authenticationPageStyles} </style>

            <h2 style={{ color: "#f9821b" }}>
              Your account is already activated!
            </h2>
          </div>
          <button className="registerBtn" onClick={this.onLoginClick}>
            Go to Login
          </button>
        </>
      );
    }
    return data;
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const { success, setUserActivated } = this.props;
  //   if (this.props !== prevProps) {
  //     console.log(success, "success inside cdu");
  //     setUserActivated(success);
  //   }
  // }

  render() {
    const { isLoading } = this.props;
    return (
      <>
        <Layout>
          <div className="mainContainer">
            <div className="container">
              <div className="col-md-6 offset-md-3">
                <style jsx> {authenticationPageStyles} </style>
                <div className="card">{this.showData()}</div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

ActivateUser.getInitialProps = async ({ query, reduxStore }) => {
  const { token } = query;
  if (token) {
    axios
      .get(`${process.env.BASE_URL}${activateUserApi}/${query.token}`)
      .then(res => {
        let success = _get(res, "data.success", false);
        return { success };
      })
      .catch(error => {
        let success = _get(error, "response.data.success", false);
        return { success };
      });
  }
  return {};
};

const mapStateToProps = state => {
  const { auth } = state;
  const { activateUserTemp } = auth;
  const type = _get(auth, "type", "");
  const success = _get(activateUserTemp, "success", false);
  const isLoading = _get(activateUserTemp, "isLoading", "undefined");
  return { type, success, isLoading };
};

export default connect(
  mapStateToProps,
  { setUserActivated }
)(ActivateUser);
