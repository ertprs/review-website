import React, { Component } from "react";
import MaxReviewsSelector from "./MaxReviewsSelector";
import NewerThanMonthSelector from "./NewerThanMonthSelector";
import RatingSelector from "./RatingSelector";
import WidgetPlatformPreference from "./WidgetPlatformPreference/WidgetPlatformPreference";
import ShowInWidgetList from "./ShowInWidgetList/ShowInWidgetList";
import _get from "lodash/get";
import PremiumBrandingToggle from "./PremiumBrandingToggle/PremiumBrandingToggle";

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
      refreshWidget,
      showHidePlatformsList,
      handleShowHidePlatformChange,
      handleShowHidePlatformSave,
      handlePremiumBrandingToggleChange,
      premiumBrandingToggleData,
      planTypeId
    } = this.props;
    const hideDashboardParticularSettings = _get(
      this.props,
      "hideDashboardParticularSettings",
      false
    );
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
            {hideDashboardParticularSettings ? null : (
              <div className="col-md-6" style={{ marginBottom: "10px" }}>
                <WidgetPlatformPreference
                  platforms={platforms}
                  preferencePlatformArray={preferencePlatformArray}
                  setPreferencePlatformData={setPreferencePlatformData}
                  refreshWidgetOnDemand={refreshWidgetOnDemand}
                  refreshWidget={refreshWidget}
                />
              </div>
            )}
          </div>
          {hideDashboardParticularSettings ? null : (
            <div className="row">
              <div className="col-md-12">
                <ShowInWidgetList
                  showHidePlatformsList={showHidePlatformsList}
                  handleShowHidePlatformChange={handleShowHidePlatformChange}
                  handleShowHidePlatformSave={handleShowHidePlatformSave}
                  refreshWidgetOnDemand={refreshWidgetOnDemand}
                />
              </div>
            </div>
          )}

          {hideDashboardParticularSettings ? null : (
            <div className="row">
              <div className="col-md-12">
                <PremiumBrandingToggle
                  handleChange={handlePremiumBrandingToggleChange}
                  premiumBrandingToggleData={premiumBrandingToggleData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CombinedReviewsWidgetConfigurations;
