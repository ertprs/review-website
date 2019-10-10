import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

export default class PlacesAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => console.log(results))
      //   .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            /> */}

            <TextField
              label="Search Places..."
              margin="dense"
              {...getInputProps({
                placeholder: "Business name",
                className: "location-search-input"
              })}
              style={{width:"100%"}}
            />
            <div className="autocomplete-dropdown-container">
              <Paper>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                      style={{ padding: "10px" }}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </Paper>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
