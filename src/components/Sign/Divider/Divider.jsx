import React from "react";
import "./Divider.sass";

function Divider({ text, className }) {
  return (
    <div className={`divider ${className}`}>
      <div className="line" />
      <div className="text">{text}</div>
    </div>
  );
}

export default Divider;
