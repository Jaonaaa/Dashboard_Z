import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Indexation from "./Indexation/Indexation";
import useHideNav from "../../Navbar/hooks/useHideNav";
import "./Header.sass";
import UserParams from "./UserParams/UserParams";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar/SearchBar";

const Header = () => {
  const { visibleNav } = useHideNav();
  const [hiderOn, setHideNavbar] = useState(false);

  const showNavbar = () => {
    let navbar = document.getElementById("navbar");
    if (navbar.classList.contains("mini")) {
      navbar.classList.add("open_nav_mini");
      localStorage.setItem("hide_nav_state", "mini");
    } else {
      navbar.classList.add("open_nav");
      localStorage.setItem("hide_nav_state", "normal");
    }
    setHideNavbar(true);
  };

  const hideNavbar = () => {
    let navbar = document.getElementById("navbar");
    if (navbar != null) {
      navbar.classList.remove("open_nav_mini");
      navbar.classList.remove("open_nav");
    }
    localStorage.removeItem("hide_nav_state");
    setHideNavbar(false);
  };

  const handleResize = () => {
    window.addEventListener("resize", () => {
      let width = window.innerWidth;
      if (width > 768) hideNavbar();
    });
  };

  useEffect(() => {
    hideNavbar();
  }, [document.location.pathname]);

  useEffect(() => {
    window.addEventListener("popstate", hideNavbar);
    handleResize();
    return () => {
      window.removeEventListener("popstate", hideNavbar);
    };
  }, []);

  return (
    <motion.div initial="initial" animate="animate" exit="exit" className="container_header">
      {hiderOn && <HiderNavbar closer={hideNavbar} />}
      <div className="first">
        {visibleNav && (
          <div className="btn_show_navbar" onClick={showNavbar}>
            <ArrowRight />
          </div>
        )}
        <Indexation />
      </div>

      <SearchBar />
      <div className="params">
        <UserParams />
      </div>
    </motion.div>
  );
};

const HiderNavbar = ({ closer }) => {
  return ReactDOM.createPortal(
    <>
      <div id="hider_nav" onClick={closer}></div>
    </>,
    document.getElementById("modal_container")
  );
};

const ArrowRight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8.582" height="15.009" viewBox="0 0 8.582 15.009">
      <path
        id="Icon_ionic-ios-arrow-forward"
        data-name="Icon ionic-ios-arrow-forward"
        d="M17.241,13.7l-5.68-5.675a1.068,1.068,0,0,1,0-1.515,1.082,1.082,0,0,1,1.519,0l6.435,6.43a1.071,1.071,0,0,1,.031,1.479l-6.462,6.475a1.073,1.073,0,0,1-1.519-1.515Z"
        transform="translate(-11.246 -6.196)"
      />
    </svg>
  );
};

export default Header;
