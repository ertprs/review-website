import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import Layout from "../hoc/layout/layout";

class AfterEmailVerification extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <div className="mainContainer">
          <div className="container">
            <div className="col-md-6 offset-md-3">
              <style jsx> {authenticationPageStyles} </style>{" "}
              <div className="card">
                <div className="cardHeading">
                  <h1> We just sent you an email </h1>{" "}
                </div>
                <p>
                  Thanks for signing up. <br />
                  Please check your email to activate your account.
                </p>
                <p>
                  Give it a few minutes, and don't forget to check your spam
                  folder.
                </p>
                <p>Didn't receive the email?</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AfterEmailVerification;
