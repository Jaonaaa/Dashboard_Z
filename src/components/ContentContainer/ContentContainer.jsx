import React from "react";
import Header from "./Header/Header";
import { motion } from "framer-motion";
import "./ContentContainer.sass";

const contentVariants = {
  initial: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      delayChildren: 0.15,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
  },
};
const ContentContainer = (props) => {
  const { children } = props;
  return (
    <div className="content_container_main">
      <Header />
      <motion.div
        style={{ width: "100%" }}
        className="content_container_ch"
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ContentContainer;
