import React from "react";
import LogoDefault from "../../../assets/svg/LogoDefault";
import DashboardIcon from "../../../assets/svg/DashboardIcon";

import "./HeadNav.sass";

const HeadNav = ({ miniNav, switchNav }) => {
  const handleLogo = () => {
    if (miniNav) switchNav();
  };
  return (
    <>
      <div className={`head_nav ${miniNav ? "mini_head" : ""}`}>
        <div className="logo">
          <div className="icon" onClick={handleLogo}>
            <LogoDefault />
          </div>
          <div className="text">Untilted UI</div>
        </div>
        {!miniNav && (
          <div className="btn_small_nav" onClick={switchNav}>
            <DashboardIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default HeadNav;
