import React from 'react';
const Dialog = props => {
  return (
    <div
      className="modal fade"
      tabindex="-1"
      id="exampleModal"

      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-lg modal-dialog-centered">
        <div className="modal-content" style={{ background: "#1b1838" }}>
          <div
            className="modal-header"

          >
            <h5 className="modal-title">{props.title}</h5>
            <button
              style={{ color: "#9c27b0" }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
