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
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { iconNames } from "../utility/constants/socialMediaConstants";
import {
  setDomainDataInRedux,
  setLoading
} from "../store/actions/domainProfileActions";
import { connect } from "react-redux";
import DomainPusherComponent from "../Components/DomainPusherComponent/DomainPusherComponent";
import { getAggregateData, setAggregateData } from "../store/actions/aggregateActions";
import Router from "next/router";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../Components/MaterialComponents/NavBar"));
const ProfilePageHeader = dynamic(() =>
  import("../Components/ProfilePage/ProfilePageHeader")
);
const ProfilePageBody = dynamic(
  () => import("../Components/ProfilePage/ProfilePageBody"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);
const Footer = dynamic(() => import("../Components/Footer/Footer"));
import PusherDataComponent from "../Components/PusherDataComponent/PusherDataComponent";
const SimpleTabs = dynamic(() =>
  import("../Components/MaterialComponents/SimpleTabs")
);
import Snackbar from "../Components/Widgets/Snackbar";

class Profile extends React.Component {
  state = {
    domainData: {},
    headerData: {},
    analyzeReports: {},
    trafficReports: {},
    socialMediaStats: [],
    domainReviews: [],
    selectedTab: "overview",
    isLoading: true,
    isMounted: false,
    searchBoxVal: "",
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    id: "",
    aggregateSocialData:{}
  };

  componentDidMount() {
    this.setState({ isMounted: true });
    Router.events.on("routeChangeStart", this.handleRouteChange);
    Events.scrollEvent.register("begin", function() {});
    Events.scrollEvent.register("end", function() {});
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

  updateAggregatorData = newData => {
    //send to action creator (newData, id)
    // disable same data calls
    const { id, aggregateSocialData } = this.state;
    const socialAppId = _get(newData, "response.socialAppId",undefined)
    console.log(socialAppId);
    // if(socialAppId){
    //   if(aggregateSocialData[socialAppId]===undefined){
    //     this.props.getAggregateData(newData, id);
    //   }
    // }
    this.props.getAggregateData(newData, id);
  };

  updateParentState = newState => {
    this.props.setDomainDataInRedux(newState);
    const { domainData } = this.state;
    if (this.state.id === "") {
      const id = _get(newState, "id", "");
      this.setState({ id });
    }
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

    this.setState({
      domainData: { ...newState },
      headerData: { ...headerData },
      analyzeReports: { ...analyzeReports },
      trafficReports: { ...trafficReports },
      socialMediaStats: [...socialMediaStats],
      domainReviews: [...domainReviews]
    });

    let aggregateSocialData = {...this.state.aggregateSocialData};

    if (
      !_isEmpty(_get(newState, "social.payload", {})) &&
      typeof _get(newState, "social.payload", {}) === "object"
    ) {
      const payload = _get(newState, "social.payload", {});
      for (let item in _get(newState, "social.payload", {})) {
        aggregateSocialData = {...aggregateSocialData, [item]: payload[item]}
      }
    }
    this.setState({aggregateSocialData:{...aggregateSocialData}});
    this.props.setAggregateData({...aggregateSocialData});
  };

  handleTabChange = e => {};

  handleSetActive = to => {
    if (
      this.state.isMounted &&
      this.state.selectedTab !== to &&
      window.innerWidth <= 767
    ) {
      this.setState({ selectedTab: to });
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

  handleSearchBoxKeyPress = e => {
    const { searchBoxVal } = this.state;
    if (
      e.keyCode === 13 &&
      this.state.searchBoxVal.trim() !== "" &&
      /^[^www.][a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
        searchBoxVal
      )
    ) {
      let domainName = searchBoxVal.toLowerCase().trim();
      window.location.assign(`${domainName}`);
    }
  };

  handleRouteChange = url => {};

  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;

    if (this.props.auth !== prevProps.auth) {
      const isLoginFailed = _get(auth, "logInTemp.isLoginFailed", false);
      const isWrongCredentials = _get(
        auth,
        "logInTemp.isWrongCredentials",
        false
      );
      const actionType = _get(auth, "type", "");
      const authorized = _get(auth, "logIn.authorized", false);
      if (isLoginFailed) {
        if (isWrongCredentials) {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: "Incorrect credentials!"
          });
        } else {
          this.setState({
            showSnackbar: true,
            variant: "error",
            snackbarMsg: "Some Error Occured!"
          });
        }
      } else if (authorized) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Logged in successfully!"
        });
      }
    }
  }

  render() {
    const { domain } = this.props;
    const {
      headerData,
      analyzeReports,
      trafficReports,
      socialMediaStats,
      domainReviews
    } = this.state;
    if (!_isEmpty(_get(this.state, "domainData", {}))) {
      if (!_isEmpty(_get(this.state, "domainData.domain_data", {}))) {
        if (this.state.isLoading) {
          this.setState({ isLoading: false });
        }
      }
    }

    if (this.state.isLoading) {
      this.props.setLoading(true);
    } else {
      this.props.setLoading(false);
    }

    return (
      <>
        <PusherDataComponent
          domain={domain}
          onChildStateChange={this.updateParentState}
        />
        <DomainPusherComponent
          domain={domain}
          onAggregatorDataChange={this.updateAggregatorData}
        />
        <Navbar
          handleSearchBoxChange={e =>
            this.setState({ searchBoxVal: e.target.value })
          }
          handleSearchBoxKeyPress={this.handleSearchBoxKeyPress}
          value={this.state.searchBoxVal}
        />
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
        <Snackbar
          open={this.state.showSnackbar}
          variant={this.state.variant}
          handleClose={() => this.setState({ showSnackbar: false })}
          message={this.state.snackbarMsg}
        />
      </>
    );
  }
}

Profile.getInitialProps = async ({ query }) => {
  // const oldURL = "https://watchdog-api-v1.cryptopolice.com/api/verify";
  const searchURL = query.domain
    ? `https://${query.domain}`
    : "https://google.com";
  const domain = query.domain ? query.domain : "google.com";
  if (query.amp === "1") {
    const response = await axios.get(
      `${process.env.BASE_URL}/api/verify?domain=${searchURL}`
    );
    return { analysisData: { ...response.data }, domain };
  }
  return { domain: domain };
};

const mapStateToProps = state => {
  const { auth, profileData } = state;
  const reportDomainSuccess = _get(
    profileData,
    "reportDomain.success",
    "undefined"
  );
  const reportDomainErrorMsg = _get(
    profileData,
    "reportDomain.errorMsg",
    "undefined"
  );
  let reportDomainType = _get(profileData, "reportDomain.type", "");
  return { auth, reportDomainSuccess, reportDomainErrorMsg, reportDomainType };
};

export default connect(
  mapStateToProps,
  { setDomainDataInRedux, setLoading, getAggregateData, setAggregateData }
)(Profile);
