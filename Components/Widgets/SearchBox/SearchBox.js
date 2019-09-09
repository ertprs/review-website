import React from "react";
import searchBoxStyles from "./searchBoxStyles";
import AmpFormWrapper from "../../AmpWrappers/AmpFormWrapper";

const renderSearchBox = ({
  value,
  onchange,
  handleSearchSubmit,
  stateMethod,
  variant,
  text,
  placeholder
}) => {
  switch (variant) {
    case "business":
      return (
        <div>
          <style jsx>{searchBoxStyles}</style>
          <form onSubmit={(e)=> {handleSearchSubmit(e)}}>
            <div className="businessSearchBoxContainer">
              <div className="businessSearchBoxInput">
                <input
                  type="text"
                  placeholder={
                    placeholder
                      ? placeholder
                      : "Enter any website domain for verification"
                  }
                  onChange={e => onchange(e)}
                  value={value}
                  name="domain"
                />
              </div>
              <input type="hidden" name="amp" value="1" />
              <div className="businessSearchBtnContainer">
                <button className="businessSearchBtn">
                  {text ? text : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    case "thetrustsearchIndex":
      return (
        <div>
          <style jsx>{searchBoxStyles}</style>
          <AmpFormWrapper
            onSubmit={e => {
              e.preventDefault();
              handleSearchSubmit(value);
            }}
            formMethod="get"
            isXHR={false}
            submitURL="https://thetrustsearch.com/reviews"
            formTarget="_top"
          >
            <div className="searchBoxContainer">
              <div className="searchBoxInput">
                <input
                  type="text"
                  placeholder={
                    placeholder
                      ? placeholder
                      : "Enter any website domain for verification (ex format: thetrustsearch.com)"
                  }
                  onChange={e => onchange(e, stateMethod)}
                  value={value}
                  name="domain"
                  required
                  pattern="^[^www.][a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                />
              </div>
              <input type="hidden" name="amp" value="1" />
              <div className="searchBtnContainer">
                <button className="searchBtn">{text ? text : "Search"}</button>
              </div>
            </div>
          </AmpFormWrapper>
        </div>
      );
    default:
      return null;
  }
};

const SearchBox = props => {
  return <>{renderSearchBox(props)}</>;
};

export default SearchBox;
