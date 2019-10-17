import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import PlacesAutoComplete from "../../../Components/Widgets/PlacesAutoComplete/PlacesAutoComplete";
import stringHelpers from "../../../utility/stringHelpers";
import Snackbar from "../../Widgets/Snackbar";
import { locatePlaceByPlaceId } from "../../../store/actions/dashboardActions";
import { locatePlaceApi } from "../../../utility/config";
import { connect } from "react-redux";
import _get from "lodash/get";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import { planType } from "../../../utility/constants/businessPlanConstants";
import FormField from "../../Widgets/FormField/FormField";
import validate from "../../../utility/validate";

class GetStarted extends Component {
  state = {
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    address: "",
    selectedAddress: {},
    formData: {
      directReviewUrl: {
        element: "input",
        type: "text",
        value: "",
        valid: false,
        touched: false,
        errorMessage: "Enter valid review URL",
        placeholder: "Enter google review URL",
        validationRules: {
          required: true,
          isDomain: true
        },
        label: "Google review URL: "
      }
    }
  };

  handleContinueClick = () => {
    const { selectedAddress } = this.state;
    if (Object.keys(selectedAddress).length > 0) {
      this.props.locatePlaceByPlaceId(
        {...this.state.selectedAddress, directReviewUrl:this.state.formData["directReviewUrl"].value},
        this.props.token,
        `${process.env.BASE_URL}${locatePlaceApi}`
      );
    }
  };

  handleAddressSelect = (reqBody, address) => {
    const {userProfile} = this.props;
    const name = _get(userProfile,'company.name',"")
    this.setState({ selectedAddress: { ...reqBody, name:name }, address: address });
  };

  renderSelectedAddress = () => {
    const { selectedAddress } = this.state;
    return Object.keys(selectedAddress).length > 0 ? (
      <div style={{ marginTop: "50px" }}>
        <p>
          <span style={{ fontWeight: "bold" }}>Selected address :</span>{" "}
          {this.state.address}
        </p>
      </div>
    ) : null;
  };

  renderGetStartedHeader = () => {
    const { userProfile } = this.props;
    const name = _get(userProfile, "name", "");
    return (
      <div>
        <style jsx>{`
          .getStartedHeader {
            margin: 20px 0 25px 0;
          }
          .getStartedSubHeader {
            margin-bottom: 25px;
          }
        `}</style>
        <h3 className="getStartedHeader">
          <span style={{ textTransform: "capitalize" }}>
            {stringHelpers("getTimeGreeting")}
          </span>{" "}
          {name}
        </h3>
        <h6 className="getStartedSubHeader">
          This is your personal setup guide. Let’s get you up and running so you
          can get more reviews and build trust.
        </h6>
      </div>
    );
  };

  renderBusinessDetails = () => {
    const domain = _get(this.props.businessProfile, "domain", "");
    const companyName = _get(this.props.userProfile, "company.name", "");
    const subscriptionPlan = _get(
      this.props.userProfile,
      "subscription.plan_type_id",
      ""
    );
    const expiresAt = _get(
      this.props.userProfile,
      "subscription.expires_at",
      ""
    );
    return (
      <div className="businessDetailsContainer">
        <style jsx>
          {`
            .bold {
              font-weight: bold;
            }
            .businessDetailsContainer {
              margin-left: 25px;
            }
            .businessDetailsFlexItem {
              display: flex;
              margin-bottom: 10px;
            }
            .businessDetailsFlexItem div {
              flex-basis: 40%;
            }
            @media screen and (max-width: 720px) {
              .businessDetailsFlexItem {
                flex-direction: column;
                flex-basis: 100%;
              }
            }
          `}
        </style>
        <div className="businessDetailsFlexItem">
          <div className="bold">Domain :</div>
          <div>
            <a href={`https://www.${domain}`} target="_blank">
              {domain}
            </a>
          </div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Company Name :</div>
          <div>{companyName}</div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Subscription plan :</div>
          <div>{planType[subscriptionPlan]}</div>
        </div>
        <div className="businessDetailsFlexItem">
          <div className="bold">Expires At :</div>
          <div>{expiresAt}</div>
        </div>
      </div>
    );
  };

