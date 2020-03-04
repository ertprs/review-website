import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import Snackbar from "../../../Widgets/Snackbar";
import _get from "lodash/get";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import validate from "../../../../utility/validate";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Zoom from "@material-ui/core/Zoom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  isValidArray,
  uniqueIdGenerator
} from "../../../../utility/commonFunctions";
import { addProduct } from "../../../../store/actions/dashboardActions";
import styles from "./styles";

class AddProduct extends Component {
  state = {
    productData: [],
    showSnackbar: false,
    snackbarVariant: "success",
    snackbarMessage: "",
    isLoading: false
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
              required: true
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
            valid: value
              ? validate(
                  value,
                  _get(platformURLToUpdate, "url.validationRules", {})
                )
              : true,
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
  getValidPlatformsURLs = platformsArray => {
    let validPlatformsArray = [];
    let areAllUrlsValid = true;
    if (isValidArray(platformsArray)) {
      (platformsArray || []).forEach(platform => {
        let platformUrlIsValid = _get(platform, "url.valid", false);
        let platformId = _get(platform, "id", "");
        let platformURL = _get(platform, "url.value", "");
        if (platformURL && platformUrlIsValid) {
          validPlatformsArray = [
            ...validPlatformsArray,
            { platform: platformId, url: platformURL }
          ];
        } else {
          if (platformURL) {
            areAllUrlsValid = false;
          }
        }
      });
    }
    return { validPlatformsArray, areAllUrlsValid };
  };

  //? Handle submission of products
  saveProductHandler = () => {
    const { addProduct } = this.props;
    const { productData } = this.state;
    let reqBody = [];
    let isValid = true;
    if (isValidArray(productData)) {
      (productData || []).forEach(product => {
        let productNameIsValid = _get(product, "productName.valid", "");
        let productName = _get(product, "productName.value", "");
        let platformsArray = _get(product, "platformURLs", []);
        let { validPlatformsArray, areAllUrlsValid } =
          this.getValidPlatformsURLs(platformsArray) || [];
        isValid = isValid && productNameIsValid && areAllUrlsValid;
        //if valid productName && at least one platform URL is added push into request Body
        if (
          productNameIsValid &&
          areAllUrlsValid &&
          (validPlatformsArray || []).length > 0
        ) {
          reqBody = [
            ...reqBody,
            { name: productName, platforms: [...validPlatformsArray] }
          ];
        }
      });
    }
    if (isValidArray(reqBody) && isValid) {
      this.setState({ isLoading: true });
      addProduct(reqBody, this.addProductResponse);
    } else if ((reqBody || []).length === 0) {
      alert("Please add at-least one product!");
    } else {
      alert("Please check if all the fields are valid!");
    }
  };

  addProductResponse = (success, msg) => {
    const { setActiveComponent, initSetup } = this.props;
    if (success === true) {
      this.setState(
        {
          showSnackbar: true,
          snackbarMessage: msg,
          snackbarVariant: "success",
          isLoading: false
        },
        () => {
          if (initSetup !== true) {
            setActiveComponent("list");
          }
        }
      );
    } else if (success === false) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: msg,
        snackbarVariant: "error",
        isLoading: false
      });
    }
  };

  removeProduct = id => {
    console.log(id, "id");
    const { productData } = this.state;
    if (id) {
      let updatedProductData = productData.filter(product => {
        return product.id !== id;
      });
      this.setState({ productData: [...updatedProductData] });
    }
  };

  removePlatform = (productId, platformUniqueId) => {
    const { productData } = this.state;
    if (productId && platformUniqueId) {
      const productIndexToUpdate = _findIndex(productData, ["id", productId]);
      const productToUpdate = productData[productIndexToUpdate];
      if (productToUpdate) {
        let updatedPlatformUrls = _get(
          productToUpdate,
          "platformURLs",
          []
        ).filter(platform => {
          return _get(platform, "uniqueId", "") !== platformUniqueId;
        });
        let updatedProductData = [...productData];
        updatedProductData[productIndexToUpdate] = {
          ...updatedProductData[productIndexToUpdate],
          platformURLs: [...updatedPlatformUrls]
        };
        this.setState({ productData: [...updatedProductData] });
      }
    }
  };

  render() {
    const {
      showSnackbar,
      snackbarMessage,
      snackbarVariant,
      isLoading,
      productData
    } = this.state;
    const { setActiveComponent } = this.props;
    const initSetup = _get(this.props, "initSetup", false);
    return (
      <>
        <style jsx>{styles}</style>
        {initSetup ? <h3>Please setup a product </h3> : null}
        {(productData || []).map((product, index) => {
          return (
            <Zoom in={true}>
              <div
                style={{ margin: "15px 0 15px 0" }}
                key={_get(product, "id", "")}
              >
                <ProductCard
                  index={index}
                  product={product}
                  handleProductNameChange={this.handleProductNameChange}
                  handleURLChange={this.handleURLChange}
                  addMorePlatform={this.addMorePlatform}
                  removeProduct={this.removeProduct}
                  removePlatform={this.removePlatform}
                />
              </div>
            </Zoom>
          );
        })}
        <div className="row mt_fifty mb_fifty">
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
              {initSetup ? null : (
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
              )}
              {isLoading ? (
                <Button variant="contained" size="medium" color="primary">
                  <CircularProgress size={25} color="#fff" />
                </Button>
              ) : (
                <Button
                  onClick={this.saveProductHandler}
                  color="primary"
                  variant="contained"
                  size="medium"
                >
                  Save Product
                </Button>
              )}
            </div>
          </div>
        </div>
        <Snackbar
          variant={snackbarVariant}
          message={snackbarMessage}
          open={showSnackbar}
          handleClose={() => {
            this.setState({ showSnackbar: false });
          }}
        />
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
  return {
    platformsArray
  };
};

export default connect(mapStateToProps, { addProduct })(AddProduct);
