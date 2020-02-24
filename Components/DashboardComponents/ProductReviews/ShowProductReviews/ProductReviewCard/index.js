import React from "react";
import RatingIndicators from "../../../../Widgets/RatingIndicators/RatingIndicators";
import Card from "../../../../MaterialComponents/Card";
import { ratingColor } from "../../../../../utility/ratingTypeColor";
import productReviewCardStyles from "./productReviewCardStyles";

const ProductReviewCard = props => {
  const name = "Peter Surname";
  const rating = "5";
  const date = "21.02.2020 14:20";
  const reviewText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt imperdiet luctus. Fusce in lectus vel urna iaculis ullamcorper quis sit amet eros. Vivamus commodo leo ut nisi interdum, eget tristique enim eleifend. Proin sed tempor neque. Suspendisse potenti. Cras aliquet ipsum in felis molestie, in feugiat lorem sodales. Praesent blandit varius lorem nec gravida.Nulla vitae nulla sapien.Morbi eu sollicitudin elit, at consequat risus.Pellentesque tortor neque, congue ut justo ac, pellentesque ornare ipsum.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Nam vehicula lectus quis purus vehicula congue.In sodales augue sed ex vestibulum maximus.Mauris tortor dui, consectetur in imperdiet sed, venenatis et nisl.Suspendisse nec luctus erat, nec egestas ligula.";
  return (
    <Card>
      <style jsx>{productReviewCardStyles}</style>
      <div className="row">
        <div className="col-md-2">
          <div className="reviewDetailsFlex">
            <div>
              <div className="reviewerName">{name}</div>
              <div className="ratingContainer">
                <RatingIndicators
                  rating={Number(rating) || 0}
                  typeOfWidget="star"
                  widgetRatedColors={
                    ratingColor[Math.round(Number(rating)) || 0]
                  }
                  widgetDimensions="25px"
                  widgetSpacings="1px"
                />
              </div>
              <div className="dateContainer">{date}</div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="logoFlex">
            <div className="logoContainer">
              <img src="/static/images/googleIcon.png" alt="google icon" />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="textContainer">{reviewText}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProductReviewCard;
