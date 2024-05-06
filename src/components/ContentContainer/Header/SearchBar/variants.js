export const searchBarVariant = {
  initial: { opacity: 0, y: "-10%", scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: {
        delay: 0.18,
      },
      ease: "easeInOut",
      duration: 0.2,
    },
  },
  exit: { opacity: 0, y: "20%" },
};
