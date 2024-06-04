import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loading-text">Cargando...</p>
    </div>
  );
};

export default Loading;
