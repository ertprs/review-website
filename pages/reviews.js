import React from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import AggregatorPusherComponent from "../Components/AggregatorPusherComponent";
import PusherDataComponent from "../Components/PusherDataComponent/PusherDataComponent";
import Snackbar from "../Components/Widgets/Snackbar";
import UnicornLoader from "../Components/Widgets/UnicornLoader";
import { isValidArray } from "../utility/commonFunctions";
import { removeSubDomain } from "../utility/commonFunctions";
import { profilePageLoadingTimeout } from "../utility/constants/pusherTimeoutConstants";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scroller
} from "react-scroll";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _sortBy from "lodash/sortBy";
import _isEqual from "lodash/isEqual";
import {
  setDomainDataInRedux,
  setLoading,
  fetchProfileReviews,
  fetchProfileReviewsInitially
} from "../store/actions/domainProfileActions";
const Navbar = dynamic(() => import("../Components/MaterialComponents/NavBar"));
const ProfilePageHeader = dynamic(
  () => import("../Components/ProfilePage/ProfilePageHeader"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const ProfilePageBody = dynamic(
  () => import("../Components/ProfilePage/ProfilePageBody"),
  {
    loading: () => (
      <div className="dynamicImport">
        <p>Loading.....</p>
      </div>
    )
  }
);
const Footer = dynamic(() => import("../Components/Footer/Footer"));
const SimpleTabs = dynamic(() =>
  import("../Components/MaterialComponents/SimpleTabs")
);

class Profile extends React.Component {
  state = {
    selectedTab: "overview",
    isNewDomain: false,
    isMounted: false,
    searchBoxVal: "",
    showSnackbar: false,
    variant: "success",
    snackbarMsg: "",
    domainId: "",
    trustClicked: false,
    waitingTimeOut: true
  };

  componentDidMount() {
    this.props.setLoading(true);
    setTimeout(() => {
      this.setState({ waitingTimeOut: false });
    }, profilePageLoadingTimeout);
    this.setState({ isMounted: true });
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

  handleAggregatorDataChange = updatedData => {
    const platformId = _get(updatedData, "response.socialAppId", 0);
    const { fetchProfileReviews, domain } = this.props;
    if (platformId && domain) {
      fetchProfileReviews(domain, platformId, true);
    }
  };

  updateParentState = newState => {
    console.log(newState, "newState");
    const {
      setDomainDataInRedux,
      domain,
      fetchProfileReviewsInitially
    } = this.props;
    const { domainId, socialPlatforms } = this.state;
    //? this action is used to set all profile data in a structured way in redux
    setDomainDataInRedux(newState);
    //? isNewDomain is used to show unicorn loader when user search for a new domain and we start scraping for that domain
    const isNewDomain = _get(
      newState,
      "notifications.payload.is_new_domain",
      false
    );
    this.setState({ isNewDomain });
    //? this is domainId
    const id = _get(newState, "id", "");
    if (id !== domainId) {
      this.setState({ domainId: id });
    }
    //! we'll get an object of scraped platforms inside social key, we'll create an array of socialObj of them and fetch their reviews
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
      this.setState({ socialPlatforms: [...socialPlatformsArr] });
      if (!_isEqual(_sortBy(socialPlatformsArr), _sortBy(socialPlatforms))) {
        fetchProfileReviewsInitially(socialPlatformsArr, domain);
      }
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
      let parsed_domain_name = removeSubDomain(domainName);
      window.location.assign(`${parsed_domain_name}`);
    }
  };

  unicornLoaderHandler = () => {
    const {
      wotReviews,
      trustSearchReviews,
      socialPlatformReviews
    } = this.props;
    let invalidReviews = true;
    if (isValidArray(wotReviews) || isValidArray(trustSearchReviews)) {
      invalidReviews = false;
    }
    if (socialPlatformReviews) {
      (Object.keys(socialPlatformReviews) || []).forEach(socialPlatform => {
        let reviewsObject = socialPlatformReviews[socialPlatform] || {};
        if (isValidArray(_get(reviewsObject, "data.data.reviews", []))) {
          invalidReviews = false;
        }
      });
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
            snackbarMsg: "Some Error Occurred!"
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
    const { waitingTimeOut, isNewDomain } = this.state;

    return (
      <>
        {/* This hits verify_domain api twice in interval of 500ms(if we don’t get data in first call).Then we receive a array of scheduled keys inside sch key and then bind for each key to listen for it. Then we pass all that data to parent component. */}
        <PusherDataComponent
          domain={domain}
          onChildStateChange={this.updateParentState}
        />
        {/* This is bind with "aggregator" and broadcasts platforms whose reviews are scraped.*/}
        <AggregatorPusherComponent
          domain={domain}
          onAggregatorDataChange={this.handleAggregatorDataChange}
        />

        <>
          <Navbar />
          {/* UnicornLoader starts when domain is new and no reviews available, it stops when any reviews found or after 5 minutes */}
          {/* waitingTimeOut is used only for stopping this loader after 5
          minutes */}
          {isNewDomain && waitingTimeOut && this.unicornLoaderHandler() ? (
            <UnicornLoader />
          ) : null}
          {this.renderSimpleTabs()}
          <Element name="overview" className="overview">
            <ProfilePageHeader
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
            <ProfilePageBody trustClicked={this.state.trustClicked} />
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
  const isNewDomain = _get(profileData, "domainProfileData.isNewDomain", false);
  let wotReviews = _get(profileData, "domainProfileData.wotReviews.data", []);
  let trustSearchReviews = _get(
    profileData,
    "domainProfileData.domainReviews.data",
    []
  );
  let socialPlatformReviews = _get(
    profileData,
    "domainProfileData.socialPlatformReviews",
    {}
  );
  if (!isValidArray(trustSearchReviews)) {
    trustSearchReviews = [];
  }
  if (!isValidArray(wotReviews)) {
    wotReviews = [];
  }
  return {
    auth,
    reportDomainSuccess,
    reportDomainErrorMsg,
    wotReviews,
    trustSearchReviews,
    socialPlatformReviews,
    isNewDomain
  };
};

export default connect(mapStateToProps, {
  setDomainDataInRedux,
  setLoading,
  fetchProfileReviews,
  fetchProfileReviewsInitially
})(Profile);

//! important notes
//? We are connecting two pushers: PusherDataComponent and AggregatorPusherComponent.
//? We are disconnecting both pushers and stopping reviews loader and showing no review found after 1 min. We can increase/decrease this timing from here utility/constants/profilePageLoadingTimeout only.
//? All the reviews and right side cards are coming from socialPlatformReviews key inside profileData
//? Unicorn loader is displayed if we get isNewDomain and gets hidden if any of these two cases match (i)1min timeout, (ii) any review come
//? We are checking for reviews loading and no review case by looping through socialPlatformReviews key inside profileData and wot and trustSearch reviews.
//? Wot and trustSearch reviews are coming differently. Wot inside wot key and trustSearch inside reviews->domain
//? In order to add any new platform in reviews, we can add it in reviewsOrder arr in SocialPlatformReviews component at whichever position we want to display it.
//? Right side platform cards are mapped one by one by their platformId, in order to add any new we can add in ProfilePageBodyRight component
//? In header reviews and rating are coming from ratings key (verify-domain pusher broadcast) and when it changes it comes inside rating-update key
//? verified is showing from is_verified key inside header_data and claim if this is your website is displaying from company key inside header_data if it is not equal to companyName inside dashboard
