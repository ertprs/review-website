import React, { Component } from "react";
import MaxReviewsSelector from "./MaxReviewsSelector";
import NewerThanMonthSelector from "./NewerThanMonthSelector";
import RatingSelector from "./RatingSelector";
import WidgetPlatformPreference from "./WidgetPlatformPreference/WidgetPlatformPreference";

class CombinedReviewsWidgetConfigurations extends Component {
  render() {
    const {
      selectedMaxReviews,
      selectedNewerThanMonths,
      selectedRatingCount,
      handleChange,
      platforms,
      preferencePlatformArray,
      setPreferencePlatformData,
      refreshWidgetOnDemand,
      refreshWidget
    } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6" style={{ marginBottom: "10px" }}>
              <MaxReviewsSelector
                value={selectedMaxReviews}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6" style={{ marginBottom: "10px" }}>
              <NewerThanMonthSelector
                value={selectedNewerThanMonths}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6" style={{ marginBottom: "10px" }}>
              <RatingSelector
                value={selectedRatingCount}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6" style={{ marginBottom: "10px" }}>
              <WidgetPlatformPreference
                platforms={platforms}
                preferencePlatformArray={preferencePlatformArray}
                setPreferencePlatformData={setPreferencePlatformData}
                refreshWidgetOnDemand={refreshWidgetOnDemand}
                refreshWidget={refreshWidget}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CombinedReviewsWidgetConfigurations;
