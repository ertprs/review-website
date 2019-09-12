import React from "react";
import { productReviewStyles } from "../Components/Styles/productReviewStyles";
import ProductReviewStepOne from "../Components/ProductReviewSteps/ProductReviewStepOne/ProductReviewStepOne";
import ProductReviewStepTwo from "../Components/ProductReviewSteps/ProductReviewStepTwo/ProductReviewStepTwo";
import { baseURL } from "../utility/config";
import Footer from "../Components/Footer/Footer";
import axios from "axios";

class ProductReview extends React.Component {
  state = {
    step: 0,
    products: [],
    selectedProducts: {},
    selectedProductKeys: []
  };

  goToNextStep = () => {
    const { step, selectedProductKeys } = this.state;
    if(step < selectedProductKeys.length){
        this.setState((currentState)=>{
            return {step: currentState.step + 1}
        });
    }
  };

  componentDidMount() {
    axios
      .get(`${baseURL}/api/get-order-data`)
      .then(res => {
        const products = res.data.products;
        console.log(res);
        this.setState({ products: [...products] });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleProductSelection = (item, operation) => {
    const { selectedProducts } = this.state;
    if (operation) {
      this.setState(
        { selectedProducts: { ...selectedProducts, [item.id]: item } },
        () => {
          this.setState({
            maxSteps: Object.keys(this.state.selectedProducts).length,
            selectedProductKeys: Object.keys(this.state.selectedProducts)
          });
        }
      );
    } else {
      let selectedProductsCopy = { ...selectedProducts };
      delete selectedProductsCopy[item.id];
      this.setState({ selectedProducts: { ...selectedProductsCopy } }, () => {
        this.setState({
          maxSteps: Object.keys(this.state.selectedProducts).length,
          selectedProductKeys: Object.keys(this.state.selectedProducts)
        });
      });
    }
  };

  renderReviewHeader = () => {
    return (
      <div className="reviewHeader">
        <style jsx>{productReviewStyles}</style>
        <div className="reviewHeaderLogoContainer">
          <img
            src="/static/business/index/images/gradientLogo.png"
            className="reviewHeaderLogoImage"
          />
        </div>
      </div>
    );
  };

  renderReviewHeroSection = () => {
    return (
      <div className="reviewHeroContainer">
        <style jsx>{productReviewStyles}</style>
        <div className="reviewHeroHeading">
          <h3>Review your recent purchase</h3>
        </div>
        <div className="reviewHeroSubheading">
          <h6>Your feedback helps others make good choices</h6>
        </div>
      </div>
    );
  };

  renderAppropiateStep = () => {
    const { products, selectedProducts, selectedProductKeys, step } = this.state;
    const productToRate = selectedProducts[selectedProductKeys[step-1]];
    if (step === 0) {
      return (
        <ProductReviewStepOne
          products={products}
          handleProductSelection={this.handleProductSelection}
          selectedProducts={selectedProducts}
          goToNextStep={this.goToNextStep}
        />
      );
    }
    else{
        return(
            <ProductReviewStepTwo productToRate={productToRate} selectedProductKeys={selectedProductKeys} step={step}/>
        )
    }
  };

  render() {
    return (
      <div style={{ background: "#f5f5f5" }}>
        <div className="container">
          <style jsx>{productReviewStyles}</style>
          {this.renderReviewHeader()}
          {this.renderReviewHeroSection()}
          <div className="reviewContainerInner">
            {this.renderAppropiateStep()}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ProductReview;
