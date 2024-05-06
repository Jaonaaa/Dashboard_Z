export const indexVariants = {
  initial: {
    opacity: 0,
    x: "-50%",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: {
        delay: 0.3,
      },
      duration: 0.3,
      ease: "circOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-50%",
    transition: {
      opacity: {
        delay: 0,
      },
      duration: 0.1,
    },
  },
};
