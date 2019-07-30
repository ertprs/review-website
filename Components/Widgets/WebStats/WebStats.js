import React from "react";
import styles from "./WebStats.module.css";

const WebStats = ({ header, caption }) => {
  return (
    <div className="text-justify">
      <div className={styles.header}>
        <h3>{header}</h3>
      </div>
      <div className={styles.caption}>{caption}</div>
    </div>
  );
};

export default WebStats;
