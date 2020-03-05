import React from "react";
import styles from "./styles";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";
//! Material UI imports
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/CancelOutlined";

const renderIcon = platformName => {
  let src = "";
  //? In the cases the name should match with the platform name that we get in "/api/platforms" this api
  switch (platformName) {
    case "amazon":
      src = "/static/images/amazonLogo.png";
      break;
    case "yandex":
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
  addMorePlatform,
  removePlatform
}) => {
  const platformName = _get(platform, "url.name", "");
  const formData = _get(platform, "url", {});
  const platformId = _get(platform, "id", "");
  const platformUniqueId = _get(platform, "uniqueId", "");
  //? in product update case the input field is disabled for existing urls, so we can't remove them
  const isDisabled = _get(platform, "url.disabled", false);
  //? this will show a add platform button on each platform's first card
  const showAddBtn = _get(platform, "showAddBtn", false);
  return (
    <div className="row">
      <style jsx>{styles}</style>
      <div className="col-md-2">
        <div className="logoFlex">
          <div className="logoContainer">{renderIcon(platformName)}</div>
        </div>
      </div>
      <div className="col-md-10">
        <div className="row">
          <div className="col-md-10">
            <FormField
              {...formData}
              handleChange={e => {
                handleURLChange(e, productId, platformUniqueId);
              }}
            />
          </div>
          {/* will show add platform button on each platforms first card and
          then if it is not existing url in product update case then it will
          show remove platform option */}
          <div className="col-md-2 mb_seven">
            {showAddBtn ? (
              <IconButton
                onClick={() => addMorePlatform(productId, platformId)}
              >
                <AddIcon />
              </IconButton>
            ) : isDisabled ? null : (
              <IconButton
                onClick={() => removePlatform(productId, platformUniqueId)}
              >
                <RemoveIcon />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
