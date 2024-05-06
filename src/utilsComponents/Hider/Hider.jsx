import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Loader from "./Loader/Loader";
import "./Hider.sass";

const variantHiderBlank = {
  initial: {
    y: "0%",
    opacity: 0,
  },
  animate: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.15,
      delayChildren: 0.22,
    },
  },
  exit: {
    opacity: "0%",
  },
};

const variantHiderShowUp = {
  initial: {
    opacity: "0%",
  },
  animate: {
    opacity: "100%",
    transition: {
      duration: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    y: "100%",
    opacity: "0%",
  },
};

const showState = {
  default: {
    variants: variantHiderBlank,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: {
      ease: "easeInOut",
      type: "tween",
    },
  },
  showUp: {
    variants: variantHiderShowUp,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: {
      ease: "easeInOut",
      type: "tween",
      opacity: {
        duration: 0.2,
      },
      y: {
        duration: 0.3,
      },
    },
  },
};

const Hider = ({ loader = false, classCss = "", animate = undefined, children, onClick = () => {} }) => {
  const hider = document.getElementById("hider_portal");
  let animation = animate != undefined ? showState[animate] : showState.default;
  animation = animation ? animation : showState.default;

  const hiderComponent = (
    <motion.div {...animation} className={classCss} id="hider" onClick={onClick}>
      {loader && <Loader />}
      {children}
    </motion.div>
  );

  if (hider) return createPortal(hiderComponent, hider);
};

export default Hider;
