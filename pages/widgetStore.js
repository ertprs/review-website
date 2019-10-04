import React from "react";
import Link from "next/link";
import { widgetStoreStyles } from "../Components/Styles/widgetStoreStyles";

class WidgetStore extends React.Component {
  renderWidgetStoreHeader = () => {
    return (
      <div className="widgetStoreHeader container">
        <style jsx>{widgetStoreStyles}</style>
        <div className="widgetStoreLogoContainer">
          <Link href="/">
            <img
              src="/static/business/index/images/gradientLogo.png"
              className="widgetStoreLogoImage"
            />
          </Link>
        </div>
      </div>
    );
  };

  renderStepOne = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="widgetStoreCard">
              <div style={{ margin: "34px 0 30px 0" }}>
                <h3>Implement your widget</h3>
              </div>
              <p>
                1. Copy-paste this code inside the <head></head> section of your
                website’s HTML or as close to the top of the page as possible.
              </p>
              <div
                className="code"
                style={{ background: "#fff", color: "blue" }}
              >
                <pre>
                  {`
                    <!-- TrustBox script --> 
                    <script type="text/javascript" src="http://localhost:3000/static/tsWidget/v1/ts.widget.js"
                    async></script>
                    <!-- End TrustBox script -->
                  `}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderWidgetsGrid = widget => {
    return (
      <div className="container" style={{ marginTop: "45px" }}>
        <div className="row">
          <div className="col-md-4">
            <h6 style={{ marginBottom: "25px" }}>
              {widget.no} {widget.name} Widget
            </h6>
            <div
              className="imageContainer"
              style={{ width: "225px", height: "auto" }}
            >
              <img
                src={`/static/images/${widget.image}.png`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div
              className="code"
              style={{ background: "#fff", color: "blue", marginTop: "50px" }}
            >
              <pre>
                {`
                    <!-- TrustSearch widget - ${widget.name} --> 
                    <div class="trustsearch-widget" data-locale="en-US"
                    data-template-id=${widget.id} data-businessunit-id="google.com"
                    data-style-height="350px"
                    data-style-width="100%"
                    data-theme="light"
                    ></div> 
                  <!-- End TrustSearch widget -->
                  `}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const widgets = [
      {
        no: "(i)",
        name: "Only score widget",
        image: "onlyScoreWidget",
        id: "OnlyScoreWidget"
      },
      {
        no: "(ii)",
        name: "Text Reviews With Scores",
        image: "textReviewsWithScores",
        id: "TextReviewsWithScores"
      },
      {
        no: "(iii)",
        name: "Text Reviews",
        image: "textReviews",
        id: "TextReviews"
      }
    ];
    return (
      <div style={{ backgroundColor: "#f5f5f5" }}>
        {this.renderWidgetStoreHeader()}
        {this.renderStepOne()}
        <div className="container">
          <p style={{ marginBottom: "30px", marginTop: "50px" }}>
            2. Copy-paste this code into the HTML of your website where you’d
            like one of these widget to appear :{" "}
          </p>
        </div>
        {widgets.map(widget => {
          return this.renderWidgetsGrid(widget);
        })}
      </div>
    );
  }
}

export default WidgetStore;
