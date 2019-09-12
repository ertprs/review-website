import React from "react";
import {trustDontTrustStyles} from './trustDontTrustStyles';

class TrustDontTrust extends React.Component {
  renderTrustDontTrustBox = () => {
    return (
      <div className="trustDontTrustBoxContainer">
          <style jsx>{trustDontTrustStyles}</style>
        <div className="trustDontTrustBoxContainerInner">
          <div className="trustIconContainer">
            <div className="trustHeader">
              <h6>trust</h6>
            </div>
            <div className="trustIconContainerInner">
              <img src="/static/images/trust.svg" />
            </div>
          </div>
          <div className="dontTrustIconContainer">
            <div className="dontTrustHeader">
              <h6>don't trust</h6>
            </div>
            <div className="dontTrustIconContainerInner">
              <img src="/static/images/dont_trust.svg" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderTrustDontTrustBox()}</div>;
  }
}

export default TrustDontTrust;
