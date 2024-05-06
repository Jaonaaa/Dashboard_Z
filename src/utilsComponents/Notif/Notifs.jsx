import React from "react";
import ReactDOM from "react-dom";
import useNotifs from "./useNotifs";
import "./Notifs.sass";
import NotifRow from "./NotifRow";

const Notifs = ({ notif }) => {
  const { loaded } = useNotifs();
  const status =
    (notif.status + "").toLowerCase() === "ok" || (notif.status + "").toLowerCase() === "good"
      ? "succes"
      : (notif.status + "").toLowerCase();
  return (
    <>
      {loaded &&
        ReactDOM.createPortal(
          <NotifRow
            notif={{
              status: status,
              body: notif.details,
            }}
            timer={notif.timer}
          />,
          document.getElementById("notifs_container")
        )}
    </>
  );
};

export default Notifs;
