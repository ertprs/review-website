import React from "react";
import ReviewBox from "../ReviewBox/ReviewBox";
import Slider from "react-slick";
import uuid from "uuid/v1";

class TrustDontTrustSlider extends React.Component {
  settings = {
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

  requiredData = {
    topFifteenReviews: [
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "trust",
        text: "Because the owner of company is my brother. I trust him "
      },
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "dont_trust",
        text: "Because I have been their client for 10 years"
      },
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "trust",
        text: "Because the owner of company is my brother. I trust him "
      },
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "trust",
        text: "Because the owner of company is my brother. I trust him "
      },
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "dont_trust",
        text: "Because I have been their client for 10 years"
      },
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "trust",
        text: "Because the owner of company is my brother. I trust him "
      },
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "dont_trust",
        text: "Because I have been their client for 10 years"
      },
      {
        name: "Jeremy Jahns",
        date: "17 September 2019",
        image: "trust",
        text: "Because the owner of company is my brother. I trust him "
      }
    ]
  };

  render() {
    return (
      <div className="flexContainer">
        <style jsx>{`
          .flexContainer {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .flexContainer > div {
            width: ${this.requiredData.topFifteenReviews.length > 2
              ? "100%"
              : "100%"};
            order: 0;
            flex: 0 1 auto;
          }

          .textReviewsContainer {
            padding: 0 3% 0 3%;
          }

          .scoreWidgetContainer {
            width: 20%;
            height: 100%; //affected by the height passed as a prop to the widget
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
        <div className="textReviewsContainer">
          <div className="reviewBoxSlider">
            <Slider {...this.settings}>
              {this.requiredData.topFifteenReviews.map(item => {
                return (
                  <div key={uuid()}>
                    <ReviewBox review={item} trustDontTrust={true} />
                  </div>
                );
              })}
            </Slider>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <style jsx>
        {`
          .sampleNextArrow::before {
            color: #000;
            font-size:1.6rem;
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
            color: #000;
            font-size:1.6rem;
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

export default TrustDontTrustSlider;
