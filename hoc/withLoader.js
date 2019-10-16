import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Layout from "../hoc/layout/layout";
import _get from "lodash/get";

export default WrappedComponent => {
  class ComposedComponent extends Component {
    render() {
      const { isLoading } = this.props;
      return isLoading ? (
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
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => {
    const { loader } = state;
    const isLoading = _get(loader, "isLoading", false);
    return { isLoading };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
