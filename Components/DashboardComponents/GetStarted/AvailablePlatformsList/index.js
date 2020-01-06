import React, { Component } from "react";
import _get from "lodash/get";
import _find from "lodash/find";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false
});

class AvailablePlatformsList extends Component {
  state = {
    openModal: false,
    selectedPlatformKey: "",
    selectedPlatformName: ""
  };
  handleModalOpen = () => {
    this.setState({ openModal: true });
  };

  handleModalClose = () => {
    this.setState({ openModal: false });
  };
  getListOfAvailablePlatforms = (review_platforms, socialPlatforms) => {
    let options = [];
    for (let item in review_platforms) {
      let foundItem = _find(socialPlatforms, [
        "social_media_app_id",
        Number(item)
      ]);
      if (!foundItem) {
        options = [...options, { value: item, label: review_platforms[item] }];
      }
    }
    return options;
  };

  render() {
    const review_platforms = _get(this.props, "reviewPlatforms", {});
    const socialPlatforms = _get(this.props, "socialPlatforms", []);
    const { handleAvailablePlatformsListChange } = this.props;
    return (
      <div>
        <Select
          isMulti
          name="colors"
          options={this.getListOfAvailablePlatforms(
            review_platforms,
            socialPlatforms
          )}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={arr => {
            handleAvailablePlatformsListChange(arr);
          }}
          value={this.props.selectedAvailablePlatformItems}
          placeholder="Select multiple review platforms"
        />
      </div>
    );
  }
}

export default AvailablePlatformsList;
