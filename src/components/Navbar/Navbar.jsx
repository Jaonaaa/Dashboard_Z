import React, { useEffect, useState } from "react";
import HeadNav from "./HeadNav/HeadNav";
import MenuNav from "./MenuNav/MenuNav";
import useNav from "./hooks/useNav";
import linksNavData from "./NavLink";
import useHideNav from "./hooks/useHideNav";
import { motion } from "framer-motion";
import { navbarVariant } from "./Variants";
import "./Navbar.sass";

const Navbar = () => {
  const { setActiveLink, putActiveLink } = useNav("row_link_nav");
  const initialNavSize = localStorage.getItem("navbar_mini");
  const [miniNav, setMiniNav] = useState(initialNavSize === "true" ? true : false);
  const { visibleNav } = useHideNav();
  const switchNav = () => {
    setMiniNav(!miniNav);
    setTimeout(() => {
      putActiveLink();
    }, 10);
  };
  useEffect(() => {
    localStorage.setItem("navbar_mini", JSON.stringify(miniNav));
    handleNavbarInHideMode(miniNav);
  }, [miniNav]);

  return (
    <>
      {visibleNav && (
        <motion.div
          variants={navbarVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`navbar_container  ${miniNav ? "mini " : ""}`}
          id="navbar"
        >
          <HeadNav miniNav={miniNav} switchNav={switchNav} />
          {linksNavData.map((menuData, key) => (
            <MenuNav key={key} miniNav={miniNav} {...menuData} setActiveLink={setActiveLink} />
          ))}
        </motion.div>
      )}
    </>
  );
};

const handleNavbarInHideMode = (miniNav) => {
  let navbar = document.getElementById("navbar");
  let hidernav = document.getElementById("hider_nav");
  if (navbar && hidernav) {
    let state = localStorage.getItem("hide_nav_state");
    if (state) navbar.classList.add(miniNav ? "open_nav_mini" : "open_nav");
  }
};

export default Navbar;
