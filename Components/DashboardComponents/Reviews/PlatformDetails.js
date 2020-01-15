import React from "react";
import Card from "../../MaterialComponents/Card";

export default function PlatformDetails({
  reviewUrl,
  likes,
  followers,
  totalReviews,
  rating
}) {
  return (
    <Card>
      <style>{`
        .bold {
            font-weight: bold;
        }
        .mr_20 {
            margin-right: 20px;
        }
        .mb_10 {
            margin-bottom: 10px;
        }
        .wordBreak {
            word-break: break-all;
        }
        .textLeft: {
            text-align: left;
        }
    `}</style>
      {reviewUrl ? (
        <div className="row mb_10">
          <div className="col-md-12">
            <span className="bold mr_20">Review Url:</span>
            <span className="wordBreak">
              <a href={reviewUrl} target="_blank">
                {reviewUrl}
              </a>
            </span>
          </div>
        </div>
      ) : null}
      <div className="row">
        {likes ? (
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <span className="bold">Likes: </span>
              </div>
              <div className="col-md-6">
                <span>{likes}</span>
              </div>
            </div>
          </div>
        ) : null}
        {followers ? (
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <span className="bold">Followers: </span>
              </div>
              <div className="col-md-6">
                <span>{followers}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <span className="bold">Total Reviews: </span>
            </div>
            <div className="col-md-6">
              <span>{totalReviews}</span>
            </div>
          </div>
        </div>
        {rating ? (
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <span className="bold">Rating: </span>
              </div>
              <div className="col-md-6">
                <span>{rating}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
