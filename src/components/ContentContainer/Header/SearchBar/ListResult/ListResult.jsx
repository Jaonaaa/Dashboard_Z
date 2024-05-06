import React from "react";
import Loader from "../../../../../utilsComponents/Hider/Loader/Loader";
import "./ListResult.sass";

const ListResult = ({ data = [], loading = false, closer = () => {} }) => {
  const rel = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  };
  return (
    <div className={`list_container " ${loading ? "active" : ""}`}>
      {loading ? (
        <Loader size="3.55rem" weigth="0.25rem" />
      ) : (
        data.length > 0 && (
          <div className="list_p_container">
            <div className="indice_count">{data.length} result found.</div>
            <div className="list">
              {data.map((d, index) => (
                <div
                  className="row"
                  key={index}
                  onClick={async () => {
                    await rel();
                    closer();
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ListResult;
