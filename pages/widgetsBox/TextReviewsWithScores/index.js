import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import Slider from "react-slick";
import ReviewBox from "../../../Components/Widgets/ReviewBox/ReviewBox";
import PusherDataComponent from "../../../Components/PusherDataComponent/PusherDataComponent";
import Head from "next/head";
import uuid from "uuid/v1";
import { layoutStyles } from "../../../style";
import axios from 'axios';
import {baseURL} from '../../../utility/config';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const retrieveRequiredData = reviewData => {
  
  const ratings = Number(_get(reviewData,'rating',0));

  const totalReviews =_get(reviewData,'total',0);

  const reviews = _get(reviewData,'reviews',[]);

  return { ratings, totalReviews, reviews };
};

const renderWidget = (reviewData, settings) => {
  let requiredData = retrieveRequiredData(reviewData);
  return (
    <div className="widgetBox">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <style jsx>{layoutStyles}</style>
      <style jsx>
        {`
              .widgetContainer{
                max-width:100%;
                height:auto;
              }
              .widgetBox {
                box-shadow: 0px 2px 4px #d1d1d1;
                padding: 3% 4% 4% 4%;
                border-radius: 6px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                -ms-border-radius: 10px;
                -o-border-radius: 10px;
                 height:100%;
                 max-width:99%;
                 margin:0 auto;
              }
              .widgetImgContainer {
                height: 80px;
                width: 100%;
                margin-top: 5px;
                text-align-center;
                
              }
              .reviewHeader {
                display: flex;
                margin-bottom:25px;
              }

              .reviewHeader > div {
                flex-basis: 50%;
              }

              .ratingsContainer {
                text-align: right;
              }

              .reviewBoxSlider{
                margin: 3% 0 0% 0;
              }

              @media screen and (max-width:279px){
                .reviewHeader{
                  flex-direction:column;
                }
                .reviewHeader > div{
                  flex-basis:100%;
                }
                .reviewHeader{
                  margin-bottom:12px;
                }
                .ratingsContainer{
                  text-align:center;
                }
                .textRatings{
                  display:none;
                }
              }

              @media screen and (max-width:279px){
                .starRatings{
                  display:none;
                }
              }
            `}
      </style>
      {/* <div className="widgetBox"> */}
      <div className="widgetImgContainer">
        <img
          src="/static/business/index/images/gradientLogo.png"
          alt="logo"
          style={{
            maxWidth: "100%",
            height: "57%",
            margin: "0 auto",
            display: "block"
          }}
        />
      </div>
      <div className="reviewHeader">
        <div className="reviewsCountContainer">
          <div>
            <h5>Trusted Site !</h5>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>
              {requiredData.totalReviews}
            </span>{" "}
            reviews
          </div>
        </div>
        <div className="ratingsContainer">
          <div className="starRatings">
            <StarRatings
              rating={Number(requiredData.ratings)}
              starRatedColor="#21bc61"
              starDimension="23px"
              starSpacing="0.5px"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <div className="textRatings">
            <span style={{ fontWeight: "bold" }}>{requiredData.ratings}/5</span>{" "}
            Average
          </div>
        </div>
      </div>
      <div className="reviewBoxSlider">
        {requiredData.reviews.length > 0 ? (
          <Slider {...settings}>
            {requiredData.reviews.map(item => {
              return (
                <div key={uuid()} style={{ height: "100%" }}>
                  <ReviewBox review={item} />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              src="/static/images/preloader.gif"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const TextReviewsWithScores = props => {
  let initState = {};
  const [parentState, setParentState] = useState(initState);
  const [reviewData, setReviewData] = useState({})

  useEffect(() => {
    axios.get(`${baseURL}/api/reviews/domain?perPage=17&page=1&domain=${props.domain}`)
    .then(res=>{
      console.log("response form widget ",res.data)
      if(!isEmpty(res.data))
      setReviewData({...res.data})
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])

  const settings = {
    infinite: true,
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
    // adaptiveHeight:true
  };

  return (
    <>
      {renderWidget(reviewData, settings)}
    </>
  );
};

TextReviewsWithScores.getInitialProps = async ({ query }) => {
  const searchURL = query.businessunitId
    ? `${query.businessunitId}`
    : "google.com";

  return { domain: searchURL };
};

export default TextReviewsWithScores;
