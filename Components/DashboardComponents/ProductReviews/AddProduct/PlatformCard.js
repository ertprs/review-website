import React from "react";
import styles from "./styles";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";

const renderIcon = platformName => {
  let src = "";
  //? we don't have platform if for trustsearch and wot(in profile page), rest are being displayed from their platformId
  console.log(platformName, "platformName");
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
    default:
      src = "";
  }
  return (
    <>
      {src ? (
        <img
          title={provider}
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

const PlatformCard = ({ formData, handleURLChange, id }) => {
  const platformName = _get(formData, "url.name", "");
  return (
    <div className="row">
      <style jsx>{styles}</style>
      <div className="col-md-2">
        <div className="logoFlex">
          <div className="logoContainer">{renderIcon(platformName)}</div>
        </div>
      </div>
      <div className="col-md-10">
        <FormField
          {..._get(formData, "url", {})}
          handleChange={e => {
            handleURLChange(e, id, _get(formData, "id", ""));
          }}
        />
      </div>
    </div>
  );
};

export default PlatformCard;
