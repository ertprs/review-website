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
import _sortBy from "lodash/sortBy";
import _isEqual from "lodash/isEqual";
import { iconNames } from "../utility/constants/socialMediaConstants";
import {
  setDomainDataInRedux,
  setLoading,
  fetchProfileReviews,
  fetchProfileReviewsInitially
} from "../store/actions/domainProfileActions";
import { connect } from "react-redux";
import DomainPusherComponent from "../Components/DomainPusherComponent/DomainPusherComponent";
import {
  getAggregateData,
  setAggregateData
} from "../store/actions/aggregateActions";
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
import UnicornLoader from "../Components/Widgets/UnicornLoader";
import { removeAggregateData } from "../store/actions/aggregateActions";

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
    aggregateSocialData: {},
    trustClicked: false,
    waitingTimeOut: true,
    isNewDomain: false
  };

  componentDidMount() {
    //call fetch reviews action creator
    if (this.state.isLoading) {
      this.props.setLoading(true);
    }
    setTimeout(() => {
      this.setState({ waitingTimeOut: false });
    }, 60000);
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
    const { removeAggregateData } = this.props;
    removeAggregateData();
  }

  handleAggregatorDataChange = updatedData => {
    const platformId = _get(updatedData, "response.socialAppId", 0);
    const { fetchProfileReviews, domain } = this.props;
    if (platformId && domain) {
      fetchProfileReviews(domain, platformId, true);
    }
  };

  updateParentState = newState => {
    console.log(newState, "newState");
    //? this action is used to set all profile data in a structured way in redux
    this.props.setDomainDataInRedux(newState);
    //? isNewDomain is used to show unicorn loader when user search for a new domain and we start scraping for that domain
    const isNewDomain = _get(
      newState,
      "notifications.payload.is_new_domain",
      false
    );
    this.setState({ isNewDomain });
    //? this id is used as domainId in thirdpartydata api that we are using to fetch reviews of diff platforms.
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

    if (!_isEmpty(headerData)) {
      this.props.setLoading(false);
    }

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
    //? this data is used to generate cards in right side
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
            name: (iconNames[item] || {}).name,
            followers: payload[item].followers,
            profile_url: payload[item].profile_url,
            icon: (iconNames[item] || {}).name,
            color: (iconNames[item] || {}).color
          };
          socialMediaStats = [...socialMediaStats, socialTemp];
        }
      }
    }
    // these are the trustsearch reviews
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

    //? this aggregate social data is used for displaying cards of review platforms
    let aggregateSocialData = { ...this.state.aggregateSocialData };
    if (
      !_isEmpty(_get(newState, "social.payload", {})) &&
      typeof _get(newState, "social.payload", {}) === "object"
    ) {
      const payload = _get(newState, "social.payload", {});
      for (let item in _get(newState, "social.payload", {})) {
        aggregateSocialData = { ...aggregateSocialData, [item]: payload[item] };
      }
    }
    this.setState({ aggregateSocialData: { ...aggregateSocialData } });
    this.props.setAggregateData({ ...aggregateSocialData });

    //! we'll get an object of scraped platforms inside social key, we'll create an array of socialObj of them and fetch their reviews
    const { domain } = this.props;
    let socialObj = _get(newState, "social.payload", {});
    let socialPlatformsArr = [];
    if (socialObj && !_isEmpty(socialObj)) {
      let platformIdsArray = Object.keys(socialObj);
      socialPlatformsArr = platformIdsArray.map(platformId => {
        return {
          id: platformId,
          name: (socialObj[platformId] || {}).name || ""
        };
      });
      const { fetchProfileReviewsInitially } = this.props;
      //! make api call only if the prev array is not equal to current array
      fetchProfileReviewsInitially(socialPlatformsArr, domain);
    }
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
      /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim.test(
        searchBoxVal
      )
    ) {
      let domainName = searchBoxVal.toLowerCase().trim();
      let parsed_domain_name = domainName.replace(/https:\/\//gim, "");
      parsed_domain_name = parsed_domain_name.replace(/www\./gim, "");
      window.location.assign(`${parsed_domain_name}`);
    }
  };

  handleRouteChange = url => {};

  unicornLoaderHandler = () => {
    const { googleReviewsData, wotReviews, trustsearchReviews } = this.props;
    let invalidReviews = true;
    if (googleReviewsData) {
      if (Array.isArray(googleReviewsData)) {
        if (googleReviewsData.length > 0) {
          invalidReviews = false;
        }
      }
    }
    if (wotReviews) {
      if (Array.isArray(wotReviews)) {
        if (wotReviews.length > 0) {
          invalidReviews = false;
        }
      }
    }
    if (trustsearchReviews) {
      if (Array.isArray(trustsearchReviews)) {
        if (trustsearchReviews.length > 0) {
          invalidReviews = false;
        }
      }
    }
    return invalidReviews;
  };

  componentDidUpdate(prevProps, prevState) {
    const { auth, reportDomainSuccess, reportDomainErrorMsg } = this.props;
    if (reportDomainSuccess !== prevProps.reportDomainSuccess) {
      if (reportDomainSuccess === true) {
        this.setState({
          showSnackbar: true,
          variant: "success",
          snackbarMsg: "Domain Reported Successfully!!"
        });
      } else if (reportDomainSuccess === false) {
        this.setState({
          showSnackbar: true,
          variant: "error",
          snackbarMsg: reportDomainErrorMsg || ""
        });
      }
    }
    if (this.props.auth !== prevProps.auth) {
      const isLoginFailed = _get(auth, "logInTemp.isLoginFailed", false);
      const isWrongCredentials = _get(
        auth,
        "logInTemp.isWrongCredentials",
        false
      );
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

    if (this.state.isLoading) {
      if (!_isEmpty(_get(this.state, "domainData", {}))) {
        if (!_isEmpty(_get(this.state, "domainData.domain_data", {}))) {
          this.setState({ isLoading: false }, () => {
            this.props.setLoading(false);
          });
        }
      }
    }
  }

  render() {
    const { domain } = this.props;
    const { waitingTimeOut, isNewDomain } = this.state;
    const {
      headerData,
      analyzeReports,
      trafficReports,
      socialMediaStats,
      domainReviews
    } = this.state;

    return (
      <>
        {/* This hits verify_domain api twice in interval of 500ms(if we don’t get data in first call).Then we receive a array of scheduled keys inside sch key and then bind for each key to listen for it. Then we pass all that data to parent component. */}
        <PusherDataComponent
          domain={domain}
          onChildStateChange={this.updateParentState}
        />
        {/* This is bind for two keys “google_reviews” and “aggregator”. For google reviews we get totalReviewsCount and if it greater than 0 we try to fetch google reviews(“/api/reviews/domain” api)  and for aggregator we get socialAppId and profileId to get review of that platform through thirdpartydata Api. */}
        <DomainPusherComponent
          domain={domain}
          onAggregatorDataChange={this.handleAggregatorDataChange}
        />

        <>
          <Navbar />
          {/* waitingTimeOut is used only for stopping this loader after 5
          minutes */}
          {isNewDomain && waitingTimeOut && this.unicornLoaderHandler() ? (
            <UnicornLoader />
          ) : null}
          {this.renderSimpleTabs()}
          <Element name="overview" className="overview">
            <ProfilePageHeader
              headerData={headerData}
              isMounted={this.state.isMounted}
              onTrustClick={() =>
                this.setState({ trustClicked: true }, () => {
                  setTimeout(() => {
                    this.setState({ trustClicked: false });
                  }, 3000);
                })
              }
            />
          </Element>
          <Element name="writeReview" className="writeReview">
            <ProfilePageBody
              analyzeReports={analyzeReports}
              trafficReports={trafficReports}
              socialMediaStats={socialMediaStats}
              domainReviews={domainReviews || []}
              isMounted={this.state.isMounted}
              trustClicked={this.state.trustClicked}
            />
          </Element>
          <Footer />
        </>

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
  const domain = query.domain ? query.domain : "google.com";
  return { domain };
};

const mapStateToProps = state => {
  const { auth, profileData, googleReviews } = state;
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
  const googleReviewsData = _get(googleReviews, "reviews.data.reviews", []);
  const wotReviews = _get(profileData, "domainProfileData.wotReviews.data", []);
  const trustsearchReviews = _get(
    profileData,
    "domainProfileData.domainReviews.data",
    []
  );
  const isNewDomain = _get(profileData, "domainProfileData.isNewDomain", false);
  return {
    auth,
    reportDomainSuccess,
    reportDomainErrorMsg,
    googleReviewsData,
    wotReviews,
    trustsearchReviews,
    isNewDomain
  };
};

export default connect(mapStateToProps, {
  setDomainDataInRedux,
  setLoading,
  getAggregateData,
  setAggregateData,
  removeAggregateData,
  fetchProfileReviews,
  fetchProfileReviewsInitially
})(Profile);

// 1. We connect with two pushers: (a) PusherDataComponent (b) DomainPusherComponent
// 2. PusherDataComponent: This hits verify_domain api twice in interval of 500ms(if we don’t get data in first call).Then we receive a array of scheduled keys inside sch key and then bind for each key to listen for it. Then we pass all that data to parent component.
// 3. DomainPusherComponent: This is bind for two keys “google_reviews” and “aggregator”. For google reviews we get totalReviewscount and if it greater than 0 we try to fetch google reviews(“/api/reviews/domain” api)  and for aggregator we get socialAppId and profileId to get review of that platform through thirdpartydata Api.
// 4. We are adding https:// manually in all domains.
// 5. We get an id in verify-domain call that we use as domainId to to hit thirdpartydata call to fetch reviews of different platforms.
