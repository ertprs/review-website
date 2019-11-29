import React from "react";
import searchBoxStyles from "./searchBoxStyles";

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
    default:
      return null;
  }
};

const SearchBox = props => {
  return <>{renderSearchBox(props)}</>;
};

export default SearchBox;
