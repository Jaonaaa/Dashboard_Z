import { useEffect, useState } from "react";
import { link_to_hide_nav } from "../NavLink";
import { useLocation } from "react-router-dom";

const useHideNav = () => {
  const [visibleNav, setVisibleNav] = useState(true);
  const nav = useLocation();

  useEffect(() => {
    handleNavVisibility();
  }, [nav.pathname]);

  useEffect(() => {
    window.addEventListener("popstate", handleNavVisibility);
    return () => {
      window.removeEventListener("popstate", handleNavVisibility);
    };
  }, []);

  const handleNavVisibility = () => {
    let path = document.location.pathname;
    let pathWithoutFirst_ = path.slice(1);
    const isInPathTo_Hide = link_to_hide_nav.includes(path) || link_to_hide_nav.includes(pathWithoutFirst_);
    if (isInPathTo_Hide) setVisibleNav(false);
    else setVisibleNav(true);
  };

  return { visibleNav };
};

export default useHideNav;
