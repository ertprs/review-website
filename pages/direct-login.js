import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { businessLogIn } from "../store/actions/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import _get from "lodash/get";

class DirectLogin extends Component {
  static async getInitialProps({ res, query }) {
    const { token } = query;
    return { token };
  }

  componentDidMount() {
    const { token, businessLogIn, auth } = this.props;
    const type = _get(auth, "type", "");
    //? making sure that it will not get called twice
    if (
      type !== "BUSINESS_LOGIN_INIT" &&
      type !== "BUSINESS_LOGIN_SUCCESS" &&
      type !== "BUSINESS_LOGIN_FAILURE"
    ) {
      //? email and password can be anything
      let reqBody = {
        email: "businessUser@gmail.com",
        password: "businessUser",
        alt: token
      };
      businessLogIn(reqBody);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { logIn, logInTemp } = _get(this.props, "auth", {});
    const isLoginFailed = _get(logInTemp, "isLoginFailed", false);
    const authorized = _get(logIn, "authorized", false);
    const error = _get(logInTemp, "error", "Some Error Occurred!");
    if (this.props.auth !== prevProps.auth) {
      if (isLoginFailed) {
        let snackbarMsg = "";
        snackbarMsg = error;
        this.setState(
          {
            showSnackbar: true,
            variant: "error",
            snackbarMsg
          },
          () => {
            Router.push("/login");
          }
        );
      } else if (authorized === true) {
        this.setState(
          {
            showSnackbar: true,
            variant: "success",
            snackbarMsg: "Logged in successfully!"
          },
          () => {
            Router.push("/dashboard");
          }
        );
      }
    }
  }

  render() {
    return (
      <div className="center">
        <style jsx>{`
          .center {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
        <CircularProgress color="primary" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps, { businessLogIn })(DirectLogin);
