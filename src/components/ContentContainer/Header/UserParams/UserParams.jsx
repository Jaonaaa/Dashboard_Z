import React, { useState } from "react";
import useIdentity from "../../../../hooks/useIdentity";
import { BsArrowRight } from "react-icons/bs";

import "./UserParams.sass";

const UserParams = () => {
  const navigate = (url) => {
    document.location = url;
  };
  const [openPaper, closePaper] = useState(false);
  const { user, logout, getNewTokenByRefreshToken, checkTokenStatus, disableRefreshToken } = useIdentity();
  const goSign = () => {
    navigate("/sign");
  };
  const handleOpen = () => {
    closePaper(!openPaper);
  };

  return (
    <div className="user_param">
      {user == undefined ? (
        <>
          <div className="button_log_in" onClick={goSign}>
            <span className="text">Sign in</span> <BsArrowRight className="icon_" />{" "}
          </div>
        </>
      ) : (
        <>
          <div className="avatar">
            {user == undefined ? (
              "T"
            ) : user.photoURL ? (
              user.photoURL
            ) : "" ? (
              <image src={user ? user.photoURL : ""} alt="user picture" />
            ) : user.firstname ? (
              user.firstname[0]
            ) : (
              "T"
            )}
            <div className="blank"></div>
            <div className="user_about">
              <div className="name">{user ? user.firstname + " " + user.lastname : " Test Prime"}</div>
            </div>
          </div>
          <div
            className={`paper_option ${openPaper} `}
            tabIndex={0}
            onBlur={() => {
              closePaper(false);
            }}
            onClick={handleOpen}
          >
            <EllipsisVerticale />
            {openPaper && (
              <div
                className="paper_in"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div
                  className="row"
                  onClick={() => {
                    getNewTokenByRefreshToken();
                  }}
                >
                  Regenerate token
                </div>
                <div className="row" onClick={checkTokenStatus}>
                  Check Status
                </div>
                <div className="row" onClick={disableRefreshToken}>
                  Disable refresh token
                </div>
                <div
                  className="row"
                  onClick={() => {
                    logout("/");
                  }}
                >
                  Deconnexion
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserParams;

const ArrowRight = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="11.025" height="7.353" viewBox="0 0 11.025 7.353">
        <path
          id="Icon_ionic-ios-arrow-round-forward"
          data-name="Icon ionic-ios-arrow-round-forward"
          d="M14.906,11.392a.5.5,0,0,0,0,.7l2.328,2.332H8.369a.5.5,0,0,0,0,1h8.858L14.9,17.757a.5.5,0,0,0,0,.7.5.5,0,0,0,.7,0l3.155-3.178h0a.559.559,0,0,0,.1-.157.475.475,0,0,0,.038-.191.5.5,0,0,0-.142-.348L15.6,11.4A.488.488,0,0,0,14.906,11.392Z"
          transform="translate(-7.875 -11.252)"
        />
      </svg>
    </>
  );
};
const EllipsisVerticale = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18">
        <g id="Groupe_39" data-name="Groupe 39" transform="translate(-28 625)">
          <circle id="Ellipse_8" data-name="Ellipse 8" cx="2" cy="2" r="2" transform="translate(28 -625)" fill="#393838" />
          <circle id="Ellipse_9" data-name="Ellipse 9" cx="2" cy="2" r="2" transform="translate(28 -618)" fill="#393838" />
          <circle id="Ellipse_10" data-name="Ellipse 10" cx="2" cy="2" r="2" transform="translate(28 -611)" fill="#393838" />
        </g>
      </svg>
    </>
  );
};
