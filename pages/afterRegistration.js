import React, { useState } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import Layout from "../hoc/layout/layout";
import { CircularProgress } from '@material-ui/core';
import Router from 'next/router';

const redirectToLogin = (setLoading) => {
  setLoading(true)
  Router.push('/login')
}

const AfterRegistration = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Layout>
      <div className="mainContainer">
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <style jsx> {authenticationPageStyles} </style>{" "}
            <div className="card">
              <div className="cardHeading">
                <h2> We just sent you an email </h2>{" "}
              </div>
              <p>
                Thanks for signing up. <br />
                Please check your email to activate your account.
              </p>
              <p>
                Give it a few minutes, and don't forget to check your spam
                folder.
              </p>
              <p>Didn't receive the email?
                <a className="contactLink" href="#">support@thetrustsearch.com</a>
              </p>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress size={30} color="secondary" />
                </div>
              ) : (
                  <button
                    className="registerBtn"
                    onClick={() => redirectToLogin(setLoading)}
                  >
                    Go to Login
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
};

export default AfterRegistration;
