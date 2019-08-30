import React from "react";
import SearchBox from "../../Components/Widgets/SearchBox/SearchBox";
import SubscriptionPlanCard from "../../Components/Widgets/SubscriptionPlanCard/SubscriptionPlanCard";
import SolutionForCompaniesList from "../../Components/Widgets/SolutionForCompaniesList/SolutionForCompaniesList";
import EmailSubscription from "../../Components/Widgets/EmailSubscription/EmailSubscription";
import validate from "../../utility/validate";
import ScheduleMeeting from "../../Components/Widgets/ScheduleMeeting/ScheduleMeeting";
import { layoutStyles } from "../../style";
import ReviewCard from "../../Components/Widgets/ReviewCard/ReviewCard";
import { businessPageStyles } from "../../Components/Styles/business/businessIndexPageStyles";
import uuid from "uuid/v1";
import CustomModal from "../../Components/Widgets/CustomModal/CustomModal";

class BusinessIndexPage extends React.Component {
  state = {
    showModal: false,
    modalId: "",
    websiteOwner: "no",
    subscriptionEmailSent:"no",
    meetingScheduled:"no",
    subscriptionEmail: {
      value: "",
      valid: false,
      touched: false,
      validationRules: {
        required: true,
        isEmail: true
      }
    },
    formData: {
      name: {
        element: "input",
        type: "text",
        value: "",
        placeholder: "Name",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true
        },
        name: "name"
      },
      email: {
        element: "input",
        type: "email",
        value: "",
        placeholder: "Email address",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isEmail: true
        },
        name: "email"
      },
      phoneNumber: {
        element: "input",
        type: "text",
        value: "",
        placeholder: "Phone number",
        errorMessage: "",
        valid: false,
        touched: false,
        validationRules: {
          required: true,
          isPhoneNumber: true
        },
        name: "phoneNumber"
      },
      objective: {
        element: "select",
        options: [
          {
            name: "Collect customer feedback",
            value: "collect_customer_feedback"
          },
          {
            name:
              "To learn, how we can increase sales by improving online reputation",
            value:
              "to_learn_how_we_can_increase_sales_by_improving_online_reputation"
          },
          {
            name: "To receive TrustSearch product demonstration",
            value: "to_receive_trustsearch_product_demonstration"
          },
          {
            name: "Other",
            value: "other"
          }
        ],
        value: "",
        validationRules: {
          required: true
        },
        valid: false,
        name: "objective",
        touched: false,
        placeholder: "Select your objective",
        errorMessage: ""
      }
    }
  };

  handleModalVisibilityToggle = id => {
    this.setState(currentState => {
      return { showModal: !currentState.showModal, modalId: id };
    });
  };

  handleSearchBoxSubmit = e => {
    e.preventDefault();
    this.handleModalVisibilityToggle("email");
  };

  handleSearchBoxChange = e =>{
    console.log(e.target.value)
  }

  handleArrangeMeetingBtnClick = () => {
    this.handleModalVisibilityToggle("scheduleMeeting");
  };

  handleInputChange = (e, id) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: {
          ...this.state.formData[id],
          value: e.target.value,
          touched: true,
          valid: validate(
            e.target.value,
            this.state.formData[id].validationRules
          )
        }
      }
    });
  };

  handleSubscriptionEmailChange = e => {
    this.setState({
      subscriptionEmail: {
        ...this.state.subscriptionEmail,
        value: e.target.value,
        valid: validate(
          e.target.value,
          this.state.subscriptionEmail.validationRules
        ),
        touched: true
      }
    });
  };

  handleSubscriptionEmailSubmit = e => {
    e.preventDefault();
    let dataToSubmit = {};
    this.setState({
      subscriptionEmail: { ...this.state.subscriptionEmail, touched: true }
    }, ()=>{
      if (this.state.subscriptionEmail.valid) {
        dataToSubmit = {
          ...dataToSubmit,
          email: this.state.subscriptionEmail.value,
          websiteOwner: this.state.websiteOwner
        };
        //mimic data post
        this.setState({subscriptionEmailSent:"in-progress"}, ()=>{
          console.log(dataToSubmit);
          setInterval(()=>{
            this.setState({subscriptionEmailSent:"success"})
          },2000)
        })
      }
    });
  };

  handleScheduleMeetingSubmit = e => {
    e.preventDefault();
    const { formData } = this.state;
    let newFormData = {};
    let dataToSubmit = {};
    let valid = true;
    for (let control in formData) {
      valid = valid && formData[control].valid;
      dataToSubmit = { ...dataToSubmit, [control]: formData[control].value };
      newFormData = {
        ...newFormData,
        [control]: { ...formData[control], touched: true }
      };
    }
    if (valid) {
      //mimic data post
      this.setState({meetingScheduled:"in-progress"}, ()=>{
        console.log(dataToSubmit);
        setInterval(()=>{
          this.setState({meetingScheduled:"success"})
        },2000)
      })
    } else {
      this.setState({ formData: { ...newFormData } });
    }
  };

  renderBusinessHeroSection = () => {
    return (
      <div className="businessHeroContainer">
        <style jsx>{businessPageStyles}</style>
        <div className="businessHeroSection">
          <div className="businessHeroLogoContainer">
            <div className="businessHeroLogo">
              <img src="/static/business/index/images/gradientLogo.png" />
            </div>
          </div>
          <div className="businessHeroHeadingsContainer">
            <h1 className="businessHeroHeading">increase your sales</h1>
            <h3 className="businessHeroSubHeading">
              by improving your trustworthiness online
            </h3>
          </div>
          <div className="businessSearchboxLabel">
            <p>Check your current website trustworthiness</p>
          </div>
          <div className="businessSearchBoxContainer">
            <SearchBox
              variant="business"
              text="CHECK"
              placeholder="www.domain.com"
              handleSearchSubmit={this.handleSearchBoxSubmit}
              onchange={this.handleSearchBoxChange}
            />
          </div>
        </div>
      </div>
    );
  };

  renderBusinessInfoSection = () => {
    const helpPoints = [
      {
        title: "Increase conversion rate:",
        image: "/static/business/index/images/icon_1.png",
        body:
          "by displaying reviews and your Trust score/proofs on Website frontpage or product page"
      },
      {
        title: "Motivate your existing customers",
        image: "/static/business/index/images/icon_2.png",
        body:
          "to leave textual and video reviews. Automatically with trustsearch api integration and already prepared email scripts."
      },
      {
        title: "Collect post-purchase reviews",
        image: "/static/business/index/images/icon_3.png",
        body: "by sending personalised surveys to every customer."
      },
      {
        title: "Negative review management:",
        image: "/static/business/index/images/icon_4.png",
        body:
          "Identify and talk with unsatisfied customers before the review is published, to be able to solve their problem before the client complains to friends or online"
      }
    ];
    return (
      <div
        className="container businessInfoContainer"
      >
        <style jsx>{businessPageStyles}</style>
        <div className="row">
          <div className="col-md-12">
            <div className="businessInfoHeader">
              <h2>How TrustSearch can help you</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {helpPoints.map(item => {
              return (
                <div className="col-md-6" key={uuid()}>
                  <div className="businessInfoHelpPoint">
                    <ReviewCard
                      title={item.title}
                      image={item.image}
                      body={item.body}
                      variant="business"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  renderBusinessSolutionSection = () => {
    const businessSolutionPoints = [
      {
        stepCount: "1",
        stepTitle: "your website and trustsearch widget",
        stepSubTitle:
          "Build your trust online & get better conversion rate",
        stepBody:
          "Calculated trustworthiness based on your client reviews and existing data from around the web about your company.",
        stepImage:"screen_1.png"
      },
      {
        stepCount: "2",
        stepTitle: "your business profile on trustsearch",
        stepSubTitle:
          "Your website visitor will click to check proof of your trust with third party - The TrustSearch",
        stepBody:
          "Your customer sees proof to your trustworthiness that they can check, it leads to higher conversin rate and more clients!",
          stepImage:"screen_2.png"
      },
      {
        stepCount: "3",
        stepTitle: "buying decision",
        stepSubTitle:
          "The website visitor is persuaded, that he can trust your business.",
        stepBody: "And then the client BUYS YOUR PRODUCT or BECOMES YOUR CLIENT",
        stepImage:"screen_3.png"
      }
    ];

    return (
      <div
        className="container businessSolutionContainer"
      >
        <style jsx>{businessPageStyles}</style>
        <div className="row">
          <div className="col-md-12">
            <div className="businessSolutionHeader">
              <h2>
                <span className="capitalize">solution</span> for companies
              </h2>
            </div>
            <div className="businessSolutionSubHeader">
              <p>
                Increase your &nbsp;
                <span className="capitalize" style={{ fontWeight: "bold" }}>
                  sales &nbsp;
                </span>
                by improving your &nbsp;
                <span className="capitalize" style={{ fontWeight: "bold" }}>
                  trustworthiness
                </span>{" "}
                &nbsp; online.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {businessSolutionPoints.map(item => {
              return (
                <div className="col-md-4" key={uuid()}>
                  <SolutionForCompaniesList item={item} />
                </div>
              );
            })}
          </div>
          <div className="row" style={{ marginTop: "2%" }}>
            <div className="col-md-12">
              <div className="businessSolutionCombinedImg">
              <img
                src="/static/business/index/images/all_together_text.png"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderWhyToSection = () => {
    return (
      <div
        className="container"
        style={{ marginTop: "10%", marginBottom: "5%" }}
      >
        <style jsx>{businessPageStyles}</style>
        <div className="row">
          <div className="col-md-12">
            <div className="whyToHeader">
              <h2>
                Why should you care to gather <br /> reviews from your
                customers?
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="whyToNumberBox">
              <div className="whyToNumber">
                <span className="number" style={{ color: "#00D350" }}>
                  63
                </span>
                <span className="symbol">%</span>
              </div>
              <div className="whyToText">
                of internet users would rather buy from a website that displays
                customer reviews and internet user will read an average of 6
                reviews before feeling confident to make their purchase.
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="whyToNumberBox">
              <div className="whyToNumber">
                <span className="number">95</span>
                <span className="symbol">%</span>
              </div>
              <div className="whyToText">
                of dissatisfied cutomers will come back if their issue is
                solved.
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="whyToNumberBox">
              <div className="whyToNumber">
                <span className="number" style={{ color: "#00A7F6" }}>
                  91
                </span>
                <span className="symbol">%</span>
              </div>
              <div className="whyToText">
                of buyers consider reviews as the most important factor in their
                purchase decision.
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="whyToNumberBox">
              <div className="whyToNumber">
                <span className="symbol" style={{ color: "#888", marginLeft:"0" }}>
                  X
                </span>
                <span className="number" style={{ color: "#888" }}>
                  12
                </span>
              </div>
              <div className="whyToText">
                Consumers are 12 x more likely to trust a customers review over
                a companys product page without one
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderSubscriptionPlanCards = () => {
    const cardsData = [
      {
        cardHeader: "Standard",
        cardBody: [
          "Claim ownership and add trust facts about your business",
          "Textual, photo and video reviews",
          "Collect & respond to Company reviews",
          "100 automated invitations per month",
          "Show your reviews and TrustScore on your Website with Widget."
        ],
        cardFooter: { price: "99", duration: "month" }
      },

      {
        cardHeader: "Premium",
        cardBody: [
          "500 automated invitations per month",
          "Product reviews",
          "10+ widget designs",
          "Custom invitation email template",
          "Google, Facebook, Trustpilot reviews invitations",
          "Manage all your business reviews in one place"
        ],
        cardFooter: { price: "199", duration: "month" }
      },

      {
        cardHeader: "Professional",
        cardBody: [
          "Unlimited invitations",
          "Additional invitation channels(SMS, WhatsApp, Messenger, Pop-ups)",
          "Custom review triggers/campaigns",
          "Custom testimonials",
          "Custom widget design",
          "API (CRM integration)"
        ],
        cardFooter: { price: "349", duration: "month" }
      }
    ];
    return (
      <div className="subscriptionPlanCardsContainer">
        <style jsx>{businessPageStyles}</style>
        <div className="container">
          <div className="row" style={{ margin: "5% 0 5% 0" }}>
            {cardsData.map(item => {
              return (
                <div className="col-md-4" style={{marginBottom:"10%"}} key={uuid()}>
                  <SubscriptionPlanCard {...item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  renderArrangeMeetingBtn = () => {
    return (
      <div className="container">
        <style jsx>{businessPageStyles}</style>
        <div className="col-md-12">
          <div className="arrangeMeetingBtnContainer">
            <button
              className="arrangeMeetingBtn"
              onClick={this.handleArrangeMeetingBtnClick}
            >
              Arrange a meeting
            </button>
          </div>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <>
        <style jsx>{businessPageStyles}</style>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="footerLogoContainer">
                <img src="/static/images/logo_footer.png" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  renderModal = () => {
    const { modalId } = this.state;
    return (
      <CustomModal
        showModal={this.state.showModal}
        handleModalClose={this.handleModalVisibilityToggle}
        modalCustomStyles={{ background: "#f9f9f9", border: "1px solid #fff" }}
      >
        {modalId === "email" ? (
          <EmailSubscription
            value={this.state.subscriptionEmail.value}
            touched={this.state.subscriptionEmail.touched}
            valid={this.state.subscriptionEmail.valid}
            handleEmailChange={this.handleSubscriptionEmailChange}
            handleSubscriptionEmailSubmit={this.handleSubscriptionEmailSubmit}
            websiteOwner={this.state.websiteOwner}
            handleWebsiteOwnerChange={value =>
              this.setState({ websiteOwner: value })
            }
            subscriptionEmailSent={this.state.subscriptionEmailSent}
          />
        ) : (
          <ScheduleMeeting
            formData={{ ...this.state.formData }}
            handleInputChange={this.handleInputChange}
            handleScheduleMeetingSubmit={this.handleScheduleMeetingSubmit}
            meetingScheduled={this.state.meetingScheduled}
          />
        )}
      </CustomModal>
    );
  };

  render() {
    return (
      <div style={{background:"#f9f9f9"}}>
        <style jsx>{layoutStyles}</style>
        {this.renderModal()}
        {this.renderBusinessHeroSection()}
        {this.renderBusinessInfoSection()}
        {this.renderBusinessSolutionSection()}
        {this.renderWhyToSection()}
        {this.renderSubscriptionPlanCards()}
        {this.renderArrangeMeetingBtn()}
        {this.renderFooter()}
      </div>
    );
  }
}
export default BusinessIndexPage;
