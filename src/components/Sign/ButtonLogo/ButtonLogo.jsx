import React from "react";
import "./ButtonLogo.sass";

const ButtonLogo = ({ icon, text }) => {
  return (
    <div className="button_logo">
      <div className="icon">{icon}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default ButtonLogo;
