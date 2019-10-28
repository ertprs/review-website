import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { activateUserApi } from "../utility/config";
import Layout from "../hoc/layout/layout";
import { connect } from "react-redux";
import axios from "axios";
import { setUserActivated } from "../store/actions/authActions";
import Router from "next/router";

class ActivateUser extends Component {
  componentDidMount() {
    const { success, setUserActivated, type } = this.props;
    if (type !== "SET_USER_ACTIVATED") {
      setUserActivated(success);
      setTimeout(() => {
        Router.push("/dashboard");
      }, 2000);
      return;
    } else return;
  }

  showData = () => {
    const { success } = this.props;
    let data;
    console.log(success, "success inside showData");
    if (success === true) {
      data = <></>;
    } else if (success === false) {
      data = <></>;
    }
    return data;
  };

  render() {
    const { success } = this.props;
    console.log(success, "success inside render");
    return (
      <>
        <Layout>
          <div className="mainContainer">
            <div className="container">
              <div className="col-md-6 offset-md-3">
                <style jsx> {authenticationPageStyles} </style>
                <div className="card">
                  {success === true ? (
                    <div className="cardHeading">
                      <h2 style={{ color: "green" }}>
                        Your account has been activated successfully!
                      </h2>
                    </div>
                  ) : (
                    <div className="cardHeading">
                      <h2 style={{ color: "#f9821b" }}>
                        Your account is already activated!
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

ActivateUser.getInitialProps = async ({ query }) => {
  const { token } = query;
  let success = false;
  if (token) {
    try {
      const result = await axios.get(
        `${process.env.BASE_URL}${activateUserApi}/${query.token}`
      );
      success = _get(result, "data.success", false);
    } catch (error) {
      success = _get(error, "response.data.success", false);
    }
  }
  return { success };
};

export default connect(
  null,
  { setUserActivated }
)(ActivateUser);
