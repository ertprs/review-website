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
    //? creating data for product based upon the product data received
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

  //? this will generate array of objects where each object will represent each url and the data is in format to be used in form fields
  generatePlatformsArray = () => {
    const { reviewPlatformsArray } = this.props;
    return reviewPlatformsArray.map(item => {
      //? if of this obj for backend
      const id = _get(item, "_id", "");
      const name = _get(item, "name", "");
      const url = _get(item, "url", "");
      const platformId = _get(item, "platform", "");
      return {
        id,
        //? we are using this unique identifier
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

  //? this method will add showAddBtn = true for first platform and in all unique platforms, as there can be multiple objects for same platform
  addShowAddBtnPropertyInPlatformUrls = () => {
    let platformsArray = this.generatePlatformsArray();
    //? getting all unique Platforms
    let uniquePlatforms = _uniqBy(platformsArray, "platformId");
    if (isValidArray(platformsArray)) {
      return (platformsArray || []).map(platform => {
        //? if this exists in uniquePlatformsArray we'll add showAddBtn property to true
        let isThisUniquePlatform = _findIndex(uniquePlatforms, [
          "uniqueId",
          _get(platform, "uniqueId", "")
        ]);
        //?
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

  //? we only need e. productId and platformUniqueId are being passed for add product, we are not using them
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

  //? productId is being passed for add product we are not using it
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

  //? this method will return array of platforms, conditions are: (a) platformUrl should not be empty and valid (b) if it has _id that means it is existing url and if not that means new url. (c) if any url is invalid areAllUrlsValid will be false (d) if there is any url then only anyNewUrlAdded will be true
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
    const { productData, productToEdit } = this.state;
    const { updateProduct } = this.props;
    const oldProductName = _get(productToEdit, "name", "");
    const platformsArray = _get(productData, "platformURLs", []);
    const productName = _get(productData, "productName.value", "");
    const isValidProductName = _get(productData, "productName.valid", false);
    const productId = _get(productData, "id");
    let { validPlatformUrls, areAllUrlsValid, anyNewUrlAdded } =
      this.getValidPlatformsURLs(platformsArray) || {};
    //? will make api call if product name is valid and changed and all the urls are valid and any url is added
    if (
      (isValidProductName && areAllUrlsValid && anyNewUrlAdded) ||
      productName !== oldProductName
    ) {
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
    } else if (!anyNewUrlAdded) {
      alert("Please add any new url!");
    }
  };

  //? response of update product api call to show snackbar
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

  //? not using productId
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
  //? existing platforms
  let configuredPlatforms = _get(productToEdit, "platforms", []);
  //? platform array from backend
  const platformsFromApi = _get(
    dashboardData,
    "productReviewsPlatforms.platforms",
    {}
  );
  //? copying in different variable
  let nonConfiguredPlatforms = [...platformsFromApi];
  if (isValidArray(configuredPlatforms)) {
    configuredPlatforms = configuredPlatforms.map(platform => {
      let platformId = _get(platform, "platform", "");
      //? finding platformName from platformArray list of api
      let platformName =
        (_find(platformsFromApi, ["_id", platformId]) || {}).name || "";
      //? remove the platform from platformArray(api) if it is already configured, so that it will not repeat because in the end we'll merge both platformArray(api) and configuredPlatforms
      nonConfiguredPlatforms = _remove(nonConfiguredPlatforms, platform => {
        return _get(platform, "_id", "") !== platformId;
      });
      //? this is our updated configuredPlatformsArray with new property name that we have find from platformsArray(Api)
      return {
        ...platform,
        name: platformName
      };
    });
  }
  //? transforming platformsArray(api) in the similar format as alreafy configuredPlatforms
  nonConfiguredPlatforms = nonConfiguredPlatforms.map(platform => {
    return {
      name: _get(platform, "name", ""),
      platform: _get(platform, "_id", ""),
      url: ""
    };
  });

  //? was trying to group same platforms together but it was having some unexpected behaviour that's why put this in pending
  // let configuredPlatformsCopy = [...configuredPlatforms];
  // (configuredPlatformsCopy || []).forEach((platform, index, array) => {
  //   let platformIndex = _findIndex(configuredPlatformsCopy, [
  //     "platform",
  //     _get(platform, "platform", "")
  //   ]);
  //   if (platformIndex >= 0) {
  //     configuredPlatformsCopy.splice(platformIndex + 1, 0, platform);
  //     configuredPlatformsCopy.splice(index, 1);
  //   } else {
  //     configuredPlatformsCopy.push(platform);
  //   }
  // });

  //? merging both allReady configured platforms and platformsArray(api)
  let reviewPlatformsArray = [
    ...configuredPlatforms,
    ...nonConfiguredPlatforms
  ];

  //? this reviewPlatformsArray contains both configuredPlatforms and platformsArray(api), we have transformed both the array to suit our need
  return {
    reviewPlatformsArray
  };
};

export default connect(mapStateToProps, {
  updateProduct
})(EditProduct);
