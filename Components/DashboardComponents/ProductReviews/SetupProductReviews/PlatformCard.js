import React from "react";
import styles from "./styles";
import { renderFormFields } from "../../../../utility/commonFunctions";

const PlatformCard = ({ formData, handleFormDataChange }) => {
  return (
    <div className="row">
      <style jsx>{styles}</style>
      <div className="col-md-4">
        <div className="logoFlex">
          <div className="logoContainer">
            <img src="/static/images/googleIcon.png" alt="google icon" />
          </div>
        </div>
      </div>
      <div className="col-md-8">
        {renderFormFields(formData, handleFormDataChange)}
      </div>
    </div>
  );
};

export default PlatformCard;
