import React from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import Layout from "../hoc/layout/layout";

const AfterTrustVoteSubmit = () => {
  return (
    <Layout>
      <div className="mainContainer">
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <style jsx> {authenticationPageStyles} </style>{" "}
            <div className="card">
              <div className="cardHeading">
                <h2 style={{color:"#21bc61"}}>Thank you for your vote !</h2>{" "}
              </div>
              <p>
                Your vote submitted successfully <br />
                Please check your email for further details.
              </p>              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AfterTrustVoteSubmit;
