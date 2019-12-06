import React, { useState } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import Layout from "../hoc/layout/layout";
import { CircularProgress } from "@material-ui/core";
import Router from "next/router";
import Link from "next/link";

const redirectToLogin = setLoading => {
  setLoading(true);
  Router.push("/login");
};

const AfterRegistration = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Layout>
      <div className="mainContainer">
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <style jsx> {authenticationPageStyles} </style>{" "}
            <div className="card">
              <div className="cardHeading">
                <h3> We just sent you an email </h3>{" "}
              </div>
              <p>
                Thanks for signing up. <br />
                Please check your email to activate your account.
              </p>
              <p>
                Give it a few minutes, and don't forget to check your spam
                folder.
              </p>
              <div style={{ display: "flex" }}>
                <p>
                  Didn't receive the email?&nbsp;
                  <Link href="#">
                    <a>support@thetrustsearch.com</a>
                  </Link>
                </p>
              </div>

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
    </Layout>
  );
};

export default AfterRegistration;
