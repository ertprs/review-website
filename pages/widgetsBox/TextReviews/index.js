import React, { useState, useEffect } from "react";
import PusherDataComponent from "../../../Components/PusherDataComponent/PusherDataComponent";
import axios from 'axios';
import {baseURL} from '../../../utility/config';
import ReviewBox from "../../../Components/Widgets/ReviewBox/ReviewBox";
import OnlyScoreWidget from "../OnlyScoreWidget/index";
import Slider from "react-slick";
import uuid from "uuid/v1";
import { layoutStyles } from "../../../style";
import Head from "next/head";
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const retrieveRequiredData = reviewData => {
  const ratings = Number(_get(reviewData,'rating',0));

  const totalReviews = _get(reviewData,'total',0);

  const reviews = _get(reviewData,'reviews',[]);

  return { ratings, totalReviews, reviews };
};

const renderTextReviewsWidget = (reviewData, settings, props) => {
  const requiredData = retrieveRequiredData(reviewData);
  return (
    <div className="flexContainer">
      <style jsx>{layoutStyles}</style>
      <style jsx>{`
        .flexContainer {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
        }
        .flexContainer > div {
          width: ${requiredData.total > 2 ? "80%" : "40%"};
          order: 0;
          flex: 0 1 auto;
        }

        .flexContainer > div:last-child {
          width: ${requiredData.total <= 2 ? "100%" : "80%"};
        }

        .textReviewsContainer {
          padding: 0 3% 0 3%;
        }

        .scoreWidgetContainer {
          width: 20%;
          height: 100%; //affected by the height passed as a prop to the widget
        }

        @media screen and (max-width:991px){
          .flexContainer > div:last-child{
            flex-basis:100%;
          }
        }

        @media screen and (max-width: 989px) {
          .textReviewsContainer {
            padding: 0 4% 0 4%;
          }

          @media screen and (max-width: 767px) {
            .textReviewsContainer {
              padding: 0 5.3% 0 5%;
            }
            .scoreWidgetContainer {
              display: none;
            }
            .flexContainer > div {
              width: 100%;
            }
          }

          @media screen and (max-width: 525px) {
            .textReviewsContainer {
              padding: 0 5.5% 0 5.5%;
            }
          }

          @media screen and (max-width: 468px) {
            .textReviewsContainer {
              padding: 0 7% 0 7%;
            }
          }
        }
      `}</style>
      <div className="scoreWidgetContainer">
        <OnlyScoreWidget
          requiredData={requiredData}
          variant="carousel"
          textReviews={true}
        />
      </div>
      <div className="textReviewsContainer">
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
        <div className="reviewBoxSlider">
          <Slider {...settings}>
            {requiredData.reviews.map(item => {
              return (
                <div key={uuid()}>
                  <ReviewBox review={item} styles={{height:"200px"}} reviewRatingStyles={{margin:"8px 0 8px 0"}} reviewHeaderStyles={{marginTop:"5px"}} />
                </div>
              );
            })}
          </Slider>
          <div></div>
        </div>
      </div>
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <style jsx>
        {`
          .sampleNextArrow::before {
            content: "\\00BB";
            color: #000;
          }
        `}
      </style>
      <div
        className={className + " " + "sampleNextArrow"}
        style={{ ...style }}
        onClick={onClick}
      />
    </>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <style jsx>
        {`
          .samplePrevArrow::before {
            content: "\\00AB";
            color: #000;
          }
        `}
      </style>
      <div
        className={className + " " + "samplePrevArrow"}
        style={{ ...style }}
        onClick={onClick}
      />
    </>
  );
}

const TextReviews = props => {
  let initState = {};

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

  const [parentState, setParentState] = useState(initState);
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false
        }
      },
      {
        breakpoint: 813,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      {renderTextReviewsWidget(reviewData, settings, props)}
    </>
  );
};

TextReviews.getInitialProps = async ({ query }) => {
  const searchURL = query.businessunitId
    ? `${query.businessunitId}`
    : "google.com";

  return { domain: searchURL };
};

export default TextReviews;
