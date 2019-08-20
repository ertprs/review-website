import React, { useState, useEffect } from "react";
import { useAmp } from "next/amp";
import { indexPageStyles } from "../Components/Styles/indexPageStyles";
import SearchBox from "../Components/Widgets/SearchBox/SearchBox";
import WebStats from "../Components/Widgets/WebStats/WebStats";
import Head from "next/head";
import Router from "next/router";
import uuid from "uuid/v1";
import BigLoader from "../Components/Widgets/BigLoader/BigLoader";

export const config = { amp: "hybrid" };

const handleSearchSubmit = (setLoading, searchBoxVal) => {
  if (searchBoxVal.trim() !== "") {
    setLoading(true);
    Router.push(`/reviews?domain=${searchBoxVal}`, `/reviews/${searchBoxVal}`);
  }
};

const handleSearchBoxChange = (e, setSearchBoxVal) => {
  setSearchBoxVal(e.target.value);
};

const renderHeroContent = (
  searchBoxVal,
  setSearchBoxVal,
  loading,
  setLoading
) => {
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
        style={{ marginTop: "1rem", marginBottom: "1rem"}}
      >
        Analyse any website
      </div>

      <div className="homeSearchBoxContainer">
        {!loading ? (
          <SearchBox
            onchange={handleSearchBoxChange}
            value={searchBoxVal}
            stateMethod={setSearchBoxVal}
            handleSearchSubmit={searchBoxVal => {
              handleSearchSubmit(setLoading, searchBoxVal);
            }}
          />
        ) : (
          <BigLoader styles={{ borderColor: "#21bc61", top:"50%", left:"50%", position:"relative"}} />
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

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [searchBoxVal, setSearchBoxVal] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Head>
        {!useAmp() ? (
          <link rel="amphtml" href="http://localhost:3000?amp=1" />
        ) : // <link rel="canonical" href="http://localhost:3000" />
        null}
      </Head>
      <style jsx>{indexPageStyles}</style>
      <div className="homeContainer">
        {renderHeroContent(searchBoxVal, setSearchBoxVal, loading, setLoading)}
      </div>
    </>
  );
};

export default Home;
