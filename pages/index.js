import React, { useState, useEffect } from "react";
import { indexPageStyles } from "../Components/Styles/indexPageStyles";
import SearchBox from "../Components/Widgets/SearchBox/SearchBox";
import WebStats from "../Components/Widgets/WebStats/WebStats";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import Router from "next/router";
import uuid from "uuid/v1";
import { CircularProgress } from "@material-ui/core";
import Layout from "../hoc/layout/layout";
import SearchInput from "../Components/MaterialComponents/SearchInput";
import SearchBoxSuggestion from "../Components/Widgets/SuggestionBox";
import { connect } from "react-redux";
import Snackbar from "../Components/Widgets/Snackbar";
import { startLoading } from "../store/actions/loaderAction";
import { GoogleLogout } from "react-google-login";
import { logOut } from "../store/actions/authActions";
import SubscriptionPlanCard from "../Components/Widgets/SubscriptionPlanCard/SubscriptionPlanCard";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import _get from "lodash/get";
import NextLink from "next/link";
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logoContainer: {
    marginRight: "12px"
  },
  title: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // },
    "&:hover": {
      cursor: "pointer"
    }
  },
  logoImg: {
    height: "50px",
    width: "auto",
    "&:hover": {
      cursor: "pointer"
    }
  },
  navLink: {
    color: "#000",
    textDecoration: "none",
    padding: "15px 25px 0 25px",
    "&:hover": {
      color: "#d8d8d8",
      textDecoration: "none",
      cursor: "pointer"
    }
  },
  navLinkMobile: {
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      color: "#000"
    }
  },
  // navLink:{
  //   color:"#fff",
  //   textDecoration:"none",
  //   padding:"25px"
  // },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: "10px",
    height: "100%",
    position: "absolute",
    margin: "-28px 0px 0px 10px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const renderWebStats = () => {
  let statsData = [
    { header: "1,800,000,000", caption: "Active website worldwide" },
    { header: "42,000,000", caption: "Business websites on the Internet" },
    { header: "4,383,810,342", caption: "Internet users" }
  ];

  return statsData.map(dataItem => {
    return (
      <div className="homeWebStatItem" key={uuid()}>
        <style jsx>{indexPageStyles}</style>
        <WebStats {...dataItem} />
      </div>
    );
  });
};

