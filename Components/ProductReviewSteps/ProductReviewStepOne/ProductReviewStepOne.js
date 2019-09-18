import React from "react";
import { productReviewStepOneStyles } from "./productReviewStepOneStyles";
import uuid from 'uuid/v1';
class ProductReviewStepOne extends React.Component {
  renderHeaderSection = () => {
    return (
      <div className="mainReviewSection">
        <style jsx>{productReviewStepOneStyles}</style>
        <div className="mainReviewImageContainer">
          <img src="/static/images/capture.png" />
        </div>
        <div className="mainReviewHeading">
          <h4>Google.com</h4>
        </div>
      </div>
    );
  };

  handleProductSelection = item => {
    const {selectedProducts} = this.props;
    //true -> add, false -> delete
    const operation = selectedProducts[item.id]!==undefined ? false : true;
    this.props.handleProductSelection(item, operation);
  };

  renderProductLabel = item => {
    const { selectedProducts } = this.props;
    return (
      <div
        className="labelContainer"
        onClick={() => {
          this.handleProductSelection(item);
        }}
      >
        <style jsx>{productReviewStepOneStyles}</style>
        <div className="labelHeader">
          <div className="labelId">
            <div>{item.id}</div>
          </div>
          {selectedProducts[item.id] !== undefined ? (
            <div className="labelSymbol">
              <i className="fa fa-check"></i>
            </div>
          ) : null}
        </div>
        <div className="labelTextContainer">
          <div><img src="/static/images/product.jpg" style={{height:"100px", width:"auto"}}/></div>
          <div>{item.name}</div>
        </div>
      </div>
    );
  };

  renderProductSelectionSection = () => {
    const { products, selectedProducts} = this.props;
    return (
      <div className="productSelectionContainer">
        <style jsx>{productReviewStepOneStyles}</style>
        <div className="productSelectionHeader">
          <h5>
            Please select the products ( by clicking on them ) you want to rate
            -
          </h5>
          <div className="productSelectionSubHeader">
            <h6>Selected products to review: {Object.keys(selectedProducts).length}</h6>
          </div>
        </div>
        <div className="productSelectionLabelsContainer">
          <div className="row">
            {products.map(item => {
              return (
                <div className="col-md-4" key={uuid()}>{this.renderProductLabel(item)}</div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  renderNextBtn = ()=>{
    return Object.keys(this.props.selectedProducts).length > 0 ? <div>
    <style jsx>{productReviewStepOneStyles}</style>
    <button className="nextBtn" onClick={()=>{
      this.props.goToNextStep()
    }} >Next <i className="fa fa-arrow-right"></i></button>
  </div> : null
  }

  render() {
    return (
      <div>
        <div>{this.renderHeaderSection()}</div>
        <div>{this.renderProductSelectionSection()}</div>
        <div>{this.renderNextBtn()}</div>
      </div>
    );
  }
}

export default ProductReviewStepOne;
