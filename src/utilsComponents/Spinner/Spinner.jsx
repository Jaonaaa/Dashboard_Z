import React from "react";
import "./Spinner.sass";

export const Spinner = ({ On, size = "0.65rem", borderWidth = "3px", type = "slow" }) => {
  return (
    <>
      {On && (
        <>
          {type === "slow" && (
            <div className="lds-ring-slow" style={{ width: size, height: size, borderWidth: borderWidth }}>
              <div></div>
            </div>
          )}
          {type === "duo" && (
            <div className="lds-dual-ring" style={{ width: size, height: size, borderWidth: borderWidth }}></div>
          )}
        </>
      )}
    </>
  );
};

export default Spinner;
