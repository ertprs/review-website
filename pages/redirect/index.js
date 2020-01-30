import React, { Component } from "react";
import _get from "lodash/get";
import axios from "axios";
import {
  smartUrlApi,
  configuredReviewPlatformsApi
} from "../../utility/config";
import Router from "next/router";
import ReviewPlatforms from "./ReviewPlatforms";
import _isEmpty from "lodash/isEmpty";

class redirect_to_review_page extends Component {
  state = {
    platformClicked: false
  };
  handlePlatformClick = platformId => {
    this.setState({ platformClicked: true });
    const { domainUrlKey, fallbackUrl } = this.props;
    const api = `${process.env.BASE_URL}${smartUrlApi}/${domainUrlKey}?p=${platformId}`;

    //? making api call to get the platform url if comes success navigating to platform if not navigating to our homepage.

    axios
      .get(api)
      .then(response => {
        const success = _get(response, "data.success", false);
        const url = _get(response, "data.url", "");
        if (success && url) {
          if (window) {
            window.location.replace(url);
          }
        } else {
          if (window) {
            window.location.replace(fallbackUrl);
          }
        }
      })
      .catch(error => {
        if (window) {
          window.location.replace(fallbackUrl);
        }
      });
  };

  render() {
    const {
      selectedOption,
      reviewPlatforms,
      overallRating,
      domainName
    } = this.props;
    const { platformClicked } = this.state;
    return (
      <>
        {selectedOption === "showPlatforms" ? (
          platformClicked ? (
            <div>Redirecting...</div>
          ) : (
            <div>
              <ReviewPlatforms
                reviewPlatforms={reviewPlatforms}
                handlePlatformClick={this.handlePlatformClick}
                domainName={domainName}
                overallRating={overallRating}
              />
            </div>
          )
        ) : (
          <div>Redirecting...</div>
        )}
      </>
    );
  }
}

redirect_to_review_page.getInitialProps = async ctx => {
  const { query, res } = ctx;
  const fallbackUrl = process.env.DOMAIN_NAME;
  const domainUrlKey = _get(query, "domainUrlKey", "");
  let configuredPlatformsApiWithDomainUrlKey = `${process.env.BASE_URL}${configuredReviewPlatformsApi}/${domainUrlKey}`;
  const selectedOption = _get(query, "selected", "");
  const mode = _get(query, "mode", "");
  let domainName = "";
  let overallRating = 0;
  if (selectedOption === "showPlatforms") {
    domainName = _get(query, "domain", "");
    overallRating = _get(query, "rating", 0);
  }
  let reviewPlatforms = [];
  //! Since in case of showPlatforms we'll be showing him a dropdown and on basis of selected platform we'll make api call and redirect to that url.

  if (selectedOption === "showPlatforms") {
    try {
      const result = await axios.get(configuredPlatformsApiWithDomainUrlKey);
      const success = _get(result, "data.success", false);
      const configured_platforms = _get(
        result,
        "data.configured_platforms",
        []
      );
      if (
        success &&
        Array.isArray(configured_platforms) &&
        !_isEmpty(configured_platforms)
      ) {
        reviewPlatforms = [...configured_platforms];
      }
    } catch (err) {
      const error = _get(err, "response.data.error", "");
    }
  }
  //? this else is for platforms for whom we want to navigate to review url page(Accept split platform and least rating).
  else {
    let fetchUrlApi = "";
    if (mode) {
      fetchUrlApi = `${process.env.BASE_URL}${smartUrlApi}/${domainUrlKey}?mode=${mode}`;
    } else {
      fetchUrlApi = `${process.env.BASE_URL}${smartUrlApi}/${domainUrlKey}?p=${selectedOption}`;
    }
    let result = "";
    let error = "";
    try {
      result = await axios.get(fetchUrlApi);
    } catch (err) {
      error = _get(err, "response.data.error", "");
    }
    const success = _get(result, "data.success", false);
    const url = _get(result, "data.url", "");
    if (success) {
      if (res) {
        res.writeHead(302, {
          Location: url
        });
        res.end();
      } else {
        Router.push(url);
      }
    } else if (!success) {
      if (res) {
        res.writeHead(302, {
          Location: fallbackUrl
        });
        res.end();
      } else {
        Router.push(fallbackUrl);
      }
    }
  }
  return {
    selectedOption,
    domainUrlKey,
    fallbackUrl,
    reviewPlatforms,
    domainName,
    overallRating
  };
};

export default redirect_to_review_page;
