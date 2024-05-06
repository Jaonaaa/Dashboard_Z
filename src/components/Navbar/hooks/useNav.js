import { useEffect, useState } from "react";

const useNav = (classRow) => {
  const [activeLink, setActiveLink] = useState();
  useEffect(() => {
    putActiveLink();
  }, [activeLink]);

  const putActiveLink = () => {
    let currentPath = window.location.pathname;
    let allRows = Array.from(document.querySelectorAll("." + classRow));
    let rowActive = allRows.filter(
      (row) => row.getAttribute("linkto") === currentPath
    );
    let rowInActive = allRows.filter(
      (row) => row.getAttribute("linkto") !== currentPath
    );
    if (rowActive.length > 0) {
      rowActive[0].classList.add("active_link");
    }
    if (rowInActive.length > 0) {
      rowInActive.forEach((row) => row.classList.remove("active_link"));
    }
    handleSubLink(currentPath);
  };
  const handleSubLink = (currentPath) => {
    let allRows = Array.from(document.querySelectorAll("." + classRow));
    let rowsSubLink = allRows.filter((row) =>
      row.classList.contains("sublinkOn")
    );
    rowsSubLink.forEach((row) => {
      let sublinks = row.getAttribute("sublink").split(",");
      for (let i = 0; i < sublinks.length; i++) {
        let link = sublinks[i];
        if (link === currentPath) {
          row.classList.add("active_link");
          removeSubLinkMarker(row, currentPath);
          break;
        }
      }
    });
  };

  const removeSubLinkMarker = (row, currentPath) => {
    let paper = row.querySelector(".paper_nav");
    if (paper == null) return "";
    let rows = paper.querySelectorAll(".row_sub_link");
    rows.forEach((row) => {
      if (currentPath !== row.getAttribute("linkto")) {
        row.classList.remove("active_row");
      } else {
        row.classList.add("active_row");
      }
    });
  };

  return { setActiveLink, putActiveLink };
};

export default useNav;
