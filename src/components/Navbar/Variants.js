export const navbarVariant = {
  initial: {},
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      ease: "easeInOut",
    },
    x: "-110%",
    opacity: 0,
  },
};
