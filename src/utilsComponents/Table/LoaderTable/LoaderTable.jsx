import React from "react";

const LoaderTable = ({ rowCount = 0 }) => {
  return (
    <div className="loader_table_container">
      {[...Array(rowCount).keys()].map((row) => (
        <div className="row_placeholder" style={{ animationDelay: 0.15 * row + "s" }} key={row}></div>
      ))}
    </div>
  );
};

export default LoaderTable;
