import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Title from "../MaterialComponents/Title";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input/Input";
import uuid from "uuid/v1";
import Head from "next/head";
import BackArrowIcon from "@material-ui/icons/KeyboardBackspace";

class GetWidgetsCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetHeight: this.props.widget.minHeight
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderContent = data => {
    return data.map(item => {
      return <p key={uuid()}>{item}</p>;
    });
  };

  renderWidgetInfo = () => {
    const { widget } = this.props;
    return (
      <Paper style={{ padding: "25px" }}>
        <style jsx>
          {`
            .widgetBox {
              padding: 15px;
            }
            .widgetImgContainer {
              width: 80%;
              height: auto;
              margin: 0 auto;
            }
            .widgetImgContainerSm {
              width: 40%;
              height: auto;
              margin: 0 auto;
            }
            .widgetImgContainer img,
            .widgetImgContainerSm img {
              max-width: 100%;
              height: auto;
            }
            .mt {
              margin-top: 20.5px;
            }
          `}
        </style>
        <Title>About the {widget.title}</Title>
        <p>{widget.description}</p>
        <div>
          <div
            className={`${
              widget.id === 1 ? "widgetImgContainer" : "widgetImgContainerSm"
            }`}
          >
            <img src={widget.imgURL} />
          </div>
        </div>
        <h6 style={{ marginTop: "25px" }}>Suggested placement: </h6>
        {this.renderContent(widget.suggestedPlacement)}
        <h6>Supported devices/sizes: </h6>
        {this.renderContent(widget.support)}
        <p>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              this.props.getMoreWidgets();
            }}
          >
            Get more widgets
          </Button>
        </p>
      </Paper>
    );
  };

  renderInput = () => {
    const { widgetHeight } = this.state;
    return (
      <>
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
          1.1-) Enter widget height:{" "}
        </div>
        <Input
          value={widgetHeight}
          onChange={e => {
            this.setState({ widgetHeight: e.target.value });
          }}
        />
        (in px)
      </>
    );
  };

  getYourWidgetBox = () => {
    return (
      <>
        <style jsx>
          {`
            .header {
              border-bottom: 1px solid #d1d1d1;
            }
            .blue {
              color: blue;
            }
            .body {
              margin-top: 25px;
            }
            .subHeading {
              font-weight: bold;
            }
            .comment {
              color: #999;
            }
            .codeBlock {
              font-size: 1rem;
            }
            .inputContainer {
              margin: 25px 0 25px 0;
            }

            .mb-50 {
              margin-bottom: 50px;
            }
          `}
        </style>
        <Paper
          style={{ padding: "25px", marginTop: "0px", marginBottom: "100px" }}
        >
          <div>
            <div className="header">
              <Title>Get your trust widget</Title>
            </div>
            <div className="body">
              <h6 style={{ lineHeight: "2" }}>1-)</h6>
              <div className="inputContainer">{this.renderInput()}</div>
              <p className="subHeading">
                1.2-) Copy-paste this code inside the {`<head></head>`} section
                of your website’s HTML or as close to the top of the page as
                possible.
              </p>
              <div className="codeBlock">
                <pre className="comment">{`<!-- TrustBox script -->`}</pre>
                <code className="blue">{`
                    <script type="text/javascript" src="https://thetrustsearch.com/static/tsWidget/v1/ts.widget.js"
                    async></script>
                `}</code>
                <pre className="comment">{`<!-- End TrustBox script -->`}</pre>
              </div>
            </div>
            <div className="body">
              <h6 style={{ lineHeight: "2" }}>2-)</h6>
              <p className="subHeading">
                Copy-paste this code into the HTML of your website where you’d
                like your TrustBox to appear.
              </p>
              <div className="codeBlock">
                <pre className="comment">{`<!-- TrustBox script -->`}</pre>
                <code className="blue">{`
                    <div class="trustsearch-widget" 
                    data-locale="en-US"
                    data-template-id="${this.props.widget.dataTempID}" 
                    data-businessunit-id="${this.props.domainName ||
                      "google.com"}"
                    data-style-height="${this.state.widgetHeight}px"
                    data-style-width="100%"
                    data-theme="light"
                    style="position: relative;
                    overflow: hidden;"
                    ></div> 
                `}</code>
                <pre className="comment">{`<!-- End TrustBox script -->`}</pre>
              </div>
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                this.props.getMoreWidgets();
              }}
            >
              Get more widgets
            </Button>
          </div>
        </Paper>
      </>
    );
  };

  render() {
    const { domainName } = this.props;
    return (
      <div className="container">
        <Head>
          <script
            type="text/javascript"
            src="https://thetrustsearch.com/static/tsWidget/v1/ts.widget.js"
            async
          ></script>
        </Head>
        <div style={{ marginBottom: "50px" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<BackArrowIcon />}
            onClick={() => {
              this.props.getMoreWidgets();
            }}
          >
            Back
          </Button>
        </div>
        <div
          className="trustsearch-widget"
          data-locale="en-US"
          data-template-id={this.props.widget.dataTempID}
          data-businessunit-id={this.props.domainName}
          data-style-height={`${this.state.widgetHeight}px`}
          data-style-width="100%"
          data-theme="light"
          style={{ position: "relative", overflow: "hidden" }}
        ></div>
        <div className="row">
          {/* <div className="col-md-6">{this.renderWidgetInfo()}</div> */}
          <div className="col-md-12">{this.getYourWidgetBox()}</div>
        </div>
      </div>
    );
  }
}

export default GetWidgetsCode;
