import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import _get from "lodash/get";
import _find from "lodash/find";
import { connect } from "react-redux";

class ShowInWidgetList extends Component {
  componentDidUpdate(prevProps, prevState) {
    const isLoading = _get(this.props, "isLoading", false);
    const success = _get(this.props, "success", {});
    const prevIsLoading = _get(prevProps, "isLoading", false);
    const prevSuccess = _get(prevProps, "success", {});
    if (
      isLoading !== prevIsLoading &&
      success !== prevSuccess &&
      isLoading === false
    ) {
      this.props.refreshWidgetOnDemand();
    }
  }

  anyCheckBoxTouched = () => {
    const showHidePlatformsList = _get(this.props, "showHidePlatformsList", {});
    let touched = _find(showHidePlatformsList, { touched: true });
    let onePlatformLeft = _find(showHidePlatformsList, { show_in_widget: 1 });
    if (!onePlatformLeft) {
      return false;
    } else {
      return touched ? true : false;
    }
  };

  renderShowHidePlatformsList = () => {
    const showHidePlatformsList = _get(this.props, "showHidePlatformsList", {});
    let output = [];
    if (showHidePlatformsList) {
      if (Object.keys(showHidePlatformsList).length > 1) {
        for (let item in showHidePlatformsList) {
          let showHidePlatformsListItem = showHidePlatformsList[item] || {};
          let id = _get(showHidePlatformsListItem, "id", "");
          let show_in_widget = _get(
            showHidePlatformsListItem,
            "show_in_widget",
            0
          );
          let social_media_app_id = _get(
            showHidePlatformsListItem,
            "social_media_app_id",
            ""
          );
          let label = _get(showHidePlatformsListItem, "label", "");
          let has_review_aggregator = _get(
            showHidePlatformsListItem,
            "has_review_aggregator",
            1
          );
          output = [
            ...output,
            <ListItem
              style={{
                boxShadow: "0px 2px 4px #d8d8d8",
                margin: "10px auto 10px auto",
                width: "99%"
              }}
              key={id}
            >
              <ListItemText>{label}</ListItemText>
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  disabled={!has_review_aggregator}
                  checked={show_in_widget && has_review_aggregator}
                  // onChange={handleToggle(value)}
                  onChange={() => {
                    this.props.handleShowHidePlatformChange(
                      showHidePlatformsListItem
                    );
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ];
        }
      }
    }
    return output;
  };

  render() {
    const isLoading = _get(this.props, "isLoading", false);
    const showHidePlatformsList = _get(this.props, "showHidePlatformsList", {});
    return (
      <div>
        <h6>Show (Checked) / Hide (Unchecked) platforms from widget</h6>
        <style jsx>
          {`
            .platformListContainer {
              max-height: 300px;
              overflow-y: auto;
            }
          `}
        </style>
        <div className="platformListContainer">
          {showHidePlatformsList ? (
            Object.keys(showHidePlatformsList).length <= 1 ? (
              <div>
                To use hide/show platforms from widgets functionality, you need
                to setup at least two platforms that must have reviews
              </div>
            ) : (
              <List>{this.renderShowHidePlatformsList()}</List>
            )
          ) : null}
        </div>
        {showHidePlatformsList ? (
          Object.keys(showHidePlatformsList).length <= 1 ? null : (
            <div>
              {isLoading ? (
                <div style={{ textAlign: "center" }}>
                  <Button size="small">
                    <CircularProgress size={20} />
                  </Button>
                </div>
              ) : (
                <>
                  <div style={{ margin: "20px 0 35px 0" }}>
                    <Button
                      size="small"
                      onClick={this.props.handleShowHidePlatformSave}
                      color="primary"
                      variant="contained"
                      disabled={!this.anyCheckBoxTouched()}
                    >
                      Click here after Checking/Un-checking platforms above to
                      save and see live preview
                    </Button>
                    <div>
                      <div>
                        {_find(showHidePlatformsList, {
                          show_in_widget: 1
                        }) ? null : (
                          <small style={{ color: "red" }}>
                            * You cannot disable all platforms at once
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const toggleWidgetPlatformVisibilityResponse = _get(
    state,
    "dashboardData.toggleWidgetPlatformVisibilityResponse",
    {}
  );
  const isLoading = _get(
    toggleWidgetPlatformVisibilityResponse,
    "isLoading",
    false
  );
  const success = _get(toggleWidgetPlatformVisibilityResponse, "success", {});
  return { isLoading, success };
};

export default connect(mapStateToProps)(ShowInWidgetList);
