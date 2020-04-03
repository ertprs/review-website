import React from "react";
import Select from "react-select";
import widgetTranslationLanguage from "../../../../../utility/constants/widgetTranslationLanguages";
const SelectLanguage = ({ value, handleChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          marginTop: "15px"
        }}
      >
        Select widget language:{" "}
      </div>
      <Select
        options={widgetTranslationLanguage}
        value={value}
        onChange={obj => {
          handleChange(obj);
        }}
      />
    </div>
  );
};

export default SelectLanguage;
