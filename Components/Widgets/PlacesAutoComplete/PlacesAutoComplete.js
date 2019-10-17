import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";

class PlacesAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        if (Array.isArray(results) && !_isEmpty(results)) {
          let reqBody = {
            placeId: results[0].place_id,
            name: this.props.domain //domain from redux store
          };
          this.props.handleAddressSelect(reqBody, results[0].formatted_address);
        }
      })
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
              style={{ width: "100%" }}
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

const mapStateToProps = state => {
  const { auth } = state;
  const businessProfile = _get(auth, "logIn.userProfile.business_profile", {});
  const domain = _get(businessProfile, "domain", "")
  const token = _get(auth, "logIn.token", "");
  return { token, domain, businessProfile };
};

export default connect(
  mapStateToProps
)(PlacesAutoComplete);
