import React from "react";
import "./Header.css";

const Headerpage = () => {
  return (
    <div className="header-container">
      <div className="header">
        <img src="/images/galaxy.jpg" alt="Galaxy" className="header-image" />
        <div className="header-text">
          <h1>Galaxy Museum</h1>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Headerpage;