  renderContinueBtn = () => {
    const { selectedAddress, formData } = this.state;
    const { type } = this.props;
    return Object.keys(selectedAddress).length > 0 && formData["directReviewUrl"].valid ? (
      <div style={{ marginTop: "50px", textAlign: "right" }}>
        {type === "LOCATE_PLACE_INIT" ? (
          <CircularProgress size={25} />
        ) : (
          <Button
            endIcon={<ArrowRight />}
            onClick={this.handleContinueClick}
            variant="contained"
            color="primary"
          >
            Claim &amp; continue
          </Button>
        )}
      </div>
    ) : null;
  };

  handleChange = (e, id) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: {
          ...this.state.formData[id],
          value: e.target.value,
          valid: validate(
            e.target.value,
            this.state.formData[id].validationRules
          ),
          touched:true
        }
      }
    });
  };

  renderDirectReviewUrl = () => {
    const { formData, selectedAddress } = this.state;
    return Object.keys(selectedAddress).length > 0 ? (
      <div>
        <FormField
          {...formData.directReviewUrl}
          id="directReviewUrl"
          handleChange={this.handleChange}
          styles={{
            border: "0",
            borderBottom: "1px solid #999",
            borderRadius: "0"
          }}
        />
      </div>
    ) : null;
  };

  renderGetStartedBox = () => {
    return (
      <Paper>
        <style jsx>
          {`
            .getStartedBox {
              padding: 25px;
            }
            .getStartedBoxHeader {
              margin-bottom: 55px;
            }
            .getStartedBoxContainerInner {
              display: flex;
            }
            .getStartedBoxContainerInner div:first-child {
              flex-basis: 25%;
            }
            .getStartedBoxContainerInner div:last-child {
              flex-basis: 75%;
            }

            .getStartedBoxImgContainer {
              max-width: 250px;
              height: auto;
            }
            .getStartedBoxImgContainer img {
              max-width: 100%;
              height: auto;
            }

            @media screen and (max-width: 720px) {
              .getStartedBoxImgContainer {
                display: none;
              }
              .getStartedBoxHeader h4 {
                font-size: 1.1rem;
                margin-bottom: 35px;
              }
            }
          `}
        </style>
        <div className="getStartedBox">
          <div className="getStartedBoxHeader">
            <h4>
              {this.props.placeId !== "" || this.props.success
                ? "Your business details"
                : "Please claim your Business"}
            </h4>
          </div>
          <div className="getStartedBoxContainerInner">
            <div className="getStartedBoxImgContainer">
              <img
                src={`/static/images/${
                  this.props.placeId !== "" || this.props.success
                    ? "googleMyBusiness.jpg"
                    : "locate.png"
                }`}
              />
            </div>
            <div className="getStartedBoxAutoComplete">
              {this.props.placeId === "" && !this.props.success ? (
                <>
                  <PlacesAutoComplete
                    handleAddressSelect={this.handleAddressSelect}
                  />
                  {this.renderSelectedAddress()}
                  {this.renderDirectReviewUrl()}
                  {this.renderContinueBtn()}
                </>
              ) : (
                this.renderBusinessDetails()
              )}
            </div>
          </div>
        </div>
      </Paper>
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({
        showSnackbar: true,
        variant: "success",
        snackbarMsg: "Data located successfully!"
      });
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {this.renderGetStartedHeader()}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              {this.renderGetStartedBox()}
            </Grid>
          </Grid>
        </Container>
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardData, auth } = state;
  const token = _get(auth, "logIn.token", "");
  const userProfile = _get(auth, "logIn.userProfile", {});
  const businessProfile = _get(auth, "logIn.userProfile.business_profile", {});
  const success = _get(dashboardData, "locatePlace.success", false);
  const type = _get(dashboardData, "type", "");
  const placeId = _get(businessProfile, "google_places.placeId", "");
  return { success, businessProfile, token, type, placeId, userProfile };
};

export default connect(
  mapStateToProps,
  { locatePlaceByPlaceId }
)(GetStarted);
