import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Title from "../../MaterialComponents/Title";
import Button from "@material-ui/core/Button/Button";
import BackArrowIcon from "@material-ui/icons/ArrowBack";
import Input from "@material-ui/core/Input/Input";
import uuid from "uuid/v1";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";
import _get from "lodash/get";
import _find from "lodash/find";
import Select from "react-select";

class GetWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetHeight: this.props.widget.minHeight,
      refreshWidget: false,
      platforms: [],
      selectedPlatform: {}
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //generate the dropdown dynamically, display only those platforms which have reviews
    this.generateDropDownDataDynamically();
  }

  componentDidUpdate(prevProps, prevState) {
    const reviews = _get(this.props, "reviews", {});
    const socialArray = _get(this.props, "socialArray", []);
    const prevReviews = _get(prevProps, "reviews", {});
    const prevSocialArray = _get(prevProps, "socialArray", []);
    if (reviews !== prevReviews && Object.keys(reviews).length > 0) {
      console.log("here");
      this.generateDropDownDataDynamically();
    }
  }

  generateDropDownDataDynamically = () => {
    const reviews = _get(this.props, "reviews", {});
    const socialArray = _get(this.props, "socialArray", []);
    let platforms = [];
    //loop over reviews
    if (Object.keys(reviews)) {
      if (Object.keys(reviews).length > 0) {
        for (let socialAppId in reviews) {
          if (reviews[socialAppId]) {
            let reviewsObj = reviews[socialAppId];
            //loop over reviewsObj and push into platforms {label, value:socialAppId,  profileId}
            for (let item in reviewsObj) {
              if (reviewsObj[item]) {
                let particularPlatformReviewsObj = reviewsObj[item];
                let reviewsCount = (
                  _get(particularPlatformReviewsObj, "data.data.reviews", []) ||
                  []
                ).length;
                if (reviewsCount > 0) {
                  let social_media_app_id = _get(
                    particularPlatformReviewsObj,
                    "data.socialAppId",
                    ""
                  );
                  let profileId = _get(
                    particularPlatformReviewsObj,
                    "data.profileId",
                    ""
                  );
                  let labelObject = _find(socialArray, { id: profileId });
                  let label =
                    _get(labelObject, "profile_name", "") ||
                    _get(labelObject, "name", "");
                  platforms = [
                    ...platforms,
                    {
                      label: label,
                      value: profileId,
                      socialAppId: social_media_app_id
                    }
                  ];
                }
              }
            }
          }
        }
      }
    }
    if (Object.keys(platforms)) {
      if (Object.keys(platforms).length > 0) {
        this.setState({
          platforms: [...platforms],
          selectedPlatform: platforms[0]
        });
      }
    }
  };

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
              widget.id === 1 || widget.id === 0
                ? "widgetImgContainer"
                : "widgetImgContainerSm"
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

  handleSelectPlatformChange = valObj => {
    this.setState(
      {
        selectedPlatform: { ...valObj },
        refreshWidget: true
      },
      () => {
        setTimeout(() => {
          this.setState({ refreshWidget: false });
          this.props.scrollToTopOfThePage();
        }, 1000);
      }
    );
  };

  renderInput = () => {
    const { widgetHeight, platforms, selectedPlatform } = this.state;
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
        {platforms.length > 0 ? (
          <div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                marginTop: "15px"
              }}
            >
              Select your review platform:{" "}
            </div>
            <Select
              options={platforms}
              value={selectedPlatform}
              onChange={valObj => {
                this.handleSelectPlatformChange(valObj);
              }}
            />
          </div>
        ) : null}
      </>
    );
  };

  getYourWidgetBox = () => {
    const { domainName, widget } = this.props;
    const { selectedPlatform } = this.state;
    const widgetId = _get(widget, "id", "");
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
          `}
        </style>
        <Paper style={{ padding: "25px" }}>
          <div>
            <div className="header">
              <Title>Get your trust widget</Title>
            </div>
            <div className="body">
              <h6 style={{ lineHeight: "2" }}>1-)</h6>
              <div className="inputContainer">
                {widgetId !== 0 ? this.renderInput() : null}
              </div>
              <p className="subHeading">
                1.2-) Copy-paste this code inside the {`<head></head>`} section
                of your website’s HTML or as close to the top of the page as
                possible.
              </p>
              <div className="codeBlock">
                <pre className="comment">{`<!-- TrustBox script -->`}</pre>
                {widgetId === 0 ? (
                  <code className="blue">{`
                    <script type="text/javascript" src="https://widget-dev.thetrustsearch.com/static/tsWidget/v1/ts.widget_v1.min.js"
                    async></script>
                `}</code>
                ) : (
                  <code className="blue">{`
                <script type="text/javascript" src="https://widget-dev.thetrustsearch.com/static/tsWidget/v1/ts.widget_v1.min.js"
                async></script>
            `}</code>
                )}
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
                {widgetId === 0 ? (
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
                    data-platform-id="${_get(
                      selectedPlatform,
                      "socialAppId",
                      22
                    )}"
                    data-max-reviews="25"
                    data-newer-than-months="2"
                    data-rating="3"
                    ></div> 
                `}</code>
                ) : (
                  <code className="blue">{`
                <div class="trustsearch-widget" 
                data-locale="en-US"
                data-template-id="${this.props.widget.dataTempID}" 
                data-businessunit-id="${this.props.domainName || "google.com"}"
                data-style-height="${this.state.widgetHeight}px"
                data-style-width="100%"
                data-theme="light"
                style="position: relative;
                overflow: hidden;"
                data-platform-id="${_get(selectedPlatform, "socialAppId", 22)}"
                data-profile-id="${_get(selectedPlatform, "value", "")}"
                ></div> 
            `}</code>
                )}
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

  renderWidget = () => {
    const { domainName, widget } = this.props;
    const widgetId = _get(widget, "id", "");
    return (
      <>
        <Head>
          {widgetId === 0 ? (
            <script
              type="text/javascript"
              src="https://widget-dev.thetrustsearch.com/static/tsWidget/v1/ts.widget_v1.min.js"
              async
            ></script>
          ) : (
            <script
              type="text/javascript"
              src="https://widget-dev.thetrustsearch.com/static/tsWidget/v1/ts.widget_v1.min.js"
              async
            ></script>
          )}
        </Head>
        <div
          className="trustsearch-widget"
          data-locale="en-US"
          data-template-id={_get(this.props, "widget.dataTempID", "")}
          data-businessunit-id={_get(this.props, "domainName", "")}
          data-style-height={`${_get(this.state, "widgetHeight", "")}px`}
          data-style-width="100%"
          data-theme="light"
          data-platform-id={_get(
            this.state,
            "selectedPlatform.socialAppId",
            22
          )}
          data-profile-id={_get(this.state, "selectedPlatform.value", "")}
          style={{ position: "relative", overflow: "hidden" }}
          data-max-reviews="25"
          data-newer-than-months="2"
          data-rating="3"
        ></div>
      </>
    );
  };

  render() {
    const { domainName, widget } = this.props;
    const widgetId = _get(widget, "id", "");
    return (
      <div className="container">
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
        {!this.state.refreshWidget && this.state.platforms.length > 0
          ? this.renderWidget()
          : null}
        <div className="row">
          {/* <div className="col-md-6">{this.renderWidgetInfo()}</div> */}
          <div className="col-md-12">
            {this.state.platforms.length > 0 ? (
              this.getYourWidgetBox()
            ) : (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const reviews = _get(state, "dashboardData.reviews", {});
  const socialArray = _get(
    state,
    "auth.logIn.userProfile.business_profile.social",
    []
  );
  return { reviews, socialArray };
};

export default connect(mapStateToProps)(GetWidget);