const Home = props => {
  const [showSnackbar, setShowSnacbar] = useState(false);
  const [isLoading, setPageLoading] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  useEffect(() => {
    // code to run on component mount
    if (props.showSnackbar) {
      setShowSnacbar(true);
    }
    window.scrollTo(0, 0);
    Events.scrollEvent.register("begin", function() {});
    Events.scrollEvent.register("end", function() {});
  }, []);
  const [searchBoxVal, setSearchBoxVal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchBoxChange = e => {
    setSearchBoxVal(e.target.value);
  };

  const handleSearchSubmit = searchBoxVal => {
    console.log(searchBoxVal, "searchbox");
    props.startLoading();
    setPageLoading(true);
    if (searchBoxVal.trim() !== "") {
      if (
        /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim.test(
          searchBoxVal
        )
      ) {
        let domainName = searchBoxVal.toLowerCase().trim();
        let parsed_domain_name = domainName.replace(/https:\/\//gim, "");
        parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
        setLoading(true);
        Router.push(
          `/reviews?domain=${parsed_domain_name}`,
          `/reviews/${parsed_domain_name}`
        );
      } else {
        alert(
          "Please enter domain name in the format: (ex- thetrustsearch.com)"
        );
      }
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const scrollTo = () => {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  };
  const scrollToWithContainer = () => {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart"
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo("scroll-container-second-element", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container"
      })
    );
  };

  const renderLogo = () => {
    return (
      <div className="container">
        <style jsx>
          {`
            .logoImgContainer {
              max-width: 275px;
              height: auto;
              margin: 0 auto 50px auto;
            }
            .logoImgContainer img {
              max-width: 100%;
              height: auto;
              margin: 0 auto;
              display: block;
            }
            @media screen and (max-width: 455px) {
              .logoImgContainer {
                max-width: 190px;
                margin-bottom: 30px;
              }
            }
            @media screen and (min-width: 1367px) {
              .logoImgContainer {
                max-width: 330px;
              }
            }
            @media screen and (min-width: 1920px) {
              .logoImgContainer {
                max-width: 390px;
              }
            }
            @media screen and (min-width: 2560px) {
              .logoImgContainer {
                max-width: 435px;
              }
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="logoImgContainer">
              <img src="/static/images/gradientLogo.png" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="container footer">
        <style>{`
          .footerTopSecContainer{
            text-align:center;
            margin-top:40px;
            margin-bottom:30px;
          }
          .footerTopSecContainer a{
            color:#000;
            text-decoration:underline;
            font-weight:bold;
          }
          .footerLogoContainer{
            max-width:70px;
            height:auto;
            margin:0 auto;
          }
          .footerLowerSecContainer{
            margin:20px 0 20px 0;
          }
          .first{
            text-align:right;
          }
          .second{
            text-align:center;
          }
          @media screen and (max-width:767px){
            .first, .second{
              text-align:center;
              margin-bottom:5%;
            }
            .third{
              text-align:center;
              margin-bottom:5%;
            }
          }
          @media screen and (min-width: 1367px) {
            .footer{
              font-size: 1.2em;
            }
          }
          @media screen and (min-width: 1920px) {
            .footer{
              font-size: 1.4em;
            }
          }
          @media screen and (min-width: 2560px) {
            .footer{
              font-size: 1.6em;
            }
          }
        `}</style>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="footerTopSecContainer">
              <NextLink href="/about">
                <a>About us</a>
              </NextLink>
            </div>
            <div className="footerMiddleSecContainer">
              <div className="row">
                <div className="col-md-4 col-lg-4 col-xl-4 first">
                  TrustSearch, Ltd
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4 second">
                  <a
                    href="tel:+37128632492"
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    +371 28632492
                  </a>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-4 third">
                  <a
                    href="mailto:info@thetrustsearch.com"
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    info@thetrustsearch.com
                  </a>
                </div>
              </div>
            </div>
            <div className="footerLowerSecContainer">
              <div className="footerLogoContainer">
                <img
                  src="/static/images/9.png"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewGatheringSteps = () => {
    return (
      <div className="reviewGatheringContainer">
        <style jsx>
          {`
            .reviewGatheringContainer {
              background: #a186be;
              height: 100%;
            }
            .reviewGatheringContent {
              text-align: center;
              padding-top: 130px;
              margin-bottom: 100px;
            }
            .reviewGatheringContentHeader {
              text-transform: uppercase;
              color: #fff;
            }
            .reviewGatheringContentSubHeader {
              color: #fff;
              margin-top: 20px;
            }
            .reviewStep {
              text-align: center;
              color: #f6f6f6;
            }
            .reviewStepImgContainer {
              max-width: 200px;
              height: auto;
              margin: 35px auto 35px auto;
            }

            .reviewGatheringImgContainer {
              max-width: 800px;
              height: auto;
              margin: 80px auto 0 auto;
            }
            .reviewSteptext {
              max-width: 98%;
              margin: 0 auto;
            }
            @media screen and (max-width: 767px) {
              .reviewGatheringContent {
                margin-bottom: 50px;
                padding-top: 80px;
              }
              .reviewGatheringContentHeader {
                font-size: 2.2rem;
              }
              .reviewStep {
                margin-bottom: 8%;
              }
            }
            @media screen and (max-width: 575px) {
              .reviewGatheringContent {
                margin-bottom: 50px;
              }
            }
            @media screen and (max-width: 480px) {
              .reviewGatheringContent {
                padding-top: 60px;
              }
              .reviewGatheringContentHeader {
                font-size: 1.5rem;
              }
              .reviewSteptext {
                font-size: 0.85rem;
              }
            }
            @media screen and (min-width: 1367px) {
              .reviewSteptext {
                font-size: 1.2em;
              }
            }
            @media screen and (min-width: 1920px) {
              .reviewSteptext {
                font-size: 1.4em;
              }
            }
            @media screen and (min-width: 2560px) {
              .reviewSteptext {
                font-size: 1.6em;
              }
            }
          `}
        </style>
        <div className="container">
          <div className="reviewGatheringContent">
            <h1 className="reviewGatheringContentHeader">
              Review gathering automation
            </h1>
          </div>
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="reviewStep">
                <div
                  className="reviewStepImgContainer"
                  style={{ maxWidth: "150px", height: "auto" }}
                >
                  <img
                    src="/static/images/2.png"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="reviewSteptext">You have a new customer</div>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="reviewStep">
                <div
                  className="reviewStepImgContainer"
                  style={{ maxWidth: "126px", height: "auto" }}
                >
                  <img
                    src="/static/images/3.png"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="reviewSteptext">
                  He will receive an email notification to leave a review
                </div>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="reviewStep">
                <div
                  className="reviewStepImgContainer"
                  style={{ maxWidth: "220px", height: "auto" }}
                >
                  <img
                    src="/static/images/4.png"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="reviewSteptext">
                  The customer will be able to quickly and easily leave a review
                  about your company and product
                </div>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="reviewStep">
                <div
                  className="reviewStepImgContainer"
                  style={{ maxWidth: "160px", height: "auto" }}
                >
                  <img
                    src="/static/images/5.png"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="reviewSteptext">
                  Collecting customer reviews will build trust in your website,
                  which will boost your sales
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className="reviewGatheringImgContainer">
                <img
                  src="/static/images/6.png"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSubscriptionCards = () => {
    const cardsData = [
      {
        cardHeader: "Free",
        cardBody: [
          "Display your reviews on the website with 1 design review widget.",
          "Invite 100 customers per month to leave reviews.",
          "You can only manually invite customers by copying contacts.",
          "Collect and respond to company reviews in the Trustsearch dashboard.",
          "Choose from 1 email template form."
        ],
        cardFooter: { price: "Free", duration: "" }
      },

      {
        cardHeader: "Premium",
        cardBody: [
          "10 different design review widgets.",
          "Invite 500 customers per month to leave feedback",
          "Ability to automate customer invitations to leave reviews.",
          "Option to add motivation (discounts, rewards) to clients.",
          "Custom invitation email template.",
          "Invitations are possible to Google reviews, Facebook reviews, TrustPilot.",
          "Individual customer support."
        ],
        cardFooter: { price: "99", duration: "month" }
      },

      {
        cardHeader: "Professional",
        cardBody: [
          "Free and Premium benefits +",
          "A fully customizable review widget.",
          "Invite an unlimited number of customers per month to leave reviews.",
          "Ability to send invitations to WhatsApp, SMS, Messenger.",
          "Software for a physical review stands in the shop or office.",
          "Ability to add other reputation facts to the review widget."
        ],
        cardFooter: { price: "Coming Soon", duration: "" }
      }
    ];
    return (
      <div className="subscriptionPlanCardsContainer">
        <style jsx>{`
          .subscriptionPlanCardsContainer {
            background: #f5da98;
            padding-top: 150px;
          }
          .arrangeMeetingBtnContainer {
            text-align: center;
            margin-bottom: 5%;
          }
          .arrangeMeetingBtn {
            padding: 1.5% 6% 1.5% 6%;
            border-radius: 50px;
            border-top: 1px solid #00a7f6;
            border-bottom: 1px solid #00d350;
            border-right: 1px solid #00a7f6;
            border-left: 1px solid #00a7f6;
            outline: none;
            color: #fff;
            text-transform: uppercase;
            font-weight: bold;
            background: linear-gradient(
              to bottom right,
              rgba(0, 167, 246, 0.9) 20%,
              rgba(0, 211, 80, 0.95)
            );
            transition: all 0.4s;
            -webkit-transition: all 0.4s;
            cursor: pointer;
          }

          .arrangeMeetingBtn:link,
          .arrangeMeetingBtn:visited,
          .arrangeMeetingBtn:hover,
          .arrangeMeetingBtn:active {
            outline: none;
          }
          @media screen and (max-width: 767px) {
            .subscriptionPlanCardsContainer {
              padding-top: 100px;
            }
            .subscriptionCardBox {
              margin-bottom: 12%;
            }
            .arrangeMeetingBtnContainer {
              text-align: center;
              margin-bottom: 15%;
            }
            .arrangeMeetingBtn {
              padding: 4% 12% 4% 12%;
            }
          }
          @media screen and (min-width: 1367px) {
            .arrangeMeetingBtn {
              font-size: 1.2em;
            }
          }
          @media screen and (min-width: 1920px) {
            .arrangeMeetingBtn {
              font-size: 1.4em;
            }
          }
          @media screen and (min-width: 2560px) {
            .arrangeMeetingBtn {
              font-size: 1.6em;
            }
          }
        `}</style>
        <div className="container">
          <div className="row">
            {cardsData.map(item => {
              return (
                <div
                  className="col-md-4 col-lg-4 col-xl-4"
                  style={{ marginBottom: "15px" }}
                  key={uuid()}
                >
                  <div className="subscriptionCardBox">
                    <SubscriptionPlanCard {...item} variant="newIndexPage" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className="arrangeMeetingBtnContainer">
                <button
                  className="arrangeMeetingBtn"
                  onClick={() => {
                    Router.push("/registration#business");
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewWidget = () => {
    return (
      <div className="renderReviewWidgetContainer">
        <style jsx>
          {`
            .renderReviewWidgetContainer {
              height: 100%;
              margin-bottom: 100px;
            }
            .renderReviewWidgetContent {
              text-align: center;
              padding-top: 130px;
              margin-bottom: 100px;
            }
            .renderReviewWidgetContentHeader {
              text-transform: uppercase;
              color: #000;
            }
            .widgetImageContainer,
            .widgetSmallImageContainerUpper,
            .widgetSmallImageContainerLower {
              max-width: 1050px;
              height: auto;
              margin: 0 auto;
              text-align: center;
            }
            .widgetSmallImageContainerUpper {
              margin-bottom: 6%;
            }
            .widgetSmallImageContainerUpper,
            .widgetSmallImageContainerLower {
              display: none;
            }
            .arrangeMeetingBtnContainer {
              text-align: center;
              margin-bottom: 5%;
            }
            .arrangeMeetingBtn {
              padding: 1.5% 6% 1.5% 6%;
              border-radius: 50px;
              border-top: 1px solid #00a7f6;
              border-bottom: 1px solid #00d350;
              border-right: 1px solid #00a7f6;
              border-left: 1px solid #00a7f6;
              outline: none;
              color: #fff;
              text-transform: uppercase;
              font-weight: bold;
              background: linear-gradient(
                to bottom right,
                rgba(0, 167, 246, 0.9) 20%,
                rgba(0, 211, 80, 0.95)
              );
              transition: all 0.4s;
              -webkit-transition: all 0.4s;
              cursor: pointer;
            }

            .arrangeMeetingBtn:link,
            .arrangeMeetingBtn:visited,
            .arrangeMeetingBtn:hover,
            .arrangeMeetingBtn:active {
              outline: none;
            }
            @media screen and (max-width: 767px) {
              .renderReviewWidgetContent {
                margin-bottom: 50px;
                padding-top: 80px;
              }
              .renderReviewWidgetContentHeader {
                font-size: 2.2rem;
              }
              .widgetImageContainer {
                display: none;
              }
              .widgetSmallImageContainerUpper,
              .widgetSmallImageContainerLower {
                display: block;
              }
              .arrangeMeetingBtnContainer {
                text-align: center;
                margin-bottom: 15%;
              }
              .arrangeMeetingBtn {
                padding: 4% 12% 4% 12%;
              }
            }
            @media screen and (max-width: 575px) {
              .renderReviewWidgetContent {
                margin-bottom: 50px;
                padding-top: 60px;
              }
            }
            @media screen and (max-width: 480px) {
              .renderReviewWidgetContent {
                padding-top: 60px;
              }
              .renderReviewWidgetContentHeader {
                font-size: 1.5rem;
              }
              .reviewSteptext {
                font-size: 0.85rem;
              }
            }
            @media screen and (min-width: 1367px) {
              .arrangeMeetingBtn {
                font-size: 1.3em;
              }
            }
            @media screen and (min-width: 1920px) {
              .arrangeMeetingBtn {
                font-size: 1.4em;
              }
            }
            @media screen and (min-width: 2560px) {
              .arrangeMeetingBtn {
                font-size: 1.6em;
              }
            }
          `}
        </style>
        <div className="container">
          <div className="renderReviewWidgetContent">
            <h1 className="renderReviewWidgetContentHeader">
              Review Widget in your webpage
            </h1>
          </div>
          <div className="widgetImageContainer">
            <div>
              <img
                src="/static/images/7.png"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="widgetSmallImageContainerUpper">
            <img
              src="/static/images/small_9b.png"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="widgetSmallImageContainerLower">
            <img
              src="/static/images/small_9c.png"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div>{renderWidgetSteps()}</div>
          <div className="arrangeMeetingBtnContainer">
            <button
              className="arrangeMeetingBtn"
              onClick={() => {
                Router.push("/registration#business");
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderWidgetSteps = () => {
    return (
      <div className="widgetAddStepsContainer">
        <style jsx>{`
          .widgetAddStepsContainer {
            margin: 100px auto 50px auto;
          }
          .widgetAddStep {
            display: flex;
            justify-content: space-between;
          }
          .widgetAddStepText {
            font-weight: bold;
            align-self: center;
          }
          .widgetAddStepImgContainer {
            max-width: 32px;
            height: auto;
          }
          .widgetAddStepImgContainer img {
            max-width: 100%;
            height: auto;
          }
          .smallImg {
            display: none;
          }
          @media screen and (max-width: 767px) {
            .widgetAddStepsContainer {
              margin: 50px auto 50px auto;
            }
            .widgetAddStep {
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .widgetAddStepImgContainer {
              max-width: 25px;
              height: auto;
            }
            .smallImg {
              display: block;
              margin: 15px 0 15px 0;
            }
            .bigImg {
              display: none;
            }
            .lastStep {
              text-align: center;
            }
          }
          @media screen and (min-width: 1367px) {
            .widgetAddStepText {
              font-size: 1.3em;
            }
          }
          @media screen and (min-width: 1920px) {
            .widgetAddStepText {
              font-size: 1.4em;
            }
          }
          @media screen and (min-width: 2560px) {
            .widgetAddStepText {
              font-size: 1.6em;
            }
          }
        `}</style>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xl-4">
            <div className="widgetAddStep">
              <div className="widgetAddStepText">
                1. Apply to receive your review widget.
              </div>
              <div className="widgetAddStepImgContainer">
                <img src="/static/images/8.png" className="bigImg" />
                <img src="/static/images/9d.png" className="smallImg" />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4">
            <div className="widgetAddStep">
              <div className="widgetAddStepText">
                2. Copy the widget code generated for you.
              </div>
              <div className="widgetAddStepImgContainer">
                <img src="/static/images/8.png" className="bigImg" />
                <img src="/static/images/9d.png" className="smallImg" />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4">
            <div className="widgetAddStep">
              <div className="widgetAddStepText lastStep">
                3. Paste this code into your homepage and your review widget
                will appear.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWhyYouNeedReviews = () => {
    return (
      <div className="whyYouNeedReviewsContainer">
        <style jsx>
          {`
            .whyYouNeedReviewsContainer {
              background: rgb(36, 181, 231);
              height: 100%;
            }
            .whyYouNeedReviewsContent {
              text-align: center;
              padding-top: 80px;
              margin-bottom: 100px;
            }
            .whyYouNeedReviewsContentHeader {
              text-transform: uppercase;
              color: #fff;
            }
            .whyYouNeedReviewsContentSubHeader {
              color: #fff;
              margin-top: 20px;
            }
            .whyToHeader {
              margin: 3% 0 8% 0;
            }

            .whyToHeader h2 {
              font-size: 2.2rem;
            }

            .whyToNumberBox {
              color: #fff;
            }

            .whyToNumber {
              text-align: center;
            }

            .whyToNumber .number {
              font-weight: bolder;
              font-size: 4.5rem;
              vertical-align: baseline;
            }

            .whyToNumber .symbol {
              margin-left: 1%;
              font-size: 3.2rem;
            }

            .whyToText {
              font-size: 0.9rem;
              text-align: center;
              width: 98%;
              margin: 0 auto;
              color: #fefefe;
            }
            .whyYouNeedReviewsImgContainer {
              max-width: 900px;
              height: auto;
              margin: 50px auto 0 auto;
            }
            @media screen and (max-width: 767px) {
              .whyYouNeedReviewsContent {
                margin-bottom: 50px;
              }

              .whyYouNeedReviewsContentHeader {
                font-size: 2.2rem;
              }

              .whyToNumberBox {
                margin-bottom: 8%;
              }

              .whyToNumber .symbol {
                margin-left: 3%;
                font-size: 2.3rem;
              }
            }

            @media screen and (max-width: 575px) {
              .whyYouNeedReviewsContent {
                margin-bottom: 50px;
              }
            }

            @media screen and (max-width: 520px) {
              /*---- WhyTo section ----*/
              .whyToHeader {
                text-align: center;
              }
              .whyToHeader h2 {
                font-size: 2.05rem;
              }
            }
            @media screen and (max-width: 480px) {
              .whyYouNeedReviewsContent {
                padding-top: 60px;
              }
              .whyYouNeedReviewsContentHeader {
                font-size: 1.5rem;
              }
              .whyToNumber .number {
                font-size: 2.5rem;
              }
              .whyToNumber .symbol {
                font-size: 2rem;
              }
              .whyToText {
                font-size: 0.85rem;
              }
            }
            @media screen and (max-width: 363px) {
              /*---- WhyTo section ----*/
              .whyToHeader {
                text-align: right;
              }
            }
            @media screen and (min-width: 1367px) {
              .whyToText {
                font-size: 1.3em;
              }
            }
            @media screen and (min-width: 1920px) {
              .whyToText {
                font-size: 1.4em;
              }
            }
            @media screen and (min-width: 2560px) {
              .whyToText {
                font-size: 1.6em;
              }
            }
          `}
        </style>
        <div className="container">
          <div className="whyYouNeedReviewsContent">
            <h1 className="whyYouNeedReviewsContentHeader">
              why you need customer reviews
            </h1>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-4 col-xl-4">
              <div className="whyToNumberBox">
                <div className="whyToNumber">
                  <span className="number">63</span>
                  <span className="symbol">%</span>
                </div>
                <div className="whyToText">
                  Of internet users are more likely to buy from a site that
                  shows customer testimonials, and an average internet user will
                  read 6 reviews before feeling confident about their purchase.
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-4 col-xl-4">
              <div className="whyToNumberBox">
                <div className="whyToNumber">
                  <span className="number">95</span>
                  <span className="symbol">%</span>
                </div>
                <div className="whyToText">
                  Of dissatisfied cutomers will return if their negative
                  experience is resolved.
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-4 col-xl-4">
              <div className="whyToNumberBox">
                <div className="whyToNumber">
                  <span className="number">91</span>
                  <span className="symbol">%</span>
                </div>
                <div className="whyToText">
                  Of shoppers consider feedback as the most important factor
                  when making a purchase.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className="whyYouNeedReviewsImgContainer">
                <img
                  src="/static/images/1.png"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSlidingArrow = () => {
    return (
      <Link
        activeClass="banner"
        className="banner"
        to="banner"
        spy={true}
        smooth={true}
        duration={500}
        // offset={-200}
        // onSetActive={this.handleSetActive}
        // onClick={e => {
        //   this.setState({ selectedTab: "overview" });
        // }}
      >
        <div className="slidingArrowContainer">
          <style jsx>
            {`
              .slidingArrowContainer {
                margin-top: 15vh;
                margin-bottom: 10vh;
              }
              .arrowImageContainer {
                max-width: 48px;
                margin: 0 auto;
                cursor: pointer;
              }
              @media screen and (max-width: 767px) {
                .slidingArrowContainer {
                  margin-top: 5vh;
                  margin-bottom: 20vh;
                }
              }
              @media screen and (max-width: 455px) {
                .arrowImageContainer {
                  max-width: 40px;
                  margin: 0 auto;
                  cursor: pointer;
                }
              }
            `}
          </style>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12 col-xl-12">
                <div className="arrowImageContainer">
                  <img
                    src="/static/images/arrow.png"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const handleMobileMenuLeftClick = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMobileMenuLeftClose = () => {
    setAnchorEl2(null);
  };

  const renderMobileMenuRight = () => {
    const { auth } = props;
    const loginType = _get(auth, "logIn.loginType", 0);
    const { authorized } = auth.logIn || false;

    return (
      <div>
        <style jsx>
          {`
            .mobileLink {
              color: #000;
            }
          `}
        </style>
        <IconButton
          // aria-label="more"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMobileMenuLeftClick}
        >
          <MenuIcon style={{ color: "rgb(36,181,231)", fontSize: "28px" }} />
          {/* <i className="fa fa-bars" style={{ color: "rgb(36,181,231)" }}></i> */}
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleMobileMenuLeftClose}
        >
          <NextLink href="/about">
            <MenuItem onClick={handleMobileMenuLeftClose}>
              <a className="mobileLink">About us</a>
            </MenuItem>
          </NextLink>
          <a
            href="https://b2b.thetrustsearch.com/en/"
            target="_blank"
            className="mobileLink"
          >
            <MenuItem onClick={handleMobileMenuLeftClose}>Business</MenuItem>
          </a>

          <a
            href="https://thetrustsearch.com/termsAndConditions"
            target="_blank"
            className="mobileLink"
          >
            <MenuItem onClick={handleMobileMenuLeftClose}>
              Terms &amp; Conditions
            </MenuItem>
          </a>
          <div>
            {!authorized ? (
              <>
                <NextLink href="/login">
                  <MenuItem className="hide-sm">
                    <a className={`${classes.navLinkMobile} loginBtn`}>Login</a>
                  </MenuItem>
                </NextLink>
                <NextLink href="/registration">
                  <MenuItem className="hide-sm">
                    <a className={`${classes.navLinkMobile} signUpBtn`}>
                      Sign up
                    </a>
                  </MenuItem>
                </NextLink>
              </>
            ) : (
              <>
                {authorized && loginType === 4 ? (
                  <NextLink href="/dashboard">
                    <MenuItem onClick={handleMenuClose}>
                      <a style={{ textDecoration: "none", color: "#000" }}>
                        Dashboard
                      </a>
                    </MenuItem>
                  </NextLink>
                ) : null}
                {loginType === 1 || loginType === 2 ? (
                  <NextLink href="">
                    <MenuItem>
                      <a
                        onClick={() => handleLogout()}
                        style={{
                          textDecoration: "none",
                          color: "#000"
                        }}
                      >
                        Logout
                      </a>
                    </MenuItem>
                  </NextLink>
                ) : (
                  ""
                )}
                {loginType === 3 ? (
                  <GoogleLogout
                    clientId={process.env.GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    render={renderProps => (
                      <NextLink href="">
                        <MenuItem>
                          <a
                            onClick={() => handleLogout()}
                            style={{
                              textDecoration: "none",
                              color: "#000"
                            }}
                          >
                            Logout
                          </a>
                        </MenuItem>
                      </NextLink>
                    )}
                    // onLogoutSuccess={logout}
                  ></GoogleLogout>
                ) : (
                  ""
                )}
                {loginType === 4 ? (
                  <NextLink href="">
                    <MenuItem>
                      <a
                        onClick={() => handleLogout()}
                        style={{
                          textDecoration: "none",
                          color: "#000"
                        }}
                      >
                        Logout
                      </a>
                    </MenuItem>
                  </NextLink>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </Menu>
      </div>
    );
  };

  const { auth } = props;
  const { authorized } = auth.logIn || false;
  const { userProfile } = auth.logIn || {};
  const loginType = _get(auth, "logIn.loginType", 0);
  let userName = "";
  if (userProfile) {
    if (userProfile.hasOwnProperty("name")) {
      if (userProfile.name) {
        if (userProfile.name.length > 0) {
          let nameAfterSplit = userProfile.name.split(" ");
          if (nameAfterSplit.length > 0) {
            userName = nameAfterSplit[0];
          }
        }
      }
    }
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleLogout = () => {
    if (loginType === 2) {
      if (window) {
        if (window.hasOwnProperty("FB")) {
          window.FB.logout();
        }
      }
    }
    if (loginType === 3) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2
          .signOut()
          .then(
            auth2
              .disconnect()
              .then(console.log("Logout Sucessfully from google."))
          );
      }
    }
    setShowSnacbar(true);
    props.logOut();
    Router.push("/");
  };

  const handleProfileMenuOpen = event => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const profileMenuId = "profile-menu";
  const renderProfileMenu = (
    <Menu
      style={{ marginTop: "30px" }}
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {authorized && loginType === 4 ? (
        <NextLink href="/dashboard">
          <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
        </NextLink>
      ) : null}
      {loginType === 1 || loginType === 2 ? (
        <NextLink href="">
          <MenuItem onClick={() => handleLogout()}>
            <a>Logout</a>
          </MenuItem>
        </NextLink>
      ) : (
        ""
      )}
      {loginType === 3 ? (
        <GoogleLogout
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Logout"
          render={renderProps => (
            <NextLink href="">
              <MenuItem onClick={() => handleLogout()}>
                <a>Logout</a>
              </MenuItem>
            </NextLink>
          )}
          // onLogoutSuccess={logout}
        ></GoogleLogout>
      ) : (
        ""
      )}
      {loginType === 4 ? (
        <NextLink href="">
          <MenuItem onClick={() => handleLogout()}>
            <a>Logout</a>
          </MenuItem>
        </NextLink>
      ) : (
        ""
      )}
    </Menu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div style={{ background: "rgb(251,251,251)" }}>
      {/* <style jsx>{indexPageStyles}</style> */}
      <div className="topRightLinksContainer">
        <style jsx>
          {`
            .mobileMenuContainerOuter,
            .mobileMenuContainer {
              display: none;
            }
            .topRightLinksContainer {
              display: flex;
              padding-top: 15px;
            }
            .topRightLinksContainer > div {
              flex-basis: 40%;
            }
            .topRightLinksContainer > div:last-child {
              flex-basis: 60%;
              justify-content: flex-end;
            }
            .topRightLinksItem {
              display: flex;
              flex-basis: 50%;
              justify-content: center;
            }
            .topRightLinksItem > div {
              text-align: center;
              margin: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .loginBtn,
            .signUpBtn {
              border: 2.2px solid rgb(1, 172, 231);
              background: #fff;
              display: inline-block;
              padding: 10px 40px 10px 40px;
              border-radius: 35px;
              -webkit-transition: all 0.4s;
              transition: all 0.4s;
            }
            .loginBtn:hover,
            .signUpBtn:hover {
              text-decoration: none;
              color: #fff;
              background: rgb(1, 172, 231);
            }
            .signUpBtn {
              border: 2.2px solid rgb(1, 172, 231);
              background: rgb(1, 172, 231);
              color: #fff;
            }
            .signUpBtn:hover {
              color: #000;
              background: #fff;
            }
            @media screen and (max-width: 1281px) {
              .topRightLinksContainer > div:first-child {
                flex-basis: 30%;
              }
              .topRightLinksContainer > div:last-child {
                flex-basis: 70%;
                justify-content: flex-end;
              }
            }

            @media screen and (max-width: 958px) {
              .topRightLinksContainer > div:first-child {
                flex-basis: 25%;
              }
              .topRightLinksContainer > div:last-child {
                flex-basis: 75%;
                justify-content: flex-end;
              }
            }

            @media screen and (max-width: 920px) {
              .topRightLinksContainer > div:first-child {
                flex-basis: 15%;
              }
              .topRightLinksContainer > div:last-child {
                flex-basis: 85%;
                justify-content: flex-end;
              }
              .loginBtn,
              .signUpBtn {
                border: 2.2px solid rgb(1, 172, 231);
                display: inline-block;
                padding: 6px 35px 6px 35px;
                border-radius: 35px;
                -webkit-transition: all 0.4s;
                transition: all 0.4s;
              }
            }
            @media screen and (max-width: 767px) {
              .topRightLinksContainer {
                padding: 0;
              }
              .hide-sm {
                display: none;
              }
              .hide-sm a {
                display: none;
              }
              .mobileMenuContainerOuter {
                display: flex;
              }
              .mobileMenuContainer {
                display: flex;
              }
            }
            @media screen and (min-width: 1367px) {
              .topRightLinksContainer {
              }
              .topRightLinksItem {
                font-size: 1.2em;
              }
            }
            @media screen and (min-width: 1920px) {
              .topRightLinksItem {
                font-size: 1.4em;
                padding-top: 40px;
              }
            }
            @media screen and (min-width: 2560px) {
              .topRightLinksItem {
                font-size: 1.6em;
                padding-top: 40px;
              }
            }
          `}
        </style>
        {/* <div className="mobileMenuContainerOuter">
          <div className="mobileMenuContainer">{renderMobileMenuLeft()}</div>
        </div> */}
        <div></div>
        <div className="topRightLinksItem">
          <div className="hide-sm">
            <NextLink href="/about">
              <a className={classes.navLinkMobile}>About us</a>
            </NextLink>
          </div>
          <div className="hide-sm">
            <a
              className={classes.navLinkMobile}
              href="https://b2b.thetrustsearch.com/en/"
              target="_blank"
            >
              Business
            </a>
          </div>
          <div className="hide-sm">
            <a
              className={classes.navLinkMobile}
              href="https://thetrustsearch.com/termsAndConditions"
              target="_blank"
            >
              Terms &amp; Conditions
            </a>
          </div>
          {!authorized ? (
            <>
              <div className="hide-sm">
                <NextLink href="/login">
                  <a className={`${classes.navLinkMobile} loginBtn`}>Login</a>
                </NextLink>
              </div>
              <div className="hide-sm">
                <NextLink href="/registration">
                  <a className={`${classes.navLinkMobile} signUpBtn`}>
                    Sign up
                  </a>
                </NextLink>
              </div>
            </>
          ) : (
            <>
              <NextLink>
                <span
                  className={`${classes.navLink} hide-sm`}
                  onClick={e => {
                    e.preventDefault();
                    handleProfileMenuOpen(e);
                  }}
                >
                  <span>Hello, {userName}</span>
                </span>
              </NextLink>
              {renderProfileMenu}
            </>
          )}
          <div className="mobileMenuContainerOuter">
            <div className="mobileMenuContainer">{renderMobileMenuRight()}</div>
          </div>
        </div>
      </div>
      <div className="boxContainer">
        <style jsx>{`
          .boxContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 65vh;
          }
          .boxContent {
            width: 100%;
          }
          .searchBoxContainer {
            position: relative;
            width: 62%;
            margin: 0 auto;
          }
          .taglineContainer {
            text-align: center;
            margin-top: 35px;
          }
          .taglineHeader {
            font-weight: 390;
            font-size: 1.1rem;
            color: #000;
            letter-spacing: 2.2px;
          }

          @media screen and (max-width: 767px) {
            .searchBoxContainer {
              width: 90%;
              margin: 0 auto;
            }
          }
          @media screen and (max-width: 455px) {
            .taglineHeader {
              font-size: 0.9rem;
              letter-spacing: 0px;
            }
          }
          @media screen and (min-width: 1367px) {
            .taglineHeader {
              font-size: 1.3em;
            }
          }
          @media screen and (min-width: 1920px) {
            .taglineHeader {
              font-size: 1.4em;
            }
          }
          @media screen and (min-width: 2560px) {
            .taglineHeader {
              font-size: 1.6em;
            }
          }
        `}</style>
        <div className="boxContent">
          {/* {renderHeroContent(searchBoxVal, setSearchBoxVal, loading, setLoading)} */}
          {renderLogo()}
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12 col-xl-12">
                <div className="searchBoxContainer">
                  <SearchInput
                    onchange={handleSearchBoxChange}
                    value={searchBoxVal}
                    onkeyDown={e => {
                      if (e.keyCode == 13) {
                        handleSearchSubmit(searchBoxVal);
                      }
                    }}
                    onsubmit={() => handleSearchSubmit(searchBoxVal)}
                  />
                  {searchBoxVal.length > 0 ? (
                    <SearchBoxSuggestion
                      searchBoxVal={searchBoxVal}
                      handleSearchSuggestionClick={handleSearchSubmit}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12 col-xl-12">
                <div className="taglineContainer">
                  <div className="taglineHeader">
                    Check your current website trustworthiness
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {renderFooter()} */}
        </div>
      </div>
      {renderSlidingArrow()}
      <Element name="banner" className="banner">
        <div>{renderWhyYouNeedReviews()}</div>
      </Element>
      {renderReviewGatheringSteps()}
      {renderReviewWidget()}
      {renderSubscriptionCards()}
      {renderFooter()}
      <Snackbar
        open={showSnackbar}
        variant={_get(props, "variant", "")}
        handleClose={() => setShowSnacbar(false)}
        message={_get(props, "message", "")}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { auth, trustVote, profileData } = state;
  const authorized = _get(auth, "logIn.authorized", false);
  const profileDataActionType = _get(profileData, "type", "");
  const reportDomainSuccess = _get(
    profileData,
    "reportDomain.success",
    "undefined"
  );
  const reportDomainErrorMsg = _get(profileData, "reportDomain.errorMsg", "");
  let showSnackbar = false;
  let variant = "";
  let message = "";

  if (
    authorized &&
    _get(trustVote, "payload.success", false) === true &&
    _get(trustVote, "type", "") === "TRUST_VOTE_SUCCESS"
  ) {
    showSnackbar = true;
    variant = "success";
    message = "Review Posted Successfully!";
  } else if (
    authorized &&
    !_get(trustVote, "payload.success", false) === false &&
    _get(trustVote, "type", "") === "TRUST_VOTE_FAILURE"
  ) {
    showSnackbar = true;
    variant = "error";
    message = "Some Error Occured!";
  }

  if (
    authorized &&
    (profileDataActionType === "REPORT_DOMAIN_SUCCESS" ||
      profileDataActionType === "REPORT_DOMAIN_FAILURE")
  ) {
    if (reportDomainSuccess === true) {
      showSnackbar = true;
      variant = "success";
      message = "Domain Reported successfully!";
    } else if (reportDomainSuccess === false) {
      showSnackbar = true;
      variant = "error";
      message = reportDomainErrorMsg;
    }
  }
  return { showSnackbar, variant, message, auth };
};

export default connect(mapStateToProps, { startLoading, logOut })(Home);
