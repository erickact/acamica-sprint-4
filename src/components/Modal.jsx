import React from "react";
import { XIcon } from "@heroicons/react/solid";

const Modal = (props) => {
  const { isOpen, onClose, heading, onSuccess, onSuccessText, children } =
    props;
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-container">
        <button className="modal-close-button" onClick={onClose}>
          <XIcon style={{ width: 20 }} />
        </button>
        <h2 className="modal-heading">{heading}</h2>
        <div className="modal-children">{children}</div>
        <div className="modal-actions">
          {onSuccessText && (
            <button
              className="modal-success-button"
              onClick={onSuccess}
              type="button"
            >
              {onSuccessText}
            </button>
          )}

          <button
            className="modal-cancel-button"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
