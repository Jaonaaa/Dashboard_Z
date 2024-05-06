export const variantContainerStag = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
};

export const variantItem = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
};

export const variantLineSlide = {
  initial: { y: "1rem", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
    },
  },
};

export const variantLineSlideToRight = {
  initial: { x: "-5rem", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      // duration: 0.5,
    },
  },
};
