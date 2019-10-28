import React, { useState, useEffect } from "react";
import { indexPageStyles } from "../Components/Styles/indexPageStyles";
import SearchBox from "../Components/Widgets/SearchBox/SearchBox";
import WebStats from "../Components/Widgets/WebStats/WebStats";
import Head from "next/head";
import Router from "next/router";
import uuid from "uuid/v1";
import { CircularProgress } from "@material-ui/core";
import Layout from "../hoc/layout/layout";
import SearchInput from "../Components/MaterialComponents/SearchInput";
import { connect } from "react-redux";
import Snackbar from "../Components/Widgets/Snackbar";
import _get from "lodash/get";
import { startLoading } from "../store/actions/loaderAction";

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
  useEffect(() => {
    // code to run on component mount
    if (props.showSnackbar) {
      setShowSnacbar(true);
    }
    window.scrollTo(0, 0);
  }, []);
  const [searchBoxVal, setSearchBoxVal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchBoxChange = e => {
    setSearchBoxVal(e.target.value);
  };

  const handleSearchSubmit = () => {
    props.startLoading();
    setPageLoading(true);
    if (searchBoxVal.trim() !== "") {
      if (
        /^[^www.][a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
          searchBoxVal
        )
      ) {
        let domainName = searchBoxVal.toLowerCase().trim();
        setLoading(true);
        Router.push(`/profile?domain=${domainName}`, `/profile/${domainName}`);
      } else {
        alert(
          "Please enter domain name in the format: (ex- thetrustsearch.com)"
        );
      }
    }
  };

  const renderHeroContent = () => {
    return (
      <div className="homeContainerInner">
        <style jsx>{indexPageStyles}</style>
        <div>
          <h3 className="heroHeading">
            TrustSearch - the search engine for trust!{" "}
          </h3>
          <h4 className="heroSubHeading">
            We help you to check
            <span className="heroSubHeadingMainText">trustworthiness</span> to
            <br /> websites, people and businesses.
          </h4>
        </div>

        <div
          className="analyseBtn"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          Analyse any website
        </div>

        <div className="homeSearchBoxContainer">
          {!loading ? (
            <>
              {/* <SearchBox
              onchange={handleSearchBoxChange}
              value={searchBoxVal}
              stateMethod={setSearchBoxVal}
              variant="thetrustsearchIndex"
              handleSearchSubmit={searchBoxVal => {
                handleSearchSubmit(setLoading, searchBoxVal);
              }}
            /> */}
              <SearchInput
                onchange={handleSearchBoxChange}
                value={searchBoxVal}
                onkeyDown={e => {
                  if (e.keyCode == 13) {
                    handleSearchSubmit();
                  }
                }}
                onsubmit={handleSearchSubmit}
              />
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CircularProgress color="secondary" />
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="homeWebStatsContainer">{renderWebStats()}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <style jsx>{indexPageStyles}</style>
      <div className="homeContainer">
        {renderHeroContent(searchBoxVal, setSearchBoxVal, loading, setLoading)}
      </div>

      <Snackbar
        open={showSnackbar}
        variant={_get(props, "variant", "")}
        handleClose={() => setShowSnacbar(false)}
        message={_get(props, "message", "")}
      />
    </Layout>
  );
};

const mapStateToProps = state => {
  const { auth, trustVote } = state;
  const authorized = _get(auth, "logIn.authorized", false);
  let showSnackbar = false;
  let variant = "";
  let message = "";
  if (
    authorized &&
    (_get(trustVote, "type", "") === "TRUST_VOTE_SUCCESS" ||
      _get(trustVote, "type", "") === "TRUST_VOTE_FAILURE")
  ) {
    showSnackbar = true;
  }
  if (_get(trustVote, "payload.success", false)) {
    variant = "success";
    message = "Review Posted Successfully!";
  } else {
    variant = "error";
    message = "Some Error Occured!";
  }
  return { showSnackbar, variant, message };
};

export default connect(
  mapStateToProps,
  { startLoading }
)(Home);
