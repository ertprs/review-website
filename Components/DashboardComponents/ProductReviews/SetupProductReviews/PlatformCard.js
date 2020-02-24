import React from "react";
import styles from "./styles";
import FormField from "../../../Widgets/FormField/FormField";
import _get from "lodash/get";

const PlatformCard = ({ formData, handleURLChange, id }) => {
  return (
    <div className="row">
      <style jsx>{styles}</style>
      <div className="col-md-2">
        <div className="logoFlex">
          <div className="logoContainer">
            <img src="/static/images/googleIcon.png" alt="google icon" />
          </div>
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
