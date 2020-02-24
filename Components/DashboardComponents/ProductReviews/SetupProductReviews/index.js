import React, { Component } from "react";
import _now from "lodash/now";
import { connect } from "react-redux";
import SetUpProductCard from "./SetUpProductCard";
import _get from "lodash/get";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import validate from "../../../../utility/validate";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Zoom from "@material-ui/core/Zoom";

class SetupProductReviews extends Component {
  state = {
    data: []
  };

  generatePlatformsArray = () => {
    //extract from mapStateToProps
    const platformsArray = _get(this.props, "platformsArray", []);
    return platformsArray.map(item => {
      const id = _get(item, "id", "");
      const platformName = _get(item, "name", "");
      const urlVal = _get(item, "url", "");
      return {
        id,
        url: {
          element: "input",
          type: "text",
          value: "",
          placeholder: `Enter ${platformName} URL`,
          touched: false,
          valid: false,
          errorMessage: "Please enter a valid URL",
          validationRules: {
            isDomain: true
          },
          name: platformName,
          id: platformName,
          labelText: ""
        }
      };
    });
  };

  addProduct = () => {
    const { data } = this.state;
    const platformURLs = this.generatePlatformsArray();
    this.setState({
      data: [
        ...data,
        {
          id: _now(),
          productName: {
            element: "input",
            type: "text",
            value: "",
            placeholder: "Enter product name",
            touched: false,
            valid: false,
            errorMessage: "Please enter a valid name",
            validationRules: {
              isRequired: true
            },
            name: "productName",
            id: "productName",
            labelText: ""
          },
          platformURLs: [...platformURLs]
        }
      ]
    });
  };

  componentDidMount() {
    this.addProduct();
  }

  handleProductNameChange = (e, id) => {
    const { data } = this.state;
    const value = _get(e, "target.value", "");
    let formDataIndex = _findIndex(data, ["id", id]);
    let formData = data[formDataIndex] || [];
    if (formData) {
      formData = {
        ...formData,
        productName: {
          ..._get(formData, "productName", {}),
          value,
          valid: validate(
            value,
            _get(formData, "productName.validationRules", {})
          ),
          touched: true
        }
      };
    }
    let updatedData = [...data];
    updatedData[formDataIndex] = { ...formData };
    this.setState({ data: [...updatedData] });
  };

  handleURLChange = (e, id, platformId) => {
    const value = _get(e, "target.value", {});
    const { data } = this.state;
    let formDataIndex = _findIndex(data, ["id", id]);
    let formData = data[formDataIndex] || [];
    if (formData) {
      let platformURLs = _get(formData, "platformURLs", []);
      let indexOfPlatformURLToUpdate = _findIndex(platformURLs, [
        "id",
        platformId
      ]);
      let platformURLToUpdate = platformURLs[indexOfPlatformURLToUpdate] || {};
      platformURLToUpdate = {
        ...platformURLToUpdate,
        url: {
          ..._get(platformURLToUpdate, "url", {}),
          value,
          valid: validate(
            value,
            _get(platformURLToUpdate, "url.validationRules", {})
          ),
          touched: true
        }
      };
      platformURLs[indexOfPlatformURLToUpdate] = { ...platformURLToUpdate };
      formData = { ...formData, platformURLs: [...platformURLs] };
    }
    let updatedData = [...data];
    updatedData[formDataIndex] = { ...formData };
    this.setState({ data: [...updatedData] });
  };

  render() {
    const { data } = this.state;
    return (
      <>
        {(data || []).map(formData => {
          return (
            <Zoom in={true}>
              <div
                style={{ margin: "15px 0 15px 0" }}
                key={_get(formData, "id", "")}
              >
                <SetUpProductCard
                  formData={formData}
                  handleProductNameChange={this.handleProductNameChange}
                  handleURLChange={this.handleURLChange}
                />
              </div>
            </Zoom>
          );
        })}
        <Button
          onClick={this.addProduct}
          color="primary"
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
        >
          Add More Products
        </Button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    platformsArray: [
      { id: 1, name: "Amazon" },
      { id: 2, name: "Yandex" },
      { id: 3, name: "Walmart" },
      { id: 4, name: "Google Shopping" },
      { id: 5, name: "Ideona" }
    ]
  };
};

export default connect(mapStateToProps)(SetupProductReviews);
