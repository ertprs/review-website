import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Title from "../../MaterialComponents/Title";
import Button from "@material-ui/core/Button/Button";
import BackArrowIcon from "@material-ui/icons/ArrowBack";
import Input from "@material-ui/core/Input/Input";
import uuid from "uuid/v1";
import { connect } from "react-redux";
import Head from "next/head";
import _get from "lodash/get";
import _find from "lodash/find";
import _groupBy from "lodash/groupBy";
import Select from "react-select";
import CombinedReviewsWidgetConfigurations from "./CombinedReviewsWidgetConfigurations";
import { newerThanMonthsOptions } from "../../../utility/constants/newerThanMonthsConstants";
import { maxReviewsOptions } from "../../../utility/constants/maxReviewsConstants";
import { ratingCountOptions } from "../../../utility/constants/ratingCountConstants";
import validate from "../../../utility/validate";
import { toggleWidgetPlatformVisibility } from "../../../store/actions/dashboardActions";
import ShowInWidgetList from "./CombinedReviewsWidgetConfigurations/ShowInWidgetList/ShowInWidgetList";
import PremiumBrandingToggle from "./CombinedReviewsWidgetConfigurations/PremiumBrandingToggle/PremiumBrandingToggle";
import BackgroundColorToggler from "./CombinedReviewsWidgetConfigurations/BackgroundColorToggler/BackgroundColorToggler";
import GetSchemaCode from "./GetSchemaCode";

class GetWidget extends Component {
  constructor(props) {
    super(props);
    const name = _get(this.props, "schemaObj.name", "");
    const profileUrl = _get(this.props, "schemaObj.profileUrl", "");
    const imageUrl = _get(this.props, "schemaObj.imageUrl", "");
    const address = _get(this.props, "schemaObj.address", "");

    this.state = {
      widgetHeight: this.props.widget.minHeight,
      refreshWidget: false,
      platforms: [],
      selectedPlatform: {},
      selectedMaxReviews: {
        ...(maxReviewsOptions[0] || {
          value: 24,
          label: "24 reviews per platform"
        })
      },
      selectedNewerThanMonths: {
        ...(newerThanMonthsOptions[0] || { value: 0, label: "Not needed" })
      },
      selectedRatingCount: {
        ...(ratingCountOptions[2] || { value: 3, label: "3 stars and above" })
      },
      preferencePlatformArray: [],
      preferencePlatformString: "",
      showHidePlatformsList: {},
      premiumBrandingToggleData: {
        value: _get(this.props, "planTypeId", 1) > 1 ? "1" : "",
        checked: _get(this.props, "planTypeId", 1) > 1 ? true : false,
        label: "Turn off the switch to see widget without branding",
        disabled: _get(this.props, "planTypeId", 1) > 1 ? false : true
      },
      backgroundColorTogglerData: {
        value: "",
        checked: true,
        label: "Turn off the switch to get widget with transparent background",
        disabled: false
      },
      //? this state object will handle the state of getSchemaCode switch and also will hold the schemaCodeValue that we will use in the code.
      getSchemaCodeData: {
        value: "",
        checked: false,
        label:
          "Turn on the switch to get schema.org code also for your webpage",
        disabled: false,
        schemaCodeValue: ""
      },
      schemaFormData: {
        name: {
          element: "input",
          name: "name",
          labelText: "Enter name (required)*:",
          type: "text",
          value: name || "",
          valid: name ? true : false,
          touched: name ? true : false,
          errorMessage: "Please enter name!",
          placeholder: "Enter name",
          validationRules: {
            required: true
          }
        },
        profileUrl: {
          element: "input",
          name: "profileUrl",
          labelText: "Enter your profile url (required)*:",
          type: "text",
          value: profileUrl || "",
          valid: profileUrl ? true : false,
          touched: profileUrl ? true : false,
          errorMessage: "Please enter your profile url!",
          placeholder: "Enter your profile url",
          validationRules: {
            required: true
          }
        },
        imageUrl: {
          element: "input",
          name: "imageUrl",
          labelText: "Enter image url (required)*:",
          type: "text",
          value: imageUrl || "",
          valid: imageUrl ? true : false,
          touched: imageUrl ? true : false,
          errorMessage: "Please enter a valid image url!",
          placeholder: "Enter image url",
          validationRules: {
            required: true,
            isDomain: true
          }
        },
        address: {
          element: "textarea",
          name: "address",
          labelText: "Enter your address:",
          type: "text",
          value: address || "",
          valid: true,
          touched: true,
          placeholder: "Enter your address"
        }
      }
    };
  }

