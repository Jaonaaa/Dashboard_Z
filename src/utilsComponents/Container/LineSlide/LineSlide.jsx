import React from "react";
import { motion } from "framer-motion";
import { variantLineSlide } from "../../Variants";
import "./LineSlide.sass";

const LineSlide = (props) => {
  const { children, className = "" } = props;

  return (
    <motion.div
      className={`line_container ${className}`}
      variants={variantLineSlide}
      // animate="animate"
      // initial="initial"
      // transition={"transition"}
    >
      {children}
    </motion.div>
  );
};

export default LineSlide;
