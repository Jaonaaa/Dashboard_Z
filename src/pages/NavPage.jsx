import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import linksNavData from "../components/Navbar/NavLink";
import { AnimatePresence } from "framer-motion";

const NavPage = ({ children }) => {
  const nav = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={nav} key={nav.pathname}>
        {linksNavData.map((link) => {
          return link.row ? (
            <Route path={link.row.linkTo} key={link.row.linkTo} element={link.row.page} />
          ) : (
            link.rows.map((navLink) => {
              return !navLink.sublinks ? (
                <Route path={navLink.linkTo} key={navLink.linkTo} element={navLink.page} />
              ) : (
                navLink.sublinks.map((subNavLink) => (
                  <Route path={subNavLink.linkTo} key={subNavLink.linkTo} element={subNavLink.page} />
                ))
              );
            })
          );
        })}
        {children}
      </Routes>
    </AnimatePresence>
  );
};

export default NavPage;