  componentDidMount() {
    this.props.scrollToTopOfThePage();
    //generate the dropdown dynamically, display only those platforms which have reviews
    this.generateDropDownDataDynamically();
    //generate the showHidePlatformsList dynamically
    this.generateShowHidePlatformsListDynamically();
  }

  componentDidUpdate(prevProps, prevState) {
    const reviews = _get(this.props, "reviews", {});
    const socialArray = _get(this.props, "socialArray", []);
    const prevReviews = _get(prevProps, "reviews", {});
    const prevSocialArray = _get(prevProps, "socialArray", []);
    if (
      (reviews !== prevReviews && Object.keys(reviews).length > 0) ||
      (socialArray !== prevSocialArray && socialArray.length > 0)
    ) {
      this.generateDropDownDataDynamically();
      this.generateShowHidePlatformsListDynamically();
    }
  }

  generatePreferencePlatformArray = () => {
    const platforms = _get(this.state, "platforms", []);
    const review_platforms = _get(this.props, "review_platforms.data", {});
    const platformsGrouped = _groupBy(platforms, "socialAppId");
    const socialPlatforms = Object.keys(platformsGrouped);
    let localPlatforms = [];
    let preferencePlatformString = "";
    localPlatforms = socialPlatforms.map((item, index) => {
      let socialAppId = item;
      if (socialAppId) {
        if (preferencePlatformString.length > 0) {
          preferencePlatformString =
            preferencePlatformString + "," + socialAppId;
        } else {
          preferencePlatformString = socialAppId;
        }
      }
      return {
        id: "item-" + index,
        label: review_platforms[socialAppId],
        socialAppId: socialAppId
      };
    });
    this.setState({
      preferencePlatformArray: [...localPlatforms],
      preferencePlatformString
    });
  };

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
              //check for the reviewObj in social array and extract it's show_in_widget
              let socialObjOfReview = _find(socialArray, {
                id: Number(item) || ""
              });
              let show_in_widget = 0;
              if (socialObjOfReview) {
                show_in_widget = _get(socialObjOfReview, "show_in_widget", 0);
              }
              //if their are reviews and show_in_widget
              if (reviewsObj[item] && show_in_widget) {
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
        this.setState(
          {
            platforms: [...platforms],
            selectedPlatform: platforms[0]
          },
          () => {
            this.generatePreferencePlatformArray();
          }
        );
      }
    }
  };

  generateShowHidePlatformsListDynamically = () => {
    const socialArray = _get(this.props, "socialArray", []);
    let showHidePlatformsList = {};
    if (socialArray) {
      if (socialArray.length > 0) {
        socialArray.forEach(item => {
          let id = _get(item, "id", "");
          let show_in_widget = _get(item, "show_in_widget", 0);
          let social_media_app_id = _get(item, "social_media_app_id", "");
          let profile_name = _get(item, "profile_name", "");
          let has_review_aggregator = _get(item, "has_review_aggregator", 0);
          let name = _get(item, "name", "");
          showHidePlatformsList = {
            ...showHidePlatformsList,
            [id]: {
              id,
              show_in_widget: show_in_widget && has_review_aggregator,
              social_media_app_id,
              label: profile_name || name,
              touched: false,
              has_review_aggregator
            }
          };
        });
      }
    }
    this.setState({ showHidePlatformsList });
  };

  refreshWidgetOnDemand = () => {
    this.setState({ refreshWidget: true }, () => {
      setTimeout(() => {
        this.setState({ refreshWidget: false });
        this.props.scrollToTopOfThePage();
      }, 1000);
    });
  };

  setPreferencePlatformData = data => {
    if (data) {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          let preferencePlatformString = "";
          data.forEach(item => {
            let socialAppId = _get(item, "socialAppId", "");
            if (preferencePlatformString.length > 0) {
              preferencePlatformString =
                preferencePlatformString + "," + socialAppId;
            } else {
              preferencePlatformString = socialAppId;
            }
          });
          this.setState({
            preferencePlatformArray: [...data],
            preferencePlatformString
          });
        }
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

  handleWidgetConfigurationChange = (id, valObj) => {
    this.setState(
      {
        [id]: { ...valObj },
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

  //!Handler for show/hide platforms change in widget
  handleShowHidePlatformChange = item => {
    const showHidePlatformsList = _get(this.state, "showHidePlatformsList", {});
    const id = _get(item, "id", "");
    const show_in_widget = _get(item, "show_in_widget", 0);
    this.setState({
      showHidePlatformsList: {
        ...showHidePlatformsList,
        [id]: {
          ...showHidePlatformsList[id],
          show_in_widget: show_in_widget ? 0 : 1,
          touched: true
        }
      }
    });
  };

  handleShowHidePlatformSave = () => {
    const showHidePlatformsList = _get(this.state, "showHidePlatformsList", {});
    if (showHidePlatformsList) {
      let profiles = [];
      if (Object.keys(showHidePlatformsList).length > 0) {
        for (let item in showHidePlatformsList) {
          let profileItem = showHidePlatformsList[item] || {};
          let touched = _get(profileItem, "touched", false);
          let id = _get(profileItem, "id", "");
          let show_in_widget = _get(profileItem, "show_in_widget", 0);
          if (touched) {
            profiles = [...profiles, { id, show_in_widget }];
          }
        }
        //check for profiles array length, in case 0 don't make a call
        if (profiles.length > 0) {
          this.props.toggleWidgetPlatformVisibility({
            profiles: [...profiles]
          });
        }
      }
    }
  };

  //!Handler to change get widget code on toggling branding for non-free customers
  handlePremiumBrandingToggleChange = e => {
    const checked = _get(e, "target.checked", false);
    const premiumBrandingToggleData = _get(
      this.state,
      "premiumBrandingToggleData",
      {}
    );
    this.setState(
      {
        premiumBrandingToggleData: {
          ...premiumBrandingToggleData,
          value: checked ? 1 : "",
          checked,
          label: checked
            ? "Turn off the switch to see widget without branding"
            : "Turn on the switch to see widget with branding"
        }
      },
      () => {
        this.refreshWidgetOnDemand();
      }
    );
  };

  //!Handler to change get widget code on toggling background color
  handleBackgroundColorTogglerChange = e => {
    const checked = _get(e, "target.checked", false);
    const backgroundColorTogglerData = _get(
      this.state,
      "backgroundColorTogglerData",
      {}
    );
    this.setState(
      {
        backgroundColorTogglerData: {
          ...backgroundColorTogglerData,
          value: checked ? "" : 1,
          checked,
          label: checked
            ? "Turn off the switch to get widget with transparent background"
            : "Turn on the switch to get widget with white background"
        }
      },
      () => {
        this.refreshWidgetOnDemand();
      }
    );
  };

  //!Handler to toggle schema code visibility
  handleGetSchemaCodeToggle = e => {
    const checked = _get(e, "target.checked", false);
    const getSchemaCodeData = _get(this.state, "getSchemaCodeData", {});
    this.setState({
      getSchemaCodeData: {
        ...getSchemaCodeData,
        value: checked ? 1 : "",
        checked,
        label: checked
          ? "Turn off the switch to remove schema.org code from below"
          : "Turn on the switch to add schema.org code below to get widget code",
        schemaCodeValue: checked
          ? _get(getSchemaCodeData, "schemaCodeValue", "")
          : ""
      }
    });
  };

  //!Handler to set value of schema code (schemaCodeValue), that we receive from API
  handleSchemaCodeValueChange = schemaCodeValue => {
    const getSchemaCodeData = _get(this.state, "getSchemaCodeData", {});
    this.setState({
      getSchemaCodeData: {
        ...getSchemaCodeData,
        schemaCodeValue
      }
    });
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
    const planTypeId = _get(this.props, "planTypeId", 1);
    const {
      selectedPlatform,
      selectedMaxReviews,
      selectedNewerThanMonths,
      selectedRatingCount,
      premiumBrandingToggleData,
      backgroundColorTogglerData,
      getSchemaCodeData,
      schemaFormData
    } = this.state;
    const widgetId = _get(widget, "id", "");
    const schemaCodeValue = _get(getSchemaCodeData, "schemaCodeValue", "");
    return (
      <>
        <style jsx>
          {`
            .header {
              border-bottom: 1px solid #d1d1d1;
            }
            .blue {
              color: blue;
              word-break: break-all;
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
            .schemaOrgContainer {
              height: 150px;
              overflow-y: auto;
              padding: 5px;
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
                {widgetId !== 0 ? (
                  <>
                    {this.renderInput()}
                    <div style={{ margin: "25px 0 15px 0" }}>
                      <ShowInWidgetList
                        refreshWidgetOnDemand={this.refreshWidgetOnDemand}
                        showHidePlatformsList={this.state.showHidePlatformsList}
                        handleShowHidePlatformChange={
                          this.handleShowHidePlatformChange
                        }
                        handleShowHidePlatformSave={
                          this.handleShowHidePlatformSave
                        }
                      />
                      <PremiumBrandingToggle
                        premiumBrandingToggleData={premiumBrandingToggleData}
                        handleChange={this.handlePremiumBrandingToggleChange}
                      />
                      <BackgroundColorToggler
                        backgroundColorTogglerData={backgroundColorTogglerData}
                        handleChange={this.handleBackgroundColorTogglerChange}
                      />
                      <GetSchemaCode
                        getSchemaCodeData={getSchemaCodeData}
                        handleChange={this.handleGetSchemaCodeToggle}
                        handleSchemaCodeValueChange={
                          this.handleSchemaCodeValueChange
                        }
                        schemaFormData={schemaFormData || {}}
                        handleSchemaFormChange={this.handleSchemaFormChange}
                      />
                    </div>
                  </>
                ) : (
                  <CombinedReviewsWidgetConfigurations
                    selectedMaxReviews={selectedMaxReviews}
                    selectedNewerThanMonths={selectedNewerThanMonths}
                    selectedRatingCount={selectedRatingCount}
                    handleChange={this.handleWidgetConfigurationChange}
                    platforms={this.state.platforms}
                    preferencePlatformArray={this.state.preferencePlatformArray}
                    setPreferencePlatformData={this.setPreferencePlatformData}
                    refreshWidgetOnDemand={this.refreshWidgetOnDemand}
                    refreshWidget={this.state.refreshWidget}
                    showHidePlatformsList={this.state.showHidePlatformsList}
                    handleShowHidePlatformChange={
                      this.handleShowHidePlatformChange
                    }
                    handleShowHidePlatformSave={this.handleShowHidePlatformSave}
                    handlePremiumBrandingToggleChange={
                      this.handlePremiumBrandingToggleChange
                    }
                    premiumBrandingToggleData={
                      this.state.premiumBrandingToggleData
                    }
                    handleBackgroundColorTogglerChange={
                      this.handleBackgroundColorTogglerChange
                    }
                    backgroundColorTogglerData={
                      this.state.backgroundColorTogglerData
                    }
                    getSchemaCodeData={getSchemaCodeData}
                    handleGetSchemaCodeDataChange={
                      this.handleGetSchemaCodeToggle
                    }
                    handleSchemaCodeValueChange={
                      this.handleSchemaCodeValueChange
                    }
                    schemaFormData={schemaFormData || {}}
                    handleSchemaFormChange={this.handleSchemaFormChange}
                  />
                )}
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
                    <script type="text/javascript" src="${process.env.WIDGET_BASE_URL}/static/tsWidget/v1/ts.widget_v1.min.js"
                    async></script>
                `}</code>
                ) : (
                  <code className="blue">{`
                <script type="text/javascript" src="${process.env.WIDGET_BASE_URL}/static/tsWidget/v1/ts.widget_v1.min.js"
                async></script>
            `}</code>
                )}
                <pre className="comment">{`<!-- End TrustBox script -->`}</pre>
                {schemaCodeValue ? (
                  <>
                    <pre className="comment">{`<!-- Schema.org script -->`}</pre>
                    <div className="schemaOrgContainer">
                      <code className="blue">
                        {`<script type="application/ld+json" data-business-unit-json-ld>${JSON.stringify(
                          schemaCodeValue
                        )}</script>`}
                      </code>
                    </div>
                    <pre className="comment">{`<!-- End Schema.org script -->`}</pre>
                  </>
                ) : null}
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
                    data-platform-id=""
                    data-max-reviews="${_get(
                      this.state,
                      "selectedMaxReviews.value",
                      24
                    )}"
                    data-newer-than-months="${_get(
                      this.state,
                      "selectedNewerThanMonths.value",
                      ""
                    )}"
                    data-rating="${_get(
                      this.state,
                      "selectedRatingCount.value",
                      ""
                    )}"
                    data-platform-order="${
                      _get(this.state, "preferencePlatformArray", []).length > 1
                        ? _get(this.state, "preferencePlatformString", "")
                        : ""
                    }"
                    data-show-branding="${_get(
                      this.state,
                      "premiumBrandingToggleData.value",
                      ""
                    )}"
                    data-transparent-background="${_get(
                      this.state,
                      "backgroundColorTogglerData.value",
                      ""
                    )}"
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
                data-show-branding="${_get(
                  this.state,
                  "premiumBrandingToggleData.value",
                  ""
                )}"
                data-transparent-background="${_get(
                  this.state,
                  "backgroundColorTogglerData.value",
                  ""
                )}"
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
              src={`${process.env.WIDGET_BASE_URL}/static/tsWidget/v1/ts.widget_v1.min.js`}
              async
            ></script>
          ) : (
            <script
              type="text/javascript"
              src={`${process.env.WIDGET_BASE_URL}/static/tsWidget/v1/ts.widget_v1.min.js`}
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
          data-max-reviews={_get(this.state, "selectedMaxReviews.value", 24)}
          data-newer-than-months={_get(
            this.state,
            "selectedNewerThanMonths.value",
            ""
          )}
          data-rating={_get(this.state, "selectedRatingCount.value", "")}
          data-platform-order={
            _get(this.state, "preferencePlatformArray", []).length > 1
              ? _get(this.state, "preferencePlatformString", "")
              : ""
          }
          data-show-branding={_get(
            this.state,
            "premiumBrandingToggleData.value",
            ""
          )}
          data-transparent-background={_get(
            this.state,
            "backgroundColorTogglerData.value",
            ""
          )}
        ></div>
      </>
    );
  };

  handleSchemaFormChange = e => {
    const { name, value } = e.target;
    const objData = _get(this.state, "schemaFormData", {});
    this.setState({
      schemaFormData: {
        ...objData,
        [name]: {
          ..._get(objData, name, {}),
          value,
          touched: true,
          valid: validate(value, objData[name].validationRules)
        }
      }
    });
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
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                <p>
                  Either the reviews have not be fetched till yet, or the
                  platforms you have set have zero (0) reviews, please check the
                  status on the homepage
                </p>
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
  const review_platforms = _get(state, "dashboardData.review_platforms", {});
  const socialArray = _get(
    state,
    "auth.logIn.userProfile.business_profile.social",
    []
  );
  const planTypeId = _get(
    state,
    "auth.logIn.userProfile.subscription.plan_type_id",
    1
  );
  const schemaObj = _get(
    state,
    "auth.logIn.userProfile.business_profile.integrations.schema",
    {}
  );
  return { reviews, socialArray, review_platforms, planTypeId, schemaObj };
};

export default connect(mapStateToProps, { toggleWidgetPlatformVisibility })(
  GetWidget
);
