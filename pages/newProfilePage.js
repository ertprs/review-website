import React from "react";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import Navbar from "../Components/MaterialComponents/NavBar";
import ProfilePageHeader from "../Components/ProfilePage/ProfilePageHeader";
import ProfilePageBody from "../Components/ProfilePage/ProfilePageBody";
import Footer from "../Components/Footer/Footer";
import PusherDataComponent from "../Components/PusherDataComponent/PusherDataComponent";
import SimpleTabs from "../Components/MaterialComponents/SimpleTabs";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { iconNames } from "../utility/constants/socialMediaConstants";


class NewProfilePage extends React.Component {
  state = {
    domainData: {},
    headerData: {},
    analyzeReports: {},
    trafficReports: {},
    socialMediaStats: [],
    domainReviews: [],
    selectedTab: "overview",
    isMounted: false
  };

  componentDidMount() {
    this.setState({ isMounted: true });
    Events.scrollEvent.register("begin", function() {
      // console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function() {
      // console.log("end", arguments);
    });
  }

  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollTo() {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }
  scrollToWithContainer() {
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
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  updateParentState = newState => {
    const { domainData } = this.state;

    const headerData = {
      ...this.state.headerData,
      domain_name: _get(newState, "domain_data.name", ""),
      is_verified: _get(newState, "domain_data.is_verified", false),
      review_length: _get(newState, "reviews.domain.reviews", []).length,
      rating: _get(newState, "general_analysis.payload.ratings.watchdog", 0)
    };

    const analyzeReports = {
      ...this.state.analyzeReports,
      registration_date: _get(newState, "whois.payload.registration.value", ""),
      expiration_date: _get(newState, "whois.payload.expiration.value", ""),
      connection_safety: _get(newState, "ssl.payload.enabled.value", ""),
      organisation_check: _get(newState, "ssl.payload.ogranisation.value", ""),
      etherScam_DB: _get(newState, "etherscam.payload.status.value", ""),
      phishtank_status: _get(newState, "phishtank.payload.status.value", ""),
      trustworthiness: _get(newState, "wot.payload.trust.value", 0),
      index_Page_Analysis: _get(newState, "deface.payload.index.value", 0),
      redirect_Count: _get(newState, "deface.payload.redirect.value", 0)
    };
    let daily_unique_visitors = "";
    let monthly_unique_visitors = "";
    let pages_per_visit = "";
    let bounce_rate = "";
    let alexa_pageviews = "";
    if (_get(newState, "traffic.payload.timeline", []).length > 0) {
      daily_unique_visitors = _get(
        newState,
        "traffic.payload.timeline[0].visits.daily_unique_visitors",
        0
      );

      monthly_unique_visitors = _get(
        newState,
        "traffic.payload.timeline[0].visits.monthly_unique_visitors",
        0
      );

      pages_per_visit = _get(
        newState,
        "traffic.payload.timeline[0].visits.pages_per_visit",
        0
      );

      bounce_rate = _get(
        newState,
        "traffic.payload.timeline[0].visits.bounce_rate",
        0
      );

      alexa_pageviews = _get(
        newState,
        "traffic.payload.timeline[0].visits.alexa_pageviews",
        0
      );
    }

    const trafficReports = {
      ...this.state.trafficReports,
      daily_unique_visitors,
      monthly_unique_visitors,
      pages_per_visit,
      bounce_rate,
      alexa_pageviews
    };

    let socialMediaStats = [];
    let domainReviews = [];

    if (
      !_isEmpty(_get(newState, "social.payload", {})) &&
      typeof _get(newState, "social.payload", {}) === "object"
    ) {
      const payload = _get(newState, "social.payload", {});
      for (let item in _get(newState, "social.payload", {})) {
        let socialTemp = {};
        if (payload[item].verified) {
          socialTemp = {
            ...socialTemp,
            name: iconNames[item].name,
            followers: payload[item].followers,
            profile_url: payload[item].profile_url,
            icon: iconNames[item].name,
            color: iconNames[item].color
          };
          socialMediaStats = [...socialMediaStats, socialTemp];
        }
      }
    }

    _get(newState, "reviews.domain.reviews", []).map(review => {
      let temp = {
        ...temp,
        userName: _get(review, "user.name", ""),
        text: _get(review, "text", ""),
        ratings: _get(review, "avg_rating", 0)
      };
      domainReviews = [...domainReviews, temp];
    });

    // console.log(domainReviews, "domainReviews");

    this.setState({
      domainData: { ...newState },
      headerData: { ...headerData },
      analyzeReports: { ...analyzeReports },
      trafficReports: { ...trafficReports },
      socialMediaStats: [...socialMediaStats],
      domainReviews: [...domainReviews]
    });
  };

  handleTabChange = e => {
    // console.log(e, "handleTabChange");
  };

  handleSetActive = to => {
    if(this.state.isMounted && this.state.selectedTab!==to && window.innerWidth<=767){
      console.log("yes")
      this.setState({selectedTab:to})
    }
  };

  renderSimpleTabs = () => {
    return (
        <>
        <SimpleTabs
          handleTabChange={this.handleTabChange}
          selectedTab={this.state.selectedTab}
        >
          <Link
            activeClass="active"
            className="overview"
            to="overview"
            spy={true}
            smooth={true}
            duration={500}
            offset={-200}
            onSetActive={this.handleSetActive}
            // onClick={e => {
            //   this.setState({ selectedTab: "overview" });
            // }}
          >
            Overview
          </Link>
          <Link
            activeClass="active"
            className="reviews"
            to="reviews"
            spy={true}
            smooth={true}
            duration={500}
            offset={-50}
            onSetActive={this.handleSetActive}
            // onClick={e => {
            //   this.setState({ selectedTab: "reviews" });
            // }}
          >
            Reviews
          </Link>
          <Link
            activeClass="active"
            className="analyzeReports"
            to="analyzeReports"
            spy={true}
            smooth={true}
            duration={500}
            offset={-50}
            onSetActive={this.handleSetActive}
            // onClick={e => {
            //   this.setState({ selectedTab: "analyzeReports" });
            // }}
          >
            Reports
          </Link>
        </SimpleTabs>
        </>
    );
  };

  render() {
    const { domain } = this.props;
    const {
      headerData,
      analyzeReports,
      trafficReports,
      socialMediaStats,
      domainReviews
    } = this.state;
    // console.log("mounted new profile");
    return (
      <>
        <PusherDataComponent
          domain={domain}
          onChildStateChange={this.updateParentState}
        />
        <Navbar />
        {this.renderSimpleTabs()}
        <Element name="overview" className="overview">
          <ProfilePageHeader
            headerData={headerData}
            isMounted={this.state.isMounted}
          />
        </Element>
        <ProfilePageBody
          analyzeReports={analyzeReports}
          trafficReports={trafficReports}
          socialMediaStats={socialMediaStats}
          domainReviews={domainReviews || []}
          isMounted={this.state.isMounted}
        />
        <Footer />
      </>
    );
  }
}

NewProfilePage.getInitialProps = async ({ query }) => {
  // const oldURL = "https://watchdog-api-v1.cryptopolice.com/api/verify";
  const searchURL = query.domain
    ? `https://${query.domain}`
    : "https://google.com";
  const domain = query.domain ? query.domain : "google.com";
  if (query.amp === "1") {
    const response = await axios.get(
      `${baseURL}/api/verify?domain=${searchURL}`
    );
    return { analysisData: { ...response.data }, domain };
  }
  return { domain: domain };
};

export default NewProfilePage;
