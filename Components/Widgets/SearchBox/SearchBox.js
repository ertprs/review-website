import React from "react";
import searchBoxStyles from './searchBoxStyles';
import AmpFormWrapper from '../../AmpWrappers/AmpFormWrapper';


const SearchBox = ({ value, onchange, handleSearchSubmit, stateMethod }) => {
  return (
    <div>
      <style jsx>
        {searchBoxStyles}
      </style>
      {/* TODO: Make AmpFormWrapper props dynamic from the parent component */}
      {/* TODO: AMP requires https -> so change the same below */}
      <AmpFormWrapper onSubmit={(e)=>{e.preventDefault(); handleSearchSubmit(value)}} formMethod="get" isXHR={false} submitURL="https://thetrustsearch-dev.cryptopolice.com/reviews" formTarget="_top">
        <div className="searchBoxContainer">
          <div className="searchBoxInput">
            <input
              type="text"
              placeholder="Enter any website domain for verification"
              onChange={e => onchange(e, stateMethod)}
              value={value}
              name="domain"
            />
          </div>
          <input type="hidden" name="amp" value="1"/>
          <div className="searchBtnContainer">
            <button
              className="searchBtn"
            >
              Search
            </button>
          </div>
        </div>
      </AmpFormWrapper>
    </div>
  );
};

export default SearchBox;
