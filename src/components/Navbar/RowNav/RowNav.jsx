import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./RowNav.sass";
import usePosition from "./usePosition";
import SubLink from "./SubLink/SubLink";

const RowNav = (props) => {
  const { type, linkTo, label, icon, setActiveLink, info, miniNav, sublinks } = props;
  const row = useRef(null);
  const { hovered, position, handleHover } = usePosition(row, type, miniNav);

  const handleLink = () => {
    setActiveLink(linkTo);
  };

  return (
    <>
      <div
        className={`row_link_nav ${type == "link_list" ? "sublinkOn" : ""} ${miniNav ? "mini_row" : ""}`}
        sublink={sublinks ? sublinks.map((link) => link.linkTo) : ""}
        linkto={linkTo}
        onClick={() => {
          handleLink(linkTo);
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        ref={row}
      >
        <Link to={linkTo} className="link">
          <div className="icon">{icon}</div>
          <div className="label">{label}</div>

          <div className="option">
            {type === "link_info" && <div className="info">{info}</div>}
            {type === "link_list" && (
              <div className="caret">
                <CaretRight />
              </div>
            )}
          </div>
        </Link>
        {type === "link_list" && hovered && <div className="pont"></div>}
        {hovered && type === "link_list" && <SubLink position={position} setActiveLink={setActiveLink} links={sublinks} />}
      </div>
    </>
  );
};

const CaretRight = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="5.884" height="9.528" viewBox="0 0 5.884 9.528">
        <path
          id="Icon_material-keyboard-arrow-down"
          data-name="Icon material-keyboard-arrow-down"
          d="M10.12,11.76,13.764,15.4l3.645-3.637,1.12,1.12-4.764,4.764L9,12.88Z"
          transform="translate(-11.76 18.528) rotate(-90)"
          fill="#8a8585"
        />
      </svg>
    </>
  );
};

export default RowNav;
