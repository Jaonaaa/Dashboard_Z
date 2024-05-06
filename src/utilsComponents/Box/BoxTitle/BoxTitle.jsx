import React from "react";
import "./BoxTitle.sass";

const BoxTitle = ({ children, title, style, className }) => {
  return (
    <div className={`container_box_title ${className}`} style={style}>
      <div className="title">{title}</div>
      <div className="box_container">{children}</div>
    </div>
  );
};

export default BoxTitle;
