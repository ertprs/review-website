import React, { useState, useEffect } from "react";
import { useAmp } from "next/amp";
import layout from "../hoc/layout/layout";
import { indexPageStyles } from "./Styles/indexPageStyles";
import SearchBox from "../Components/Widgets/SearchBox/SearchBox";
import WebStats from "../Components/Widgets/WebStats/WebStats";
import Head from "next/head";
import axios from "axios";
import Router from 'next/router';
import uuid from "uuid/v1";

export const config = { amp: "hybrid" };

const handleSearchSubmit = searchBoxVal => {
  //make an api call to fetch the requested data and move to a different route
  // axios
  //   .post("https://watchdog-api-v1.cryptopolice.com/api/verify", {
  //     domain: searchBoxVal
  //   })
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err));
  // Router.push({
  //   pathname:"/reviews",
  //   query:{domain:searchBoxVal},
  // });
  Router.push(`/reviews?domain=${searchBoxVal}`, `/reviews/${searchBoxVal}`);

  console.log("data submitted to the parent component => ", searchBoxVal);
};

const handleSearchBoxChange = (e, setSearchBoxVal) => {
  setSearchBoxVal(e.target.value);
};

const renderHeroContent = (searchBoxVal, setSearchBoxVal) => {
  return (
    <div className="homeContainerInner">
      <style jsx>{indexPageStyles}</style>
      <div>
        <h3 className="heroHeading">TrustSearch - the search engine for trust! </h3>
        <h4 className="heroSubHeading">
          We help you to check
          <span className="heroSubHeadingMainText">trustworthiness</span> to
          <br /> websites, people and businesses.
        </h4>
      </div>

      <div className="analyseBtn" style={{marginTop:"1rem", marginBottom:"1rem"}}>Analyse any website</div>

      <div style={{margin:"1% 0 3% 0"}}>
        <SearchBox
          onchange={handleSearchBoxChange}
          value={searchBoxVal}
          stateMethod={setSearchBoxVal}
          handleSearchSubmit={handleSearchSubmit}
        />
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
  const [searchBoxVal, setSearchBoxVal] = useState("");
  return (
    <>
      <Head>
        {!useAmp() ? (
          <link rel="amphtml" href="http://localhost:3000?amp=1" />
        ) : (
          // <link rel="canonical" href="http://localhost:3000" />
          null
        )}
      </Head>
      <style jsx>{indexPageStyles}</style>
      <div className="homeContainer">
        {renderHeroContent(searchBoxVal, setSearchBoxVal)}
      </div>
    </>
  );
};

export default Home;
