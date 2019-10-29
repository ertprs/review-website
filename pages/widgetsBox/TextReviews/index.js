import React, { useState, useEffect } from "react";
import PusherDataComponent from "../../../Components/PusherDataComponent/PusherDataComponent";
import axios from "axios";

import ReviewBox from "../../../Components/Widgets/ReviewBox/ReviewBox";
import OnlyScoreWidget from "../OnlyScoreWidget/index";
import Slider from "react-slick";
import uuid from "uuid/v1";
import { layoutStyles } from "../../../style";
import Head from "next/head";
import _get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const retrieveRequiredData = reviewData => {
  const ratings = Number(_get(reviewData, "rating", 0));

  const totalReviews = _get(reviewData, "total", "");

  const reviews = _get(reviewData, "reviews", []);

  const success = _get(reviewData, "success", "");

  return { ratings, totalReviews, reviews, success };
};

const renderReviewBoxFooter = requiredData => {
  return (
    <div className="footer">
      <style jsx>
        {`
          .footer {
            text-align: center;
            font-size: 12.5px;
          }
          .flexContainer {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .flexImgContainer {
            margin-left: 3px;
          }
        `}
      </style>
      <div className="flexContainer">
        <div className="text">
          Based on{" "}
          <span style={{ fontWeight: "bold" }}>
            {_get(requiredData, "totalReviews", 0)}
          </span>{" "}
          reviews at{" "}
          <a href="https://thetrustsearch.com" target="_blank">
            <img src="/static/images/small_logo.png" alt="logoImg" />
          </a>
        </div>
        {/* <div className="flexImgContainer">
          
        </div> */}
      </div>
    </div>
  );
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
          width: ${requiredData.total > 2 ? "80%" : "39%"};
          order: 0;
          flex: 0 1 auto;
        }

        .flexContainer > div:last-child {
          width: ${requiredData.total <= 2 ? "100%" : "80%"};
        }

        .textReviewsContainer {
          padding: 0 3% 0 3%;
          font-size:0.9rem;
        }

        .scoreWidgetContainer {
          width: 20%;
          height: 100%; //affected by the height passed as a prop to the widget
        }
        .reviewBoxFooter{
          display:none;
        }

        .noReviewBox{
          text-align:left;
        }

        @media screen and (max-width:1110px){
          .flexContainer > div:first-child {
            width: 24.3%;
          }

          .flexContainer > div:last-child {
            width: 75%;
          }
        }

         @media screen and (max-width: 990px) {
           .flexContainer{
             justify-content:space-around;
           }
          .flexContainer > div:first-child {
            width: 40%;
          }

          .flexContainer > div:last-child {
            width: 50%;
          }
         }

         @media screen and (max-width: 599px){
           .flexContainer > div:first-child{
             display:none;
             width:0;
           }
           .flexContainer > div:last-child{
             width:81.5%;
             margin:0 auto;
           }
           .reviewBoxFooter{
             display:block;
             margin-top:8px;
           }
           .noReviewBox{
             text-align:center;
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
          <link href="/static/css/slick.css" type="text/css" rel="stylesheet" />
        </Head>
        <div className="reviewBoxSlider">
          {requiredData.success !== false && requiredData.totalReviews > 0 ? (
            <Slider {...settings}>
              {requiredData.reviews.map(item => {
                return (
                  <div key={uuid()}>
                    <ReviewBox
                      review={item}
                      styles={{ height: "170px" }}
                      reviewRatingStyles={{ margin: "8px 0 8px 0" }}
                      reviewHeaderStyles={{ marginTop: "0px" }}
                      domain={props.domain}
                    />
                  </div>
                );
              })}
            </Slider>
          ) : requiredData.totalReviews === 0 ? (
            <div className="noReviewBox">
              <h4 style={{ marginTop: "40px" }}>No reviews Found</h4>
            </div>
          ) : (
            <div className="noReviewBox">
              <h5 style={{ marginTop: "40px" }}>Fetching review data...</h5>
            </div>
          )}
          <div></div>
        </div>
        <div className="reviewBoxFooter">
          {renderReviewBoxFooter(requiredData)}
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
            content: "";
            color: #000;
            background-image: url("/static/images/logo.png");
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

  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    console.log("yes");
    axios
      .get(
        `${process.env.BASE_URL}/api/reviews/domain?perPage=17&page=1&domain=${props.domain}`
      )
      .then(res => {
        if (!isEmpty(res.data)) setReviewData({ ...res.data });
      })
      .catch(error => {
        setReviewData({ success: false });
        // if (axios.isCancel(error)) {
        //   console.log("cancelled");
        // } else {
        //   throw error;
        // }
        let success = _get(error, "response.data.success", false);
        if (!success) {
          setReviewData({ rating: "0", reviews: [], total: 0, next: "" });
        }
      });
    return () => {};
  }, []);

  const [parentState, setParentState] = useState(initState);
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };
  return <>{renderTextReviewsWidget(reviewData, settings, props)}</>;
};

TextReviews.getInitialProps = async ({ query }) => {
  const searchURL = (await query.businessunitId)
    ? `${query.businessunitId}`
    : "google.com";
  return { domain: searchURL };
};

export default TextReviews;
