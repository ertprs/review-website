import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Layout from "../../hoc/layout/layout";

const PageLoader = () => {
  return (
    <Layout>
      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
      <div className="container">
        <Loader
          type="Bars"
          color="#303030"
          height={600}
          width={100}
          timeout={10000}
        />
      </div>
    </Layout>
  );
};

export default PageLoader;
