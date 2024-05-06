import React from "react";
import Modal from "../Modal";
import Box from "../../Box/Box";

import "./ValidationModal.sass";

// interface ValidationModalProps {
//   content: React.ReactNode | string;
//   closer?: MouseEventHandler<HTMLButtonElement>;
//   callBack?: MouseEventHandler<HTMLButtonElement>;
//   title?: string;
//   icon?: React.ReactNode | string;
//   cancelOn?: boolean;
//   validationText?: string;
// }

const ValidationModal = ({ title = "", content = "Lorem", closer, callBack, icon, cancelOn, validationText }) => {
  return (
    <>
      <Modal closer={closer}>
        <Box>
          <div className="validation-container">
            {icon != null ? (
              <div className="status_container">
                <div className="icon"></div>
              </div>
            ) : (
              ""
            )}

            <div className="details_container">
              <div className="title"> {title} </div>
              <div className="content">{content}</div>
              <div className="buttons">
                {cancelOn !== false ? (
                  <button onClick={closer} className="cancel">
                    Annuler
                  </button>
                ) : (
                  ""
                )}
                <button onClick={callBack} className="confirm">
                  {validationText ? validationText : "Valider"}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ValidationModal;
