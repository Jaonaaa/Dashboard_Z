import { useEffect, useState } from "react";

const usePosition = (ref, type, miniNav) => {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    x: 0,
    y: 0,
    to_Right: 0,
    top_Bottom: 0,
    to_center_y: 0,
    to_center_x: 0,
  });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    getPosition();
  }, [miniNav]);

  const getPosition = () => {
    if (type !== "link_list") return;
    let { left, top, right, bottom, x, y, width, height } = ref.current.getBoundingClientRect();
    setPosition({
      left: left,
      top: top,
      right: right,
      bottom: bottom,
      x: x,
      y: y,
      to_Right: left + width,
      top_Bottom: top + height,
      to_center_y: top + height / 2,
      to_center_x: left + width / 2,
    });
  };
  const handleHover = () => {
    if (type !== "link_list") return;
    getPosition();
    setHovered(!hovered);
  };

  return { position, hovered, handleHover };
};

export default usePosition;
