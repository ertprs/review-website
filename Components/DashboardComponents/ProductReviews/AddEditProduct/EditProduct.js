import React, { Component } from "react";
import _now from "lodash/now";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import _get from "lodash/get";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import validate from "../../../../utility/validate";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Zoom from "@material-ui/core/Zoom";
import {
  isValidArray,
  uniqueIdGenerator
} from "../../../../utility/commonFunctions";
import { updateProductInProductReviews } from "../../../../store/actions/dashboardActions";
import styles from "./styles";

class EditProduct extends Component {
  state = {
    productData: {}
  };

  componentDidMount() {
    this.addProduct();
  }

  generatePlatformsArray = () => {
    const { updatedPlatformArray } = this.props;
    return updatedPlatformArray.map(item => {
      const id = _get(item, "_id", "");
      const name = _get(item, "name", "");
      const url = _get(item, "url", "");
      return {
        id,
        uniqueId: uniqueIdGenerator(),
        showAddBtn: true,
        url: {
          element: "input",
          type: "text",
          value: url,
          placeholder: `Enter ${name} URL`,
          touched: url ? true : false,
          valid: url ? true : false,
          errorMessage: "Please enter a valid URL",
          validationRules: {
            isDomain: true
          },
          name,
          id: name,
          labelText: ""
        }
      };
    });
  };

  addProduct = () => {
    const { productToEdit } = this.props;
    const productName = _get(productToEdit, "name", "");
    const productId = _get(productToEdit, "_id", "");
    const platformURLs = this.generatePlatformsArray();
    this.setState({
      productData: {
        id: productId,
        productName: {
          element: "input",
          type: "text",
          value: productName,
          placeholder: "Enter product name",
          touched: productName ? true : false,
          valid: productName ? true : false,
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
    });
  };

  handleProductNameChange = (e, productId, platformUniqueId) => {
    const { productData } = this.state;
    const value = _get(e, "target.value", "");
    let updatedProductData = {
      ...productData,
      productName: {
        ..._get(productData, "productName", {}),
        value,
        valid: validate(
          value,
          _get(productData, "productName.validationRules", {})
        ),
        touched: true
      }
    };
    this.setState({ productData: { ...updatedProductData } });
  };

  handleURLChange = (e, productId, platformUniqueId) => {
    const value = _get(e, "target.value", {});
    const { productData } = this.state;
    let platformURLs = _get(productData, "platformURLs", []);
    let indexOfPlatformURLToUpdate = _findIndex(platformURLs, [
      "uniqueId",
      platformUniqueId
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
    const updatedPlatformURLs = [...platformURLs];
    updatedPlatformURLs[indexOfPlatformURLToUpdate] = {
      ...platformURLToUpdate
    };
    this.setState({
      productData: { ...productData, platformURLs: [...updatedPlatformURLs] }
    });
  };

  addMorePlatform = platformId => {
    const { productData } = this.state;
    const platforms = _get(productData, "platformURLs", []);
    const platformIndex = _findIndex(platforms, ["id", platformId]);
    if (platformIndex !== -1) {
      const platform = platforms[platformIndex];
      const platformId = _get(platform, "id", "");
      const platformName = _get(platform, "url.name", "");
      const newPlatform = {
        id: platformId,
        uniqueId: uniqueIdGenerator(),
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
          platformName,
          name: platformName,
          id: platformName,
          labelText: ""
        },
        showAddBtn: false
      };
      let updatedPlatforms = [...platforms];
      updatedPlatforms.splice(platformIndex + 1, 0, newPlatform);
      const updatedProduct = { ...productData, platformURLs: updatedPlatforms };
      this.setState({ productData: updatedProduct });
    }
  };

  //?Utility function to return platforms having URLs for a particular product
  getValidPlatformsWithURLs = platformsArray => {
    let validPlatformsArray = [];
    if (isValidArray(platformsArray)) {
      (platformsArray || []).forEach(platform => {
        let platformUrlIsValid = _get(platform, "url.valid", false);
        if (platformUrlIsValid) {
          let platformId = _get(platform, "id", "");
          let platformURL = _get(platform, "url.value", "");
          validPlatformsArray = [
            ...validPlatformsArray,
            { platform: platformId, url: platformURL }
          ];
        }
      });
    }
    return validPlatformsArray;
  };

  //? Handle submission of products
  handleSaveBtnClick = () => {
    const { updateProductInProductReviews, setActiveComponent } = this.props;
    const { productData } = this.state;
    let platformsArray = _get(productData, "platformURLs", []);
    let productName = _get(productData, "productName.value", "");
    let productId = _get(productData, "id");
    let validPlatformsArray =
      this.getValidPlatformsWithURLs(platformsArray) || {};
    let reqBody = {
      _id: productId,
      name: productName,
      platforms: [...validPlatformsArray]
    };
    updateProductInProductReviews(reqBody);
    setActiveComponent("list");
  };

  render() {
    const { productData } = this.state;
    const { setActiveComponent } = this.props;
    return (
      <>
        <style jsx>{styles}</style>
        <Zoom in={true}>
          <div
            style={{ margin: "15px 0 15px 0" }}
            key={_get(productData, "_id", "")}
          >
            <ProductCard
              product={productData}
              handleProductNameChange={this.handleProductNameChange}
              handleURLChange={this.handleURLChange}
              addMorePlatform={this.addMorePlatform}
            />
          </div>
        </Zoom>
        <div className="row">
          <div className="col-md-6 offset-md-6">
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  setActiveComponent("list");
                }}
                color="primary"
                variant="contained"
                size="medium"
                startIcon={<ArrowBack />}
                style={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button
                onClick={this.handleSaveBtnClick}
                color="primary"
                variant="contained"
                size="medium"
                endIcon={<ArrowRight />}
              >
                Save and continue
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { dashboardData } = state;
  const { productToEdit } = ownProps;
  const productConfiguredPlatforms = _get(productToEdit, "platforms", []);
  const productReviewsPlatforms = _get(
    dashboardData,
    "productReviewsPlatforms",
    {}
  );
  const platformsArray = _get(productReviewsPlatforms, "platforms", []);

  const updatedPlatformArray = platformsArray.map(platform => {
    let platformId = _get(platform, "_id", "");
    let configuredPlatformIndex = _findIndex(productConfiguredPlatforms, [
      "platform",
      platformId
    ]);
    if (configuredPlatformIndex !== -1) {
      return {
        ...platform,
        url:
          (productConfiguredPlatforms[configuredPlatformIndex] || {}).url || ""
      };
    }
    return { ...platform };
  });

  const platformsSuccess = _get(productReviewsPlatforms, "success", undefined);
  console.log(updatedPlatformArray, "updatedPlatformArray");
  return {
    updatedPlatformArray,
    platformsSuccess
  };
};

export default connect(mapStateToProps, { updateProductInProductReviews })(
  EditProduct
);
