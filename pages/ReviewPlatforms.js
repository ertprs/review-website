import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import _get from "lodash/get";
import _findIndex from "lodash/findIndex";
import InputBase from "@material-ui/core/Input";

class ReviewPlatforms extends Component {
  state = {
    reviewPlatforms: [
      { socialAppId: 0, name: "Google", checked: false, value: 0 },
      { socialAppId: 1, name: "Facebook", checked: false, value: 0 },
      { socialAppId: 18, name: "Trustpilot", checked: false, value: 0 },
      { socialAppId: 19, name: "Trustedshops", checked: false, value: 0 }
    ],
    platformSplit: []
  };

  countNoOfPlatformsSelected = arr => {
    let count = 0;
    arr.forEach(val => {
      if (val.checked) {
        count++;
      }
    });
    return count;
  };

  updateArrayValues = arr => {
    let updatedArray = [];
    arr.forEach((platform, index) => {
      let temp = { ...platform };
      temp.value = (100 / this.countNoOfPlatformsSelected(arr)).toFixed(2);
      updatedArray.push(temp);
    });
    return updatedArray;
  };

  setAllValuesToZero = () => {
    const { reviewPlatforms } = this.state;
    let updatedArray = [];
    reviewPlatforms.forEach((platform, index) => {
      let temp = { ...platform };
      temp.value = (
        100 / this.countNoOfPlatformsSelected(reviewPlatforms)
      ).toFixed(2);
      updatedArray.push(temp);
    });
    this.setState({ reviewPlatforms: updatedArray });
  };

  onCheckChange = event => {
    const { name, checked } = event.target;
    let { platformSplit, reviewPlatforms } = this.state;
    let obj = {
      socialAppId: Number(name)
    };
    platformSplit = [...platformSplit, obj];
    let reviewPlatformsCopy = [...reviewPlatforms];
    let platformIndex = _findIndex(reviewPlatforms, [
      "socialAppId",
      Number(name)
    ]);
    if (platformIndex !== -1) {
      reviewPlatformsCopy[platformIndex] = {
        ...reviewPlatformsCopy[platformIndex],
        checked
      };
    }
    let newArray = this.updateArrayValues(reviewPlatformsCopy);
    console.log(newArray, "newArray");
    this.setState({ platformSplit, reviewPlatforms: newArray });
  };

  handlePercentageChange = event => {
    const { name, value } = event.target;
    let { reviewPlatforms } = this.state;
    let reviewPlatformsCopy = [...reviewPlatforms];

    let platformIndex = _findIndex(reviewPlatforms, [
      "socialAppId",
      Number(name)
    ]);
    if (platformIndex !== -1) {
      reviewPlatformsCopy[platformIndex] = {
        ...reviewPlatformsCopy[platformIndex],
        value
      };
    }
    this.setState({ reviewPlatforms: reviewPlatformsCopy });
  };

  render() {
    const { reviewPlatforms } = this.state;
    return (
      <div>
        <h3>Please select review platforms:</h3>
        {reviewPlatforms.map((platform, index) => {
          const socialAppId = _get(platform, "socialAppId", "");
          return (
            <div style={{ display: "block" }}>
              <Checkbox
                name={socialAppId}
                color="primary"
                onChange={this.onCheckChange}
                checked={platform.checked}
              />
              {platform.name}
              {platform.checked ? (
                <>
                  <InputBase
                    name={socialAppId}
                    type="number"
                    onChange={this.handlePercentageChange}
                    value={platform.value}
                  />
                  %
                </>
              ) : null}
            </div>
          );
        })}
        <button onClick={this.setAllValuesToZero}>
          I want to divide on my own
        </button>
      </div>
    );
  }
}

export default ReviewPlatforms;
