import React from "react";
import styles from "./styles";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";
//! Material UI imports
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircleOutline";

const renderIcon = platformName => {
  let src = "";
  //? In the cases the name should match with the platform name that we get in "/api/platforms" this api
  switch (platformName) {
    case 1:
      src = "/static/images/amazonLogo.png";
      break;
    case 2:
      src = "/static/images/yandexLogo.png";
      break;
    case 3:
      src = "/static/images/walmartLogo.png";
      break;
    case 4:
      src = "/static/images/googleShoppingLogo.png";
      break;
    case 5:
      src = "/static/images/idealoLogo.png";
      break;
    case "ebay":
      src = "/static/images/ebayLogo.png";
      break;
    default:
      src = "";
  }
  return (
    <>
      {src ? (
        <img
          title={platformName}
          src={src}
          alt="icon"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        ""
      )}
    </>
  );
};

const PlatformCard = ({
  platform,
  handleURLChange,
  productId,
  addMorePlatform
}) => {
  const platformName = _get(platform, "url.name", "");
  const formData = _get(platform, "url", {});
  const showAddBtn = _get(platform, "showAddBtn", false);
  const platformId = _get(platform, "id", "");
  const platformUniqueId = _get(platform, "uniqueId", "");
  return (
    <div className="row">
      <style jsx>{styles}</style>
      <div className="col-md-2">
        <div className="logoFlex">
          <div className="logoContainer">{renderIcon(platformName)}</div>
        </div>
      </div>
      <div className="col-md-10">
        <div>
          <div
            className={
              showAddBtn
                ? "inlineBlock eightyPerWidth"
                : "inlineBlock fullWidth"
            }
          >
            <FormField
              {...formData}
              handleChange={e => {
                handleURLChange(e, platformUniqueId);
              }}
            />
          </div>
          <div className="inlineBlock">
            {showAddBtn ? (
              <IconButton onClick={() => addMorePlatform(platformId)}>
                <AddIcon />
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
