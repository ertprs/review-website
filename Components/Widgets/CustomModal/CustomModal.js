import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import _get from "lodash/get";
Modal.setAppElement("#modal");

Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.25)";

class CustomModal extends React.Component {
  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  closeBtnStyles = {
    textAlign: "right",
    cursor: "pointer"
  };

  componentDidMount() {
    this.element = document.querySelector("#modal");
  }

  render() {
    if (this.element === undefined) {
      return null;
    }
    let modalStyles = {
      content: { ...this.customStyles.content, ...this.props.modalCustomStyles }
    };
    const shouldCloseOnOverlayClick = _get(
      this.props,
      "shouldCloseOnOverlayClick",
      true
    );
    return ReactDOM.createPortal(
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        style={modalStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        <>
          <div
            style={{ ...this.closeBtnStyles }}
            onClick={this.props.handleModalClose}
          >
            <span>&#10005;</span>
          </div>
          {this.props.children}
        </>
      </Modal>,
      this.element
    );
  }
}
export default CustomModal;
