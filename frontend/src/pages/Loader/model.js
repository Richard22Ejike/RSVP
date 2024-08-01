// Modal.js
import React from "react";
import "./model.scss";

const Modal = ({ message, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <span role="img" aria-label="success" className="modal-emoji">🎉</span>
          <p className="modal-message">{message}</p>
          <button onClick={onClose} className="modal-close-button --btn --btn-primary">Close</button>
        </div>
      </div>
    );
  };

export default Modal;
