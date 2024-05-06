import React from "react";
import "./Box.sass";

const Box = ({ children, className = "", style }) => {
  return (
    <div className={`box_container ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Box;
