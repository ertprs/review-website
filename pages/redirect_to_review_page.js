import React, { Component } from "react";
import _get from "lodash/get";
import axios from "axios";
import { smartUrlApi } from "../utility/config";
import Router from "next/router";

class redirect_to_review_page extends Component {
  render() {
    return <div>Redirecting...</div>;
  }
}

redirect_to_review_page.getInitialProps = async ctx => {
  const { query, res } = ctx;
  const domainUrlKey = _get(query, "domainUrlKey", "");
  const p = _get(query, "p", "");
  let api = "";
  if (p === "automatic") {
    api = `${process.env.BASE_URL}${smartUrlApi}/${domainUrlKey}`;
  } else {
    api = `${process.env.BASE_URL}${smartUrlApi}/${domainUrlKey}?p=${p}`;
  }
  let result = "";
  let error = "";
  try {
    result = await axios.get(api);
  } catch (err) {
    error = _get(err, "response.data.error", "");
  }
  const success = _get(result, "data.success", false);
  const url = _get(result, "data.url", "");
  const fallbackUrl = process.env.DOMAIN_NAME;
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
  return {};
};

export default redirect_to_review_page;
