import React, { Component } from "react";
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
import { addProductInProductReviews } from "../../../../store/actions/dashboardActions";
import styles from "./styles";

class AddProduct extends Component {
  state = {
    productData: []
  };

  componentDidMount() {
    this.addProduct();
  }

  generatePlatformsArray = () => {
    const { platformsArray } = this.props;
    return platformsArray.map(item => {
      const id = _get(item, "_id", "");
      const name = _get(item, "name", "");
      return {
        id,
        uniqueId: uniqueIdGenerator(),
        showAddBtn: true,
        url: {
          element: "input",
          type: "text",
          value: "",
          placeholder: `Enter ${name} URL`,
          touched: false,
          valid: false,
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
    const { productData } = this.state;
    const platformURLs = this.generatePlatformsArray();
    this.setState({
      productData: [
        ...productData,
        {
          id: uniqueIdGenerator(),
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

  handleProductNameChange = (e, id) => {
    const { productData } = this.state;
    const value = _get(e, "target.value", "");
    let formDataIndex = _findIndex(productData, ["id", id]);
    if (formDataIndex !== -1) {
      let formData = productData[formDataIndex] || [];
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
      let updatedData = [...productData];
      updatedData[formDataIndex] = { ...formData };
      this.setState({ productData: [...updatedData] });
    }
  };

  handleURLChange = (e, productId, platformUniqueId) => {
    const value = _get(e, "target.value", {});
    const { productData } = this.state;
    let productIndex = _findIndex(productData, ["id", productId]);
    if (productIndex !== -1) {
      let product = productData[productIndex] || [];
      if (product) {
        let platformURLs = _get(product, "platformURLs", []);
        let indexOfPlatformURLToUpdate = _findIndex(platformURLs, [
          "uniqueId",
          platformUniqueId
        ]);
        let platformURLToUpdate =
          platformURLs[indexOfPlatformURLToUpdate] || {};
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
        product = { ...product, platformURLs: [...platformURLs] };
      }
      let updatedData = [...productData];
      updatedData[productIndex] = { ...product };
      this.setState({ productData: [...updatedData] });
    }
  };

  addMorePlatform = (productId, platformId) => {
    const { productData } = this.state;
    const productIndex = _findIndex(productData, ["id", productId]);
    if (productIndex !== -1) {
      const product = productData[productIndex];
      const platforms = _get(product, "platformURLs", []);
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
        const updatedProduct = { ...product, platformURLs: updatedPlatforms };
        let updatedProductData = [...productData];
        updatedProductData[productIndex] = { ...updatedProduct };
        this.setState({ productData: updatedProductData });
      }
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
    const { addProductInProductReviews, setActiveComponent } = this.props;
    const { productData } = this.state;
    let reqBody = [];
    if (isValidArray(productData)) {
      (productData || []).forEach(product => {
        let productNameIsValid = _get(product, "productName.valid", "");
        let productName = _get(product, "productName.value", "");
        let platformsArray = _get(product, "platformURLs", []);
        let validPlatformsArray =
          this.getValidPlatformsWithURLs(platformsArray) || [];
        //if valid productName && at least one platform URL is added push into request Body
        if (productNameIsValid && (validPlatformsArray || []).length > 0) {
          reqBody = [
            ...reqBody,
            { name: productName, platforms: [...validPlatformsArray] }
          ];
        }
      });
    }
    if (isValidArray(reqBody)) {
      addProductInProductReviews(reqBody);
      setActiveComponent("list");
    }
  };

  render() {
    const { productData } = this.state;
    const { setActiveComponent } = this.props;
    return (
      <>
        <style jsx>{styles}</style>
        {(productData || []).map(product => {
          return (
            <Zoom in={true}>
              <div
                style={{ margin: "15px 0 15px 0" }}
                key={_get(product, "id", "")}
              >
                <ProductCard
                  product={product}
                  handleProductNameChange={this.handleProductNameChange}
                  handleURLChange={this.handleURLChange}
                  addMorePlatform={this.addMorePlatform}
                />
              </div>
            </Zoom>
          );
        })}
        <div className="row">
          <div className="col-md-6">
            <Button
              onClick={this.addProduct}
              color="primary"
              size="medium"
              startIcon={<AddCircleOutlineIcon />}
            >
              Add More Products
            </Button>
          </div>
          <div className="col-md-6">
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

const mapStateToProps = state => {
  const { dashboardData } = state;
  const productReviewsPlatforms = _get(
    dashboardData,
    "productReviewsPlatforms",
    {}
  );
  const platformsArray = _get(productReviewsPlatforms, "platforms", []);
  const platformsSuccess = _get(productReviewsPlatforms, "success", undefined);
  return {
    platformsArray,
    platformsSuccess
  };
};

export default connect(mapStateToProps, { addProductInProductReviews })(
  AddProduct
);
