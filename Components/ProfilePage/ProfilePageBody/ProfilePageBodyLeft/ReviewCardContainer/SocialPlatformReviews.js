import React from "react";
import ReviewCard from "../../../../Widgets/CommonReviewCard";
import { connect } from "react-redux";
import _get from "lodash/get";
import { isValidArray } from "../../../../../utility/commonFunctions";
import { fetchProfileReviews } from "../../../../../store/actions/domainProfileActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import cookie from "js-cookie";
import Router from "next/router";
import { useRouter } from "next/router";

//? this is the order in which the reviews will be displayed, you only need to add socialAppId of the platform here only whose reviews you want to display
const reviewsOrder = [22, 1, 18, 19, 20, 13, 21, 23];

const SocialPlatformReviews = props => {
  const { socialPlatformReviews, fetchProfileReviews } = props;
  const router = useRouter();
  const token = cookie.get("token") || "";
  const loginType = cookie.get("loginType") || "";

  const renderReviews = () => {
    return reviewsOrder.map(platformId => {
      if (platformId in socialPlatformReviews) {
        let reviewsObj = _get(socialPlatformReviews, platformId, {});
        let nextLink = _get(reviewsObj, "data.next", "");
        let reviews = _get(reviewsObj, "data.data.reviews", []);
        if (isValidArray(reviews)) {
          return (
            <>
              <style jsx>{`
                .showMoreContainer {
                  text-align: center;
                  margin-bottom: 30px;
                }

                .showMoreContainer:hover {
                  text-decoration: underline;
                  color: #4285f4;
                }

                .showMore {
                  color: #4285f4;
                  cursor: pointer;
                  font-weight: bold;
                  font-size: 1rem;
                }
                .showMore:hover {
                  color: #21bc61;
                }
              `}</style>
              {reviews.map(review => {
                //! will change provider
                return (
                  <ReviewCard
                    review={review}
                    provider={platformId}
                    parent="reviewsPage"
                  />
                );
              })}{" "}
              {loginType == 4 && token ? (
                <div className="showMoreContainer">
                  {_get(reviewsObj, "isLoading", false) ? (
                    <CircularProgress size={25} />
                  ) : nextLink ? (
                    <div
                      className="showMore"
                      onClick={() =>
                        fetchProfileReviews("", platformId, false, nextLink)
                      }
                    >
                      Show More
                    </div>
                  ) : null}
                </div>
              ) : nextLink ? (
                <div className="showMoreContainer">
                  <div className="showMore">
                    <div
                      onClick={() => {
                        Router.push({
                          pathname: "/login",
                          query: { pathname: router.asPath || "" }
                        });
                      }}
                    >
                      Login to see all reviews
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          );
        }
      }
    });
  };
  return <div>{renderReviews()}</div>;
};

const mapStateToProps = state => {
  const { profileData } = state;
  const socialPlatformReviews = _get(profileData, "socialPlatformReviews", {});
  return { socialPlatformReviews };
};

export default connect(mapStateToProps, { fetchProfileReviews })(
  SocialPlatformReviews
);
