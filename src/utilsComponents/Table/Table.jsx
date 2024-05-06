import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { variantItem, variantContainerStag } from "../Variants";
import { BooleanMark, sortBy } from "./functions";
import LoaderTable from "./LoaderTable/LoaderTable";
import PaginationSlider from "./PaginationSlider/PaginationSlider";
import { PiCaretUpDown } from "react-icons/pi";
import "./Table.sass";

const isBooleanString = (str) => {
  const lowerCaseStr = (str + "").toLowerCase();
  return lowerCaseStr === "true" || lowerCaseStr === "false";
};

const Table = ({
  headerOn,
  body = [],
  index = [],
  titles = [],
  classes = [],
  callBackPagination = async (i) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  },
  pageCount = 55,
  paginationOn = false,
  rowCount = 5,
  loadingContent = false,
}) => {
  const [fetching, setFetching] = useState(loadingContent);
  const [pageCountState] = useState(pageCount);
  const [dataRow, setDataRow] = useState(body);
  const [activeIndexPage, setActiveIndexPage] = useState(0);
  const [activeSort, setActiveSort] = useState();
  const heightRow = 4; // rem
  const heightTable = heightRow * rowCount;

  const getDataPagination = async (index) => {
    setFetching(true);
    let res = await callBackPagination(index);
    setActiveSort(undefined);
    setFetching(false);
    setDataRow(res);
  };

  const sortTable = (index, direction = "asc") => {
    let res = [...sortBy(dataRow, index, direction)];
    setDataRow(res);
  };

  return (
    <div className="table_container">
      {headerOn && (
        <>
          <div className="header_container">
            <div className="title">{headerOn.title} </div>
          </div>
          <div className="under_container">{headerOn.under_component}</div>
        </>
      )}
      <div className="table_container_" style={{ "--min-height": heightTable + "rem" }}>
        <motion.table variants={variantContainerStag} initial={"initial"} animate={"animate"}>
          <thead>
            <tr>
              {titles.map((title, i) => (
                <th className="head_th" key={i}>
                  {title}
                  {activeSort ? index[i] === activeSort.index && <div className="tag_col"> {activeSort.direction} </div> : ""}
                  <div className="carets">
                    <span
                      onClick={() => {
                        let dirNow = "asc";
                        if (activeSort) {
                          if (JSON.stringify(activeSort.index) === JSON.stringify(index[i]))
                            dirNow = activeSort.direction === "asc" ? "desc" : "asc";
                        }
                        sortTable(index[i], dirNow);
                        setActiveSort({ index: index[i], direction: dirNow });
                      }}
                    >
                      <PiCaretUpDown className="up" />
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {!fetching &&
            dataRow.map((row, i) => {
              const column = index.map((ind, ind__) => {
                let value = row;
                if (Array.isArray(ind)) {
                  for (let i = 0; i < ind.length; i++) {
                    value = value[ind[i]];
                  }
                } else value = value[ind];

                return (
                  <td key={ind__} className={classes[ind__]}>
                    {isBooleanString(value) ? BooleanMark(value, classes[ind__]) : value}
                  </td>
                );
              });

              return (
                <tbody key={i}>
                  <motion.tr
                    className={`tab_row ${(2 + i) % 2 === 0 ? "one" : "two"}`}
                    variants={variantItem}
                    transition={"transition"}
                  >
                    {column}
                  </motion.tr>
                </tbody>
              );
            })}
        </motion.table>
        {fetching && <LoaderTable rowCount={rowCount} />}
      </div>
      {paginationOn && (
        <PaginationSlider
          loading={fetching}
          pageCount={pageCountState}
          activePage={activeIndexPage}
          setActivePage={setActiveIndexPage}
          callBackPagination={getDataPagination}
        />
      )}
    </div>
  );
};

export const dataDefault = {
  headerOn: { title: "Active users ", under_component: "" },
  titles: ["Name", "Email", "Total downloads", "Available", "Hehe :3 "],
  classes: ["", "", "", "", ""],
  index: [0, 1, 2, 3, ["test", "po"]],
  body: [
    { 0: "Arem ing elit.", 1: "P ing elit.", 2: "true", 3: "Lorem ing elit.", test: { po: "A" } },
    { 0: "Brem ing elit.", 1: "Lorem ing elit.", 2: "false", 3: "Lorem ing elit.", test: { po: "B" } },
    { 0: "Ssss ing elit.", 1: "Poo ing elit.", 2: "false", 3: "Lorem ing elit.", test: { po: "C" } },
    { 0: "Edd ing elit.", 1: "Lorem ing elit.", 2: "true", 3: "Lorem ing elit.", test: { po: "D" } },
    { 0: "XRen ing elit.", 1: "Lorem ing elit.", 2: "true", 3: "Lorem ing elit.", test: { po: "E" } },
  ],
};

export default Table;
