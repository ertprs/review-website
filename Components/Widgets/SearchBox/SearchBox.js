import React from "react";
import searchBoxStyles from './searchBoxStyles';
import AmpFormWrapper from '../../AmpWrappers/AmpFormWrapper';
const SearchBox = ({ value, onchange, handleSearchSubmit, stateMethod }) => {
  return (
    <div>
      <style jsx>
        {searchBoxStyles}
      </style>
      <AmpFormWrapper onSubmit={(e)=>{e.preventDefault(); handleSearchSubmit(value)}} formMethod="post" isXHR={true} submitURL="/documentation/examples/api/submit-form-input-text-xhr" formTarget="_top">
        <div className="searchBoxContainer">
          <div className="searchBoxInput">
            <input
              type="text"
              placeholder="Enter any website domain for verification"
              onChange={e => onchange(e, stateMethod)}
              value={value}
            />
          </div>
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
