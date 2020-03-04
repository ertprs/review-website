import React, { Component } from "react";
import { connect } from "react-redux";
import _now from "lodash/now";
import Snackbar from "../../../Widgets/Snackbar";
import ProductCard from "./ProductCard";
import _get from "lodash/get";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _remove from "lodash/remove";
import _uniqBy from "lodash/uniqBy";
import validate from "../../../../utility/validate";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Zoom from "@material-ui/core/Zoom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  isValidArray,
  uniqueIdGenerator
} from "../../../../utility/commonFunctions";
import { updateProduct } from "../../../../store/actions/dashboardActions";
import styles from "./styles";

class EditProduct extends Component {
  state = {
    productData: {},
    showSnackbar: false,
    snackbarVariant: "success",
    snackbarMessage: "",
    isLoading: false
  };

  componentDidMount() {
    //? creating data for product depending upon the product data received
    const { productToEdit } = this.props;
    const productName = _get(productToEdit, "name", "");
    const productId = _get(productToEdit, "_id", "");
    const platformURLsWithShowAddBtn = this.addShowAddBtnPropertyInPlatformUrls();
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
          errorMessage: "Please enter product name",
          validationRules: {
            required: true
          },
          name: "productName",
          id: "productName",
          labelText: ""
        },
        platformURLs: [...platformURLsWithShowAddBtn]
      }
    });
  }

  //? this will generate the array of platforms by adding formFields and some other dara by "reviewPlatformsArray"
  generatePlatformsArray = () => {
    const { reviewPlatformsArray } = this.props;
    return reviewPlatformsArray.map(item => {
      const id = _get(item, "_id", "");
      const name = _get(item, "name", "");
      const url = _get(item, "url", "");
      const platformId = _get(item, "platform", "");
      return {
        id,
        uniqueId: uniqueIdGenerator(),
        platformId,
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
          labelText: "",
          disabled: id ? true : false
        }
      };
    });
  };

  //? this method will add showAddBtn = true to all unique platforms
  addShowAddBtnPropertyInPlatformUrls = () => {
    let platformsArray = this.generatePlatformsArray();
    let uniquePlatforms = _uniqBy(platformsArray, "platformId");
    if (isValidArray(platformsArray)) {
      return (platformsArray || []).map(platform => {
        let isThisUniquePlatform = _findIndex(uniquePlatforms, [
          "uniqueId",
          _get(platform, "uniqueId", "")
        ]);
        if (isThisUniquePlatform !== -1) {
          return {
            ...platform,
            showAddBtn: true
          };
        } else {
          return { ...platform, showAddBtn: false };
        }
      });
    }
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
        valid: value
          ? validate(
              value,
              _get(platformURLToUpdate, "url.validationRules", {})
            )
          : true,
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

  addMorePlatform = (productId, platformId) => {
    const { productData } = this.state;
    const platforms = _get(productData, "platformURLs", []);
    const platformIndex = _findIndex(platforms, ["id", platformId]);
    if (platformIndex !== -1) {
      const platform = platforms[platformIndex];
      const platformId = _get(platform, "platformId", "");
      const platformName = _get(platform, "url.name", "");
      const newPlatform = {
        id: "",
        platformId,
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
  getValidPlatformsURLs = platformsArray => {
    let validPlatformUrls = [];
    //? this will be used to show alert if any of the url is invalid
    let areAllUrlsValid = true;
    let anyNewUrlAdded = false;
    if (isValidArray(platformsArray)) {
      (platformsArray || []).map(platform => {
        const platformUrlIsValid = _get(platform, "url.valid", false);
        const platformUrl = _get(platform, "url.value", "");
        if (platformUrl) {
          if (platformUrlIsValid) {
            let _id = _get(platform, "id", "");
            //? these are the existing urls, we don't have option to edit this url right now
            if (_id) {
              validPlatformUrls.push({
                _id: _get(platform, "id", ""),
                platform: _get(platform, "platformId", ""),
                url: platformUrl
              });
            }
            //? this will be the new url that user has added for a platform, it gets identified because it doesn't have _id
            else {
              anyNewUrlAdded = true;
              validPlatformUrls.push({
                platform: _get(platform, "platformId"),
                url: platformUrl
              });
            }
          } else {
            areAllUrlsValid = false;
          }
        }
      });
    }
    return {
      validPlatformUrls,
      areAllUrlsValid,
      anyNewUrlAdded
    };
  };

  //? Handle submission of products
  updateProductHandler = () => {
    const { updateProduct } = this.props;
    const { productData } = this.state;
    const platformsArray = _get(productData, "platformURLs", []);
    const productName = _get(productData, "productName.value", "");
    const productId = _get(productData, "id");
    const isValidProductName = _get(productData, "productName.valid", false);
    let { validPlatformUrls, areAllUrlsValid, anyNewUrlAdded } =
      this.getValidPlatformsURLs(platformsArray) || {};
    if (isValidProductName && areAllUrlsValid && anyNewUrlAdded) {
      this.setState({ isLoading: true });
      let reqBody = {
        _id: productId,
        name: productName,
        platforms: [...validPlatformUrls]
      };
      updateProduct(reqBody, this.updateProductResponse);
    } else if (!isValidProductName) {
      alert("Please enter a valid product name");
    } else if (!areAllUrlsValid) {
      alert("Please check if all the entered urls are valid!");
    }
    if (!anyNewUrlAdded) {
      alert("Please add any new url!");
    }
  };

  updateProductResponse = (success, msg) => {
    const { setActiveComponent } = this.props;
    if (success === true) {
      this.setState(
        {
          showSnackbar: true,
          snackbarMessage: msg,
          snackbarVariant: "success",
          isLoading: false
        },
        () => {
          setActiveComponent("list");
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

  removePlatform = (productId, platformUniqueId) => {
    const { productData } = this.state;
    if (platformUniqueId) {
      let updatedPlatformUrls = _get(productData, "platformURLs", []).filter(
        platform => {
          return _get(platform, "uniqueId", "") !== platformUniqueId;
        }
      );
      let updatedProductData = {
        ...productData,
        platformURLs: [...updatedPlatformUrls]
      };

      this.setState({ productData: { ...updatedProductData } });
    }
  };

  render() {
    const {
      productData,
      showSnackbar,
      snackbarMessage,
      snackbarVariant,
      isLoading
    } = this.state;
    const { setActiveComponent } = this.props;
    return (
      <>
        <style jsx>{styles}</style>
        <h3 style={{ margin: "30px 0px" }}>
          You may add new product urls by clicking on the add icon adjacent to
          the respective platforms.
        </h3>
        <Zoom in={true}>
          <div
            style={{ margin: "15px 0 15px 0" }}
            key={_get(productData, "_id", "")}
          >
            <ProductCard
              //? this index prop will be used to hide close button
              index={0}
              product={productData}
              handleProductNameChange={this.handleProductNameChange}
              handleURLChange={this.handleURLChange}
              addMorePlatform={this.addMorePlatform}
              removePlatform={this.removePlatform}
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
                style={{ marginRight: "20px" }}
              >
                Back
              </Button>
              {isLoading ? (
                <Button variant="contained" size="medium" color="primary">
                  <CircularProgress size={25} color="#fff" />
                </Button>
              ) : (
                <Button
                  onClick={this.updateProductHandler}
                  color="primary"
                  variant="contained"
                  size="medium"
                >
                  Update Product
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

const mapStateToProps = (state, ownProps) => {
  const { dashboardData } = state;
  const { productToEdit } = ownProps;
  let configuredPlatforms = _get(productToEdit, "platforms", []);
  const platformsFromApi = _get(
    dashboardData,
    "productReviewsPlatforms.platforms",
    {}
  );
  let nonConfiguredPlatforms = [...platformsFromApi];
  if (isValidArray(configuredPlatforms)) {
    configuredPlatforms = configuredPlatforms.map(platform => {
      let platformId = _get(platform, "platform", "");
      let platformName =
        (_find(platformsFromApi, ["_id", platformId]) || {}).name || "";
      nonConfiguredPlatforms = _remove(nonConfiguredPlatforms, platform => {
        return _get(platform, "_id", "") !== platformId;
      });

      return {
        ...platform,
        name: platformName
      };
    });
  }
  nonConfiguredPlatforms = nonConfiguredPlatforms.map(platform => {
    return {
      name: _get(platform, "name", ""),
      platform: _get(platform, "_id", ""),
      url: ""
    };
  });
  const reviewPlatformsArray = [
    ...configuredPlatforms,
    ...nonConfiguredPlatforms
  ];

  return {
    reviewPlatformsArray
  };
};

export default connect(mapStateToProps, {
  updateProduct
})(EditProduct);
