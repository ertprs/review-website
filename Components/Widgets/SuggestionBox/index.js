import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { domainSuggestions } from "../../../utility/domainSuggestions";
import { searchBoxStyles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/SearchOutlined";

const styles = theme => ({
  cardStyle: {
    marginTop: "2px",
    borderRadius: "10px",
    position: "absolute",
    width: "100%",
    height: "auto",
    zIndex: "1000"
  }
});

class SearchBoxSuggestion extends Component {
  render() {
    const { classes } = this.props;
    const { searchBoxVal, handleSearchSuggestionClick } = this.props;
    let searchBoxValSplit = searchBoxVal.split(".");
    const parsedSearchBoxVal = searchBoxValSplit[0];
    return (
      <>
        {searchBoxValSplit.length > 1 ? null : (
          <Card className={classes.cardStyle}>
            <style jsx>{searchBoxStyles}</style>
            {domainSuggestions.map((value, index) => {
              return (
                <div
                  className="suggestion"
                  onClick={() => {
                    handleSearchSuggestionClick(
                      `${parsedSearchBoxVal}${value}`
                    );
                  }}
                >
                  <SearchIcon style={{ marginRight: "10px" }} />
                  {`${parsedSearchBoxVal}${value}`}
                </div>
              );
            })}
          </Card>
        )}
      </>
    );
  }
}

export default withStyles(styles)(SearchBoxSuggestion);
