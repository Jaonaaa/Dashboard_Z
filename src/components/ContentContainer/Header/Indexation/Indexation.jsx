import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { indexVariants } from "./variants";
import { useLocation } from "react-router-dom";
import "./Indexation.sass";

const Indexation = () => {
  const [indexName, setIndexName] = useState(["index", "text"]);

  useEffect(() => {
    handleIndex();
  }, []);

  const handleIndex = () => {
    let currentPath = window.location.pathname;
    let pathArray = currentPath.split("/");
    pathArray.shift();
    if (currentPath === "/") setIndexName(["home"]);
    else setIndexName(pathArray);
  };

  const getIndex = () => {
    return indexName.map((name, index) => {
      if (index == indexName.length - 1)
        return (
          <span className="index_current" key={index}>
            {UpFirst(name)}
          </span>
        );
      return (
        <span className="index_before" key={index}>
          {UpFirst(name)} /{" "}
        </span>
      );
    });
  };

  return (
    <motion.div variants={indexVariants} className="indexation_container" initial="initial" animate="animate" exit="exit">
      {getIndex()}
    </motion.div>
  );
};

const UpFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Indexation;
