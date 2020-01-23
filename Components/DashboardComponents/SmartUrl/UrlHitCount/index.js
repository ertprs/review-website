import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import UrlHitDetails from "./FullScreenDialog";
import { isValidArray } from "../../../../utility/commonFunctions";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import _get from "lodash/get";
import _sumBy from "lodash/sumBy";
import _groupBy from "lodash/groupBy";

class UrlHitCount extends Component {
  state = {
    openDialog: false
  };
  render() {
    const { totalUrlHits, countPerPlatform } = this.props;
    const { openDialog } = this.state;
    return (
      <div className="mb_30">
        <style jsx>{`
          .wrapper {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .mb_30 {
            margin-bottom: 30px;
          }
        `}</style>
        <div className="wrapper">
          <h4>No Of Peoples visited your review URL: {totalUrlHits || 0}</h4>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({ openDialog: true });
            }}
          >
            See Details
          </Button>
        </div>
        <Divider />
        <UrlHitDetails
          open={openDialog}
          handleClose={() => {
            this.setState({ openDialog: false });
          }}
          data={countPerPlatform || []}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, dashboardData } = state;
  const reviewPlatforms = _get(dashboardData, "review_platforms.data", {});
  const socialArray = _get(
    auth,
    "logIn.userProfile.business_profile.social",
    []
  );
  const totalUrlHits = _sumBy(socialArray, "unique_link_reach") || 0;
  let countPerPlatform = [];
  if (isValidArray(socialArray)) {
    const socialArrayGroupByPlatform = _groupBy(
      socialArray,
      "social_media_app_id"
    );
    for (let platform in socialArrayGroupByPlatform) {
      let name = "";
      if (reviewPlatforms.hasOwnProperty(platform)) {
        name = reviewPlatforms[platform];
      }
      let platformArray = socialArrayGroupByPlatform[platform] || [];
      let count = _sumBy(platformArray, "unique_link_reach") || 0;
      countPerPlatform.push({
        name,
        count
      });
    }
  }
  return { totalUrlHits, countPerPlatform };
};

export default connect(mapStateToProps)(UrlHitCount);
