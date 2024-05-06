import React from "react";
import "./HorizContainer.sass";

const HorizContainer = ({ children, title, className }) => {
  return (
    <div className={`horiz_container ${className}`}>
      <div className="title_container"> {title}</div>
      <div className="container_content">{children}</div>
    </div>
  );
};

export default HorizContainer;
