import React from "react";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import StarRatings from "react-star-ratings";
import CircularProgress from "@material-ui/core/CircularProgress";
import PrimaryIcon from "@material-ui/icons/CheckCircle";
import { ratingColor } from "../../../../utility/ratingTypeColor";

const AllProfileDataPopover = props => {
  const { anchorEl, handleClose, allPlatformProfilesData } = props;
  return (
    <div>
      <style>{`
        .bold {
            font-weight: bold;
        }
        .mb_10 {
            margin-bottom: 10px;
        }
    `}</style>
      <Popover
        id={"profile-data-popover"}
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Card style={{ padding: "20px", width: "600px" }}>
          {(allPlatformProfilesData || []).map(profileData => {
            const {
              name,
              totalReviews,
              rating,
              isPrimary,
              isFetching
            } = profileData;
            return (
              <div className="row mb_10">
                <div className="col-md-1">
                  {isPrimary ? (
                    <PrimaryIcon style={{ height: "20px" }} />
                  ) : null}
                </div>
                <div className="col-md-3">
                  <span className="bold">{name}</span>
                </div>
                <div className="col-md-3">
                  <span className="bold">{`${totalReviews} Reviews`}</span>
                </div>
                <div className="col-md-3">
                  <StarRatings
                    rating={Number(rating)}
                    starRatedColor={
                      ratingColor[Math.round(Number(rating)) || 0]
                    }
                    starDimension="15px"
                    starSpacing="0.5px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <div className="col-md-2">
                  {isFetching ? (
                    <CircularProgress size={20} color="secondary" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </Card>
      </Popover>
    </div>
  );
};

export default AllProfileDataPopover;
